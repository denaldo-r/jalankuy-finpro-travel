import { useState } from "react";
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  SearchIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import useCategories from "../../hooks/useCategory";
import useAuth from "../../hooks/useAuth";
import AdminSidebar from "../../components/AdminSidebar";

const CategoryManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    categories,
    loading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategories();
  const { token } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredCategories = categories?.filter((category) => {
    return category.name?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totalPages = Math.ceil(
    (filteredCategories?.length || 0) / itemsPerPage
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = filteredCategories?.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleCreateCategory = async (categoryData) => {
    const success = await createCategory({
      name: categoryData.name,
      imageUrl: categoryData.imageUrl,
    });
    if (success) {
      setShowCreateModal(false);
    }
  };

  const handleUpdateCategory = async () => {
    if (selectedCategory) {
      const success = await updateCategory(selectedCategory.id, {
        name: selectedCategory.name,
        imageUrl: selectedCategory.imageUrl,
      });
      if (success) {
        setShowEditModal(false);
        setSelectedCategory(null);
      }
    }
  };

  const handleDeleteCategory = async (id) => {
    const success = await deleteCategory(id);
    if (success) {
      setSelectedCategory(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-black">
        <div className="text-center">
          <h3 className="text-xl">Error: {error}</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white text-black flex">
      <AdminSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <div
        className={`w-full p-4 transition-all duration-300 ${
          isExpanded ? "ml-64" : "pl-14"
        }`}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black">Manage Category</h1>
          <p className="text-gray-600">Create, Update and Delete Category</p>
        </div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-6 mr-12 lg:mr-0">
          <div className="flex gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Category"
                className="bg-gray-100 text-black px-4 py-2 pl-10 rounded-lg border-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-600" />
            </div>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <PlusIcon className="h-5 w-5" />
            Create New Category
          </button>
        </div>
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Category Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {currentCategories?.map((category) => (
                  <tr key={category.id} className="text-gray-900">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {category.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={category.imageUrl}
                        alt={category.name}
                        className="h-16 w-16 object-cover rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-9 text-sm font-medium h-full flex gap-4">
                      <button
                        onClick={() => {
                          setSelectedCategory(category);
                          setShowEditModal(true);
                        }}
                        className="text-indigo-400 hover:text-indigo-300"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          {[...Array(totalPages)]
            .map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`w-10 h-10 rounded-lg ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              >
                {index + 1}
              </button>
            ))
            .slice(
              Math.max(0, currentPage - 2),
              Math.min(totalPages, currentPage + 1)
            )}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        {showCreateModal && (
          <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center border-gray-300">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Add Category
              </h2>
              <label className="block text-gray-800 mb-2">Category Name</label>
              <input
                type="text"
                placeholder=""
                className="w-full bg-gray-100 text-black px-4 py-2 rounded-lg mb-4"
                value={selectedCategory?.name || ""}
                onChange={(e) =>
                  setSelectedCategory({
                    ...selectedCategory,
                    name: e.target.value,
                  })
                }
              />
              <label className="block text-gray-800 mb-2">Image URL</label>
              <input
                type="text"
                placeholder=""
                className="w-full bg-gray-100 text-black px-4 py-2 rounded-lg mb-4"
                value={selectedCategory?.imageUrl || ""}
                onChange={(e) =>
                  setSelectedCategory({
                    ...selectedCategory,
                    imageUrl: e.target.value,
                  })
                }
              />
              <div className="flex justify-end gap-4">
                <button
                  className="px-4 py-2 bg-gray-300 text-black rounded-lg"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  onClick={() => handleCreateCategory(selectedCategory)}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        {showEditModal && selectedCategory && (
          <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-xl font-bold text-black mb-4">
                Edit Kategori
              </h2>
              <label className="block text-gray-800 mb-2">Nama Kategori</label>
              <input
                type="text"
                placeholder="Nama Kategori"
                className="w-full bg-gray-100 text-black px-4 py-2 rounded-lg mb-4"
                value={selectedCategory.name}
                onChange={(e) =>
                  setSelectedCategory({
                    ...selectedCategory,
                    name: e.target.value,
                  })
                }
              />
              <label className="block text-gray-800 mb-2">URL Gambar</label>
              <input
                type="text"
                placeholder="URL Gambar"
                className="w-full bg-gray-100 text-black px-4 py-2 rounded-lg mb-4"
                value={selectedCategory.imageUrl || ""}
                onChange={(e) =>
                  setSelectedCategory({
                    ...selectedCategory,
                    imageUrl: e.target.value,
                  })
                }
              />
              <div className="flex justify-end gap-4">
                <button
                  className="px-4 py-2 bg-gray-300 text-black rounded-lg"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  onClick={handleUpdateCategory}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryManagement;
