import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useActivity from "../../hooks/useActivity";
import AdminSidebar from "../../components/AdminSidebar";

const ActivityDetailManagement = () => {
  const { activityId } = useParams();
  const { activity, loading: activityLoading } = useActivity(activityId);
  const [isExpanded, setIsExpanded] = useState(true);

  if (activityLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex">
      <AdminSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <div
        className={`flex-1 p-8 transition-all duration-300 ${
          isExpanded ? "ml-64" : "ml-20"
        }`}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black">Detail Aktivitas</h1>
          <p className="text-gray-600">Informasi detail tentang aktivitas.</p>
        </div>
        <div className="bg-gray-100 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-black">{activity.title}</h2>
          <p className="text-gray-600 mt-2">{activity.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {activity.imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Activity Image ${index + 1}`}
                className="rounded-lg"
              />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-gray-600 mt-2">
                <span className="font-bold">Kategori:</span>{" "}
                {activity.category.name}
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-bold">Harga:</span> {activity.price}
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-bold">Harga Diskon:</span>{" "}
                {activity.price_discount}
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-bold">Rating:</span> {activity.rating}
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-bold">Total Ulasan:</span>{" "}
                {activity.total_reviews}
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-bold">Alamat:</span> {activity.address}
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-bold">Provinsi:</span> {activity.province}
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-bold">Kota:</span> {activity.city}
              </p>
              <h3 className="text-xl font-bold text-black mt-4">Fasilitas</h3>
              <div
                className="text-gray-600 mt-2"
                dangerouslySetInnerHTML={{ __html: activity.facilities }}
              />
              <h3 className="text-xl font-bold text-black mt-4">Peta Lokasi</h3>
              <div
                className="text-gray-600 mt-2"
                dangerouslySetInnerHTML={{ __html: activity.location_maps }}
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={() => window.history.back()}
              className="p-2 bg-gray-300 text-black rounded"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailManagement;
