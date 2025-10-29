import React, { useState, useEffect, useRef, useCallback } from "react";

// --- (Firebase Imports) ---
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword, // This is now ONLY used in a (soon-to-be-deleted) mock
  signInWithEmailAndPassword,
  signOut,
  IdTokenResult,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// --- (SVG Icon Components) ---
// (All your inline SVG components remain unchanged)
const Icon = ({ size = 24, children, className = "", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {children}
  </svg>
);
const Home = ({ size, className }) => (
  <Icon size={size} className={className}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </Icon>
);
const CheckCircle = ({ size, className }) => (
  <Icon size={size} className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </Icon>
);
const FileText = ({ size, className }) => (
  <Icon size={size} className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </Icon>
);
const MapPin = ({ size, className }) => (
  <Icon size={size} className={className}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </Icon>
);
const AlertCircle = ({ size, className }) => (
  <Icon size={size} className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </Icon>
);
const User = ({ size, className }) => (
  <Icon size={size} className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </Icon>
);
const LogIn = ({ size, className }) => (
  <Icon size={size} className={className}>
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
    <polyline points="10 17 15 12 10 7"></polyline>
    <line x1="15" y1="12" x2="3" y2="12"></line>
  </Icon>
);
const LogOut = ({ size, className }) => (
  <Icon size={size} className={className}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </Icon>
);
const Settings = ({ size, className }) => (
  <Icon size={size} className={className}>
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </Icon>
);
const Users = ({ size, className }) => (
  <Icon size={size} className={className}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </Icon>
);
const BarChart2 = ({ size, className }) => (
  <Icon size={size} className={className}>
    <line x1="18" y1="20" x2="18" y2="10"></line>
    <line x1="12" y1="20" x2="12" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="14"></line>
  </Icon>
);
const Send = ({ size, className }) => (
  <Icon size={size} className={className}>
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </Icon>
);
const ArrowRight = ({ size, className }) => (
  <Icon size={size} className={className}>
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </Icon>
);
const Loader2 = ({ size, className }) => (
  <Icon size={size} className={className}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
  </Icon>
);
const ImageIcon = ({ size, className }) => (
  <Icon size={size} className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <circle cx="8.5" cy="8.5" r="1.5"></circle>
    <polyline points="21 15 16 10 5 21"></polyline>
  </Icon>
);
const X = ({ size, className }) => (
  <Icon size={size} className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </Icon>
);
const UploadCloud = ({ size, className }) => (
  <Icon size={size} className={className}>
    <polyline points="16 16 12 12 8 16"></polyline>
    <line x1="12" y1="12" x2="12" y2="21"></line>
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
    <polyline points="16 16 12 12 8 16"></polyline>
  </Icon>
);
const ChevronLeft = ({ size, className }) => (
  <Icon size={size} className={className}>
    <polyline points="15 18 9 12 15 6"></polyline>
  </Icon>
);
const Search = ({ size, className }) => (
  <Icon size={size} className={className}>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </Icon>
);
const Inbox = ({ size, className }) => (
  <Icon size={size} className={className}>
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
  </Icon>
);
const Clock = ({ size, className }) => (
  <Icon size={size} className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </Icon>
);
const MessageSquare = ({ size, className }) => (
  <Icon size={size} className={className}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </Icon>
);
const Eye = ({ size, className }) => (
  <Icon size={size} className={className}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </Icon>
);
const Trash2 = ({ size, className }) => (
  <Icon size={size} className={className}>
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </Icon>
);
const UserPlus = ({ size, className }) => (
  <Icon size={size} className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="8.5" cy="7" r="4"></circle>
    <line x1="20" y1="8" x2="20" y2="14"></line>
    <line x1="23" y1="11" x2="17" y2="11"></line>
  </Icon>
);
const Shield = ({ size, className }) => (
  <Icon size={size} className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </Icon>
);
const Edit = ({ size, className }) => (
  <Icon size={size} className={className}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </Icon>
);
const Star = ({ size, className }) => (
  <Icon size={size} className={className}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </Icon>
);
const Zap = ({ size, className }) => (
  <Icon size={size} className={className}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </Icon>
);
const Bot = ({ size, className }) => (
  <Icon size={size} className={className}>
    <path d="M12 8V4H8"></path>
    <rect x="4" y="12" width="16" height="8" rx="2"></rect>
    <path d="M4 12v-2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2"></path>
    <path d="M12 16.5v.01"></path>
    <path d="M8 16.5v.01"></path>
    <path d="M16 16.5v.01"></path>
  </Icon>
);
const Lock = ({ size, className }) => (
  <Icon size={size} className={className}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </Icon>
);

// --- (Firebase Configuration) ---
// This now reads directly from your Vercel Environment Variables
// Make sure you have added VITE_FIREBASE_... keys to your Vercel project!
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Check that config is populated
if (!firebaseConfig.apiKey) {
  console.error(
    "Firebase config is missing. Make sure VITE_FIREBASE_... environment variables are set."
  );
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// --- (Global Constants) ---
// (Constants like MERCER_COUNTY_POTHOLE_URL, ISSUE_CATEGORIES, etc. remain unchanged)
const MERCER_COUNTY_POTHOLE_URL =
  "https://www.mercercounty.org/i-want-to/report-a-pothole";
const STATE_POTHOLE_URL = "https://www.njdotproblemreporting.com/";

const WEST_WINDSOR_COUNTY_ROADS = new Set([
  "Clarksville Rd",
  "Cranbury Rd",
  "Edinburg Rd",
  "Edinburg-Windsor Rd",
  "Lower Harrison St",
  "Old Trenton Rd",
  "Princeton-Hightstown Rd",
  "Quakerbridge Rd",
  "Robbinsville-Edinburg Rd",
  "S Mill Rd",
  "S Post Rd",
  "Village Rd E",
  "Washington Rd",
]);

const WEST_WINDSOR_STATE_ROADS = new Set([
  "US 1",
  "US-1",
  "Route 1",
  "Brunswick Pike", // US-1
  "Route 571", // This is Princeton-Hightstown & Washington Rd, but good to have a generic
  "US 130",
  "US-130",
  "Route 130", // Borders the township
  "I-95",
  "I-295", // Interstates
]);

const ISSUE_CATEGORIES = [
  "Pothole/Road Damage",
  "Streetlight Outage",
  "Traffic Signal Issue",
  "Graffiti",
  "Illegal Dumping",
  "Missed Trash/Recycling",
  "Park Maintenance",
  "Tree Issue",
  "Snow Removal",
  "Water/Sewer Issue",
  "Sidewalk Repair",
  "Drainage Problem",
  "Animal Control",
  "Noise Complaint",
  "Code Violation",
  "Other",
];

const REQUEST_STATUSES = {
  NEW: "New",
  IN_PROGRESS: "In Progress",
  RESOLVED: "Resolved",
  CLOSED: "Closed",
};

const REQUEST_PRIORITIES = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  EMERGENCY: "Emergency",
};

const STAFF_ROLES = {
  ADMIN: "admin",
  MANAGER: "manager",
  WORKER: "worker",
  DEVELOPER: "developer",
};

// --- (Utility Functions) ---
// (formatTimestamp and getRoadJurisdiction remain unchanged)
const formatTimestamp = (timestamp) => {
  if (!timestamp) return "N/A";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const getRoadJurisdiction = (streetAddress) => {
  if (!streetAddress) return { jurisdiction: "TOWNSHIP", url: null };

  const lowerAddress = streetAddress.toLowerCase();

  for (const road of WEST_WINDSOR_STATE_ROADS) {
    if (lowerAddress.includes(road.toLowerCase())) {
      return {
        jurisdiction: "STATE",
        url: STATE_POTHOLE_URL,
        name: road,
      };
    }
  }

  for (const road of WEST_WINDSOR_COUNTY_ROADS) {
    if (lowerAddress.includes(road.toLowerCase())) {
      return {
        jurisdiction: "COUNTY",
        url: MERCER_COUNTY_POTHOLE_URL,
        name: road,
      };
    }
  }

  return { jurisdiction: "TOWNSHIP", url: null };
};

// --- (API Call Functions) ---
// These now call our Vercel Serverless Functions.

/**
 * Calls the backend API to get Vertex AI triage analysis.
 * @param {string} description - The request description.
 * @param {string} category - The selected category.
 * @returns {Promise<object>} An AI analysis.
 */
const callVertexAI = async (description, category) => {
  console.log("[API] Calling /api/ai-triage");
  try {
    // Note: The backend handler for this route must be named 'ai-triage.cjs'
    const response = await fetch("/api/ai-triage", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description, category }),
    });

    if (!response.ok) {
      // IMPROVED ERROR HANDLING: Read as text to prevent crash if response is non-JSON (e.g., Vercel error page)
      const errorText = await response.text();
      console.error("AI Triage API failed with status:", response.status, "body:", errorText);
      throw new Error(`AI Triage API failed: ${response.statusText}`);
    }

    const analysis = await response.json();
    console.log("[API] Received AI analysis:", analysis);
    return analysis;
  } catch (error) {
    console.error("Error calling AI Triage:", error);
    // This allows the submission to proceed with default values if the AI fails
    return {
      suggestedPriority: REQUEST_PRIORITIES.MEDIUM,
      suggestedDepartment: "Public Works",
      estimatedResponseTime: "3-5 business days",
      reasoning: `AI analysis failed: ${error.message}. Defaulting to Medium.`, 
    };
  }
};

