import React from 'react';
import { useFormik } from 'formik';
import { ArrowRightIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { authImage, appleLogo, googleLogo, facebookLogo } from '../assets/assets';
import { loginSchema } from '../schemas/validationSchemas';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      keepLoggedIn: false,
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      login(values);
      navigate('/admin');
    },
  });

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 xl:p-0 p-4">
      {/* Image Section */}
      <div className="md:w-1/2">
        <img src={authImage} alt="authImage" className="object-contain" />
      </div>

      {/* Login Form Section */}
      <div className="md:w-1/2 flex items-center justify-center text-left">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2">Login</h2>
          <Link
            to="/forgot-password"
            className="font-open-sans font-semibold text-base !text-[#70706E] !underline !underline-[#70706E]"
          >
            Forgot your password?
          </Link>

          <form onSubmit={formik.handleSubmit} className="space-y-4 mt-6">
            <div>
              <input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Email"
                className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#003F62] focus:border-[#003F62] placeholder:text-[#79767C] mb-2"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm font-rubik font-semibold">{formik.errors.email}</div>
              ) : null}
            </div>

            <div>
              <input
                type="password"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Password"
                className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#003F62] focus:border-[#003F62] placeholder:text-[#79767C] mb-2"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm font-rubik font-semibold">{formik.errors.password}</div>
              ) : null}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="keepLoggedIn"
                name="keepLoggedIn"
                checked={formik.values.keepLoggedIn}
                onChange={formik.handleChange}
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

            <div className="flex items-center flex-wrap gap-4 my-6">
              <button className="py-4 px-12 rounded-xl bg-transparent border border-solid border-[#141218] cursor-pointer">
                <img src={googleLogo} alt="Google" />
              </button>
              <button className="py-4 px-12 rounded-xl bg-transparent border border-solid border-[#141218] cursor-pointer">
                <img src={appleLogo} alt="Apple" />
              </button>
              <button className="py-4 px-12 rounded-xl bg-transparent border border-solid border-[#141218] cursor-pointer">
                <img src={facebookLogo} alt="Facebook" />
              </button>
            </div>
            <p className="block text-base font-semibold font-open-sans">
              By clicking 'Login' you agree to our website{' '}
              <Link to="/terms" className="underline">
                Terms & Conditions
              </Link>
            </p>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-[#003F62] font-semibold">
                  Register here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;