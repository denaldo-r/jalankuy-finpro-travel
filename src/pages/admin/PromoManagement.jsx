import { useEffect, useState } from "react";
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  SearchIcon,
  EyeIcon,
  ChevronLeft,
  ChevronRight,
  ListCollapse,
} from "lucide-react";
import usePromos from "../../hooks/usePromo";
import AdminSidebar from "../../components/AdminSidebar";
import { useNavigate } from "react-router-dom";

const PromoManagement = () => {
  const {
    promos,
    loading: promosLoading,
    createPromo,
    updatePromo,
    deletePromo,
    refreshPromos,
  } = usePromos();
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPromos, setFilteredPromos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    imageUrl: "",
    terms_condition: "",
    promo_code: "",
    promo_discount_price: "",
    minimum_claim_price: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredPromos(
      promos.filter((promo) =>
        promo.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, promos]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.promo_code) {
      alert("Title and Promo Code are required!");
      return;
    }
    const success = formData.id
      ? await updatePromo(formData.id, formData)
      : await createPromo(formData);
    if (success) {
      setShowForm(false);
      await refreshPromos();
    }
  };

  const handleEdit = (promo) => {
    setFormData({
      id: promo.id,
      title: promo.title,
      description: promo.description,
      imageUrl: promo.imageUrl,
      terms_condition: promo.terms_condition,
      promo_code: promo.promo_code,
      promo_discount_price: promo.promo_discount_price,
      minimum_claim_price: promo.minimum_claim_price,
    });
    setShowForm(true);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleAddPromo = () => {
    setFormData({
      id: "",
      title: "",
      description: "",
      imageUrl: "",
      terms_condition: "",
      promo_code: "",
      promo_discount_price: "",
      minimum_claim_price: "",
    });
    setShowForm(true);
  };

  const totalPages = Math.ceil(filteredPromos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPromos = filteredPromos.slice(startIndex, endIndex);

  if (promosLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white flex">
      <AdminSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <div
        className={`w-full p-4 transition-all duration-300 ${
          isExpanded ? "ml-64" : "pl-14"
        }`}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black">Promo</h1>
          <p className="text-gray-600">Create, Update, and Delete Promo</p>
        </div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-6 mr-12 lg:mr-0">
          <div className="flex gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari promo..."
                className="bg-gray-100 text-black px-4 py-2 pl-10 rounded-lg border border-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-600" />
            </div>
          </div>
          <button
            onClick={handleAddPromo}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <PlusIcon className="h-5 w-5" />
            Add Promo
          </button>
        </div>
        {showForm && (
          <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center overflow-y-auto">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg max-h-[90%] overflow-y-auto">
              <h2 className="text-xl font-bold text-black mb-4">
                {formData.id ? "Edit Promo" : "Tambah Promo"}
              </h2>
              <form onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label className="text-black">Promo Title</label>
                    <input
                      type="text"
                      name="title"
                      placeholder=""
                      value={formData.title}
                      onChange={handleInputChange}
                      className="p-2 rounded w-full bg-gray-100 text-black border border-gray-300"
                    />
                  </div>
                  <div className="col-span-2 mb-4">
                    <label className="text-black">Description</label>
                    <textarea
                      name=""
                      placeholder=""
                      value={formData.description}
                      onChange={handleInputChange}
                      className="p-2 rounded w-full bg-gray-100 text-black border border-gray-300"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-black">Image URL</label>
                    <input
                      type="text"
                      name="imageUrl"
                      placeholder=""
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                      className="p-2 rounded w-full bg-gray-100 text-black border border-gray-300"
                    />
                  </div>
                  <div className="col-span-2 mb-4">
                    <label className="text-black">Term and Condition</label>
                    <textarea
                      name="terms_condition"
                      placeholder=""
                      value={formData.terms_condition}
                      onChange={handleInputChange}
                      className="p-2 rounded w-full bg-gray-100 text-black border border-gray-300"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-black">Promo Ocde</label>
                    <input
                      type="text"
                      name="promo_code"
                      placeholder=""
                      value={formData.promo_code}
                      onChange={handleInputChange}
                      className="p-2 rounded w-full bg-gray-100 text-black border border-gray-300"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-black">Promo Discount</label>
                    <input
                      type="number"
                      name="promo_discount_price"
                      placeholder=""
                      value={formData.promo_discount_price}
                      onChange={handleInputChange}
                      className="p-2 rounded w-full bg-gray-100 text-black border border-gray-300"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-black">Claim Minimum</label>
                    <input
                      type="number"
                      name="minimum_claim_price"
                      placeholder=""
                      value={formData.minimum_claim_price}
                      onChange={handleInputChange}
                      className="p-2 rounded w-full bg-gray-100 text-black border border-gray-300"
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 bg-gray-300 text-black rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="bg-white rounded-lg overflow-hidden shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Promo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Promo Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Promo Discount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Claim Minimum
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentPromos.map((promo) => (
                  <tr key={promo.id} className="text-gray-900">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {promo.title.length > 20
                        ? `${promo.title.substring(0, 20)}...`
                        : promo.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {promo.promo_code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {promo.promo_discount_price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {promo.minimum_claim_price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex gap-4">
                      <button
                        onClick={() =>
                          navigate(`/promo-management/${promo.id}`)
                        }
                        className="text-green-500 hover:text-green-600"
                      >
                        <ListCollapse className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleEdit(promo)}
                        className="text-indigo-500 hover:text-indigo-600"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => deletePromo(promo.id)}
                        className="text-red-500 hover:text-red-600"
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
                    ? "bg-blue-600 text-white"
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
      </div>
    </div>
  );
};

export default PromoManagement;