/**
 * Calls the backend API for Vertex AI photo analysis.
 * @param {string} imageUrl - The URL of the uploaded image.
 * @returns {Promise<object|null>} An AI photo analysis or null.
 */
const callVertexAIPhoto = async (imageUrl) => {
  console.log("[API] Calling /api/ai-analyze-image");
  try {
    // Note: The backend handler for this route must be named 'ai-analyze-image.cjs'
    const response = await fetch("/api/ai-analyze-image", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl }),
    });

    if (!response.ok) {
      // IMPROVED ERROR HANDLING
      const errorText = await response.text();
      console.error("AI Photo API failed with status:", response.status, "body:", errorText);
      throw new Error(`AI Photo API failed: ${response.statusText}`);
    }

    const analysis = await response.json();
    console.log("[API] Received AI photo analysis:", analysis);
    return analysis;
  } catch (error) {
    console.error("Error calling AI Photo Analysis:", error);
    throw error; // Re-throw the error so the caller can catch it and log a specific internal note
  }
};

/**
 * Calls the backend API to send an email via Mailgun.
 * @param {string} to - The recipient's email.
 * @param {string} subject - The email subject.
 * @param {string} body - The email body.
 */
const sendApiEmail = async (to, subject, body) => {
  console.log("[API] Calling /api/send-email");
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, subject, body }),
    });

    if (!response.ok) {
      console.error("Send email API failed:", await response.text());
    } else {
      console.log("[API] Email sent successfully.");
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

/**
 * Calls the backend API to send an SMS via Twilio.
 * @param {string} to - The recipient's phone number.
 * @param {string} body - The text message body.
 */
const sendApiText = async (to, body) => {
  console.log("[API] Calling /api/send-sms");
  try {
    const response = await fetch("/api/send-sms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, body }),
    });

    if (!response.ok) {
      console.error("Send SMS API failed:", await response.text());
    } else {
      console.log("[API] SMS sent successfully.");
    }
  } catch (error) {
    console.error("Error sending SMS:", error);
  }
};

