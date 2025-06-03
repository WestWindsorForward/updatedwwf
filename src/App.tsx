import React, { useState, useEffect, useRef } from "react";

// --- Asset URLs ---
const logoUrl = "/WW Forward.png"; // User should replace this with their actual hosted logo

// --- SVG Icons ---
const IconMail = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
);
const IconPhone = () => (
  // This icon will be removed from use but kept for now
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
  </svg>
);
const IconMapMarker = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5" // Base size, overridden by props in specific uses
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
      clipRule="evenodd"
    />
  </svg>
);
const IconCalendar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5" // Base size, overridden by props in specific uses
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
      clipRule="evenodd"
    />
  </svg>
);
const IconClock = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5" // Base size, overridden by props in specific uses
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
      clipRule="evenodd"
    />
  </svg>
);
const IconCheckCircle = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6" // Spacing will be handled by parent element's margin
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);
const IconChevronRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 ml-1" // Keeps its specific styling
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
      clipRule="evenodd"
    />
  </svg>
);
const IconUsers = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    className="h-5 w-5"
    viewBox="0 0 35.695 35.695"
    fill="currentColor"
  >
    <g>
      <path d="M11.558,10.767c0-3.473,2.815-6.29,6.289-6.29c3.476,0,6.289,2.817,6.289,6.29c0,3.475-2.813,6.29-6.289,6.29C14.373,17.057,11.558,14.243,11.558,10.767z M35.667,22.607l-0.879-5.27c-0.158-0.954-0.961-1.754-1.896-1.984c-0.836,0.74-1.932,1.191-3.136,1.191c-1.203,0-2.3-0.452-3.135-1.191c-0.938,0.229-1.739,1.03-1.897,1.984l-0.021,0.124c-0.522-0.503-1.17-0.881-1.868-1.052c-1.33,1.176-3.072,1.896-4.987,1.896s-3.657-0.72-4.987-1.896c-0.698,0.171-1.346,0.549-1.868,1.052l-0.021-0.124c-0.158-0.954-0.962-1.754-1.897-1.984c-0.835,0.74-1.932,1.191-3.135,1.191c-1.204,0-2.3-0.452-3.136-1.191c-0.936,0.229-1.738,1.03-1.896,1.984l-0.879,5.27c-0.189,1.131,0.596,2.057,1.741,2.057h7.222l-0.548,3.283c-0.3,1.799,0.948,3.271,2.771,3.271H24.48c1.823,0,3.071-1.475,2.771-3.271l-0.548-3.283h7.222C35.071,24.662,35.855,23.738,35.667,22.607z M29.755,15.762c2.184,0,3.954-1.77,3.954-3.954c0-2.183-1.771-3.954-3.954-3.954s-3.953,1.771-3.953,3.954C25.802,13.992,27.574,15.762,29.755,15.762z M5.938,15.762c2.183,0,3.953-1.77,3.953-3.954c0-2.183-1.771-3.954-3.953-3.954c-2.184,0-3.954,1.771-3.954,3.954C1.984,13.992,3.755,15.762,5.938,15.762z" />
    </g>
  </svg>
);
const IconDotsVertical = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
  </svg>
);
const IconBriefcase = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 sm:h-5 sm:w-5 mr-2"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm14 0H4v2h12V6zM2 12a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 0H4v2h12v-2z"
      clipRule="evenodd"
    />
  </svg>
);
const IconInfo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 sm:h-5 sm:w-5 mr-2"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
      clipRule="evenodd"
    />
  </svg>
);
const IconDollar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 sm:h-5 sm:w-5 mr-2"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.5 2.5 0 00-.567-.267C8.07 8.488 8 8.737 8 9.01V11c0 .273.07.522.186.733.117.21.28.392.465.532a2.501 2.501 0 001.698.267v1.698c-.221-.071-.412-.164-.567-.267A2.501 2.501 0 0010 15.01V13c0-.273-.07-.522-.186-.733a2.501 2.501 0 00-2.131-.8V9.733c.656.206 1.312.126 1.752-.07C9.762 9.488 10 9.239 10 8.96V7c0-.273-.07-.522-.186-.733a2.501 2.501 0 00-2.131-.8V3.733C8.312 3.527 8.968 3.447 9.408 3.34c.237-.054.48-.088.742-.11V1.5C9.33 1.531 8.558 1.655 8 1.738V3.01c-.273 0-.522.07-.733.186a2.501 2.501 0 00-.8.465L5.34 2.534a1 1 0 00-1.414 1.414l1.127 1.127A2.501 2.501 0 006 6.96V8.5c.031.828.346 1.554.843 2.082A2.501 2.501 0 006 13.04V14.5c-.031.828-.346 1.554-.843 2.082A2.501 2.501 0 006 19.04V20H4v-1.5a2.5 2.5 0 001.157-4.733C4.346 13.246 4.031 12.52 4 11.692V10H2V8h2V6.96C4.031 6.131 4.346 5.406 4.843 4.878A2.501 2.501 0 004 2.5V1H2v1.5a2.5 2.5 0 001.157 4.733zM12 3V1.5a2.5 2.5 0 00-1.157 4.733c.497.528.812 1.254.843 2.082V10h2V8h-2V6.96c0-.831-.315-1.556-.814-2.082A2.501 2.501 0 0012 2.5V1h2V3h-2zm0 14v1.5a2.5 2.5 0 001.157-4.733C12.654 13.246 12.969 12.52 13 11.692V10h2v2h-2v1.04c0 .831.315 1.556.814 2.082A2.501 2.501 0 0013 17.5V19h2v-1.5a2.5 2.5 0 00-1.157-4.733z" />
  </svg>
);

const IconFacebook = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
  </svg>
);

const IconProfile = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
);

// --- Hamburger Menu Icons ---
const IconMenu = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const IconClose = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

