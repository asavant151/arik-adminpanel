import React from "react";
import { ArrowUp, EllipsisVerticalIcon } from "lucide-react";
type DashboardCardProps = {
  title: string;
  subtitle: string;
  totalPrice: number;
  icon: React.ReactNode;
  count: number;
};

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  subtitle,
  totalPrice,
  icon,
  count,
}) => {
  const currencySymbol = import.meta.env.VITE_CURRENCY_SYMBOL;
  return (
    <div className="py-6 px-4 bg-[#fafafa] rounded-2xl">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="font-rubik font-semibold text-sm !text-black">{title}</p>
        </div>
        <div>
          <EllipsisVerticalIcon />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between gap-x-4">
          <div className="p-2.5 bg-[#003F62] rounded-lg">{icon}</div>
          <div>
            <p className="font-rubik font-bold text-base !text-black">
              {currencySymbol}
              {totalPrice}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-x-1">
          <ArrowUp />
          <p className="font-open-sans font-semibold text-sm !text-black">
            {count}%
          </p>
        </div>
      </div>
      <p className="font-open-sans font-semibold text-xs !text-black/70 text-end mt-2">
        {subtitle}
      </p>
    </div>
  );
};

export default DashboardCard;
