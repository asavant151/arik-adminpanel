import React, { useState } from "react";
import Title from "../../components/admin/Title";
import { CirclePlus, ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../../components/admin/ProductCard";
import { ProductItems } from "../../utils/ProductData";
import { useNavigate } from "react-router-dom";

const AllProduct: React.FC = () => {
  const navigate = useNavigate();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; // Number of products to show per page

  // Calculate total pages
  const totalPages = Math.ceil(ProductItems.length / productsPerPage);

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = ProductItems.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Generate page numbers with ellipsis
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 3; // Number of pages to show around current

    // Always show first page
    pageNumbers.push(1);

    // Show ellipsis if current page is far from start
    if (currentPage > maxVisiblePages + 1) {
      pageNumbers.push('...');
    }

    // Calculate range of pages to show around current
    let startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages - 1, currentPage + Math.floor(maxVisiblePages / 2));

    // Adjust if we're at the beginning or end
    if (currentPage <= maxVisiblePages) {
      endPage = Math.min(maxVisiblePages + 1, totalPages - 1);
    } else if (currentPage >= totalPages - Math.floor(maxVisiblePages / 2)) {
      startPage = Math.max(totalPages - maxVisiblePages, 2);
    }

    // Add page numbers in range
    for (let i = startPage; i <= endPage; i++) {
      if (i > 1 && i < totalPages) {
        pageNumbers.push(i);
      }
    }

    // Show ellipsis if current page is far from end
    if (currentPage < totalPages - Math.floor(maxVisiblePages / 2) - 1) {
      pageNumbers.push('...');
    }

    // Always show last page if there's more than 1 page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers.map((number, index) => {
      if (number === '...') {
        return (
          <span key={index} className="px-1 sm:px-2 py-1">
            {number}
          </span>
        );
      }

      return (
        <button
          key={index}
          onClick={() => paginate(Number(number))}
          className={`font-rubik font-medium py-1 px-2 sm:py-2 sm:px-4 rounded-lg mx-0.5 sm:mx-1 flex items-center justify-center cursor-pointer text-sm sm:text-base ${
            currentPage === number
              ? "bg-[#232321] !text-white"
              : "bg-transparent border border-[#232321] text-[#232321]"
          }`}
        >
          {number}
        </button>
      );
    });
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <Title title="All Products" subtitle="Home > All Products" />  
        <button 
          className="bg-[#232321] rounded-lg py-2 px-4 font-rubik font-medium !text-[#fff] flex items-center gap-x-2 cursor-pointer hover:bg-[#003F62] transition-all duration-300 ease-in-out whitespace-nowrap"
          onClick={() => navigate('/admin/addProduct')}
        >
          <CirclePlus size={20} color="#fff" className="me-2" /> 
          <span className="hidden sm:inline">Add New Product</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {currentProducts.map((item, index) => (
          <ProductCard
            key={index}
            title={item.title}
            productType={item.productType}
            description={item.description}
            price={item.price}
            icon={item.icon}
            saleCount={item.saleCount}
            remainingStock={item.remainingStock}
          />
        ))}
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-center mt-8 overflow-x-auto">
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => paginate(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-transparent border border-[#232321] text-[#232321] cursor-pointer hover:bg-gray-100"
            }`}
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>
          
          {renderPageNumbers()}
          
          <button
            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-transparent border border-[#232321] text-[#232321] cursor-pointer hover:bg-gray-100"
            }`}
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </>
  );
};

export default AllProduct;