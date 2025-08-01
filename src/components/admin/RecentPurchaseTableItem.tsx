import React from "react";

interface RecentPurchaseTableItemProps {
  orderId: string;
  productName: string;
  customerImg: string;
  date: string;
  customerName: string;
  status: string;
  amount: number;
}

const RecentPurchaseTableItem: React.FC<RecentPurchaseTableItemProps> = ({
  orderId,
  productName,
  customerImg,
  date,
  customerName,
  status,
  amount,
}) => {
  const currencySymbol = import.meta.env.VITE_CURRENCY_SYMBOL;

  return (
    <>
      <td className="px-2 py-4">
        <input type="checkbox" />
      </td>
      <td className="px-2 py-4 font-open-sans font-semibold text-base !text-black">
        {productName}
      </td>
      <td className="px-2 py-4 font-open-sans font-semibold text-sm !text-black max-sm:hidden">
        {orderId}
      </td>
      <td className="px-2 py-4 font-open-sans font-semibold text-sm !text-black">
        {date}
      </td>
      <td className="px-2 py-4 font-open-sans font-semibold text-sm !text-black max-sm:hidden">
        {customerImg ? (
          <div className="flex gap-3">
            <img
              src={customerImg}
              alt={customerName}
              className="w-6 h-6 rounded-full"
            />{" "}
            {customerName}
          </div>
        ) : (
          customerName
        )}
      </td>
      <td className="px-2 py-4 font-open-sans font-semibold text-sm !text-black">
        {status === "Delivered" ? (
          <div className="flex items-center gap-2">
            <span className="bg-[#003F62] rounded-full w-2 h-2 me-2"></span>
            <span>Delivered</span>
          </div>
        ) : status === "Cancelled" ? (
          <div className="flex items-center gap-2">
            <span className="bg-[#FFA52F] rounded-full w-2 h-2 me-2"></span>
            <span>Cancelled</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="bg-blue-500 rounded-full w-2 h-2 me-2"></span>
            <span>Processing</span>
          </div>
        )}
      </td>
      <td className="px-2 py-4 font-open-sans font-semibold text-sm !text-black">
        {currencySymbol}
        {amount}
      </td>
    </>
  );
};

export default RecentPurchaseTableItem;