// Dot Pattern Component
const DotPattern = ({
  className = "",
  dotColor = "text-sky-200 opacity-5",
  rows = 6,
  cols = 8,
}) => {
  return (
    <div
      className={`absolute inset-0 overflow-hidden -z-10 ${className}`}
      aria-hidden="true"
    >
      <div className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] animate-pulse-slow">
        {Array.from({ length: rows * 2 }).map((_, r) => (
          <div
            key={`row-${r}`}
            className="flex justify-around"
            style={{ marginBottom: "25px" }}
          >
            {Array.from({ length: cols * 2 }).map((_, c) => (
              <div
                key={`dot-${r}-${c}`}
                className={`w-1 h-1 sm:w-1.5 sm:h-1.5 ${dotColor} rounded-full transition-all duration-500 ease-in-out`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Helper Components ---
const Navbar = ({
  setActivePage,
  activePage,
  selectedProject,
  setSelectedProject,
}) => {
  const navItems = ["Home", "About", "Projects", "Events", "Contact"];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  const handleNav = (item) => {
    setSelectedProject(null);
    setActivePage(item);
  };

  const handleMobileNav = (item) => {
    handleNav(item);
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    handleNav("Home");
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest('button[aria-label="Open navigation menu"]')
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="bg-slate-900 text-white p-3 sm:p-4 shadow-lg sticky top-0 z-50 print:hidden">
      <div className="container mx-auto flex justify-between items-center">
        <div
          className="flex items-center cursor-pointer"
          onClick={handleLogoClick}
        >
          <img
            src={logoUrl}
            alt="West Windsor Forward Logo"
            className="h-10 sm:h-12 mr-2 sm:mr-3 rounded bg-white p-1.5"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://placehold.co/48x48/FFFFFF/0C4A6E?text=WWF&font=Lora`;
            }}
          />
        </div>

        <div className="sm:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-400 p-2 rounded-md"
            aria-label="Open navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>

        <ul className="hidden sm:flex flex-wrap justify-end space-x-1 sm:space-x-2">
          {navItems.map((item) => (
            <li key={item} className="my-1 sm:my-0">
              <button
                onClick={() => handleNav(item)}
                className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75
                                ${
                                  activePage === item && !selectedProject
                                    ? "bg-sky-500 text-white shadow-md"
                                    : "text-gray-300 hover:bg-sky-700 hover:text-white"
                                }`}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="sm:hidden absolute top-full left-0 right-0 bg-slate-800 shadow-xl z-40 animate-slideDown"
        >
          <ul className="flex flex-col items-start p-3 space-y-1.5">
            {navItems.map((item) => (
              <li key={item} className="w-full">
                <button
                  onClick={() => handleMobileNav(item)}
                  className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-150 ease-in-out
                                      ${
                                        activePage === item && !selectedProject
                                          ? "bg-sky-500 text-white"
                                          : "text-gray-300 hover:bg-sky-600 hover:text-white"
                                      }`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-gray-400 p-6 sm:p-8 mt-12 sm:mt-16 text-center print:hidden">
      <div className="container mx-auto">
        <img
          src={logoUrl}
          alt="West Windsor Forward Logo"
          className="h-8 sm:h-10 mx-auto mb-3 sm:mb-4 rounded bg-white p-1.5"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/40x40/FFFFFF/0C4A6E?text=WWF&font=Lora`;
          }}
        />
        <p className="text-xs sm:text-sm">
          &copy; {new Date().getFullYear()} West Windsor Forward. All rights
          reserved.
        </p>
        <p className="text-xs mt-1 mb-3 sm:mb-4">
          Igniting positive change and working collaboratively for a better West
          Windsor.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-3 sm:mb-4 text-xs sm:text-sm">
          <a
            href="mailto:emailparth11@gmail.com"
            className="hover:text-sky-400 transition-colors flex items-center"
          >
            <IconMail />
            <span className="ml-2">emailparth11@gmail.com</span>{" "}
          </a>
          <a
            href="mailto:darshan.chids@gmail.com"
            className="hover:text-sky-400 transition-colors flex items-center"
          >
            <IconMail />
            <span className="ml-2">darshan.chids@gmail.com</span>{" "}
          </a>
        </div>
        <div className="flex justify-center items-center space-x-4 mt-4">
          {" "}
          <a
            href="https://www.facebook.com/profile.php?id=61575121893868"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-sky-400 transition-colors"
          >
            <IconFacebook />
            <span className="sr-only">Facebook</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

const Card = ({
  children,
  className = "",
  noHoverEffect = false,
  hasDotPattern = false,
  onClick,
}) => (
  <div
    className={`relative bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 border border-gray-200 ${
      hasDotPattern ? "overflow-hidden" : ""
    } ${
      noHoverEffect
        ? ""
        : "transition-all duration-300 hover:shadow-2xl hover:border-sky-400 hover:scale-[1.01]"
    } ${onClick ? "cursor-pointer" : ""} ${className}`}
    onClick={onClick}
  >
    {hasDotPattern && <DotPattern dotColor="text-sky-500 opacity-5" />}
    <div className="relative z-10">{children}</div>
  </div>
);

const Button = ({
  children,
  onClick,
  type = "primary",
  className = "",
  icon,
  isSubmit = false,
  disabled = false,
}) => {
  const baseStyle = `inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-200 ease-in-out transform hover:scale-103 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-75 shadow-md hover:shadow-lg ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  }`;
  const typeStyle =
    type === "primary"
      ? "bg-sky-600 hover:bg-sky-700 text-white focus:ring-sky-500"
      : "bg-slate-200 hover:bg-slate-300 text-slate-800 focus:ring-slate-400";
  return (
    <button
      type={isSubmit ? "submit" : "button"}
      onClick={onClick}
      className={`${baseStyle} ${typeStyle} ${className}`}
      disabled={disabled}
    >
      {icon && !children && <span className="">{icon}</span>}
      {icon && children && <span className="mr-2 sm:mr-2.5">{icon}</span>}{" "}
      {children}
    </button>
  );
};

// --- Panelist Section Component ---
const PanelistSection = ({ panelists }) => {
  const [selectedPanelistId, setSelectedPanelistId] = useState(null);

  const handlePanelistClick = (panelistId) => {
    setSelectedPanelistId(selectedPanelistId === panelistId ? null : panelistId);
  };

  if (!panelists || panelists.length === 0) {
    return null;
  }

  return (
    <div className="my-8 sm:my-10">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 mb-6 sm:mb-8 text-center">
        Meet the Panelists
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {panelists.map((panelist) => (
          <div key={panelist.id} className="flex flex-col">
            <Card
              noHoverEffect={selectedPanelistId === panelist.id}
              className={`flex flex-col text-center items-center p-4 sm:p-5 transition-all duration-300 ${selectedPanelistId === panelist.id ? 'ring-2 ring-sky-500 shadow-xl' : 'hover:shadow-xl'}`}
              onClick={() => handlePanelistClick(panelist.id)}
            >
              <img
                src={panelist.imageUrl || `https://placehold.co/150x150/E0F2FE/0C4A6E?text=${panelist.name.substring(0,1)}${panelist.name.split(' ')[1] ? panelist.name.split(' ')[1].substring(0,1) : ''}&font=Lora`}
                alt={panelist.name}
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full mx-auto mb-3 sm:mb-4 border-4 border-sky-200 group-hover:border-sky-400 transition-colors object-cover shadow-sm"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/150x150/CCCCCC/FFFFFF?text=Panelist&font=Lora`;
                }}
              />
              <h3 className="text-md sm:text-lg font-semibold text-sky-700">
                {panelist.name}
              </h3>
              {panelist.title && (
                <p className="text-xs sm:text-sm text-slate-600 mb-1 sm:mb-2">
                  {panelist.title}
                </p>
              )}
              {/* Centered "View Bio" button */}
              <div className="w-full flex justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click when clicking button
                    handlePanelistClick(panelist.id);
                  }}
                  className="mt-2 text-xs text-sky-600 hover:text-sky-700 font-medium flex items-center"
                >
                  {selectedPanelistId === panelist.id ? 'Hide Bio' : 'View Bio'}
                  {selectedPanelistId === panelist.id ? (
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                       <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                     </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
            </Card>
            {selectedPanelistId === panelist.id && (
              <div className="bg-white p-4 sm:p-5 -mt-2 rounded-b-xl shadow-lg border border-t-0 border-gray-200 animate-fadeIn">
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {panelist.bio}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};


// --- Project Data ---
const projectsData = [
  {
    id: 1,
    slug: "candidate-forum-2025",
    title: "2025 Candidate Forum",
    titleImage: null,
    shortGoal: "Fostering informed civic participation.",
    goal: "To provide a non-partisan platform for candidates to share their vision and for residents to make informed decisions.",
    status: "Upcoming: September 25, 2025",
    description:
      "Reinstating a vital tradition, this forum will allow Mayoral and Council candidates to engage directly with the community. It will feature experienced panelists, live Q&A, and will be live-streamed for broad accessibility, ensuring all residents can participate in this important civic process. We aim to empower voters and promote transparency in local governance.",
    impact:
      "Empowered voters, increased accountability, and a more transparent local government. This initiative directly supports our mission of empowering neighbors and demanding responsive leadership.",
    timeline: [
      {
        stage: "Venue & Panelists Secured",
        details:
          "Kelsey Theatre @MCCC confirmed. Panelists secured and date set. Connections with local news established.",
        completed: true,
      },
      {
        stage: "Upcoming: Invitations Sent to Candidates",
        details:
          "Invitations will be sent to all declared candidates. Volunteer roles will be assigned.",
        completed: false,
      },
      {
        stage: "Upcoming: Forum Day",
        details:
          "The forum will feature moderated Q&A sessions, audience participation, and live broadcast on September 25, 2025.",
        completed: false,
      },
      {
        stage: "Upcoming: Post-Forum Report",
        details:
          "Sharing recordings and gathering community feedback to enhance future civic initiatives.",
        completed: false,
      },
    ],
    getInvolved:
      "Attend the forum, submit your questions for candidates, volunteer for event day support (contact us for roles like timekeeping, greeting, tech assistance), or help spread the word to your neighbors and community groups.",
    image:
      "https://placehold.co/600x400/0A2342/FFFFFF?text=Candidate+Forum&font=Lora",
    partnerOrganizations: [
      "League of Women Voters of the Greater Princeton Area",
    ],
    fundingSources: [
      "West Windsor Forward Funds",
      "The generosity of the LWV of the Greater Princeton Area and Kelsey Theatre",
    ],
    quickActions: [],
  },
  {
    id: 2,
    slug: "adopt-a-station-pjc",
    title: "Adopt-a-Station: Princeton Junction",
    titleImage: null,
    shortGoal: "Revitalizing our key transit hub.",
    goal: "To transform the Princeton Junction Station into a more welcoming, safe, and vibrant community asset.",
    status: "Ongoing Initiative",
    description:
      "This multi-faceted project aims to improve the aesthetics, safety, and overall experience at our key transit hub. We seek collaboration with NJ Transit, local non-profits, and community volunteers to implement regular clean-ups, install public art, and advocate for better amenities. This project injects fresh energy into a vital public space.",
    impact:
      "A more attractive and functional public space, enhanced commuter experience, increased community pride, and a showcase for local artistic talent. This directly addresses improving quality of life and fostering community.",
    timeline: [
      {
        stage: "Planning and application",
        details:
          "Application approved for Adopt-a-Station Program by NJ Transit and West Windsor Parking Authority (WWPA).",
        completed: true,
      },
      {
        stage: "Upcoming: Regular Clean-Up & Flower Planting",
        details:
          "Organizing litter removal and station planting efforts with community volunteers.",
        completed: false,
      },
      {
        stage: "Upcoming: Expand Scope of Improvements",
        details:
          "Working with NJ Transit and the WWPA to expand our scope of work at the station and further collaborations with local organizations to install community art and other amentities.",
        completed: false,
      },
    ],
    getInvolved:
      "Join our clean-up crews, contribute artistic talents for potential murals, donate materials for beautification (e.g., plants, paint), or share your ideas for station improvements. Contact us for info!",
    image:
      "https://placehold.co/600x400/3B82F6/FFFFFF?text=Princeton+Junction+Station&font=Lora",
    partnerOrganizations: ["NJ Transit"],
    fundingSources: ["West Windsor Forward Funds"],
    quickActions: [],
  },
];

// --- Page Components ---
const HomePage = ({ setActivePage, setSelectedProject }) => {
  return (
    <div className="animate-fadeIn">
      <header className="relative bg-gradient-to-br from-slate-900 via-sky-800 to-indigo-900 text-white py-16 sm:py-20 md:py-28 px-4 text-center rounded-b-2xl shadow-2xl overflow-hidden">
        <DotPattern dotColor="text-sky-700 opacity-10" rows={8} cols={10} />
        <div className="relative z-10 container mx-auto">
          <img
            src={logoUrl}
            alt="West Windsor Forward Logo"
            className="h-16 sm:h-20 md:h-24 mx-auto mb-4 sm:mb-6 rounded-lg shadow-md bg-white p-1.5 sm:p-2"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://placehold.co/96x96/FFFFFF/0C4A6E?text=WWF&font=Lora`;
            }}
          />
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-3 sm:mb-4 tracking-tight">
            West Windsor Forward
          </h1>
          <p className="text-sm sm:text-md md:text-xl text-sky-200 mb-6 sm:mb-8 max-w-3xl mx-auto">
            A dedicated coalition of residents igniting positive change and
            working collaboratively to build a better future for West Windsor.
          </p>
          <div className="space-y-2 sm:space-y-0 sm:space-x-3">
            <Button
              onClick={() => {
                setSelectedProject(null);
                setActivePage("About");
              }}
              className="w-full sm:w-auto text-xs sm:text-sm px-5 py-2 sm:px-6 sm:py-2.5"
              icon={<IconChevronRight />}
            >
              Learn About Us
            </Button>
            <Button
              onClick={() => {
                setSelectedProject(null);
                setActivePage("Projects");
              }}
              type="secondary"
              className="w-full sm:w-auto text-xs sm:text-sm px-5 py-2 sm:px-6 sm:py-2.5"
              icon={<IconChevronRight />}
            >
              Explore Our Initiatives
            </Button>
          </div>
        </div>
      </header>

      <section className="py-10 md:py-12 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 mb-4">
            Igniting Progress in West Windsor
          </h2>
          <p className="text-sm sm:text-md text-gray-700 max-w-3xl mx-auto mb-6 leading-relaxed">
            West Windsor Forward is committed to empowering our neighbors,
            advocating for impactful projects, and injecting fresh energy into
            our community. We believe in responsive, accountable, and
            transparent leadership.
          </p>
          <Button
            onClick={() => {
              setSelectedProject(null);
              setActivePage("About");
            }}
            icon={<IconChevronRight />}
          >
            Learn About Our Approach
          </Button>
        </div>
      </section>

      <section className="bg-slate-100 py-10 md:py-12 px-4 relative overflow-hidden">
        <DotPattern dotColor="text-sky-500 opacity-5" rows={10} cols={12} />
        <div className="container mx-auto relative z-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 mb-8 text-center">
            Key Initiatives
          </h2>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            <Card className="flex flex-col transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-lg sm:text-xl font-semibold text-sky-700 mb-2">
                2025 Candidate Forum
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 flex-grow">
                Providing a non-partisan platform for Mayoral and Council
                candidates to engage with residents, ensuring informed
                participation in our local democracy.
              </p>
              <Button
                onClick={() => {
                  setSelectedProject(null);
                  setActivePage("Events");
                }}
                type="secondary"
                className="mt-auto w-full sm:w-auto text-xs"
                icon={<IconCalendar />}
              >
                Event Details
              </Button>
            </Card>
            <Card className="flex flex-col transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-lg sm:text-xl font-semibold text-sky-700 mb-2">
                Adopt-a-Station: Princeton Junction
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 flex-grow">
                Enhancing our vital transit hub to be a cleaner, safer, and more
                welcoming space for commuters and the community.
              </p>
              <Button
                onClick={() => {
                  setSelectedProject(projectsData.find((p) => p.id === 2));
                  setActivePage("ProjectDetails");
                }}
                type="secondary"
                className="mt-auto w-full sm:w-auto text-xs"
                icon={<IconChevronRight />}
              >
                Project Information
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 mb-4">
            Get Involved & Make an Impact
          </h2>
          <p className="text-sm sm:text-md text-gray-700 max-w-2xl mx-auto mb-6 leading-relaxed">
            Your participation is crucial. Join us in mobilizing residents,
            organizations, and resources to create a West Windsor where every
            resident can thrive.
          </p>
          <div className="space-y-3 sm:space-y-0 sm:space-x-4">
            <Button
              onClick={() => {
                setSelectedProject(null);
                setActivePage("Contact");
              }}
              icon={<IconUsers />}
              className="w-full sm:w-auto"
            >
              Volunteer With Us
            </Button>
            <Button
              onClick={() => {
                setSelectedProject(null);
                setActivePage("Contact");
              }}
              type="secondary"
              icon={<IconMail />}
              className="w-full sm:w-auto"
            >
              Contact & Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
const AboutPage = () => {
  const teamMembers = [
    {
      name: "Parth Gupta",
      role: "Co-Founder",
      bio: "A West Windsor resident for 14 years and student at the Lawrenceville School. Parth is a runner for the Lawrenceville School as part of their cross-country and track and field teams. Parth has been playing piano for 10 years and has co-organized piano Performathons to raise money for the Children's Hospital of Philidelphia.",
      image: "parth.png",
    },
    {
      name: "Darshan Chidambaram",
      role: "Co-Founder",
      bio: "A West Windsor resident for 8 years and a student at the Lawrenceville School. Darshan is an active tennis player for the Lawrenceville School and debater on the national debate circuit.",
      image: "darshan.png",
    },
  ];
  return (
    <div className="container mx-auto py-10 sm:py-12 md:py-16 px-4 animate-fadeIn">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-8 sm:mb-10 md:mb-12 text-center">
        About West Windsor Forward
      </h1>
      <Card className="bg-slate-50" hasDotPattern>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-sky-700 mb-3 sm:mb-4">
          About Us
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-md md:text-lg">
          West Windsor Forward was founded by Parth Gupta and Darshan
          Chidambaram, dedicated West Windsor residents and students at the
          Lawrenceville School. Driven by a shared belief that our community can
          achieve even greater progress, they established this coalition to
          ignite positive change and work collaboratively towards a better
          future for all.
        </p>
        <p className="text-gray-700 leading-relaxed text-sm sm:text-md md:text-lg">
          We are committed to empowering our neighbors, advocating for impactful
          projects, and injecting fresh energy and innovation into community
          initiatives. Our approach is rooted in demanding responsiveness,
          accountability, and transparency from local leaders, and in fostering
          strong partnerships to maximize our collective impact.
        </p>
      </Card>
      <Card>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-sky-700 mb-6 sm:mb-8 text-center">
          Meet the Founders
        </h2>
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-slate-50 p-4 sm:p-6 rounded-xl shadow-md text-center transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full mx-auto mb-4 sm:mb-5 border-4 border-sky-500 shadow-sm"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/150x150/E0F2FE/0C4A6E?text=${member.name.substring(
                    0,
                    1
                  )}${
                    member.name.split(" ")[1]
                      ? member.name.split(" ")[1].substring(0, 1)
                      : ""
                  }&font=Lora`;
                }}
              />
              <h3 className="text-md sm:text-lg md:text-xl font-semibold text-slate-800">
                {member.name}
              </h3>
              <p className="text-sky-600 font-medium mb-2 sm:mb-3 text-xs sm:text-sm md:text-base">
                {member.role}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </Card>
      <Card className="bg-slate-50" hasDotPattern>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-sky-700 mb-4 sm:mb-6">
          Our Guiding Principles
        </h2>
        <p className="text-sm sm:text-md md:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6">
          Our work is driven by an unwavering passion to create a West Windsor
          where every resident has the opportunity to thrive, where voices are
          valued, and where tangible progress can be observed. This is reflected
          in our core commitments:
        </p>
        <ul className="grid md:grid-cols-1 gap-y-3 sm:gap-y-4 text-gray-700 text-sm sm:text-md md:text-lg leading-relaxed">
          {[
            {
              title: "Empowering Neighbors",
              detail:
                "Providing tools, knowledge, and opportunities for active participation in shaping our community's future.",
            },
            {
              title: "Impactful Advocacy",
              detail:
                "Championing projects that improve quality of life, build community, and foster growth, while demanding responsive leadership.",
            },
            {
              title: "Innovation & Energy",
              detail:
                "Addressing long-neglected needs and enhancing civic engagement through targeted, fresh initiatives.",
            },
            {
              title: "Strategic Mobilization",
              detail:
                "Uniting residents, organizations, and resources for sustainable, far-reaching collective impact through strong partnerships.",
            },
            {
              title: "Non-Partisanship & Inclusivity",
              detail:
                "Operating independently and ensuring all voices are valued in our pursuit of a better West Windsor.",
            },
          ].map((value) => (
            <li key={value.title} className="flex">
              <span>
                <strong>{value.title}:</strong> {value.detail}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

const ProjectCard = ({ project, setActivePage, setSelectedProject }) => {
  const [actionsOpen, setActionsOpen] = useState(false);
  const actionsMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        actionsMenuRef.current &&
        !actionsMenuRef.current.contains(event.target)
      ) {
        setActionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAction = (action) => {
    if (action.actionType === "navigate") {
      if (
        action.target === "ProjectDetails" ||
        (action.payload && action.payload.project)
      ) {
        setSelectedProject(
          action.payload && action.payload.project
            ? action.payload.project
            : project
        );
        setActivePage("ProjectDetails");
      } else {
        setSelectedProject(null);
        setActivePage(action.target);
      }
    }
    setActionsOpen(false);
  };

  const handleCardClick = (e) => {
    if (
      e.target.closest("button") ||
      (actionsMenuRef.current && actionsMenuRef.current.contains(e.target))
    ) {
      return;
    }
    setSelectedProject(project);
    setActivePage("ProjectDetails");
  };

  return (
    <Card className="flex flex-col h-full group" hasDotPattern>
      <div
        onClick={handleCardClick}
        className="flex-grow flex flex-col cursor-pointer"
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-40 sm:h-48 object-cover rounded-t-lg mb-4 transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/600x400/CCCCCC/FFFFFF?text=Project+Image&font=Lora`;
          }}
        />
        <div className="flex-grow flex flex-col p-1">
          {project.titleImage ? (
            <img
              src={project.titleImage}
              alt={`${project.title} Logo`}
              className="h-10 md:h-12 object-contain self-start mb-2"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = "none";
              }}
            />
          ) : (
            <h3 className="text-lg sm:text-xl font-semibold text-sky-700 mb-1 group-hover:text-sky-600 transition-colors">
              {project.title}
            </h3>
          )}
          <p className="text-xs sm:text-sm text-gray-500 mb-3">
            {project.shortGoal}
          </p>
          {project.partnerOrganizations &&
            project.partnerOrganizations.length > 0 && (
              <div className="mb-3">
                <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                  Partners:
                </h4>
                <div className="flex flex-wrap gap-1">
                  {project.partnerOrganizations.map((org) => (
                    <span
                      key={org}
                      className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full"
                    >
                      {org}
                    </span>
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>
      <div className="mt-auto pt-4 flex justify-between items-center p-1">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedProject(project);
            setActivePage("ProjectDetails");
          }}
          type="secondary"
          className="text-xs px-3 py-1.5"
        >
          View Full Details
        </Button>
        <div className="relative" ref={actionsMenuRef}>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setActionsOpen((prev) => !prev);
            }}
            type="secondary"
            className="text-xs px-2 py-1.5 !shadow-none"
            icon={<IconDotsVertical />}
          />
          {actionsOpen && (
            <div className="absolute right-0 bottom-full mb-1 w-48 bg-white rounded-md shadow-xl z-20 border border-gray-200 transition-all duration-150 ease-out transform scale-100 opacity-100 group-hover:opacity-100 group-hover:scale-100 origin-bottom-right py-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAction({
                    actionType: "navigate",
                    target: "ProjectDetails",
                    payload: { project: project },
                  });
                }}
                className="block w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 hover:text-sky-600 transition-colors flex items-center"
              >
                <IconInfo className="mr-2" /> Learn More{" "}
              </button>
              {project.quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAction(action);
                  }}
                  className="block w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 hover:text-sky-600 transition-colors flex items-center"
                >
                  {action.label === "Attend the Forum" && (
                    <IconCalendar className="mr-2" />
                  )}
                  {action.label.includes("Volunteer") && (
                    <IconUsers className="mr-2" />
                  )}
                  {action.label.includes("Question") ||
                    (action.label.includes("Idea") && (
                      <IconMail className="mr-2" />
                    ))}
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

const ProjectsPage = ({ setActivePage, setSelectedProject }) => {
  return (
    <div className="container mx-auto py-10 sm:py-12 md:py-16 px-4 animate-fadeIn">
      <div className="text-center mb-10 sm:mb-12 md:mb-16">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-2 sm:mb-3">
          Our Initiatives
        </h1>
        <p className="text-sm sm:text-md md:text-lg text-gray-600 max-w-2xl mx-auto">
          Explore the projects West Windsor Forward is championing to build a
          better community.
        </p>
        <div className="mt-4 sm:mt-6 inline-block relative">
          <DotPattern dotColor="text-sky-500 opacity-10" rows={2} cols={8} />{" "}
        </div>
      </div>
      <div className="my-8 sm:my-10 h-1.5 bg-gradient-to-r from-sky-400 via-indigo-500 to-pink-500 rounded-full"></div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {projectsData.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            setActivePage={setActivePage}
            setSelectedProject={setSelectedProject}
          />
        ))}
      </div>
    </div>
  );
};

const ProjectDetailPage = ({ project, setActivePage, setSelectedProject }) => {
  if (!project) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <p className="text-xl text-red-500">Project not found.</p>
        <Button
          onClick={() => {
            setSelectedProject(null);
            setActivePage("Projects");
          }}
          className="mt-4"
        >
          Back to Projects
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 sm:py-12 md:py-16 px-4 animate-fadeIn">
      <Button
        onClick={() => {
          setSelectedProject(null);
          setActivePage("Projects");
        }}
        type="secondary"
        className="mb-6 sm:mb-8 text-xs sm:text-sm"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        }
      >
        Back to All Projects
      </Button>

      <Card noHoverEffect className="overflow-visible">
        <div className="lg:flex lg:space-x-6 md:space-x-8">
          <div className="lg:w-2/5 mb-6 lg:mb-0">
            <img
              src={project.image}
              alt={project.title}
              className="rounded-lg shadow-md w-full h-auto object-cover aspect-video"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/600x338/CCCCCC/FFFFFF?text=Project+Image&font=Lora`;
              }}
            />
          </div>
          <div className="lg:w-3/5">
            {project.titleImage ? (
              <img
                src={project.titleImage}
                alt={`${project.title} Logo`}
                className="max-h-16 md:max-h-20 object-contain self-start mb-3"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = "none";
                }}
              />
            ) : (
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-sky-700 mb-2">
                {project.title}
              </h1>
            )}
            <div className="flex items-center text-xs sm:text-sm md:text-md text-gray-500 mb-2">
              {project.status.toLowerCase().includes("upcoming") ? (
                <IconClock className="mr-2 text-amber-600 h-5 w-5" />
              ) : (
                <IconCheckCircle className="mr-2 text-green-600 h-5 w-5" />
              )}
              <span>
                <strong>Status:</strong> {project.status}
              </span>
            </div>
            <p className="text-xs sm:text-sm md:text-md text-gray-600 mb-4">
              <strong>Goal:</strong> {project.goal}
            </p>
          </div>
        </div>

        <div className="prose max-w-none mt-6 sm:mt-8 text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-800 border-b-2 border-sky-200 pb-2 mb-3 sm:mb-4">
            Project Overview
          </h2>
          <p>{project.description}</p>

          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-800 border-b-2 border-sky-200 pb-2 mt-6 sm:mt-8 mb-3 sm:mb-4">
            Project Timeline & Milestones
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {project.timeline.map((item, index) => (
              <div
                key={index}
                className={`flex items-start p-2.5 sm:p-3 md:p-4 rounded-lg border-l-4 ${
                  item.completed
                    ? "border-green-500 bg-green-50 text-green-800"
                    : "border-sky-500 bg-sky-50 text-sky-800"
                }`}
              >
                {item.completed ? (
                  <IconCheckCircle className="text-green-500 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0 h-5 w-5 sm:h-6 sm:w-6" />
                ) : (
                  <IconClock className="text-sky-500 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0 h-5 w-5 sm:h-6 sm:w-6" />
                )}
                <div>
                  <h4 className="font-semibold text-sm sm:text-md md:text-lg">
                    {item.stage}
                  </h4>
                  <p className="text-xs sm:text-sm opacity-90">
                    {item.details}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-800 border-b-2 border-sky-200 pb-2 mt-6 sm:mt-8 mb-3 sm:mb-4">
            Envisioned Impact
          </h2>
          <p>{project.impact}</p>

          {project.partnerOrganizations &&
            project.partnerOrganizations.length > 0 && (
              <>
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-800 border-b-2 border-sky-200 pb-2 mt-6 sm:mt-8 mb-3 sm:mb-4">
                  Our Partners
                </h2>
                <ul className="list-none p-0 flex flex-wrap gap-2 sm:gap-3">
                  {project.partnerOrganizations.map((org) => (
                    <li
                      key={org}
                      className="bg-slate-100 text-slate-700 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm shadow-sm flex items-center"
                    >
                      {org}
                    </li>
                  ))}
                </ul>
              </>
            )}
          {project.fundingSources && project.fundingSources.length > 0 && (
            <>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-800 border-b-2 border-sky-200 pb-2 mt-6 sm:mt-8 mb-3 sm:mb-4">
                Funding & Support
              </h2>
              <ul className="list-none p-0 flex flex-wrap gap-2 sm:gap-3">
                {project.fundingSources.map((source) => (
                  <li
                    key={source}
                    className="bg-emerald-50 text-emerald-700 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm shadow-sm flex items-center"
                  >
                    {source}
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="mt-8 sm:mt-10 p-4 sm:p-6 bg-sky-50 rounded-lg border border-sky-200">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-sky-700 mb-3">
              How You Can Contribute
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4 text-xs sm:text-sm md:text-base">
              {project.getInvolved}
            </p>
            <Button
              onClick={() => {
                setSelectedProject(null);
                setActivePage("Contact");
              }}
              icon={<IconUsers />}
              className="text-xs sm:text-sm"
            >
              Volunteer or Offer Support
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

const EventsPage = ({ setActivePage, setSelectedProject }) => {
  const eventPanelistsForum2025 = [
    {
      id: 'panelist1-forum2025',
      name: "Micah Rasmussen",
      title: "Director, Rebovich Institute for NJ Politics",
      imageUrl: "https://placehold.co/150x150/E0F2FE/0C4A6E?text=MR&font=Lora",
      bio: "Micah Rasmussen is the Director of the Rebovich Institute for New Jersey Politics at Rider University. He has extensive experience in New Jersey government and politics, having served in various roles including as a press secretary and communications director.\nHis insights are frequently sought by media outlets covering the New Jersey political scene."
    },
    {
      id: 'panelist2-forum2025',
      name: "David Matthau",
      title: "WHYY NJ Reporter",
      imageUrl: "https://placehold.co/150x150/E0F2FE/0C4A6E?text=DM&font=Lora",
      bio: "David Matthau is a seasoned reporter for WHYY, focusing on New Jersey news. He covers a wide range of topics, including state politics, local government, and community issues.\nHe is known for his in-depth reporting and ability to explain complex issues clearly."
    },
    {
      id: 'panelist3-forum2025',
      name: "Rhea Biswas",
      title: "West Windsor HS Student & Journalist",
      imageUrl: "https://placehold.co/150x150/E0F2FE/0C4A6E?text=RB&font=Lora",
      bio: "Rhea Biswas is an accomplished student journalist from West Windsor High School. She brings a fresh perspective and represents the youth voice in community discussions.\nHer involvement highlights the importance of civic engagement among young people."
    },
  ];

  const events = [
    {
      id: 1,
      title: "West Windsor Forward 2025 Candidate Forum",
      date: "Thursday, September 25th, 2025",
      time: "Approximately 7:00 PM - 9:15 PM",
      location:
        "Kelsey Theatre @ Mercer County Community College, West Windsor, NJ",
      description:
        "A non-partisan candidate forum for the 2025 West Windsor Township elections for Mayor and Council. This event marks the return of a vital voter tool, enhanced with experienced panelists, an in-person audience, and live-streaming for expanded access.",
      details: [
        "Positions: Mayor of West Windsor Township, 2 seats on West Windsor Township Council.",
        "Panelists: Micah Rasmussen (Director, Rebovich Institute for NJ Politics), David Matthau (WHYY NJ Reporter), Rhea Biswas (West Windsor HS Student & Journalist).",
        "Format: Panelist Q&A, Town-hall style Q&A with audience, Informal meet-and-greet.",
        "Goal: To allow voters to hear from candidates, understand their platforms, and ask questions on important local issues.",
      ],
      accessibility:
        "Live-streamed on YouTube. Free tickets anticipated to be available online starting September 2025.",
      audienceInfo:
        "This is your opportunity to become an informed and empowered voter! Hear directly from candidates, get answers to your questions, engage with the community, and have one-on-one discussions.",
      volunteerInfo:
        "Volunteers needed for set-up, timekeeping, ticket verification, camera operation, live stream operation. Contact us to help make this event a success!",
      image: "2025 Forum Graphic (2).png",
      isLiveStream: true,
      relatedProjectId: 1,
      panelists: eventPanelistsForum2025,
    },
  ];

  const generateICSData = (eventData) => {
    const monthMap = {
      January: "01", February: "02", March: "03", April: "04", May: "05", June: "06",
      July: "07", August: "08", September: "09", October: "10", November: "11", December: "12",
    };

    let startDateStr = "20250925";
    let startTimeStr = "190000";
    let endDateStr = "20250925";
    let endTimeStr = "211500";

    if (eventData.date) {
      const dateMatch = eventData.date.match(
        /(January|February|March|April|May|June|July|August|September|October|November|December)\s*(\d{1,2})(?:st|nd|rd|th)?,\s*(\d{4})/i
      );
      if (dateMatch) {
        const monthName = dateMatch[1];
        const day = dateMatch[2];
        const year = dateMatch[3];
        if (monthMap[monthName]) {
          startDateStr = `${year}${monthMap[monthName]}${day.padStart(2, "0")}`;
          endDateStr = startDateStr;
        }
      }
    }

    if (eventData.time) {
      const timeMatches = eventData.time.match(/(\d{1,2}:\d{2})\s*(AM|PM)/gi);
      if (timeMatches && timeMatches.length > 0) {
        const formatTime = (timeStrWithPeriod) => {
          let [hourMinute, period] = timeStrWithPeriod.split(/\s+/);
          let [hour, minute] = hourMinute.split(":").map(Number);
          if (period.toUpperCase() === "PM" && hour < 12) hour += 12;
          if (period.toUpperCase() === "AM" && hour === 12) hour = 0;
          return `${String(hour).padStart(2, "0")}${String(minute).padStart(
            2,
            "0"
          )}00`;
        };
        startTimeStr = formatTime(timeMatches[0]);
        if (timeMatches.length > 1) {
          endTimeStr = formatTime(timeMatches[1]);
        } else {
          let startHour = parseInt(startTimeStr.substring(0, 2));
          let endHour = (startHour + 2) % 24;
          endTimeStr = `${String(endHour).padStart(
            2,
            "0"
          )}${startTimeStr.substring(2, 4)}00`;
        }
      }
    }

    const timezone = "America/New_York";
    const uid = `${eventData.id}-${startDateStr}-${startTimeStr}@westwindsorforward.org`;
    const dtstamp =
      new Date().toISOString().replace(/[-:.]/g, "").substring(0, 15) + "Z";

    const escapeICSString = (str) => {
      if (!str) return "";
      return str
        .replace(/\\/g, "\\\\")
        .replace(/;/g, "\\;")
        .replace(/,/g, "\\,")
        .replace(/\n/g, "\\n");
    };

    const summary = escapeICSString(eventData.title);
    const description = escapeICSString(
      eventData.description +
        (eventData.audienceInfo
          ? "\\n\\nAudience Info: " + eventData.audienceInfo
          : "")
    );
    const location = escapeICSString(eventData.location);

    const icsData = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//WestWindsorForward//WWF Events//EN",
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${dtstamp}`,
      `DTSTART;TZID=${timezone}:${startDateStr}T${startTimeStr}`,
      `DTEND;TZID=${timezone}:${endDateStr}T${endTimeStr}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    return icsData;
  };

  const downloadICSFile = (eventData) => {
    if (!eventData) return;
    const icsContent = generateICSData(eventData);
    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    const filename = `${eventData.title
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase()}_event.ics`;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="container mx-auto py-10 sm:py-12 md:py-16 px-4 animate-fadeIn">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-10 sm:mb-12 text-center">
        Community Events
      </h1>

      {events.length === 0 && (
        <Card noHoverEffect className="text-center py-10 sm:py-12">
          <IconCalendar className="text-gray-400 mx-auto h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 mb-3 sm:mb-4" />
          <p className="text-md sm:text-lg md:text-xl text-gray-600">
            No upcoming events scheduled at this time.
          </p>
          <p className="text-xs sm:text-sm md:text-base text-gray-500 mt-2">
            Please check back soon or subscribe for updates!
          </p>
        </Card>
      )}

      {events.map((event) => (
        <Card
          key={event.id}
          className="mb-10 sm:mb-12"
          hasDotPattern
        >
          <div className="lg:flex lg:flex-row-reverse lg:space-x-reverse lg:space-x-6 md:space-x-8">
            <div className="lg:w-2/5 mb-4 sm:mb-6 lg:mb-0">
              <img
                src={event.image}
                alt={event.title}
                className="rounded-lg shadow-md w-full h-auto object-cover aspect-video sm:aspect-[4/3]"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/600x350/CCCCCC/FFFFFF?text=Event+Image&font=Lora`;
                }}
              />
            </div>
            <div className="lg:w-3/5">
              <h2 className="text-lg sm:text-xl font-semibold text-sky-700 mb-2 sm:mb-3">
                {event.title}
              </h2>
              <div className="flex flex-wrap items-center text-slate-600 text-xs sm:text-sm mb-3 sm:mb-4 space-y-1 sm:space-y-0 sm:space-x-0 sm:space-x-3 md:space-x-4">
                <span className="flex items-center w-full sm:w-auto">
                  <IconCalendar className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-sky-600" />
                  {event.date}
                </span>
                <span className="flex items-center w-full sm:w-auto">
                  <IconClock className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-sky-600" />
                  {event.time}
                </span>
              </div>
              <div className="flex items-center text-slate-600 text-xs sm:text-sm mb-3 sm:mb-4">
                <IconMapMarker className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-sky-600 flex-shrink-0" />
                {event.location}
              </div>
              {event.isLiveStream && (
                <span className="inline-block bg-red-100 text-red-700 text-[0.6rem] sm:text-xs font-semibold px-2 py-1 sm:px-2.5 sm:py-1 rounded-full mb-3 sm:mb-4 uppercase tracking-wider">
                  <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full mr-1.5 sm:mr-2 animate-pulse"></span>
                  Live Stream Available
                </span>
              )}
              <p className="text-gray-700 leading-relaxed mb-4 sm:mb-6 text-xs sm:text-sm md:text-base">
                {event.description}
              </p>

              {event.id === 1 && (
                <div className="mt-3 mb-4 sm:mb-6 flex flex-col sm:flex-row flex-wrap gap-2">
                  <Button
                    onClick={() => downloadICSFile(event)}
                    type="secondary"
                    className="flex-grow sm:flex-grow-0 text-2xs sm:text-xs px-3 py-1.5"
                    icon={<IconCalendar className="h-4 w-4" />}
                  >
                    Add to Calendar
                  </Button>
                  <Button
                    onClick={() =>
                      window.open(
                        "/WWF_Candidate_Forum_Public_Release.pdf",
                        "_blank"
                      )
                    }
                    type="secondary"
                    className="flex-grow sm:flex-grow-0 text-2xs sm:text-xs px-3 py-1.5"
                    icon={<IconInfo className="h-4 w-4 mr-0 sm:mr-0" />}
                  >
                    View PDF Release
                  </Button>
                </div>
              )}

              <div className="mb-4 sm:mb-6 p-2.5 sm:p-3 md:p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h3 className="text-sm sm:text-md md:text-lg font-semibold text-slate-700 mb-1.5 sm:mb-2">
                  Event Highlights:
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 sm:space-y-1.5 text-2xs sm:text-xs md:text-sm">
                  {event.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                  <li>{event.accessibility}</li>
                </ul>
              </div>
              <div className="bg-sky-50 p-2.5 sm:p-3 md:p-4 rounded-lg mb-4 sm:mb-6 border border-sky-200">
                <h3 className="text-sm sm:text-md md:text-lg font-semibold text-sky-700 mb-1.5 sm:mb-2">
                  For Attendees:
                </h3>
                <p className="text-gray-700 leading-relaxed text-2xs sm:text-xs md:text-sm">
                  {event.audienceInfo}
                </p>
              </div>
              {event.volunteerInfo && (
                <div className="bg-green-50 p-2.5 sm:p-3 md:p-4 rounded-lg border border-green-200 mb-4 sm:mb-6">
                  <h3 className="text-sm sm:text-md md:text-lg font-semibold text-green-700 mb-1.5 sm:mb-2">
                    Volunteer Opportunities:
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-2xs sm:text-xs md:text-sm">
                    {event.volunteerInfo}
                  </p>
                  <Button
                    onClick={() => {
                      setSelectedProject(null);
                      setActivePage("Contact");
                    }}
                    type="secondary"
                    className="mt-2 sm:mt-3 text-2xs sm:text-xs px-2.5 py-1 sm:px-3 sm:py-1.5"
                    icon={<IconMail />}
                  >
                    Contact to Volunteer
                  </Button>
                </div>
              )}
            </div>
          </div>

          {event.panelists && event.panelists.length > 0 && (
            <div className="mt-6 sm:mt-8 border-t border-slate-200 pt-6 sm:pt-8">
              <PanelistSection panelists={event.panelists} />
            </div>
          )}

          {event.relatedProjectId && (
             <div className={`mt-6 sm:mt-8 pt-6 sm:pt-8 ${event.panelists && event.panelists.length > 0 ? 'border-t border-slate-200' : ''}`}>
              <Button
                onClick={() => {
                  const project = projectsData.find(
                    (p) => p.id === event.relatedProjectId
                  );
                  if (project) {
                    setSelectedProject(project);
                    setActivePage("ProjectDetails");
                  }
                }}
                type="primary"
                className="text-2xs sm:text-xs px-2.5 py-1 sm:px-3 sm:py-1.5"
                icon={<IconInfo className="h-4 w-4 mr-0 sm:mr-0" />}
              >
                View Related Project
              </Button>
            </div>
          )}
        </Card>
      ))}

      <Card noHoverEffect className="text-center bg-slate-50 border-slate-200">
        <h3 className="text-md sm:text-lg md:text-xl font-semibold text-slate-700 mb-2 sm:mb-3">
          Stay Informed
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-3 sm:mb-4">
          We are committed to fostering an engaged community. Check back for
          more events or contact us to get involved.
        </p>
      </Card>
    </div>
  );
};

