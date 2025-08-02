import React, { useState, useRef, useEffect } from "react";
import { ArrowDownIcon, ArrowRight } from "lucide-react";
import { IoIosLogOut } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";

const AdminDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm font-medium font-rubik !text-[#1c1c1a] px-4 py-2 border border-solid border-[#1c1c1a] rounded-lg cursor-pointer flex items-center gap-x-2 hover:bg-[#003F62] hover:!text-white transition-all duration-300 ease-in-out"
      >
        ADMIN <ArrowDownIcon size={20} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 p-4 rounded-2xl w-[223px] bg-white shadow-lg border border-gray-200 z-50 overflow-hidden">
          {/* User Info Section */}
          <h4 className="font-rubik font-semibold text-lg !text-[#232321]">{user?.firstName && user?.lastName ? `${user?.firstName} ${user?.lastName}` : 'ADMIN'}</h4>
          <button className="flex items-center cursor-pointer font-rubik font-medium text-sm text-[#232321] mt-6 text-nowrap">CHANGE PASSWORD<ArrowRight size={20} className="ms-10" /></button>
          <button className="flex items-center cursor-pointer font-rubik font-medium text-sm text-[#232321] mt-6 text-nowrap" onClick={logout}>LOGOUT<IoIosLogOut size={20} className="ms-10" /></button>
        </div>
      )}
    </div>
  );
};

export default AdminDropdown;
