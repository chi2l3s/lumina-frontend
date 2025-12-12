import { AuthConfirmation } from "@/components/shared/auth/auth-confirmation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Авторизация устройства",
};

export default async function Page(props: {
  params: Promise<{ code: string }>;
}) {
  const params = await props.params;

  return <AuthConfirmation code={params.code} />;
}
