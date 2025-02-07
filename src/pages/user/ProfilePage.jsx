import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Edit,
  LogOut,
  ShieldEllipsis,
  MapPin,
  Calendar,
  CreditCard,
  ChevronRight,
} from "lucide-react";
import useTransactions from "../../hooks/useTransaction";
import useUserProfile from "../../hooks/useUser";
import Navbar from "../../components/Navbar";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { userData, loading, error } = useUserProfile();
  const {
    transactions = [],
    loading: transactionsLoading,
    fetchMyTransactions,
  } = useTransactions();

  useEffect(() => {
    fetchMyTransactions();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  if (loading) {
    // Light-mode loading state
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex justify-center items-center h-full py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-700">Loading Profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    // Light-mode error state
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex justify-center items-center h-full py-12">
          <div className="bg-red-100 p-8 rounded-lg shadow-md text-center">
            <p className="text-red-600 text-xl mb-4">{error}</p>
            <button
              onClick={() => navigate("/signin")}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Sort transactions by latest created
  const sortedTransactions = transactions.sort(
    (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto py-12 px-4 flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar */}
        <aside className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col items-center">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-500">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                  alt={userData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="mt-4 text-2xl font-bold text-gray-800">
                {userData.name}
              </h1>
              <p className="text-gray-600 flex items-center gap-1">
                <MapPin className="w-5 h-5" />
                Jakarta, Indonesia
              </p>
            </div>
            <div className="mt-6 flex justify-around">
              <button
                onClick={() => navigate("/edit-profile")}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Personal Information
              </h2>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <User className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-600">{userData.name}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-600">{userData.email}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-600">
                    {userData.phoneNumber || "Not provided"}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <ShieldEllipsis className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-600 capitalize">
                    {userData.role}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-800">
                Recent Transactions
              </h2>
              <button
                onClick={() => navigate("/transactions")}
                className="text-blue-500 hover:underline"
              >
                View All
              </button>
            </div>
            <div className="mt-6">
              {transactionsLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse flex space-x-4">
                      <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                      <div className="flex-1 space-y-2 py-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : sortedTransactions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No transactions yet</p>
                  <button
                    onClick={() => navigate("/activity")}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    Explore Activities
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {sortedTransactions.slice(0, 3).map((transaction) => (
                    <div
                      key={transaction.id}
                      onClick={() =>
                        navigate(`/transactions/${transaction.id}`)
                      }
                      className="flex items-center justify-between p-4 bg-gray-50 rounded border hover:bg-gray-100 transition cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <CreditCard className="w-6 h-6 text-blue-500" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">
                            {transaction.invoiceId}
                          </h3>
                          <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(transaction.orderDate).toLocaleString(
                                "en-US",
                                {
                                  hour: "numeric",
                                  minute: "numeric",
                                  hour12: true,
                                }
                              )}
                            </span>
                            <span>
                              • {transaction.transaction_items.length} items
                            </span>
                          </div>
                          {transaction.proofPaymentUrl && (
                            <a
                              href={transaction.proofPaymentUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline text-xs"
                            >
                              View Proof of Payment
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-800">
                          IDR{" "}
                          {(transaction.totalAmount || 0).toLocaleString(
                            "id-ID"
                          )}
                        </p>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs ${
                            transaction.status === "COMPLETED"
                              ? "bg-green-100 text-green-700"
                              : transaction.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {transaction.status || "PENDING"}
                        </span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
