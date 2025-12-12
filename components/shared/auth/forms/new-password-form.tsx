"use client";

import { useToast } from "@/components/ui/toast";
import { useNewPasswordMutation } from "@/graphql/generated/output";
import {
  newPasswordSchema,
  TypeNewPasswordSchema,
} from "@/schemas/auth/new-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
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
import { Button } from "@/components/ui/button";

export const NewPasswordForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const params = useParams<{ token: string }>();

  const form = useForm<TypeNewPasswordSchema>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      passwordRepeat: "",
    },
  });

  const [newPassword, { loading: isLoadingNew }] = useNewPasswordMutation({
    onCompleted(data) {
      toast({
        title: "Успех",
        description: "Пароль сброшен",
        variant: "success",
      });
      setTimeout(() => router.push("/auth/login"), 1500);
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

  function onSubmit(data: TypeNewPasswordSchema) {
    newPassword({ variables: { data: { ...data, token: params.token } } });
  }

  return (
    <AuthWrapper
      heading="Новый пароль"
      backButtonLabel="Войти"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input
                    placeholder="********"
                    type="password"
                    disabled={isLoadingNew}
                    {...field}
                  />
                </FormControl>
                <FormDescription>Придумайте новый пароль</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordRepeat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Повторите пароль</FormLabel>
                <FormControl>
                  <Input
                    placeholder="********"
                    type="password"
                    disabled={isLoadingNew}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="mt-2 w-full"
            disabled={!isValid}
            isLoading={isLoadingNew}
          >
            Продолжить
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};
