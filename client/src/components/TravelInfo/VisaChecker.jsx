import React, { useState, useEffect, useRef } from 'react';
import { travelInfoService } from '../../services/travelInfoService';

export default function VisaChecker() {
  const [fromCountry, setFromCountry] = useState('India');
  const [toCountry, setToCountry] = useState('France');
  const [visaData, setVisaData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Drag and drop demo visa state
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(30);
  const [isApproved, setIsApproved] = useState(false);
  const timerRef = useRef(null);
  const fileInputRef = useRef(null);

  const countries = [
    'India',
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'Japan',
    'Singapore',
    'France',
    'Switzerland',
    'United Arab Emirates',
    'Italy',
    'Germany',
  ];

  const handleCheck = async () => {
    setLoading(true);
    try {
      const data = await travelInfoService.getVisaInfo(fromCountry, toCountry);
      setVisaData(data);
    } catch (e) {
      setVisaData({
        status: fromCountry === 'India' && toCountry === 'France'
          ? 'Schengen Visa Required (VIP Fast-Track Clearance Available)'
          : 'Visa Free (Up to 90 Days for Tourism & Business)',
        processingTime: 'Priority 24-48 Hours with Voyager Luxe Diplomatic Attache',
        fee: '$0 (Waived for Voyager Luxe Centurion Dossier Holders)',
        requirements: [
          'Valid biometric passport (at least 6 months validity)',
          'Confirmed return private charter manifest or flight booking',
          'Proof of 5-star palace accommodation reservation',
          'Premier Shield international health insurance with $500,000+ emergency cover',
        ],
        conciergeAssistance: 'Voyager Luxe automatically dispatches your electronic border dossier to embassy authorities.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCheck();
  }, [fromCountry, toCountry]);

  // Handle Drag and Drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    setUploadedFile({
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB',
      uploadedAt: new Date().toLocaleTimeString(),
    });
    setIsApproved(false);
    startVerificationCountdown();
  };

  const handleUseDemoVisa = () => {
    setUploadedFile({
      name: `VIP_Schengen_Diplomatic_Visa_${fromCountry}_to_${toCountry}.pdf`,
      size: '2.4 MB',
      uploadedAt: new Date().toLocaleTimeString(),
    });
    setIsApproved(false);
    startVerificationCountdown();
  };

  const startVerificationCountdown = () => {
    setIsVerifying(true);
    setTimerSeconds(30);

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsVerifying(false);
          setIsApproved(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="bg-white border border-[#F5E6D3] rounded-3xl p-6 sm:p-8 shadow-luxury space-y-8 text-left">
      <div className="border-b border-[#F5E6D3] pb-4">
        <span className="text-[10px] uppercase font-bold tracking-widest text-luxury-brown block mb-1">
          Diplomatic Intelligence & Border Control
        </span>
        <h3 className="font-serif text-3xl font-bold text-luxury-dark">
          Visa & Border Clearance Dossier
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Verify electronic entry authorizations, upload demo visa credentials for automated 30-second biometric clearance approval.
        </p>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">
            Passport / Citizenship of Origin
          </label>
          <select
            value={fromCountry}
            onChange={(e) => setFromCountry(e.target.value)}
            className="w-full bg-[#FFFAF0] border border-luxury-beige rounded-xl p-3 text-xs font-semibold text-luxury-dark focus:outline-none focus:border-luxury-brown cursor-pointer"
          >
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">
            Destination Sanctuary
          </label>
          <select
            value={toCountry}
            onChange={(e) => setToCountry(e.target.value)}
            className="w-full bg-[#FFFAF0] border border-luxury-beige rounded-xl p-3 text-xs font-semibold text-luxury-dark focus:outline-none focus:border-luxury-brown cursor-pointer"
          >
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ══════════ DRAG & DROP DEMO VISA SECTION ══════════ */}
      <div className="border-t border-[#F5E6D3] pt-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-serif text-lg font-bold text-luxury-dark flex items-center gap-2">
              <span className="text-luxury-brown">🛂</span> Electronic Visa Drag & Drop Portal
            </h4>
            <p className="text-xs text-gray-500">
              Drop any demo visa PDF, image, or document. Our automated consular engine validates and approves in 30 seconds.
            </p>
          </div>
          <button
            type="button"
            onClick={handleUseDemoVisa}
            className="hidden sm:inline-flex btn-outline text-xs px-3.5 py-1.5 uppercase tracking-wider font-semibold"
          >
            + Load Demo Visa
          </button>
        </div>

        {/* Drop Zone Box */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all duration-300 ${
            isDragging
              ? 'border-luxury-brown bg-[#FFFAF0] scale-[1.01]'
              : 'border-[#E8DCCF] bg-[#FFFAF0]/50 hover:bg-[#FFFAF0] hover:border-luxury-brown'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileInputChange}
            accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
            className="hidden"
          />

          <div className="max-w-md mx-auto space-y-3">
            <span className="text-4xl block animate-bounce">📄</span>
            <p className="text-sm font-bold text-luxury-dark">
              Drag & Drop your demo visa document here
            </p>
            <p className="text-xs text-luxury-muted">
              Supports PDF, PNG, JPG scans (Max 25MB) or click to browse files
            </p>
            <div className="pt-2">
              <span className="inline-block text-[11px] font-semibold text-luxury-brown bg-white border border-luxury-beige px-3 py-1 rounded-full shadow-sm">
                ✦ 30-Second Automated Consular Approval Guarantee
              </span>
            </div>
          </div>
        </div>

        {/* Upload Status & 30-Sec Approval Card */}
        {uploadedFile && (
          <div className="bg-[#FFFAF0] border border-luxury-beige rounded-2xl p-6 space-y-4 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-luxury-beige/60 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📋</span>
                <div>
                  <h5 className="font-bold text-sm text-luxury-dark">{uploadedFile.name}</h5>
                  <p className="text-[11px] text-gray-500">
                    File size: {uploadedFile.size} · Uploaded at: {uploadedFile.uploadedAt}
                  </p>
                </div>
              </div>

              <div>
                {isVerifying && (
                  <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-full text-amber-800 text-xs font-bold animate-pulse">
                    <span className="animate-spin text-sm">⏳</span>
                    <span>Consular Verification: {timerSeconds}s remaining</span>
                  </div>
                )}
                {isApproved && (
                  <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-300 px-4 py-1.5 rounded-full text-emerald-800 text-xs font-bold shadow-sm animate-fade-in">
                    <span>✓</span>
                    <span>VISA APPROVED & DIPLOMATIC CLEARANCE GRANTED</span>
                  </div>
                )}
              </div>
            </div>

            {/* Progress Bar during countdown */}
            {isVerifying && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-gray-600">
                  <span>Biometric Matching & Interpol Registry Handshake</span>
                  <span>{Math.round(((30 - timerSeconds) / 30) * 100)}%</span>
                </div>
                <div className="w-full bg-white h-2.5 rounded-full overflow-hidden border border-luxury-beige">
                  <div
                    className="bg-gold-gradient h-full transition-all duration-1000 ease-linear rounded-full"
                    style={{ width: `${((30 - timerSeconds) / 30) * 100}%` }}
                  />
                </div>
                <p className="text-[11px] text-gray-400 italic">
                  Running automated security checks with {toCountry} Immigration Bureau...
                </p>
              </div>
            )}

            {/* Approved Manifest Badge */}
            {isApproved && (
              <div className="bg-white border-2 border-emerald-500/40 rounded-2xl p-5 space-y-3 animate-fade-in shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                      Official Visa Authorization Clearance #VL-{Date.now().toString().slice(-6)}
                    </span>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
                    VALIDATED
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase block">Traveler Dossier</span>
                    <strong className="text-luxury-dark">Verified VIP Member</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase block">Route</span>
                    <strong className="text-luxury-dark">{fromCountry} ➔ {toCountry}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase block">Entry Class</span>
                    <strong className="text-luxury-brown font-bold">Diplomatic Fast-Track</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase block">Border Lane</span>
                    <strong className="text-emerald-700 font-bold">FBO Private Terminal</strong>
                  </div>
                </div>

                <p className="text-xs text-gray-500 pt-2 border-t border-gray-100">
                  Your visa authorization token has been synchronized with your Voyager Luxe Boarding Pass and will automatically clear VIP e-Gates upon arrival.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Verification Result Card */}
      {visaData && (
        <div className="bg-[#FFFAF0] border border-luxury-beige rounded-2xl p-6 space-y-4 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-luxury-beige/60 pb-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400">Status Clearance</span>
              <h4 className="font-serif text-lg font-bold text-luxury-brown">
                {visaData.status}
              </h4>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase text-gray-400">Processing Time</span>
              <p className="text-xs font-bold text-luxury-dark">{visaData.processingTime}</p>
            </div>
          </div>

          <div>
            <span className="text-xs font-bold text-luxury-dark block mb-2">
              Mandatory Entry Credentials:
            </span>
            <ul className="space-y-1.5 text-xs text-gray-600">
              {visaData.requirements?.map((req, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-luxury-brown font-bold">✓</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2 border-t border-luxury-beige/60 text-xs text-luxury-brown font-medium flex items-center gap-2">
            <span>✦</span>
            <span>{visaData.conciergeAssistance}</span>
          </div>
        </div>
      )}
    </div>
  );
}
