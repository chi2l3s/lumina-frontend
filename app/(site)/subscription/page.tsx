'use client'

import { PricingTableThree } from "@/components/billingsdk/pricing-table-three";
import { plans } from "@/lib/billingsdk-config";

export default function SubscriptionPage() {
  return (
    <PricingTableThree
      plans={plans}
      className={"w-full max-w-4xl mx-auto"}
      variant="medium"
      showFooter={false}
      onFooterButtonClick={() => console.log("Footer button clicked")}
    />
  );
}
