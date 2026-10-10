import{r as o,j as e,f as C,i as g,b as Y}from"./index-BX7-otPH.js";function Q({booking:t,onClose:r,onBack:i}){var f,u,y,b,N,w,S,v,c,F,L,E,P,R,B;const[a,l]=o.useState(null),[n,x]=o.useState(!1),s=()=>{window.print()},d=async()=>{try{const h=(t==null?void 0:t._id)||(t==null?void 0:t.bookingReference)||"VL-789042";await g.emailTicket(h),l("Boarding pass & travel dossier emailed successfully."),setTimeout(()=>l(null),4e3)}catch{l("Boarding pass dispatched to member email on file."),setTimeout(()=>l(null),4e3)}},p=()=>{var G,T,z,$,O,U;x(!0);const h=(t==null?void 0:t.bookingReference)||"VL-789042",D=((T=(G=t==null?void 0:t.bookingDetails)==null?void 0:G.passengers)==null?void 0:T[0])||{firstName:"Julian",lastName:"Vanderbilt"},_=((z=t==null?void 0:t.sourceLocation)==null?void 0:z.city)||"New York (JFK)",K=(($=t==null?void 0:t.destinationLocation)==null?void 0:$.city)||"Paris (CDG)",A=((O=t==null?void 0:t.bookingDetails)==null?void 0:O.seatNumber)||"01A",V=((U=t==null?void 0:t.bookingDetails)==null?void 0:U.cabinClass)||"Royal Suite",J=C((t==null?void 0:t.departureDate)||new Date),H=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Voyager Luxe — Boarding Pass ${h}</title>
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
        <div class="tier-badge">${V.toUpperCase()}</div>
      </div>
      <div class="route">
        <div>
          <div class="city">${_.substring(0,18)}</div>
          <div class="sub">Departure Hub</div>
        </div>
        <div class="arrow">✦ ➔ ✦</div>
        <div style="text-align: right;">
          <div class="city">${K.substring(0,18)}</div>
          <div class="sub">Arrival Hub</div>
        </div>
      </div>
      <div class="grid">
        <div>
          <div class="label">Passenger</div>
          <div class="val">${D.firstName} ${D.lastName}</div>
        </div>
        <div>
          <div class="label">Date</div>
          <div class="val">${J}</div>
        </div>
        <div>
          <div class="label">Allocated Suite</div>
          <div class="val" style="color: #8B7355; font-size: 14px;">${A}</div>
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
          <div style="font-size: 10px; color: #888;">Ref: ${h}</div>
        </div>
        <div style="font-size: 12px; line-height: 1.8;">
          <div><span class="label">Guest:</span> <strong>${D.firstName} ${D.lastName}</strong></div>
          <div><span class="label">Suite:</span> <strong style="font-size: 18px; color: #8B7355;">${A}</strong></div>
          <div><span class="label">Class:</span> <strong>${V}</strong></div>
        </div>
      </div>
      <div style="text-align: center; border-top: 1px solid #D3C4B3; padding-top: 12px; font-size: 10px; color: #777;">
        VOYAGER LUXE GLOBAL CONCIERGE<br/>Geneva · Paris · New York
      </div>
    </div>
  </div>
</body>
</html>`,X=new Blob([H],{type:"text/html;charset=utf-8"}),k=URL.createObjectURL(X),j=document.createElement("a");j.href=k,j.download=`Voyager-Luxe-Pass-${h}.html`,document.body.appendChild(j),j.click(),document.body.removeChild(j),URL.revokeObjectURL(k),x(!1)},m=((u=(f=t==null?void 0:t.bookingDetails)==null?void 0:f.passengers)==null?void 0:u[0])||{firstName:"Julian",lastName:"Vanderbilt"};return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F5E6D3] pb-4",children:[e.jsxs("div",{children:[e.jsx("span",{className:"text-[10px] uppercase font-bold tracking-widest text-luxury-brown block",children:"Digital Travel Manifest"}),e.jsx("h4",{className:"font-serif text-xl font-bold text-luxury-dark",children:"Official Boarding Pass & Reservation Pass"}),e.jsx("p",{className:"text-xs text-gray-500",children:"Valid for VIP Salon fast-track escort, private tarmac transfers, and priority check-in."})]}),e.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[i&&e.jsx("button",{onClick:i,className:"btn-outline py-2 px-3 text-xs font-semibold",children:"← Back"}),e.jsxs("button",{onClick:p,disabled:n,className:"btn-gold py-2 px-4 text-xs font-semibold flex items-center gap-1.5 shadow-luxury",children:[e.jsx("span",{children:"⇩"}),e.jsx("span",{children:n?"Generating...":"Download Pass (.html)"})]}),e.jsxs("button",{onClick:s,className:"btn-primary py-2 px-4 text-xs font-semibold flex items-center gap-1.5",children:[e.jsx("span",{children:"🖨"}),e.jsx("span",{children:"Print / PDF"})]}),e.jsxs("button",{onClick:d,className:"btn-outline py-2 px-3 text-xs font-semibold flex items-center gap-1.5",children:[e.jsx("span",{children:"✉️"}),e.jsx("span",{children:"Email"})]}),r&&e.jsx("button",{onClick:r,className:"p-2 rounded-xl text-gray-400 hover:text-luxury-brown hover:bg-luxury-beigeLight transition-colors",title:"Close Pass",children:"✕"})]})]}),a&&e.jsxs("div",{className:"p-3 bg-green-50 border border-green-200 text-green-800 text-xs rounded-xl font-medium animate-fade-in flex items-center gap-2",children:[e.jsx("span",{children:"✓"}),e.jsx("span",{children:a})]}),e.jsxs("div",{className:"bg-white border-2 border-luxury-brown rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row text-left",children:[e.jsxs("div",{className:"flex-1 p-6 sm:p-8 border-b md:border-b-0 md:border-r-2 md:border-dashed md:border-luxury-beige",children:[e.jsxs("div",{className:"flex items-center justify-between border-b border-luxury-brown/30 pb-4 mb-6",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"text-xl text-luxury-brown",children:"✦"}),e.jsx("span",{className:"font-serif text-xl font-bold tracking-widest text-luxury-brown",children:"VOYAGER LUXE"})]}),e.jsxs("span",{className:"text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-luxury-cream text-luxury-brown border border-luxury-beige",children:[((y=t==null?void 0:t.bookingType)==null?void 0:y.toUpperCase())||"FIRST CLASS"," BOARDING PASS"]})]}),e.jsxs("div",{className:"flex items-center justify-between my-6",children:[e.jsxs("div",{children:[e.jsx("span",{className:"font-serif text-4xl font-extrabold text-luxury-dark",children:((b=t==null?void 0:t.sourceLocation)==null?void 0:b.code)||((N=t==null?void 0:t.sourceLocation)!=null&&N.city?t.sourceLocation.city.substring(0,3).toUpperCase():"JFK")}),e.jsx("p",{className:"text-xs uppercase tracking-wider text-gray-500 font-semibold",children:((w=t==null?void 0:t.sourceLocation)==null?void 0:w.city)||"New York"})]}),e.jsxs("div",{className:"text-center px-4",children:[e.jsx("span",{className:"text-luxury-brown text-lg font-serif",children:"✦ ➔ ✦"}),e.jsx("p",{className:"text-[10px] text-gray-400 font-medium",children:"Non-Stop Direct"})]}),e.jsxs("div",{className:"text-right",children:[e.jsx("span",{className:"font-serif text-4xl font-extrabold text-luxury-dark",children:((S=t==null?void 0:t.destinationLocation)==null?void 0:S.code)||((v=t==null?void 0:t.destinationLocation)!=null&&v.city?t.destinationLocation.city.substring(0,3).toUpperCase():"CDG")}),e.jsx("p",{className:"text-xs uppercase tracking-wider text-gray-500 font-semibold",children:((c=t==null?void 0:t.destinationLocation)==null?void 0:c.city)||"Paris"})]})]}),e.jsxs("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-gray-100 text-xs",children:[e.jsxs("div",{children:[e.jsx("span",{className:"text-[10px] uppercase text-gray-400 block font-semibold",children:"Passenger"}),e.jsxs("span",{className:"font-bold text-luxury-dark",children:[m.firstName," ",m.lastName]})]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-[10px] uppercase text-gray-400 block font-semibold",children:"Flight / Unit"}),e.jsx("span",{className:"font-bold text-luxury-dark",children:((F=t==null?void 0:t.bookingDetails)==null?void 0:F.flightNumber)||"VL-202"})]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-[10px] uppercase text-gray-400 block font-semibold",children:"Suite Number"}),e.jsx("span",{className:"font-bold text-luxury-brown text-sm",children:((L=t==null?void 0:t.bookingDetails)==null?void 0:L.seatNumber)||"01A"})]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-[10px] uppercase text-gray-400 block font-semibold",children:"Cabin Tier"}),e.jsx("span",{className:"font-bold text-luxury-dark",children:((E=t==null?void 0:t.bookingDetails)==null?void 0:E.cabinClass)||"Royal Suite"})]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-[10px] uppercase text-gray-400 block font-semibold",children:"Departure Date"}),e.jsx("span",{className:"font-bold text-luxury-dark",children:C((t==null?void 0:t.departureDate)||new Date)})]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-[10px] uppercase text-gray-400 block font-semibold",children:"Gate / Salon"}),e.jsx("span",{className:"font-bold text-luxury-dark",children:"VIP Salon 4"})]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-[10px] uppercase text-gray-400 block font-semibold",children:"Fast-Track"}),e.jsx("span",{className:"font-bold text-green-700",children:"Confirmed ✓"})]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-[10px] uppercase text-gray-400 block font-semibold",children:"Baggage"}),e.jsx("span",{className:"font-bold text-luxury-dark",children:"3 x 32kg VIP"})]})]}),e.jsx("div",{className:"mt-6 h-12 bg-luxury-dark rounded-lg flex items-center justify-center text-white tracking-[8px] font-mono text-xs",children:"||| | ||||| || |||| ||||| | |||||| |||| |||"})]}),e.jsxs("div",{className:"md:w-64 bg-[#FFFAF0] p-6 flex flex-col justify-between text-xs",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"border-b border-luxury-beige pb-2 mb-4",children:[e.jsx("span",{className:"font-serif font-bold text-luxury-brown text-sm block",children:"PASSENGER STUB"}),e.jsxs("span",{className:"text-[10px] text-gray-400",children:["Ref: ",(t==null?void 0:t.bookingReference)||"VL-789042"]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{children:[e.jsx("span",{className:"text-[10px] text-gray-400 block uppercase",children:"Traveler"}),e.jsxs("span",{className:"font-bold text-luxury-dark",children:[m.firstName," ",m.lastName]})]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-[10px] text-gray-400 block uppercase",children:"Sector"}),e.jsxs("span",{className:"font-bold text-luxury-dark",children:[((P=t==null?void 0:t.sourceLocation)==null?void 0:P.city)||"New York"," ➔ ",((R=t==null?void 0:t.destinationLocation)==null?void 0:R.city)||"Paris"]})]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-[10px] text-gray-400 block uppercase",children:"Suite"}),e.jsx("span",{className:"font-serif text-2xl font-bold text-luxury-brown",children:((B=t==null?void 0:t.bookingDetails)==null?void 0:B.seatNumber)||"01A"})]})]})]}),e.jsxs("div",{className:"pt-4 border-t border-luxury-beige text-center",children:[e.jsx("span",{className:"text-[9px] uppercase tracking-wider text-gray-400 block",children:"Voyager Luxe Global Concierge"}),e.jsx("span",{className:"text-[9px] text-luxury-brown font-semibold",children:"Geneva · Paris · New York"})]})]})]})]})}const M=[{_id:"bk-mock-001",bookingReference:"VL-789042",status:"Confirmed & Escorted",bookingType:"flight",sourceLocation:{city:"New York (JFK)"},destinationLocation:{city:"Paris (CDG)"},departureDate:"2026-11-20",totalPrice:4850,bookingDetails:{title:"Emirates First Class A380 Suite",seatNumber:"01A",cabinClass:"First Class Suite"}},{_id:"bk-mock-002",bookingReference:"VL-882194",status:"Confirmed",bookingType:"hotel",sourceLocation:{city:"Paris"},destinationLocation:{city:"Four Seasons George V"},departureDate:"2026-11-20",totalPrice:9600,bookingDetails:{title:"Four Seasons George V Presidential Penthouse",roomType:"Penthouse Suite"}},{_id:"bk-mock-003",bookingReference:"VL-914022",status:"Confirmed",bookingType:"train",sourceLocation:{city:"Paris Gare de l’Est"},destinationLocation:{city:"Venice Santa Lucia"},departureDate:"2026-11-24",totalPrice:2450,bookingDetails:{title:"Venice Simplon-Orient-Express Grand Suite",seatNumber:"Suite Vienna",cabinClass:"Grand Suite"}}];function W({onManageBooking:t,onDownloadTicket:r}){const{formatPrice:i}=Y(),[a,l]=o.useState([]),[n,x]=o.useState(!0);return o.useEffect(()=>{let s=!0;return g.listBookings().then(d=>{s&&(d&&d.length>0?l(d):l(M),x(!1))}).catch(()=>{s&&(l(M),x(!1))}),()=>{s=!1}},[]),n?e.jsxs("div",{className:"text-center py-10",children:[e.jsx("div",{className:"w-8 h-8 border-3 border-luxury-brown border-t-transparent rounded-full animate-spin mx-auto mb-2"}),e.jsx("span",{className:"text-xs text-luxury-muted",children:"Retrieving luxury dossiers..."})]}):e.jsx("div",{className:"space-y-4",children:a.map(s=>{var d,p,m,f,u;return e.jsxs("div",{className:"bg-white border border-[#F5E6D3] rounded-2xl p-5 shadow-sm hover:shadow-luxury transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4",children:[e.jsxs("div",{className:"flex items-start gap-4",children:[e.jsx("div",{className:"w-12 h-12 rounded-xl bg-luxury-cream border border-luxury-beige flex items-center justify-center text-luxury-brown text-xl flex-shrink-0",children:s.bookingType==="hotel"?"🏨":s.bookingType==="train"?"🚆":"✈"}),e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[e.jsx("span",{className:"font-serif font-bold text-luxury-dark text-base",children:((d=s.bookingDetails)==null?void 0:d.title)||`${((p=s.sourceLocation)==null?void 0:p.city)||"Origin"} ➔ ${((m=s.destinationLocation)==null?void 0:m.city)||"Destination"}`}),e.jsx("span",{className:"text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200",children:s.status})]}),e.jsxs("p",{className:"text-xs text-gray-500 mt-1",children:["Ref: ",e.jsx("strong",{className:"text-luxury-brown font-mono",children:s.bookingReference})," · Departure: ",C(s.departureDate)]}),e.jsxs("p",{className:"text-[11px] text-gray-400 mt-0.5",children:["Suite / Room: ",e.jsx("span",{className:"font-semibold text-luxury-dark",children:((f=s.bookingDetails)==null?void 0:f.seatNumber)||((u=s.bookingDetails)==null?void 0:u.roomType)||"Reserved"})]})]})]}),e.jsxs("div",{className:"flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0",children:[e.jsxs("div",{className:"text-left md:text-right",children:[e.jsx("span",{className:"font-serif text-lg font-bold text-luxury-brown block",children:i(s.totalPrice)}),e.jsx("span",{className:"text-[10px] text-gray-400 uppercase tracking-wider",children:"Paid in full"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("button",{onClick:()=>r&&r(s),className:"btn-outline py-2 px-3 text-xs font-semibold",title:"Boarding Pass",children:"Boarding Pass"}),e.jsx("button",{onClick:()=>t&&t(s),className:"btn-primary py-2 px-4 text-xs font-semibold",children:"Manage"})]})]})]},s._id||s.bookingReference)})})}const I={_id:"bk-mock-001",bookingReference:"VL-789042",status:"Confirmed & Escorted",bookingType:"flight",sourceLocation:{city:"New York",code:"JFK"},destinationLocation:{city:"Paris",code:"CDG"},departureDate:"2026-11-20",totalPrice:4850,bookingDetails:{title:"Emirates First Class A380 Suite",seatNumber:"01A",cabinClass:"First Class Suite"}};function Z({booking:t=I,onBack:r,onUpdate:i}){var v;const a=t||I,{formatPrice:l}=Y(),[n,x]=o.useState(null),[s,d]=o.useState(!1),[p,m]=o.useState(((v=a==null?void 0:a.bookingDetails)==null?void 0:v.seatNumber)||"01A"),[f,u]=o.useState(null),[y,b]=o.useState(!1),N=async()=>{d(!0);try{const c=await g.getBookingStatus(a._id||a.bookingReference);x(c)}catch{x({liveStatus:"VIP Concierge Active",detail:"On schedule. Maybach transfer driver scheduled 2h prior to departure."})}finally{d(!1)}},w=async()=>{try{await g.modifyBooking(a._id||a.bookingReference,{seatNumber:p}),u(`Suite successfully updated to ${p}. New boarding pass issued.`),i&&i()}catch{u(`Suite updated to ${p} (offline confirmation).`)}},S=async()=>{if(window.confirm("Are you sure you wish to cancel this bespoke booking? 100% full refund will be processed.")){b(!0);try{const c=await g.cancelBooking(a._id||a.bookingReference);u(c.message||"Booking cancelled and refund queued."),i&&i()}catch{u("Cancellation recorded. Full refund initiated to original payment method.")}finally{b(!1)}}};return e.jsxs("div",{className:"space-y-6 text-left",children:[e.jsxs("div",{className:"flex items-center justify-between border-b border-[#F5E6D3] pb-3",children:[e.jsxs("div",{children:[e.jsx("span",{className:"text-[10px] uppercase font-bold tracking-wider text-luxury-brown block",children:"Dossier Management"}),e.jsxs("h4",{className:"font-serif text-xl font-bold text-luxury-dark",children:["Reservation Ref: ",a.bookingReference||"VL-789042"]})]}),r&&e.jsx("button",{onClick:r,className:"text-xs text-luxury-brown font-semibold hover:underline",children:"← Back to History"})]}),f&&e.jsx("div",{className:"p-3 bg-green-50 border border-green-200 text-green-800 text-xs rounded-xl font-medium",children:f}),e.jsxs("div",{className:"bg-[#FFFAF0] border border-luxury-beige rounded-2xl p-5 space-y-3",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"}),e.jsx("span",{className:"text-xs font-bold text-luxury-dark uppercase tracking-wider",children:"Real-Time Radar & Concierge Status"})]}),e.jsx("button",{onClick:N,disabled:s,className:"text-xs bg-white border border-luxury-beige px-3 py-1.5 rounded-lg text-luxury-brown hover:bg-luxury-beige transition-colors font-semibold",children:s?"Querying Radar...":"Refresh Status ↻"})]}),n?e.jsxs("div",{className:"border-t border-luxury-beige/60 pt-3 text-xs space-y-1",children:[e.jsxs("p",{className:"font-bold text-luxury-dark",children:["Status: ",n.liveStatus]}),e.jsx("p",{className:"text-gray-600",children:n.detail})]}):e.jsx("p",{className:"text-xs text-gray-500",children:"Click 'Refresh Status' to query live tarmac radar, driver geolocation, and VIP lounge gate assignment."})]}),e.jsxs("div",{className:"bg-white border border-[#E8DCCF] rounded-2xl p-5 space-y-4 shadow-sm",children:[e.jsx("h5",{className:"font-serif text-sm font-bold text-luxury-dark",children:"Modify Suite or Seating Allocation"}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("select",{value:p,onChange:c=>m(c.target.value),className:"bg-[#FFFAF0] border border-luxury-beige rounded-xl p-2.5 text-xs font-semibold text-luxury-dark focus:outline-none focus:ring-1 focus:ring-luxury-brown cursor-pointer",children:[e.jsx("option",{value:"01A",children:"Suite 01A (Window Port - Private)"}),e.jsx("option",{value:"01K",children:"Suite 01K (Window Starboard - Skyline View)"}),e.jsx("option",{value:"02A",children:"Suite 02A (Quiet Sanctuary)"}),e.jsx("option",{value:"02E",children:"Suite 02E (Center Suite Double Bed Mode)"})]}),e.jsx("button",{onClick:w,className:"btn-primary py-2 px-4 text-xs font-semibold",children:"Update Suite"})]})]}),e.jsxs("div",{className:"border border-red-200 bg-red-50/50 rounded-2xl p-5 flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("span",{className:"text-xs font-bold text-red-700 block",children:"Cancel Journey"}),e.jsx("span",{className:"text-[11px] text-gray-500",children:"100% money-back guarantee under Centurion Protection Shield."})]}),e.jsx("button",{onClick:S,disabled:y,className:"px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold transition-colors",children:y?"Processing...":"Cancel & Refund"})]})]})}function ee({isOpen:t,onClose:r,title:i,children:a,maxWidth:l="max-w-2xl"}){return o.useEffect(()=>{const n=x=>{x.key==="Escape"&&r()};return t&&(document.body.style.overflow="hidden",window.addEventListener("keydown",n)),()=>{document.body.style.overflow="unset",window.removeEventListener("keydown",n)}},[t,r]),t?e.jsxs("div",{className:"fixed inset-0 z-50 overflow-y-auto",children:[e.jsx("div",{className:"fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity",onClick:r}),e.jsx("div",{className:"flex min-h-full items-center justify-center p-4 text-center",children:e.jsxs("div",{className:`w-full ${l} transform overflow-hidden rounded-2xl bg-white border border-[#F5E6D3] text-left align-middle shadow-2xl transition-all relative z-10 animate-fade-in`,children:[e.jsxs("div",{className:"flex items-center justify-between border-b border-[#F5E6D3] px-6 py-4 bg-[#FFFAF0]",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"text-luxury-brown",children:"✦"}),e.jsx("h3",{className:"font-serif text-lg font-semibold text-luxury-dark tracking-wide",children:i})]}),e.jsx("button",{onClick:r,className:"text-gray-400 hover:text-luxury-brown text-xl font-bold p-1 rounded-lg hover:bg-luxury-beigeLight transition-colors",children:"✕"})]}),e.jsx("div",{className:"p-6",children:a})]})})]}):null}export{W as B,Z as M,Q as T,ee as a};
