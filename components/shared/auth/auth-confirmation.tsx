"use client";

import { useToast } from "@/components/ui/toast";
import { useAuthorizeTvMutation } from "@/graphql/generated/output";
import { AuthWrapper } from "./auth-wrapper";
import { Button } from "@/components/ui/button";
import { Check, Shield, User, Crown } from "lucide-react";

export const AuthConfirmation = ({ code }: { code: string }) => {
  const { toast } = useToast();

  const [auth, { loading }] = useAuthorizeTvMutation({
    onCompleted() {
      toast({
        title: "Успех",
        description: "Устройство авторизовано",
        variant: "success",
      });
    },
    onError(err) {
      toast({
        title: "Ошибка",
        description: err.message,
        variant: "error",
      });
    },
  });

  const permissions = [
    {
      icon: User,
      title: "Доступ к аккаунту",
      description: "Полный контроль над вашим профилем",
    },
    {
      icon: Shield,
      title: "Личная информация",
      description: "Просмотр и управление данными",
    },
    {
      icon: Crown,
      title: "Премиум подписка",
      description: "Доступ ко всем премиум функциям",
    },
  ];

  return (
    <AuthWrapper heading="Подтверждение входа">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <p className="text-muted-foreground text-balance">
            Это устройство получит доступ к следующим разрешениям:
          </p>
        </div>

        <div className="space-y-3">
          {permissions.map((permission, index) => {
            const Icon = permission.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground mb-1">
                    {permission.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {permission.description}
                  </p>
                </div>
                <div className="shrink-0">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-4 space-y-3">
          <Button
            onClick={() =>
              auth({
                variables: {
                  code,
                },
              })
            }
            disabled={loading}
            className="w-full h-12 text-base font-semibold"
            size="lg"
          >
            {loading ? "Авторизация..." : "Авторизовать устройство"}
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Вы можете отозвать доступ в любое время в настройках безопасности
          </p>
        </div>
      </div>
    </AuthWrapper>
  );
};
