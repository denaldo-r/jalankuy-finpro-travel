import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Lock, Mail, User, Phone } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useForm from "../../hooks/local/useForm";
import useBanner from "../../hooks/useBanner";

const SignUpPage = () => {
  const { values, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const { register, error, loading } = useAuth();
  const { banners } = useBanner();
  const [successMessage, setSuccessMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // The entire page's background image:
  const bgImage = "/src/assets/login-background-logo.jpg"; // or banners[8]?.imageUrl
  // Images to stack on the right side:
  const bottomImage = "/src/assets/login-background.jpg";
  const topImage = banners[8]?.imageUrl || "/src/assets/jalan-kuy-icon.png";

  const handleSignUp = async (e) => {
    e.preventDefault();
    const success = await register(values);
    if (success) {
      setSuccessMessage("Registration successful! Redirecting...");
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        const prevPath =
          new URLSearchParams(location.search).get("prev") || "/";
        setSuccessMessage("");
        navigate(prevPath);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, location, navigate]);

  return (
    // Full-screen section with a background image
    <section
      className="min-h-screen w-full bg-center bg-cover bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* 
         Main "card" with a partially transparent white background, 
         so we can still see the bgImage around it.
      */}
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-6xl shadow-lg rounded-lg overflow-hidden bg-white/90 backdrop-blur-sm">
        {/* Left Side: Sign Up Form */}
        <div className="flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-gray-900">Register</h2>
            <p className="mt-2 text-gray-600">
              Already have an account?{" "}
              <Link
                to={`/signin?prev=${location.pathname}${location.search}`}
                className="text-sky-600 hover:text-sky-700 hover:underline"
              >
                Log in
              </Link>
            </p>

            {/* Error & success messages */}
            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded-lg mt-4">
                {error}
              </div>
            )}
            {successMessage && (
              <div className="bg-green-100 text-green-700 p-3 rounded-lg mt-4">
                {successMessage}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSignUp} className="mt-6 space-y-4">
              <div className="relative">
                <User
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={values.name}
                  onChange={handleChange}
                  required
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div className="relative">
                <Mail
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={values.email}
                  onChange={handleChange}
                  required
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div className="relative">
                <Phone
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={20}
                />
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  required
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div className="relative">
                <Lock
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={20}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 text-white font-semibold bg-gradient-to-r from-fuchsia-600 to-sky-600 rounded-md transition-transform hover:scale-105 focus:outline-none"
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Two Overlapped Images */}
        <div className="hidden lg:flex items-center justify-center relative">
          <div className="relative w-[80%] h-[400px]">
            {/* Bottom image */}
            <img
              src={bottomImage}
              alt="Bottom image"
              className="absolute w-3/4 h-auto object-cover rounded-lg shadow-md"
              style={{
                top: "10%",
                left: "10%",
                zIndex: 1,
              }}
            />
            {/* Top image */}
            <img
              src={topImage}
              alt="Top image"
              className="absolute w-1/2 h-auto object-cover rounded-lg shadow-lg"
              style={{
                top: "40%",
                left: "50%",
                transform: "translate(-50%, -30%)",
                zIndex: 2,
              }}
            />
            {/* Optional text overlay */}
            <div
              className="absolute bottom-4 left-0 right-0 text-center text-blue-600 font-bold text-3xl"
              style={{ zIndex: 3 }}
            >
              Kuy Join
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
