import React from "react";
import { Link } from "react-router-dom";

// Filter categoriy component
const CategoryFilter = ({ categories = [], selectedCategory }) => {
  // Jika tidak ada kategori, tidak menampilkan apapun
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {/* Link for all categories */}
      <Link
        to="/destinations"
        className={`px-4 py-2 rounded-full ${
          !selectedCategory
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        All
      </Link>
      {/* Link for specific category */}
      {categories.map((category) => (
        <Link
          key={category.id}
          to={`/destinations/${category.name}`}
          className={`px-4 py-2 rounded-full ${
            selectedCategory === category.name
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default CategoryFilter;
