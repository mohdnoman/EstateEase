import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" text-slate-600 bg-slate-300 bg-opacity-30 py-8 mt-6 ">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex space-x-4 mb-4 sm:mb-0">
          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-400">
            About
          </Link>
          <Link to="/profile" className="hover:text-gray-400">
            Profile
          </Link>
        </div>

        <div className="flex space-x-4">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            Facebook
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            Twitter
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            LinkedIn
          </a>
        </div>

        <p className="text-gray-500 text-sm mt-4 sm:mt-0">
          &copy; 2024 EstateEase, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
