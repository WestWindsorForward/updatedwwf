import React, { useState, useEffect, useRef, FC, ReactNode, useCallback, useMemo, memo } from "react";

// --- Asset URLs ---
const logoUrl = "https://placehold.co/48x48/FFFFFF/0C4A6E?text=WWF";

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
const IconQuestionMark: FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} viewBox="0 0 20 20" fill="currentColor"> <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /> </svg> );
const IconLightBulb: FC = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.477.859h4z" /> </svg> );
const IconMicrophone: FC = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" /> </svg> );
const IconDocument: FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} viewBox="0 0 20 20" fill="currentColor"> <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /> </svg> );
const IconRecycle: FC = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" /> </svg> );
const IconPhotograph: FC = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /> </svg> );
const IconInfo: FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 sm:h-5 sm:w-5 mr-2 ${className}`} viewBox="0 0 20 20" fill="currentColor"> <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /> </svg> );
const IconFacebook: FC = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"> <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /> </svg> );
const IconMenu: FC = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /> </svg> );
const IconClose: FC = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> </svg> );
const IconSpeakerPhone: FC = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.894A1 1 0 0018 16V3z" clipRule="evenodd" /> </svg> );
const IconArrowRight: FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${className}`} viewBox="0 0 20 20" fill="currentColor"> <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /> </svg> );

// --- Type Definitions ---
interface DotPatternProps { className?: string; dotColor?: string; rows?: number; cols?: number; }
interface CardProps { children: ReactNode; className?: string; noHoverEffect?: boolean; hasDotPattern?: boolean; onClick?: (e: React.MouseEvent<HTMLDivElement>) => void; }
interface ButtonProps { children?: ReactNode; onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void; type?: 'primary' | 'secondary' | 'success' | 'warning'; className?: string; icon?: ReactNode; isSubmit?: boolean; disabled?: boolean; size?: 'sm' | 'md' | 'lg'; }
type PageName = "Home" | "About" | "Projects" | "Events" | "Contact" | "ProjectDetails";
interface Project { id: number; slug: string; title: string; shortGoal: string; status: string; description: string; image: string; partnerOrganizations: string[]; redirectTo?: PageName; goal?: string; impact?: string; timeline?: { stage: string; details: string; completed: boolean; }[]; getInvolved?: string; fundingSources?: string[]; initiatives?: { title: string; description: string; icon: ReactNode; status: string; }[]; }
interface NavbarProps { setActivePage: (page: PageName, project?: Project | null) => void; activePage: PageName; selectedProject: Project | null; }
interface PageProps { setActivePage: (page: PageName, project?: Project | null) => void; }
interface ProjectCardProps { project: Project; setActivePage: (page: PageName, project?: Project | null) => void; }
interface ProjectDetailPageProps { project: Project | null; setActivePage: (page: PageName, project?: Project | null) => void; }
interface AnnouncementBarProps { onNavigateToEvents: () => void; }
interface FooterProps { setActivePage: (page: PageName) => void; }

