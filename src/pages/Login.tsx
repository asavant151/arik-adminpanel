import React, { useState } from "react";
import {
  authImage,
  appleLogo,
  googleLogo,
  facebookLogo,
} from "../assets/assets";
import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    keepLoggedIn: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 xl:p-0 p-4">
      {/* Image Section - Replace with your actual image */}
      <div className="md:w-1/2">
        <img src={authImage} alt="authImage" className="object-contain" />
      </div>

      {/* Registration Form Section */}
      <div className="md:w-1/2 flex items-center justify-center text-left">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2">Login</h2>
          <Link
            to="/"
            className="font-open-sans font-semibold text-base !text-[#70706E] !underline !underline-[#70706E]"
          >
            Forgot your password?
          </Link>

          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#003F62] focus:border-[#003F62] placeholder:text-[#79767C] mb-5"
                required
              />
            </div>

            <div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#003F62] focus:border-[#003F62] placeholder:text-[#79767C]"
                required
                minLength={8}
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="keepLoggedIn"
                name="keepLoggedIn"
                checked={formData.keepLoggedIn}
                onChange={handleChange}
                className="h-3.5 w-3.5 border-gray-300 rounded"
              />
              <label
                htmlFor="keepLoggedIn"
                className="ml-2 block text-base font-semibold font-open-sans"
              >
                Keep me logged in
              </label>
            </div>

            <button
              type="submit"
              className="w-full flex justify-between py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm text-uppercase font-medium text-white bg-[#003F62] hover:bg-[#003F62]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003F62]"
            >
              EMAIL LOGIN
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </button>

            <div className="flex items-center flex-wrap space-x-4 xl:space-y-0 space-y-4 my-6">
              <button className="py-4 px-12 rounded-xl bg-transparent border border-solid border-[#141218] cursor-pointer">
                <img src={googleLogo} alt="" />
              </button>
              <button className="py-4 px-12 rounded-xl bg-transparent border border-solid border-[#141218] cursor-pointer">
                <img src={appleLogo} alt="" />
              </button>
              <button className="py-4 px-12 rounded-xl bg-transparent border border-solid border-[#141218] cursor-pointer">
                <img src={facebookLogo} alt="" />
              </button>
            </div>
            <p className="block text-base font-semibold font-open-sans">
              By clicking 'Login' you agree to our website{" "}
              <Link to="/" className="underline">
                Terms & Conditions
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
