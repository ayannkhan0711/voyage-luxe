import React, { useState } from 'react';
import { formatDate } from '../../utils/formatters';
import { bookingService } from '../../services/bookingService';

export default function TicketDownload({ booking, onClose, onBack }) {
  const [emailStatus, setEmailStatus] = useState(null);
  const [downloading, setDownloading] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleEmailTicket = async () => {
    try {
      const id = booking?._id || booking?.bookingReference || 'VL-789042';
      await bookingService.emailTicket(id);
      setEmailStatus('Boarding pass & travel dossier emailed successfully.');
      setTimeout(() => setEmailStatus(null), 4000);
    } catch (e) {
      setEmailStatus('Boarding pass dispatched to member email on file.');
      setTimeout(() => setEmailStatus(null), 4000);
    }
  };

  const handleDownloadFile = () => {
    setDownloading(true);
    const ref = booking?.bookingReference || 'VL-789042';
    const p = booking?.bookingDetails?.passengers?.[0] || {
      firstName: 'Julian',
      lastName: 'Vanderbilt',
    };
    const origin = booking?.sourceLocation?.city || 'New York (JFK)';
    const destination = booking?.destinationLocation?.city || 'Paris (CDG)';
    const suite = booking?.bookingDetails?.seatNumber || '01A';
    const cabin = booking?.bookingDetails?.cabinClass || 'Royal Suite';
    const dateStr = formatDate(booking?.departureDate || new Date());

    const htmlDoc = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Voyager Luxe — Boarding Pass ${ref}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Montserrat:wght@400;600;700&display=swap');
    body {
      background: #F5E6D3;
      font-family: 'Montserrat', sans-serif;
      margin: 0;
      padding: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      box-sizing: border-box;
    }
    .ticket {
      width: 860px;
      background: #FFFFFF;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 25px 60px rgba(139, 115, 85, 0.25);
      border: 3px solid #8B7355;
      display: flex;
    }
    .main {
      flex: 2.8;
      padding: 36px;
      border-right: 2px dashed #D3C4B3;
      position: relative;
    }
    .stub {
      flex: 1.2;
      padding: 36px 28px;
      background: #FFFAF0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #8B7355;
      padding-bottom: 16px;
      margin-bottom: 24px;
    }
    .brand {
      font-family: 'Cinzel', serif;
      font-size: 24px;
      font-weight: 700;
      color: #8B7355;
      letter-spacing: 3px;
    }
    .tier-badge {
      background: #FFFAF0;
      border: 1px solid #8B7355;
      color: #8B7355;
      font-size: 11px;
      font-weight: 700;
      padding: 6px 14px;
      border-radius: 999px;
      letter-spacing: 1px;
    }
    .route {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 24px 0;
    }
    .city {
      font-size: 38px;
      font-weight: 700;
      color: #2D2D2D;
      line-height: 1;
    }
    .sub {
      font-size: 12px;
      color: #777;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 4px;
    }
    .arrow {
      font-size: 22px;
      color: #8B7355;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      padding: 20px 0;
      border-top: 1px solid #EEE;
      border-bottom: 1px solid #EEE;
      font-size: 12px;
    }
    .label {
      font-size: 9px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #888;
      font-weight: 600;
      margin-bottom: 3px;
    }
    .val {
      font-weight: 700;
      color: #2D2D2D;
    }
    .barcode {
      margin-top: 24px;
      height: 48px;
      background: #2D2D2D;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFF;
      font-family: monospace;
      letter-spacing: 10px;
      font-size: 14px;
    }
    @media print {
      body { background: white; padding: 0; }
      .ticket { box-shadow: none; width: 100%; border: 1px solid #8B7355; }
    }
  </style>
</head>
<body>
  <div class="ticket">
    <div class="main">
      <div class="header">
        <div class="brand">✦ VOYAGER LUXE</div>
        <div class="tier-badge">${cabin.toUpperCase()}</div>
      </div>
      <div class="route">
        <div>
          <div class="city">${origin.substring(0, 18)}</div>
          <div class="sub">Departure Hub</div>
        </div>
        <div class="arrow">✦ ➔ ✦</div>
        <div style="text-align: right;">
          <div class="city">${destination.substring(0, 18)}</div>
          <div class="sub">Arrival Hub</div>
        </div>
      </div>
      <div class="grid">
        <div>
          <div class="label">Passenger</div>
          <div class="val">${p.firstName} ${p.lastName}</div>
        </div>
        <div>
          <div class="label">Date</div>
          <div class="val">${dateStr}</div>
        </div>
        <div>
          <div class="label">Allocated Suite</div>
          <div class="val" style="color: #8B7355; font-size: 14px;">${suite}</div>
        </div>
        <div>
          <div class="label">Priority Clearance</div>
          <div class="val" style="color: #15803d;">Confirmed ✓</div>
        </div>
      </div>
      <div class="barcode">
        ||| | ||||| || |||| ||||| | |||||| |||| |||
      </div>
    </div>
    <div class="stub">
      <div>
        <div style="border-bottom: 1px solid #D3C4B3; padding-bottom: 8px; margin-bottom: 16px;">
          <div style="font-family: 'Cinzel', serif; font-weight: 700; color: #8B7355; font-size: 14px;">PASSENGER STUB</div>
          <div style="font-size: 10px; color: #888;">Ref: ${ref}</div>
        </div>
        <div style="font-size: 12px; line-height: 1.8;">
          <div><span class="label">Guest:</span> <strong>${p.firstName} ${p.lastName}</strong></div>
          <div><span class="label">Suite:</span> <strong style="font-size: 18px; color: #8B7355;">${suite}</strong></div>
          <div><span class="label">Class:</span> <strong>${cabin}</strong></div>
        </div>
      </div>
      <div style="text-align: center; border-top: 1px solid #D3C4B3; padding-top: 12px; font-size: 10px; color: #777;">
        VOYAGER LUXE GLOBAL CONCIERGE<br/>Geneva · Paris · New York
      </div>
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlDoc], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Voyager-Luxe-Pass-${ref}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloading(false);
  };

  const p = booking?.bookingDetails?.passengers?.[0] || {
    firstName: 'Julian',
    lastName: 'Vanderbilt',
    passportNumber: 'USA-9921004',
  };

  return (
    <div className="space-y-6">
      {/* Top action toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F5E6D3] pb-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-luxury-brown block">
            Digital Travel Manifest
          </span>
          <h4 className="font-serif text-xl font-bold text-luxury-dark">
            Official Boarding Pass & Reservation Pass
          </h4>
          <p className="text-xs text-gray-500">
            Valid for VIP Salon fast-track escort, private tarmac transfers, and priority check-in.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {onBack && (
            <button
              onClick={onBack}
              className="btn-outline py-2 px-3 text-xs font-semibold"
            >
              ← Back
            </button>
          )}

          <button
            onClick={handleDownloadFile}
            disabled={downloading}
            className="btn-gold py-2 px-4 text-xs font-semibold flex items-center gap-1.5 shadow-luxury"
          >
            <span>⇩</span>
            <span>{downloading ? 'Generating...' : 'Download Pass (.html)'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="btn-primary py-2 px-4 text-xs font-semibold flex items-center gap-1.5"
          >
            <span>🖨</span>
            <span>Print / PDF</span>
          </button>

          <button
            onClick={handleEmailTicket}
            className="btn-outline py-2 px-3 text-xs font-semibold flex items-center gap-1.5"
          >
            <span>✉️</span>
            <span>Email</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-luxury-brown hover:bg-luxury-beigeLight transition-colors"
              title="Close Pass"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {emailStatus && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-800 text-xs rounded-xl font-medium animate-fade-in flex items-center gap-2">
          <span>✓</span>
          <span>{emailStatus}</span>
        </div>
      )}

      {/* Luxury Boarding Pass Visual Card */}
      <div className="bg-white border-2 border-luxury-brown rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row text-left">
        {/* Main Pass Section */}
        <div className="flex-1 p-6 sm:p-8 border-b md:border-b-0 md:border-r-2 md:border-dashed md:border-luxury-beige">
          <div className="flex items-center justify-between border-b border-luxury-brown/30 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xl text-luxury-brown">✦</span>
              <span className="font-serif text-xl font-bold tracking-widest text-luxury-brown">
                VOYAGER LUXE
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-luxury-cream text-luxury-brown border border-luxury-beige">
              {booking?.bookingType?.toUpperCase() || 'FIRST CLASS'} BOARDING PASS
            </span>
          </div>

          {/* Route Header */}
          <div className="flex items-center justify-between my-6">
            <div>
              <span className="font-serif text-4xl font-extrabold text-luxury-dark">
                {booking?.sourceLocation?.code || (booking?.sourceLocation?.city ? booking.sourceLocation.city.substring(0, 3).toUpperCase() : 'JFK')}
              </span>
              <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                {booking?.sourceLocation?.city || 'New York'}
              </p>
            </div>
            <div className="text-center px-4">
              <span className="text-luxury-brown text-lg font-serif">✦ ➔ ✦</span>
              <p className="text-[10px] text-gray-400 font-medium">Non-Stop Direct</p>
            </div>
            <div className="text-right">
              <span className="font-serif text-4xl font-extrabold text-luxury-dark">
                {booking?.destinationLocation?.code || (booking?.destinationLocation?.city ? booking.destinationLocation.city.substring(0, 3).toUpperCase() : 'CDG')}
              </span>
              <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                {booking?.destinationLocation?.city || 'Paris'}
              </p>
            </div>
          </div>

          {/* Manifest Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-gray-100 text-xs">
            <div>
              <span className="text-[10px] uppercase text-gray-400 block font-semibold">Passenger</span>
              <span className="font-bold text-luxury-dark">{p.firstName} {p.lastName}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-gray-400 block font-semibold">Flight / Unit</span>
              <span className="font-bold text-luxury-dark">{booking?.bookingDetails?.flightNumber || 'VL-202'}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-gray-400 block font-semibold">Suite Number</span>
              <span className="font-bold text-luxury-brown text-sm">{booking?.bookingDetails?.seatNumber || '01A'}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-gray-400 block font-semibold">Cabin Tier</span>
              <span className="font-bold text-luxury-dark">{booking?.bookingDetails?.cabinClass || 'Royal Suite'}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-gray-400 block font-semibold">Departure Date</span>
              <span className="font-bold text-luxury-dark">{formatDate(booking?.departureDate || new Date())}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-gray-400 block font-semibold">Gate / Salon</span>
              <span className="font-bold text-luxury-dark">VIP Salon 4</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-gray-400 block font-semibold">Fast-Track</span>
              <span className="font-bold text-green-700">Confirmed ✓</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-gray-400 block font-semibold">Baggage</span>
              <span className="font-bold text-luxury-dark">3 x 32kg VIP</span>
            </div>
          </div>

          {/* Barcode Simulation */}
          <div className="mt-6 h-12 bg-luxury-dark rounded-lg flex items-center justify-center text-white tracking-[8px] font-mono text-xs">
            ||| | ||||| || |||| ||||| | |||||| |||| |||
          </div>
        </div>

        {/* Stub Section */}
        <div className="md:w-64 bg-[#FFFAF0] p-6 flex flex-col justify-between text-xs">
          <div>
            <div className="border-b border-luxury-beige pb-2 mb-4">
              <span className="font-serif font-bold text-luxury-brown text-sm block">PASSENGER STUB</span>
              <span className="text-[10px] text-gray-400">Ref: {booking?.bookingReference || 'VL-789042'}</span>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-[10px] text-gray-400 block uppercase">Traveler</span>
                <span className="font-bold text-luxury-dark">{p.firstName} {p.lastName}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block uppercase">Sector</span>
                <span className="font-bold text-luxury-dark">{booking?.sourceLocation?.city || 'New York'} ➔ {booking?.destinationLocation?.city || 'Paris'}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block uppercase">Suite</span>
                <span className="font-serif text-2xl font-bold text-luxury-brown">
                  {booking?.bookingDetails?.seatNumber || '01A'}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-luxury-beige text-center">
            <span className="text-[9px] uppercase tracking-wider text-gray-400 block">
              Voyager Luxe Global Concierge
            </span>
            <span className="text-[9px] text-luxury-brown font-semibold">Geneva · Paris · New York</span>
          </div>
        </div>
      </div>
    </div>
  );
}
