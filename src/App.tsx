// src/WW311.tsx (Redesigned & Fixed)
import React, { useState, useEffect, useRef, useCallback } from "react";

// --- (Firebase Imports - Unchanged) ---
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
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

// --- (SVG Icon Components - Use Feather Icons or similar for consistency) ---
// Using Feather icons for a cleaner look. You'd typically install `react-feather`.
// Example: import { Home, FileText, MapPin, User, LogIn, LogOut, Settings, Users, BarChart2, Send, AlertCircle, CheckCircle, Loader, UploadCloud, X, Search, Inbox, Clock, MessageSquare, Eye, Trash2, UserPlus, Shield, Edit, Star, Zap, Bot, Lock, ChevronLeft, ArrowRight, Image as ImageIcon } from 'react-feather';
// For brevity, I'll keep the existing inline SVGs but recommend switching to a library.
// --- (Keep existing SVG components here or replace with imports) ---
const Icon = ({ size = 24, children, className = "", ...props }) => ( /* ... existing ... */ );
const Home = ({ size, className }) => ( /* ... existing ... */ );
const CheckCircle = ({ size, className }) => ( /* ... existing ... */ );
const FileText = ({ size, className }) => ( /* ... existing ... */ );
const MapPin = ({ size, className }) => ( /* ... existing ... */ );
const AlertCircle = ({ size, className }) => ( /* ... existing ... */ );
const User = ({ size, className }) => ( /* ... existing ... */ );
const LogIn = ({ size, className }) => ( /* ... existing ... */ );
const LogOut = ({ size, className }) => ( /* ... existing ... */ );
const Settings = ({ size, className }) => ( /* ... existing ... */ );
const Users = ({ size, className }) => ( /* ... existing ... */ );
const BarChart2 = ({ size, className }) => ( /* ... existing ... */ );
const Send = ({ size, className }) => ( /* ... existing ... */ );
const ArrowRight = ({ size, className }) => ( /* ... existing ... */ );
const Loader2 = ({ size, className }) => ( /* ... existing ... */ ); // Renamed Spinner
const ImageIcon = ({ size, className }) => ( /* ... existing ... */ );
const X = ({ size, className }) => ( /* ... existing ... */ );
const UploadCloud = ({ size, className }) => ( /* ... existing ... */ );
const ChevronLeft = ({ size, className }) => ( /* ... existing ... */ );
const Search = ({ size, className }) => ( /* ... existing ... */ );
const Inbox = ({ size, className }) => ( /* ... existing ... */ );
const Clock = ({ size, className }) => ( /* ... existing ... */ );
const MessageSquare = ({ size, className }) => ( /* ... existing ... */ );
const Eye = ({ size, className }) => ( /* ... existing ... */ );
const Trash2 = ({ size, className }) => ( /* ... existing ... */ );
const UserPlus = ({ size, className }) => ( /* ... existing ... */ );
const Shield = ({ size, className }) => ( /* ... existing ... */ );
const Edit = ({ size, className }) => ( /* ... existing ... */ );
const Star = ({ size, className }) => ( /* ... existing ... */ );
const Zap = ({ size, className }) => ( /* ... existing ... */ );
const Bot = ({ size, className }) => ( /* ... existing ... */ );
const Lock = ({ size, className }) => ( /* ... existing ... */ );


// --- (Firebase Configuration - Unchanged) ---
const firebaseConfig = { /* ... existing ... */ };
if (!firebaseConfig.apiKey) { /* ... existing ... */ }
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// --- (Global Constants - Unchanged) ---
const MERCER_COUNTY_POTHOLE_URL = /* ... existing ... */ ;
const STATE_POTHOLE_URL = /* ... existing ... */ ;
const WEST_WINDSOR_COUNTY_ROADS = new Set([ /* ... existing ... */ ]);
const WEST_WINDSOR_STATE_ROADS = new Set([ /* ... existing ... */ ]);
const ISSUE_CATEGORIES = [ /* ... existing ... */ ];
const REQUEST_STATUSES = { /* ... existing ... */ };
const REQUEST_PRIORITIES = { /* ... existing ... */ };
const STAFF_ROLES = { /* ... existing ... */ };

// --- (Utility Functions - Unchanged) ---
const formatTimestamp = (timestamp) => { /* ... existing ... */ };
const getRoadJurisdiction = (streetAddress) => { /* ... existing ... */ };

// --- (API Call Functions - Unchanged, but ensure they work with backend) ---
const callVertexAI = async (description, category) => { /* ... existing with improved error handling ... */ };
const callVertexAIPhoto = async (imageUrl) => { /* ... existing with improved error handling ... */ };
const sendApiEmail = async (to, subject, body) => { /* ... existing ... */ };
const sendApiText = async (to, body) => { /* ... existing ... */ };

