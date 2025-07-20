import React, { useState, useEffect, useRef } from "react";

// --- Asset URLs ---
const logoUrl = "/WW Forward.png";

// --- SVG Icons ---
// [Your existing SVG components remain here, unchanged]
const IconMail = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
);
const IconCalendar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
  </svg>
);
const IconClock = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
  </svg>
);
const IconMapMarker = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
);
const IconUsers = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
  </svg>
);
const IconCheckCircle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);
const IconChevronDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);
const IconChevronUp = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
  </svg>
);
const IconExternalLink = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
  </svg>
);
const IconQuestionMark = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
  </svg>
);
const IconLightBulb = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.477.859h4z" />
  </svg>
);
const IconMicrophone = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
  </svg>
);
const IconDocument = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
  </svg>
);
const IconRecycle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
  </svg>
);
const IconPhotograph = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
    </svg>
);
const IconInfo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
  </svg>
);
const IconFacebook = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
  </svg>
);
const IconMenu = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);
const IconClose = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Dot Pattern Component
// [Your existing DotPattern, Card, and Button components remain here, unchanged]
const DotPattern = ({ className = "", dotColor = "text-sky-200 opacity-5", rows = 6, cols = 8 }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden -z-10 ${className}`} aria-hidden="true">
      <div className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] animate-pulse-slow">
        {Array.from({ length: rows * 2 }).map((_, r) => (
          <div key={`row-${r}`} className="flex justify-around" style={{ marginBottom: "25px" }}>
            {Array.from({ length: cols * 2 }).map((_, c) => (
              <div key={`dot-${r}-${c}`} className={`w-1 h-1 sm:w-1.5 sm:h-1.5 ${dotColor} rounded-full transition-all duration-500 ease-in-out`}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
const Card = ({ children, className = "", noHoverEffect = false, hasDotPattern = false, onClick }) => (
  <div
    className={`relative bg-white shadow-lg rounded-xl mb-6 sm:mb-8 border border-gray-200 ${hasDotPattern ? "overflow-hidden" : ""} ${noHoverEffect ? "" : "transition-all duration-300 hover:shadow-2xl hover:border-sky-400 hover:scale-[1.01]"} ${onClick ? "cursor-pointer" : ""} ${className}`}
    onClick={onClick}
  >
    {hasDotPattern && <DotPattern dotColor="text-sky-500 opacity-5" />}
    <div className="relative z-10 h-full flex flex-col">{children}</div>
  </div>
);
const Button = ({ children, onClick, type = "primary", className = "", icon, isSubmit = false, disabled = false, size = "md" }) => {
  const baseStyle = `inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 ease-in-out transform hover:scale-103 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-75 shadow-md hover:shadow-lg ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;
  const sizeStyles = { sm: "px-3 py-1.5 text-xs", md: "px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm", lg: "px-6 py-3 text-sm sm:text-base" };
  const typeStyle = type === "primary" ? "bg-sky-600 hover:bg-sky-700 text-white focus:ring-sky-500" : type === "secondary" ? "bg-slate-200 hover:bg-slate-300 text-slate-800 focus:ring-slate-400" : type === "success" ? "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500" : type === "warning" ? "bg-amber-600 hover:bg-amber-700 text-white focus:ring-amber-500" : "bg-slate-200 hover:bg-slate-300 text-slate-800 focus:ring-slate-400";
  return (
    <button type={isSubmit ? "submit" : "button"} onClick={onClick} className={`${baseStyle} ${typeStyle} ${sizeStyles[size]} ${className}`} disabled={disabled}>
      {icon && !children && <span>{icon}</span>}
      {icon && children && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

// Navigation Component
// [Your existing Navbar component remains here, unchanged]
const Navbar = ({ setActivePage, activePage, selectedProject }) => {
  const navItems = ["Home", "About", "Projects", "Events", "Contact"];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  const handleNav = (item) => {
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
      if (isMobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('button[aria-label="Open navigation menu"]')) {
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
        <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
          <img src={logoUrl} alt="West Windsor Forward Logo" className="h-10 sm:h-12 mr-2 sm:mr-3 rounded bg-white p-1.5" onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/48x48/FFFFFF/0C4A6E?text=WWF&font=Lora`; }} />
        </div>
        <div className="sm:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-400 p-2 rounded-md" aria-label="Open navigation menu" aria-expanded={isMobileMenuOpen}>
            {isMobileMenuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>
        <ul className="hidden sm:flex flex-wrap justify-end space-x-2 md:space-x-4">
          {navItems.map((item) => (
            <li key={item}>
              <button onClick={() => handleNav(item)} className={`px-3 py-2 md:px-4 md:py-2 rounded-md text-sm font-medium transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75 ${activePage === item && !selectedProject ? "bg-sky-500 text-white shadow-md" : "text-gray-300 hover:bg-sky-700 hover:text-white"}`}>
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {isMobileMenuOpen && (
        <div ref={mobileMenuRef} className="sm:hidden absolute top-full left-0 right-0 bg-slate-800 shadow-xl z-40 animate-slideDown">
          <ul className="flex flex-col items-start p-3 space-y-1.5">
            {navItems.map((item) => (
              <li key={item} className="w-full">
                <button onClick={() => handleMobileNav(item)} className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-150 ease-in-out ${activePage === item && !selectedProject ? "bg-sky-500 text-white" : "text-gray-300 hover:bg-sky-600 hover:text-white"}`}>
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

// --- START: ADDED MISSING DATA AND COMPONENTS ---

// Missing Data Objects
const projectsData = [
  {
    id: 1,
    title: "Community Garden Initiative",
    slug: "community-garden",
    summary: "Fostering local food production and community engagement through shared gardening spaces.",
  },
  {
    id: 2,
    title: "Route 571 Redesign",
    slug: "route-571-redesign",
    summary: "Advocating for a safer and more pedestrian-friendly Washington Road.",
  },
  {
    id: 3,
    title: "Howard-Hughes Property",
    slug: "howard-hughes-property",
    summary: "Ensuring responsible development of the former Howard Hughes property.",
  },
];

const forumData = {
  date: "October 24, 2025",
  time: "7:00 PM - 9:00 PM",
  location: "West Windsor High School North Auditorium",
};

// Missing Footer Component
const Footer = () => (
  <footer className="bg-slate-800 text-slate-300 p-8 text-center print:hidden">
    <div className="container mx-auto">
      <p>&copy; {new Date().getFullYear()} West Windsor Forward. All Rights Reserved.</p>
      <div className="flex justify-center space-x-4 mt-4">
        <a href="#" className="hover:text-white"><IconFacebook /></a>
        <a href="#" className="hover:text-white"><IconMail /></a>
      </div>
    </div>
  </footer>
);

// Missing Page Components
const HomePage = ({ setActivePage }) => (
    <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to West Windsor Forward</h1>
        <p>This is the home page. Your content goes here.</p>
        <Button onClick={() => setActivePage('Projects')} className="mt-4">View Our Projects</Button>
    </div>
);

const AboutPage = () => (
    <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p>This is the about page. Your content goes here.</p>
    </div>
);

const ProjectsPage = ({ setActivePage }) => (
    <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Our Initiatives</h1>
        <p>This is the projects page. Click a project to see details.</p>
        <div className="mt-6">
            {projectsData.map(project => (
                <Card key={project.id} onClick={() => setActivePage('ProjectDetails', project)}>
                    <div className="p-6">
                        <h2 className="text-xl font-bold">{project.title}</h2>
                        <p className="mt-2">{project.summary}</p>
                    </div>
                </Card>
            ))}
        </div>
    </div>
);

const ProjectDetailPage = ({ project, setActivePage }) => {
    if (!project) {
        return (
            <div className="p-8">
                <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
                <p>The requested project could not be found.</p>
                <Button onClick={() => setActivePage('Projects')} className="mt-4">Back to Projects</Button>
            </div>
        );
    }
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
            <p className="mb-4">{project.summary}</p>
            <p>Detailed content for this project goes here.</p>
            <Button onClick={() => setActivePage('Projects')} className="mt-4">Back to All Projects</Button>
        </div>
    );
};

const EventsPage = () => (
    <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">2025 Candidate Forum</h1>
        <p>Date: {forumData.date}</p>
        <p>Time: {forumData.time}</p>
        <p>Location: {forumData.location}</p>
    </div>
);

const ContactPage = () => (
    <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p>This is the contact page. Your content goes here.</p>
    </div>
);

// --- END: ADDED MISSING DATA AND COMPONENTS ---


// Main App Component
function App() {
  const [activePage, setActivePage] = useState("Home");
  const [selectedProject, setSelectedProject] = useState(null);

  const navigateToPage = (page, project = null) => {
    if (page === activePage && project?.id === selectedProject?.id) {
      window.scrollTo(0, 0);
      return;
    }
    setActivePage(page);
    setSelectedProject(project);
  };

  useEffect(() => {
    const getPageDetails = (page, project = null) => {
      let url = "/";
      let title = "West Windsor Forward";
      switch (page) {
        case "Home":
          url = "/";
          title = "West Windsor Forward - Building a Better Community";
          break;
        case "About":
          url = "/about";
          title = "About Us - West Windsor Forward";
          break;
        case "Projects":
          url = "/projects";
          title = "Our Initiatives - West Windsor Forward";
          break;
        case "Events":
          url = "/events";
          title = "2025 Candidate Forum - West Windsor Forward";
          break;
        case "Contact":
          url = "/contact";
          title = "Contact Us - West Windsor Forward";
          break;
        case "ProjectDetails":
          if (project) {
            url = `/projects/${project.slug}`;
            title = `${project.title} - West Windsor Forward`;
          } else {
            url = '/projects';
            title = 'Our Initiatives - West Windsor Forward';
          }
          break;
        default:
          url = "/";
          title = "West Windsor Forward";
      }
      return { url, title };
    };

    const { url, title } = getPageDetails(activePage, selectedProject);

    document.title = title;
    if (window.location.pathname !== url) {
      window.history.pushState({ page: activePage, project: selectedProject }, title, url);
    }
    window.scrollTo(0, 0);
  }, [activePage, selectedProject]);

  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state) {
        setActivePage(event.state.page);
        setSelectedProject(event.state.project);
      }
    };

    window.addEventListener("popstate", handlePopState);

    const path = window.location.pathname;
    const parts = path.split("/").filter(Boolean);

    if (parts.length === 0 && path === '/') {
        navigateToPage("Home");
    } else if (parts[0] === "about") {
      navigateToPage("About");
    } else if (parts[0] === "projects") {
      const projectSlug = parts[1];
      if (projectSlug) {
        const project = projectsData.find((p) => p.slug === projectSlug);
        navigateToPage("ProjectDetails", project || null);
      } else {
        navigateToPage("Projects");
      }
    } else if (parts[0] === "events") {
      navigateToPage("Events");
    } else if (parts[0] === "contact") {
      navigateToPage("Contact");
    } else {
      navigateToPage("Home"); // Add a fallback for unknown paths
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []); // This effect should only run once on initial load

  const renderPage = () => {
    if (activePage === "ProjectDetails") {
      return (
        <ProjectDetailPage
          project={selectedProject}
          setActivePage={navigateToPage}
        />
      );
    }
    switch (activePage) {
      case "Home":
        return <HomePage setActivePage={navigateToPage} />;
      case "About":
        return <AboutPage />;
      case "Projects":
        return <ProjectsPage setActivePage={navigateToPage} />;
      case "Events":
        return <EventsPage />;
      case "Contact":
        return <ContactPage />;
      default:
        return <HomePage setActivePage={navigateToPage} />;
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
      />
      <main className="flex-grow">{renderPage()}</main>
      <Footer />
    </div>
  );
}

export default App;

// Style injection for browser environment
// [Your existing style injection code remains here, unchanged]
if (typeof window !== "undefined") {
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
      @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
      .animate-slideDown { animation: slideDown 0.3s ease-out forwards; }
      .group:hover .dot-pattern-animated div div { transform: scale(1.5); opacity: 0.5; }
      @keyframes pulse-slow { 0%, 100% { opacity: 0.05; } 50% { opacity: 0.15; } }
      .animate-pulse-slow { animation: pulse-slow 5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
    `;
  document.head.appendChild(styleSheet);

  const fontLinkLora = document.createElement("link");
  fontLinkLora.rel = "stylesheet";
  fontLinkLora.href = "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap";
  document.head.appendChild(fontLinkLora);
}
