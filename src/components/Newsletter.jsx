import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");

    // Simulate an API call to subscribe the user
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1500);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-blue-500 via-yellow-500 to-red-500">
      <div className="container mx-auto px-6 text-center font-sans">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Join Our Travel Newsletter
        </h2>
        <p className="text-xl text-white mb-8">
          Stay updated on the latest travel deals, tips, and exclusive offers.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto"
        >
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-3 rounded-md bg-white text-blue-500 font-semibold hover:bg-gray-100 transition"
          >
            {status === "loading" ? "Submitting..." : "Subscribe"}
          </button>
        </form>
        {status === "success" && (
          <p className="mt-4 text-white text-lg">Thank you for subscribing!</p>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
