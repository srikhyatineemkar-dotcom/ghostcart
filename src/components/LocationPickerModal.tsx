import React, { useState, useEffect } from 'react';
import { MapPin, Search, Navigation, Home, Briefcase, Trash2, Check, X, AlertCircle, ArrowLeft, Edit2, Loader2, Save, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Address } from '../types';
import { db } from '../lib/supabase';

// High-quality localized directory of popular locations for fast, offline matching
const POPULAR_LOCATIONS = [
  { area: 'Gachibowli', city: 'Hyderabad', state: 'Telangana', pinCode: '500032', formatted: 'Gachibowli, Hyderabad, Telangana - 500032' },
  { area: 'Madhapur', city: 'Hyderabad', state: 'Telangana', pinCode: '500081', formatted: 'Madhapur, Hyderabad, Telangana - 500081' },
  { area: 'Kondapur', city: 'Hyderabad', state: 'Telangana', pinCode: '500084', formatted: 'Kondapur, Hyderabad, Telangana - 500084' },
  { area: 'Banjara Hills', city: 'Hyderabad', state: 'Telangana', pinCode: '500034', formatted: 'Banjara Hills, Hyderabad, Telangana - 500034' },
  { area: 'Jubilee Hills', city: 'Hyderabad', state: 'Telangana', pinCode: '500033', formatted: 'Jubilee Hills, Hyderabad, Telangana - 500033' },
  { area: 'Koramangala', city: 'Bengaluru', state: 'Karnataka', pinCode: '560095', formatted: 'Koramangala, Bengaluru, Karnataka - 560095' },
  { area: 'Indiranagar', city: 'Bengaluru', state: 'Karnataka', pinCode: '560038', formatted: 'Indiranagar, Bengaluru, Karnataka - 560038' },
  { area: 'HSR Layout', city: 'Bengaluru', state: 'Karnataka', pinCode: '560102', formatted: 'HSR Layout, Bengaluru, Karnataka - 560102' },
  { area: 'Whitefield', city: 'Bengaluru', state: 'Karnataka', pinCode: '560066', formatted: 'Whitefield, Bengaluru, Karnataka - 560066' },
  { area: 'Bandra', city: 'Mumbai', state: 'Maharashtra', pinCode: '400050', formatted: 'Bandra, Mumbai, Maharashtra - 400050' },
  { area: 'Powai', city: 'Mumbai', state: 'Maharashtra', pinCode: '400076', formatted: 'Powai, Mumbai, Maharashtra - 400076' },
  { area: 'DLF Cybercity', city: 'Gurugram', state: 'Haryana', pinCode: '122002', formatted: 'DLF Cybercity, Gurugram, Haryana - 122002' },
  { area: 'Connaught Place', city: 'New Delhi', state: 'Delhi', pinCode: '110001', formatted: 'Connaught Place, New Delhi, Delhi - 110001' },
  { area: 'Saket', city: 'New Delhi', state: 'Delhi', pinCode: '110017', formatted: 'Saket, New Delhi, Delhi - 110017' }
];

interface LocationPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeLocation: string;
  setActiveLocation: (loc: string) => void;
}

type ModalStep = 'choose' | 'manual' | 'gps_success';

