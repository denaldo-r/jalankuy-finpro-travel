import { useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { MapPinned, Star } from "lucide-react";
import useActivity from "../../hooks/useActivity";
import useCategories from "../../hooks/useCategory";
import Navbar from "../../components/Navbar";

// Redesigned Activity Card Component
const ActivityCard = ({ activity }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-2xl transition-shadow duration-300 flex flex-col">
      <div className="relative">
        <div className="h-56 w-full overflow-hidden">
          {!imageError && activity.imageUrls[0] ? (
            <img
              src={activity.imageUrls[0]}
              alt={activity.title}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
        </div>
        {/* Rating Badge */}
        <div className="absolute top-3 left-3 bg-black bg-opacity-60 text-white px-2 py-1 rounded-full flex items-center text-sm">
          <Star className="w-4 h-4 mr-1 text-yellow-400" />
          <span>{activity.rating}</span>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {activity.title}
        </h3>
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <MapPinned className="w-4 h-4 mr-1" />
          <span>
            {activity.city}, {activity.province}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {activity.description}
        </p>
        <div className="flex justify-between items-center mt-auto pt-4 border-t">
          <div>
            <p className="text-gray-500 text-xs">Starting from</p>
            <p className="text-lg font-bold text-blue-600">
              IDR {activity.price.toLocaleString("id-ID")}
            </p>
          </div>
          <Link
            to={`/activity/detail/${activity.id}`}
            className="text-sm font-medium px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

// Updated Horizontal Category Filter Component (Centered)
const CategoryFilter = ({ categories, categoryName }) => {
  const scrollContainerRef = useRef(null);

  return (
    <div className="overflow-x-auto">
      <div
        ref={scrollContainerRef}
        className="flex justify-center space-x-3 py-2"
      >
        <Link
          to="/activity"
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap 
            ${
              !categoryName
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
          All
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/activity/${category.name.toLowerCase()}`}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap 
              ${
                categoryName?.toLowerCase() === category.name.toLowerCase()
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

// Redesigned Destinations Page Component
const DestinationsPage = () => {
  const { categoryName } = useParams();
  const {
    activities,
    loading: activitiesLoading,
    error: activitiesError,
  } = useActivity();
  const { categories, loading: categoriesLoading } = useCategories();
  const [searchQuery] = useState("");

  // Loading State
  if (activitiesLoading || categoriesLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading experiences...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (activitiesError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-red-500 text-xl mb-4">
              Error: {activitiesError}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Filter activities based on category and search query
  const filteredActivities =
    activities?.filter((activity) => {
      const matchesSearch = activity.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        !categoryName ||
        categories?.find(
          (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
        )?.id === activity.categoryId;
      return matchesSearch && matchesCategory;
    }) || [];

  // Only include activities with valid images
  const validActivities = filteredActivities.filter(
    (activity) =>
      activity.imageUrls &&
      activity.imageUrls.length > 0 &&
      activity.imageUrls[0]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white">
            {categoryName
              ? `${
                  categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
                } Adventures`
              : "All Adventures"}
          </h1>
          <p className="mt-2 text-blue-100">
            Explore unique experiences and adventures
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex flex-col">
        {/* Category Filter (Centered) */}
        <div className="mb-6 sticky top-20 bg-gray-50 py-2 z-50">
          <CategoryFilter categories={categories} categoryName={categoryName} />
        </div>

        {/* Activities Grid */}
        <div className="flex-1">
          {validActivities.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                No activities found for this category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {validActivities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DestinationsPage;