// --- Reusable UI Components (Enhanced Styling) ---
const Input = ({ label, name, type = "text", value, onChange, required = false, placeholder, className = "", hideLabel = false, icon = null }) => (
    <div className={`w-full ${className}`}>
        {!hideLabel && (
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1.5">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
        )}
        <div className="relative rounded-md shadow-sm">
            {icon && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {React.cloneElement(icon, { className: "h-5 w-5 text-gray-400" })}
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
                className={`block w-full ${icon ? 'pl-10' : 'pl-3'} pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out`}
            />
        </div>
    </div>
);

const Textarea = ({ label, name, value, onChange, required = false, placeholder, rows = 4 }) => (
    <div className="w-full">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1.5">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder || label}
            rows={rows}
            className="block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
        />
    </div>
);

const Select = ({ label, name, value, onChange, required = false, children }) => (
    <div className="w-full">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1.5">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="block w-full pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
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
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
        <label htmlFor={name} className={`ml-2 block text-sm ${disabled ? "text-gray-400" : "text-gray-900"}`}>
            {label}
        </label>
    </div>
);

const Button = ({ children, onClick, type = "button", variant = "primary", size = "md", className = "", disabled = false, icon = null }) => {
    const baseStyle = "inline-flex items-center justify-center border border-transparent rounded-md shadow-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
        outline: "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 focus:ring-indigo-500",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400" // Added Secondary
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs",
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
            {icon && <span className="mr-2 -ml-1">{React.cloneElement(icon, { size: size === 'sm' ? 16 : 20 })}</span>}
            {children}
        </button>
    );
};

const Spinner = () => <Loader2 size={20} className="animate-spin" />;

const LoadingSpinner = ({ fullPage = false }) => (
    <div className={`flex items-center justify-center ${fullPage ? "min-h-screen bg-gray-100" : "py-10"}`}>
        <Loader2 size={48} className="animate-spin text-indigo-600" />
        {fullPage && <p className="ml-3 text-gray-600">Loading...</p>}
    </div>
);

const MessageDisplay = ({ error, success, setError, setSuccess }) => {
    if (!error && !success) return null;
    const isError = !!error;
    const message = error || success;
    const baseClasses = "w-full p-4 mt-4 rounded-md flex justify-between items-center text-sm font-medium shadow";
    const errorClasses = "bg-red-100 border border-red-200 text-red-700";
    const successClasses = "bg-green-100 border border-green-200 text-green-700";

    return (
        <div className={`${baseClasses} ${isError ? errorClasses : successClasses}`}>
            <span>{message}</span>
            <button onClick={() => (isError ? setError(null) : setSuccess(null))} className="ml-4">
                <X size={18} className="hover:opacity-75" />
            </button>
        </div>
    );
};

const InfoItem = ({ icon, label, value }) => ( /* ... unchanged ... */ );
const StatusBadge = ({ status, large = false }) => { /* ... unchanged ... */ };
const PriorityBadge = ({ priority, large = false }) => { /* ... unchanged ... */ };

const Section = ({ title, icon, children, className = "" }) => (
    <div className={`bg-white p-6 rounded-lg shadow ${className}`}>
        <div className="flex items-center space-x-3 border-b border-gray-200 pb-4 mb-4">
            {icon && React.cloneElement(icon, { className: "text-indigo-600" })}
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);

