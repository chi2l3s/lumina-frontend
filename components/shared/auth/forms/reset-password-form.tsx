"use client";

import { useToast } from "@/components/ui/toast";
import { useResetPasswordMutation } from "@/graphql/generated/output";
import {
  resetPasswordSchema,
  TypeResetPasswordSchema,
} from "@/schemas/auth/reset-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthWrapper } from "../auth-wrapper";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleCheck } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const ResetPasswordForm = () => {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<TypeResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const [resetPassword, { loading: isLoadingReset }] = useResetPasswordMutation(
    {
      onCompleted() {
        setIsSuccess(true);
      },
      onError(err) {
        toast({
          title: "Ошибка",
          description: err.message,
          variant: "error",
        });
      },
    }
  );

  const { isValid } = form.formState;

  function onSubmit(data: TypeResetPasswordSchema) {
    resetPassword({ variables: { data } });
  }

  return (
    <AuthWrapper
      heading={"Сброс пароля"}
      backButtonLabel={"Назад"}
      backButtonHref="/auth/login"
    >
      {isSuccess ? (
        <Alert>
          <CircleCheck className="size-4" />
          <AlertTitle>Успешно</AlertTitle>
          <AlertDescription>
            На вашу электронную школу отправлено письмо с ссылкой для сброса
            пароля
          </AlertDescription>
        </Alert>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Электронная почта</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="skibidi@example.ru"
                      disabled={isLoadingReset}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="mt-2 w-full"
              disabled={!isValid}
              isLoading={isLoadingReset}
            >
              Сбросить
            </Button>
          </form>
        </Form>
      )}
    </AuthWrapper>
  );
};
