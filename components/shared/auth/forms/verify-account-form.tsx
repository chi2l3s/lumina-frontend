"use client";

import { useToast } from "@/components/ui/toast";
import { useVerifyAccountMutation } from "@/graphql/generated/output";
import { useAuth } from "@/hooks/use-auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthWrapper } from "../auth-wrapper";
import { EmailConfirmationAnimation } from "../email-success";
import { Loader2 } from "lucide-react";

export const VerifyAccountForm = () => {
  const { toast } = useToast();
    const [isSuccess, setIsSuccess] = useState(false)
  const { auth } = useAuth();

  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token") ?? "";

  const [verify] = useVerifyAccountMutation({
    onCompleted() {
      auth();
      toast({
        title: "Успех",
        description: "Почта подтверждена",
        variant: "success",
      });
      setIsSuccess(true)
      setTimeout(() => router.push("/"), 1500);
    },
    onError(err) {
      toast({
        title: "Ошибка",
        description: err.message,
        variant: "error",
      });
    },
  });

  useEffect(() => {
    verify({
        variables: {
            data: { token }
        }
    })
  }, [token])

  return (
    <AuthWrapper heading="Верификация">
        <div className="flex items-center justify-center">
            {isSuccess ? (
                <EmailConfirmationAnimation />
            ) : (
                <Loader2 className="animate-spin ease-in-out duration-200"/>
            )}
        </div>
    </AuthWrapper>
  );
};
