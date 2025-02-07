import React from "react";
import usePromos from "../../hooks/usePromo";
import Navbar from "../../components/Navbar";

const PromoPage = () => {
  const { promos, loading, error } = usePromos();

  // Loading state with Navbar in background for a seamless experience.
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-600"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-red-500 text-xl mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            Exclusive Promos
          </h1>
          <p className="mt-4 text-lg md:text-xl text-blue-100">
            Discover the best deals and discounts curated just for you!
          </p>
        </div>
      </div>

      {/* Promos Grid */}
      <div className="container mx-auto px-4 py-12">
        {promos.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No promos available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {promos.map((promo) => (
              <div
                key={promo.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={promo.imageUrl}
                    alt={promo.title}
                    className="w-full h-48 object-cover"
                  />
                  {/* Promo Code Badge */}
                  <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {promo.promo_code}
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">
                    {promo.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {promo.description}
                  </p>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-green-600 font-bold text-lg">
                        Rp. {promo.promo_discount_price}
                      </span>
                      <span className="text-sm text-gray-500">
                        Min Claim: Rp. {promo.minimum_claim_price}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-500 text-sm line-clamp-2">
                      {promo.terms_condition.replace(/<\/?p>/g, "")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PromoPage;
