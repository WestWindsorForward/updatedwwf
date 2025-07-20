import React, { useState, useEffect, useRef } from "react";

// --- Asset URLs ---
const logoUrl = "/WW Forward.png";

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

const IconCalendar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
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
    className="h-5 w-5"
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

const IconMapMarker = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
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

const IconUsers = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
  </svg>
);

const IconCheckCircle = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
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

const IconChevronDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

const IconChevronUp = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
      clipRule="evenodd"
    />
  </svg>
);

const IconExternalLink = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
  </svg>
);

const IconQuestionMark = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
      clipRule="evenodd"
    />
  </svg>
);

const IconLightBulb = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.477.859h4z" />
  </svg>
);

const IconMicrophone = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
      clipRule="evenodd"
    />
  </svg>
);

const IconDocument = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
      clipRule="evenodd"
    />
  </svg>
);

const IconRecycle = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
  </svg>
);

const IconPaintBrush = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M18 3a1 1 0 00-1.447-.894L8.763 6.632a3 3 0 00-2.134 2.134L2.105 17.553A1 1 0 003 19a1 1 0 00.894-.447l8.787-3.524a3 3 0 002.134-2.134l4.526-7.79A1 1 0 0018 3zm-5 4a1 1 0 11-2 0 1 1 0 012 0z"
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

// Hamburger Menu Icons
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

