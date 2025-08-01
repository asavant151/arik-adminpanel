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
      <div className="flex flex-col items-center justify-center">
        <img src={noOrderImg} alt="" className="w-[500px] h-[500px]" />{" "}
        <p className="font-rubik font-semibold text-2xl !text-[#232321]/80">
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
  const discount = order.discount || 0; // No need for optional chaining here
  const shippingRate = order.shippingRate || 0; // No need for optional chaining here
  const total = subtotal + tax + shippingRate - discount;

  const handlePrint = () => {
    const printContent = document.getElementById("print-content");
    const originalContent = document.body.innerHTML;

    if (printContent) {
      document.body.innerHTML = printContent.innerHTML;
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload(); // To restore the original content
    }
  };

  return (
    <>
      <div className="mb-6">
        <Title
          title="Orders Details"
          subtitle="Home > Order List > Order Details"
        />
      </div>
      <div className="py-6 px-4 bg-[#fafafa] rounded-2xl mb-6">
        <div className="flex items-center gap-x-6 mb-4">
          <h1 className="text-xl font-rubik font-semibold">
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
        <div className="flex flex-col md:flex-row md:items-center items-start md:justify-between mb-4">
          <div>
            <DateRangePicker />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-x-5 gap-y-2">
            <select
              name="status"
              //   value={selectedStatus}
              //   onChange={handleStatusChange}
              className="py-2 px-4 rounded-lg bg-[#f4f2f2] font-open-sans font-semibold text-sm cursor-pointer"
            >
              <option value="">All Statuses</option>
              <option value="Delivered">Delivered</option>
              <option value="Processing">Processing</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <button
              type="button"
              onClick={handlePrint}
              className="py-2 px-4 rounded-lg bg-[#f4f2f2] cursor-pointer text-[#232321]"
            >
              <Printer />
            </button>
            <button
              type="button"
              className="py-2 px-4 rounded-lg bg-[#f4f2f2] font-open-sans font-semibold text-sm cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-6 rounded-2xl border border-[#E7E7E3]">
            <div className="flex items-start gap-x-4 mb-4">
              <div className="p-4 rounded-lg bg-[#232321]">
                <User color="#fff" />
              </div>
              <div className="flex flex-col items-start">
                <h5 className="font-semibold text-xl mb-2">Customer</h5>
                <p className="font-open-sans font-semibold text-base !text-[#70706E] mb-2">
                  Full Name: <span>{order?.customerName}</span>
                </p>
                <p className="font-open-sans font-semibold text-base !text-[#70706E] mb-2">
                  Email: <span>{order?.customerEmail}</span>
                </p>
                <p className="font-open-sans font-semibold text-base !text-[#70706E]">
                  Phone: <span>{order?.customerPhone}</span>
                </p>
              </div>
            </div>
            <button className="font-rubik text-sm py-2 px-4 rounded-lg bg-[#003F62] hover:bg-[#003F62]/80 cursor-pointer !text-white w-full">
              View Profile
            </button>
          </div>
          <div className="p-6 rounded-2xl border border-[#E7E7E3]">
            <div className="flex items-start gap-x-4 mb-4">
              <div className="p-4 rounded-lg bg-[#232321]">
                <BsHandbag color="#fff" />
              </div>
              <div className="flex flex-col items-start">
                <h5 className="font-semibold text-xl mb-2">Order Info</h5>
                <p className="font-open-sans font-semibold text-base !text-[#70706E] mb-2">
                  Shipping: <span>{order?.shipping}</span>
                </p>
                <p className="font-open-sans font-semibold text-base !text-[#70706E] mb-2">
                  Payment Method: <span>{order?.paymentMethod}</span>
                </p>
                <p className="font-open-sans font-semibold text-base !text-[#70706E]">
                  Status: <span>{order?.status}</span>
                </p>
              </div>
            </div>
            <button className="font-rubik text-sm py-2 px-4 rounded-lg bg-[#003F62] hover:bg-[#003F62]/80 cursor-pointer !text-white w-full">
              Download info
            </button>
          </div>
          <div className="p-6 rounded-2xl border border-[#E7E7E3]">
            <div className="flex items-start gap-x-4 mb-4">
              <div className="p-4 rounded-lg bg-[#232321]">
                <BsHandbag color="#fff" />
              </div>
              <div className="flex flex-col items-start">
                <h5 className="font-semibold text-xl mb-2">Deliver to</h5>
                <p className="font-open-sans font-semibold text-base !text-[#70706E] mb-2">
                  Address: <span>{order?.customerAddress}</span>
                </p>
              </div>
            </div>
            <button className="font-rubik text-sm py-2 px-4 rounded-lg bg-[#003F62] hover:bg-[#003F62]/80 cursor-pointer !text-white w-full">
              View Profile
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div className="p-6 rounded-2xl border border-[#E7E7E3]">
            <div className="flex flex-col items-start">
              <h5 className="font-semibold text-xl mb-2">Payment Info</h5>
              <p className="font-open-sans font-semibold text-base !text-[#70706E] mb-2">
                Card Number:{" "}
                <span>
                  {order?.paymentMethod} {order?.cardNumber}
                </span>
              </p>
              <p className="font-open-sans font-semibold text-base !text-[#70706E] mb-2">
                Busuness name: <span>{order?.customerName}</span>
              </p>
              <p className="font-open-sans font-semibold text-base !text-[#70706E]">
                Phone: <span>{order?.customerPhone}</span>
              </p>
            </div>
          </div>
          <div className="col-span-2">
            <h5 className="font-semibold text-xl mb-2">Note</h5>
            <textarea
              name="note"
              rows={3}
              placeholder="Type some notes"
              className="w-full h-[160px] p-4 rounded-2xl border border-[#E7E7E3] placeholder:font-open-sans placeholder:text-[#70706E] placeholder:text-base font-open-sans text-base !text-[#70706E]"
            ></textarea>
          </div>
        </div>
      </div>
      <div id="print-content">
        <div className="py-6 px-4 bg-[#fafafa] rounded-2xl">
          {/* Table header remains the same */}
          <div className="flex items-center justify-between mb-2 border-b border-[#232321]/20 pb-4">
            <div>
              <p className="font-rubik font-semibold text-sm !text-black">
                Products
              </p>
            </div>
            <div>
              <EllipsisVerticalIcon />
            </div>
          </div>

          <div className="relative h-4/5 mt-4 overflow-x-auto mb-4">
            <table className="w-full">
              <thead className="border-b border-[#232321]/20">
                <tr>
                  <td
                    scope="col"
                    className="px-2 py-4 font-rubik font-medium !text-[#232321]/80 max-sm:hidden"
                  >
                    Product Name
                  </td>
                  <td
                    scope="col"
                    className="px-2 py-4 font-rubik font-medium !text-[#232321]/80 max-sm:hidden"
                  >
                    Order ID
                  </td>
                  <td
                    scope="col"
                    className="px-2 py-4 font-rubik font-medium !text-[#232321]/80"
                  >
                    Quantity
                  </td>
                  <td
                    scope="col"
                    className="px-2 py-4 font-rubik font-medium !text-[#232321]/80 max-sm:hidden"
                  >
                    Total
                  </td>
                </tr>
              </thead>
              <tbody>
                {order.product.map((product, index) => (
                  <tr key={index} className="border-b border-[#232321]/20">
                    <td className="px-2 py-4 font-open-sans font-semibold !text-black text-base max-sm:hidden">
                      <div className="flex items-center flex-wrap gap-x-4">
                        <div>
                          <input type="checkbox" />
                        </div>
                        <div>
                          <img
                            src={product?.productImg}
                            alt=""
                            className="w-[40px] h-[40px] object-cover"
                          />
                        </div>
                        <div>
                          <p>{product?.productName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-4 font-open-sans font-semibold !text-black text-base max-sm:hidden">
                      {product?.productId}
                    </td>
                    <td className="px-2 py-4 font-open-sans font-semibold !text-black text-base max-sm:hidden">
                      {product?.productQuantity}
                    </td>
                    <td className="px-2 py-4 font-open-sans font-semibold !text-black text-base max-sm:hidden">
                      {currency} {product?.productPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <p className="font-open-sans font-semibold text-base !text-[#232321] me-[146px]">
                Subtotal
              </p>
              <p className="font-open-sans font-semibold text-base !text-[#232321]">
                {currency}
                {subtotal.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center justify-between mb-4">
              <p className="font-open-sans font-semibold text-base !text-[#232321] me-[146px]">
                Tax (20%)
              </p>
              <p className="font-open-sans font-semibold text-base !text-[#232321]">
                {currency}
                {tax.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center justify-between mb-4">
              <p className="font-open-sans font-semibold text-base !text-[#232321] me-[146px]">
                Discount
              </p>
              <p className="font-open-sans font-semibold text-base !text-[#232321]">
                {currency}
                {discount.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center justify-between mb-4">
              <p className="font-open-sans font-semibold text-base !text-[#232321] me-[146px]">
                Shipping Rate
              </p>
              <p className="font-open-sans font-semibold text-base !text-[#232321]">
                {currency}
                {shippingRate.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center justify-between mb-4">
              <p className="font-open-sans font-semibold text-2xl !text-[#232321] me-[146px]">
                Total
              </p>
              <p className="font-open-sans font-semibold text-2xl !text-[#232321]">
                {currency}
                {total.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
