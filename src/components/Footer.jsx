import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear(); // Get current year

  const socialLinks = [
    { icon: Facebook, url: "#" },
    { icon: Twitter, url: "#" },
    { icon: Instagram, url: "#" },
    { icon: Linkedin, url: "#" },
  ];

  return (
    <footer className="bg-blue-900 text-yellow-100 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand Column (Left) */}
          <div>
            <img
              src="/src/assets/logo-Jalan-kuy-2.png"
              alt="Jalankuy"
              className="h-20 mb-6"
            />
            <p className="text-yellow-200 mb-4">
              Web Travel Booking Platform for Your Trip Needs
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="text-yellow-200 hover:text-yellow-300 transition-colors"
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Column (Right) */}
          <div className="text-right">
            <h4 className="text-lg font-semibold mb-4 text-yellow-200">
              Contact Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-end text-yellow-200">
                <MapPin className="w-5 h-5 mr-3 text-yellow-300" />
                <span>Bekasi, Jawa Barat, Indonesia</span>
              </div>
              <div className="flex items-center justify-end text-yellow-200">
                <Mail className="w-5 h-5 mr-3 text-yellow-300" />
                <span>admin@Jalankuy.com</span>
              </div>
              <div className="flex items-center justify-end text-yellow-200">
                <Phone className="w-5 h-5 mr-3 text-yellow-300" />
                <span>+62 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-blue-800 text-right">
          <p className="text-yellow-300">&copy; {currentYear} Jalankuy</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
