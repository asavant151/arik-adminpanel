import { EllipsisVerticalIcon } from "lucide-react";
import React from "react";

type BestSellersProps = {
  title: string;
  subPrice: string;
  totalPrice: number;
  icon: string;
  count: number;
};

const BestSellers: React.FC<BestSellersProps> = ({
  title,
  subPrice,
  totalPrice,
  icon,
  count,
}) => {
  const currencySymbol = import.meta.env.VITE_CURRENCY_SYMBOL;
  return (
    <div className="py-6 px-4 bg-[#fafafa] rounded-2xl">
      <div className="flex items-center justify-between mb-2 border-b border-[#232321] pb-5">
        <div>
          <p className="font-rubik font-semibold text-sm !text-black">
            Best Sellers
          </p>
        </div>
        <div>
          <EllipsisVerticalIcon />
        </div>
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between mb-4">
          <div className="flex items-center justify-between">
            <div className="me-5">
              <img src={icon} alt={title} className="w-16 h-16 rounded-lg" />
            </div>
            <div className="flex flex-col items-start">
              <p className="font-open-sans font-semibold text-base !text-black">
                {title}
              </p>
              <p className="font-open-sans font-semibold text-sm !text-black/60">
                {currencySymbol}
                {subPrice}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <p className="font-rubik font-semibold text-base !text-black">
              {currencySymbol}
              {totalPrice * (i + 1)}
            </p>
            <p className="font-open-sans font-semibold text-sm !text-black/60">
              {count} sales
            </p>
          </div>
        </div>
      ))}
      <button className="p-2.5 bg-[#003F62] !text-white rounded-lg font-rubik font-medium text-sm mt-4">REPORT</button>
    </div>
  );
};

export default BestSellers;