// --- Helper Components ---
const DotPattern: FC<DotPatternProps> = memo(({ className = "", dotColor = "text-sky-200 opacity-5", rows = 6, cols = 8 }) => {
    const dots = useMemo(() => {
        const totalDots = Math.min(rows * cols * 4, 100); // Limit total dots for performance
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
                            transform: 'translateZ(0)' // Force hardware acceleration
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
        style={{ transform: 'translateZ(0)' }} // Force hardware acceleration
    >
        {hasDotPattern && <DotPattern dotColor="text-sky-500 opacity-5" />}
        <div className="relative z-10 h-full flex flex-col">{children}</div>
    </div>
));

const Button: FC<ButtonProps> = memo(({ children, onClick, type = "primary", className = "", icon, isSubmit = false, disabled = false, size = "md" }) => {
    const baseStyle = `inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 ease-in-out transform hover:scale-103 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-75 shadow-md hover:shadow-lg will-change-transform ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;
    const sizeStyles = { sm: "px-3 py-1.5 text-xs", md: "px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm", lg: "px-6 py-3 text-sm sm:text-base" };
    const typeStyle = type === "primary" ? "bg-sky-600 hover:bg-sky-700 text-white focus:ring-sky-500" : type === "secondary" ? "bg-slate-200 hover:bg-slate-300 text-slate-800 focus:ring-slate-400" : type === "success" ? "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500" : type === "warning" ? "bg-amber-600 hover:bg-amber-700 text-white focus:ring-amber-500" : "bg-slate-200 hover:bg-slate-300 text-slate-800 focus:ring-slate-400";
    
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
            {icon && !children && <span>{icon}</span>}
            {icon && children && <span className="mr-2">{icon}</span>}
            {children}
        </button>
    );
});

// --- Utility Functions ---
const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// --- Announcement Bar Component ---
const AnnouncementBar: FC<AnnouncementBarProps> = memo(({ onNavigateToEvents }) => {
    const [isDismissed, setIsDismissed] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const handleDismiss = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsVisible(false);
        setTimeout(() => {
            setIsDismissed(true);
        }, 300);
    }, []);

    const toggleExpanded = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    }, [isExpanded]);

    const backgroundDots = useMemo(() => (
        Array.from({ length: 8 }).map((_, i) => ({
            id: i,
            left: `${(i * 12.5) + Math.random() * 5}%`,
            top: `${20 + Math.random() * 60}%`,
            delay: `${i * 0.2}s`
        }))
    ), []);

    if (isDismissed) return null;

    return (
        <div
            className={`relative bg-gradient-to-r from-sky-600 via-sky-700 to-indigo-700 text-white shadow-lg border-b border-sky-500 overflow-hidden transition-all duration-500 ease-out will-change-transform cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'} ${isExpanded ? 'py-4' : 'py-3 sm:py-3'}`}
            onClick={onNavigateToEvents}
            style={{ transform: 'translateZ(0)' }}
        >
            {/* Optimized background pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-sky-600 via-sky-700 to-indigo-700">
                <div className="absolute inset-0 bg-white bg-opacity-5">
                    <div className="absolute inset-0 will-change-transform">
                        {backgroundDots.map((dot) => (
                            <div
                                key={dot.id}
                                className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse-slow"
                                style={{
                                    left: dot.left,
                                    top: dot.top,
                                    animationDelay: dot.delay,
                                    transform: 'translateZ(0)'
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-0 sm:py-0">
                {/* Desktop Layout */}
                <div className="hidden sm:block">
                    <div className="flex items-center justify-between">
                        <div className="flex-1 flex items-center justify-center space-x-3">
                            {/* Animated pulse dot */}
                            <div className="flex-shrink-0">
                                <div className="relative">
                                    <div className="w-3 h-3 bg-red-400 rounded-full animate-ping"></div>
                                    <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <IconSpeakerPhone />
                                <span className="font-semibold text-base">Join us for the 2025 Candidate Forum</span>
                            </div>
                            
                            <div className="flex items-center text-sm text-sky-100 space-x-4 ml-6">
                                <div className="flex items-center space-x-1">
                                    <IconCalendar className="h-4 w-4" />
                                    <span>Sept 25th</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <IconClock className="h-4 w-4" />
                                    <span>7:00 PM</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <IconMapMarker className="h-4 w-4" />
                                    <span>Kelsey Theatre</span>
                                </div>
                            </div>
                        </div>

                        {/* Desktop Action button */}
                        <div className="flex items-center space-x-2 ml-6">                            
                            <button
                                onClick={handleDismiss}
                                className="text-sky-200 hover:text-white p-1 rounded-md transition-colors hover:bg-white hover:bg-opacity-20"
                                aria-label="Dismiss announcement"
                            >
                                <IconClose className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {/* Secondary info line for larger screens */}
                    <div className="hidden lg:flex items-center justify-center mt-2 pt-2 border-t border-sky-500 border-opacity-30">
                        <div className="text-xs text-sky-100 flex items-center space-x-6">
                            <span className="flex items-center space-x-1">
                                <IconUsers className="h-4 w-4" />
                                <span>Meet mayoral & council candidates</span>
                            </span>
                            <span className="flex items-center space-x-1">
                                <IconMicrophone className="h-4 w-4" />
                                <span>Q&A with community questions</span>
                            </span>
                            <span className="flex items-center space-x-1">
                                <IconDocument className="h-4 w-4" />
                                <span>Free admission & live stream available</span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="sm:hidden">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 flex-1">
                            {/* Animated pulse dot */}
                            <div className="flex-shrink-0">
                                <div className="relative">
                                    <div className="w-2.5 h-2.5 bg-red-400 rounded-full animate-ping"></div>
                                    <div className="absolute inset-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></div>
                                </div>
                            </div>

                            <div className="flex-1 text-center">
                                <div className="flex items-center justify-center space-x-2 mb-1">
                                    <IconSpeakerPhone className="h-4 w-4" />
                                    <span className="font-semibold text-sm">2025 Candidate Forum</span>
                                </div>
                                <div className="flex items-center justify-center text-xs text-sky-100 space-x-3">
                                    <span>Sept 25th</span>
                                    <span>•</span>
                                    <span>7:00 PM</span>
                                </div>
                            </div>
                        </div>
                        {/* Mobile dismiss button only */}
                        <button
                            onClick={handleDismiss}
                            className="text-sky-200 hover:text-white p-2 rounded-md transition-colors hover:bg-white hover:bg-opacity-20 ml-2 flex-shrink-0"
                            aria-label="Dismiss announcement"
                        >
                            <IconClose className="h-4 w-4" />
                        </button>
                    </div>
                    {/* Mobile expanded details */}
                    <div className={`${isExpanded ? 'block' : 'hidden'} mt-3 border-t border-sky-500 border-opacity-30 pt-3`}>
                        <div className="text-xs text-sky-100 space-y-2 flex flex-col items-center text-center">
                            <div className="flex items-center justify-center">
                                <IconMapMarker className="h-3 w-3 mr-2" />
                                <span>Kelsey Theatre</span>
                            </div>
                            <div className="flex items-center justify-center">
                                <IconUsers className="h-3 w-3 mr-2" />
                                <span>Meet mayoral & council candidates, plus community Q&A.</span>
                            </div>
                            <div className="flex items-center justify-center">
                                <IconDocument className="h-3 w-3 mr-2" />
                                <span>Free admission & live stream available.</span>
                            </div>
                        </div>
                    </div>
                    {/* Expand/collapse button */}
                    <div className="flex justify-center mt-2">
                        <button
                            onClick={toggleExpanded}
                            className="text-sky-200 hover:text-white p-1 rounded-md transition-colors hover:bg-white hover:bg-opacity-20"
                            aria-label={isExpanded ? "Collapse details" : "Expand details"}
                        >
                            {isExpanded ? <IconChevronUp className="h-4 w-4" /> : <IconChevronDown className="h-4 w-4" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});


// --- Google Form Integration Components ---

interface GoogleFormComponentProps {
    formUrl: string;
    fieldMapping: { [key: string]: string };
    children: ReactNode;
    onSuccess?: () => void;
    onError?: () => void;
}

interface FormFieldsProps {
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    formData: { [key: string]: string | string[] };
    status?: string;
    handleSubmit?: (e: React.FormEvent<HTMLFormElement> | undefined) => void;
}

const GoogleFormComponent: FC<GoogleFormComponentProps> = ({ formUrl, fieldMapping, children, onSuccess, onError }) => {
    const [formData, setFormData] = useState<{ [key: string]: string | string[] }>({});
    const [status, setStatus] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            const currentValues = (formData[name] as string[] | undefined) || [];
            if (checked) {
                setFormData(prev => ({ ...prev, [name]: [...currentValues, value] }));
            } else {
                setFormData(prev => ({ ...prev, [name]: currentValues.filter(v => v !== value) }));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async () => {
        
        if (fieldMapping.positionsOfInterest && (!formData.positionsOfInterest || (formData.positionsOfInterest as string[]).length === 0)) {
            setStatus('Please select at least one position of interest.');
            setTimeout(() => setStatus(''), 5000);
            return;
        }

        if (fieldMapping.email && (!formData.email || !/\S+@\S+\.\S+/.test(formData.email as string))) {
            setStatus('Please enter a valid email address.');
            setTimeout(() => setStatus(''), 5000);
            return;
        }

        setStatus('Sending...');

        const googleFormData = new FormData();
        for (const key in formData) {
            if (fieldMapping[key]) {
                const value = formData[key];
                if (Array.isArray(value)) {
                    value.forEach(item => {
                        googleFormData.append(fieldMapping[key], item);
                    });
                } else {
                    googleFormData.append(fieldMapping[key], value);
                }
            }
        }
        
        if (fieldMapping.position && !googleFormData.has(fieldMapping.position)) {
            const defaultPosition = "Mayor of West Windsor Township";
            googleFormData.append(fieldMapping.position, defaultPosition);
            setFormData(prev => ({...prev, position: defaultPosition}));
        }

        try {
            await fetch(formUrl, { method: 'POST', body: googleFormData, mode: 'no-cors' });
            setStatus('Submitted successfully! Thank you.');
            setFormData({});
            if(onSuccess) onSuccess();
            setTimeout(() => setStatus(''), 8000);
        } catch (error) {
            console.error('Error submitting to Google Form:', error);
            setStatus('An error occurred. Please try again.');
            if(onError) onError();
            setTimeout(() => setStatus(''), 8000);
        }
    };

    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement<FormFieldsProps>(child)) {
            return React.cloneElement(child, { handleChange, formData, status, handleSubmit });
        }
        return child;
    });

    return (
        <div>
            {/* This top-level status is for multi-field forms like the question one */}
            {Object.keys(fieldMapping).length > 1 && status && (
                <div className={`mb-4 p-3 rounded-md text-sm ${status.includes('successfully') ? 'bg-green-100 text-green-700 border border-green-200' : status.includes('Please select') || status.includes('valid email') ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-blue-100 text-blue-700 border border-blue-200'}`}>
                    {status}
                </div>
            )}
            {childrenWithProps}
        </div>
    );
};

const CandidateQuestionForm: FC<FormFieldsProps & {handleSubmit?: () => void}> = ({ handleChange, formData, handleSubmit }) => {
    const positionOptions = [ "Mayor of West Windsor Township", "West Windsor Township Council", "Both Mayoral and Council Candidates" ];
    return (
        <>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
                <p className="text-sm text-blue-800 flex items-start">
                    <IconInfo className="mr-2 mt-0.5 flex-shrink-0" />
                    Your submission is processed securely through a Google Form to ensure anonymity and proper handling.
                </p>
            </div>
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2"> Which position would you like to suggest a question/topic for? <span className="text-red-500">*</span> </label>
                    <div className="space-y-2">
                        {positionOptions.map(option => (
                            <div key={option} className="flex items-center">
                                <input type="radio" id={option.replace(/\s+/g, '-')} name="position" value={option} checked={formData.position === option || (option === positionOptions[0] && !formData.position)} onChange={handleChange} className="h-4 w-4 text-sky-600 border-gray-300 focus:ring-sky-500" required />
                                <label htmlFor={option.replace(/\s+/g, '-')} className="ml-3 block text-sm text-gray-700"> {option} </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1"> Please provide your suggested topic(s) for the candidates. What overarching themes or areas of concern do you believe the panelists should address? <span className="text-red-500">*</span> </label>
                    <input type="text" name="topic" id="topic" value={formData.topic as string || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm" placeholder="e.g., Downtown Development, School Funding, Traffic Safety" required />
                </div>
                <div>
                    <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1"> Please write down your specific question(s) for the candidates. Try to make them clear, concise, and relevant to the West Windsor community. <span className="text-red-500">*</span> </label>
                    <textarea name="question" id="question" rows={3} value={formData.question as string || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm" required></textarea>
                </div>
                <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1"> Would you like to provide any additional comments regarding your suggestions? (Optional) </label>
                    <textarea name="comment" id="comment" rows={2} value={formData.comment as string || ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm"></textarea>
                </div>
                <Button onClick={handleSubmit} type="primary" className="w-full sm:w-auto"> Submit Question </Button>
            </div>
        </>
    );
};

const NewsletterForm: FC<FormFieldsProps & {handleSubmit?: () => void}> = ({ handleChange, formData, handleSubmit, status }) => {
    const isSubmitting = status === 'Sending...';
    return (
        <>
            <div className="flex flex-col sm:flex-row gap-2">
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="flex-grow w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-md text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all disabled:opacity-50"
                    aria-label="Email for newsletter"
                    value={(formData.email as string) || ''}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                />
                <Button onClick={handleSubmit} type="primary" disabled={isSubmitting} className="w-full sm:w-auto">
                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </Button>
            </div>
            {status && status !== 'Sending...' && (
                <p className={`mt-2 text-xs h-4 ${status.includes('successfully') ? 'text-green-400' : 'text-amber-400'}`}>
                    {status}
                </p>
            )}
        </>
    );
};

// --- Data ---
const forumData = {
    title: "West Windsor Forward 2025 Candidate Forum", date: "Thursday, September 25th, 2025", time: "7:00 PM - 9:15 PM", arrivalTime: "6:30 PM for candidates", location: "Kelsey Theatre @ Mercer County Community College", positions: ["Mayor of West Windsor Township", "2 seats on West Windsor Township Council"], status: "upcoming",
    panelists: [
        { id: "micah-rasmussen", name: "Micah Rasmussen", title: "Director, Rebovich Institute for NJ Politics", imageUrl: "https://placehold.co/150x150/E0F2FE/0C4A6E?text=MR", bio: 'Micah Rasmussen is the director of the Rebovich Institute for New Jersey Politics at Rider University. He has worked in the New Jersey General Assembly and managed several political campaigns. After completing his undergraduate studies at Rider under his mentor David Rebovich, the namesake of the institute he now leads, Rasmussen earned his Master of Arts in Political Science from the Eagleton Institute of Politics at Rutgers University. Rasmussen is a panelist for the state\'s biggest political debates-- twice so far this year in the race to elect New Jersey\'s next governor, and in the only debate last year between now Senator Andy Kim and First Lady Tammy Murphy. He is regularly included on New Jersey\'s political power and higher education influencer lists. One called him "the go-to guy for the media to comment on what\'s happening in New Jersey politics-- and what it means".', note: "" },
        { id: "david-matthau", name: "David Matthau", title: "WHYY NJ Reporter", imageUrl: "https://placehold.co/150x150/E0F2FE/0C4A6E?text=DM", bio: "David Matthau is a WHYY New Jersey reporter covering the Statehouse and general assignments in the Garden State. Prior to joining WHYY, David was lead investigative reporter for NJ 101.5 News, winning multiple Associated Press and Society of Professional Journalists awards, the National Association of Broadcasters Service to Community Award, and contributed to the National Edward R. Murrow Best Newscast award. David is a graduate of the University of Southern California." },
        { id: "rhea-biswas", name: "Rhea Biswas", title: "West Windsor HS Student & Journalist", imageUrl: "https://placehold.co/150x150/E0F2FE/0C4A6E?text=RB", bio: "Rhea Biswas is a West Windsor high school student passionate about politics and social justice, with hopes of pursuing a career in law. She regularly competes in debate competitions and Model Congress conferences, as well as writes for her school newspaper and a local newspaper, The West Windsor Voice. She is committed to transparent debate and honest discussion in order to better advocate for meaningful change in her community." },
    ],
    forumParts: [
        { id: 1, title: "Panelist Q&A Sessions", description: "Equal time Q&A sessions for Mayoral and Council candidates with questions from our distinguished panelists", location: "Main Theatre", iconType: "microphone" },
        { id: 2, title: "Town Hall Q&A", description: "Community-driven Q&A where residents can submit questions for candidates to address", location: "Main Theatre", iconType: "users" },
        { id: 3, title: "Meet & Greet", description: "Informal conversations between candidates and voters, plus community organization tables", location: "Theatre Lobby", iconType: "lightbulb" },
    ],
    milestones: [
        { id: 1, title: "Completed: Venue & Panelists Secured", description: "Kelsey Theatre confirmed, distinguished panelists recruited, partnerships established", completed: true, date: "Completed" },
        { id: 2, title: "In Progress: Candidate Invitations & Agreements", description: "Formal invitations sent to all declared candidates, agreements being collected", completed: false, date: "In Progress" },
        { id: 3, title: "Upcoming: Community Engagement & Promotion", description: "Public awareness campaign, ticket distribution, volunteer recruitment", completed: false, date: "August - September 2025" },
        { id: 4, title: "Upcoming: Forum Event Day", description: "Live forum with streaming, Q&A sessions, and community engagement", completed: false, date: "September 25, 2025" },
    ],
    requirements: { council: "At least 3 council candidates participating OR candidates from at least 2 different tickets with minimum 3 total candidates running", mayor: "At least 2 mayoral candidates participating" },
    volunteerRoles: ["Event Setup & Logistics", "Attendee Greeting & Check-in", "Camera & Live Stream Operation", "Question Collection & Management", "Community Organization Coordination", "Post-Event Cleanup"],
    pressCoverage: [
        { id: 1, title: "West Windsor Forward to Host 2025 Candidate Forum", source: "West Windsor Plainsboro News", url: "https://placehold.co/100x100/CCCCCC/FFFFFF?text=Article+Link" },
        { id: 2, title: "West Windsor Forward Announces Candidate Forum", source: "West Windsor Peeps", url: "https://westwindsorpeeps.com/west-windsor-candidate-forum/" },
        { id: 3, title: "West Windsor Candidate Forum at Kelsey Theatre", source: "CentralJersey.com", url: "https://centraljersey.com/2025/05/05/west-windsor-candidate-forum-kelsey-theatre/" },
    ],
};

const projectsData: Project[] = [
    { id: 1, slug: "candidate-forum-2025", title: "2025 Candidate Forum", shortGoal: "Fostering informed civic participation.", status: "Upcoming: September 25, 2025", description: "Providing a non-partisan platform for Mayoral and Council candidates to engage with residents, ensuring informed participation in our local democracy.", image: "https://placehold.co/600x400/CCCCCC/FFFFFF?text=Candidate+Forum", partnerOrganizations: ["League of Women Voters of the Greater Princeton Area"], redirectTo: "Events" },
    { id: 2, slug: "princeton-junction-station-improvement", title: "Princeton Junction Station Improvement Project", shortGoal: "Revitalizing our key transit hub.", goal: "To transform the Princeton Junction Station into a welcoming, aesthetically appealing, and culturally reflective community hub that serves all users.", status: "Early Planning & Proposal Development", description: "This is a proposed comprehensive project to transform Princeton Junction Station—a vital asset serving over 4,000 NJ TRANSIT passengers daily and 123,000+ Amtrak passengers annually—into a vibrant community hub. We are developing plans for beautification efforts, community art installations, environmental initiatives, and programming to enhance the daily experience for thousands of commuters while fostering community pride and connectivity. Currently in early planning stages with proposals being developed for potential partnerships.", impact: "Enhanced commuter experience for thousands of daily users, strengthened community identity through public art, environmental benefits through recycling and beautification programs, increased community engagement through events and programming, and preserved infrastructure value through maintenance and improvements.", timeline: [{ stage: "Completed: Concept Development & Research", details: "Initial research completed on station usage, community needs, and potential improvement opportunities. Concept proposal drafted.", completed: true }, { stage: "In Progress: Stakeholder Outreach & Partnership Development", details: "Reaching out to NJ TRANSIT, West Windsor Parking Authority, and community organizations to gauge interest and explore potential partnerships.", completed: false }, { stage: "Upcoming: Community Input & Proposal Refinement", details: "Gathering community feedback on proposed improvements and refining plans based on resident input and partnership possibilities.", completed: false }, { stage: "Upcoming: Implementation Planning", details: "If partnerships are established, develop detailed implementation timeline and begin coordination with relevant authorities.", completed: false }], getInvolved: "Share your ideas for station improvements, express interest in volunteering for future cleanup or beautification efforts, connect us with relevant community organizations, or let us know what would make your commuting experience better.", image: "https://placehold.co/600x400/E0F2FE/0C4A6E?text=Princeton+Junction", partnerOrganizations: [], fundingSources: [], initiatives: [{ title: "Beautification & Maintenance", description: "Potential regular cleanup, landscaping, and seasonal decorations", icon: <IconLightBulb />, status: "Concept Phase" }, { title: "Art & Cultural Enhancement", description: "Proposed community murals, decorative elements, and cultural programming", icon: <IconPhotograph />, status: "Concept Phase" }, { title: "Environmental Initiatives", description: "Exploring recycling programs and sustainable improvements", icon: <IconRecycle />, status: "Concept Phase" }, { title: "Community Programming", description: "Ideas for events and community engagement opportunities", icon: <IconUsers />, status: "Concept Phase" }] },
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
});

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

// A new component for the calendar dropdown
const CalendarDropdown: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

    // Function to open Google Calendar in a new tab
    const addToGoogleCalendar = useCallback(() => {
        const eventTitle = encodeURIComponent("West Windsor Forward 2025 Candidate Forum");
        const eventDescription = encodeURIComponent("Join us for a non-partisan candidate forum to meet mayoral and council candidates and engage in a community Q&A session. This event fosters informed civic participation and transparent leadership.\n\nDate: Thursday, September 25th, 2025\nTime: 7:00 PM - 9:15 PM\nLocation: Kelsey Theatre at Mercer County Community College\n\nFor more details, visit our website: https://www.westwindsorforward.org/events");
        const eventLocation = encodeURIComponent("Kelsey Theatre at Mercer County Community College, West Windsor, NJ");
        const startDate = "20250925T190000";
        const endDate = "20250925T211500";

        const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startDate}/${endDate}&details=${eventDescription}&location=${eventLocation}`;
        window.open(googleCalendarUrl, '_blank');
        setIsOpen(false);
    }, []);

    // Function to generate and download an ICS file for iCal and Outlook
    const downloadIcsFile = useCallback(() => {
        const eventTitle = "West Windsor Forward 2025 Candidate Forum";
        const eventDetails = "Join us for a non-partisan candidate forum to meet mayoral and council candidates and engage in a community Q&A session. This event fosters informed civic participation and transparent leadership.\n\nDate: September 25th, 2025\nTime: 7:00 PM - 9:15 PM\nLocation: Kelsey Theatre at Mercer County Community College\n\nFor more details, visit: https://www.westwindsorforward.org/events";
        const eventLocation = "Kelsey Theatre at Mercer County Community College";
        const startDate = "20250925T190000";
        const endDate = "20250925T211500";
        
        const icsData = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//WestWindsorForward//WWF Events//EN",
            "BEGIN:VEVENT",
            `UID:wwf-forum-2025@westwindsorforward.org`,
            `DTSTAMP:${new Date().toISOString().replace(/[-:.]/g, "").substring(0, 15)}Z`,
            `DTSTART:${startDate}`,
            `DTEND:${endDate}`,
            `SUMMARY:${eventTitle}`,
            `DESCRIPTION:${eventDetails}`,
            `LOCATION:${eventLocation}`,
            "END:VEVENT",
            "END:VCALENDAR"
        ].join("\n");
        
        const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", "wwf_candidate_forum_2025.ics");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);

        setIsOpen(false);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 ease-in-out transform hover:scale-103 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-75 shadow-md hover:shadow-lg will-change-transform bg-sky-600 hover:bg-sky-700 text-white focus:ring-sky-500 px-6 py-3 text-sm sm:text-base"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <IconCalendar className="mr-2 h-5 w-5" />
                Add to Calendar
                <IconChevronDown className={`ml-2 -mr-1 h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-full sm:w-64 origin-top-right bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none animate-fadeIn z-20">
                    <div className="py-1">
                        <button
                            onClick={addToGoogleCalendar}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Google Calendar
                        </button>
                        <button
                            onClick={downloadIcsFile}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            iCal / Outlook
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const ForumHeader: FC = () => {
    return (
        <header className="relative bg-gradient-to-br from-slate-900 via-sky-800 to-indigo-900 text-white py-12 sm:py-16 md:py-20 px-4 rounded-b-2xl shadow-2xl overflow-hidden">
            <DotPattern dotColor="text-sky-700 opacity-10" rows={8} cols={10} />
            <div className="relative z-10 container mx-auto text-center">
                <div className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold mb-4 animate-pulse"> <span className="inline-block w-2 h-2 bg-white rounded-full mr-2"></span> UPCOMING EVENT </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"> 2025 Candidate Forum </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-sky-200 mb-6 max-w-3xl mx-auto"> Empowering West Windsor voters with direct access to candidates for Mayor and Township Council </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
                    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4"> <div className="font-semibold">{forumData.date}</div> <div className="text-sm text-sky-200">{forumData.time}</div> </div>
                    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4"> <div className="font-semibold">Kelsey Theatre</div> <div className="text-sm text-sky-200">@ MCCC West Windsor</div> </div>
                    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4"> <div className="font-semibold">Live Streamed</div> <div className="text-sm text-sky-200">YouTube & Recording</div> </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <CalendarDropdown />
                    <Button type="secondary" size="lg" icon={<IconDocument />} onClick={() => window.open("https://placehold.co/100x100/CCCCCC/FFFFFF?text=Document", "_blank")}> View Official Release </Button>
                </div>
            </div>
        </header>
    );
};

const ProgressSection: FC = () => (
    <Card className="bg-gradient-to-r from-sky-50 to-indigo-50 border-sky-200 p-0">
        <div className="p-4 sm:p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4"> Forum Milestones </h2>
            <div className="grid gap-4">
                {forumData.milestones.map((milestone) => (
                    <div key={milestone.id} className={`flex items-start p-4 rounded-lg border-l-4 ${milestone.completed ? "border-green-500 bg-green-50" : "border-sky-500 bg-sky-50"}`}>
                        <div className="mr-3 mt-1"> {milestone.completed ? <IconCheckCircle className="h-6 w-6 text-green-600" /> : <IconClock className="h-6 w-6 text-sky-600" />} </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-slate-800 mb-1">{milestone.title}</h3>
                            <p className="text-sm text-slate-600 mb-2">{milestone.description}</p>
                            <span className="text-xs font-medium text-slate-500">{milestone.date}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </Card>
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
                <div className="grid md:grid-cols-3 gap-6">
                    {forumData.forumParts.map((part) => (
                        <div key={part.id} className="relative bg-gradient-to-br from-slate-50 to-sky-50 p-6 rounded-xl border border-sky-200 hover:shadow-lg transition-all duration-300">
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

// New component for press coverage
const PressCoverageSection: FC = () => (
    <Card className="p-0">
        <div className="p-4 sm:p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 text-center"> In the News </h2>
            <div className="grid md:grid-cols-3 gap-6">
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
                <div className="grid md:grid-cols-3 gap-6">
                    {forumData.panelists.map((panelist) => (
                        <div key={panelist.id} className="flex flex-col">
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

const InteractiveSection: FC = () => {
    const [activeTab, setActiveTab] = useState("questions");

    const questionFormConfig = {
        url: "https://docs.google.com/forms/d/e/1FAIpQLSd-meCtFz2waEZGDfLqaoc4Se4WGOT3H4053aHiri-GMnl4Mw/formResponse",
        fields: { position: "entry.218113281", topic: "entry.1239370203", question: "entry.1618585724", comment: "entry.1917106770" },
    };
    
    return (
        <Card className="bg-gradient-to-br from-slate-50 to-sky-50 p-0">
            <div className="p-4 sm:p-6 md:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 text-center"> Get Involved </h2>
                <div className="flex flex-col sm:flex-row mb-6 bg-white rounded-lg p-1">
                    <button onClick={() => setActiveTab("questions")} className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center ${activeTab === "questions" ? "bg-sky-600 text-white" : "text-slate-600 hover:text-sky-600"}`}> <IconQuestionMark className="h-4 w-4 mr-2" /> Suggest Questions </button>
                    <button onClick={() => setActiveTab("volunteer")} className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center ${activeTab === "volunteer" ? "bg-sky-600 text-white" : "text-slate-600 hover:text-sky-600"}`}> <IconUsers className="h-4 w-4 mr-2" /> Volunteer </button>
                </div>
                {activeTab === "questions" && (
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center"> <IconQuestionMark className="mr-2" /> Suggest A Question or Topic </h3>
                        <GoogleFormComponent formUrl={questionFormConfig.url} fieldMapping={questionFormConfig.fields}>
                            <CandidateQuestionForm handleChange={() => {}} formData={{}} />
                        </GoogleFormComponent>
                    </div>
                )}
                {activeTab === "volunteer" && (
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center"> <IconUsers className="mr-2" /> Volunteer for the Forum </h3>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                            <p className="text-sm text-green-800 flex items-start">
                                <IconInfo className="mr-2 mt-0.5 flex-shrink-0" />
                                Our official volunteer sign-up page is coming soon! For now, please email us to express your interest.
                            </p>
                        </div>
                        <p className="text-sm text-slate-600 mb-4"> Help make this important civic event a success! We need volunteers for various roles throughout the event. </p>
                        <Button
                            type="success"
                            onClick={() => { window.location.href = "mailto:contact@westwindsorforward.org?subject=Volunteer%20Interest%20for%20Candidate%20Forum"; }}
                            icon={<IconMail />}
                            className="w-full sm:w-auto"
                        >
                            Email to Sign Up
                        </Button>
                    </div>
                )}
            </div>
        </Card>
    );
};

const KeyInformationSection: FC = () => {
    const [expandedSection, setExpandedSection] = useState<string | null>(null);
    const infoSections = [
        { id: "attendance", title: "For Attendees", icon: <IconUsers />, content: <div className="space-y-4"> <div> <h4 className="font-semibold text-slate-800 mb-2">Why Attend?</h4> <ul className="space-y-2 text-sm text-slate-600"> <li>• Hear directly from candidates beyond campaign materials</li> <li> • Get answers to community questions during town hall session </li> <li>• Engage with fellow residents on important local issues</li> <li>• Meet candidates personally during informal session</li> <li>• Connect with local community organizations</li> </ul> </div> <div> <h4 className="font-semibold text-slate-800 mb-2"> What to Expect </h4> <p className="text-sm text-slate-600"> In-person admission to the forum is free. The event will be live-streamed on YouTube for those unable to attend in person. Audience members are expected to maintain respectful behavior during moderated portions. </p> </div> </div> },
        { id: "candidates", title: "For Candidates", icon: <IconMicrophone />, content: <div className="space-y-4"> <div> <h4 className="font-semibold text-slate-800 mb-2"> Participation Benefits </h4> <ul className="space-y-2 text-sm text-slate-600"> <li>• Present your platform to engaged community audience</li> <li>• Reach broader audience through live streaming</li> <li>• Participate in fair, moderated discussion format</li> <li>• Connect directly with voters during meet-and-greet</li> </ul> </div> <div> <h4 className="font-semibold text-slate-800 mb-2">Requirements</h4> <p className="text-sm text-slate-600"> Candidates must arrive by 6:30 PM for briefing, agree to ground rules including professional conduct and time limits, and sign participation agreement by September 10th, 2025. </p> </div> </div> },
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
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2 flex items-center"> <IconExternalLink className="h-4 w-4 mr-2" /> Complete Documentation </h3>
                    <p className="text-sm text-blue-700 mb-3"> For complete ground rules, candidate agreements, and detailed guidelines, view our official documents. </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Button type="secondary" size="sm" onClick={() => window.open("https://placehold.co/100x100/CCCCCC/FFFFFF?text=Document", "_blank")} icon={<IconDocument />}> Public Release PDF </Button>
                        <Button type="secondary" size="sm" onClick={() => window.open("https://placehold.co/100x100/CCCCCC/FFFFFF?text=Document", "_blank")} icon={<IconDocument />}> Candidate Agreement </Button>
                    </div>
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
                                <h3 className="text-lg sm:text-xl font-semibold text-sky-700"> 2025 Candidate Forum </h3>
                                <p className="text-xs sm:text-sm text-gray-600 mb-3 flex-grow"> Providing a non-partisan platform for Mayoral and Council candidates to engage with residents, ensuring informed participation in our local democracy. </p>
                                <Button onClick={() => setActivePage("Events")} type="secondary" className="mt-auto w-full sm:w-auto text-xs"> Event Details </Button>
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
        { name: "Parth Gupta", role: "Co-Founder", bio: "A West Windsor resident for 14 years and student at the Lawrenceville School. Parth is a runner for the Lawrenceville School as part of their cross-country and track and field teams. Parth has been playing piano for 10 years and has co-organized piano Performathons to raise money for the Children's Hospital of Philadelphia.", image: "https://placehold.co/150x150/E0F2FE/0C4A6E?text=PG" },
        { name: "Darshan Chidambaram", role: "Co-Founder", bio: "A West Windsor resident for 8 years and a student at the Lawrenceville School. Darshan is an active tennis player for the Lawrenceville School and debater on the national debate circuit.", image: "https://placehold.co/150x150/E0F2FE/0C4A6E?text=DC" },
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
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{project.shortGoal}</p>
                <div className="mb-4"> <span className="inline-block text-xs font-medium px-2 py-1 bg-sky-100 text-sky-700 rounded-full">{project.status}</span> </div>
                <div className="flex-grow">
                    {project.partnerOrganizations && project.partnerOrganizations.length > 0 && (
                        <>
                            <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1"> Partners: </h4>
                            <div className="flex flex-wrap gap-1"> {project.partnerOrganizations.map((org) => ( <span key={org} className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">{org}</span> ))} </div>
                        </>
                    )}
                </div>
            </div>
            <div className="px-4 sm:px-6 pb-4 sm:pb-6 mt-auto">
                <Button onClick={handleButtonClick} type="secondary" className="w-full text-xs"> {project.redirectTo ? "View Event Details" : "View Project Details"} </Button>
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
                        <div className="mt-8 sm:mt-10 p-4 sm:p-6 bg-sky-50 rounded-lg border border-sky-200">
                            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-sky-700 mb-3"> How You Can Contribute </h2> <p className="text-gray-700 leading-relaxed mb-4 text-xs sm:text-sm md:text-base">{project.getInvolved}</p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button onClick={() => setActivePage("Contact")} icon={<IconUsers />} className="text-xs sm:text-sm"> Volunteer or Offer Support </Button>
                                {project.id === 2 && <Button onClick={() => window.open("https://placehold.co/100x100/CCCCCC/FFFFFF?text=Document", "_blank")} type="secondary" icon={<IconDocument />} className="text-xs sm:text-sm"> Read Full Proposal </Button>}
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

const EventsPage: FC<PageProps> = ({ setActivePage }) => (
    <div className="min-h-screen bg-slate-100 font-body text-slate-700">
        <ForumHeader />
        <div className="container mx-auto px-4 py-8 space-y-8">
            <ProgressSection />
            <ForumFormatSection />
            <PanelistSection />
            <InteractiveSection />
            <KeyInformationSection />
            {/* Moved "In the News" section here */}
            <PressCoverageSection />
            <Card className="text-center bg-gradient-to-r from-sky-600 to-indigo-600 text-white p-0">
                <div className="p-4 sm:p-6 md:p-8">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4"> Be Part of West Windsor's Democratic Process </h2>
                    <p className="text-sky-100 mb-6 max-w-2xl mx-auto"> Your participation makes our community stronger. Whether as an attendee, volunteer, or question submitter, your voice matters in shaping West Windsor's future. </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button onClick={() => setActivePage("Contact")} type="secondary" size="lg" icon={<IconMail />}> Contact Us </Button>
                        <Button onClick={() => setActivePage("About")} type="secondary" size="lg" icon={<IconExternalLink />}> Learn More About Us </Button>
                    </div>
                </div>
            </Card>
        </div>
    </div>
);

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
            {/* Background decoration */}
            <DotPattern dotColor="text-sky-400 opacity-10" rows={12} cols={15} />
            
            <div className="relative z-10 container mx-auto py-12 sm:py-16 md:py-20 px-4 animate-fadeIn">
                {/* Header Section */}
                <div className="text-center mb-12 sm:mb-16">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                        Contact <span className="text-sky-600">West Windsor Forward</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Ready to make a difference in our community? We'd love to hear from you.
                    </p>
                </div>

                <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-7xl mx-auto">
                    {/* Contact Information - Left Side */}
                    <div className="lg:col-span-2">
                        <Card className="bg-gradient-to-br from-sky-600 to-indigo-700 text-white p-0 transform hover:scale-105 transition-all duration-300" noHoverEffect>
                            <div className="relative p-4 sm:p-6 lg:p-8">
                                <DotPattern dotColor="text-white opacity-10" rows={6} cols={8} />
                                <div className="relative z-10">
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6"> Let's Connect </h2>
                                    <p className="text-sky-100 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                                        We welcome your questions, ideas, and partnership opportunities. Together, we can create positive change in West Windsor.
                                    </p>
                                    
                                    {/* Contact Methods */}
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
                                                <a href="https://www.facebook.com/profile.php?id=61575121893868" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-all duration-200 group text-sm sm:text-base">
                                                    <IconFacebook className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                                                    <span>Facebook</span>
                                                    <IconExternalLink className="h-3 w-3 sm:h-4 sm:w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                                </a>
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

                                    {/* Response Time */}
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

                    {/* Contact Form - Right Side */}
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

                {/* Call to Action Section */}
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
            case 'Events': url = '/events'; title = '2025 Candidate Forum - West Windsor Forward'; break;
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
            {activePage === "Home" && <AnnouncementBar onNavigateToEvents={() => navigateToPage("Events")} />}
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
      .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 { margin-bottom: 0.5em; margin-top: 1em; }
      .prose p { margin-bottom: 1em; line-height: 1.7; }
      .prose ul, .prose ol { margin-left: 1.5em; margin-bottom: 1em; }
      .prose li { margin-bottom: 0.25em; }
      
      /* Optimized animations with hardware acceleration */
      @keyframes fadeIn {
        from { opacity: 0; transform: translate3d(0, 15px, 0); }
        to { opacity: 1; transform: translate3d(0, 0, 0); }
      }
      .animate-fadeIn {
        animation: fadeIn 0.6s ease-out forwards;
        will-change: transform, opacity;
      }
      
      @keyframes slideDown {
        from { opacity: 0; transform: translate3d(0, -10px, 0); }
        to { opacity: 1; transform: translate3d(0, 0, 0); }
      }
      .animate-slideDown {
        animation: slideDown 0.3s ease-out forwards;
        will-change: transform, opacity;
      }
      
      @keyframes pulse-slow {
        0%, 100% { opacity: 0.05; }
        50% { opacity: 0.15; }
      }
      .animate-pulse-slow {
        animation: pulse-slow 5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        will-change: opacity;
      }
      
      /* Optimize hover effects */
      .group:hover .dot-pattern-animated div div {
        transform: scale3d(1.5, 1.5, 1);
        opacity: 0.5;
        will-change: transform, opacity;
      }
      
      /* Better line clamping */
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
      
      /* Performance improvements */
      * {
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
      }
      
      /* Reduce motion for users who prefer it */
      @media (prefers-reduced-motion: reduce) {
        .animate-fadeIn,
        .animate-slideDown,
        .animate-pulse-slow {
          animation: none;
        }
        
        .transition-all,
        .transition-transform,
        .transition-colors {
          transition: none;
        }
      }
      
      /* Optimize images */
      img {
        image-rendering: -webkit-optimize-contrast;
        image-rendering: crisp-edges;
      }
    `;
    document.head.appendChild(styleSheet);

    const fontLinkLora = document.createElement("link");
    fontLinkLora.rel = "stylesheet";
    fontLinkLora.href = "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600;1,700&display=swap";
    document.head.appendChild(fontLinkLora);
}
