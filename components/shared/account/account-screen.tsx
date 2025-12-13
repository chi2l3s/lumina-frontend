"use client";

import React, { useEffect, useMemo } from "react";
import { gql, useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  useDisableTotpMutation,
  useEnableTotpMutation,
  useFindCurrentSessionQuery,
  useFindSessionByUserQuery,
  useGenerateTotpSecretLazyQuery,
  useRemoveSessionMutation,
} from "@/graphql/generated/output";
import { useToast } from "@/components/ui/toast";
import { Container } from "@/components/shared/layout/container";
import { AnimatedAvatar } from "@/components/shared/elements/animated-avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCurrent } from "@/hooks/use-current";
import {
  BadgeCheck,
  CheckCircle2,
  Clock4,
  Globe2,
  KeyRound,
  ScanLine,
  ShieldCheck,
  Smartphone,
  Wifi,
} from "lucide-react";

const profileSchema = z.object({
  firstName: z.string().min(2, "Минимум 2 символа"),
  lastName: z.string().min(2, "Минимум 2 символа"),
  dateOfBirth: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const totpSchema = z.object({
  pin: z
    .string()
    .min(6, "Нужны 6 цифр")
    .max(6, "Нужны 6 цифр"),
});

type TotpFormValues = z.infer<typeof totpSchema>;

const toDateInput = (value?: string | null) =>
  value ? new Date(value).toISOString().split("T")[0] : "";

const formatSessionDate = (value: string) =>
  new Date(value).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

type UpdateProfileInput = {
  firstName: string;
  lastName: string;
  dateOfBirth?: string | null;
};

type UpdateProfileResponse = {
  updateProfile: {
    id: string;
  };
};

const Panel = ({
  title,
  description,
  children,
}: React.PropsWithChildren<{
  title: string;
  description?: string;
}>) => (
  <div className="space-y-3 rounded-2xl border bg-card/80 p-5 shadow-sm">
    <div className="space-y-1">
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
    <div className="space-y-3">{children}</div>
  </div>
);

const ProfileTab = ({
  values,
  onUpdated,
}: {
  values: {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth?: string | null;
  };
  onUpdated: () => void;
}) => {
  const { toast } = useToast();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: values.firstName,
      lastName: values.lastName,
      dateOfBirth: toDateInput(values.dateOfBirth),
    },
  });

  useEffect(() => {
    form.reset({
      firstName: values.firstName,
      lastName: values.lastName,
      dateOfBirth: toDateInput(values.dateOfBirth),
    });
  }, [values, form]);

  const onSubmit = (data: ProfileFormValues) => {
    const payload: UpdateProfileInput = {
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth
        ? new Date(data.dateOfBirth).toISOString()
        : null,
    };
  };

  return (
    <Panel
      title="Публичная информация"
      description="Имя и дата рождения отображаются в профиле и рекомендациях."
    >
      <Form {...form}>
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-3 md:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <Input placeholder="Иван" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Фамилия</FormLabel>
                  <FormControl>
                    <Input placeholder="Петров" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Почта</FormLabel>
              <FormControl>
                <Input value={values.email} disabled />
              </FormControl>
              <p className="text-xs text-muted-foreground">
                Смена почты — через поддержку
              </p>
            </FormItem>
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Дата рождения</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              className="min-w-[160px]"
              disabled={!form.formState.isValid}
            >
              Сохранить
            </Button>
          </div>
        </form>
      </Form>
    </Panel>
  );
};

