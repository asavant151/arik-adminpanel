import React, { useState, useEffect } from "react";
import Title from "../../components/admin/Title";
import DateRangePicker from "../../components/admin/DateRangePicker";
import { ChevronLeft, ChevronRight, EllipsisVerticalIcon } from "lucide-react";
import RecentPurchaseTableItem from "../../components/admin/RecentPurchaseTableItem";
import { RecentPurchaseItems } from "../../utils/RecentPurchaseItemsData";
import { useNavigate } from "react-router-dom";

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

const OrderList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });
  const [filteredItems, setFilteredItems] = useState(RecentPurchaseItems);
  const itemsPerPage = 8;

  const navigate = useNavigate();

  const handleOrderDetails = (orderId: string) => {
    navigate(`/admin/orderList/${orderId}`);
  };

  // Apply filters whenever status or date range changes
  useEffect(() => {
    let result = [...RecentPurchaseItems];

    // Filter by status
    if (selectedStatus) {
      result = result.filter((item) => item.status === selectedStatus);
    }

    // Filter by date range
    if (dateRange.startDate && dateRange.endDate) {
      const start = new Date(dateRange.startDate);
      const end = new Date(dateRange.endDate);
      end.setHours(23, 59, 59, 999); // Include the entire end day

      result = result.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= start && itemDate <= end;
      });
    }

    setFilteredItems(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedStatus, dateRange]);

  // Calculate total pages based on filtered items
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Function to handle date range change
  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
  };

  // Function to handle status change
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  };

  // Function to generate page numbers with ellipsis (same as before)
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 4;

    if (totalPages <= maxVisiblePages + 3) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= maxVisiblePages) {
        for (let i = 1; i <= maxVisiblePages; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (
        currentPage > maxVisiblePages &&
        currentPage < totalPages - 2
      ) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        pageNumbers.push(currentPage - 1);
        pageNumbers.push(currentPage);
        pageNumbers.push(currentPage + 1);
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      }
    }

    return pageNumbers;
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <Title title="Orders List" subtitle="Home > Orders List" />
        <DateRangePicker onDateRangeChange={handleDateRangeChange} />
      </div>
      <div className="flex items-center justify-end mb-6">
        <select
          name="status"
          value={selectedStatus}
          onChange={handleStatusChange}
          className="p-3 rounded-lg bg-[#f4f2f2] font-open-sans font-semibold text-sm cursor-pointer"
        >
          <option value="">All Statuses</option>
          <option value="Delivered">Delivered</option>
          <option value="Processing">Processing</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
      <div className="py-6 px-4 bg-[#fafafa] rounded-2xl">
        {/* Table header remains the same */}
        <div className="flex items-center justify-between mb-2 border-b border-[#232321]/20 pb-4">
          <div>
            <p className="font-rubik font-semibold text-sm !text-black">
              Recent Purchases
            </p>
          </div>
          <div>
            <EllipsisVerticalIcon />
          </div>
        </div>

        {/* Table content with filtered items */}
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
              {currentItems.length > 0 ? (
                currentItems.map((items, index) => (
                  <tr
                    key={index}
                    onClick={() => handleOrderDetails(items.orderId)}
                    className="cursor-pointer hover:bg-[#232321]/5 transition-colors border-b border-[#232321]/20"
                  >
                    <RecentPurchaseTableItem {...items} />
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="py-4 text-center font-open-sans font-semibold text-base !text-[#232321]/80"
                  >
                    No orders found matching your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination controls - only show if there are items */}
      {filteredItems.length > 0 && (
        <div className="flex justify-start items-center mt-6 gap-2">
          <button
            onClick={() => paginate(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentPage === 1
                ? "bg-[#232321] !text-white cursor-not-allowed"
                : "bg-transparent border border-[#232321] text-[#232321] cursor-pointer"
            }`}
          >
            <ChevronLeft size={20} />
          </button>

          {getPageNumbers().map((number, index) =>
            number === "..." ? (
              <span key={index} className="px-3 py-1">
                ...
              </span>
            ) : (
              <button
                key={index}
                onClick={() => paginate(Number(number))}
                className={`font-rubik font-medium py-2 px-4 rounded-lg mx-1 flex items-center justify-center cursor-pointer ${
                  currentPage === number
                    ? "bg-[#232321] !text-white"
                    : "bg-transparent border border-[#232321] text-[#232321]"
                }`}
              >
                {number}
              </button>
            )
          )}

          <button
            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentPage === totalPages
                ? "bg-[#232321] !text-white cursor-not-allowed"
                : "bg-transparent border border-[#232321] text-[#232321] cursor-pointer"
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </>
  );
};

export default OrderList;
