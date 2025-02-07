import { useEffect, useState } from "react";
import usePromos from "../../hooks/usePromo";
import useUserProfile from "../../hooks/useUser";
import useTransactions from "../../hooks/useTransaction";
import useActivities from "../../hooks/useActivity";
import AdminSidebar from "../../components/AdminSidebar";

const AdminDashboard = () => {
  const { promos, loading: promosLoading } = usePromos();
  const { userData, users, loading: usersLoading } = useUserProfile();
  const { transactions, loading: transactionsLoading } = useTransactions();
  const { activities, loading: activitiesLoading } = useActivities();
  const [stats, setStats] = useState({
    users: 0,
    activities: 0,
    promos: 0,
    transactions: 0,
  });
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    if (
      !promosLoading &&
      !usersLoading &&
      !transactionsLoading &&
      !activitiesLoading
    ) {
      setStats({
        promos: promos?.length || 0,
        users: users?.length || 0,
        transactions: transactions?.length || 0,
        activities: activities?.length || 0,
      });
    }
  }, [
    promos,
    users,
    transactions,
    activities,
    promosLoading,
    usersLoading,
    transactionsLoading,
    activitiesLoading,
  ]);

  if (
    promosLoading ||
    usersLoading ||
    transactionsLoading ||
    activitiesLoading
  ) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-100 flex">
      <AdminSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <div
        className={`w-full p-4 transition-all duration-300 ${
          isExpanded ? "ml-64" : "pl-14"
        }`}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Hello, {userData?.name || "Admin"}!
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Overview</h2>
          <ul className="divide-y divide-gray-300">
            <li className="py-4 flex justify-between">
              <span className="text-gray-600">Active Promos</span>
              <span className="text-gray-900 font-bold">{stats.promos}</span>
            </li>
            <li className="py-4 flex justify-between">
              <span className="text-gray-600">Total Users</span>
              <span className="text-gray-900 font-bold">{stats.users}</span>
            </li>
            <li className="py-4 flex justify-between">
              <span className="text-gray-600">Total Transactions</span>
              <span className="text-gray-900 font-bold">
                {stats.transactions}
              </span>
            </li>
            <li className="py-4 flex justify-between">
              <span className="text-gray-600">Total Activities</span>
              <span className="text-gray-900 font-bold">
                {stats.activities}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
