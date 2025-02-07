import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import useActivity from "../hooks/useActivity";

const ActivityList = () => {
  const { activities, loading, error } = useActivity();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-pulse text-2xl text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center text-red-500 text-2xl">{error}</div>
      </div>
    );
  }

  // Grab the top 3 activities based on total_reviews
  const specificIds = [
    "6f6a450d-c417-4417-9243-c5c81964cd5b",
    "b3cd3802-3ecc-4bf8-b67f-daba55b86ec4",
    "1490d07e-b12a-40ab-a732-716597a3d331",
  ];

  const selectedActivities = activities.filter((activity) =>
    specificIds.includes(activity.id)
  );

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        {/* Section Header */}
        <p className="text-gray-500 text-lg font-medium">Top Selling</p>
        <h2 className="text-5xl font-bold text-gray-900 mb-10">
          <span className="text-gray-900">Top</span>{" "}
          <span className="text-indigo-900">Destinations</span>
        </h2>

        {/* Responsive Grid for Destination Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {selectedActivities.map((activity) => (
            <div
              key={activity.id}
              className="relative w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105"
            >
              {/* Image Section */}
              <div className="relative w-full h-56">
                <img
                  src={activity.imageUrls[0]}
                  alt={activity.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {activity.title}
                </h3>
                <div className="flex justify-between items-center mt-2 text-gray-700">
                  <span className="font-semibold text-xl text-gray-800">
                    ${activity.price.toLocaleString()}k
                  </span>
                </div>
                <div className="flex items-center mt-2 text-gray-500">
                  <span className="mr-2">📍</span>
                  <span className="text-sm">{activity.duration} Trip</span>
                </div>

                {/* Explore Button */}
                <div className="mt-5">
                  <Link to={`/activity`}>
                    <button className="flex justify-center items-center gap-2 bg-indigo-600 text-white py-3 px-6 rounded-full font-semibold text-lg shadow-md hover:bg-indigo-700 transition-all duration-300">
                      Explore <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivityList;