const TotpTab = ({
  isEnabled,
  onStatusChange,
}: {
  isEnabled?: boolean;
  onStatusChange: () => void;
}) => {
  const { toast } = useToast();
  const [fetchSecret, { data: secretData, loading: isGenerating }] =
    useGenerateTotpSecretLazyQuery();
  const [enableTotp, { loading: isEnabling }] = useEnableTotpMutation({
    onCompleted() {
      toast({
        title: "TOTP включен",
        variant: "success",
      });
      onStatusChange();
    },
    onError(err) {
      toast({
        title: "Ошибка",
        description: err.message,
        variant: "error",
      });
    },
  });
  const [disableTotp, { loading: isDisabling }] = useDisableTotpMutation({
    onCompleted() {
      toast({
        title: "TOTP отключен",
        variant: "success",
      });
      onStatusChange();
    },
    onError(err) {
      toast({
        title: "Ошибка",
        description: err.message,
        variant: "error",
      });
    },
  });

  const form = useForm<TotpFormValues>({
    resolver: zodResolver(totpSchema),
    defaultValues: {
      pin: "",
    },
  });

  const secret = secretData?.generateTotpSecret;
  const hasSecret = Boolean(secret);

  const onSubmit = (data: TotpFormValues) => {
    if (!secret?.secret) {
      toast({
        title: "Сначала сгенерируйте секрет",
        variant: "error",
      });
      return;
    }

    enableTotp({
      variables: {
        data: {
          pin: data.pin,
          secret: secret.secret,
        },
      },
    });
    form.reset();
  };

  return (
    <Panel
      title="Двухфакторная аутентификация"
      description="Секрет генерируется здесь, подтверждается кодом из приложения-аутентификатора."
    >
      {isEnabled ? (
        <div className="flex items-center justify-between rounded-xl border bg-primary/5 p-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Защита включена</p>
              <p className="text-xs text-muted-foreground">
                При входе будет запрошен одноразовый код
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => disableTotp()}
            isLoading={isDisabling}
          >
            Отключить
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-xl border bg-card p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-sm">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>1. Сгенерируйте секрет</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => fetchSecret()}
                isLoading={isGenerating}
              >
                Сгенерировать
              </Button>
            </div>
            {hasSecret && (
              <div className="mt-3 grid gap-3 md:grid-cols-[160px,1fr] md:items-center">
                <div className="rounded-lg border bg-white p-2">
                  <img
                    src={secret?.qrcodeUrl ?? ""}
                    alt="QR"
                    className="mx-auto h-36 w-36"
                  />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <ScanLine className="h-4 w-4 text-primary" />
                    Отсканируйте QR или введите ключ вручную
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2 font-mono text-xs">
                    <KeyRound className="h-4 w-4 text-primary" />
                    {secret?.secret}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="rounded-xl border bg-card p-4">
            <p className="text-sm font-medium">2. Подтвердите кодом</p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-3 space-y-3"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>6 цифр из приложения</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="min-w-[160px]"
                  isLoading={isEnabling}
                  disabled={!form.formState.isValid || !hasSecret}
                >
                  Включить TOTP
                </Button>
              </form>
            </Form>
          </div>
        </div>
      )}
    </Panel>
  );
};

const SessionRow = ({
  id,
  isCurrent,
  device,
  location,
  ip,
  createdAt,
  onRemove,
  isRemoving,
}: {
  id: string;
  isCurrent: boolean;
  device: { browser: string; os: string };
  location: { city: string; country: string };
  ip: string;
  createdAt: string;
  onRemove: (id: string) => void;
  isRemoving: boolean;
}) => (
  <div className="flex flex-col gap-1 rounded-xl border bg-card px-3 py-3 md:flex-row md:items-center md:justify-between">
    <div className="space-y-1">
      <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
        <Smartphone className="h-4 w-4 text-primary" />
        {device.os} • {device.browser}
        {isCurrent && (
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-primary">
            Текущая
          </span>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-x-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Globe2 className="h-3.5 w-3.5" />
          {location.city}, {location.country}
        </span>
        <span className="flex items-center gap-1">
          <Wifi className="h-3.5 w-3.5" />
          {ip}
        </span>
        <span className="flex items-center gap-1">
          <Clock4 className="h-3.5 w-3.5" />
          {formatSessionDate(createdAt)}
        </span>
      </div>
    </div>
    <Button
      size="sm"
      variant={isCurrent ? "secondary" : "outline"}
      disabled={isCurrent}
      onClick={() => onRemove(id)}
      isLoading={isRemoving}
      className="md:w-auto"
    >
      Завершить
    </Button>
  </div>
);

const SessionsTab = ({ skip }: { skip: boolean }) => {
  const { toast } = useToast();
  const {
    data: sessionsData,
    loading: isLoadingSessions,
    refetch,
  } = useFindSessionByUserQuery({
    skip,
  });
  const { data: currentSessionData } = useFindCurrentSessionQuery({
    skip,
  });

  const [removeSession, { loading: isRemoving }] = useRemoveSessionMutation({
    onCompleted() {
      toast({
        title: "Сессия завершена",
        variant: "success",
      });
      refetch();
    },
    onError(err) {
      toast({
        title: "Ошибка",
        description: err.message,
        variant: "error",
      });
    },
  });

  const sessions = useMemo(
    () => sessionsData?.findSessionsByUser ?? [],
    [sessionsData]
  );
  const currentSessionId = currentSessionData?.findCurrentSession.id;

  return (
    <Panel
      title="Активные сессии"
      description="Завершите устройства, которые вам не знакомы."
    >
      {isLoadingSessions ? (
        <div className="space-y-2">
          {[1, 2, 3].map((key) => (
            <Skeleton key={key} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      ) : sessions.length === 0 ? (
        <div className="rounded-xl border bg-card p-4 text-sm text-muted-foreground">
          Сессий не найдено
        </div>
      ) : (
        <div className="space-y-3">
          {sessions.map((session) => (
            <SessionRow
              key={session.id}
              id={session.id}
              isCurrent={session.id === currentSessionId}
              device={session.metadata.device}
              location={session.metadata.location}
              ip={session.metadata.ip}
              createdAt={session.createdAt}
              onRemove={(id) => removeSession({ variables: { id } })}
              isRemoving={isRemoving}
            />
          ))}
        </div>
      )}
    </Panel>
  );
};

export const AccountScreen = () => {
  const { user, isLoadingProfile, refetch } = useCurrent();

  if (isLoadingProfile) {
    return (
      <Container className="py-10 space-y-4">
        <Skeleton className="h-20 w-full rounded-2xl" />
        <Skeleton className="h-96 w-full rounded-2xl" />
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="py-10">
        <Panel title="Нет данных профиля">
          <p className="text-sm text-muted-foreground">
            Авторизуйтесь, чтобы управлять аккаунтом.
          </p>
        </Panel>
      </Container>
    );
  }

  const fullName = `${user.firstName} ${user.lastName}`.trim();

  return (
    <Container className="py-10 space-y-6">
      <div className="flex items-center gap-3 rounded-2xl border bg-card/80 p-4">
        <div className="h-14 w-14 shrink-0 rounded-full">
          <AnimatedAvatar />
        </div>
        <div className="space-y-1">
          <p className="text-xs uppercase text-muted-foreground">Мой аккаунт</p>
          <p className="text-lg font-semibold">{fullName}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
        {user.isTotpEnabled && (
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <BadgeCheck className="h-4 w-4" />2FA
          </span>
        )}
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList variant="underline" className="gap-1">
          <TabsTrigger value="profile">Профиль</TabsTrigger>
          <TabsTrigger value="security">Безопасность</TabsTrigger>
          <TabsTrigger value="sessions">Сессии</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileTab
            values={{
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              dateOfBirth: user.dateOfBirth as string | undefined,
            }}
            onUpdated={() => refetch()}
          />
        </TabsContent>

        <TabsContent value="security">
          <TotpTab
            isEnabled={user.isTotpEnabled}
            onStatusChange={() => refetch()}
          />
        </TabsContent>

        <TabsContent value="sessions">
          <SessionsTab skip={!user} />
        </TabsContent>
      </Tabs>
    </Container>
  );
};
