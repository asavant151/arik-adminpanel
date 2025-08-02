import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { logo } from '../../assets/assets';
import { ArrowDownIcon, ArrowUpIcon, FileTextIcon, GalleryVerticalEndIcon, LayoutDashboardIcon } from 'lucide-react';
import { categories } from '../../utils/Categories';
const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='flex flex-col bg-white border-r border-[#232321]/20 min-h-full pt-6 md:px-6 px-4'>
        <div className='flex items-center justify-center mb-8'>
            <img src={logo} alt="logo" />
        </div>
      <NavLink 
        end={true} 
        to="/admin" 
        className={({isActive}) => `flex items-center gap-3 py-3.5 md:px-9 md:min-w-64 font-rubik text-sm font-medium cursor-pointer ${isActive && "bg-[#003F62] px-3 rounded-lg !text-white md:w-auto w-[45px] md:h-[50px] h-[45px]"}`}
      >
        <LayoutDashboardIcon className='min-w-4 w-5' />
        <p className='hidden md:inline-block'>DASHBOARD</p>
      </NavLink>
      <NavLink 
        to="/admin/listProduct" 
        className={({isActive}) => {
          const path = window.location.pathname;
          const isAddProduct = path.includes('/addProduct');
          return `flex items-center gap-3 py-3.5 md:px-9 md:min-w-64 font-rubik text-sm font-medium cursor-pointer ${isActive || isAddProduct ? "bg-[#003F62] px-3 rounded-lg !text-white md:w-auto w-[45px] md:h-[50px] h-[45px]" : ""}`
        }}
      >
        <GalleryVerticalEndIcon className='min-w-4 w-5' />
        <p className='hidden md:inline-block'>ALL PRODUCTS</p>
      </NavLink>
      <NavLink 
        to="/admin/orderList" 
        className={({isActive}) => {
          const path = window.location.pathname;
          const isOrderDetails = path.includes('/orderList/');
          return `flex items-center gap-3 py-3.5 md:px-9 md:min-w-64 font-rubik text-sm font-medium cursor-pointer ${isActive || isOrderDetails ? "bg-[#003F62] px-3 rounded-lg !text-white md:w-auto w-[45px] md:h-[50px] h-[45px]" : ""}`
        }}
      >
        <FileTextIcon className='min-w-4 w-5' />
        <p className='hidden md:inline-block'>ORDER LIST</p>
      </NavLink>

      <div className='relative'>
          <div className='flex items-center justify-between gap-3 py-3.5 cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
          <p className='hidden md:inline-block font-rubik text-xl !text-[#232321] font-medium cursor-pointer'>Categories</p>
          {isOpen ? <ArrowDownIcon className='min-w-4 w-5 !text-[#232321]' /> : <ArrowUpIcon className='min-w-4 w-5 !text-[#232321]' />}
          </div>
        <ul className={`absolute top-full left-0 w-full z-10 ${isOpen ? '' : 'hidden'}`}>
          {categories.map((category, isActive) => (
            <li key={category.path} className='cursor-pointer'> 
              <NavLink 
                to={`/admin/listProduct?category=${category.path}`}
              >
                <div className='flex items-center justify-between mb-5'>
                  <p className='font-open-sans font-semibold text-base !text-[#232321]'>{category.name}</p>
                  <span className={`hidden md:inline-flex items-center justify-center w-[41px] h-[35px] p-2 rounded-sm font-open-sans font-semibold text-sm ${isActive ? 'bg-[#003F62] !text-white' : 'bg-[#e7e7e3]'}`}>{category.length}</span>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;