import React from "react";
import { CheckCircle, CreditCard, MapPin } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Choose Destination",
    description: "Choose your destination by clicking on Destination Menu.",
    icon: <MapPin className="w-6 h-6 text-white" />,
    bgColor: "bg-yellow-500",
  },
  {
    id: 2,
    title: "Make Payment",
    description:
      "Click on the payment button and complete the payment process.",
    icon: <CreditCard className="w-6 h-6 text-white" />,
    bgColor: "bg-red-500",
  },
  {
    id: 3,
    title: "Booked",
    description:
      "Continue the trip by reaching the place where you choosed to go.",
    icon: <CheckCircle className="w-6 h-6 text-white" />,
    bgColor: "bg-blue-700",
  },
];

const BookTripSteps = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left: Text & Steps */}
        <div>
          <p className="text-lg text-gray-500 font-medium">Easy and Fast</p>
          <h2 className="text-5xl font-bold text-gray-900 leading-tight mt-2">
            Book Your Next Trip <br />
            In <span className="text-indigo-900">3 Easy Steps</span>
          </h2>

          {/* Steps List */}
          <div className="mt-10 space-y-6">
            {steps.map((step) => (
              <div key={step.id} className="flex items-start gap-4">
                {/* Step Icon */}
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-lg ${step.bgColor}`}
                >
                  {step.icon}
                </div>

                {/* Step Text */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {step.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Image & Trip Card */}
        <div className="relative">
          {/* Trip Card */}
          <div className="bg-white rounded-3xl shadow-lg p-6 w-96">
            {/* Trip Image */}
            <div className="rounded-xl overflow-hidden">
              <img
                src="/src/assets/greece.png"
                alt="Trip to Greece"
                className="w-full h-48 object-cover"
              />
            </div>

            {/* Trip Details */}
            <h3 className="text-lg font-semibold text-gray-900 mt-4">
              Trip To Greece
            </h3>
            <p className="text-gray-500 text-sm">14-29 June | by Robbin Jo</p>

            {/* Icons & Info */}
            <div className="flex items-center gap-4 mt-4 text-gray-500 text-sm">
              <span>🌿</span>
              <span>🗺️</span>
              <span>✈️</span>
              <span>24 people going</span>
            </div>
          </div>

          {/* Floating Trip Progress Card */}
          <div className="absolute bottom-0 right-0 translate-x-10 translate-y-10 bg-white rounded-2xl shadow-md p-4 w-56">
            <div className="flex items-center gap-2">
              <img
                src="/src/assets/rome.jpg"
                alt="Trip to Rome"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-xs text-gray-500">Ongoing</p>
                <h4 className="text-sm font-semibold text-gray-900">
                  Trip to Rome
                </h4>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-3">
              <p className="text-xs text-gray-500">40% completed</p>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div className="bg-purple-600 h-2 rounded-full w-2/5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookTripSteps;
