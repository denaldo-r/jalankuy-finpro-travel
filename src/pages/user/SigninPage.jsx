import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useForm from "../../hooks/local/useForm";
import useBanner from "../../hooks/useBanner";

const SigninPage = () => {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const { login, error, loading } = useAuth();
  const { banners } = useBanner();
  const [successMessage, setSuccessMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Example: two distinct images you want stacked
  const topImage = banners[8]?.imageUrl || "/src/assets/logo-jalan-kuy-2.png";
  const bgImage = "/src/assets/login-background-logo.jpg";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(values.email, values.password);
    if (success) {
      setSuccessMessage("Login successful! Redirecting...");
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
    <section
      className="min-h-screen w-full flex items-center justify-center bg-no-repeat bg-center bg-cover"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden md:flex">
        {/* Left side: two images stacked/overlapped */}
        <div className="hidden md:flex md:w-1/2 relative items-center justify-center p-6 bg-gray-50">
          {/* Container to hold both images absolutely */}
          <div className="relative w-[80%] h-[400px]">
            {/* Top image with some offset so it appears stacked/overlapped */}
            <img
              src={topImage}
              alt="Top image"
              className="absolute w-3/4 h-auto object-cover rounded-lg"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 2,
              }}
            />
          </div>
        </div>

        {/* Right side: Form */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-sm">
            <h1 className="text-3xl font-semibold text-gray-800">Login</h1>
            <p className="mt-2 text-gray-500">
              Don’t have an account?{" "}
              <Link
                to={`/signup?prev=${location.pathname}${location.search}`}
                className="text-sky-600 hover:underline"
              >
                Register now!
              </Link>
            </p>

            {/* Error / Success Messages */}
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

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="relative">
                <Mail
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-4 py-3 border border-gray-300 
                             rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none"
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
                  className="block w-full pl-10 pr-4 py-3 border border-gray-300 
                             rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 text-white font-semibold bg-gradient-to-r 
                           from-fuchsia-600 to-sky-600 rounded-md 
                           transition-transform hover:scale-105 focus:outline-none"
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SigninPage;
