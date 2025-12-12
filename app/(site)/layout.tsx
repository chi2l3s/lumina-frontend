import { Header } from "@/components/shared/layout/header";
import { PropsWithChildren } from "react";

export default function SiteLayout({ children } : PropsWithChildren<unknown>) {
    return (
        <div className="w-full">
            <Header />
            {children}
        </div>
    )
}