// Helper Components
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
  size = "md",
}) => {
  const baseStyle = `inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 ease-in-out transform hover:scale-103 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-75 shadow-md hover:shadow-lg ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  }`;
  
  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm",
    lg: "px-6 py-3 text-sm sm:text-base"
  };
  
  const typeStyle =
    type === "primary"
      ? "bg-sky-600 hover:bg-sky-700 text-white focus:ring-sky-500"
      : type === "secondary"
      ? "bg-slate-200 hover:bg-slate-300 text-slate-800 focus:ring-slate-400"
      : type === "success"
      ? "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500"
      : type === "warning" 
      ? "bg-amber-600 hover:bg-amber-700 text-white focus:ring-amber-500"
      : "bg-slate-200 hover:bg-slate-300 text-slate-800 focus:ring-slate-400";
      
  return (
    <button
      type={isSubmit ? "submit" : "button"}
      onClick={onClick}
      className={`${baseStyle} ${typeStyle} ${sizeStyles[size]} ${className}`}
      disabled={disabled}
    >
      {icon && !children && <span>{icon}</span>}
      {icon && children && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

// Navigation Component
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

        <ul className="hidden sm:flex flex-wrap justify-end space-x-2 md:space-x-4">
          {navItems.map((item) => (
            <li key={item}>
              <button
                onClick={() => handleNav(item)}
                className={`px-3 py-2 md:px-4 md:py-2 rounded-md text-sm font-medium transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75
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

// Footer Component
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
            href="mailto:contact@westwindsorforward.org"
            className="hover:text-sky-400 transition-colors flex items-center"
          >
            <IconMail />
            <span className="ml-2">contact@westwindsorforward.org</span>
          </a>
        </div>
        <div className="flex justify-center items-center space-x-4 mt-4">
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

// Forum Data
const forumData = {
  title: "West Windsor Forward 2025 Candidate Forum",
  date: "Thursday, September 25th, 2025",
  time: "7:00 PM - 9:15 PM",
  arrivalTime: "6:30 PM for candidates",
  location: "Kelsey Theatre @ Mercer County Community College",
  positions: [
    "Mayor of West Windsor Township",
    "2 seats on West Windsor Township Council"
  ],
  status: "upcoming",
  
  panelists: [
    {
      id: 'micah-rasmussen',
      name: "Micah Rasmussen",
      title: "Director, Rebovich Institute for NJ Politics",
      imageUrl: "/micah.png",
      bio: "Micah Rasmussen is the director of the Rebovich Institute for New Jersey Politics at Rider University. He has worked in the New Jersey General Assembly and managed several political campaigns. After completing his undergraduate studies at Rider under his mentor David Rebovich, the namesake of the institute he now leads, Rasmussen earned his Master of Arts in Political Science from the Eagleton Institute of Politics at Rutgers University. Rasmussen is a panelist for the state's biggest political debates-- twice so far this year in the race to elect New Jersey's next governor, and in the only debate last year between now Senator Andy Kim and First Lady Tammy Murphy. He is regularly included on New Jersey's political power and higher education influencer lists. One called him \"the go-to guy for the media to comment on what's happening in New Jersey politics-- and what it means\".",
      note: "Contributing questions remotely due to scheduling conflict"
    },
    {
      id: 'david-matthau',
      name: "David Matthau",
      title: "WHYY NJ Reporter",
      imageUrl: "/matthau.png",
      bio: "David Matthau is a WHYY New Jersey reporter covering the Statehouse and general assignments in the Garden State. Prior to joining WHYY, David was lead investigative reporter for NJ 101.5 News, winning multiple Associated Press and Society of Professional Journalists awards, the National Association of Broadcasters Service to Community Award, and contributed to the National Edward R. Murrow Best Newscast award. David is a graduate of the University of Southern California."
    },
    {
      id: 'rhea-biswas',
      name: "Rhea Biswas",
      title: "West Windsor HS Student & Journalist",
      imageUrl: "/rhea.png",
      bio: "Rhea Biswas is a West Windsor high school student passionate about politics and social justice, with hopes of pursuing a career in law. She regularly competes in debate competitions and Model Congress conferences, as well as writes for her school newspaper and a local newspaper, The West Windsor Voice. She is committed to transparent debate and honest discussion in order to better advocate for meaningful change in her community."
    },
  ],
  
  forumParts: [
    {
      id: 1,
      title: "Panelist Q&A Sessions",
      description: "Equal time Q&A sessions for Mayoral and Council candidates with questions from our distinguished panelists",
      location: "Main Theatre",
      icon: <IconMicrophone />
    },
    {
      id: 2,
      title: "Town Hall Q&A",
      description: "Community-driven Q&A where residents can submit questions for candidates to address",
      location: "Main Theatre", 
      icon: <IconUsers />
    },
    {
      id: 3,
      title: "Meet & Greet",
      description: "Informal conversations between candidates and voters, plus community organization tables",
      location: "Theatre Lobby",
      icon: <IconLightBulb />
    }
  ],
  
  milestones: [
    {
      id: 1,
      title: "Venue & Panelists Secured",
      description: "Kelsey Theatre confirmed, distinguished panelists recruited, partnerships established",
      completed: true,
      date: "Completed"
    },
    {
      id: 2,
      title: "Candidate Invitations & Agreements",
      description: "Formal invitations sent to all declared candidates, agreements being collected",
      completed: false,
      date: "In Progress"
    },
    {
      id: 3,
      title: "Community Engagement & Promotion",
      description: "Public awareness campaign, ticket distribution, volunteer recruitment",
      completed: false,
      date: "August - September 2025"
    },
    {
      id: 4,
      title: "Forum Event Day",
      description: "Live forum with streaming, Q&A sessions, and community engagement",
      completed: false,
      date: "September 25, 2025"
    }
  ],
  
  requirements: {
    council: "At least 3 council candidates participating OR candidates from at least 2 different tickets with minimum 3 total candidates running",
    mayor: "At least 2 mayoral candidates participating"
  },
  
  volunteerRoles: [
    "Event Setup & Logistics",
    "Attendee Greeting & Check-in", 
    "Camera & Live Stream Operation",
    "Question Collection & Management",
    "Community Organization Coordination",
    "Post-Event Cleanup"
  ]
};

// Project Data
const projectsData = [
  {
    id: 1,
    slug: "candidate-forum-2025",
    title: "2025 Candidate Forum",
    shortGoal: "Fostering informed civic participation.",
    status: "Upcoming: September 25, 2025",
    description: "Providing a non-partisan platform for Mayoral and Council candidates to engage with residents, ensuring informed participation in our local democracy.",
    image: "https://placehold.co/600x400/0A2342/FFFFFF?text=Candidate+Forum&font=Lora",
    partnerOrganizations: ["League of Women Voters of the Greater Princeton Area"],
    redirectTo: "Events"
  },
  {
    id: 2,
    slug: "adopt-a-station-pjc",
    title: "Adopt-a-Station: Princeton Junction",
    titleImage: null,
    shortGoal: "Revitalizing our key transit hub.",
    goal: "To transform the Princeton Junction Station into a welcoming, aesthetically appealing, and culturally reflective community hub that serves all users.",
    status: "Early Planning & Proposal Development",
    description:
      "This is a proposed comprehensive project to transform Princeton Junction Station—a vital asset serving over 4,000 NJ TRANSIT passengers daily and 123,000+ Amtrak passengers annually—into a vibrant community hub. We are developing plans for beautification efforts, community art installations, environmental initiatives, and programming to enhance the daily experience for thousands of commuters while fostering community pride and connectivity. Currently in early planning stages with proposals being developed for potential partnerships.",
    impact:
      "Enhanced commuter experience for thousands of daily users, strengthened community identity through public art, environmental benefits through recycling and beautification programs, increased community engagement through events and programming, and preserved infrastructure value through maintenance and improvements.",
    timeline: [
      {
        stage: "Concept Development & Research",
        details:
          "Initial research completed on station usage, community needs, and potential improvement opportunities. Concept proposal drafted.",
        completed: true,
      },
      {
        stage: "Stakeholder Outreach & Partnership Development",
        details:
          "Reaching out to NJ TRANSIT, West Windsor Parking Authority, and community organizations to gauge interest and explore potential partnerships.",
        completed: false,
      },
      {
        stage: "Community Input & Proposal Refinement",
        details:
          "Gathering community feedback on proposed improvements and refining plans based on resident input and partnership possibilities.",
        completed: false,
      },
      {
        stage: "Implementation Planning",
        details:
          "If partnerships are established, develop detailed implementation timeline and begin coordination with relevant authorities.",
        completed: false,
      },
    ],
    getInvolved:
      "Share your ideas for station improvements, express interest in volunteering for future cleanup or beautification efforts, connect us with relevant community organizations, or let us know what would make your commuting experience better.",
    image:
      "https://placehold.co/600x400/3B82F6/FFFFFF?text=Princeton+Junction+Station&font=Lora",
    partnerOrganizations: [],
    fundingSources: [],
    quickActions: [],
    initiatives: [
      {
        title: "Beautification & Maintenance",
        description: "Potential regular cleanup, landscaping, and seasonal decorations",
        icon: <IconLightBulb />,
        status: "Concept Phase"
      },
      {
        title: "Art & Cultural Enhancement", 
        description: "Proposed community murals, decorative elements, and cultural programming",
        icon: <IconPaintBrush />,
        status: "Concept Phase"
      },
      {
        title: "Environmental Initiatives",
        description: "Exploring recycling programs and sustainable improvements",
        icon: <IconRecycle />,
        status: "Research Phase"
      },
      {
        title: "Community Programming",
        description: "Ideas for events and community engagement opportunities",
        icon: <IconUsers />,
        status: "Planning Phase"
      }
    ]
  },
];

// Main Components
const ForumHeader = () => {
  const generateICSData = () => {
    const startDate = "20250925T190000";
    const endDate = "20250925T211500";
    const timezone = "America/New_York";
    
    const icsData = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0", 
      "PRODID:-//WestWindsorForward//WWF Events//EN",
      "BEGIN:VEVENT",
      `UID:wwf-forum-2025@westwindsorforward.org`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:.]/g, "").substring(0, 15)}Z`,
      `DTSTART;TZID=${timezone}:${startDate}`,
      `DTEND;TZID=${timezone}:${endDate}`,
      `SUMMARY:West Windsor Forward 2025 Candidate Forum`,
      `DESCRIPTION:Non-partisan candidate forum for West Windsor Township elections`,
      `LOCATION:Kelsey Theatre @ Mercer County Community College`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    
    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "wwf_candidate_forum_2025.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  return (
    <header className="relative bg-gradient-to-br from-slate-900 via-sky-800 to-indigo-900 text-white py-12 sm:py-16 md:py-20 px-4 rounded-b-2xl shadow-2xl overflow-hidden">
      <DotPattern dotColor="text-sky-700 opacity-10" rows={8} cols={10} />
      <div className="relative z-10 container mx-auto text-center">
        <div className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold mb-4 animate-pulse">
          <span className="inline-block w-2 h-2 bg-white rounded-full mr-2"></span>
          UPCOMING EVENT
        </div>
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
          2025 Candidate Forum
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-sky-200 mb-6 max-w-3xl mx-auto">
          Empowering West Windsor voters with direct access to candidates for Mayor and Township Council
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
            <div className="font-semibold">{forumData.date}</div>
            <div className="text-sm text-sky-200">{forumData.time}</div>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
            <div className="font-semibold">Kelsey Theatre</div>
            <div className="text-sm text-sky-200">@ MCCC West Windsor</div>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
            <div className="font-semibold">Live Streamed</div>
            <div className="text-sm text-sky-200">YouTube & Recording</div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={generateICSData}
            size="lg"
            icon={<IconCalendar />}
          >
            Add to Calendar
          </Button>
          <Button 
            type="secondary"
            size="lg"
            icon={<IconDocument />}
            onClick={() => window.open("/WWF_Candidate_Forum_Public_Release.pdf", "_blank")}
          >
            View Official Release
          </Button>
        </div>
      </div>
    </header>
  );
};

const ProgressSection = () => (
  <Card className="bg-gradient-to-r from-sky-50 to-indigo-50 border-sky-200">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Forum Milestones</h2>
    </div>
    
    <div className="grid gap-4">
      {forumData.milestones.map((milestone) => (
        <div 
          key={milestone.id}
          className={`flex items-start p-4 rounded-lg border-l-4 ${
            milestone.completed 
              ? "border-green-500 bg-green-50" 
              : "border-sky-500 bg-sky-50"
          }`}
        >
          <div className="mr-3 mt-1">
            {milestone.completed ? (
              <IconCheckCircle className="h-6 w-6 text-green-600" />
            ) : (
              <IconClock className="h-6 w-6 text-sky-600" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-800 mb-1">{milestone.title}</h3>
            <p className="text-sm text-slate-600 mb-2">{milestone.description}</p>
            <span className="text-xs font-medium text-slate-500">{milestone.date}</span>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

const ForumFormatSection = () => (
  <Card hasDotPattern>
    <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 text-center">
      Forum Format & Structure
    </h2>
    
    <div className="grid md:grid-cols-3 gap-6">
      {forumData.forumParts.map((part, index) => (
        <div 
          key={part.id}
          className="relative bg-gradient-to-br from-slate-50 to-sky-50 p-6 rounded-xl border border-sky-200 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center mb-4">
            <div className="bg-sky-600 text-white p-2 rounded-lg mr-3 flex justify-center items-center">
              {part.icon}
            </div>
            <div>
              <div className="text-xs font-semibold text-sky-600 uppercase tracking-wider">
                Part {part.id}
              </div>
              <h3 className="font-semibold text-slate-800">{part.title}</h3>
            </div>
          </div>
          
          <p className="text-sm text-slate-600 mb-3">{part.description}</p>
          
          <div className="flex items-center text-xs text-slate-500">
            <IconMapMarker className="h-3 w-3 mr-1" />
            {part.location}
          </div>
        </div>
      ))}
    </div>
    
    <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
      <h3 className="font-semibold text-amber-800 mb-2 flex items-center">
        <IconDocument className="h-5 w-5 mr-2" />
        Forum Requirements
      </h3>
      <div className="space-y-2 text-sm text-amber-700">
        <p><strong>Council:</strong> {forumData.requirements.council}</p>
        <p><strong>Mayor:</strong> {forumData.requirements.mayor}</p>
      </div>
    </div>
  </Card>
);

const PanelistSection = () => {
  const [selectedPanelistId, setSelectedPanelistId] = useState(null);

  return (
    <Card>
      <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 text-center">
        Distinguished Panelists
      </h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {forumData.panelists.map((panelist) => (
          <div key={panelist.id} className="flex flex-col h-full">
            <div 
              className={`text-center p-6 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col h-full ${
                selectedPanelistId === panelist.id 
                  ? 'border-sky-500 bg-sky-50 shadow-lg' 
                  : 'border-gray-200 hover:border-sky-300 hover:shadow-md'
              }`}
              onClick={() => setSelectedPanelistId(selectedPanelistId === panelist.id ? null : panelist.id)}
            >
              <img
                src={panelist.imageUrl || `https://placehold.co/150x150/E0F2FE/0C4A6E?text=${panelist.name.substring(0,1)}${panelist.name.split(' ')[1]?.substring(0,1) || ''}&font=Lora`}
                alt={panelist.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-sky-200 object-cover shadow-sm"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/150x150/CCCCCC/FFFFFF?text=Panelist&font=Lora`;
                }}
              />
              <div className="flex-grow flex flex-col">
                <h3 className="font-semibold text-sky-700 mb-1 min-h-[1.5rem]">{panelist.name}</h3>
                <p className="text-sm text-slate-600 mb-3 flex-grow">{panelist.title}</p>
                {panelist.note && (
                  <p className="text-xs text-amber-600 italic mb-3 min-h-[2.5rem] flex items-center justify-center">
                    {panelist.note}
                  </p>
                )}
                {!panelist.note && (
                  <div className="min-h-[2.5rem] mb-3"></div>
                )}
              </div>
              
              <button className="text-xs text-sky-600 hover:text-sky-700 font-medium flex items-center justify-center mx-auto mt-auto">
                {selectedPanelistId === panelist.id ? 'Hide Bio' : 'View Bio'}
                {selectedPanelistId === panelist.id ? (
                  <IconChevronUp className="ml-1 h-4 w-4" />
                ) : (
                  <IconChevronDown className="ml-1 h-4 w-4" />
                )}
              </button>
            </div>
            
            {selectedPanelistId === panelist.id && (
              <div className="bg-white p-4 -mt-2 rounded-b-xl shadow-lg border border-t-0 border-gray-200">
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {panelist.bio}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

const InteractiveSection = () => {
  const [questionForm, setQuestionForm] = useState({ name: '', email: '', question: '' });
  const [volunteerForm, setVolunteerForm] = useState({ name: '', email: '', roles: [], message: '' });
  const [activeTab, setActiveTab] = useState('questions');
  const [submitStatus, setSubmitStatus] = useState('');

  const handleQuestionSubmit = () => {
    if (!questionForm.name || !questionForm.email || !questionForm.question) {
      setSubmitStatus('Please fill in all required fields.');
      setTimeout(() => setSubmitStatus(''), 3000);
      return;
    }
    
    // Open Google Form for questions
    window.open('https://forms.gle/example-questions-form', '_blank');
    setSubmitStatus('Opening secure Google Form for question submission...');
    setQuestionForm({ name: '', email: '', question: '' });
    setTimeout(() => setSubmitStatus(''), 3000);
  };

  const handleVolunteerSubmit = () => {
    if (!volunteerForm.name || !volunteerForm.email) {
      setSubmitStatus('Please fill in your name and email address.');
      setTimeout(() => setSubmitStatus(''), 3000);
      return;
    }
    
    // Open Google Form for volunteers
    window.open('https://forms.gle/example-volunteer-form', '_blank');
    setSubmitStatus('Opening secure Google Form for volunteer application...');
    setVolunteerForm({ name: '', email: '', roles: [], message: '' });
    setTimeout(() => setSubmitStatus(''), 3000);
  };

  const handleRoleToggle = (role) => {
    setVolunteerForm(prev => ({
      ...prev,
      roles: prev.roles.includes(role) 
        ? prev.roles.filter(r => r !== role)
        : [...prev.roles, role]
    }));
  };

  return (
    <Card className="bg-gradient-to-br from-slate-50 to-sky-50">
      <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 text-center">
        Get Involved
      </h2>
      
      <div className="flex flex-col sm:flex-row mb-6 bg-white rounded-lg p-1">
        <button
          onClick={() => setActiveTab('questions')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center ${
            activeTab === 'questions' 
              ? 'bg-sky-600 text-white' 
              : 'text-slate-600 hover:text-sky-600'
          }`}
        >
          <IconQuestionMark className="h-4 w-4 mr-2" />
          Submit Questions
        </button>
        <button
          onClick={() => setActiveTab('volunteer')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center ${
            activeTab === 'volunteer' 
              ? 'bg-sky-600 text-white' 
              : 'text-slate-600 hover:text-sky-600'
          }`}
        >
          <IconUsers className="h-4 w-4 mr-2" />
          Volunteer
        </button>
      </div>

      {submitStatus && (
        <div className="mb-4 p-3 bg-blue-100 border border-blue-300 text-blue-700 rounded-lg text-sm flex items-center">
          <IconInfo className="mr-2 flex-shrink-0" />
          {submitStatus}
        </div>
      )}

      {activeTab === 'questions' && (
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
            <IconQuestionMark className="mr-2" />
            Submit Your Question for the Town Hall
          </h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-blue-800 flex items-start">
              <IconInfo className="mr-2 mt-0.5 flex-shrink-0" />
              Questions are submitted through a secure Google Form to ensure anonymity and proper handling. 
              Your information will only be used for question attribution if selected.
            </p>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            Have a question you'd like candidates to address? Submit it through our secure form and it may be selected for the town hall Q&A session.
          </p>
          
          <Button 
            type="primary" 
            onClick={handleQuestionSubmit} 
            icon={<IconExternalLink />}
            className="w-full sm:w-auto"
          >
            Open Question Submission Form
          </Button>
        </div>
      )}

      {activeTab === 'volunteer' && (
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
            <IconUsers className="mr-2" />
            Volunteer for the Forum
          </h3>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-green-800 flex items-start">
              <IconCheckCircle className="mr-2 mt-0.5 flex-shrink-0" />
              Volunteer applications are processed through a secure Google Form. 
              We'll contact you with specific details and training information.
            </p>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            Help make this important civic event a success! We need volunteers for various roles throughout the event.
          </p>
          
          <div className="mb-4">
            <h4 className="text-md font-semibold text-slate-700 mb-2">Available Volunteer Roles:</h4>
            <div className="grid sm:grid-cols-2 gap-2">
              {forumData.volunteerRoles.map((role) => (
                <div key={role} className="text-sm text-slate-600 flex items-center">
                  <IconCheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  {role}
                </div>
              ))}
            </div>
          </div>
          
          <Button 
            type="success" 
            onClick={handleVolunteerSubmit} 
            icon={<IconExternalLink />}
            className="w-full sm:w-auto"
          >
            Open Volunteer Application Form
          </Button>
        </div>
      )}
    </Card>
  );
};

const KeyInformationSection = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const infoSections = [
    {
      id: 'attendance',
      title: 'For Attendees',
      icon: <IconUsers />,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-slate-800 mb-2">Why Attend?</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• Hear directly from candidates beyond campaign materials</li>
              <li>• Get answers to community questions during town hall session</li>
              <li>• Engage with fellow residents on important local issues</li>
              <li>• Meet candidates personally during informal session</li>
              <li>• Connect with local community organizations</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 mb-2">What to Expect</h4>
            <p className="text-sm text-slate-600">
              Free tickets will be available online starting September 2025. The event will be live-streamed 
              on YouTube for those unable to attend in person. Audience members are expected to maintain 
              respectful behavior during moderated portions.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'candidates',
      title: 'For Candidates',
      icon: <IconMicrophone />,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-slate-800 mb-2">Participation Benefits</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• Present your platform to engaged community audience</li>
              <li>• Reach broader audience through live streaming</li>
              <li>• Participate in fair, moderated discussion format</li>
              <li>• Connect directly with voters during meet-and-greet</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 mb-2">Requirements</h4>
            <p className="text-sm text-slate-600">
              Candidates must arrive by 6:30 PM for briefing, agree to ground rules including 
              professional conduct and time limits, and sign participation agreement by September 10th, 2025.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'rules',
      title: 'Ground Rules & Guidelines',
      icon: <IconDocument />,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-slate-800 mb-2">Candidate Conduct</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• Strict time limits enforced by moderator</li>
              <li>• Equal speaking opportunities for all candidates</li>
              <li>• One rebuttal opportunity per question</li>
              <li>• Professional attire required (no political slogans)</li>
              <li>• No personal attacks or derogatory comments</li>
              <li>• Electronic devices silenced during forum</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 mb-2">Audience Guidelines</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• Silent observation during moderated portions</li>
              <li>• Questions submitted in writing only</li>
              <li>• No political displays or materials in theatre</li>
              <li>• Recording prohibited (except official stream)</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  return (
    <Card>
      <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 text-center">
        Important Information
      </h2>
      
      <div className="space-y-4">
        {infoSections.map((section) => (
          <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <div className="text-sky-600 mr-3">
                  {section.icon}
                </div>
                <span className="font-semibold text-slate-800">{section.title}</span>
              </div>
              {expandedSection === section.id ? (
                <IconChevronUp className="text-gray-400" />
              ) : (
                <IconChevronDown className="text-gray-400" />
              )}
            </button>
            
            {expandedSection === section.id && (
              <div className="px-4 pb-4 border-t border-gray-100">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
          <IconExternalLink className="h-4 w-4 mr-2" />
          Complete Documentation
        </h3>
        <p className="text-sm text-blue-700 mb-3">
          For complete ground rules, candidate agreements, and detailed guidelines, view our official documents.
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            type="secondary" 
            size="sm"
            onClick={() => window.open("/WWF_Candidate_Forum_Public_Release.pdf", "_blank")}
            icon={<IconDocument />}
          >
            Public Release PDF
          </Button>
          <Button 
            type="secondary" 
            size="sm"
            onClick={() => window.open("/candidate-agreement.pdf", "_blank")}
            icon={<IconDocument />}
          >
            Candidate Agreement
          </Button>
        </div>
      </div>
    </Card>
  );
};

// HOME PAGE
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
          <div className="space-y-2 sm:space-y-0 sm:space-x-3 flex flex-col sm:flex-row justify-center">
            <Button
              onClick={() => {
                setSelectedProject(null);
                setActivePage("About");
              }}
              className="w-full sm:w-auto text-xs sm:text-sm px-5 py-2 sm:px-6 sm:py-2.5"
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
              <div className="flex items-center mb-3">
                <h3 className="text-lg sm:text-xl font-semibold text-sky-700">
                  2025 Candidate Forum
                </h3>
              </div>
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
              >
                Event Details
              </Button>
            </Card>
            <Card className="flex flex-col transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center mb-3">
                <h3 className="text-lg sm:text-xl font-semibold text-sky-700">
                  Adopt-a-Station: Princeton Junction
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 flex-grow">
                Transforming our vital transit hub into a welcoming, beautiful, and 
                vibrant community space through beautification, art, and programming.
              </p>
              <Button
                onClick={() => {
                  setSelectedProject(projectsData.find((p) => p.id === 2));
                  setActivePage("ProjectDetails");
                }}
                type="secondary"
                className="mt-auto w-full sm:w-auto text-xs"
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
          <div className="space-y-3 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center">
            <Button
              onClick={() => {
                setSelectedProject(null);
                setActivePage("Contact");
              }}
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

// ABOUT PAGE
const AboutPage = () => {
  const teamMembers = [
    {
      name: "Parth Gupta",
      role: "Co-Founder",
      bio: "A West Windsor resident for 14 years and student at the Lawrenceville School. Parth is a runner for the Lawrenceville School as part of their cross-country and track and field teams. Parth has been playing piano for 10 years and has co-organized piano Performathons to raise money for the Children's Hospital of Philadelphia.",
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

// PROJECTS PAGE
const ProjectCard = ({ project, setActivePage, setSelectedProject }) => {
  const handleCardClick = (e) => {
    if (e.target.closest("button")) {
      return;
    }
    
    if (project.redirectTo) {
      setSelectedProject(null);
      setActivePage(project.redirectTo);
    } else {
      setSelectedProject(project);
      setActivePage("ProjectDetails");
    }
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
    
    if (project.redirectTo) {
      setSelectedProject(null);
      setActivePage(project.redirectTo);
    } else {
      setSelectedProject(project);
      setActivePage("ProjectDetails");
    }
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
          className="w-full h-48 object-cover rounded-t-lg mb-4 transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/600x400/CCCCCC/FFFFFF?text=Project+Image&font=Lora`;
          }}
        />
        <div className="flex-grow flex flex-col px-2">
          <h3 className="text-lg sm:text-xl font-semibold text-sky-700 mb-2 group-hover:text-sky-600 transition-colors min-h-[3rem] flex items-start">
            {project.title}
          </h3>
          <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-3 leading-relaxed">
            {project.shortGoal}
          </p>
          <div className="mb-4">
            <span className="inline-block text-xs font-medium px-2 py-1 bg-sky-100 text-sky-700 rounded-full">
              {project.status}
            </span>
          </div>
          {project.partnerOrganizations && project.partnerOrganizations.length > 0 && (
            <div className="mb-4 min-h-[2rem]">
              <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Partners:
              </h4>
              <div className="flex flex-wrap gap-1">
                {project.partnerOrganizations.slice(0, 1).map((org) => (
                  <span
                    key={org}
                    className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full"
                  >
                    {org.length > 25 ? `${org.substring(0, 25)}...` : org}
                  </span>
                ))}
                {project.partnerOrganizations.length > 1 && (
                  <span className="text-xs text-slate-500">
                    +{project.partnerOrganizations.length - 1} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-auto pt-4 px-2 pb-2">
        <Button
          onClick={handleButtonClick}
          type="secondary"
          className="w-full text-xs"
        >
          {project.redirectTo ? "View Event Details" : "View Project Details"}
        </Button>
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
          <DotPattern dotColor="text-sky-500 opacity-10" rows={2} cols={8} />
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

// PROJECT DETAILS PAGE
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
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-sky-700 mb-2">
              {project.title}
            </h1>
            <div className="flex items-center text-xs sm:text-sm md:text-md text-gray-500 mb-2">
              {project.status.toLowerCase().includes("upcoming") ? (
                <IconClock className="mr-2 text-amber-600 h-5 w-5 flex-shrink-0" />
              ) : (
                <IconCheckCircle className="mr-2 text-green-600 h-5 w-5 flex-shrink-0" />
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

          {/* Enhanced Station Project Initiatives */}
          {project.initiatives && (
            <>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-800 border-b-2 border-sky-200 pb-2 mt-6 sm:mt-8 mb-3 sm:mb-4">
                Project Initiatives
              </h2>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {project.initiatives.map((initiative, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-sky-50 to-slate-50 p-4 rounded-lg border border-sky-200"
                  >
                    <div className="flex items-center mb-2">
                      <div className="text-sky-600 mr-3 flex justify-center items-center">
                        {initiative.icon}
                      </div>
                      <h3 className="font-semibold text-slate-800 text-sm">
                        {initiative.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-600 mb-2">
                      {initiative.description}
                    </p>
                    <span className="text-xs font-medium px-2 py-1 bg-sky-100 text-sky-700 rounded">
                      {initiative.status}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

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
                <div className="mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0">
                  {item.completed ? (
                    <IconCheckCircle className="text-green-500 h-5 w-5 sm:h-6 sm:w-6" />
                  ) : (
                    <IconClock className="text-sky-500 h-5 w-5 sm:h-6 sm:w-6" />
                  )}
                </div>
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
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-sky-700 mb-3 flex items-center">
              <IconUsers className="mr-2" />
              How You Can Contribute
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4 text-xs sm:text-sm md:text-base">
              {project.getInvolved}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
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
              {project.id === 2 && (
                <Button
                  onClick={() => window.open("/WWF_Station_Proposal.pdf", "_blank")}
                  type="secondary"
                  icon={<IconDocument />}
                  className="text-xs sm:text-sm"
                >
                  Read Full Proposal
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

// EVENTS PAGE (Enhanced Forum Page)
const EventsPage = ({ setActivePage, setSelectedProject }) => {
  return (
    <div className="min-h-screen bg-slate-100 font-body text-slate-700">
      <ForumHeader />
      
      <div className="container mx-auto px-4 py-8 space-y-8">
        <ProgressSection />
        <ForumFormatSection />
        <PanelistSection />
        <InteractiveSection />
        <KeyInformationSection />
        
        {/* Call to Action */}
        <Card className="text-center bg-gradient-to-r from-sky-600 to-indigo-600 text-white">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">
            Be Part of West Windsor's Democratic Process
          </h2>
          <p className="text-sky-100 mb-6 max-w-2xl mx-auto">
            Your participation makes our community stronger. Whether as an attendee, volunteer, or 
            question submitter, your voice matters in shaping West Windsor's future.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button type="secondary" size="lg" icon={<IconMail />}>
              Contact Us
            </Button>
            <Button 
              type="secondary" 
              size="lg" 
              icon={<IconExternalLink />}
              onClick={() => {
                setSelectedProject(null);
                setActivePage("About");
              }}
            >
              Learn More About Us
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

// CONTACT PAGE
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
                  Email:
                </strong>
                <ul className="list-none text-gray-600 mt-1 space-y-1 text-2xs sm:text-xs md:text-sm">
                  <li>
                    <a
                      href="mailto:contact@westwindsorforward.org"
                      className="hover:text-sky-500 transition-colors"
                    >
                      contact@westwindsorforward.org
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
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-blue-800 flex items-start">
              <IconInfo className="mr-2 mt-0.5 flex-shrink-0" />
              This form is powered by Web3Forms, a secure third-party service that ensures your data privacy and message delivery.
            </p>
          </div>
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

// Main App Component
function App() {
  const [activePage, setActivePage] = useState("Home");
  const [selectedProject, setSelectedProject] = useState(null);

  // URL and title management
  const updateUrlAndTitle = (page, project = null) => {
    let url = '/';
    let title = 'West Windsor Forward';
    
    switch (page) {
      case 'Home':
        url = '/';
        title = 'West Windsor Forward - Building a Better Community';
        break;
      case 'About':
        url = '/about';
        title = 'About Us - West Windsor Forward';
        break;
      case 'Projects':
        url = '/projects';
        title = 'Our Initiatives - West Windsor Forward';
        break;
      case 'Events':
        url = '/events';
        title = '2025 Candidate Forum - West Windsor Forward';
        break;
      case 'Contact':
        url = '/contact';
        title = 'Contact Us - West Windsor Forward';
        break;
      case 'ProjectDetails':
        if (project) {
          url = `/projects/${project.slug}`;
          title = `${project.title} - West Windsor Forward`;
        }
        break;
      default:
        url = '/';
        title = 'West Windsor Forward';
    }
    
    // Update URL without page reload
    if (typeof window !== 'undefined') {
      window.history.pushState({ page, project }, title, url);
      document.title = title;
    }
  };

  // Handle browser back/forward navigation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handlePopState = (event) => {
        if (event.state) {
          setActivePage(event.state.page);
          setSelectedProject(event.state.project);
        }
      };
      
      window.addEventListener('popstate', handlePopState);
      
      // Set initial page title
      updateUrlAndTitle(activePage, selectedProject);
      
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, []);

  // Enhanced navigation functions
  const navigateToPage = (page, project = null) => {
    setActivePage(page);
    setSelectedProject(project);
    updateUrlAndTitle(page, project);
  };

  const renderPage = () => {
    if (activePage === "ProjectDetails" && selectedProject) {
      return (
        <ProjectDetailPage
          project={selectedProject}
          setActivePage={navigateToPage}
          setSelectedProject={setSelectedProject}
        />
      );
    }
    switch (activePage) {
      case "Home":
        return (
          <HomePage
            setActivePage={navigateToPage}
            setSelectedProject={setSelectedProject}
          />
        );
      case "About":
        return <AboutPage />;
      case "Projects":
        return (
          <ProjectsPage
            setActivePage={navigateToPage}
            setSelectedProject={setSelectedProject}
          />
        );
      case "Events":
        return (
          <EventsPage
            setActivePage={navigateToPage}
            setSelectedProject={setSelectedProject}
          />
        );
      case "Contact":
        return <ContactPage />;
      default:
        return (
          <HomePage
            setActivePage={navigateToPage}
            setSelectedProject={setSelectedProject}
          />
        );
    }
  };

  return (
    <div
      id="app"
      className="flex flex-col min-h-screen bg-slate-100 font-body text-slate-700"
    >
      <Navbar
        setActivePage={navigateToPage}
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
      
      /* Line clamp utilities for consistent text truncation */
      .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    `;
    document.head.appendChild(styleSheet);

    const fontLinkLora = document.createElement("link");
    fontLinkLora.rel = "stylesheet";
    fontLinkLora.href =
      "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap";
    document.head.appendChild(fontLinkLora);
}