// --- (Component: GoogleMapSelector - WITH FIXES) ---
const GoogleMapSelector = ({ onLocationSelect }) => {
    const mapRef = useRef(null);
    const searchBoxRef = useRef(null);
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
    const [apiKeyLoaded, setApiKeyLoaded] = useState(false);
    const [apiKey, setApiKey] = useState(null);
    const defaultCenter = { lat: 40.2809, lng: -74.5912 }; // West Windsor coordinates

    useEffect(() => {
        const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
        if (key) setApiKey(key);
        else console.error("VITE_GOOGLE_MAPS_API_KEY is missing.");
    }, []);

    const loadGoogleMapsScript = useCallback(() => {
        if (!apiKey || window.google) {
            if (window.google) setApiKeyLoaded(true);
            return;
        }
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geocoding`;
        script.async = true;
        script.defer = true;
        script.onload = () => setApiKeyLoaded(true);
        script.onerror = () => console.error("Failed to load Google Maps script.");
        document.body.appendChild(script);
    }, [apiKey]);

    useEffect(() => {
        loadGoogleMapsScript();
    }, [loadGoogleMapsScript]);

    useEffect(() => {
        if (!apiKeyLoaded || !mapRef.current || !window.google || map) return; // Prevent re-initialization

        const newMap = new window.google.maps.Map(mapRef.current, {
            center: defaultCenter,
            zoom: 13,
            mapTypeId: "satellite", // Default to satellite
            streetViewControl: false,
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: window.google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                mapTypeIds: ["roadmap", "satellite"], // Simplified options
            },
            fullscreenControl: false, // Cleaner UI
            zoomControl: true,
        });

        const newMarker = new window.google.maps.Marker({
            map: newMap,
            position: defaultCenter,
            draggable: true,
            title: "Drag me to the issue location",
        });

        const geocoder = new window.google.maps.Geocoder();

        const updateLocation = (latLng, address) => {
            if (!newMap || !newMarker) return; // Guard against missing instances
            newMarker.setPosition(latLng);
            // newMap.panTo(latLng); // Pan happens in listeners now
            onLocationSelect(address, {
                lat: latLng.lat(),
                lng: latLng.lng()
            });
        };


        const geocodeLatLng = (latLng) => {
            geocoder.geocode({ location: latLng }, (results, status) => {
                if (status === "OK" && results[0]) {
                    updateLocation(latLng, results[0].formatted_address);
                } else {
                    console.warn("Geocode failed:", status);
                    updateLocation(latLng, `Lat: ${latLng.lat().toFixed(5)}, Lng: ${latLng.lng().toFixed(5)}`); // Fallback
                }
            });
        };

        newMap.addListener("click", (e) => {
            newMap.panTo(e.latLng); // Pan on click
            geocodeLatLng(e.latLng);
        });

        newMarker.addListener("dragend", (e) => {
            newMap.panTo(e.latLng); // Pan after drag
            geocodeLatLng(e.latLng);
        });

        const searchBox = new window.google.maps.places.SearchBox(searchBoxRef.current);
        newMap.controls[window.google.maps.ControlPosition.TOP_CENTER].push( // Move search to top center
            searchBoxRef.current.parentElement // Push the container div
        );

        const bounds = new window.google.maps.LatLngBounds( // West Windsor bounds
            new window.google.maps.LatLng(40.2, -74.7),
            new window.google.maps.LatLng(40.4, -74.4)
        );
        searchBox.setBounds(bounds);

        searchBox.addListener("places_changed", () => {
            const places = searchBox.getPlaces();
            if (places.length === 0) return;
            const place = places[0];
            if (!place.geometry || !place.geometry.location) return;

            // *** FIX: Ensure map updates visually ***
            newMap.panTo(place.geometry.location);
            newMap.setZoom(17);
            // *** END FIX ***

            updateLocation(place.geometry.location, place.formatted_address);
        });

        setMap(newMap);
        setMarker(newMarker);
        geocodeLatLng(defaultCenter); // Initial geocode

        // Trigger resize after a short delay
        const resizeTimeout = setTimeout(() => {
            if (newMap && window.google) {
                window.google.maps.event.trigger(newMap, 'resize');
                newMap.setCenter(defaultCenter);
            }
        }, 300);

        return () => clearTimeout(resizeTimeout);

    }, [apiKeyLoaded, onLocationSelect, map]); // Added map to dependency array

    if (!apiKey) { /* ... unchanged error display ... */ }
    if (!apiKeyLoaded) { /* ... unchanged loading display ... */ }

    return (
        <div className="space-y-4 relative"> {/* Added relative positioning */}
            {/* Search Input Container */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 w-full max-w-sm px-4">
                <Input
                    name="mapSearch" // Added name
                    inputRef={searchBoxRef} // Pass ref via inputRef prop
                    type="text"
                    placeholder="Search for an address..."
                    className="w-full shadow-md"
                />
            </div>
            <div
                ref={mapRef}
                className="w-full h-96 rounded-lg shadow-inner border border-gray-300 overflow-hidden" // Added overflow-hidden
                aria-label="Interactive map for selecting issue location"
            ></div>
        </div>
    );
};

// --- (Component: Resident Portal - Redesigned) ---
const ResidentPortal = ({ setView, handleRequestSubmit, isLoading, error, success, setError, setSuccess }) => {
    const [formData, setFormData] = useState({ /* ... initial state ... */ });
    const [photoFile, setPhotoFile] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [roadJurisdiction, setRoadJurisdiction] = useState({ jurisdiction: "TOWNSHIP", url: null, name: null });
    const [step, setStep] = useState(1); // For multi-step form

    const handleInputChange = (e) => { /* ... existing logic ... */ };
    const handleFileChange = (e) => { /* ... existing logic ... */ };
    const clearPhoto = () => { /* ... existing logic ... */ };
    const onLocationSelect = useCallback((address, latLng) => {
        setFormData((prev) => ({
            ...prev,
            issueAddress: address,
            location: latLng,
        }));
        if (formData.category === "Pothole/Road Damage") {
            setRoadJurisdiction(getRoadJurisdiction(address));
        }
    }, [formData.category]); // Added dependency

    const handleSubmit = async (e) => {
      e.preventDefault();
      // Reset messages on new submit attempt
      setError(null);
      setSuccess(null);

      // Final validation before submit call
      if (roadJurisdiction.jurisdiction !== "TOWNSHIP") {
          setError(`Cannot submit: This appears to be a ${roadJurisdiction.jurisdiction} road (${roadJurisdiction.name}). Please use their reporting system.`);
          return;
      }
      if (!formData.category || !formData.description || !formData.issueAddress || !formData.name || !formData.email) {
          setError("Please ensure all required fields (*) are filled in Step 1, 2, and 3.");
          // Optionally force back to step 1 or highlight missing fields
          if (!formData.name || !formData.email) setStep(1);
          else if (!formData.category || !formData.description) setStep(2);
          else if (!formData.issueAddress) setStep(3);
          return;
      }

      // **Log data just before calling the submit handler**
      console.log("Submitting request with data:", formData, "Photo:", photoFile ? photoFile.name : "None");

      const newId = await handleRequestSubmit(formData, photoFile);

      if (newId) {
          setFormData({ /* ... reset ... */ });
          clearPhoto();
          setRoadJurisdiction({ jurisdiction: "TOWNSHIP", url: null, name: null });
          setStep(1); // Reset to first step
          setSuccess(`Success! Your Request ID is ${newId}. You can track it now.`);
          // Maybe navigate to track view directly or show ID prominently
          // setView('residentTrack'); // Optionally navigate
      }
      // Error is handled inside handleRequestSubmit and displayed via MessageDisplay
    };


    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const isStep1Valid = formData.name && formData.email;
    const isStep2Valid = formData.category && formData.description;
    const isStep3Valid = formData.issueAddress && roadJurisdiction.jurisdiction === 'TOWNSHIP';

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            {/* Header */}
            <header className="bg-gradient-to-r from-indigo-700 to-blue-600 text-white shadow-md sticky top-0 z-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                    <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.location.reload()}> {/* Reloads page on logo click */}
                         {/* Optional: Add Town Logo */}
                         <span className="bg-white text-indigo-700 p-1.5 rounded-full shadow">
                             <Home size={24} />
                         </span>
                        <h1 className="text-xl md:text-2xl font-bold">West Windsor 311</h1>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <Button onClick={() => setView("residentTrack")} variant="outline" size="sm" icon={<FileText />}>
                            Track Request
                        </Button>
                        <Button onClick={() => setView("staffLogin")} variant="secondary" size="sm" icon={<LogIn />}>
                            Staff Login
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-200">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center">Submit a Service Request</h2>

                    {/* Step Indicator */}
                    <div className="mb-8 flex justify-center space-x-4">
                        {[1, 2, 3].map(num => (
                            <div key={num} className={`w-3 h-3 rounded-full transition-colors ${step >= num ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Step 1: Your Information */}
                        {step === 1 && (
                            <Section title="Step 1: Your Information" icon={<User size={20} />} className="animate-fadeIn">
                                <p className="text-sm text-gray-600 mb-4">
                                    Provide contact details for updates (not public).
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input label="Full Name" name="name" value={formData.name} onChange={handleInputChange} required />
                                    <Input label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                                    <Input label="Phone (Optional)" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} />
                                    <Input label="Your Address (Optional)" name="submitterAddress" value={formData.submitterAddress} onChange={handleInputChange} />
                                </div>
                                <Checkbox label="Opt-in to text alerts (if phone provided)" name="wantsTextAlerts" checked={formData.wantsTextAlerts} onChange={handleInputChange} disabled={!formData.phone} />
                                <div className="text-right mt-6">
                                    <Button onClick={nextStep} disabled={!isStep1Valid}>
                                        Next: Request Details <ArrowRight size={18} className="ml-2"/>
                                    </Button>
                                </div>
                            </Section>
                        )}

                        {/* Step 2: Request Details */}
                        {step === 2 && (
                             <Section title="Step 2: Request Details" icon={<AlertCircle size={20} />} className="animate-fadeIn">
                                <Select label="Issue Category" name="category" value={formData.category} onChange={handleInputChange} required>
                                     <option value="">Select a category...</option>
                                     {ISSUE_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                 </Select>
                                <Textarea label="Description" name="description" value={formData.description} onChange={handleInputChange} placeholder="Provide details..." required />
                                 {/* Photo Upload */}
                                 <div className="space-y-2">
                                     <label className="block text-sm font-medium text-gray-700">Upload Photo (Optional)</label>
                                     {photoPreview ? (
                                        <div className="relative group w-40 h-40">
                                            <img src={photoPreview} alt="Preview" className="w-full h-full object-cover rounded-lg shadow-sm border"/>
                                            <button type="button" onClick={clearPhoto} className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 shadow-md hover:bg-red-700 transition">
                                                <X size={16} />
                                            </button>
                                        </div>
                                     ) : (
                                        <label htmlFor="photo-upload" className="cursor-pointer flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 hover:bg-gray-100 transition">
                                             <UploadCloud size={32} className="text-gray-400 mb-2"/>
                                             <p className="text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag & drop</p>
                                             <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                             <input id="photo-upload" name="photo-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*"/>
                                         </label>
                                     )}
                                 </div>
                                <div className="flex justify-between mt-6">
                                    <Button onClick={prevStep} variant="secondary">
                                        <ChevronLeft size={18} className="mr-2"/> Back
                                    </Button>
                                    <Button onClick={nextStep} disabled={!isStep2Valid}>
                                        Next: Location <ArrowRight size={18} className="ml-2"/>
                                    </Button>
                                </div>
                             </Section>
                        )}

                        {/* Step 3: Location */}
                        {step === 3 && (
                            <Section title="Step 3: Location" icon={<MapPin size={20} />} className="animate-fadeIn">
                                <p className="text-sm text-gray-600 mb-4">
                                    Use the map to pinpoint the issue or type the address.
                                </p>
                                {/* Removed Use Map/Type Address Toggle - Simplify */}
                                <GoogleMapSelector onLocationSelect={onLocationSelect} />
                                <Input
                                    label="Issue Address (Auto-filled by map/search)"
                                    name="issueAddress"
                                    value={formData.issueAddress}
                                    onChange={handleInputChange} // Allow manual override/typing
                                    placeholder="Or type address here..."
                                    required
                                    className="mt-4"
                                />

                                {/* Jurisdiction Warning */}
                                {roadJurisdiction.jurisdiction !== "TOWNSHIP" && (
                                     <div className="mt-4 p-3 rounded-lg bg-yellow-100 border border-yellow-300 text-yellow-800 text-sm">
                                         <div className="flex items-center">
                                             <AlertCircle size={20} className="mr-2 flex-shrink-0"/>
                                             <div>
                                                 <span className="font-semibold">{roadJurisdiction.jurisdiction} Road Detected:</span> {roadJurisdiction.name || 'This road'} appears to be maintained by the {roadJurisdiction.jurisdiction}.
                                                 <a href={roadJurisdiction.url} target="_blank" rel="noopener noreferrer" className="ml-1 font-medium text-blue-700 hover:underline"> Report it here instead <ArrowRight size={14} className="inline -mt-0.5"/></a>
                                                 <p className="text-xs mt-1">(You won't be able to submit this request here).</p>
                                             </div>
                                         </div>
                                     </div>
                                )}
                                <div className="flex justify-between mt-6">
                                    <Button onClick={prevStep} variant="secondary">
                                        <ChevronLeft size={18} className="mr-2"/> Back
                                    </Button>
                                    <Button type="submit" disabled={isLoading || !isStep3Valid}>
                                        {isLoading ? <Spinner /> : "Submit Request"}
                                    </Button>
                                </div>
                            </Section>
                        )}

                        {/* Global Error/Success Display */}
                        <MessageDisplay error={error} success={success} setError={setError} setSuccess={setSuccess} />

                    </form>
                </div>
            </main>
        </div>
    );
};

// --- (Component: Resident Track Portal - Redesigned) ---
const ResidentTrackPortal = ({ setView, handleTrackRequest, trackingId, setTrackingId, trackedRequest, isLoading, error, publicRequests }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        handleTrackRequest(trackingId);
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
             {/* Header */}
             <header className="bg-gradient-to-r from-indigo-700 to-blue-600 text-white shadow-md sticky top-0 z-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                    <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setView('resident')}>
                         <span className="bg-white text-indigo-700 p-1.5 rounded-full shadow">
                             <FileText size={24} />
                         </span>
                        <h1 className="text-xl md:text-2xl font-bold">Track Request</h1>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <Button onClick={() => setView("resident")} variant="outline" size="sm" icon={<Send />}>
                            New Request
                        </Button>
                        <Button onClick={() => setView("staffLogin")} variant="secondary" size="sm" icon={<LogIn />}>
                            Staff Login
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Search & Detail View */}
                    <div className="lg:col-span-1 space-y-6">
                        <Section title="Check Request Status" icon={<Search size={20} />}>
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
                                <Button type="submit" disabled={isLoading || !trackingId}>
                                    {isLoading ? <Spinner /> : <Search size={18} />}
                                </Button>
                            </form>
                            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
                        </Section>

                        {isLoading && !trackedRequest && <div className="flex justify-center py-10"><Spinner /></div>}

                        {trackedRequest && (
                            <Section title={`Details for #${trackedRequest.id.substring(0, 8)}...`} icon={<FileText size={20} />} className="animate-fadeIn">
                                <h3 className="text-xl font-semibold mb-2 text-indigo-700">{trackedRequest.category}</h3>
                                <StatusBadge status={trackedRequest.status} large />
                                <div className="mt-4 space-y-3 border-t pt-4">
                                     <InfoItem icon={<MapPin />} label="Location" value={trackedRequest.address} />
                                     <InfoItem icon={<AlertCircle />} label="Priority" value={trackedRequest.priority || "N/A"} />
                                     <InfoItem icon={<Clock />} label="Submitted" value={formatTimestamp(trackedRequest.createdAt)} />
                                     <InfoItem icon={<Clock />} label="Last Update" value={formatTimestamp(trackedRequest.lastUpdatedAt)} />

                                     <div className="pt-2">
                                        <h4 className="text-sm font-medium text-gray-500 mb-1">Description</h4>
                                        <p className="text-gray-800 text-sm bg-gray-50 p-3 rounded-md border">{trackedRequest.description}</p>
                                    </div>

                                    {trackedRequest.imageUrl && (
                                        <div className="pt-2">
                                            <h4 className="text-sm font-medium text-gray-500 mb-1">Submitted Photo</h4>
                                            <a href={trackedRequest.imageUrl} target="_blank" rel="noopener noreferrer">
                                                <img src={trackedRequest.imageUrl} alt="Issue photo" className="w-full rounded-lg shadow border" />
                                            </a>
                                        </div>
                                    )}

                                    <div className="pt-2">
                                         <h4 className="text-sm font-medium text-gray-500 mb-2">History</h4>
                                         <ul className="space-y-3">
                                             {trackedRequest.history.slice().reverse().map((item, index) => (
                                                 <li key={index} className="flex items-start space-x-2 text-sm">
                                                     <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0"/>
                                                     <div>
                                                         <p className="font-medium text-gray-800">{item.action}</p>
                                                         <p className="text-xs text-gray-500">{formatTimestamp(item.timestamp)} by {item.user}</p>
                                                     </div>
                                                 </li>
                                             ))}
                                         </ul>
                                     </div>
                                </div>
                            </Section>
                        )}
                    </div>

                    {/* Public Requests List */}
                    <div className="lg:col-span-2">
                        <Section title="Recently Submitted Public Requests" icon={<Inbox size={20}/>}>
                             <p className="text-sm text-gray-600 mb-4">
                                 View recently submitted requests. Click the <Eye size={16} className="inline -mt-1 text-indigo-600"/> icon to see details.
                             </p>
                            <div className="overflow-x-auto border rounded-lg">
                                 <table className="min-w-full divide-y divide-gray-200">
                                     <thead className="bg-gray-50">
                                         <tr>
                                             <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                             <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                             <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Location</th>
                                             <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Submitted</th>
                                             <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">View</th>
                                         </tr>
                                     </thead>
                                     <tbody className="bg-white divide-y divide-gray-200">
                                         {publicRequests.length === 0 && (
                                             <tr><td colSpan="5" className="text-center py-4 text-gray-500">No public requests yet.</td></tr>
                                         )}
                                         {publicRequests.slice(0, 25).map(req => ( // Show 25 recent
                                             <tr key={req.id} className="hover:bg-gray-50">
                                                 <td className="px-4 py-3 whitespace-nowrap"><StatusBadge status={req.status}/></td>
                                                 <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 font-medium">{req.category}</td>
                                                 <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 hidden sm:table-cell truncate max-w-xs">{req.address}</td>
                                                 <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 hidden md:table-cell">{formatTimestamp(req.createdAt)}</td>
                                                 <td className="px-4 py-3 whitespace-nowrap text-center">
                                                     <button onClick={() => { setTrackingId(req.id); handleTrackRequest(req.id); }} className="text-indigo-600 hover:text-indigo-800 p-1 rounded-full hover:bg-indigo-100 transition">
                                                        <Eye size={18}/>
                                                    </button>
                                                 </td>
                                             </tr>
                                         ))}
                                     </tbody>
                                 </table>
                            </div>
                         </Section>
                    </div>
                </div>
            </main>
        </div>
    );
};


