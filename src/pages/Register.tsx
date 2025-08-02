import React from 'react';
import { useFormik } from 'formik';
import { ArrowRightIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { authImage, appleLogo, googleLogo, facebookLogo } from '../assets/assets';
import { registerSchema } from '../schemas/validationSchemas';
import { useAuth } from '../context/AuthContext';

const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      agreeTerms: false,
      keepLoggedIn: false,
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      register(values);
      navigate('/login');
    },
  });

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 xl:p-0 p-4">
      {/* Image Section */}
      <div className="md:w-1/2">
        <img src={authImage} alt="authImage" className="object-contain" />
      </div>

      {/* Registration Form Section */}
      <div className="md:w-1/2 flex items-center justify-center text-left">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2">Register</h2>

          <div className="mb-6">
            <p className="mb-6 font-semibold text-xl">Sign up with</p>
            <div className="flex items-center flex-wrap gap-4 mb-6">
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
            <span className="font-semibold text-xl">OR</span>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label className="block text-2xl font-bold mb-5 font-rubik">
                Your Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#003F62] focus:border-[#003F62] placeholder:text-[#79767C] mb-2"
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="text-red-500 text-sm font-rubik font-semibold">{formik.errors.firstName}</div>
              ) : null}
            </div>

            <div>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#003F62] focus:border-[#003F62] placeholder:text-[#79767C] mb-4"
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="text-red-500 text-sm font-rubik font-semibold">{formik.errors.lastName}</div>
              ) : null}
            </div>

            <label className="block text-2xl font-bold mb-5 font-rubik">
              Login Details
            </label>

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
                className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#003F62] focus:border-[#003F62] placeholder:text-[#79767C]"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm font-rubik font-semibold">{formik.errors.password}</div>
              ) : null}
              <p className="mt-1 text-xs text-gray-500">
                Minimum 8 characters with at least one uppercase, one lowercase,
                one special character and a number
              </p>
            </div>

            <div>
              <div className="flex items-center mb-5">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formik.values.agreeTerms}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="h-3.5 w-3.5 border-gray-300 rounded"
                />
                <label
                  htmlFor="agreeTerms"
                  className="ml-2 block text-base font-semibold font-open-sans"
                >
                  By clicking 'Register' you agree to our website{' '}
                  <Link to="/" className="underline">
                    Terms & Conditions
                  </Link>
                </label>
              </div>
              {formik.touched.agreeTerms && formik.errors.agreeTerms ? (
                <div className="text-red-500 text-sm font-rubik font-semibold">{formik.errors.agreeTerms}</div>
              ) : null}

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
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-between py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#003F62] hover:bg-[#003F62]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003F62]"
              >
                REGISTER
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-[#003F62] font-semibold">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;