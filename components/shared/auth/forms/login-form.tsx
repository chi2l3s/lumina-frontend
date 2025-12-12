"use client";

import { useToast } from "@/components/ui/toast";
import { useLoginUserMutation } from "@/graphql/generated/output";
import { useAuth } from "@/hooks/use-auth";
import { loginSchema, TypeLoginSchema } from "@/schemas/auth/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthWrapper } from "../auth-wrapper";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export const LoginForm = () => {
  const { toast } = useToast();
  const { auth } = useAuth();

  const router = useRouter();

  const [isShowTwoFactor, setIsShowTwoFactor] = useState(false);

  const form = useForm<TypeLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const [login, { loading: isLoadingLogin }] = useLoginUserMutation({
    onCompleted(data) {
      if (data.loginUser.message) {
        setIsShowTwoFactor(true);
      } else {
        auth();
        toast({
          title: "Успешный вход",
          variant: "success",
        });
        setTimeout(() => router.push("/"), 3000);
      }
    },
    onError(err) {
      toast({
        title: "Ошибка",
        description: err.message,
        variant: "error",
      });
    },
  });

  const { isValid } = form.formState;

  function onSubmit(data: TypeLoginSchema) {
    login({ variables: { data } });
  }

  return (
    <AuthWrapper
      heading="Вход в аккаунт"
      backButtonLabel="Впервые здесь?"
      backButtonHref="/auth/create"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {isShowTwoFactor ? (
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Код</FormLabel>
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
                  <FormDescription>
                    Введите код из приложения-аутентификатора
                  </FormDescription>
                </FormItem>
              )}
            />
          ) : (
            <>
              <FormField
                control={form.control}
                name="login"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Логин</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="skibidi@example.ru"
                        disabled={isLoadingLogin}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Пароль</FormLabel>
                      <Link
                        href="/auth/recovery"
                        className="ml-auto inline-block text-sm"
                      >
                        Забыли пароль?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        placeholder="********"
                        type="password"
                        disabled={isLoadingLogin}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <Button
            className="mt-2 w-full"
            disabled={!isValid}
            isLoading={isLoadingLogin}
          >
            Войти
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};
