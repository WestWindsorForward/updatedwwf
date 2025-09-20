import React, { useState, useEffect, useRef, FC, ReactNode, useCallback, useMemo, memo } from "react";

// --- Asset URLs ---
const logoUrl = "/WW Forward.png";

// --- SVG Icons (as functional components) ---
const IconMail: FC = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /> <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /> </svg> );
const IconCalendar: FC = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /> </svg> );
const IconClock: FC = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /> </svg> );
const IconMapMarker: FC = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /> </svg> );
const IconUsers: FC = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"> <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" /> </svg> );
const IconCheckCircle: FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} viewBox="0 0 20 20" fill="currentColor"> <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /> </svg> );
const IconChevronDown: FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} viewBox="0 0 20 20" fill="currentColor"> <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /> </svg> );
const IconChevronUp: FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} viewBox="0 0 20 20" fill="currentColor"> <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" /> </svg> );
const IconExternalLink: FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${className}`} viewBox="0 0 20 20" fill="currentColor"> <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" /> <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" /> </svg> );
const IconLightBulb: FC = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.477.859h4z" /> </svg> );
const IconMicrophone: FC = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" /> </svg> );
const IconDocument: FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} viewBox="0 0 20 20" fill="currentColor"> <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /> </svg> );
const IconRecycle: FC = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" /> </svg> );
const IconPhotograph: FC = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /> </svg> );
const IconInfo: FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 sm:h-5 sm:w-5 mr-2 ${className}`} viewBox="0 0 20 20" fill="currentColor"> <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /> </svg> );
const IconFacebook: FC = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"> <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /> </svg> );
const IconInstagram: FC = () => ( <svg className="h-5 w-5" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20.445 5h-8.891A6.559 6.559 0 0 0 5 11.554v8.891A6.559 6.559 0 0 0 11.554 27h8.891a6.56 6.56 0 0 0 6.554-6.555v-8.891A6.557 6.557 0 0 0 20.445 5zm4.342 15.445a4.343 4.343 0 0 1-4.342 4.342h-8.891a4.341 4.341 0 0 1-4.341-4.342v-8.891a4.34 4.34 0 0 1 4.341-4.341h8.891a4.342 4.342 0 0 1 4.341 4.341l.001 8.891z"/><path d="M16 10.312c-3.138 0-5.688 2.551-5.688 5.688s2.551 5.688 5.688 5.688 5.688-2.551 5.688-5.688-2.55-5.688-5.688-5.688zm0 9.163a3.475 3.475 0 1 1-.001-6.95 3.475 3.475 0 0 1 .001 6.95zM21.7 8.991a1.363 1.363 0 1 1-1.364 1.364c0-.752.51-1.364 1.364-1.364z"/></svg> );
const IconX: FC = () => ( <svg className="h-5 w-5" viewBox="0 0 300 271" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z"/></svg> );
const IconMenu: FC = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /> </svg> );
const IconClose: FC = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> </svg> );

// --- Type Definitions ---
interface ModalProps { isOpen: boolean; onClose: () => void; children: ReactNode; }
interface DotPatternProps { className?: string; dotColor?: string; rows?: number; cols?: number; }
interface CardProps { children: ReactNode; className?: string; noHoverEffect?: boolean; hasDotPattern?: boolean; onClick?: (e: React.MouseEvent<HTMLDivElement>) => void; }
interface ButtonProps { children?: ReactNode; onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void; type?: 'primary' | 'secondary' | 'success' | 'warning'; className?: string; icon?: ReactNode; isSubmit?: boolean; disabled?: boolean; size?: 'sm' | 'md' | 'lg'; href?: string; }
type PageName = "Home" | "About" | "Projects" | "Events" | "Contact" | "ProjectDetails";
interface Project { id: number; slug: string; title: string; shortGoal: string; status: string; description: string; image: string; partnerOrganizations?: string[]; supportingOrganizations?: string[]; redirectTo?: PageName; goal?: string; impact?: string; timeline?: { stage: string; details: string; completed: boolean; }[]; getInvolved?: string; fundingSources?: string[]; initiatives?: { title: string; description: string; icon: ReactNode; status: string; }[]; }
interface NavbarProps { setActivePage: (page: PageName, project?: Project | null) => void; activePage: PageName; selectedProject: Project | null; }
interface PageProps { setActivePage: (page: PageName, project?: Project | null) => void; }
interface ProjectCardProps { project: Project; setActivePage: (page: PageName, project?: Project | null) => void; }
interface ProjectDetailPageProps { project: Project | null; setActivePage: (page: PageName, project?: Project | null) => void; }
interface FooterProps { setActivePage: (page: PageName) => void; }

// --- Helper Components ---
const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 animate-fadeIn"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slideDown"
                onClick={e => e.stopPropagation()}
            >
                <button 
                    onClick={onClose}
                    className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Close modal"
                >
                    <IconClose />
                </button>
                <div className="p-6 sm:p-8">
                    {children}
                </div>
            </div>
        </div>
    );
};

