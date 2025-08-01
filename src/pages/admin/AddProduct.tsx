import React, { useState } from "react";
import Title from "../../components/admin/Title";
import { WithContext as ReactTags, type Tag } from "react-tag-input";
import { DummyPro } from "../../assets/assets";
import ProductGallery from "../../components/admin/ProductGallery";

const AddProduct: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);

  const handleDelete = (i: number) => {
    setTags(tags.filter((_, index) => index !== i));
  };

  const handleAddition = (tag: Tag) => {
    setTags([...tags, tag]);
  };

  return (
    <>
      <div className="mb-6">
        <Title
          title="Add New Product"
          subtitle="Home > All Products > Add New Product"
        />
      </div>
      <div className="py-6 px-4 bg-[#fafafa] rounded-2xl mb-6">
        <form>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="flex flex-col items-start">
                <label
                  htmlFor="productName"
                  className="font-rubik font-semibold text-md md:text-lg xl:text-xl !text-[#232321] mb-4"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="productName"
                  id="productName"
                  placeholder="Type name here"
                  className="py-2.5 px-6 rounded-lg border border-[#232321] placeholder:text-[#BCBCBC] focus:outline-none focus:border-[#003F62] placeholder:text-sm placeholder:font-rubik font-rubik font-semibold text-sm w-full mb-6"
                />

                <label
                  htmlFor="description"
                  className="font-rubik font-semibold text-md md:text-lg xl:text-xl !text-[#232321] mb-4"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  placeholder="Type description here"
                  className="py-2.5 px-6 rounded-lg border border-[#232321] placeholder:text-[#BCBCBC] focus:outline-none focus:border-[#003F62] placeholder:text-sm placeholder:font-rubik font-rubik font-semibold text-sm w-full h-[180px] mb-6"
                />

                <label
                  htmlFor="category"
                  className="font-rubik font-semibold text-md md:text-lg xl:text-xl !text-[#232321] mb-4"
                >
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  placeholder="Type category here"
                  className="py-2.5 px-6 rounded-lg border border-[#232321] placeholder:text-[#BCBCBC] focus:outline-none focus:border-[#003F62] placeholder:text-sm placeholder:font-rubik font-rubik font-semibold text-sm w-full mb-6"
                />

                <label
                  htmlFor="brandName"
                  className="font-rubik font-semibold text-md md:text-lg xl:text-xl !text-[#232321] mb-4"
                >
                  Brand Name
                </label>
                <input
                  type="text"
                  name="brandName"
                  id="brandName"
                  placeholder="Type brand name here"
                  className="py-2.5 px-6 rounded-lg border border-[#232321] placeholder:text-[#BCBCBC] focus:outline-none focus:border-[#003F62] placeholder:text-sm placeholder:font-rubik font-rubik font-semibold text-sm w-full mb-6"
                />

                <div className="flex md:flex-nowrap flex-wrap justify-between w-full items-center gap-4 mb-6">
                  <div className="w-full">
                    <label
                      htmlFor="sku"
                      className="font-rubik font-semibold text-md md:text-lg xl:text-xl !text-[#232321]"
                    >
                      SKU
                    </label>
                    <input
                      type="text"
                      name="sku"
                      id="sku"
                      placeholder="Fox-3983"
                      className="py-2.5 px-6 rounded-lg border border-[#232321] placeholder:text-[#BCBCBC] focus:outline-none focus:border-[#003F62] placeholder:text-sm placeholder:font-rubik font-rubik font-semibold text-sm w-full mt-4"
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="stockQuantity"
                      className="font-rubik font-semibold text-md md:text-lg xl:text-xl text-nowrap !text-[#232321]"
                    >
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      name="stockQuantity"
                      id="stockQuantity"
                      placeholder="1258"
                      className="py-2.5 px-6 rounded-lg border border-[#232321] placeholder:text-[#BCBCBC] focus:outline-none focus:border-[#003F62] placeholder:text-sm placeholder:font-rubik font-rubik font-semibold text-sm w-full mt-4"
                    />
                  </div>
                </div>

                <div className="flex md:flex-nowrap flex-wrap justify-between w-full items-center gap-4 mb-6">
                  <div className="w-full">
                    <label
                      htmlFor="regularPrice"
                      className="font-rubik font-semibold text-md md:text-lg xl:text-xl text-nowrap !text-[#232321]"
                    >
                      Regular Price
                    </label>
                    <input
                      type="number"
                      name="regularPrice"
                      id="regularPrice"
                      placeholder="₹1000"
                      className="py-2.5 px-6 rounded-lg border border-[#232321] placeholder:text-[#BCBCBC] focus:outline-none focus:border-[#003F62] placeholder:text-sm placeholder:font-rubik font-rubik font-semibold text-sm w-full mt-4"
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="salePrice"
                      className="font-rubik font-semibold text-md md:text-lg xl:text-xl !text-[#232321]"
                    >
                      Sale Price
                    </label>
                    <input
                      type="number"
                      name="salePrice"
                      id="salePrice"
                      placeholder="₹450"
                      className="py-2.5 px-6 rounded-lg border border-[#232321] placeholder:text-[#BCBCBC] focus:outline-none focus:border-[#003F62] placeholder:text-sm placeholder:font-rubik font-rubik font-semibold text-sm w-full mt-4"
                    />
                  </div>
                </div>

                <label
                  htmlFor="tag"
                  className="font-rubik font-semibold text-md md:text-lg xl:text-xl !text-[#232321] mb-4"
                >
                  Tag
                </label>

                <div className="py-2.5 px-6 rounded-lg border border-[#232321] placeholder:text-[#BCBCBC] focus:outline-none focus:border-[#003F62] placeholder:text-sm placeholder:font-rubik font-rubik font-semibold text-sm w-full mb-6">
                  <ReactTags
                    tags={tags}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    inputFieldPosition="inline"
                    placeholder="Type and press enter to add tags"
                    allowDragDrop={false}
                    classNames={{
                      tags: "tags-container",
                      tagInput: "tag-input-field",
                      tagInputField: "tag-input",
                      tag: "tag-item",
                      remove: "tag-remove",
                      suggestions: "tag-suggestions",
                      activeSuggestion: "active-suggestion",
                    }}
                  />
                </div>

                {/* Custom styles matching your image */}
                <style>{`
                .tags-container {
                  margin-bottom: 16px;
                  align-items: center;
                }
                .tag-input-field {
                  margin-top: 8px;
                }
                .tag-input {
                  outline: none;
                  padding: 8px 12px;
                  border: none;
                  font-size: 14px;
                  min-width: 100%;
                }
                .tag-item {
                  background: #36323B;
                  border-radius: 20px;
                  padding: 4px 12px;
                  display: inline-flex;
                  align-items: center;
                  font-size: 14px;
                  color: #E9E9EA;
                  margin-right: 16px;
                  margin-bottom: 16px;
                }
                .tag-remove {
                  color: #999;
                  margin-left: 8px;
                  cursor: pointer;
                  background: none;
                  border: none;
                  font-size: 14px;
                  line-height: 1;
                }
                .tag-remove svg {
                  width: 9px;
                  height: 9px;
                }
                .tag-remove:hover {
                  color: #333;
                }
              `}</style>
              </div>
            </div>
            <div>
              <div className="flex flex-col items-start">
                <img
                  src={DummyPro}
                  alt="dummy product"
                  className="w-full h-[441px] rounded-lg object-cover mb-8"
                />

                <label
                  htmlFor="productGallery"
                  className="font-rubik font-semibold text-md md:text-lg xl:text-xl !text-[#232321] mb-4"
                >
                  Product Gallery
                </label>
                <ProductGallery />
                <div className="flex md:flex-nowrap flex-wrap justify-between w-full items-center gap-4 mb-6">
                  <button className="py-2.5 px-6 rounded-lg hover:bg-transparent hover:!text-[#232321] border border-[#232321] transition-all duration-300 ease-in-out bg-[#003F62] !text-white font-rubik font-medium text-sm w-full mt-4 cursor-pointer">
                    ADD
                  </button>
                  <button className="py-2.5 px-6 rounded-lg hover:bg-[#003F62] hover:!text-white transition-all duration-300 ease-in-out bg-transparent !text-[#232321] border border-[#232321] font-rubik font-medium text-sm w-full mt-4 cursor-pointer">
                    CANCEL
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
