import { ArrowUpIcon, Ellipsis } from "lucide-react";
import React from "react";

interface ProductCardProps {
  title: string;
  productType: string;
  description: string;
  price: number;
  icon: string;
  saleCount: number;
  remainingStock: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  productType,
  description,
  price,
  icon,
  saleCount,
  remainingStock,
}) => {
  const currencySymbol = import.meta.env.VITE_CURRENCY_SYMBOL;
  return (
    <div className="py-6 px-4 bg-[#fafafa] rounded-2xl">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center justify-between">
          <div>
            <img
              src={icon}
              alt={title}
              className="w-16 h-16 rounded-lg me-6 object-contain"
            />
          </div>
          <div className="flex flex-col items-start">
            <p className="font-open-sans font-semibold text-base !text-[#232321]">
              {title}
            </p>
            <p className="font-open-sans font-semibold text-sm !text-black/60 mb-4">
              {productType}
            </p>
            <p className="font-rubik font-semibold text-sm !text-[#232321]">
              {currencySymbol}
              {price}
            </p>
          </div>
        </div>
        <div className="bg-[#232321]/5 py-2 px-3 rounded-sm cursor-pointer">
          <Ellipsis className="text-[#232321]/50" />
        </div>
      </div>
      <div className="flex flex-col items-start gap-y-1 mb-4">
        <h3 className="!font-open-sans !font-semibold !text-base !text-[#232321]">
          Summary
        </h3>
        <p className="font-open-sans font-normal text-sm !text-[#232321]/60 mb-4">
          {description}
        </p>
      </div>
      <div className="border border-[#232321]/30 rounded-lg p-4">
        <div className="flex items-center justify-between border-b border-[#232321]/40 pb-2">
          <p className="font-open-sans font-semibold text-sm !text-[#232321]/80">
            Sales
          </p>
          <div className="flex items-center">
            <ArrowUpIcon size={20} color="#FFA52F" className="me-2.5 " />
            <p className="font-open-sans font-semibold text-sm !text-black/60">
              {saleCount}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="font-open-sans font-semibold text-sm !text-[#232321]/80">
            Remaining Products
          </p>
          <div className="flex items-center gap-x-2">
            <div className="w-16 h-2 bg-[#E7E7E3] rounded-lg shadow-sm overflow-hidden">
              <div
                className="h-2 bg-[#FFA52F] rounded-lg"
                style={{
                  width: `${Math.min(
                    100,
                    (remainingStock / (remainingStock + saleCount)) * 100
                  )}%`,
                }}
              ></div>
            </div>
            <p className="font-open-sans font-semibold text-sm !text-black/60">
              {remainingStock}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