const DotPattern: FC<DotPatternProps> = memo(({ className = "", dotColor = "text-sky-200 opacity-5", rows = 6, cols = 8 }) => {
    const dots = useMemo(() => {
        const totalDots = Math.min(rows * cols * 4, 100);
        return Array.from({ length: totalDots }).map((_, i) => ({
            id: i,
            left: `${(i % (cols * 2) * 12.5) + Math.random() * 5}%`,
            top: `${(Math.floor(i / (cols * 2)) * 25) + Math.random() * 15 + 10}%`,
            delay: `${(i % 10) * 0.2}s`
        }));
    }, [rows, cols]);

    return (
        <div className={`absolute inset-0 overflow-hidden -z-10 ${className}`} aria-hidden="true">
            <div className="absolute inset-0 will-change-transform">
                {dots.map((dot) => (
                    <div
                        key={dot.id}
                        className={`absolute w-1 h-1 sm:w-1.5 sm:h-1.5 ${dotColor} rounded-full animate-pulse-slow`}
                        style={{
                            left: dot.left,
                            top: dot.top,
                            animationDelay: dot.delay,
                            transform: 'translateZ(0)'
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
});

const Card: FC<CardProps> = memo(({ children, className = "", noHoverEffect = false, hasDotPattern = false, onClick }) => (
    <div
        className={`relative bg-white shadow-lg rounded-xl mb-6 sm:mb-8 border border-gray-200 ${hasDotPattern ? "overflow-hidden" : ""} ${noHoverEffect ? "" : "transition-all duration-300 hover:shadow-2xl hover:border-sky-400 hover:scale-[1.01] will-change-transform"} ${onClick ? "cursor-pointer" : ""} ${className}`}
        onClick={onClick}
        style={{ transform: 'translateZ(0)' }}
    >
        {hasDotPattern && <DotPattern dotColor="text-sky-500 opacity-5" />}
        <div className="relative z-10 h-full flex flex-col">{children}</div>
    </div>
));

const Button: FC<ButtonProps> = memo(({ children, onClick, type = "primary", className = "", icon, isSubmit = false, disabled = false, size = "md", href }) => {
    const baseStyle = `inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 ease-in-out transform hover:scale-103 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-75 shadow-md hover:shadow-lg will-change-transform ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;
    const sizeStyles = { sm: "px-3 py-1.5 text-xs", md: "px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm", lg: "px-6 py-3 text-sm sm:text-base" };
    const typeStyle = type === "primary" ? "bg-sky-600 hover:bg-sky-700 text-white focus:ring-sky-500" : type === "secondary" ? "bg-slate-200 hover:bg-slate-300 text-slate-800 focus:ring-slate-400" : type === "success" ? "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500" : type === "warning" ? "bg-amber-600 hover:bg-amber-700 text-white focus:ring-amber-500" : "bg-slate-200 hover:bg-slate-300 text-slate-800 focus:ring-slate-400";
    
    const content = (
        <>
            {icon && !children && <span>{icon}</span>}
            {icon && children && <span className="mr-2">{icon}</span>}
            {children}
        </>
    );

    if (href) {
        return (
            <a
                href={href}
                className={`${baseStyle} ${typeStyle} ${sizeStyles[size]} ${className}`}
                style={{ transform: 'translateZ(0)' }}
                target="_blank"
                rel="noopener noreferrer"
            >
                {content}
            </a>
        );
    }
    
    const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick && !disabled) {
            onClick(e);
        }
    }, [onClick, disabled]);

    return (
        <button
            onClick={handleClick}
            className={`${baseStyle} ${typeStyle} ${sizeStyles[size]} ${className}`}
            disabled={disabled}
            style={{ transform: 'translateZ(0)' }}
        >
            {content}
        </button>
    );
});

// --- Data ---
const forumData = {
    title: "West Windsor Forward 2025 Candidate Forum", date: "Thursday, September 25th, 2025", time: "7:00 PM - 9:15 PM", arrivalTime: "6:30 PM for candidates", location: "Kelsey Theatre @ Mercer County Community College", positions: ["Mayor of West Windsor Township", "2 seats on West Windsor Township Council"], status: "Cancelled",
    panelists: [
        { id: "micah-rasmussen", name: "Micah Rasmussen", title: "Director, Rebovich Institute for NJ Politics", imageUrl: "/micah.png", bio: 'Micah Rasmussen is the director of the Rebovich Institute for New Jersey Politics at Rider University. He has worked in the New Jersey General Assembly and managed several political campaigns. After completing his undergraduate studies at Rider under his mentor David Rebovich, the namesake of the institute he now leads, Rasmussen earned his Master of Arts in Political Science from the Eagleton Institute of Politics at Rutgers University. Rasmussen is a panelist for the state\'s biggest political debates-- twice so far this year in the race to elect New Jersey\'s next governor, and in the only debate last year between now Senator Andy Kim and First Lady Tammy Murphy. He is regularly included on New Jersey\'s political power and higher education influencer lists. One called him "the go-to guy for the media to comment on what\'s happening in New Jersey politics-- and what it means".', note: "" },
        { id: "david-matthau", name: "David Matthau", title: "WHYY NJ Reporter", imageUrl: "/matthau.png", bio: "David Matthau is a WHYY New Jersey reporter covering the Statehouse and general assignments in the Garden State. Prior to joining WHYY, David was lead investigative reporter for NJ 101.5 News, winning multiple Associated Press and Society of Professional Journalists awards, the National Association of Broadcasters Service to Community Award, and contributed to the National Edward R. Murrow Best Newscast award. David is a graduate of the University of Southern California." },
    ],
    forumParts: [
        { id: 1, title: "Panelist Q&A Sessions", description: "Equal time Q&A sessions for Mayoral and Council candidates with questions from our distinguished panelists", location: "Main Theatre", iconType: "microphone" },
        { id: 2, title: "Town Hall Q&A", description: "Community-driven Q&A where residents can submit questions for candidates to address", location: "Main Theatre", iconType: "users" },
    ],
    requirements: { council: "At least 3 council candidates participating OR candidates from at least 2 different tickets with minimum 3 total candidates running", mayor: "At least 2 mayoral candidates participating" },
    pressCoverage: [
        { id: 1, title: "Civic group plans forum for 2025 election", source: "West Windsor Plainsboro News", url: "https://issuu.com/communitynewsservice/docs/6-25_wwp/4" },
        { id: 4, title: "West Windsor civic group to host Sept. 25 candidate forum (Revised)", source: "West Windsor Plainsboro News", url: "https://www.communitynews.org/towns/west-windsor-plainsboro-news/west-windsor-civic-group-to-host-sept-25-candidate-forum-revised/article_89bdf018-35c6-417c-a3ba-dd46adad7094.html"},
        { id: 2, title: "2025 West Windsor Candidate Forum Announced", source: "West Windsor Peeps", url: "https://westwindsorpeeps.com/west-windsor-candidate-forum/" },
        { id: 3, title: "West Windsor to Host First Candidate Forum in Over a Decade at the Kelsey Theatre", source: "CentralJersey.com", url: "https://centraljersey.com/2025/05/05/west-windsor-candidate-forum-kelsey-theatre/" },
    ],
};

const projectsData: Project[] = [
    { id: 1, slug: "candidate-forum-2025", title: "2025 Candidate Forum Initiative", shortGoal: "Fostering informed civic participation.", status: "Cancelled", description: "An initiative to restore a vital civic tradition by providing a non-partisan platform for candidates. Though cancelled, this project highlights our commitment to informed local democracy.", image: "/2025 Forum Graphic.png", supportingOrganizations: ["League of Women Voters of the Greater Princeton Area"], redirectTo: "Events" },
    { id: 2, slug: "princeton-junction-station-improvement", title: "Princeton Junction Station Improvement Project", shortGoal: "Revitalizing our key transit hub.", goal: "To transform the Princeton Junction Station into a welcoming, aesthetically appealing, and culturally reflective community hub that serves all users.", status: "Early Planning & Proposal Development", description: "This is a proposed comprehensive project to transform Princeton Junction Station—a vital asset serving over 4,000 NJ TRANSIT passengers daily and 123,000+ Amtrak passengers annually—into a vibrant community hub. We are developing plans for beautification efforts, community art installations, environmental initiatives, and programming to enhance the daily experience for thousands of commuters while fostering community pride and connectivity. Currently in early planning stages with proposals being developed for potential partnerships.", impact: "Enhanced commuter experience for thousands of daily users, strengthened community identity through public art, environmental benefits through recycling and beautification programs, increased community engagement through events and programming, and preserved infrastructure value through maintenance and improvements.", timeline: [{ stage: "Completed: Concept Development & Research", details: "Initial research completed on station usage, community needs, and potential improvement opportunities. Concept proposal drafted.", completed: true }, { stage: "In Progress: Stakeholder Outreach & Partnership Development", details: "Reaching out to NJ TRANSIT, West Windsor Parking Authority, and community organizations to gauge interest and explore potential partnerships.", completed: false }, { stage: "Upcoming: Community Input & Proposal Refinement", details: "Gathering community feedback on proposed improvements and refining plans based on resident input and partnership possibilities.", completed: false }, { stage: "Upcoming: Implementation Planning", details: "If partnerships are established, develop detailed implementation timeline and begin coordination with relevant authorities.", completed: false }], getInvolved: "Share your ideas for station improvements, express interest in volunteering for future cleanup or beautification efforts, connect us with relevant community organizations, or let us know what would make your commuting experience better.", image: "https://www.westwindsorhistory.com/uploads/1/2/3/1/123111196/2018-12-08-pj-train-station-ticket-building_orig.jpg", partnerOrganizations: [], fundingSources: [], initiatives: [{ title: "Beautification & Maintenance", description: "Potential regular cleanup, landscaping, and seasonal decorations", icon: <IconLightBulb />, status: "Concept Phase" }, { title: "Art & Cultural Enhancement", description: "Proposed community murals, decorative elements, and cultural programming", icon: <IconPhotograph />, status: "Concept Phase" }, { title: "Environmental Initiatives", description: "Exploring recycling programs and sustainable improvements", icon: <IconRecycle />, status: "Concept Phase" }, { title: "Community Programming", description: "Ideas for events and community engagement opportunities", icon: <IconUsers />, status: "Concept Phase" }] },
];

// --- Main Page Components ---
const Navbar: FC<NavbarProps> = ({ setActivePage, activePage, selectedProject }) => {
    const navItems: PageName[] = ["Home", "About", "Projects", "Events", "Contact"];
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    const handleNav = (item: PageName) => setActivePage(item);
    const handleMobileNav = (item: PageName) => { handleNav(item); setIsMobileMenuOpen(false); };
    const handleLogoClick = () => { handleNav("Home"); setIsMobileMenuOpen(false); };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isMobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && !(event.target as HTMLElement).closest('button[aria-label="Open navigation menu"]')) {
                setIsMobileMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isMobileMenuOpen]);

    return (
        <nav className="bg-slate-900 text-white p-3 sm:p-4 shadow-lg sticky top-0 z-50 print:hidden">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
                    <img
                        src={logoUrl}
                        alt="West Windsor Forward Logo"
                        className="h-10 sm:h-12 mr-2 sm:mr-3 rounded bg-white p-1.5"
                        loading="eager"
                        decoding="async"
                        onError={(e) => {
                            (e.target as HTMLImageElement).onerror = null;
                            (e.target as HTMLImageElement).src = `https://placehold.co/48x48/FFFFFF/0C4A6E?text=WWF`;
                        }}
                    />
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

const Footer: FC<FooterProps> = memo(({ setActivePage }) => {
    return (
        <footer className="bg-slate-900 text-gray-300 print:hidden">
            <div className="container mx-auto px-6 pt-12 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Column 1: About */}
                    <div className="md:col-span-1 space-y-4">
                        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActivePage("Home")}>
                            <img
                                src={logoUrl}
                                alt="West Windsor Forward Logo"
                                className="h-10 rounded bg-white p-1.5"
                                loading="lazy"
                                decoding="async"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).onerror = null;
                                    (e.target as HTMLImageElement).src = `https://placehold.co/40x40/FFFFFF/0C4A6E?text=WWF`;
                                }}
                            />
                            <span className="text-xl font-bold text-white">West Windsor Forward</span>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            A dedicated coalition igniting positive change and working collaboratively to build a better future for West Windsor.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <a href="https://www.facebook.com/profile.php?id=61575121893868" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors" aria-label="Facebook">
                                <IconFacebook />
                            </a>
                            <a href="https://instagram.com/westwindsorforward" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors" aria-label="Instagram">
                                <IconInstagram />
                            </a>
                            <a href="https://x.com/westwindsorfwd" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors" aria-label="X">
                                <IconX />
                            </a>
                            <a href="mailto:contact@westwindsorforward.org" className="text-slate-400 hover:text-sky-400 transition-colors" aria-label="Email">
                                <IconMail />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="md:col-span-1">
                        <h3 className="text-md font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h3>
                        <ul className="grid grid-cols-2 gap-y-3">
                            <li><button onClick={() => setActivePage('Home')} className="text-slate-400 hover:text-sky-400 transition-colors text-sm text-left w-full">Home</button></li>
                            <li><button onClick={() => setActivePage('About')} className="text-slate-400 hover:text-sky-400 transition-colors text-sm text-left w-full">About Us</button></li>
                            <li><button onClick={() => setActivePage('Projects')} className="text-slate-400 hover:text-sky-400 transition-colors text-sm text-left w-full">Our Initiatives</button></li>
                            <li><button onClick={() => setActivePage('Events')} className="text-slate-400 hover:text-sky-400 transition-colors text-sm text-left w-full">Events</button></li>
                            <li><button onClick={() => setActivePage('Contact')} className="text-slate-400 hover:text-sky-400 transition-colors text-sm text-left w-full">Contact</button></li>
                        </ul>
                    </div>

                    {/* Column 3: Get In Touch */}
                    <div className="md:col-span-1">
                            <h3 className="text-md font-semibold text-white uppercase tracking-wider mb-4">Get In Touch</h3>
                            <p className="text-sm text-slate-400 mb-4">Have questions, ideas, or want to volunteer? We'd love to hear from you.</p>
                            <Button
                                onClick={() => setActivePage('Contact')}
                                type="primary"
                                className="w-full sm:w-auto"
                                icon={<IconMail />}
                            >
                                Contact Us
                            </Button>
                    </div>
                </div>

                <div className="mt-10 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} West Windsor Forward. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
});

const ForumHeader: FC = () => {
    return (
        <header className="relative bg-gradient-to-br from-slate-900 via-sky-800 to-indigo-900 text-white py-12 sm:py-16 md:py-20 px-4 rounded-b-2xl shadow-2xl overflow-hidden">
            <DotPattern dotColor="text-sky-700 opacity-10" rows={8} cols={10} />
            <div className="relative z-10 container mx-auto text-center">
                 <div className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold mb-4"> EVENT CANCELLED </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"> 2025 Candidate Forum </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-sky-200 mb-6 max-w-3xl mx-auto"> Empowering West Windsor voters with direct access to candidates for Mayor and Township Council </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
                    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4"> <div className="font-semibold line-through">{forumData.date}</div> <div className="text-sm text-sky-200">Originally Scheduled Date</div> </div>
                    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4"> <div className="font-semibold">Kelsey Theatre</div> <div className="text-sm text-sky-200">@ MCCC West Windsor</div> </div>
                    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4"> <div className="font-semibold">{forumData.status}</div> <div className="text-sm text-sky-200">Event Status</div> </div>
                </div>
            </div>
        </header>
    );
};

const DocumentComparisonSection: FC = () => (
    <div className="container mx-auto px-4 pt-8">
        <Card noHoverEffect>
             <div className="p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 text-center">Forum Format Agreements</h2>
                <p className="text-center text-slate-600 mb-6 max-w-3xl mx-auto">The forum was cancelled because the two campaigns were unable to agree on a single, final format. All other aspects of the forum, including the date, time, venue, and panelists, were accepted by both campaigns. To provide full transparency on this specific point of disagreement, we are sharing the final format terms each campaign provided.</p>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 text-center">
                        <h3 className="font-bold text-slate-700 mb-2">TeamMarathe4WW Agreed Format (Original)</h3>
                        <p className="text-sm text-slate-500 mb-4">The final rules and format agreement from the Marathe campaign.</p>
                        <Button type="secondary" icon={<IconDocument/>} href="/TeamMarathe4WW Agreed Format (Original) .pdf">
                            View Terms (PDF)
                        </Button>
                    </div>
                     <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 text-center">
                        <h3 className="font-bold text-slate-700 mb-2">WW Together Agreed Format (Counterproposal)</h3>
                        <p className="text-sm text-slate-500 mb-4">The final rules and format agreement from the WW Together campaign.</p>
                        <Button type="secondary" icon={<IconDocument/>} href="/West Windsor Together Agreed Format (Counterproposal) .pdf">
                            View Terms (PDF)
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    </div>
);

const StatementsSection: FC = () => (
    <div className="container mx-auto px-4">
        <Card noHoverEffect className="p-0 overflow-hidden">
             <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-800 via-sky-900 to-indigo-900">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center">Official Statements</h2>
                <div className="max-w-xl mx-auto space-y-6">
                    <div className="bg-slate-700/50 p-6 rounded-lg border border-sky-700 text-center">
                        <h3 className="font-bold text-white mb-2">Our Official Statement</h3>
                        <p className="text-sm text-slate-300 mb-4">The official statement from West Windsor Forward regarding the forum's cancellation.</p>
                        <Button type="secondary" icon={<IconDocument/>} href="/West Windsor Forward - 2025 Candidate Forum Cancellation.pdf">
                            View Statement (PDF)
                        </Button>
                    </div>
                     <div className="bg-slate-700/50 p-6 rounded-lg border border-sky-700 text-center">
                        <h3 className="font-bold text-white mb-2">League of Women Voters Statement</h3>
                        <p className="text-sm text-slate-300 mb-4">A statement from the League of Women Voters of the Greater Princeton Area, in support of the forum.</p>
                        <Button type="secondary" icon={<IconDocument/>} href="/Cancellation of West Windsor Candidates.pdf">
                            View Statement (PDF)
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    </div>
);

const ForumFormatSection: FC = () => {
    const getIcon = (iconType: string) => {
        if (iconType === "microphone") return <IconMicrophone />;
        if (iconType === "users") return <IconUsers />;
        if (iconType === "lightbulb") return <IconLightBulb />;
        return <IconLightBulb />;
    };
    return (
        <Card hasDotPattern className="p-0">
            <div className="p-4 sm:p-6 md:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 text-center"> Forum Format & Structure </h2>
                <div className="flex flex-wrap justify-center gap-6">
                    {forumData.forumParts.map((part) => (
                        <div key={part.id} className="relative bg-gradient-to-br from-slate-50 to-sky-50 p-6 rounded-xl border border-sky-200 hover:shadow-lg transition-all duration-300 w-full max-w-md">
                            <div className="flex items-center mb-4">
                                <div className="bg-sky-600 text-white p-2 rounded-lg mr-3 flex justify-center items-center"> {getIcon(part.iconType)} </div>
                                <div>
                                    <div className="text-xs font-semibold text-sky-600 uppercase tracking-wider"> Part {part.id} </div>
                                    <h3 className="font-semibold text-slate-800">{part.title}</h3>
                                </div>
                            </div>
                            <p className="text-sm text-slate-600 mb-3">{part.description}</p>
                            <div className="flex items-center text-xs text-slate-500"> <IconMapMarker className="h-3 w-3 mr-1" /> {part.location} </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <h3 className="font-semibold text-amber-800 mb-2 flex items-center"> <IconDocument className="h-5 w-5 mr-2" /> Forum Requirements </h3>
                    <div className="space-y-2 text-sm text-amber-700">
                        <p> <strong>Council:</strong> {forumData.requirements.council} </p>
                        <p> <strong>Mayor:</strong> {forumData.requirements.mayor} </p>
                    </div>
                </div>
            </div>
        </Card>
    );
};

const PressCoverageSection: FC = () => (
    <Card className="p-0">
        <div className="p-4 sm:p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 text-center"> In the News </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {forumData.pressCoverage.map((article) => (
                    <a key={article.id} href={article.url} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center transition-all duration-300 hover:shadow-lg hover:border-sky-300 flex flex-col h-full">
                            <h3 className="text-lg font-semibold text-sky-700 mb-2 flex-grow">{article.title}</h3>
                            <p className="text-sm text-slate-500 italic mb-4">Source: {article.source}</p>
                            <Button type="secondary" size="sm" className="mt-auto mx-auto" icon={<IconExternalLink />}>
                                Read Article
                            </Button>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    </Card>
);

const PanelistSection: FC = () => {
    const [selectedPanelistId, setSelectedPanelistId] = useState<string | null>(null);
    return (
        <Card className="p-0">
            <div className="p-4 sm:p-6 md:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 text-center"> Distinguished Panelists </h2>
                <div className="flex flex-wrap justify-center items-start gap-6">
                    {forumData.panelists.map((panelist) => (
                        <div key={panelist.id} className="flex flex-col w-full max-w-sm">
                            <div className={`text-center p-6 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col h-full ${selectedPanelistId === panelist.id ? "border-sky-500 bg-sky-50 shadow-lg" : "border-gray-200 hover:border-sky-300 hover:shadow-md"}`} onClick={() => setSelectedPanelistId(selectedPanelistId === panelist.id ? null : panelist.id)}>
                                <img src={panelist.imageUrl || `https://placehold.co/150x150/E0F2FE/0C4A6E?text=${panelist.name.substring(0, 1)}${panelist.name.split(" ")[1]?.substring(0, 1) || ""}&font=Lora`} alt={panelist.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-sky-200 object-cover shadow-sm" onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src = `https://placehold.co/150x150/CCCCCC/FFFFFF?text=Panelist&font=Lora`; }} />
                                <div className="flex-grow flex flex-col">
                                    <h3 className="font-semibold text-sky-700 mb-1 min-h-[1.5rem]">{panelist.name}</h3>
                                    <p className="text-sm text-slate-600 mb-1 flex-grow">{panelist.title}</p>
                                    {panelist.note && <p className="text-xs text-amber-600 italic mb-1 flex items-center justify-center">{panelist.note}</p>}
                                    {!panelist.note && <div className="mb-1"></div>}
                                </div>
                                <button className="text-xs text-sky-600 hover:text-sky-700 font-medium flex items-center justify-center mx-auto mt-auto">
                                    {selectedPanelistId === panelist.id ? "Hide Bio" : "View Bio"}
                                    {selectedPanelistId === panelist.id ? <IconChevronUp className="ml-1 h-4 w-4" /> : <IconChevronDown className="ml-1 h-4 w-4" />}
                                </button>
                            </div>
                            {selectedPanelistId === panelist.id && (
                                <div className="bg-white p-4 -mt-2 rounded-b-xl shadow-lg border border-t-0 border-gray-200">
                                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{panelist.bio}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
};

const KeyInformationSection: FC = () => {
    const [expandedSection, setExpandedSection] = useState<string | null>(null);
    const infoSections = [
        { id: "attendance", title: "For Attendees", icon: <IconUsers />, content: <div className="space-y-4"> <div> <h4 className="font-semibold text-slate-800 mb-2">Why Attend?</h4> <ul className="space-y-2 text-sm text-slate-600"> <li>• Hear directly from candidates beyond campaign materials</li> <li> • Get answers to community questions during town hall session </li> <li>• Engage with fellow residents on important local issues</li> </ul> </div> <div> <h4 className="font-semibold text-slate-800 mb-2"> What to Expect </h4> <p className="text-sm text-slate-600"> In-person admission to the forum is free. The event will be live-streamed on YouTube for those unable to attend in person. Audience members are expected to maintain respectful behavior during moderated portions. </p> </div> </div> },
        { id: "candidates", title: "For Candidates", icon: <IconMicrophone />, content: <div className="space-y-4"> <div> <h4 className="font-semibold text-slate-800 mb-2"> Participation Benefits </h4> <ul className="space-y-2 text-sm text-slate-600"> <li>• Present your platform to an engaged community audience</li> <li>• Reach a broader audience through live streaming</li> <li>• Participate in a fair, moderated discussion format</li> </ul> </div> <div> <h4 className="font-semibold text-slate-800 mb-2">Requirements</h4> <p className="text-sm text-slate-600"> Candidates must arrive by 6:30 PM for briefing, agree to ground rules including professional conduct and time limits, and sign a participation agreement. </p> </div> </div> },
        { id: "rules", title: "Ground Rules & Guidelines", icon: <IconDocument />, content: <div className="space-y-4"> <div> <h4 className="font-semibold text-slate-800 mb-2"> Candidate Conduct </h4> <ul className="space-y-2 text-sm text-slate-600"> <li>• Strict time limits enforced by moderator</li> <li>• Equal speaking opportunities for all candidates</li> <li>• One rebuttal opportunity per question</li> <li>• Professional attire required (no political slogans)</li> <li>• No personal attacks or derogatory comments</li> <li>• Electronic devices silenced during forum</li> </ul> </div> <div> <h4 className="font-semibold text-slate-800 mb-2"> Audience Guidelines </h4> <ul className="space-y-2 text-sm text-slate-600"> <li>• Silent observation during moderated portions</li> <li>• Questions submitted in writing only</li> <li>• No political displays or materials in theatre</li> <li>• Recording prohibited (except official stream)</li> </ul> </div> </div> },
    ];
    return (
        <Card className="p-0">
            <div className="p-4 sm:p-6 md:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 text-center"> Important Information </h2>
                <div className="space-y-4">
                    {infoSections.map((section) => (
                        <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
                            <button onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)} className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors">
                                <div className="flex items-center"> <div className="text-sky-600 mr-3">{section.icon}</div> <span className="font-semibold text-slate-800">{section.title}</span> </div>
                                {expandedSection === section.id ? <IconChevronUp className="text-gray-400" /> : <IconChevronDown className="text-gray-400" />}
                            </button>
                            {expandedSection === section.id && <div className="px-4 pb-4 border-t border-gray-100">{section.content}</div>}
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
};

// --- Pages ---
const HomePage: FC<PageProps> = memo(({ setActivePage }) => (
    <div className="animate-fadeIn">
        <header className="relative bg-gradient-to-br from-slate-900 via-sky-800 to-indigo-900 text-white py-16 sm:py-20 md:py-28 px-4 text-center rounded-b-2xl shadow-2xl overflow-hidden">
            <DotPattern dotColor="text-sky-700 opacity-10" rows={8} cols={10} />
            <div className="relative z-10 container mx-auto">
                <img
                    src={logoUrl}
                    alt="West Windsor Forward Logo"
                    className="h-16 sm:h-20 md:h-24 mx-auto mb-4 sm:mb-6 rounded-lg shadow-md bg-white p-1.5 sm:p-2"
                    loading="eager"
                    decoding="async"
                    onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src = `https://placehold.co/96x96/FFFFFF/0C4A6E?text=WWF`;
                    }}
                />
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-3 sm:mb-4 tracking-tight"> West Windsor Forward </h1>
                <p className="text-sm sm:text-md md:text-xl text-sky-200 mb-6 sm:mb-8 max-w-3xl mx-auto"> A dedicated coalition of residents igniting positive change and working collaboratively to build a better future for West Windsor. </p>
                <div className="space-y-2 sm:space-y-0 sm:space-x-3 flex flex-col sm:flex-row justify-center">
                    <Button onClick={() => setActivePage("About")} className="w-full sm:w-auto text-xs sm:text-sm px-5 py-2 sm:px-6 sm:py-2.5"> Learn About Us </Button>
                    <Button onClick={() => setActivePage("Projects")} type="secondary" className="w-full sm:w-auto text-xs sm:text-sm px-5 py-2 sm:px-6 sm:py-2.5"> Explore Our Initiatives </Button>
                </div>
            </div>
        </header>
        <section className="py-10 md:py-12 px-4 bg-white">
            <div className="container mx-auto text-center">
                <div className="p-4 sm:p-6 md:p-8">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 mb-4"> Igniting Progress in West Windsor </h2>
                    <p className="text-sm sm:text-md text-gray-700 max-w-3xl mx-auto mb-6 leading-relaxed"> West Windsor Forward is committed to empowering our neighbors, advocating for impactful projects, and injecting fresh energy into our community. We believe in responsive, accountable, and transparent leadership. </p>
                    <Button onClick={() => setActivePage("About")}> Learn About Our Approach </Button>
                </div>
            </div>
        </section>
        <section className="bg-slate-100 py-10 md:py-12 px-4 relative overflow-hidden">
            <DotPattern dotColor="text-sky-500 opacity-5" rows={10} cols={12} />
            <div className="container mx-auto relative z-10">
                <div className="p-4 sm:p-6 md:p-8">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 mb-8 text-center"> Key Initiatives </h2>
                    <div className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                        <Card className="flex flex-col transform hover:scale-105 transition-transform duration-300 p-0">
                            <div className="p-4 sm:p-6 md:p-8">
                                <h3 className="text-lg sm:text-xl font-semibold text-sky-700"> 2025 Candidate Forum Initiative </h3>
                                <p className="text-xs sm:text-sm text-gray-600 mb-3 flex-grow"> An initiative to restore a vital civic tradition by providing a non-partisan platform for candidates. Though cancelled, this project highlights our commitment to informed local democracy. </p>
                                <Button onClick={() => setActivePage("Events")} type="secondary" className="mt-auto w-full sm:w-auto text-xs"> View Archive & Statement </Button>
                            </div>
                        </Card>
                        <Card className="flex flex-col transform hover:scale-105 transition-transform duration-300 p-0">
                            <div className="p-4 sm:p-6 md:p-8">
                                <h3 className="text-lg sm:text-xl font-semibold text-sky-700"> Princeton Junction Station Improvement Project </h3>
                                <p className="text-xs sm:text-sm text-gray-600 mb-3 flex-grow"> Transforming our vital transit hub into a welcoming, beautiful, and vibrant community space through beautification, art, and programming. </p>
                                <Button onClick={() => { const stationProject = projectsData.find(p => p.slug === "princeton-junction-station-improvement"); setActivePage("ProjectDetails", stationProject); }} type="secondary" className="mt-auto w-full sm:w-auto text-xs"> Project Information </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
        <section className="py-10 md:py-12 px-4 bg-white">
            <div className="container mx-auto text-center">
                <div className="p-4 sm:p-6 md:p-8">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 mb-4"> Get Involved & Make an Impact </h2>
                    <p className="text-sm sm:text-md text-gray-700 max-w-2xl mx-auto mb-6 leading-relaxed"> Your participation is crucial. Join us in mobilizing residents, organizations, and resources to create a West Windsor where every resident can thrive. </p>
                    <div className="space-y-3 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center">
                        <Button onClick={() => setActivePage("Contact")} className="w-full sm:w-auto"> Volunteer With Us </Button>
                        <Button onClick={() => setActivePage("Contact")} type="secondary" className="w-full sm:w-auto"> Contact & Support </Button>
                    </div>
                </div>
            </div>
        </section>
    </div>
));

const AboutPage: FC = memo(() => {
    const teamMembers = useMemo(() => [
        { name: "Parth Gupta", role: "Co-Founder", bio: "A West Windsor resident for 14 years and student at the Lawrenceville School. Parth is a runner for the Lawrenceville School as part of their cross-country and track and field teams. Parth has been playing piano for 10 years and has co-organized piano Performathons to raise money for the Children's Hospital of Philadelphia.", image: "/parth.png" },
        { name: "Darshan Chidambaram", role: "Co-Founder", bio: "A West Windsor resident for 8 years and a student at the Lawrenceville School. Darshan is an active tennis player for the Lawrenceville School and debater on the national debate circuit.", image: "/darshan.png" },
    ], []);

    return (
        <div className="container mx-auto py-10 sm:py-12 md:py-16 px-4 animate-fadeIn">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-8 sm:mb-10 md:mb-12 text-center"> About West Windsor Forward </h1>
            <Card className="bg-slate-50 p-0" hasDotPattern>
                <div className="p-4 sm:p-6 md:p-8">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-sky-700 mb-3 sm:mb-4"> About Us </h2>
                    <p className="text-gray-700 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-md md:text-lg"> West Windsor Forward was founded by Parth Gupta and Darshan Chidambaram, dedicated West Windsor residents and students at the Lawrenceville School. Driven by a shared belief that our community can achieve even greater progress, they established this coalition to ignite positive change and work collaboratively towards a better future for all. </p>
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-md md:text-lg"> We are committed to empowering our neighbors, advocating for impactful projects, and injecting fresh energy and innovation into community initiatives. Our approach is rooted in demanding responsiveness, accountability, and transparency from local leaders, and in fostering strong partnerships to maximize our collective impact. </p>
                </div>
            </Card>
            <Card className="p-0">
                <div className="p-4 sm:p-6 md:p-8">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-sky-700 mb-6 sm:mb-8 text-center"> Meet the Founders </h2>
                    <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                        {teamMembers.map((member) => (
                            <div key={member.name} className="bg-slate-50 p-4 sm:p-6 rounded-xl shadow-md text-center transition-all duration-300 hover:shadow-lg hover:scale-105">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full mx-auto mb-4 sm:mb-5 border-4 border-sky-500 shadow-sm"
                                    loading="lazy"
                                    decoding="async"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).onerror = null;
                                        (e.target as HTMLImageElement).src = `https://placehold.co/150x150/E0F2FE/0C4A6E?text=${member.name.substring(0, 1)}${member.name.split(" ")[1] ? member.name.split(" ")[1].substring(0, 1) : ""}&font=Lora`;
                                    }}
                                />
                                <h3 className="text-md sm:text-lg md:text-xl font-semibold text-slate-800">{member.name}</h3>
                                <p className="text-sky-600 font-medium mb-2 sm:mb-3 text-xs sm:text-sm md:text-base">{member.role}</p>
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
            <Card className="bg-slate-50 p-0" hasDotPattern>
                <div className="p-4 sm:p-6 md:p-8">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-sky-700 mb-4 sm:mb-6"> Our Guiding Principles </h2>
                    <p className="text-sm sm:text-md md:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6"> Our work is driven by an unwavering passion to create a West Windsor where every resident has the opportunity to thrive, where voices are valued, and where tangible progress can be observed. This is reflected in our core commitments: </p>
                    <ul className="grid md:grid-cols-1 gap-y-3 sm:gap-y-4 text-gray-700 text-sm sm:text-md md:text-lg leading-relaxed">
                        {[ { title: "Empowering Neighbors", detail: "Providing tools, knowledge, and opportunities for active participation in shaping our community's future." }, { title: "Impactful Advocacy", detail: "Championing projects that improve quality of life, build community, and foster growth, while demanding responsive leadership." }, { title: "Innovation & Energy", detail: "Addressing long-neglected needs and enhancing civic engagement through targeted, fresh initiatives." }, { title: "Strategic Mobilization", detail: "Uniting residents, organizations, and resources for sustainable, far-reaching collective impact through strong partnerships." }, { title: "Non-Partisanship & Inclusivity", detail: "Operating independently and ensuring all voices are valued in our pursuit of a better West Windsor." } ].map((value) => (
                            <li key={value.title} className="flex"> <span> <strong>{value.title}:</strong> {value.detail} </span> </li>
                        ))}
                    </ul>
                </div>
            </Card>
        </div>
    );
});

const ProjectCard: FC<ProjectCardProps> = memo(({ project, setActivePage }) => {
    const handleCardClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).closest('a, button')) return;
        if (project.redirectTo) setActivePage(project.redirectTo);
        else setActivePage("ProjectDetails", project);
    }, [project, setActivePage]);

    const handleButtonClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (project.redirectTo) setActivePage(project.redirectTo);
        else setActivePage("ProjectDetails", project);
    }, [project, setActivePage]);

    const statusColor = project.status === "Cancelled" ? "bg-red-100 text-red-700" : "bg-sky-100 text-sky-700";

    return (
        <Card onClick={handleCardClick} className="flex flex-col h-full group p-0" hasDotPattern>
            <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                    (e.target as HTMLImageElement).onerror = null;
                    (e.target as HTMLImageElement).src = `https://placehold.co/600x400/CCCCCC/FFFFFF?text=Project+Image&font=Lora`;
                }}
            />
            <div className="flex-grow flex flex-col p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-sky-700 group-hover:text-sky-600 transition-colors mb-2 min-h-[3.5rem] line-clamp-2">{project.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                <div className="mb-4"> <span className={`inline-block text-xs font-medium px-2 py-1 ${statusColor} rounded-full`}>{project.status}</span> </div>
                <div className="flex-grow">
                    {project.partnerOrganizations && project.partnerOrganizations.length > 0 && (
                         <>
                            <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1"> Partners: </h4>
                            <div className="flex flex-wrap gap-1"> {project.partnerOrganizations.map((org) => ( <span key={org} className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">{org}</span> ))} </div>
                        </>
                    )}
                    {project.supportingOrganizations && project.supportingOrganizations.length > 0 && (
                         <>
                            <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1"> Supported By: </h4>
                            <div className="flex flex-wrap gap-1"> {project.supportingOrganizations.map((org) => ( <span key={org} className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">{org}</span> ))} </div>
                        </>
                    )}
                </div>
            </div>
            <div className="px-4 sm:px-6 pb-4 sm:pb-6 mt-auto">
                <Button onClick={handleButtonClick} type="secondary" className="w-full text-xs"> {project.redirectTo ? "View Details" : "View Project Details"} </Button>
            </div>
        </Card>
    );
});

const ProjectsPage: FC<PageProps> = ({ setActivePage }) => (
    <div className="container mx-auto py-10 sm:py-12 md:py-16 px-4 animate-fadeIn">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-2 sm:mb-3"> Our Initiatives </h1>
            <p className="text-sm sm:text-md md:text-lg text-gray-600 max-w-2xl mx-auto"> Explore the projects West Windsor Forward is undertaking to enhance our community. </p>
            <div className="mt-4 sm:mt-6 inline-block relative"> <DotPattern dotColor="text-sky-500 opacity-10" rows={2} cols={8} /> </div>
        </div>
        <div className="my-8 sm:my-10 h-1.5 bg-gradient-to-r from-sky-400 via-indigo-500 to-pink-500 rounded-full"></div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-stretch">
            {projectsData.map((project) => ( <ProjectCard key={project.id} project={project} setActivePage={setActivePage} /> ))}
        </div>
    </div>
);

const ProjectDetailPage: FC<ProjectDetailPageProps> = ({ project, setActivePage }) => {
    if (!project) {
        return (
            <div className="container mx-auto py-12 px-4 text-center">
                <p className="text-xl text-red-500">Project not found.</p>
                <Button onClick={() => setActivePage("Projects")} className="mt-4"> Back to Projects </Button>
            </div>
        );
    }
    return (
        <div className="container mx-auto py-10 sm:py-12 md:py-16 px-4 animate-fadeIn">
            <Button onClick={() => setActivePage("Projects")} type="secondary" className="mb-6 sm:mb-8 text-xs sm:text-sm" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}> Back to All Projects </Button>
            <Card noHoverEffect className="overflow-visible p-0">
                <div className="p-4 sm:p-6 md:p-8">
                    <div className="lg:flex lg:space-x-6 md:space-x-8">
                        <div className="lg:w-2/5 mb-6 lg:mb-0"> <img src={project.image} alt={project.title} className="rounded-lg shadow-md w-full h-auto object-cover aspect-video" onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src = `https://placehold.co/600x338/CCCCCC/FFFFFF?text=Project+Image&font=Lora`; }} /> </div>
                        <div className="lg:w-3/5">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-sky-700 mb-2">{project.title}</h1>
                            <div className="flex items-center text-xs sm:text-sm md:text-md text-gray-500 mb-2"> {project.status.toLowerCase().includes("upcoming") ? <IconClock className="mr-2 text-amber-600 h-5 w-5 flex-shrink-0" /> : <IconCheckCircle className="mr-2 text-green-600 h-5 w-5 flex-shrink-0" />} <span> <strong>Status:</strong> {project.status} </span> </div>
                            <p className="text-xs sm:text-sm md:text-md text-gray-600 mb-4"> <strong>Goal:</strong> {project.goal} </p>
                        </div>
                    </div>
                    <div className="prose max-w-none mt-6 sm:mt-8 text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-800 border-b-2 border-sky-200 pb-2 mb-3 sm:mb-4"> Project Overview </h2> <p>{project.description}</p>
                        {project.initiatives && ( <> <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-800 border-b-2 border-sky-200 pb-2 mt-6 sm:mt-8 mb-3 sm:mb-4"> Project Initiatives </h2> <div className="grid sm:grid-cols-2 gap-4 mb-6"> {project.initiatives.map((initiative, index) => ( <div key={index} className="bg-gradient-to-br from-sky-50 to-slate-50 p-4 rounded-lg border border-sky-200"> <div className="flex items-center mb-2"> <div className="text-sky-600 mr-3 flex justify-center items-center">{initiative.icon}</div> <h3 className="font-semibold text-slate-800 text-sm">{initiative.title}</h3> </div> <p className="text-xs text-slate-600 mb-2">{initiative.description}</p> <span className="text-xs font-medium px-2 py-1 bg-sky-100 text-sky-700 rounded">{initiative.status}</span> </div> ))} </div> </> )}
                        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-800 border-b-2 border-sky-200 pb-2 mt-6 sm:mt-8 mb-3 sm:mb-4"> Project Timeline & Milestones </h2>
                        <div className="space-y-3 sm:space-y-4"> {project.timeline?.map((item, index) => ( <div key={index} className={`flex items-start p-2.5 sm:p-3 md:p-4 rounded-lg border-l-4 ${item.completed ? "border-green-500 bg-green-50 text-green-800" : "border-sky-500 bg-sky-50 text-sky-800"}`}> <div className="mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0">{item.completed ? <IconCheckCircle className="text-green-500 h-5 w-5 sm:h-6 sm:w-6" /> : <IconClock className="text-sky-500 h-5 w-5 sm:h-6 sm:w-6" />}</div> <div> <h4 className="font-semibold text-sm sm:text-md md:text-lg">{item.stage}</h4> <p className="text-xs sm:text-sm opacity-90">{item.details}</p> </div> </div> ))} </div>
                        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-800 border-b-2 border-sky-200 pb-2 mt-6 sm:mt-8 mb-3 sm:mb-4"> Envisioned Impact </h2> <p>{project.impact}</p>
                        {project.partnerOrganizations && project.partnerOrganizations.length > 0 && ( <> <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-800 border-b-2 border-sky-200 pb-2 mt-6 sm:mt-8 mb-3 sm:mb-4"> Our Partners </h2> <ul className="list-none p-0 flex flex-wrap gap-2 sm:gap-3"> {project.partnerOrganizations.map((org) => ( <li key={org} className="bg-slate-100 text-slate-700 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm shadow-sm flex items-center">{org}</li> ))} </ul> </> )}
                        {project.supportingOrganizations && project.supportingOrganizations.length > 0 && ( <> <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-800 border-b-2 border-sky-200 pb-2 mt-6 sm:mt-8 mb-3 sm:mb-4"> Supported By </h2> <ul className="list-none p-0 flex flex-wrap gap-2 sm:gap-3"> {project.supportingOrganizations.map((org) => ( <li key={org} className="bg-slate-100 text-slate-700 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm shadow-sm flex items-center">{org}</li> ))} </ul> </> )}
                        <div className="mt-8 sm:mt-10 p-4 sm:p-6 bg-sky-50 rounded-lg border border-sky-200">
                            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-sky-700 mb-3"> How You Can Contribute </h2> <p className="text-gray-700 leading-relaxed mb-4 text-xs sm:text-sm md:text-base">{project.getInvolved}</p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button onClick={() => setActivePage("Contact")} icon={<IconUsers />} className="text-xs sm:text-sm"> Volunteer or Offer Support </Button>
                                {project.id === 2 && <Button onClick={() => window.open("/WWF_Station_Proposal[V1].pdf", "_blank")} type="secondary" icon={<IconDocument />} className="text-xs sm:text-sm"> Read Full Proposal </Button>}
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

const EventsPage: FC<PageProps> = ({ setActivePage }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setIsModalOpen(true);
    }, []);

    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="min-h-screen bg-slate-100 font-body text-slate-700">
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2 className="text-2xl font-bold text-amber-800 mb-4">An Update on the 2025 Candidate Forum</h2>
                <div className="prose prose-sm sm:prose-base max-w-none text-slate-700">
                    <p><strong>West Windsor, NJ – September 18, 2025</strong> – It is with deep regret and disappointment that <strong>West Windsor Forward must announce the cancellation of our 2025 Candidate Forum, which was scheduled for September 25th.</strong> The forum has been cancelled because the campaigns for Mayor and Council were unable to agree on a format.</p>
                    <p>This cancellation represents a significant loss for West Windsor residents, who were anticipating a direct and unbiased opportunity to hear from all certified candidates on the issues that matter most. The West Windsor Forward team invested ten months of effort, countless hours, and a great deal of resources into restoring this vital civic tradition.</p>
                    <p>We extend our deepest gratitude to all who supported our efforts. We are especially thankful for the unwavering support of the <strong>League of Women Voters of the Greater Princeton Area</strong> (lwvprinceton.org), and we encourage everyone in West Windsor to support their longstanding commitment to informing voters in Central Jersey. We also thank our panelists, <strong>Micah Rasmussen and David Matthau</strong>, for their immense trust in us and their invaluable assistance. We would also like to express our sincere appreciation to <strong>Mercer County Community College and the Kelsey Theatre</strong> for their generosity in offering their venue and their patience throughout our planning process. To everyone who offered to volunteer, your commitment to our town and its residents was a true inspiration. Finally, to the community, your words of encouragement privately, on our social media, and at our tabling events reaffirmed our efforts throughout this process.</p>
                    <p>While this is a disappointing outcome, it does not mark the end of West Windsor Forward's commitment to civic engagement. We will remain actively involved in this year's Municipal election through other non-partisan projects focused on informing voters, including <strong>working with both campaigns to set up informative interviews for the community.</strong> We will also continue our other community-focused projects, such as pushing for our adoption of the Princeton Junction Train Station. We encourage residents to submit ideas for further civic and community initiatives. We are looking for High Schoolers who want to join us and make a difference in West Windsor to sign up to volunteer by emailing at contact@westwindsorforward.org.</p>
                    <p>The last Mayoral and Council forums were held in 2017. The cancellation of this event—after coming so close to reinstating this tradition—is a worrying development for the health of the democratic process in West Windsor. Our town deserves and needs constructive, productive, and fair dialogue. It is on all of us, as a community, to advocate for that standard in subsequent election cycles. The future of our town's civic health depends on the collective voice of its citizens demanding accountability.</p>
                    <p>Sincerely,
                    <br />Parth Gupta and Darshan Chidambaram
                    <br />Co-Executive Directors @ West Windsor Forward</p>
                </div>
                 <Button onClick={closeModal} className="mt-6 w-full sm:w-auto">Close</Button>
            </Modal>
            
            <ForumHeader />
            <DocumentComparisonSection />
            <StatementsSection />
            <div className="container mx-auto px-4 py-8 space-y-8">
                <div className="text-center pt-4 border-t-2 border-slate-200 mt-8">
                    <h2 className="text-2xl font-bold text-slate-700">Forum Initiative Archive</h2>
                    <p className="text-slate-500 max-w-3xl mx-auto">The following information is preserved to document the extensive planning and community effort involved in this civic initiative.</p>
                </div>
                <PanelistSection />
                <ForumFormatSection />
                <KeyInformationSection />
                <PressCoverageSection />
            </div>
        </div>
    );
};

const ContactPage: FC = () => {
    const initialFormData = { name: "", email: "", message: "" };
    const [formData, setFormData] = useState(initialFormData);
    const [result, setResult] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const web3FormsAccessKey = "ccb9ef54-31b7-4397-9eb8-ff8d3b587265";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setResult("Sending....");
        const formElement = event.target as HTMLFormElement;
        const web3FormData = new FormData(formElement);
        web3FormData.append("access_key", web3FormsAccessKey);
        web3FormData.append("subject", `New Contact from ${formData.name || "Website Visitor"}`);

        if (!formData.name || !formData.email || !formData.message) {
            setResult("Please fill in all required fields.");
            setIsSubmitting(false);
            setTimeout(() => setResult(""), 6000);
            return;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setResult("Please enter a valid email address.");
            setIsSubmitting(false);
            setTimeout(() => setResult(""), 6000);
            return;
        }

        try {
            const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: web3FormData });
            const data = await response.json();
            if (data.success) {
                setResult("Message sent successfully! We'll get back to you soon.");
                formElement.reset();
                setFormData(initialFormData);
            } else {
                console.log("Error from web3forms", data);
                setResult(data.message || "An error occurred. Please try again.");
            }
        } catch (error) {
            console.error("Submission error:", error);
            setResult("An error occurred while submitting the form. Please try again later.");
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setResult(""), 8000);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-indigo-50 relative overflow-hidden">
            <DotPattern dotColor="text-sky-400 opacity-10" rows={12} cols={15} />
            
            <div className="relative z-10 container mx-auto py-12 sm:py-16 md:py-20 px-4 animate-fadeIn">
                <div className="text-center mb-12 sm:mb-16">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                        Contact <span className="text-sky-600">West Windsor Forward</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Ready to make a difference in our community? We'd love to hear from you.
                    </p>
                </div>

                <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-7xl mx-auto">
                    <div className="lg:col-span-2">
                        <Card className="bg-gradient-to-br from-sky-600 to-indigo-700 text-white p-0 transform hover:scale-105 transition-all duration-300" noHoverEffect>
                            <div className="relative p-4 sm:p-6 lg:p-8">
                                <DotPattern dotColor="text-white opacity-10" rows={6} cols={8} />
                                <div className="relative z-10">
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6"> Let's Connect </h2>
                                    <p className="text-sky-100 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                                        We welcome your questions, ideas, and partnership opportunities. Together, we can create positive change in West Windsor.
                                    </p>
                                    
                                    <div className="space-y-4 sm:space-y-6">
                                        <div className="flex items-start group">
                                            <div className="bg-white bg-opacity-20 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4 group-hover:bg-opacity-30 transition-all duration-200 flex-shrink-0">
                                                <IconMail className="h-5 w-5 sm:h-6 sm:w-6" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Email Us</h3>
                                                <a href="mailto:contact@westwindsorforward.org" className="text-sky-100 hover:text-white transition-colors text-sm sm:text-base break-all">
                                                    contact@westwindsorforward.org
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-start group">
                                            <div className="bg-white bg-opacity-20 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4 group-hover:bg-opacity-30 transition-all duration-200 flex-shrink-0">
                                                <IconUsers className="h-5 w-5 sm:h-6 sm:w-6" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Join Our Community</h3>
                                                <p className="text-sky-100 mb-3 text-sm sm:text-base">Follow us for updates and events</p>
                                                <div className="flex flex-wrap gap-2">
                                                    <a href="https://www.facebook.com/profile.php?id=61575121893868" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-all duration-200 group text-sm sm:text-base">
                                                        <IconFacebook className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                                                        <span> Facebook</span>
                                                        <IconExternalLink className="h-3 w-3 sm:h-4 sm:w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                                    </a>
                                                    <a href="https://instagram.com/westwindsorforward" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-all duration-200 group text-sm sm:text-base">
                                                        <IconInstagram className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                                                        <span> Instagram</span>
                                                        <IconExternalLink className="h-3 w-3 sm:h-4 sm:w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                                    </a>
                                                    <a href="https://x.com/westwindsorfwd" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-all duration-200 group text-sm sm:text-base">
                                                        <IconX className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                                                        <span>        Twitter/X</span>
                                                        <IconExternalLink className="h-3 w-3 sm:h-4 sm:w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-start group">
                                            <div className="bg-white bg-opacity-20 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4 group-hover:bg-opacity-30 transition-all duration-200 flex-shrink-0">
                                                <IconLightBulb className="h-5 w-5 sm:h-6 sm:w-6" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Get Involved</h3>
                                                <p className="text-sky-100 text-sm sm:text-base">Volunteer opportunities, events, and ways to make an impact in our community.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-white bg-opacity-10 rounded-lg border border-white border-opacity-20">
                                        <div className="flex items-center">
                                            <IconClock className="h-4 w-4 sm:h-5 sm:w-5 mr-3 sm:mr-2 text-sky-200 flex-shrink-0" />
                                            <span className="text-xs sm:text-sm text-sky-100">We typically respond within 24-48 hours</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="lg:col-span-3">
                        <Card className="bg-white p-0 border-2 border-transparent hover:border-sky-200 transition-all duration-300" hasDotPattern>
                            <div className="p-6 sm:p-8">
                                <div className="flex items-center mb-6">
                                    <div className="bg-sky-100 p-3 rounded-lg mr-4">
                                        <IconDocument className="h-6 w-6 text-sky-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800"> Send Us a Message </h2>
                                        <p className="text-gray-600">Share your thoughts, questions, or ideas with us</p>
                                    </div>
                                </div>
                                
                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                                    <div className="flex items-start">
                                        <IconInfo className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-blue-800 font-medium mb-1">Secure & Private</p>
                                            <p className="text-sm text-blue-700">This form is powered by Web3Forms, ensuring your data privacy and reliable message delivery.</p>
                                        </div>
                                    </div>
                                </div>

                                {result && (
                                    <div className={`mb-6 p-4 rounded-xl border text-sm font-medium ${
                                        result.includes('successfully')
                                            ? 'bg-green-50 text-green-800 border-green-200'
                                            : result.includes('Sending')
                                                ? 'bg-blue-50 text-blue-800 border-blue-200'
                                                : 'bg-red-50 text-red-800 border-red-200'
                                    }`}>
                                        <div className="flex items-center">
                                            {result.includes('successfully') && <IconCheckCircle className="h-5 w-5 mr-2 text-green-600" />}
                                            {result.includes('Sending') && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>}
                                            <span>{result}</span>
                                        </div>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="contact-name" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="contact-name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 hover:border-gray-400"
                                            placeholder="Enter your full name"
                                            required
                                        />
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="contact-email" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Email Address <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="contact-email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 hover:border-gray-400"
                                            placeholder="Enter your email address"
                                            required
                                        />
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="contact-message" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Message <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            name="message"
                                            id="contact-message"
                                            rows={5}
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 hover:border-gray-400 resize-none"
                                            placeholder="Tell us about your questions, ideas, or how you'd like to get involved..."
                                            required
                                        ></textarea>
                                    </div>
                                    
                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-75 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed bg-sky-600 hover:bg-sky-700 text-white focus:ring-sky-500 px-6 py-4 text-base"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                    Sending Message...
                                                </>
                                            ) : (
                                                <>
                                                    <IconMail className="mr-2" />
                                                    Send Message
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </Card>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <Card className="bg-gradient-to-r from-slate-50 to-sky-50 border-sky-200 p-0 max-w-4xl mx-auto">
                        <div className="p-8">
                            <h3 className="text-2xl font-bold text-slate-800 mb-4">Ready to Make a Difference?</h3>
                            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                                Join our community of engaged residents working together to create positive change in West Windsor.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button onClick={() => window.open("https://www.facebook.com/profile.php?id=61575121893868", "_blank")} type="secondary" icon={<IconFacebook />}>
                                    Follow on Facebook
                                </Button>
                                <Button onClick={() => window.location.href = "mailto:contact@westwindsorforward.org?subject=Volunteer%20Interest"} icon={<IconUsers />}>
                                    Volunteer With Us
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

// --- Main App Component ---
function App() {
    const [activePage, setActivePage] = useState<PageName>("Home");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const navigateToPage = (page: PageName, project: Project | null = null) => {
        setActivePage(page);
        setSelectedProject(project);
        let url = '/'; let title = 'West Windsor Forward';
        switch (page) {
            case 'Home': url = '/'; title = 'West Windsor Forward'; break;
            case 'About': url = '/about'; title = 'About Us - West Windsor Forward'; break;
            case 'Projects': url = '/projects'; title = 'Our Initiatives - West Windsor Forward'; break;
            case 'Events': url = '/events'; title = '2025 Candidate Forum (Cancelled) - West Windsor Forward'; break;
            case 'Contact': url = '/contact'; title = 'Contact Us - West Windsor Forward'; break;
            case 'ProjectDetails': if (project) { url = `/projects/${project.slug}`; title = `${project.title} - West Windsor Forward`; } break;
            default: url = '/'; title = 'West Windsor Forward';
        }
        if (typeof window !== 'undefined' && window.location.pathname !== url) {
            const historyState = { page, projectId: project?.id || null, projectSlug: project?.slug || null };
            window.history.pushState(historyState, title, url);
        }
        if (typeof window !== 'undefined') { document.title = title; window.scrollTo(0, 0); }
    };

    useEffect(() => {
        const handlePopState = (event: PopStateEvent) => {
            if (event.state) {
                setActivePage(event.state.page);
                if (event.state.projectId) {
                    const project = projectsData.find(p => p.id === event.state.projectId);
                    setSelectedProject(project || null);
                } else {
                    setSelectedProject(null);
                }
            }
        };
        window.addEventListener('popstate', handlePopState);
        const path = window.location.pathname; const parts = path.split('/').filter(Boolean);
        if (parts[0] === 'about') navigateToPage('About');
        else if (parts[0] === 'projects') {
            if (parts[1]) {
                const project = projectsData.find(p => p.slug === parts[1]);
                if (project) navigateToPage('ProjectDetails', project);
                else navigateToPage('Projects');
            } else navigateToPage('Projects');
        } else if (parts[0] === 'events') navigateToPage('Events');
        else if (parts[0] === 'contact') navigateToPage('Contact');
        else if (parts.length === 0) navigateToPage('Home');
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const renderPage = () => {
        if (activePage === "ProjectDetails" && selectedProject) return <ProjectDetailPage project={selectedProject} setActivePage={navigateToPage} />;
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
            <Navbar setActivePage={navigateToPage} activePage={activePage} selectedProject={selectedProject} />
            <main className="flex-grow">{renderPage()}</main>
            <Footer setActivePage={navigateToPage} />
        </div>
    );
}

export default App;

// --- Style injection ---
if (typeof window !== "undefined") {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
      body { font-family: 'Lora', Georgia, serif !important; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
      .font-body { font-family: 'Lora', Georgia, serif !important; }
      h1, h2, h3, h4, h5, h6 { font-family: 'Lora', Georgia, serif !important; }
      .prose { font-family: 'Lora', Georgia, serif !important; }
      .prose p { margin-bottom: 1.25em; line-height: 1.75; }
      .prose strong { color: inherit; }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .animate-fadeIn {
        animation: fadeIn 0.3s ease-out forwards;
      }
      
      @keyframes slideDown {
        from { transform: translateY(-20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      .animate-slideDown {
        animation: slideDown 0.3s ease-out forwards;
      }
      
      @keyframes pulse-slow {
        0%, 100% { opacity: 0.05; }
        50% { opacity: 0.15; }
      }
      .animate-pulse-slow {
        animation: pulse-slow 5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        will-change: opacity;
      }
      
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
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
    fontLinkLora.href = "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap";
    document.head.appendChild(fontLinkLora);
}
