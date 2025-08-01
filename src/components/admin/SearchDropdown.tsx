import { Search, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { DummyPro } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const SearchDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const products = [
    { id: 1, name: "Solar Panel", image: DummyPro },
    { id: 2, name: "Drone Battery 11.1V", image: DummyPro },
    { id: 3, name: "Rechargeable Pet Collar Battery", image: DummyPro },
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSearch = () => {
    setIsOpen(!isOpen);
    setIsExpanded(!isExpanded);
    if (!isOpen) {
      setTimeout(() => {
        const input = document.getElementById("search-input");
        if (input) input.focus();
      }, 100);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const navigate = useNavigate();

  const handleSeeAllProducts = () => {
    navigate("/admin/listProduct");
    setIsOpen(false);
    setIsExpanded(false);
  };

  return (
    <div className="relative" ref={searchRef}>
      {!isExpanded ? (
        <button
          onClick={toggleSearch}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
        >
          <Search color="#232321" size={20} />
        </button>
      ) : (
        <div className="relative">
          <input
            id="search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="py-1 px-4 pr-8 rounded-lg border border-[#232321] focus:outline-none focus:border-[#003F62] transition-all duration-300 w-40 sm:w-56 font-rubik !text-[#1c1c1a]"
          />
          {searchQuery ? (
            <button
              onClick={clearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 rounded-full w-[24px] h-[24px] flex items-center justify-center border-2 border-[#232321] p-1 cursor-pointer"
            >
              <X size={20} />
            </button>
          ) : (
            <Search
              color="#232321"
              size={20}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            />
          )}
        </div>
      )}

      {isOpen && (
        <div className="absolute right-0 mt-2 p-4 rounded-2xl w-[215px] bg-white shadow-lg border border-gray-200 z-50 overflow-hidden">
          <h3 className="font-rubik font-semibold text-lg !text-[#232321] mb-4">
            Products
          </h3>
          <ul className="space-y-2">
            {filteredProducts.map((product) => (
              <li key={product.id} className="flex items-center">
                <img
                  src={product.image}
                  alt=""
                  className="w-10 h-10 rounded-lg me-2.5"
                />
                <label
                  htmlFor={`product-${product.id}`}
                  className="text-base font-open-sans !text-black"
                >
                  {product.name}
                </label>
              </li>
            ))}
          </ul>
          <button onClick={handleSeeAllProducts} className="text-sm font-rubik font-semibold !text-[#003F62] hover:underline mt-4 cursor-pointer">
            See all products
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
