import React from "react";

interface RecentPurchaseTableItemProps {
  orderId: string;
  productName: string;
  customerImg: string;
  date: string;
  customerName: string;
  status: string;
  amount: number;
  isMobile?: boolean;
}

const RecentPurchaseTableItem: React.FC<RecentPurchaseTableItemProps> = ({
  orderId,
  productName,
  customerImg,
  date,
  customerName,
  status,
  amount,
  isMobile = false,
}) => {
  const currencySymbol = import.meta.env.VITE_CURRENCY_SYMBOL;

  // Status indicator component
  const StatusIndicator = () => {
    let indicatorClass = "";
    let statusText = status;

    if (status === "Delivered") {
      indicatorClass = "bg-[#003F62]";
    } else if (status === "Cancelled") {
      indicatorClass = "bg-[#FFA52F]";
    } else {
      indicatorClass = "bg-blue-500";
      statusText = "Processing";
    }

    return (
      <div className="flex items-center gap-2">
        <span className={`${indicatorClass} rounded-full w-2 h-2 me-2`}></span>
        {!isMobile && <span>{statusText}</span>}
      </div>
    );
  };

  if (isMobile) {
    return (
      <>
        <td className="px-2 py-4">
          <input type="checkbox" />
        </td>
        <td className="px-2 py-4">
          <div className="flex flex-col">
            <span className="font-open-sans font-semibold text-sm !text-black">
              {productName}
            </span>
            <span className="font-open-sans text-xs text-gray-500">
              {date}
            </span>
          </div>
        </td>
        <td className="px-2 py-4">
          <StatusIndicator />
        </td>
        <td className="px-2 py-4 font-open-sans font-semibold text-sm !text-black">
          {currencySymbol}
          {amount}
        </td>
      </>
    );
  }

  return (
    <>
      <td className="px-2 py-4">
        <input type="checkbox" />
      </td>
      <td className="px-2 py-4 font-open-sans font-semibold text-base !text-black">
        {productName}
      </td>
      <td className="px-2 py-4 font-open-sans font-semibold text-sm !text-black">
        {orderId}
      </td>
      <td className="px-2 py-4 font-open-sans font-semibold text-sm !text-black">
        {date}
      </td>
      <td className="px-2 py-4 font-open-sans font-semibold text-sm !text-black">
        {customerImg ? (
          <div className="flex gap-3 items-center">
            <img
              src={customerImg}
              alt={customerName}
              className="w-6 h-6 rounded-full"
            />
            {customerName}
          </div>
        ) : (
          customerName
        )}
      </td>
      <td className="px-2 py-4 font-open-sans font-semibold text-sm !text-black">
        <StatusIndicator />
      </td>
      <td className="px-2 py-4 font-open-sans font-semibold text-sm !text-black">
        {currencySymbol}
        {amount}
      </td>
    </>
  );
};

export default RecentPurchaseTableItem;