const ContactPage = () => {
  const initialFormData = {
    name: "",
    email: "",
    message: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [result, setResult] = useState("");
  const web3FormsAccessKey = "ccb9ef54-31b7-4397-9eb8-ff8d3b587265";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formElement = event.target;
    const web3FormData = new FormData(formElement);

    web3FormData.append("access_key", web3FormsAccessKey);
    web3FormData.append(
      "subject",
      `New Contact from ${formElement.name.value || "Website Visitor"}`
    );

    if (!formData.name || !formData.email || !formData.message) {
      setResult("Please fill in all required fields.");
      setTimeout(() => setResult(""), 6000);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setResult("Please enter a valid email address.");
      setTimeout(() => setResult(""), 6000);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: web3FormData,
      });
      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        formElement.reset();
        setFormData(initialFormData);
        setTimeout(() => setResult(""), 6000);
      } else {
        console.log("Error from web3forms", data);
        setResult(data.message || "An error occurred. Please try again.");
        setTimeout(() => setResult(""), 6000);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setResult(
        "An error occurred while submitting the form. Please try again later."
      );
      setTimeout(() => setResult(""), 6000);
    }
  };

  return (
    <div
      className="container mx-auto py-10 sm:py-12 md:py-16 px-4 animate-fadeIn"
      id="contact-page-link"
    >
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-8 sm:mb-10 md:mb-12 text-center">
        Contact Us
      </h1>
      <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
        <Card className="bg-slate-50 border-slate-200" hasDotPattern>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-sky-700 mb-4 sm:mb-6">
            Contact Information
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4 sm:mb-6 text-xs sm:text-sm md:text-lg">
            We welcome your questions and ideas! Reach out to learn more or
            support our initiatives.
          </p>
          <div className="space-y-4 sm:space-y-5">
            <div className="flex items-start">
              <IconMail className="text-sky-600 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
              <div>
                <strong className="text-slate-700 text-xs sm:text-sm md:text-base">
                  Emails:
                </strong>
                <ul className="list-none text-gray-600 mt-1 space-y-1 text-2xs sm:text-xs md:text-sm">
                  <li>
                    <a
                      href="mailto:emailparth11@gmail.com"
                      className="hover:text-sky-500 transition-colors"
                    >
                      Parth Gupta: emailparth11@gmail.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:darshan.chids@gmail.com"
                      className="hover:text-sky-500 transition-colors"
                    >
                      Darshan Chidambaram: darshan.chids@gmail.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <p className="text-gray-700 mt-6 sm:mt-8 text-xs sm:text-sm md:text-lg">
            Stay connected! Follow us on social media for the latest news and
            ways to engage.
          </p>
          <div className="mt-4">
            <a
              href="https://www.facebook.com/profile.php?id=61575121893868"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sky-600 hover:text-sky-700 transition-colors text-sm"
            >
              <IconFacebook />
              <span className="ml-2">Follow us on Facebook</span>
            </a>
          </div>
        </Card>
        <Card hasDotPattern>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-sky-700 mb-4 sm:mb-6">
            Send Us a Message
          </h2>
          {result && (
            <div
              className={`mb-3 sm:mb-4 p-2.5 sm:p-3 rounded-md border text-xs sm:text-sm ${
                result === "Form Submitted Successfully"
                  ? "bg-green-100 text-green-700 border-green-300"
                  : result === "Sending...."
                  ? "bg-blue-100 text-blue-700 border-blue-300"
                  : "bg-red-100 text-red-700 border-red-300"
              }`}
            >
              {result}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-2xs sm:text-xs font-medium text-gray-700 mb-0.5 sm:mb-1"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-xs sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-2xs sm:text-xs font-medium text-gray-700 mb-0.5 sm:mb-1"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-xs sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-2xs sm:text-xs font-medium text-gray-700 mb-0.5 sm:mb-1"
              >
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                id="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="mt-1 block w-full px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-xs sm:text-sm"
                required
              ></textarea>
            </div>
            <div>
              <Button
                isSubmit
                type="primary"
                className="w-full text-xs sm:text-sm md:text-base py-2 sm:py-2.5"
                disabled={result === "Sending...."}
                icon={
                  result === "Sending...." ? (
                    <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white"></div>
                  ) : (
                    <IconMail />
                  )
                }
              >
                {result === "Sending...." ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

// --- Main App Component with Routing Support ---
function App() {
  const initialState = window.getInitialPageFromURL
    ? window.getInitialPageFromURL()
    : { page: "Home", projectSlug: null };
  const [activePage, setActivePage] = useState(initialState.page);
  const [selectedProject, setSelectedProject] = useState(() => {
    if (initialState.projectSlug) {
      return projectsData.find(p => p.slug === initialState.projectSlug) || null;
    }
    return null;
  });

  useEffect(() => {
    const projectSlug = selectedProject?.slug;
    const projectTitle = selectedProject?.title;

    if (window.updateURL) window.updateURL(activePage, projectSlug);
    if (window.getPageTitle && window.updatePageTitle) {
        const pageTitle = window.getPageTitle(activePage, projectTitle);
        window.updatePageTitle(pageTitle);
    }

  }, [activePage, selectedProject]);

  useEffect(() => {
    if (window.handleRouteChange) {
        window.originalHandleRouteChange = window.handleRouteChange;
        window.handleRouteChange = (page, projectSlug) => {
            setActivePage(page);
            if (projectSlug) {
                const project = projectsData.find(p => p.slug === projectSlug);
                setSelectedProject(project || null);
            } else {
                setSelectedProject(null);
            }
        };
    }

    return () => {
        if (window.originalHandleRouteChange) {
            window.handleRouteChange = window.originalHandleRouteChange;
            delete window.originalHandleRouteChange;
        } else if (window.handleRouteChange) {
            delete window.handleRouteChange;
        }
    };
  }, []);


  const renderPage = () => {
    if (activePage === "ProjectDetails" && selectedProject) {
      return (
        <ProjectDetailPage
          project={selectedProject}
          setActivePage={setActivePage}
          setSelectedProject={setSelectedProject}
        />
      );
    }
    switch (activePage) {
      case "Home":
        return (
          <HomePage
            setActivePage={setActivePage}
            setSelectedProject={setSelectedProject}
          />
        );
      case "About":
        return <AboutPage />;
      case "Projects":
        return (
          <ProjectsPage
            setActivePage={setActivePage}
            setSelectedProject={setSelectedProject}
          />
        );
      case "Events":
        return (
          <EventsPage
            setActivePage={setActivePage}
            setSelectedProject={setSelectedProject}
          />
        );
      case "Contact":
        return <ContactPage />;
      default:
        return (
          <HomePage
            setActivePage={setActivePage}
            setSelectedProject={setSelectedProject}
          />
        );
    }
  };

  return (
    <div
      id="app"
      className="flex flex-col min-h-screen bg-slate-100 font-body text-slate-700 print:bg-white"
    >
      <Navbar
        setActivePage={setActivePage}
        activePage={activePage}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
      />
      <main className="flex-grow pt-px">{renderPage()}</main>
      <Footer />
    </div>
  );
}

export default App;

if (typeof window !== 'undefined') {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
      body { font-family: 'Lora', Georgia, serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
      .font-body { font-family: 'Lora', Georgia, serif; }
      h1, h2, h3, h4, h5, h6 { font-family: 'Lora', Georgia, serif; }
      .prose { font-family: 'Lora', Georgia, serif; }
      .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 { margin-bottom: 0.5em; margin-top: 1em; }
      .prose p { margin-bottom: 1em; line-height: 1.7; }
      .prose ul, .prose ol { margin-left: 1.5em; margin-bottom: 1em; }
      .prose li { margin-bottom: 0.25em; }

      @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
      .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }

      @keyframes slideDown {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-slideDown { animation: slideDown 0.3s ease-out forwards; }

      .group:hover .dot-pattern-animated div div { transform: scale(1.5); opacity: 0.5; }

      @keyframes pulse-slow {
        0%, 100% { opacity: 0.05; }
        50% { opacity: 0.15; }
      }
      .animate-pulse-slow {
        animation: pulse-slow 5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }

      @media print {
        body {
          font-family: 'Times New Roman', Times, serif;
          font-size: 11pt;
          color: #000;
          background-color: #fff !important;
        }
        .print\\:hidden { display: none !important; }
        .print\\:bg-white { background-color: #fff !important; }
        .container { max-width: 100% !important; padding-left: 0.5in !important; padding-right: 0.5in !important; margin-left: auto; margin-right: auto; }
        .shadow-lg, .shadow-xl, .shadow-2xl, .shadow-md { box-shadow: none !important; }
        .border, .border-l-4, .border-t { border-color: #ccc !important; }
        .bg-slate-50, .bg-sky-50, .bg-green-50, .bg-red-100, .bg-gradient-to-br, .bg-slate-900, .bg-sky-800, .bg-indigo-900, .bg-slate-800 {
            background-image: none !important;
            background-color: #fff !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        .text-sky-700, .text-green-700, .text-red-700, .text-slate-800, .text-slate-900, .text-slate-700, .text-slate-600 { color: #000 !important; }
        .text-white, .text-gray-300, .text-gray-400, .text-sky-200, .text-gray-700 { color: #333 !important; }

        img { max-width: 100% !important; page-break-inside: avoid; }
        a { text-decoration: none; color: #0000EE; }
        a[href^="http"]:not([href*="placehold.co"]):after,
        a[href^="https"]:not([href*="placehold.co"]):after {
          content: " (" attr(href) ")";
          font-size: 9pt;
          color: #555;
        }
        a[href^="mailto:"]:after {
          content: " (" attr(href) ")";
          font-size: 9pt;
          color: #555;
        }
        .card, section > div > div, article, .PanelistSection > div > div { page-break-inside: avoid; }
        button {
          border: 1px solid #ccc !important;
          background-color: #eee !important;
          color: #000 !important;
          padding: 4px 8px !important;
          box-shadow: none !important;
        }
      }
    `;
    document.head.appendChild(styleSheet);

    const fontLinkLora = document.createElement("link");
    fontLinkLora.rel = "stylesheet";
    fontLinkLora.href =
      "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap";
    document.head.appendChild(fontLinkLora);

    if (!window.getInitialPageFromURL) {
        window.getInitialPageFromURL = () => ({ page: "Home", projectSlug: null });
    }
    if (!window.updateURL) {
        window.updateURL = (page, projectSlug) => console.log("Mock updateURL:", page, projectSlug);
    }
    if (!window.getPageTitle) {
        window.getPageTitle = (page, projectTitle) => `WWF - ${projectTitle || page}`;
    }
    if (!window.updatePageTitle) {
        window.updatePageTitle = (title) => console.log("Mock updatePageTitle:", title);
    }
}
