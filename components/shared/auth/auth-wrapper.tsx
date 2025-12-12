import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";

interface AuthWrapperProps {
  heading: string;
  backButtonLabel?: string;
  backButtonHref?: string;
}

export const AuthWrapper = ({
  heading,
  backButtonLabel,
  backButtonHref,
  children
}: PropsWithChildren<AuthWrapperProps>) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-[450px]">
        <CardHeader className="flex flex-row items-center">
          <Image src={"/logo.png"} alt="Lumina" width={45} height={45} />
          <CardTitle>{heading}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter className="-mt-2">
          {backButtonLabel && backButtonHref && (
            <Link href={backButtonHref} className="w-full">
              <Button variant="ghost" className="w-full">
                {backButtonLabel}
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};