// --- (Main Application Component) ---
export default function App() {
  // --- State Management ---
  const [view, setView] = useState("resident");
  const [staffView, setStaffView] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [staffProfile, setStaffProfile] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [publicRequests, setPublicRequests] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [trackingId, setTrackingId] = useState("");
  const [trackedRequest, setTrackedRequest] = useState(null);

  // --- Firebase Auth Effect ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setIsAuthLoading(true);
      if (currentUser) {
        setUser(currentUser);
        const staffDocRef = doc(db, `users`, currentUser.uid);
        const staffDocSnap = await getDoc(staffDocRef);

        if (staffDocSnap.exists()) {
          const profile = { id: staffDocSnap.id, ...staffDocSnap.data() };
          setStaffProfile(profile);
          setView("staff");
          setStaffView("dashboard");
        } else {
          console.warn("User authenticated but no staff profile found.");
          setStaffProfile(null);
          setView("staffLogin");
        }
      } else {
        setUser(null);
        setStaffProfile(null);
        if (view === "staff") {
          setView("staffLogin");
        }
      }
      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, [view]);

  // --- Firebase Firestore Data Listeners ---

  // Listener for ALL requests (for staff)
  useEffect(() => {
    if (!staffProfile) return;

    const requestsCollectionRef = collection(db, `requests`);
    const q = query(requestsCollectionRef);

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const requestsData = [];
        querySnapshot.forEach((doc) => {
          requestsData.push({ id: doc.id, ...doc.data() });
        });
        requestsData.sort(
          (a, b) => (b.createdAt?.toDate() || 0) - (a.createdAt?.toDate() || 0)
        );
        setRequests(requestsData);
      },
      (err) => {
        console.error("Error fetching requests:", err);
        setError("Failed to load requests.");
      }
    );

    return () => unsubscribe();
  }, [staffProfile]);

  // Listener for PUBLIC requests (for residents)
  useEffect(() => {
    const requestsCollectionRef = collection(db, `requests`);
    const q = query(requestsCollectionRef);

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const publicData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          publicData.push({
            id: doc.id,
            category: data.category,
            status: data.status,
            address: data.address,
            createdAt: data.createdAt,
            lastUpdatedAt: data.lastUpdatedAt,
          });
        });
        publicData.sort(
          (a, b) => (b.createdAt?.toDate() || 0) - (a.createdAt?.toDate() || 0)
        );
        setPublicRequests(publicData);
      },
      (err) => {
        console.error("Error fetching public requests:", err);
      }
    );

    return () => unsubscribe();
  }, []);

  // Listener for Staff List (for Admins)
  useEffect(() => {
    if (staffProfile && staffProfile.role === STAFF_ROLES.ADMIN) {
      const staffCollectionRef = collection(db, `users`);
      const unsubscribe = onSnapshot(
        staffCollectionRef,
        (querySnapshot) => {
          const staffData = [];
          querySnapshot.forEach((doc) => {
            staffData.push({ id: doc.id, ...doc.data() });
          });
          setStaffList(staffData);
        },
        (err) => {
          console.error("Error fetching staff list:", err);
        }
      );

      return () => unsubscribe();
    }
  }, [staffProfile]);

  // --- Core Functions ---

  const handleStaffLogin = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Auth effect will handle redirect
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.message);
    }
    setIsLoading(false);
  };

  const handleStaffLogout = async () => {
    setIsLoading(true);
    await signOut(auth);
    setView("resident");
    setStaffProfile(null);
    setUser(null);
    setIsLoading(false);
  };

  /**
   * Handles submission of a new 311 request from the resident portal.
   * @param {object} formData - The request data from the form.
   * @param {File} photoFile - The uploaded photo file.
   */
  const handleRequestSubmit = async (formData, photoFile) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const newRequestId = doc(collection(db, "requests")).id;
    let aiAnalysis;

    try {
      // --- 1. AI Triage (CRITICAL API CALL - MUST SUCCEED) ---
      // This step must succeed for the request to be triaged
      aiAnalysis = await callVertexAI(
        formData.description,
        formData.category
      );

      let imageUrl = null;
      let aiPhotoAnalysis = null;
      let photoErrorNote = null; // New variable to capture photo-related errors

      // --- 2. UPLOAD PHOTO & 3. AI PHOTO ANALYSIS (NON-CRITICAL) ---
      if (photoFile) {
        try {
          const storageRef = ref(
            storage,
            `uploads/${newRequestId}/${photoFile.name}`
          );
          const snapshot = await uploadBytes(storageRef, photoFile);
          imageUrl = await getDownloadURL(snapshot.ref);

          // Nested try/catch for AI Photo Analysis
          try {
            aiPhotoAnalysis = await callVertexAIPhoto(imageUrl);
          } catch (photoAnalysisErr) {
            // Non-critical failure for photo analysis
            console.error("AI Photo Analysis Failed (non-critical):", photoAnalysisErr.message);
            photoErrorNote = `AI Photo Analysis Failed: ${photoAnalysisErr.message}. Staff review needed.`;
          }
        } catch (uploadErr) {
          // Catches errors if Firebase storage or the upload fails
          console.error("Photo Upload Failed (non-critical):", uploadErr.message);
          photoErrorNote = `Photo Upload Failed: ${uploadErr.message}. Image URL is null.`;
        }
      }

      // --- 4. Create PUBLIC Request Document in `/requests` ---
      const requestDocRef = doc(db, `requests`, newRequestId);
      
      const internalNotes = [
          {
              timestamp: serverTimestamp(),
              note: "AI TRIAGE: " + aiAnalysis.reasoning,
              user: "AI System",
          },
      ];

      // Add the photo error note if a non-critical error occurred
      if (photoErrorNote) {
          internalNotes.push({
              timestamp: serverTimestamp(),
              note: "PHOTO ISSUE: " + photoErrorNote,
              user: "System Warning",
          });
      }

      const newRequestData = {
        category: formData.category,
        description: formData.description,
        address: formData.issueAddress,
        location: formData.location,
        imageUrl: imageUrl,
        status: REQUEST_STATUSES.NEW,
        priority: aiAnalysis.suggestedPriority,
        assignedDepartment: aiAnalysis.suggestedDepartment,
        assignedTo: null,
        createdAt: serverTimestamp(),
        lastUpdatedAt: serverTimestamp(),
        history: [
          {
            timestamp: serverTimestamp(),
            action: "Request Submitted",
            user: "Resident",
          },
        ],
        comments: [],
        internalNotes: internalNotes, // Use the updated array
        aiTriage: aiAnalysis,
        aiPhotoAnalysis: aiPhotoAnalysis,
      };

      await setDoc(requestDocRef, newRequestData);

      // --- 5. Create PRIVATE Submitter Document in `/request_submitter_info` ---
      const submitterDocRef = doc(db, `request_submitter_info`, newRequestId);
      const submitterData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.submitterAddress,
        wantsTextAlerts: formData.wantsTextAlerts,
        createdAt: serverTimestamp(),
      };

      await setDoc(submitterDocRef, submitterData);

      // --- 6. Send Notifications (REAL API CALLS) ---
      const successMessage = `Your request (ID: ${newRequestId}) has been submitted.`;
      const emailBody = `
        Thank you, ${formData.name}, for submitting your request.
        
        Request ID: ${newRequestId}
        Category: ${formData.category}
        Status: ${REQUEST_STATUSES.NEW}
        
        You can track your request at any time using your Request ID.
      `;

      // Send email
      await sendApiEmail(
        formData.email,
        `Request Submitted: ${newRequestId}`,
        emailBody
      );

      // Send text
      if (formData.wantsTextAlerts && formData.phone) {
        await sendApiText(
          formData.phone,
          `West Windsor 311: Your request ${newRequestId} (${formData.category}) has been received.`
        );
      }

      setSuccess(successMessage);
      return newRequestId;
    } catch (err) {
      console.error("Failed to submit request:", err);
      // This block now mainly catches the Triage step failing (if AI is down/misconfigured)
      setError("An error occurred during submission. Please check if all fields are valid and try again.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles tracking a request from the resident portal.
   * @param {string} id - The request ID to track.
   */
  const handleTrackRequest = async (id) => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    setTrackedRequest(null);

    try {
      const docRef = doc(db, `requests`, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const publicData = {
          id: docSnap.id,
          category: data.category,
          description: data.description,
          address: data.address,
          status: data.status,
          priority: data.priority,
          imageUrl: data.imageUrl,
          createdAt: data.createdAt,
          lastUpdatedAt: data.lastUpdatedAt,
          history: data.history.map((h) => ({
            action: h.action,
            timestamp: h.timestamp,
            user: h.user === "Resident" ? "Resident" : "Township Staff",
          })),
          comments: data.comments,
        };
        setTrackedRequest(publicData);
      } else {
        setError("No request found with that ID.");
      }
    } catch (err) {
      console.error("Error tracking request:", err);
      setError("An error occurred while fetching your request.");
    }
    setIsLoading(false);
  };

  const navigateStaff = (view, id = null) => {
    setStaffView(view);
    if (id) {
      setSelectedRequestId(id);
    } else {
      setSelectedRequestId(null);
    }
  };

  // --- (Render Logic) ---
  if (isAuthLoading) {
    return <LoadingSpinner fullPage={true} />;
  }

  switch (view) {
    case "resident":
      return (
        <ResidentPortal
          setView={setView}
          handleRequestSubmit={handleRequestSubmit}
          isLoading={isLoading}
          error={error}
          success={success}
          setError={setError}
          setSuccess={setSuccess}
        />
      );
    case "residentTrack":
      return (
        <ResidentTrackPortal
          setView={setView}
          handleTrackRequest={handleTrackRequest}
          trackingId={trackingId}
          setTrackingId={setTrackingId}
          trackedRequest={trackedRequest}
          isLoading={isLoading}
          error={error}
          publicRequests={publicRequests}
        />
      );
    case "staffLogin":
      return (
        <StaffLogin
          setView={setView}
          handleStaffLogin={handleStaffLogin}
          isLoading={isLoading}
          error={error}
        />
      );
    case "staff":
      return (
        <StaffPortal
          user={user}
          profile={profile}
          handleLogout={handleStaffLogout}
          view={staffView}
          navigate={navigateStaff}
          requests={requests}
          selectedRequestId={selectedRequestId}
          staffList={staffList}
          setStaffList={setStaffList} // Pass for optimistic updates
          setError={setError}
          setSuccess={setSuccess}
          error={error}
          success={success}
        />
      );
    default:
      return <ResidentPortal setView={setView} />;
  }
}

