export interface Plan {
  id: string;
  title: string;
  description: string;
  highlight?: boolean;
  type?: "monthly" | "yearly";
  currency?: string;
  monthlyPrice: string;
  yearlyPrice: string;
  buttonText: string;
  badge?: string;
  features: {
    name: string;
    icon: string;
    iconColor?: string;
  }[];
}

export interface CurrentPlan {
  plan: Plan;
  type: "monthly" | "yearly" | "custom";
  price?: string;
  nextBillingDate: string;
  paymentMethod: string;
  status: "active" | "inactive" | "past_due" | "cancelled";
}

export const plans: Plan[] = [
  {
    id: "platinum",
    title: "Lumina Platinum",
    description: "Открой доступ к фильмам и сериалам Lumina без ограничений.",
    currency: "₽",
    monthlyPrice: "199",
    yearlyPrice: "1599",
    buttonText: "Подключить",
    features: [
      {
        name: "Полный доступ ко всему каталогу Lumina",
        icon: "check",
        iconColor: "text-emerald-500",
      },
      {
        name: "Просмотр в высоком качестве (до 4K, где доступно)",
        icon: "check",
        iconColor: "text-blue-500",
      },
      {
        name: "Одновременный просмотр на нескольких устройствах",
        icon: "check",
        iconColor: "text-violet-500",
      },
      {
        name: "Ранний доступ к премьерам и новым сезонам",
        icon: "check",
        iconColor: "text-amber-500",
      },
      {
        name: "Персональные рекомендации и продолжение с того места, где остановился",
        icon: "check",
        iconColor: "text-zinc-500",
      },
    ],
  },
];
