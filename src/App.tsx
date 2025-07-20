import React, { useState, useEffect, useRef } from "react";

// --- Asset URLs ---
const logoUrl = "/WW Forward.png";

// --- SVG Icons ---
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

// [This is the start of the section with all your components and data]
// [It remains entirely unchanged from the version you provided]

const DotPattern = ({ className = "", dotColor = "text-sky-200 opacity-5", rows = 6, cols = 8 }) => { /* ... */ };
const Card = ({ children, className = "", noHoverEffect = false, hasDotPattern = false, onClick }) => { /* ... */ };
const Button = ({ children, onClick, type = "primary", className = "", icon, isSubmit = false, disabled = false, size = "md" }) => { /* ... */ };
const Navbar = ({ setActivePage, activePage, selectedProject }) => { /* ... */ };
const Footer = () => { /* ... */ };
const forumData = { /* ... */ };
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
    redirectTo: "Events",
  },
  {
    id: 2,
    slug: "princeton-junction-station-improvement",
    title: "Princeton Junction Station Improvement Project",
    shortGoal: "Revitalizing our key transit hub.",
    goal: "To transform the Princeton Junction Station into a welcoming, aesthetically appealing, and culturally reflective community hub that serves all users.",
    status: "Early Planning & Proposal Development",
    description: "This is a proposed comprehensive project to transform Princeton Junction Station—a vital asset serving over 4,000 NJ TRANSIT passengers daily and 123,000+ Amtrak passengers annually—into a vibrant community hub. We are developing plans for beautification efforts, community art installations, environmental initiatives, and programming to enhance the daily experience for thousands of commuters while fostering community pride and connectivity. Currently in early planning stages with proposals being developed for potential partnerships.",
    impact: "Enhanced commuter experience for thousands of daily users, strengthened community identity through public art, environmental benefits through recycling and beautification programs, increased community engagement through events and programming, and preserved infrastructure value through maintenance and improvements.",
    timeline: [ { stage: "Completed: Concept Development & Research", details: "Initial research completed on station usage, community needs, and potential improvement opportunities. Concept proposal drafted.", completed: true, }, { stage: "In Progress: Stakeholder Outreach & Partnership Development", details: "Reaching out to NJ TRANSIT, West Windsor Parking Authority, and community organizations to gauge interest and explore potential partnerships.", completed: false, }, { stage: "Upcoming: Community Input & Proposal Refinement", details: "Gathering community feedback on proposed improvements and refining plans based on resident input and partnership possibilities.", completed: false, }, { stage: "Upcoming: Implementation Planning", details: "If partnerships are established, develop detailed implementation timeline and begin coordination with relevant authorities.", completed: false, }, ],
    getInvolved: "Share your ideas for station improvements, express interest in volunteering for future cleanup or beautification efforts, connect us with relevant community organizations, or let us know what would make your commuting experience better.",
    image: "https://placehold.co/600x400/3B82F6/FFFFFF?text=Princeton+Junction+Station&font=Lora",
    partnerOrganizations: [],
    fundingSources: [],
    quickActions: [],
    initiatives: [ { title: "Beautification & Maintenance", description: "Potential regular cleanup, landscaping, and seasonal decorations", icon: <IconLightBulb />, status: "Concept Phase", }, { title: "Art & Cultural Enhancement", description: "Proposed community murals, decorative elements, and cultural programming", icon: <IconPhotograph />, status: "Concept Phase", }, { title: "Environmental Initiatives", description: "Exploring recycling programs and sustainable improvements", icon: <IconRecycle />, status: "Research Phase", }, { title: "Community Programming", description: "Ideas for events and community engagement opportunities", icon: <IconUsers />, status: "Planning Phase", }, ],
  },
];
const ForumHeader = () => { /* ... */ };
const ProgressSection = () => { /* ... */ };
const ForumFormatSection = () => { /* ... */ };
const PanelistSection = () => { /* ... */ };
const InteractiveSection = () => { /* ... */ };
const KeyInformationSection = () => { /* ... */ };
const HomePage = ({ setActivePage }) => { /* ... */ };
const AboutPage = () => { /* ... */ };
const ProjectCard = ({ project, setActivePage }) => { /* ... */ };
const ProjectsPage = ({ setActivePage }) => { /* ... */ };
const ProjectDetailPage = ({ project, setActivePage }) => { /* ... */ };
const EventsPage = ({ setActivePage }) => { /* ... */ };
const ContactPage = () => { /* ... */ };

// [This is the end of the unchanged section]


// Main App Component
function App() {
  const [activePage, setActivePage] = useState("Home");
  const [selectedProject, setSelectedProject] = useState(null);

  const navigateToPage = (page, project = null) => {
    setActivePage(page);
    setSelectedProject(project);

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

    if (typeof window !== 'undefined' && window.location.pathname !== url) {
      window.history.pushState({ page, project }, title, url);
    }
    
    if (typeof window !== 'undefined') {
        document.title = title;
        window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    // --- THIS IS THE ONLY CHANGE IN THE ENTIRE FILE ---
    const handlePopState = (event) => {
      if (event.state) {
        // This makes sure the title and state are correct when using back/forward.
        navigateToPage(event.state.page, event.state.project);
      }
    };
    // --- END OF CHANGE ---

    window.addEventListener('popstate', handlePopState);

    // Handle initial page load based on URL
    const path = window.location.pathname;
    const parts = path.split('/').filter(Boolean);

    if (parts[0] === 'about') {
        navigateToPage('About');
    } else if (parts[0] === 'projects') {
        if (parts[1]) {
            const project = projectsData.find(p => p.slug === parts[1]);
            if (project) {
                navigateToPage('ProjectDetails', project);
            } else {
                navigateToPage('Projects');
            }
        } else {
            navigateToPage('Projects');
        }
    } else if (parts[0] === 'events') {
        navigateToPage('Events');
    } else if (parts[0] === 'contact') {
        navigateToPage('Contact');
    } else if (parts.length === 0) {
        navigateToPage('Home');
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const renderPage = () => {
    if (activePage === "ProjectDetails" && selectedProject) {
      return (
        <ProjectDetailPage
          project={selectedProject}
          setActivePage={navigateToPage}
        />
      );
    }
    switch (activePage) {
      case "Home": return <HomePage setActivePage={navigateToPage} />;
      case "About": return <AboutPage />;
      case "Projects": return <ProjectsPage setActivePage={navigateToPage} />;
      case "Events": return <EventsPage setActivePage={navigateToPage} />;
      case "Contact": return <ContactPage />;
      default: return <HomePage setActivePage={navigateToPage} />;
    }
  };

  return (
    <div id="app" className="flex flex-col min-h-screen bg-slate-100 font-body text-slate-700">
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
