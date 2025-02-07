import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import useBanners from "../hooks/useBanner";

// AnimatedNumber component for counting animation
const AnimatedNumber = ({ end, duration = 2000, className = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const easeOut = 1 - Math.pow(1 - percentage, 3);
      setCount(Math.floor(end * easeOut));
      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span className={className}>{count.toLocaleString()}</span>;
};

const Hero = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const { banners, loading } = useBanners();
  const [isContentVisible, setIsContentVisible] = useState(false);

  // Delay content appearance for a smooth entrance
  useEffect(() => {
    const timer = setTimeout(() => setIsContentVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Rotate banners every 6 seconds
  useEffect(() => {
    if (banners.length > 0) {
      const interval = setInterval(() => {
        setCurrentBanner((prev) => (prev + 1) % banners.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [banners.length]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Banner Slider with slide effect */}
      <div className="absolute inset-0 overflow-hidden">
        {loading || banners.length === 0 ? (
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('/default-banner.jpg')" }}
          >
            <div className="w-full h-full bg-black opacity-50"></div>
          </div>
        ) : (
          <div
            className="flex h-full transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentBanner * 100}%)` }}
          >
            {banners.map((banner) => (
              <div key={banner.id} className="min-w-full h-full relative">
                <img
                  src={banner.imageUrl}
                  alt={banner.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Glassmorphism Hero Content Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div
          className={`bg-black/40 backdrop-blur-lg rounded-xl p-8 max-w-3xl text-center transition-all duration-700 ${
            isContentVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
            Adventure Awaits
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8">
            Explore breathtaking destinations and unforgettable journeys.
          </p>

          {/* Animated Stats */}
          <div className="flex justify-center items-center gap-8 mb-8">
            <div>
              <AnimatedNumber
                end={100}
                duration={2000}
                className="text-3xl font-bold text-white"
              />
              <p className="text-sm text-white/70">Destinations</p>
            </div>
            <div>
              <AnimatedNumber
                end={25000}
                duration={2000}
                className="text-3xl font-bold text-white"
              />
              <p className="text-sm text-white/70">Trips Booked</p>
            </div>
            <div>
              <AnimatedNumber
                end={10}
                duration={2000}
                className="text-3xl font-bold text-white"
              />
              <p className="text-sm text-white/70">Years Experience</p>
            </div>
          </div>

          {/* CTA Button */}
          <div>
            <Link
              to="/activity"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white rounded-full text-white text-lg font-semibold transition-all hover:bg-white hover:text-blue-900 transform hover:scale-105"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-8 h-14 border-2 border-white rounded-full flex justify-center items-start p-1">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
