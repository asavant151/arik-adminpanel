import React from "react";
import Title from "../../components/admin/Title";
import DateRangePicker from "../../components/admin/DateRangePicker";
import DashboardCard from "../../components/admin/DashboardCard";
import { EllipsisVerticalIcon, ShoppingBagIcon } from "lucide-react";
import SalesGraph from "../../components/admin/SalesGraph";
import BestSellers from "../../components/admin/BestSellers";
import { DummyPro } from "../../assets/assets";
import OrderTableItem from "../../components/admin/OrderTableItem";
import { OrderItems } from "../../utils/OrderItemsData.ts";

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <Title title="Dashboard" subtitle="Home > Dashboard" />
        <DateRangePicker />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
        <DashboardCard
          title="Total Orders"
          subtitle="Compared to Oct 2023"
          totalPrice={126.5}
          icon={<ShoppingBagIcon color="#fff" size={20} />}
          count={34.7}
        />
        <DashboardCard
          title="Active Orders"
          subtitle="Compared to Oct 2023"
          totalPrice={126.5}
          icon={<ShoppingBagIcon color="#fff" size={20} />}
          count={34.7}
        />
        <DashboardCard
          title="Completed Order s"
          subtitle="Compared to Oct 2023"
          totalPrice={126.5}
          icon={<ShoppingBagIcon color="#fff" size={20} />}
          count={34.7}
        />
        <DashboardCard
          title="Return Orders"
          subtitle="Compared to Oct 2023"
          totalPrice={126.5}
          icon={<ShoppingBagIcon color="#fff" size={20} />}
          count={34.7}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
        <div className="col-span-1 lg:col-span-3">
          <SalesGraph />
        </div>
        <BestSellers
          title="Lorem Ipsum"
          subPrice="126.5"
          totalPrice={126.5}
          icon={DummyPro}
          count={999}
        />
      </div>
      <div className="py-6 px-4 bg-[#fafafa] rounded-2xl">
        <div className="flex items-center justify-between mb-2 border-b border-[#232321]/20 pb-4">
          <div>
            <p className="font-rubik font-semibold text-sm !text-black">
              Recent Orders
            </p>
          </div>
          <div>
            <EllipsisVerticalIcon />
          </div>
        </div>
        <div className="relative h-4/5 mt-4 overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[#232321]/20">
              <tr>
                <td scope="col" className="px-2 py-4 font-rubik font-medium">
                  <input type="checkbox" />
                </td>
                <td
                  scope="col"
                  className="px-2 py-4 font-rubik font-medium !text-[#232321]/80 max-sm:hidden"
                >
                  Product
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
                  Date
                </td>
                <td
                  scope="col"
                  className="px-2 py-4 font-rubik font-medium !text-[#232321]/80 max-sm:hidden"
                >
                  Customer Name
                </td>
                <td
                  scope="col"
                  className="px-2 py-4 font-rubik font-medium !text-[#232321]/80"
                >
                  Status
                </td>
                <td
                  scope="col"
                  className="px-2 py-4 font-rubik font-medium !text-[#232321]/80"
                >
                  Amount
                </td>
              </tr>
            </thead>
            <tbody>
              {OrderItems.map((items, index) => {
                return (
                  <OrderTableItem
                    key={index}
                    orderId={items.orderId}
                    productName={items.productName}
                    customerImg={items.customerImg}
                    date={items.date}
                    customerName={items.customerName}
                    status={items.status}
                    amount={items.amount}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