export default function LocationPickerModal({
  isOpen,
  onClose,
  activeLocation,
  setActiveLocation
}: LocationPickerModalProps) {
  if (!isOpen) return null;

  const [step, setStep] = useState<ModalStep>('choose');
  const [searchText, setSearchText] = useState('');
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [isLocating, setIsLocating] = useState(false);
  const [gpsCoordinates, setGpsCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form states for manual / refine mode
  const [addressForm, setAddressForm] = useState({
    houseNumber: '',
    street: '',
    area: '',
    city: '',
    state: '',
    postalCode: '',
    landmark: ''
  });
  const [addressLabel, setAddressLabel] = useState<'Home' | 'Work' | 'Other'>('Home');
  const [customLabel, setCustomLabel] = useState('');
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

  // Fetch saved addresses on mount
  useEffect(() => {
    db.getAddresses().then(setSavedAddresses);
  }, []);

  // Filter autocomplete suggestions based on user search text
  const filteredSuggestions = POPULAR_LOCATIONS.filter(loc =>
    loc.area.toLowerCase().includes(searchText.toLowerCase()) ||
    loc.city.toLowerCase().includes(searchText.toLowerCase()) ||
    loc.state.toLowerCase().includes(searchText.toLowerCase()) ||
    loc.pinCode.includes(searchText)
  );

  // Handle GPS location detection
  const handleGetCurrentLocation = () => {
    setIsLocating(true);
    setErrorMsg(null);

    if (!navigator.geolocation) {
      setIsLocating(false);
      setErrorMsg('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setGpsCoordinates({ lat, lng });

        // Fill in defaults for the coordinates save step
        setAddressForm({
          houseNumber: '',
          street: '',
          area: 'GPS Location',
          city: `Lat: ${lat.toFixed(4)}`,
          state: `Lng: ${lng.toFixed(4)}`,
          postalCode: '',
          landmark: ''
        });

        // Save the raw GPS coordinates to localStorage as requested
        localStorage.setItem('ghostcart_gps_lat', lat.toString());
        localStorage.setItem('ghostcart_gps_lng', lng.toString());
        localStorage.setItem('ghostcart_gps_detected', 'true');

        setStep('gps_success');
      },
      (error) => {
        setIsLocating(false);
        console.warn('Geolocation blocked or failed:', error);
        setErrorMsg('Location permission denied.');
      },
      { enableHighAccuracy: true, timeout: 6000 }
    );
  };

  // Select place from popular locations instantly
  const handleSelectPopularLocation = (loc: typeof POPULAR_LOCATIONS[0]) => {
    const formatted = loc.formatted;
    setActiveLocation(formatted);
    localStorage.setItem('ghostcart_first_open_done', 'true');
    onClose();
  };

  // Convert GPS Coordinates to address and save
  const handleSaveGpsAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gpsCoordinates) return;

    const labelName = addressLabel === 'Other' ? (customLabel.trim() || 'Other') : addressLabel;
    const desc = `${addressForm.houseNumber ? addressForm.houseNumber + ', ' : ''}${addressForm.street ? addressForm.street + ', ' : ''}Detected Location (GPS: ${gpsCoordinates.lat.toFixed(5)}, ${gpsCoordinates.lng.toFixed(5)})`;

    const newAddr: Address = {
      id: `addr_${Date.now()}`,
      label: labelName,
      type: addressLabel.toLowerCase(),
      addressLine: desc,
      lat: gpsCoordinates.lat,
      lng: gpsCoordinates.lng,
      houseNumber: addressForm.houseNumber,
      street: addressForm.street,
      area: 'Current Location',
      city: 'GPS',
      state: 'Detected',
      postalCode: '',
      landmark: addressForm.landmark
    };

    const saved = await db.saveAddress(newAddr);
    setSavedAddresses(prev => [...prev.filter(a => a.id !== saved.id), saved]);
    setActiveLocation(desc);
    localStorage.setItem('ghostcart_first_open_done', 'true');
    onClose();
  };

  // Switch to an already saved address
  const handleSelectSavedAddress = (addr: Address) => {
    setActiveLocation(addr.addressLine);
    localStorage.setItem('ghostcart_first_open_done', 'true');
    onClose();
  };

  // Edit address
  const handleEditAddress = (addr: Address, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingAddressId(addr.id);

    setAddressForm({
      houseNumber: addr.houseNumber || '',
      street: addr.street || '',
      area: addr.area || '',
      city: addr.city || '',
      state: addr.state || '',
      postalCode: addr.postalCode || '',
      landmark: addr.landmark || ''
    });

    const isHome = (addr.type || addr.label || '').toLowerCase() === 'home';
    const isWork = (addr.type || addr.label || '').toLowerCase() === 'work';
    if (isHome) {
      setAddressLabel('Home');
    } else if (isWork) {
      setAddressLabel('Work');
    } else {
      setAddressLabel('Other');
      setCustomLabel(addr.label);
    }

    setStep('manual');
  };

  // Delete address
  const handleDeleteAddress = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await db.deleteAddress(id);
    setSavedAddresses(prev => prev.filter(a => a.id !== id));
  };

  // Save manual / edited form
  const handleSaveManualForm = async (e: React.FormEvent) => {
    e.preventDefault();

    const labelName = addressLabel === 'Other' ? (customLabel.trim() || 'Other') : addressLabel;

    const parts = [
      addressForm.houseNumber,
      addressForm.street,
      addressForm.landmark ? `(Near ${addressForm.landmark})` : '',
      addressForm.area,
      addressForm.city,
      addressForm.state,
      addressForm.postalCode
    ].filter(Boolean);

    const formattedAddress = parts.join(', ');

    const finalAddr: Address = {
      id: editingAddressId || `addr_${Date.now()}`,
      label: labelName,
      type: addressLabel.toLowerCase(),
      addressLine: formattedAddress,
      lat: gpsCoordinates?.lat || 0,
      lng: gpsCoordinates?.lng || 0,
      houseNumber: addressForm.houseNumber,
      street: addressForm.street,
      area: addressForm.area,
      city: addressForm.city,
      state: addressForm.state,
      postalCode: addressForm.postalCode,
      landmark: addressForm.landmark
    };

    const saved = await db.saveAddress(finalAddr);
    setSavedAddresses(prev => {
      const filtered = prev.filter(a => a.id !== saved.id);
      return [...filtered, saved];
    });

    setActiveLocation(formattedAddress);
    localStorage.setItem('ghostcart_first_open_done', 'true');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-white rounded-[32px] w-full max-w-[500px] max-h-[88vh] flex flex-col overflow-hidden shadow-2xl border border-slate-100 relative"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            {step !== 'choose' && (
              <button
                onClick={() => {
                  setStep('choose');
                  setEditingAddressId(null);
                  setGpsCoordinates(null);
                }}
                className="p-1.5 hover:bg-slate-100 rounded-full text-slate-600 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4.5 h-4.5" />
              </button>
            )}
            <div>
              <h3 className="font-display font-black text-slate-900 text-base tracking-tight leading-none">
                Delivering to
              </h3>
              <p className="text-[10px] font-semibold text-slate-400 mt-1.5 uppercase tracking-wider font-mono">
                {step === 'choose' ? 'Choose your delivery location' : step === 'manual' ? 'Enter address details' : 'GPS Location detected'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800 flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Inline Notifications */}
        {errorMsg && (
          <div className="mx-5 mt-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex gap-2.5 items-start animate-scale-up">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold block">Location permission denied.</span>
              <span className="text-slate-500 text-[11px] mt-0.5 block">Please search for your area below or type your address manually to proceed.</span>
            </div>
            <button onClick={() => setErrorMsg(null)} className="text-rose-400 hover:text-rose-700">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* STEP 1: Main Selection Menu */}
        {step === 'choose' && (
          <div className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-none">
            {/* Geolocation Trigger */}
            <button
              onClick={handleGetCurrentLocation}
              disabled={isLocating}
              className="w-full py-4 bg-[#FFE100] hover:bg-[#ebd000] disabled:bg-slate-100 disabled:text-slate-400 text-slate-950 text-xs font-black rounded-2xl flex items-center justify-center gap-2.5 transition-all shadow-xs cursor-pointer active:scale-98 relative overflow-hidden"
            >
              {isLocating ? (
                <Loader2 className="w-4.5 h-4.5 animate-spin" />
              ) : (
                <Navigation className="w-4.5 h-4.5" />
              )}
              {isLocating ? 'Detecting coordinates...' : 'Use Current Location'}
            </button>

            {/* Divider */}
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-100"></div>
              <span className="flex-shrink mx-4 text-[9px] font-black text-slate-300 uppercase tracking-widest font-mono">or</span>
              <div className="flex-grow border-t border-slate-100"></div>
            </div>

            {/* Search autocomplete bar */}
            <div className="relative">
              <div className="absolute left-4 top-3.5 flex items-center justify-center">
                <Search className="w-4 h-4 text-slate-400" />
              </div>
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search for area, street or apartment..."
                className="w-full pl-11 pr-12 py-3.5 bg-slate-50 hover:bg-slate-100/70 border border-slate-200/80 focus:border-slate-300 focus:bg-white rounded-2xl text-xs font-bold text-slate-800 shadow-2xs focus:outline-none transition-all placeholder-slate-400"
              />
              {searchText && (
                <button
                  onClick={() => setSearchText('')}
                  className="absolute right-4 top-3.5 text-xs font-black text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Search results dropdown */}
            {searchText.trim().length > 0 && (
              <div className="bg-slate-50 border border-slate-150 rounded-2xl divide-y divide-slate-100 overflow-hidden max-h-56 overflow-y-auto shadow-inner">
                {filteredSuggestions.map((loc, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectPopularLocation(loc)}
                    className="w-full text-left p-3.5 hover:bg-white text-xs text-slate-700 font-bold flex items-start gap-3 transition-colors"
                  >
                    <MapPin className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-900 block font-extrabold">{loc.area}</span>
                      <span className="text-slate-400 text-[10px]">{loc.city}, {loc.state} - {loc.pinCode}</span>
                    </div>
                  </button>
                ))}

                {filteredSuggestions.length === 0 && (
                  <button
                    onClick={() => {
                      setAddressForm(prev => ({ ...prev, area: searchText }));
                      setStep('manual');
                    }}
                    className="w-full text-left p-4 hover:bg-white text-xs text-indigo-600 font-extrabold flex items-center gap-2.5 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create custom location for "{searchText}"</span>
                  </button>
                )}
              </div>
            )}

            {/* Saved Locations Book */}
            {searchText.trim().length === 0 && (
              <div className="space-y-3">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider font-mono flex justify-between items-center">
                  <span>Saved Addresses</span>
                  <button
                    onClick={() => {
                      setEditingAddressId(null);
                      setAddressForm({
                        houseNumber: '',
                        street: '',
                        area: '',
                        city: '',
                        state: '',
                        postalCode: '',
                        landmark: ''
                      });
                      setStep('manual');
                    }}
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-extrabold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add New
                  </button>
                </div>

                <div className="space-y-2.5 max-h-[35vh] overflow-y-auto pr-1 scrollbar-none">
                  {savedAddresses.map((addr) => (
                    <div
                      key={addr.id}
                      onClick={() => handleSelectSavedAddress(addr)}
                      className="group bg-white hover:bg-slate-50 border border-slate-100 p-3.5 rounded-2xl flex items-start gap-3.5 transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-99"
                    >
                      <div className="p-2.5 bg-slate-50 group-hover:bg-white rounded-xl border border-slate-100/60 shrink-0 text-slate-500 transition-all">
                        {(addr.type || addr.label || '').toLowerCase().includes('home') ? (
                          <Home className="w-4 h-4" />
                        ) : (addr.type || addr.label || '').toLowerCase().includes('work') ? (
                          <Briefcase className="w-4 h-4" />
                        ) : (
                          <MapPin className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-black text-slate-800 flex items-center justify-between">
                          <span className="capitalize">{addr.label}</span>
                          <div className="flex gap-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <button
                              onClick={(e) => handleEditAddress(addr, e)}
                              className="text-slate-400 hover:text-slate-700 p-0.5 cursor-pointer"
                              title="Edit address"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => handleDeleteAddress(addr.id, e)}
                              className="text-slate-400 hover:text-red-500 p-0.5 cursor-pointer"
                              title="Delete address"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed break-words">
                          {addr.addressLine}
                        </p>
                      </div>
                    </div>
                  ))}

                  {savedAddresses.length === 0 && (
                    <div className="text-center py-8 text-xs text-slate-400 font-semibold border border-dashed border-slate-200 rounded-2xl bg-slate-50/30">
                      No saved addresses yet. Enter details manually or locate to save!
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: GPS Success Details Input */}
        {step === 'gps_success' && (
          <form onSubmit={handleSaveGpsAddress} className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-none">
              <div className="p-4 bg-emerald-50 border border-emerald-150 rounded-2xl flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white shrink-0">
                  <Check className="w-5 h-5 font-black" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-emerald-950">Current Location Detected</h4>
                  {gpsCoordinates && (
                    <p className="text-[10px] text-emerald-700 font-mono mt-0.5">
                      Coordinates: {gpsCoordinates.lat.toFixed(5)}°N, {gpsCoordinates.lng.toFixed(5)}°E
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider font-mono">
                  Complete GPS Address details
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wide">
                    House / Flat / Floor No.*
                  </label>
                  <input
                    type="text"
                    required
                    value={addressForm.houseNumber}
                    onChange={(e) => setAddressForm({ ...addressForm, houseNumber: e.target.value })}
                    placeholder="e.g. Flat 302, 3rd Floor"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-slate-400 focus:bg-white rounded-xl text-xs font-bold text-slate-800 focus:outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wide">
                    Street / Society / Apartment Name*
                  </label>
                  <input
                    type="text"
                    required
                    value={addressForm.street}
                    onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                    placeholder="e.g. Landmark Towers, Gachibowli Road"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-slate-400 focus:bg-white rounded-xl text-xs font-bold text-slate-800 focus:outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wide">
                    Landmark / Nearby Block (Optional)
                  </label>
                  <input
                    type="text"
                    value={addressForm.landmark}
                    onChange={(e) => setAddressForm({ ...addressForm, landmark: e.target.value })}
                    placeholder="e.g. Opposite ICICI Bank ATM"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-slate-400 focus:bg-white rounded-xl text-xs font-bold text-slate-800 focus:outline-none transition-all"
                  />
                </div>

                {/* Save Address As chips */}
                <div className="space-y-2 pt-1">
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-wide">
                    Save address as
                  </div>
                  <div className="flex gap-2.5">
                    {[
                      { name: 'Home', icon: Home },
                      { name: 'Work', icon: Briefcase },
                      { name: 'Other', icon: MapPin }
                    ].map((lbl) => {
                      const Icon = lbl.icon;
                      const isSelected = addressLabel === lbl.name;
                      return (
                        <button
                          key={lbl.name}
                          type="button"
                          onClick={() => setAddressLabel(lbl.name as any)}
                          className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            isSelected
                              ? 'border-slate-900 bg-slate-950 text-[#FFE100] shadow-sm'
                              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {lbl.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {addressLabel === 'Other' && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-1"
                  >
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-wide">
                      Custom Label
                    </label>
                    <input
                      type="text"
                      value={customLabel}
                      onChange={(e) => setCustomLabel(e.target.value)}
                      placeholder="e.g. Gym, Friend's Place"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-slate-400 focus:bg-white rounded-xl text-xs font-bold text-slate-800 focus:outline-none transition-all"
                    />
                  </motion.div>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-white flex gap-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setStep('choose');
                  setGpsCoordinates(null);
                }}
                className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3.5 bg-slate-900 hover:bg-slate-850 text-[#FFE100] text-xs font-black rounded-xl transition-all shadow-md active:scale-98 cursor-pointer"
              >
                Save & Deliver Here
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Manual Address Entry Form */}
        {step === 'manual' && (
          <form onSubmit={handleSaveManualForm} className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-none">
              <div className="space-y-3.5">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider font-mono">
                  Address Details
                </div>

                {/* House & Street Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-wide">
                      House / Flat No.*
                    </label>
                    <input
                      type="text"
                      required
                      value={addressForm.houseNumber}
                      onChange={(e) => setAddressForm({ ...addressForm, houseNumber: e.target.value })}
                      placeholder="e.g. Flat 302, Phase 1"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-slate-400 focus:bg-white rounded-xl text-xs font-bold text-slate-800 focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-wide">
                      Street / Locality*
                    </label>
                    <input
                      type="text"
                      required
                      value={addressForm.street}
                      onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                      placeholder="e.g. Gagan Vihar Road"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-slate-400 focus:bg-white rounded-xl text-xs font-bold text-slate-800 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Landmark */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wide">
                    Landmark / Block (Optional)
                  </label>
                  <input
                    type="text"
                    value={addressForm.landmark}
                    onChange={(e) => setAddressForm({ ...addressForm, landmark: e.target.value })}
                    placeholder="e.g. Next to Apollo Pharmacy"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-slate-400 focus:bg-white rounded-xl text-xs font-bold text-slate-800 focus:outline-none transition-colors"
                  />
                </div>

                {/* Area / Locality */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wide">
                    Area / Sub-locality*
                  </label>
                  <input
                    type="text"
                    required
                    value={addressForm.area}
                    onChange={(e) => setAddressForm({ ...addressForm, area: e.target.value })}
                    placeholder="e.g. Banjara Hills"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-slate-400 focus:bg-white rounded-xl text-xs font-bold text-slate-800 focus:outline-none transition-colors"
                  />
                </div>

                {/* City, State & PIN Code */}
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-wide">
                      City*
                    </label>
                    <input
                      type="text"
                      required
                      value={addressForm.city}
                      onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                      placeholder="e.g. Hyderabad"
                      className="w-full px-2.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-slate-400 focus:bg-white rounded-xl text-[11px] font-bold text-slate-800 focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-wide">
                      State*
                    </label>
                    <input
                      type="text"
                      required
                      value={addressForm.state}
                      onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                      placeholder="e.g. Telangana"
                      className="w-full px-2.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-slate-400 focus:bg-white rounded-xl text-[11px] font-bold text-slate-800 focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-wide">
                      PIN Code*
                    </label>
                    <input
                      type="text"
                      required
                      value={addressForm.postalCode}
                      onChange={(e) => setAddressForm({ ...addressForm, postalCode: e.target.value })}
                      placeholder="e.g. 500034"
                      className="w-full px-2.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-slate-400 focus:bg-white rounded-xl text-[11px] font-bold text-slate-800 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Save As chips */}
                <div className="space-y-2 pt-1">
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-wide">
                    Save address as
                  </div>
                  <div className="flex gap-2.5">
                    {[
                      { name: 'Home', icon: Home },
                      { name: 'Work', icon: Briefcase },
                      { name: 'Other', icon: MapPin }
                    ].map((lbl) => {
                      const Icon = lbl.icon;
                      const isSelected = addressLabel === lbl.name;
                      return (
                        <button
                          key={lbl.name}
                          type="button"
                          onClick={() => setAddressLabel(lbl.name as any)}
                          className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            isSelected
                              ? 'border-slate-900 bg-slate-950 text-[#FFE100] shadow-sm'
                              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {lbl.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {addressLabel === 'Other' && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-1"
                  >
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-wide">
                      Custom Label
                    </label>
                    <input
                      type="text"
                      value={customLabel}
                      onChange={(e) => setCustomLabel(e.target.value)}
                      placeholder="e.g. Friend's Place, Hostel"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-slate-400 focus:bg-white rounded-xl text-xs font-bold text-slate-800 focus:outline-none transition-all"
                    />
                  </motion.div>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-white flex gap-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setStep('choose');
                  setEditingAddressId(null);
                }}
                className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 py-3.5 bg-slate-900 hover:bg-slate-850 text-[#FFE100] text-xs font-black rounded-xl transition-all shadow-md active:scale-98 cursor-pointer"
              >
                Save & Confirm Address
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
