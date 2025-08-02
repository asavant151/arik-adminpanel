import { useParams } from "react-router-dom";
import Title from "../../components/admin/Title";
import { RecentPurchaseItems } from "../../utils/RecentPurchaseItemsData";
import { noOrderImg } from "../../assets/assets";
import DateRangePicker from "../../components/admin/DateRangePicker";
import { EllipsisVerticalIcon, Printer, User } from "lucide-react";
import { BsHandbag } from "react-icons/bs";

const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const order = RecentPurchaseItems.find((item) => item.orderId === orderId);
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL;

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <img
          src={noOrderImg}
          alt="No order found"
          className="w-full max-w-[500px] h-auto max-h-[500px]"
        />
        <p className="font-rubik font-semibold text-xl md:text-2xl !text-[#232321]/80 mt-4 text-center">
          No Order Found
        </p>
      </div>
    );
  }

  // Calculate order summary values
  const subtotal = order.product.reduce((sum, product) => {
    return sum + product.productPrice * product.productQuantity;
  }, 0);

  const taxRate = 0.2; // 20% tax
  const tax = subtotal * taxRate;
  const discount = order.discount || 0;
  const shippingRate = order.shippingRate || 0;
  const total = subtotal + tax + shippingRate - discount;

  const handlePrint = () => {
    const printContent = document.getElementById("print-content");
    const originalContent = document.body.innerHTML;

    if (printContent) {
      document.body.innerHTML = printContent.innerHTML;
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload();
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <Title
          title="Orders Details"
          subtitle="Home > Order List > Order Details"
        />
      </div>

      {/* Order Header Section */}
      <div className="py-4 md:py-6 px-4 bg-[#fafafa] rounded-2xl mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
          <h1 className="text-lg md:text-xl font-rubik font-semibold">
            Orders ID: {orderId}
          </h1>
          <div
            className={`p-2 rounded-lg font-open-sans font-semibold text-xs ${
              order?.status === "Delivered"
                ? "bg-green-100 !text-green-800"
                : order?.status === "Processing"
                ? "bg-blue-100 !text-blue-800"
                : "bg-red-100 !text-red-800"
            }`}
          >
            {order?.status}
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col md:flex-row md:items-center items-start md:justify-between gap-4 mb-4">
          <div className="w-full md:w-auto">
            <DateRangePicker />
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
            <select
              name="status"
              className="py-2 px-4 rounded-lg bg-[#f4f2f2] font-open-sans font-semibold text-sm cursor-pointer w-full"
            >
              <option value="">All Statuses</option>
              <option value="Delivered">Delivered</option>
              <option value="Processing">Processing</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <button
              type="button"
              onClick={handlePrint}
              className="py-2 px-4 rounded-lg bg-[#f4f2f2] cursor-pointer text-[#232321] flex items-center justify-center gap-2"
            >
              <Printer size={18} />
              <span className="sm:hidden">Print</span>
            </button>
            <button
              type="button"
              className="py-2 px-4 rounded-lg bg-[#f4f2f2] font-open-sans font-semibold text-sm cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Customer Card */}
          <div className="p-4 md:p-6 rounded-2xl border border-[#E7E7E3]">
            <div className="flex items-start gap-3 md:gap-4 mb-4">
              <div className="p-3 md:p-4 rounded-lg bg-[#232321] flex-shrink-0">
                <User color="#fff" size={20} />
              </div>
              <div className="flex flex-col items-start">
                <h5 className="font-semibold text-lg md:text-xl mb-2">
                  Customer
                </h5>
                <p className="font-open-sans font-semibold text-sm md:text-base !text-[#70706E] mb-1 md:mb-2">
                  Full Name:{" "}
                  <span className="text-black">{order?.customerName}</span>
                </p>
                <p className="font-open-sans font-semibold text-sm md:text-base !text-[#70706E] mb-1 md:mb-2">
                  Email:{" "}
                  <span className="text-black">{order?.customerEmail}</span>
                </p>
                <p className="font-open-sans font-semibold text-sm md:text-base !text-[#70706E]">
                  Phone:{" "}
                  <span className="text-black">{order?.customerPhone}</span>
                </p>
              </div>
            </div>
            <button className="font-rubik text-sm py-2 px-4 rounded-lg bg-[#003F62] hover:bg-[#003F62]/80 cursor-pointer !text-white w-full">
              View Profile
            </button>
          </div>

          {/* Order Info Card */}
          <div className="p-4 md:p-6 rounded-2xl border border-[#E7E7E3]">
            <div className="flex items-start gap-3 md:gap-4 mb-4">
              <div className="p-3 md:p-4 rounded-lg bg-[#232321] flex-shrink-0">
                <BsHandbag color="#fff" size={20} />
              </div>
              <div className="flex flex-col items-start">
                <h5 className="font-semibold text-lg md:text-xl mb-2">
                  Order Info
                </h5>
                <p className="font-open-sans font-semibold text-sm md:text-base !text-[#70706E] mb-1 md:mb-2">
                  Shipping:{" "}
                  <span className="text-black">{order?.shipping}</span>
                </p>
                <p className="font-open-sans font-semibold text-sm md:text-base !text-[#70706E] mb-1 md:mb-2">
                  Payment:{" "}
                  <span className="text-black">{order?.paymentMethod}</span>
                </p>
                <p className="font-open-sans font-semibold text-sm md:text-base !text-[#70706E]">
                  Status: <span className="text-black">{order?.status}</span>
                </p>
              </div>
            </div>
            <button className="font-rubik text-sm py-2 px-4 rounded-lg bg-[#003F62] hover:bg-[#003F62]/80 cursor-pointer !text-white w-full">
              Download info
            </button>
          </div>

          {/* Delivery Card */}
          <div className="p-4 md:p-6 rounded-2xl border border-[#E7E7E3]">
            <div className="flex items-start gap-3 md:gap-4 mb-4">
              <div className="p-3 md:p-4 rounded-lg bg-[#232321] flex-shrink-0">
                <BsHandbag color="#fff" size={20} />
              </div>
              <div className="flex flex-col items-start">
                <h5 className="font-semibold text-lg md:text-xl mb-2">
                  Deliver to
                </h5>
                <p className="font-open-sans font-semibold text-sm md:text-base !text-[#70706E]">
                  Address:{" "}
                  <span className="text-black">{order?.customerAddress}</span>
                </p>
              </div>
            </div>
            <button className="font-rubik text-sm py-2 px-4 rounded-lg bg-[#003F62] hover:bg-[#003F62]/80 cursor-pointer !text-white w-full">
              View Profile
            </button>
          </div>
        </div>

        {/* Payment Info and Notes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          <div className="p-4 md:p-6 rounded-2xl border border-[#E7E7E3]">
            <div className="flex flex-col items-start">
              <h5 className="font-semibold text-lg md:text-xl mb-2">
                Payment Info
              </h5>
              <p className="font-open-sans font-semibold text-sm md:text-base !text-[#70706E] mb-1 md:mb-2">
                Card:{" "}
                <span className="text-black">
                  {order?.paymentMethod} {order?.cardNumber}
                </span>
              </p>
              <p className="font-open-sans font-semibold text-sm md:text-base !text-[#70706E] mb-1 md:mb-2">
                Business:{" "}
                <span className="text-black">{order?.customerName}</span>
              </p>
              <p className="font-open-sans font-semibold text-sm md:text-base !text-[#70706E]">
                Phone:{" "}
                <span className="text-black">{order?.customerPhone}</span>
              </p>
            </div>
          </div>
          <div className="lg:col-span-2">
            <h5 className="font-semibold text-lg md:text-xl mb-2">Note</h5>
            <textarea
              name="note"
              rows={3}
              placeholder="Type some notes"
              className="w-full min-h-[120px] md:h-[160px] p-4 rounded-2xl border border-[#E7E7E3] placeholder:font-open-sans placeholder:text-[#70706E] placeholder:text-sm md:placeholder:text-base font-open-sans text-sm md:text-base !text-[#70706E]"
            ></textarea>
          </div>
        </div>
      </div>

      {/* Printable Content */}
      <div id="print-content">
        <div className="py-4 md:py-6 px-4 bg-[#fafafa] rounded-2xl">
          {/* Products Table Header */}
          <div className="flex items-center justify-between mb-2 border-b border-[#232321]/20 pb-4">
            <div>
              <p className="font-rubik font-semibold text-sm md:text-base !text-black">
                Products
              </p>
            </div>
            <div>
              <EllipsisVerticalIcon size={20} />
            </div>
          </div>

          {/* Products Table */}
          <div className="overflow-x-auto mb-4">
            <table className="w-full">
              <thead className="border-b md:border-1 border-none border-[#232321]/20">
                <tr>
                  <th
                    scope="col"
                    className="px-2 py-3 font-rubik font-medium !text-[#232321]/80 text-left table-cell"
                  >
                    Product Name
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3 font-rubik font-medium !text-[#232321]/80 text-left hidden md:table-cell"
                  >
                    Order ID
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3 font-rubik font-medium !text-[#232321]/80 text-left"
                  >
                    Qty
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3 font-rubik font-medium !text-[#232321]/80 text-left table-cell"
                  >
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {order.product.map((product, index) => (
                  <tr key={index} className="border-b md:border-1 border-none border-[#232321]/20">
                    <td className="px-2 py-3 font-open-sans font-semibold !text-black text-sm md:text-base table-cell">
                      <div className="flex items-center flex-wrap gap-2 md:gap-4">
                        <div className="hidden md:table-cell">
                          <input type="checkbox" />
                        </div>
                        <div className="hidden md:table-cell">
                          <img
                            src={product?.productImg}
                            alt={product?.productName}
                            className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] object-cover"
                          />
                        </div>
                        <div>
                          <p>{product?.productName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-3 font-open-sans font-semibold !text-black text-sm md:text-base hidden md:table-cell">
                      {product?.productId}
                    </td>
                    <td className="px-2 py-3 font-open-sans font-semibold !text-black text-sm md:text-base">
                      {product?.productQuantity}
                    </td>
                    <td className="px-2 py-3 font-open-sans font-semibold !text-black text-sm md:text-base table-cell">
                      {currency} {product?.productPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Order Summary */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <p className="font-open-sans font-semibold text-sm md:text-base !text-[#232321]">
                Subtotal
              </p>
              <p className="font-open-sans font-semibold text-sm md:text-base !text-[#232321]">
                {currency}
                {subtotal.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center justify-between mb-3">
              <p className="font-open-sans font-semibold text-sm md:text-base !text-[#232321]">
                Tax (20%)
              </p>
              <p className="font-open-sans font-semibold text-sm md:text-base !text-[#232321]">
                {currency}
                {tax.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center justify-between mb-3">
              <p className="font-open-sans font-semibold text-sm md:text-base !text-[#232321]">
                Discount
              </p>
              <p className="font-open-sans font-semibold text-sm md:text-base !text-[#232321]">
                {currency}
                {discount.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center justify-between mb-3">
              <p className="font-open-sans font-semibold text-sm md:text-base !text-[#232321]">
                Shipping
              </p>
              <p className="font-open-sans font-semibold text-sm md:text-base !text-[#232321]">
                {currency}
                {shippingRate.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center justify-between mb-3 pt-3 border-t border-[#232321]/20">
              <p className="font-open-sans font-semibold text-lg md:text-2xl !text-[#232321]">
                Total
              </p>
              <p className="font-open-sans font-semibold text-lg md:text-2xl !text-[#232321]">
                {currency}
                {total.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