// --- (Component: Staff Login - Minor Style Update) ---
const StaffLogin = ({ setView, handleStaffLogin, isLoading, error }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        handleStaffLogin(email, password);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-sm">
                <div className="flex justify-center mb-6">
                    <div className="bg-white p-3 rounded-full shadow-lg">
                        <Shield size={32} className="text-indigo-600" />
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-white text-center mb-1">West Windsor 311</h1>
                <h2 className="text-lg text-indigo-100 text-center mb-8">Staff Portal Login</h2>

                <div className="bg-white rounded-xl shadow-2xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input label="Staff Email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required icon={<User />} />
                        <Input label="Password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required icon={<Lock />} />
                        <Button type="submit" className="w-full" size="lg" disabled={isLoading} icon={isLoading ? <Spinner /> : null}>
                            {isLoading ? "Logging In..." : "Login"}
                        </Button>
                        {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                        <div className="text-center mt-4">
                            <button onClick={() => setView("resident")} className="text-sm font-medium text-indigo-600 hover:underline">
                                &larr; Back to Public Portal
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// --- (Component: Staff Portal - Minor Style Update) ---
const StaffPortal = ({ user, profile, handleLogout, view, navigate, requests, selectedRequestId, staffList, setStaffList, setError, setSuccess, error, success }) => {
    // ... (selectedRequest logic unchanged) ...
     const selectedRequest = requests.find((r) => r.id === selectedRequestId);


    const renderView = () => { /* ... unchanged ... */ };

    return (
        <div className="min-h-screen flex bg-gray-100 font-sans">
            {/* Sidebar */}
            <nav className="w-60 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
                <div className="flex items-center space-x-3 p-4 border-b h-16">
                    <span className="bg-indigo-600 text-white p-2 rounded-lg shadow">
                        <Shield size={20} />
                    </span>
                    <h1 className="text-lg font-bold text-gray-800">WW 311 Staff</h1>
                </div>
                <div className="flex-grow p-4 space-y-1">
                    <StaffNavLink icon={<BarChart2 />} label="Dashboard" onClick={() => navigate("dashboard")} active={view === "dashboard"} />
                    <StaffNavLink icon={<Inbox />} label="All Requests" onClick={() => navigate("requests")} active={view === "requests"} />
                    {profile.role === STAFF_ROLES.ADMIN && (
                        <>
                            <div className="pt-4 mt-2 border-t">
                                <h3 className="px-2 mb-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">Admin Tools</h3>
                                <StaffNavLink icon={<Users />} label="User Management" onClick={() => navigate("adminUsers")} active={view === "adminUsers"}/>
                            </div>
                        </>
                    )}
                </div>
                <div className="p-4 border-t bg-gray-50">
                    <div className="mb-3">
                         <p className="text-sm font-medium text-gray-900 truncate">{profile.name}</p>
                         <p className="text-xs text-gray-500 truncate">{profile.email}</p>
                         {/* Role Badge - more compact */}
                         <span className={`text-xs font-semibold px-2 py-0.5 rounded mt-1 inline-block capitalize ${ profile.role === STAFF_ROLES.ADMIN ? "bg-red-100 text-red-700" : profile.role === STAFF_ROLES.MANAGER ? "bg-blue-100 text-blue-700" : profile.role === STAFF_ROLES.DEVELOPER ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-700" }`}>
                             {profile.role}
                         </span>
                    </div>
                     <Button variant="outline" size="sm" className="w-full" onClick={handleLogout} icon={<LogOut />}>
                        Logout
                    </Button>
                </div>
            </nav>
             {/* Main Content Area */}
             <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                {renderView()}
            </main>
        </div>
    );
};

// --- (Other Staff Components - Update Styles as Needed) ---
// (StaffNavLink, StaffDashboard, StatCard, StaffRequestList, RequestTable, StaffRequestDetail, AdminUserManagement, CommentBox)
// Apply consistent Tailwind classes for better visual harmony. Example updates:

const StaffNavLink = ({ icon, label, onClick, active }) => (
     <button onClick={onClick} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors duration-150 ${ active ? "bg-indigo-50 text-indigo-700 font-medium" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900" }`} >
        {React.cloneElement(icon, { size: 18, className: active ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-500' })}
        <span>{label}</span>
    </button>
);

const StatCard = ({ title, value, icon, color, onClick }) => {
     const colors = {
        blue: { bg: "bg-blue-50", text: "text-blue-600", iconBg: "bg-blue-100" },
        yellow: { bg: "bg-yellow-50", text: "text-yellow-600", iconBg: "bg-yellow-100" },
        green: { bg: "bg-green-50", text: "text-green-600", iconBg: "bg-green-100" },
        red: { bg: "bg-red-50", text: "text-red-600", iconBg: "bg-red-100" },
    };
     const C = colors[color] || colors.blue;

     return (
        <div className={`bg-white p-5 rounded-lg shadow border border-gray-200 flex items-center space-x-4 cursor-pointer hover:shadow-md hover:border-indigo-200 transition ${C.bg}`} onClick={onClick}>
             <div className={`p-3 rounded-full ${C.iconBg} ${C.text}`}>
                 {React.cloneElement(icon, { size: 24 })}
             </div>
             <div>
                 <p className="text-sm font-medium text-gray-500">{title}</p>
                 <p className="text-2xl font-bold text-gray-900">{value}</p>
             </div>
         </div>
     );
};

// --- (Main App Component - Unchanged) ---
function WW311() { // Renamed from App to avoid conflict if you merge
    // ... (Existing state and useEffect hooks for auth and data fetching) ...
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
     const [profile, setProfile] = useState(null); // Define profile state

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setIsAuthLoading(true);
      if (currentUser) {
        setUser(currentUser);
        const staffDocRef = doc(db, `users`, currentUser.uid);
        const staffDocSnap = await getDoc(staffDocRef);

        if (staffDocSnap.exists()) {
          const userProfile = { id: staffDocSnap.id, ...staffDocSnap.data() };
          setStaffProfile(userProfile);
          setProfile(userProfile); // Set the profile state here
          setView("staff");
          setStaffView("dashboard");
        } else {
          console.warn("User authenticated but no staff profile found.");
          setStaffProfile(null);
          setProfile(null); // Clear profile state
          setView("staffLogin");
        }
      } else {
        setUser(null);
        setStaffProfile(null);
        setProfile(null); // Clear profile state
        if (view === "staff") {
          setView("staffLogin");
        }
      }
      setIsAuthLoading(false);
    });

    return () => unsubscribe();
    }, [view]);

     // ... (Other useEffects for data fetching) ...
    useEffect(() => {
    if (!profile) return; // Use profile state now

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
  }, [profile]); // Depend on profile state

    useEffect(() => {
    const requestsCollectionRef = collection(db, `requests`);
    const q = query(requestsCollectionRef); // You might want to add `where('isPublic', '==', true)` if you add that field

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const publicData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Select only the fields needed for the public view
          publicData.push({
            id: doc.id,
            category: data.category,
            status: data.status,
            address: data.address,
            createdAt: data.createdAt,
            lastUpdatedAt: data.lastUpdatedAt,
            // DO NOT include description, internalNotes, submitter info etc.
          });
        });
        publicData.sort(
          (a, b) => (b.createdAt?.toDate() || 0) - (a.createdAt?.toDate() || 0)
        );
        setPublicRequests(publicData);
      },
      (err) => {
        console.error("Error fetching public requests:", err);
        // Optionally set an error state for the public view
      }
    );

    return () => unsubscribe();
  }, []); // Empty dependency array means this runs once on mount for public data

    useEffect(() => {
    if (profile && profile.role === STAFF_ROLES.ADMIN) { // Use profile state
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
    } else {
        setStaffList([]); // Clear staff list if not admin
    }
  }, [profile]); // Depend on profile state


     const handleStaffLogin = async (email, password) => { /* ... unchanged ... */ };
     const handleStaffLogout = async () => { /* ... unchanged ... */ };
     const handleRequestSubmit = async (formData, photoFile) => { /* ... existing logic ... */ };
     const handleTrackRequest = async (id) => { /* ... unchanged ... */ };
     const navigateStaff = (view, id = null) => { /* ... unchanged ... */ };

     // ... (Render logic based on 'view' state - Unchanged) ...
     if (isAuthLoading) {
        return <LoadingSpinner fullPage={true} />;
    }

    switch (view) {
        case "resident":
            return <ResidentPortal setView={setView} handleRequestSubmit={handleRequestSubmit} isLoading={isLoading} error={error} success={success} setError={setError} setSuccess={setSuccess} />;
        case "residentTrack":
            return <ResidentTrackPortal setView={setView} handleTrackRequest={handleTrackRequest} trackingId={trackingId} setTrackingId={setTrackingId} trackedRequest={trackedRequest} isLoading={isLoading} error={error} publicRequests={publicRequests} />;
        case "staffLogin":
            return <StaffLogin setView={setView} handleStaffLogin={handleStaffLogin} isLoading={isLoading} error={error} />;
        case "staff":
            // Pass the profile state to StaffPortal
            if (!profile) return <LoadingSpinner fullPage={true} />; // Ensure profile is loaded
            return <StaffPortal user={user} profile={profile} handleLogout={handleStaffLogout} view={staffView} navigate={navigateStaff} requests={requests} selectedRequestId={selectedRequestId} staffList={staffList} setStaffList={setStaffList} setError={setError} setSuccess={setSuccess} error={error} success={success} />;
        default:
            return <ResidentPortal setView={setView} handleRequestSubmit={handleRequestSubmit} isLoading={isLoading} error={error} success={success} setError={setError} setSuccess={setSuccess} />;
    }
}

// Ensure you export the main component if this is the root file for the 311 app
// export default WW311; // Uncomment if needed based on your main.tsx setup