// --- (Component: Resident Portal) ---
const ResidentPortal = ({
  setView,
  handleRequestSubmit,
  isLoading,
  error,
  success,
  setError,
  setSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    submitterAddress: "",
    category: "",
    description: "",
    issueAddress: "",
    location: null,
    wantsTextAlerts: false,
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [roadJurisdiction, setRoadJurisdiction] = useState({
    jurisdiction: "TOWNSHIP",
    url: null,
  });
  const [useMap, setUseMap] = useState(true);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    let jurisdiction = { jurisdiction: "TOWNSHIP", url: null };
    if (
      name === "issueAddress" &&
      formData.category === "Pothole/Road Damage"
    ) {
      jurisdiction = getRoadJurisdiction(value);
    }

    if (name === "category" && value === "Pothole/Road Damage") {
      jurisdiction = getRoadJurisdiction(formData.issueAddress);
    }

    setRoadJurisdiction(jurisdiction);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearPhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    // Ensure the input value is cleared as well
    const inputElement = document.getElementById("photo-upload") as HTMLInputElement;
    if (inputElement) {
        inputElement.value = "";
    }
  };

  const onLocationSelect = (address, latLng) => {
    setFormData((prev) => ({
      ...prev,
      issueAddress: address,
      location: latLng,
    }));
    if (formData.category === "Pothole/Road Damage") {
      setRoadJurisdiction(getRoadJurisdiction(address));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (roadJurisdiction.jurisdiction !== "TOWNSHIP") {
      setError(
        `This appears to be a ${roadJurisdiction.jurisdiction} road. Please submit your request directly to the correct agency.`
      );
      return;
    }
    if (!formData.category || !formData.description || !formData.issueAddress) {
      setError("Please fill in Category, Description, and Issue Address.");
      return;
    }

    const newId = await handleRequestSubmit(formData, photoFile);
    if (newId) {
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        submitterAddress: "",
        category: "",
        description: "",
        issueAddress: "",
        location: null,
        wantsTextAlerts: false,
      });
      clearPhoto();
      setRoadJurisdiction({ jurisdiction: "TOWNSHIP", url: null });
      // Show success and redirect
      setSuccess(
        `Success! Your Request ID is ${newId}. You will be redirected...`
      );
      setTimeout(() => {
        setSuccess(null);
        setView("residentTrack");
      }, 4000);
    }
  };

  const isSubmitDisabled =
    isLoading || roadJurisdiction.jurisdiction !== "TOWNSHIP";

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-inter">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="bg-blue-600 text-white p-2 rounded-lg">
              <Home size={24} />
            </span>
            <h1 className="text-2xl font-bold text-gray-800">
              West Windsor 311
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={() => setView("residentTrack")} variant="outline">
              <FileText size={18} className="mr-2" />
              Track a Request
            </Button>
            <Button onClick={() => setView("staffLogin")}>
              <LogIn size={18} className="mr-2" />
              Staff Portal
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            Submit a New Request
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Section title="Your Information" icon={<User size={20} />}>
              <p className="text-sm text-gray-600 mb-4">
                Please provide your information. This is required for updates
                but will NOT be displayed publicly. No account setup is
                required.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Phone (for text alerts)"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                <Input
                  label="Your Address"
                  name="submitterAddress"
                  value={formData.submitterAddress}
                  onChange={handleInputChange}
                />
              </div>
              <Checkbox
                label="Opt-in to text message alerts for this request"
                name="wantsTextAlerts"
                checked={formData.wantsTextAlerts}
                onChange={handleInputChange}
                disabled={!formData.phone}
              />
            </Section>

            <Section title="Request Details" icon={<AlertCircle size={20} />}>
              <Select
                label="Issue Category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a category...</option>
                {ISSUE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Select>

              <Textarea
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Please provide as much detail as possible..."
                required
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Upload Photo (Optional)
                </label>
                {photoPreview ? (
                  <div className="relative group">
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-40 h-40 object-cover rounded-lg shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={clearPhoto}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-75 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="w-full flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <UploadCloud
                        size={48}
                        className="mx-auto text-gray-400"
                      />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="photo-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                        >
                          <span>Upload a file</span>
                          <input
                            id="photo-upload"
                            name="photo-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleFileChange}
                            accept="image/*"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Section>

            <Section title="Issue Location" icon={<MapPin size={20} />}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600">
                  Select the location using the map or type the address below.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setUseMap(!useMap)}
                >
                  {useMap ? "Type Address Instead" : "Use Map Instead"}
                </Button>
              </div>

              {useMap ? (
                <GoogleMapSelector onLocationSelect={onLocationSelect} />
              ) : (
                <Input
                  label="Issue Address"
                  name="issueAddress"
                  value={formData.issueAddress}
                  onChange={handleInputChange}
                  placeholder="e.g., 123 Main St, West Windsor, NJ"
                  required
                />
              )}

              {roadJurisdiction.jurisdiction !== "TOWNSHIP" && (
                <div className="mt-4 p-3 rounded-lg bg-yellow-100 border border-yellow-300 text-yellow-800">
                  <div className="flex items-center">
                    <AlertCircle size={20} className="mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">
                        {roadJurisdiction.jurisdiction} Road Detected
                      </h4>
                      <p className="text-sm">
                        This appears to be{" "}
                        {roadJurisdiction.jurisdiction === "STATE"
                          ? "a State"
                          : "a Mercer County"}{" "}
                        road. The township cannot service this request.
                      </p>
                      <a
                        href={roadJurisdiction.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-blue-700 hover:underline"
                      >
                        Please submit your request on the{" "}
                        {roadJurisdiction.jurisdiction} website{" "}
                        <ArrowRight size={14} className="inline" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </Section>

            <div className="pt-4 flex flex-col items-center">
              <Button
                type="submit"
                size="lg"
                className="w-full md:w-1/2"
                disabled={isSubmitDisabled}
              >
                {isLoading ? <Spinner /> : "Submit Request"}
              </Button>

              <MessageDisplay
                error={error}
                success={success}
                setError={setError}
                setSuccess={setSuccess}
              />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

// --- (Component: GoogleMapSelector) ---
// This component now securely loads the API key from your Vercel environment.
const GoogleMapSelector = ({ onLocationSelect }) => {
  const mapRef = useRef(null);
  const searchBoxRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [apiKeyLoaded, setApiKeyLoaded] = useState(false);
  const [apiKey, setApiKey] = useState(null);

  // West Windsor coordinates
  const defaultCenter = { lat: 40.2809, lng: -74.5912 };

  useEffect(() => {
    // SECURE: Read key from environment variables
    const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (key) {
      setApiKey(key);
    } else {
      console.error("VITE_GOOGLE_MAPS_API_KEY is missing.");
    }
  }, []);

  const loadGoogleMapsScript = () => {
    if (!apiKey) return; // Don't load if key is missing
    if (window.google) {
      setApiKeyLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geocoding`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setApiKeyLoaded(true);
    };
    script.onerror = () => {
      console.error(
        "Failed to load Google Maps script. Check API key and restrictions."
      );
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (apiKey) {
      loadGoogleMapsScript();
    }
  }, [apiKey]);

  // Initialize Map
  useEffect(() => {
    if (!apiKeyLoaded || !mapRef.current || !window.google) return;

    const newMap = new window.google.maps.Map(mapRef.current, {
      center: defaultCenter,
      zoom: 13,
      mapTypeId: "satellite",
      streetViewControl: false,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: window.google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        mapTypeIds: ["roadmap", "satellite", "hybrid", "terrain"],
      },
    });

    // FIX: Manually trigger resize after map initialization to fix rendering/positioning bugs
    const resizeTimeout = setTimeout(() => {
        if (newMap) {
            window.google.maps.event.trigger(newMap, 'resize');
            newMap.setCenter(defaultCenter); // Re-center after resize
        }
    }, 300); // 300ms delay ensures container is fully rendered

    const newMarker = new window.google.maps.Marker({
      map: newMap,
      position: defaultCenter,
      draggable: true,
      title: "Drag me to the issue location",
    });

    const geocoder = new window.google.maps.Geocoder();

// NEW (Corrected to handle the LatLng object reliably):
const updateLocation = (latLng, address) => {
  // Ensure the position is set on the marker and map
  newMarker.setPosition(latLng);
  newMap.panTo(latLng);
  
  // CRUCIAL FIX: Ensure we call .lat() and .lng() on the Google Maps object
  // and pass the raw number values to the parent component.
  onLocationSelect(address, { 
      lat: latLng.lat(), // This line uses the required function
      lng: latLng.lng()  // This line uses the required function
  });
};

    const geocodeLatLng = (latLng) => {
      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            updateLocation(latLng, results[0].formatted_address);
          } else {
            updateLocation(latLng, "Address not found");
          }
        } else {
          updateLocation(latLng, `Geocode failed: ${status}`);
        }
      });
    };

    newMap.addListener("click", (e) => {
      geocodeLatLng(e.latLng);
    });

    newMarker.addListener("dragend", (e) => {
      geocodeLatLng(e.latLng);
    });

    const searchBox = new window.google.maps.places.SearchBox(
      searchBoxRef.current
    );
    newMap.controls[window.google.maps.ControlPosition.TOP_LEFT].push(
      searchBoxRef.current
    );

    // FIX: Set explicit bounds for better local search results (West Windsor area)
    const bounds = new window.google.maps.LatLngBounds(
      new window.google.maps.LatLng(40.2, -74.7), // SW corner (approx)
      new window.google.maps.LatLng(40.4, -74.4)  // NE corner (approx)
    );
    searchBox.setBounds(bounds);

    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
      if (places.length === 0) return;

      const place = places[0];
      if (!place.geometry || !place.geometry.location) return;

      updateLocation(place.geometry.location, place.formatted_address);
      newMap.setZoom(17);
    });

    setMap(newMap);
    setMarker(newMarker);
    geocodeLatLng(defaultCenter);

    return () => clearTimeout(resizeTimeout); // Cleanup timeout
  }, [apiKeyLoaded, mapRef, onLocationSelect]);

  if (!apiKey) {
    return (
      <div className="h-96 flex items-center justify-center bg-red-100 text-red-700 p-4 rounded-lg">
        <AlertCircle size={24} className="mr-3" />
        Google Maps API Key is missing. Map functionality is disabled.
      </div>
    );
  }

  if (!apiKeyLoaded) {
    return (
      <div className="h-96 flex items-center justify-center bg-gray-200 rounded-lg text-gray-600">
        <Spinner />
        <span className="ml-3">Loading Google Maps...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <input
        ref={searchBoxRef}
        type="text"
        placeholder="Search for an address..."
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
      <div
        ref={mapRef}
        className="w-full h-96 rounded-lg shadow-inner border border-gray-300"
        aria-label="Interactive map for selecting issue location"
      >
        {/* Map will be injected here */}
      </div>
    </div>
  );
};

// --- (Component: Resident Track Portal) ---
// (This component remains unchanged)
const ResidentTrackPortal = ({
  setView,
  handleTrackRequest,
  trackingId,
  setTrackingId,
  trackedRequest,
  isLoading,
  error,
  publicRequests,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleTrackRequest(trackingId);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-inter">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="bg-blue-600 text-white p-2 rounded-lg">
              <FileText size={24} />
            </span>
            <h1 className="text-2xl font-bold text-gray-800">
              Track a Request
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={() => setView("resident")} variant="outline">
              <Send size={18} className="mr-2" />
              Submit New Request
            </Button>
            <Button onClick={() => setView("staffLogin")}>
              <LogIn size={18} className="mr-2" />
              Staff Portal
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">
                Check Request Status
              </h2>
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <Input
                  label="Enter Request ID"
                  name="trackingId"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="e.g., aBcDeFgHiJkLmNoP"
                  className="flex-grow"
                  hideLabel={true}
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-shrink-0"
                >
                  {isLoading ? <Spinner /> : <Search size={18} />}
                </Button>
              </form>
              {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            </div>

            {isLoading && !trackedRequest && <LoadingSpinner />}

            {trackedRequest && (
              <div className="bg-white p-6 rounded-lg shadow-lg animate-fade-in">
                <h3 className="text-2xl font-semibold mb-4 text-blue-700">
                  {trackedRequest.category}
                </h3>
                <StatusBadge status={trackedRequest.status} />
                <div className="mt-4 space-y-3">
                  <InfoItem
                    icon={<MapPin />}
                    label="Location"
                    value={trackedRequest.address}
                  />
                  <InfoItem
                    icon={<AlertCircle />}
                    label="Priority"
                    value={trackedRequest.priority || "N/A"}
                  />
                  <InfoItem
                    icon={<FileText />}
                    label="Request ID"
                    value={trackedRequest.id}
                  />
                  <InfoItem
                    icon={<Clock />}
                    label="Submitted"
                    value={formatTimestamp(trackedRequest.createdAt)}
                  />
                  <InfoItem
                    icon={<Clock />}
                    label="Last Update"
                    value={formatTimestamp(trackedRequest.lastUpdatedAt)}
                  />

                  <div className="pt-4">
                    <h4 className="text-lg font-semibold mb-2">Description</h4>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-md">
                      {trackedRequest.description}
                    </p>
                  </div>

                  {trackedRequest.imageUrl && (
                    <div className="pt-4">
                      <h4 className="text-lg font-semibold mb-2">
                        Submitted Photo
                      </h4>
                      <img
                        src={trackedRequest.imageUrl}
                        alt="Issue photo"
                        className="w-full rounded-lg shadow-md"
                      />
                    </div>
                  )}

                  <div className="pt-4">
                    <h4 className="text-lg font-semibold mb-2">History</h4>
                    <ul className="space-y-3">
                      {trackedRequest.history
                        .slice()
                        .reverse()
                        .map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start space-x-3"
                          >
                            <CheckCircle
                              size={18}
                              className="text-green-500 mt-1 flex-shrink-0"
                            />
                            <div>
                              <p className="font-medium text-gray-800">
                                {item.action}
                              </p>
                              <p className="text-sm text-gray-500">
                                {formatTimestamp(item.timestamp)} by {item.user}
                              </p>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div className="pt-4">
                    <h4 className="text-lg font-semibold mb-2">
                      Public Comments
                    </h4>
                    {/* TODO: Add comment submission form */}
                    {trackedRequest.comments.length === 0 ? (
                      <p className="text-sm text-gray-500">
                        No public comments yet.
                      </p>
                    ) : (
                      <ul className="space-y-3">
                        {trackedRequest.comments.map((comment, index) => (
                          <li key={index} className="bg-gray-50 p-3 rounded-md">
                            <p className="text-gray-700">{comment.text}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              By {comment.user} on{" "}
                              {formatTimestamp(comment.timestamp)}
                            </p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">All Public Requests</h2>
            <p className="text-sm text-gray-600 mb-4">
              In compliance with OPRA, all non-sensitive request data is
              available publicly. Submitter information and internal notes are
              not displayed.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      View
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {publicRequests.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        No public requests found.
                      </td>
                    </tr>
                  )}
                  {publicRequests.slice(0, 50).map(
                    (
                      req // Limit to 50
                    ) => (
                      <tr key={req.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <StatusBadge status={req.status} />
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">
                          {req.category}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                          {req.address}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                          {formatTimestamp(req.createdAt)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setTrackingId(req.id);
                              handleTrackRequest(req.id);
                            }}
                          >
                            <Eye size={16} />
                          </Button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- (Component: Staff Login) ---
// (This component remains unchanged)
const StaffLogin = ({ setView, handleStaffLogin, isLoading, error }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleStaffLogin(email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 to-indigo-900 flex items-center justify-center p-4 font-inter">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-white p-3 rounded-lg shadow-lg">
            <Home size={32} className="text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          West Windsor 311
        </h1>
        <h2 className="text-xl text-blue-100 text-center mb-8">Staff Portal</h2>

        <div className="bg-white rounded-lg shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "Login"}
            </Button>

            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}

            <div className="text-center mt-4">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setView("resident");
                }}
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                &larr; Back to Resident Portal
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- (Component: Staff Portal) ---
// (This component remains unchanged)
const StaffPortal = ({
  user,
  profile,
  handleLogout,
  view,
  navigate,
  requests,
  selectedRequestId,
  staffList,
  setStaffList,
  setError,
  setSuccess,
  error,
  success,
}) => {
  const selectedRequest = requests.find((r) => r.id === selectedRequestId);

  const renderView = () => {
    switch (view) {
      case "dashboard":
        return (
          <StaffDashboard
            navigate={navigate}
            requests={requests}
            profile={profile}
          />
        );
      case "requests":
        return (
          <StaffRequestList
            navigate={navigate}
            requests={requests}
            profile={profile}
          />
        );
      case "detail":
        return (
          <StaffRequestDetail
            navigate={navigate}
            request={selectedRequest}
            profile={profile}
            setError={setError}
            setSuccess={setSuccess}
          />
        );
      case "adminUsers":
        if (profile.role !== STAFF_ROLES.ADMIN) {
          navigate("dashboard");
          return null;
        }
        return (
          <AdminUserManagement
            profile={profile}
            staffList={staffList}
            setStaffList={setStaffList}
            setError={setError}
            setSuccess={setSuccess}
            error={error}
            success={success}
          />
        );
      default:
        return (
          <StaffDashboard
            navigate={navigate}
            requests={requests}
            profile={profile}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100 font-inter">
      <nav className="w-64 bg-white shadow-lg flex flex-col flex-shrink-0">
        <div className="flex items-center space-x-3 p-4 border-b">
          <span className="bg-blue-600 text-white p-2 rounded-lg">
            <Shield size={24} />
          </span>
          <h1 className="text-xl font-bold text-gray-800">WW 311 Staff</h1>
        </div>

        <div className="flex-grow p-4 space-y-2">
          <StaffNavLink
            icon={<BarChart2 />}
            label="Dashboard"
            onClick={() => navigate("dashboard")}
            active={view === "dashboard"}
          />
          <StaffNavLink
            icon={<Inbox />}
            label="All Requests"
            onClick={() => navigate("requests")}
            active={view === "requests"}
          />

          {profile.role === STAFF_ROLES.ADMIN && (
            <>
              <div className="pt-4 mt-4 border-t">
                <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Admin
                </h3>
              </div>
              <StaffNavLink
                icon={<Users />}
                label="User Management"
                onClick={() => navigate("adminUsers")}
                active={view === "adminUsers"}
              />
            </>
          )}
        </div>

        <div className="p-4 border-t">
          <div className="mb-2">
            <p className="text-sm font-medium text-gray-800">{profile.name}</p>
            <p className="text-xs text-gray-500">{profile.email}</p>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-1 inline-block capitalize ${
                profile.role === STAFF_ROLES.ADMIN
                  ? "bg-red-100 text-red-700"
                  : profile.role === STAFF_ROLES.MANAGER
                  ? "bg-blue-100 text-blue-700"
                  : profile.role === STAFF_ROLES.DEVELOPER
                  ? "bg-purple-100 text-purple-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {profile.role}
            </span>
          </div>
          <Button variant="outline" className="w-full" onClick={handleLogout}>
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </nav>

      <main className="flex-1 p-8 overflow-auto">{renderView()}</main>
    </div>
  );
};

// (StaffNavLink, StaffDashboard, StatCard, StaffRequestList, RequestTable remain unchanged)
const StaffNavLink = ({ icon, label, onClick, active }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all
      ${
        active
          ? "bg-blue-50 text-blue-600 font-semibold"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }`}
  >
    {React.cloneElement(icon, { size: 20 })}
    <span>{label}</span>
  </button>
);

const StaffDashboard = ({ navigate, requests, profile }) => {
  const stats = {
    new: requests.filter((r) => r.status === REQUEST_STATUSES.NEW).length,
    inProgress: requests.filter(
      (r) => r.status === REQUEST_STATUSES.IN_PROGRESS
    ).length,
    resolved: requests.filter((r) => r.status === REQUEST_STATUSES.RESOLVED)
      .length,
    emergency: requests.filter(
      (r) =>
        r.priority === REQUEST_PRIORITIES.EMERGENCY &&
        r.status !== REQUEST_STATUSES.CLOSED
    ).length,
  };

  const myAssignedRequests = requests.filter(
    (r) =>
      r.assignedTo === profile.id &&
      r.status !== REQUEST_STATUSES.CLOSED &&
      r.status !== REQUEST_STATUSES.RESOLVED
  );

  const recentRequests = requests.slice(0, 5);

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-semibold text-gray-800">
        Welcome, {profile.name.split(" ")[0]}!
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="New Requests"
          value={stats.new}
          icon={<Inbox />}
          color="blue"
          onClick={() => navigate("requests")}
        />
        <StatCard
          title="In Progress"
          value={stats.inProgress}
          icon={<Loader2 />}
          color="yellow"
          onClick={() => navigate("requests")}
        />
        <StatCard
          title="Resolved"
          value={stats.resolved}
          icon={<CheckCircle />}
          color="green"
          onClick={() => navigate("requests")}
        />
        <StatCard
          title="Active Emergencies"
          value={stats.emergency}
          icon={<AlertCircle />}
          color="red"
          onClick={() => navigate("requests")}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">My Open Tasks</h3>
          {myAssignedRequests.length === 0 ? (
            <p className="text-gray-500 text-sm">
              You have no open tasks assigned to you. Good job!
            </p>
          ) : (
            <ul className="space-y-4">
              {myAssignedRequests.map((req) => (
                <li
                  key={req.id}
                  onClick={() => navigate("detail", req.id)}
                  className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-blue-600">
                      {req.category}
                    </span>
                    <PriorityBadge priority={req.priority} />
                  </div>
                  <p className="text-xs text-gray-600 truncate">
                    {req.address}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Recent Submissions</h3>
          <RequestTable
            requests={recentRequests}
            navigate={navigate}
            profile={profile}
            compact={true}
          />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color, onClick }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    yellow: "bg-yellow-100 text-yellow-600",
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
  };

  return (
    <div
      className="bg-white p-5 rounded-lg shadow-lg flex items-center space-x-4 cursor-pointer hover:shadow-xl transition-shadow"
      onClick={onClick}
    >
      <div className={`p-3 rounded-full ${colors[color]}`}>
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

const StaffRequestList = ({ navigate, requests, profile }) => {
  const [filter, setFilter] = useState("");

  const filteredRequests = requests.filter((req) => {
    const search = filter.toLowerCase();
    return (
      req.id.toLowerCase().includes(search) ||
      (req.category && req.category.toLowerCase().includes(search)) ||
      (req.address && req.address.toLowerCase().includes(search)) ||
      (req.status && req.status.toLowerCase().includes(search)) ||
      (req.priority && req.priority.toLowerCase().includes(search))
    );
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">All Requests</h2>
      <Input
        label="Filter requests..."
        name="filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search by ID, category, address, status, priority..."
        hideLabel={true}
        className="mb-4"
        icon={<Search size={18} className="text-gray-400" />}
      />
      <RequestTable
        requests={filteredRequests}
        navigate={navigate}
        profile={profile}
      />
    </div>
  );
};

const RequestTable = ({ requests, navigate, profile, compact = false }) => {
  const canManage =
    profile.role === STAFF_ROLES.ADMIN ||
    profile.role === STAFF_ROLES.MANAGER ||
    profile.role === STAFF_ROLES.DEVELOPER;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            {!compact && (
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
            )}
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            {!compact && (
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submitted
              </th>
            )}
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Priority
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              View
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {requests.length === 0 && (
            <tr>
              <td colSpan={compact ? 5 : 7} className="text-center py-4">
                No requests found.
              </td>
            </tr>
          )}
          {requests.map((req) => (
            <tr key={req.id} className="hover:bg-gray-50">
              <td className="px-4 py-4 whitespace-nowrap">
                <StatusBadge status={req.status} />
              </td>
              {!compact && (
                <td className="px-4 py-4 whitespace-nowrap text-xs font-mono text-gray-500">
                  {req.id.substring(0, 8)}...
                </td>
              )}
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">
                {req.category}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                {req.address}
              </td>
              {!compact && (
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                  {formatTimestamp(req.createdAt)}
                </td>
              )}
              <td className="px-4 py-4 whitespace-nowrap">
                <PriorityBadge priority={req.priority} />
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("detail", req.id)}
                >
                  {canManage ? "Manage" : "View"}
                  {canManage && <ArrowRight size={16} className="ml-1" />}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// --- (Component: Staff Request Detail) ---
// This component is updated to call the backend APIs for notifications.
const StaffRequestDetail = ({
  navigate,
  request,
  profile,
  setError,
  setSuccess,
}) => {
  const [allStaff, setAllStaff] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newInternalNote, setNewInternalNote] = useState("");
  const [submitterInfo, setSubmitterInfo] = useState(null);
  const [isLoadingSubmitter, setIsLoadingSubmitter] = useState(false);

  const canManage =
    profile.role === STAFF_ROLES.ADMIN ||
    profile.role === STAFF_ROLES.MANAGER ||
    profile.role === STAFF_ROLES.DEVELOPER;
  const canComment = canManage || profile.role === STAFF_ROLES.WORKER;
  const canSeeSubmitter = profile.role !== STAFF_ROLES.DEVELOPER;

  useEffect(() => {
    if (!canManage) return;

    const fetchStaff = async () => {
      try {
        const staffCollectionRef = collection(db, `users`);
        const snapshot = await getDocs(staffCollectionRef);
        const staffData = [];
        snapshot.forEach((doc) => {
          staffData.push({ id: doc.id, ...doc.data() });
        });
        setAllStaff(staffData);
      } catch (err) {
        console.error("Failed to fetch staff list:", err);
      }
    };
    fetchStaff();
  }, [canManage]);

  useEffect(() => {
    if (request && canSeeSubmitter) {
      const fetchSubmitterInfo = async () => {
        setIsLoadingSubmitter(true);
        try {
          const submitterDocRef = doc(db, "request_submitter_info", request.id);
          const docSnap = await getDoc(submitterDocRef);
          if (docSnap.exists()) {
            setSubmitterInfo(docSnap.data());
          } else {
            setSubmitterInfo(null);
          }
        } catch (err) {
          console.error("Error fetching submitter info:", err);
          setError("Failed to load submitter information.");
        }
        setIsLoadingSubmitter(false);
      };
      fetchSubmitterInfo();
    } else {
      setSubmitterInfo(null);
    }
  }, [request, canSeeSubmitter, setError]);

  if (!request) {
    return (
      <div>
        <Button variant="outline" onClick={() => navigate("requests")}>
          <ChevronLeft size={18} className="mr-2" /> Back to List
        </Button>
        <LoadingSpinner />
      </div>
    );
  }

  const requestDocRef = doc(db, `requests`, request.id);

  /**
   * Generic update function for the request.
   * @param {object} updatedData - The fields to update.
   * @param {string} historyAction - The message for the history log.
   * @param {string} notificationMessage - The message for email/text alerts.
   */
  const updateRequest = async (
    updatedData,
    historyAction,
    notificationMessage = null
  ) => {
    setError(null);
    setSuccess(null);
    try {
      const newHistoryEntry = {
        timestamp: serverTimestamp(),
        action: historyAction,
        user: profile.name,
        userId: profile.id,
      };

      const updatePayload = {
        ...updatedData,
        lastUpdatedAt: serverTimestamp(),
        history: [...request.history, newHistoryEntry],
      };

      await updateDoc(requestDocRef, updatePayload);
      setSuccess("Request updated successfully.");

      // Send notifications (REAL API CALLS)
      if (notificationMessage && submitterInfo) {
        const fullMessage = `Update for WW 311 Request ${request.id}: ${notificationMessage}`;

        // Send email
        await sendApiEmail(
          submitterInfo.email,
          `Update: ${request.id}`,
          fullMessage
        );

        // Send text
        if (submitterInfo.wantsTextAlerts && submitterInfo.phone) {
          await sendApiText(submitterInfo.phone, fullMessage);
        }
      }
    } catch (err) {
      console.error("Failed to update request:", err);
      setError("Update failed. Please try again.");
    }
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    updateRequest(
      { status: newStatus },
      `Status changed to ${newStatus}`,
      `Your request status has been updated to "${newStatus}".`
    );
  };

  const handlePriorityChange = (e) => {
    const newPriority = e.target.value;
    updateRequest(
      { priority: newPriority },
      `Priority changed to ${newPriority}`
    );
  };

  const handleAssignmentChange = (e) => {
    const assignedId = e.target.value;
    const assignedStaff = allStaff.find((s) => s.id === assignedId);
    const assignedName = assignedStaff ? assignedStaff.name : "Unassigned";

    updateRequest(
      {
        assignedTo: assignedId || null,
        assignedDepartment: assignedStaff ? assignedStaff.department : null,
      },
      `Assigned to ${assignedName}`
    );
  };

  /**
   * Adds a new comment (public) or internal note.
   * @param {'comment' | 'note'} type - The type of message to add.
   */
  const handleAddMessage = async (type) => {
    const text = type === "comment" ? newComment : newInternalNote;
    if (!text.trim()) return;

    setError(null);
    setSuccess(null);

    try {
      const newMessage = {
        timestamp: serverTimestamp(),
        text: text,
        user: profile.name,
        userId: profile.id,
      };

      let updatePayload;
      let historyAction;
      let notificationMessage = null;

      if (type === "comment") {
        updatePayload = { comments: [...request.comments, newMessage] };
        historyAction = "Public comment added";
        notificationMessage = `A new public comment was added to your request: "${text}"`;
        setNewComment("");
      } else {
        updatePayload = {
          internalNotes: [...request.internalNotes, newMessage],
        };
        historyAction = "Internal note added";
        setNewInternalNote("");
      }

      await updateRequest(updatePayload, historyAction, notificationMessage);
    } catch (err) {
      console.error(`Failed to add ${type}:`, err);
      setError(`Failed to add ${type}.`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <Button
        variant="outline"
        onClick={() => navigate("requests")}
        className="mb-4"
      >
        <ChevronLeft size={18} className="mr-2" /> Back to List
      </Button>

      <MessageDisplay
        error={error}
        success={success}
        setError={setError}
        setSuccess={setSuccess}
      />

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800">
              {request.category}
            </h2>
            <p className="text-gray-600 mt-1">{request.address}</p>
          </div>
          <div className="flex space-x-2">
            <StatusBadge status={request.status} large={true} />
            <PriorityBadge priority={request.priority} large={true} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {canManage && (
            <Section title="Manage Request" icon={<Settings />}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Select
                  label="Change Status"
                  name="status"
                  value={request.status}
                  onChange={handleStatusChange}
                >
                  {Object.values(REQUEST_STATUSES).map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Select>
                <Select
                  label="Change Priority"
                  name="priority"
                  value={request.priority}
                  onChange={handlePriorityChange}
                >
                  {Object.values(REQUEST_PRIORITIES).map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </Select>
                <Select
                  label="Assign To"
                  name="assignedTo"
                  value={request.assignedTo || ""}
                  onChange={handleAssignmentChange}
                >
                  <option value="">Unassigned</option>
                  {allStaff.map((staff) => (
                    <option key={staff.id} value={staff.id}>
                      {staff.name} ({staff.department})
                    </option>
                  ))}
                </Select>
              </div>
            </Section>
          )}

          {(request.aiTriage || request.aiPhotoAnalysis) && (
            <Section title="AI Analysis" icon={<Bot />}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {request.aiTriage && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">
                      Triage Report
                    </h4>
                    <InfoItem
                      icon={<Zap />}
                      label="Priority"
                      value={request.aiTriage.suggestedPriority}
                    />
                    <InfoItem
                      icon={<Users />}
                      label="Department"
                      value={request.aiTriage.suggestedDepartment}
                    />
                    <InfoItem
                      icon={<Clock />}
                      label="Est. Response"
                      value={request.aiTriage.estimatedResponseTime}
                    />
                    <InfoItem
                      icon={<Star />}
                      label="Reasoning"
                      value={request.aiTriage.reasoning}
                    />
                  </div>
                )}
                {request.aiPhotoAnalysis && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">
                      Photo Analysis
                    </h4>
                    <InfoItem
                      icon={<ImageIcon />}
                      label="Identified"
                      value={request.aiPhotoAnalysis.issueType}
                    />
                    <InfoItem
                      icon={<AlertCircle />}
                      label="Severity"
                      value={request.aiPhotoAnalysis.severity}
                    />
                    <InfoItem
                      icon={<Settings />}
                      label="Recommendation"
                      value={request.aiPhotoAnalysis.repairRecommendation}
                    />
                  </div>
                )}
              </div>
            </Section>
          )}

          <Section title="Details" icon={<FileText />}>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-md">
              {request.description}
            </p>
            {request.imageUrl && (
              <div className="mt-4">
                <h4 className="font-semibold text-gray-700 mb-2">
                  Submitted Photo
                </h4>
                <a
                  href={request.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={request.imageUrl}
                    alt="Issue photo"
                    className="max-w-sm w-full rounded-lg shadow-md"
                  />
                </a>
              </div>
            )}
          </Section>

          {canComment && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CommentBox
                title="Internal Notes"
                icon={<MessageSquare />}
                messages={request.internalNotes}
                value={newInternalNote}
                onChange={setNewInternalNote}
                onSubmit={() => handleAddMessage("note")}
                profile={profile}
                canPost={true}
              />
              <CommentBox
                title="Public Comments"
                icon={<MessageSquare />}
                messages={request.comments}
                value={newComment}
                onChange={setNewComment}
                onSubmit={() => handleAddMessage("comment")}
                profile={profile}
                canPost={canManage}
                disclaimer="These comments are visible to the resident."
              />
            </div>
          )}
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Section title="Submitter Info" icon={<User />}>
            {!canSeeSubmitter ? (
              <div className="flex items-center space-x-2 text-gray-600 bg-gray-100 p-3 rounded-lg">
                <Lock size={18} />
                <span className="text-sm font-medium">
                  Submitter information is private and not visible to this role.
                </span>
              </div>
            ) : isLoadingSubmitter ? (
              <LoadingSpinner />
            ) : submitterInfo ? (
              <>
                <InfoItem
                  icon={<User />}
                  label="Name"
                  value={submitterInfo.name}
                />
                <InfoItem
                  icon={<User />}
                  label="Email"
                  value={submitterInfo.email}
                />
                <InfoItem
                  icon={<User />}
                  label="Phone"
                  value={submitterInfo.phone || "N/A"}
                />
                <InfoItem
                  icon={<User />}
                  label="Address"
                  value={submitterInfo.address || "N/A"}
                />
              </>
            ) : (
              <p className="text-sm text-gray-500">
                No submitter information found for this request.
              </p>
            )}
          </Section>

          <Section title="Request History" icon={<Clock />}>
            <ul className="space-y-3">
              {request.history
                .slice()
                .reverse()
                .map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle
                      size={18}
                      className="text-green-500 mt-1 flex-shrink-0"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{item.action}</p>
                      <p className="text-sm text-gray-500">
                        {formatTimestamp(item.timestamp)} by {item.user}
                      </p>
                    </div>
                  </li>
                ))}
            </ul>
          </Section>
        </div>
      </div>
    </div>
  );
};

// --- (Component: Admin User Management) ---
// This component is NOW SECURE. It calls backend functions
// to create/delete users, passing the admin's auth token.
const AdminUserManagement = ({
  profile,
  staffList,
  setStaffList,
  setError,
  setSuccess,
  error,
  success,
}) => {
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    role: STAFF_ROLES.WORKER,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaff((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddStaff = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    if (newStaff.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setIsLoading(false);
      return;
    }

    try {
      // 1. Get the current admin's auth token
      const token = await auth.currentUser.getIdToken();

      // 2. Call the secure backend API
      const response = await fetch("/api/admin/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newStaff),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to create user");
      }

      setSuccess(`Staff member ${newStaff.name} created successfully.`);
      setNewStaff({
        name: "",
        email: "",
        password: "",
        department: "",
        role: STAFF_ROLES.WORKER,
      });
      // The onSnapshot listener will update the list automatically.
    } catch (err) {
      console.error("Failed to create staff user:", err);
      setError(err.message);
    }
    setIsLoading(false);
  };

  const handleDeleteStaff = async (staffToDelete) => {
    if (staffToDelete.id === profile.id) {
      setError("You cannot delete your own account.");
      return;
    }
    if (staffToDelete.role === STAFF_ROLES.ADMIN) {
      setError("Cannot delete an Admin account. Please demote them first.");
      return;
    }

    if (
      window.confirm(
        `Are you sure you want to delete ${staffToDelete.name}? This action is irreversible and will delete their login and profile.`
      )
    ) {
      setIsLoading(true);
      setError(null);
      setSuccess(null);

      try {
        // 1. Get the current admin's auth token
        const token = await auth.currentUser.getIdToken();

        // 2. Call the secure backend API
        const response = await fetch("/api/admin/delete-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ uid: staffToDelete.id }),
        });

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.error || "Failed to delete user");
        }

        setSuccess(`Staff profile for ${staffToDelete.name} deleted.`);
        // List updates via onSnapshot
      } catch (err) {
        console.error("Failed to delete staff:", err);
        setError(err.message);
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-semibold text-gray-800">
        Staff User Management
      </h2>

      <MessageDisplay
        error={error}
        success={success}
        setError={setError}
        setSuccess={setSuccess}
      />

      <Section title="Add New Staff User" icon={<UserPlus />}>
        <form onSubmit={handleAddStaff} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              name="name"
              value={newStaff.name}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={newStaff.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Temporary Password"
              name="password"
              type="password"
              value={newStaff.password}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Department"
              name="department"
              value={newStaff.department}
              onChange={handleInputChange}
              required
            />
            <Select
              label="Role"
              name="role"
              value={newStaff.role}
              onChange={handleInputChange}
            >
              <option value={STAFF_ROLES.WORKER}>Worker</option>
              <option value={STAFF_ROLES.MANAGER}>Manager</option>
              <option value={STAFF_ROLES.ADMIN}>Admin</option>
              <option value={STAFF_ROLES.DEVELOPER}>Developer (WWF)</option>
            </Select>
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Spinner /> : "Create Staff User"}
            </Button>
          </div>
        </form>
      </Section>

      <Section title="Current Staff" icon={<Users />}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {staffList.map((staff) => (
                <tr key={staff.id}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {staff.name}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {staff.email}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {staff.department}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${
                        staff.role === STAFF_ROLES.ADMIN
                          ? "bg-red-100 text-red-700"
                          : staff.role === STAFF_ROLES.MANAGER
                          ? "bg-blue-100 text-blue-700"
                          : staff.role === STAFF_ROLES.DEVELOPER
                          ? "bg-purple-100 text-purple-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {staff.role}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteStaff(staff)}
                      disabled={
                        staff.id === profile.id ||
                        staff.role === STAFF_ROLES.ADMIN
                      }
                    >
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
};

// --- (Shared UI Components) ---
// (All shared components like Section, Input, Button, etc. remain unchanged)
const Section = ({ title, icon, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <div className="flex items-center space-x-2 border-b pb-3 mb-4">
      {icon && React.cloneElement(icon, { className: "text-blue-600" })}
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  placeholder,
  className = "",
  hideLabel = false,
  icon = null,
}) => (
  <div className={`w-full ${className}`}>
    {!hideLabel && (
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    )}
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder || label}
        className={`w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
          icon ? "pl-10" : ""
        }`}
      />
    </div>
  </div>
);

const Textarea = ({
  label,
  name,
  value,
  onChange,
  required = false,
  placeholder,
}) => (
  <div className="w-full">
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder || label}
      rows="4"
      className="w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
);

const Select = ({
  label,
  name,
  value,
  onChange,
  required = false,
  children,
}) => (
  <div className="w-full">
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
    >
      {children}
    </select>
  </div>
);

const Checkbox = ({ label, name, checked, onChange, disabled = false }) => (
  <div className="flex items-center">
    <input
      id={name}
      name={name}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
    />
    <label
      htmlFor={name}
      className={`ml-2 block text-sm ${
        disabled ? "text-gray-400" : "text-gray-700"
      }`}
    >
      {label}
    </label>
  </div>
);

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
}) => {
  const baseStyle =
    "inline-flex items-center justify-center font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-300",
    outline:
      "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-400",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

const Spinner = () => <Loader2 size={20} className="animate-spin" />;

const LoadingSpinner = ({ fullPage = false }) => (
  <div
    className={`flex items-center justify-center ${
      fullPage ? "min-h-screen" : "py-10"
    }`}
  >
    <Loader2 size={48} className="animate-spin text-blue-600" />
  </div>
);

const MessageDisplay = ({ error, success, setError, setSuccess }) => {
  if (!error && !success) return null;

  const isError = !!error;
  const message = error || success;

  const baseClasses =
    "w-full p-4 mt-4 rounded-lg flex justify-between items-center";
  const errorClasses = "bg-red-100 border border-red-300 text-red-800";
  const successClasses = "bg-green-100 border border-green-300 text-green-800";

  return (
    <div
      className={`${baseClasses} ${isError ? errorClasses : successClasses}`}
    >
      <span>{message}</span>
      <button
        onClick={() => (isError ? setError(null) : setSuccess(null))}
        className="font-bold"
      >
        <X size={20} />
      </button>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start space-x-2">
    {React.cloneElement(icon, {
      size: 18,
      className: "text-gray-500 mt-0.5 flex-shrink-0",
    })}
    <div>
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <p className="text-sm text-gray-800">{value}</p>
    </div>
  </div>
);

const StatusBadge = ({ status, large = false }) => {
  const colors = {
    [REQUEST_STATUSES.NEW]: "bg-blue-100 text-blue-700",
    [REQUEST_STATUSES.IN_PROGRESS]: "bg-yellow-100 text-yellow-700",
    [REQUEST_STATUSES.RESOLVED]: "bg-green-100 text-green-700",
    [REQUEST_STATUSES.CLOSED]: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`font-medium rounded-full ${colors[status] || colors.CLOSED} ${
        large ? "px-3 py-1 text-sm" : "px-2.5 py-0.5 text-xs"
      }`}
    >
      {status}
    </span>
  );
};

const PriorityBadge = ({ priority, large = false }) => {
  const colors = {
    [REQUEST_PRIORITIES.LOW]: "bg-gray-100 text-gray-700",
    [REQUEST_PRIORITIES.MEDIUM]: "bg-yellow-100 text-yellow-700",
    [REQUEST_PRIORITIES.HIGH]: "bg-orange-100 text-orange-700",
    [REQUEST_PRIORITIES.EMERGENCY]: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`font-medium rounded-full ${colors[priority] || colors.LOW} ${
        large ? "px-3 py-1 text-sm" : "px-2.5 py-0.5 text-xs"
      }`}
    >
      {priority}
    </span>
  );
};

const CommentBox = ({
  title,
  icon,
  messages,
  value,
  onChange,
  onSubmit,
  profile,
  canPost,
  disclaimer,
}) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <div className="flex items-center space-x-2 mb-3">
      {React.cloneElement(icon, { size: 18, className: "text-blue-600" })}
      <h4 className="font-semibold text-gray-700">{title}</h4>
    </div>

    <div className="space-y-3 max-h-60 overflow-y-auto pr-2 mb-4">
      {messages.length === 0 ? (
        <p className="text-sm text-gray-500">No {title.toLowerCase()} yet.</p>
      ) : (
        messages
          .slice()
          .reverse()
          .map((msg, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-md">
              <p className="text-sm text-gray-800">{msg.text}</p>
              <p className="text-xs text-gray-500 mt-1">
                By {msg.user} on {formatTimestamp(msg.timestamp)}
              </p>
            </div>
          ))
      )}
    </div>

    {canPost && (
      <div className="space-y-2">
        <Textarea
          label={`Add ${title.replace("s", "")}`}
          hideLabel={true}
          placeholder={`Type your ${title.toLowerCase().replace("s", "")}...`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows="3"
        />
        {disclaimer && <p className="text-xs text-gray-500">{disclaimer}</p>}
        <Button size="sm" onClick={onSubmit} disabled={!value.trim()}>
          Post
        </Button>
      </div>
    )}
  </div>
);
