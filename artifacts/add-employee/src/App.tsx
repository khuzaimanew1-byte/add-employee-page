import { useEffect, useRef } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cinzel+Decorative:wght@400;700&family=Raleway:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

/* ── Scrollbar ── */
::-webkit-scrollbar{width:5px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:rgba(196,130,10,0.32);border-radius:3px;}
::-webkit-scrollbar-thumb:hover{background:rgba(196,130,10,0.55);}
*{scrollbar-width:thin;scrollbar-color:rgba(196,130,10,0.32) transparent;}

/* ── Animations ── */
@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes rotateSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes rotateSlowRev{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
@keyframes shimmer{0%{background-position:-300% center}100%{background-position:300% center}}
@keyframes cardIn{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@keyframes goldBreathe{0%,100%{opacity:.5;transform:scaleX(1)}50%{opacity:.85;transform:scaleX(1.015)}}
@keyframes pulseRing{0%,100%{box-shadow:0 0 0 4px rgba(196,130,10,0.07),0 0 28px rgba(196,130,10,0.08)}
  50%{box-shadow:0 0 0 7px rgba(196,130,10,0.1),0 0 38px rgba(196,130,10,0.13)}}
@keyframes dotDance{0%,100%{transform:rotate(45deg) scale(1)}50%{transform:rotate(45deg) scale(1.3)}}

/* ── Base ── */
.ep *{box-sizing:border-box;margin:0;padding:0;}
.ep{background:#20242B;min-height:100vh;font-family:'Raleway',sans-serif;color:#F5E6C8;
  position:relative;overflow:hidden;padding-bottom:90px;}

/* ── Rich Background ── */
.geo-bg{position:absolute;inset:0;pointer-events:none;z-index:0;}
.gtr{position:absolute;top:-150px;right:-120px;width:640px;height:640px;
  background:radial-gradient(ellipse,rgba(196,130,10,0.11) 0%,transparent 62%);pointer-events:none;}
.gbl{position:absolute;bottom:-150px;left:-120px;width:540px;height:540px;
  background:radial-gradient(ellipse,rgba(196,130,10,0.08) 0%,transparent 62%);pointer-events:none;}
.gctr{position:absolute;top:35%;left:50%;transform:translate(-50%,-50%);
  width:700px;height:700px;border-radius:50%;
  background:radial-gradient(ellipse,rgba(196,130,10,0.035) 0%,transparent 60%);pointer-events:none;}
.wood-lines{position:absolute;inset:0;pointer-events:none;opacity:.018;
  background-image:repeating-linear-gradient(102deg,#C4820A 0px,transparent 1px,transparent 38px,#C4820A 39px),
                   repeating-linear-gradient(12deg,#C4820A 0px,transparent 1px,transparent 62px,#C4820A 63px);
}

/* ── Container ── */
.ec{position:relative;z-index:1;max-width:860px;margin:0 auto;padding:0 36px;}

/* ── Page Header ── */
.pg-hdr{text-align:center;padding-top:48px;margin-bottom:4px;animation:fadeUp .75s ease both;}
.pg-eyebrow{display:flex;align-items:center;justify-content:center;gap:13px;margin-bottom:12px;}
.pg-eye-line{width:56px;height:1px;background:linear-gradient(90deg,transparent,rgba(196,130,10,0.55));}
.pg-eye-line.r{background:linear-gradient(90deg,rgba(196,130,10,0.55),transparent);}
.pg-eye-icon{font-size:15px;color:rgba(196,130,10,0.65);}
.pg-eye-txt{font-family:'Cinzel',serif;font-size:7.5px;letter-spacing:4.5px;
  color:rgba(196,130,10,0.55);text-transform:uppercase;}
.pg-title{font-family:'Cinzel',serif;font-size:26px;letter-spacing:7px;color:#F5E6C8;
  text-transform:uppercase;font-weight:600;margin-bottom:6px;
  text-shadow:0 2px 20px rgba(196,130,10,0.18);}
.pg-sub{font-family:'Cinzel',serif;font-size:8px;letter-spacing:5px;
  color:rgba(196,130,10,0.5);text-transform:uppercase;margin-bottom:18px;font-style:italic;}
.pg-orn{display:flex;align-items:center;justify-content:center;margin-bottom:34px;}

/* ── Avatar ── */
.av-sec{display:flex;flex-direction:column;align-items:center;margin-bottom:14px;
  animation:fadeUp .75s .08s ease both;}
.av-outer{position:relative;width:148px;height:148px;display:flex;align-items:center;justify-content:center;}
.av-orbit{position:absolute;inset:-10px;border-radius:50%;
  border:1px dashed rgba(196,130,10,0.22);animation:rotateSlow 22s linear infinite;pointer-events:none;}
.av-orbit2{position:absolute;inset:-19px;border-radius:50%;
  border:1px dashed rgba(196,130,10,0.10);animation:rotateSlowRev 34s linear infinite;pointer-events:none;}
.av-orbit3{position:absolute;inset:-28px;border-radius:50%;
  border:1px solid rgba(196,130,10,0.05);pointer-events:none;}
.av-ring{width:124px;height:124px;border-radius:50%;border:1.5px solid rgba(196,130,10,0.7);
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  cursor:pointer;background:rgba(196,130,10,0.04);
  transition:background .3s,border-color .3s,box-shadow .3s;
  position:relative;overflow:hidden;animation:pulseRing 4s ease infinite;}
.av-ring:hover{background:rgba(196,130,10,0.10);border-color:#C4820A;
  box-shadow:0 0 0 6px rgba(196,130,10,0.1),0 0 40px rgba(196,130,10,0.18);}
.av-ring.drag-over{border-color:#C4820A;background:rgba(196,130,10,0.18);}
.av-img{width:100%;height:100%;object-fit:cover;position:absolute;inset:0;border-radius:50%;display:none;}
.av-img.visible{display:block;}
.av-inner{display:flex;flex-direction:column;align-items:center;gap:7px;position:relative;z-index:1;}
.av-inner i{font-size:22px;color:#C4820A;}
.av-inner span{font-family:'Cinzel',serif;font-size:6.5px;letter-spacing:2.2px;
  color:rgba(196,130,10,0.62);text-transform:uppercase;}
.av-ring.has-img .av-inner{opacity:0;}
.av-ring.has-img:hover .av-inner{opacity:1;position:absolute;inset:0;border-radius:50%;
  background:rgba(26,29,35,0.65);display:flex;flex-direction:column;
  align-items:center;justify-content:center;z-index:2;}
.av-file{display:none;}

/* ── Salary ── */
.sal-sec{display:flex;align-items:center;justify-content:center;margin-bottom:38px;
  animation:fadeUp .75s .14s ease both;}
.sal-wrap{display:flex;align-items:center;gap:9px;position:relative;width:240px;}
.sal-wrap::before{content:'';position:absolute;bottom:0;left:0;right:0;height:1.5px;background:rgba(196,130,10,0.22);}
.sal-wrap::after{content:'';position:absolute;bottom:0;left:0;width:100%;height:2px;background:#C4820A;
  transform:scaleX(0);transform-origin:left;transition:transform .35s ease;}
.sal-wrap:focus-within::after{transform:scaleX(1);}
.sal-icon{font-size:14px;color:rgba(196,130,10,0.5);padding-bottom:7px;flex-shrink:0;}
.sal-pkr{font-family:'Cinzel',serif;font-size:9px;color:#C4820A;opacity:.7;letter-spacing:1.5px;padding-bottom:7px;flex-shrink:0;}
.sal-inp{background:transparent;border:none;outline:none;color:#F5E6C8;
  font-family:'Raleway',sans-serif;font-size:15px;font-weight:500;width:100%;padding-bottom:7px;}
.sal-inp::placeholder{color:rgba(245,230,200,0.27);font-size:13px;font-weight:400;}

/* ── Section Cards ── */
.sec-card{background:#313842;border:1px solid rgba(196,130,10,0.14);
  border-radius:3px;padding:26px 28px 24px;margin-bottom:16px;position:relative;
  box-shadow:0 6px 32px rgba(0,0,0,0.28),inset 0 1px 0 rgba(255,255,255,0.025),
             inset 0 0 60px rgba(196,130,10,0.02);
  animation:cardIn .6s ease both;}
.sec-card.d1{animation-delay:.12s;}
.sec-card.d2{animation-delay:.22s;}
.sec-card.d3{animation-delay:.32s;}
/* Four corner ornaments */
.sec-card::before,.sec-card::after{content:'';position:absolute;width:16px;height:16px;pointer-events:none;}
.sec-card::before{top:-1px;left:-1px;border-top:2px solid rgba(196,130,10,0.55);border-left:2px solid rgba(196,130,10,0.55);}
.sec-card::after{top:-1px;right:-1px;border-top:2px solid rgba(196,130,10,0.55);border-right:2px solid rgba(196,130,10,0.55);}
.sec-card-inner{position:relative;}
.sec-card-inner::before,.sec-card-inner::after{content:'';position:absolute;width:16px;height:16px;pointer-events:none;bottom:-25px;}
.sec-card-inner::before{left:-29px;border-bottom:2px solid rgba(196,130,10,0.55);border-left:2px solid rgba(196,130,10,0.55);}
.sec-card-inner::after{right:-29px;border-bottom:2px solid rgba(196,130,10,0.55);border-right:2px solid rgba(196,130,10,0.55);}

/* ── Section Header ── */
.sec-hdr{display:flex;align-items:center;gap:10px;margin-bottom:22px;}
.sec-hdr-line{flex:1;height:1px;background:linear-gradient(90deg,rgba(196,130,10,0.35),transparent);}
.sec-hdr-line.r{background:linear-gradient(90deg,transparent,rgba(196,130,10,0.35));}
.sec-hdr-gem{width:5px;height:5px;background:#C4820A;transform:rotate(45deg);opacity:.65;flex-shrink:0;
  animation:dotDance 3s ease infinite;}
.sec-label{font-family:'Cinzel',serif;font-size:8.5px;letter-spacing:3.5px;color:rgba(196,130,10,0.78);
  text-transform:uppercase;white-space:nowrap;font-weight:600;}

/* ── Layout ── */
.frow{display:grid;gap:0 36px;margin-bottom:22px;}
.g3{grid-template-columns:1fr 1fr 1fr;}
.g2{grid-template-columns:1fr 1fr;}
.g1{grid-template-columns:1fr;}
.field{position:relative;padding-bottom:2px;}

/* ── Underline fields — UNCHANGED ── */
.fi-wrap{position:relative;display:flex;align-items:center;gap:7px;padding-bottom:6px;}
.fi-wrap::before{content:'';position:absolute;bottom:0;left:0;right:0;height:1.5px;background:rgba(245,230,200,0.12);}
.fi-wrap::after{content:'';position:absolute;bottom:0;left:0;width:100%;height:2px;background:#C4820A;
  transform:scaleX(0);transform-origin:left;transition:transform .35s ease;}
.fi-wrap:focus-within::after,.fi-wrap.focused::after{transform:scaleX(1);}
.fi-wrap>.field-icon{font-size:14px;color:rgba(196,130,10,0.5);flex-shrink:0;}
.fi{background:transparent;border:none;outline:none;color:#F5E6C8;
  font-family:'Raleway',sans-serif;font-size:14px;width:100%;}
.fi::placeholder{color:rgba(245,230,200,0.27);}

/* ── Date input — UNCHANGED ── */
.date-wrap{position:relative;flex:1;display:flex;align-items:center;}
.date-wrap.empty::before{content:attr(data-ph);position:absolute;left:0;top:50%;transform:translateY(-50%);
  color:rgba(245,230,200,0.27);font-family:'Raleway',sans-serif;font-size:14px;
  pointer-events:none;z-index:1;white-space:nowrap;}
.date-inp{background:transparent;border:none;outline:none;
  font-family:'Raleway',sans-serif;font-size:14px;
  width:100%;cursor:pointer;color-scheme:dark;position:relative;z-index:2;}
.date-inp.empty{color:transparent;}
.date-inp.empty::-webkit-datetime-edit{opacity:0;}
.date-inp.empty::-webkit-datetime-edit-fields-wrapper{opacity:0;}
.date-inp:not(.empty){color:#F5E6C8;}
.date-inp::-webkit-calendar-picker-indicator{filter:invert(65%) sepia(40%) saturate(600%) hue-rotate(10deg);cursor:pointer;opacity:.6;}
.date-inp::-webkit-calendar-picker-indicator:hover{opacity:1;}
.date-inp.empty::-webkit-calendar-picker-indicator{position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:pointer;}

/* ── Gender Dropdown ── */
.csel{position:relative;flex:1;outline:none;}
.csel-face{display:flex;align-items:center;justify-content:space-between;cursor:pointer;
  color:#F5E6C8;font-family:'Raleway',sans-serif;font-size:14px;user-select:none;}
.csel-face i{font-size:13px;color:rgba(196,130,10,0.5);transition:transform .22s;flex-shrink:0;}
.csel.open .csel-face i{transform:rotate(180deg);}
.csel-opts{display:none;position:absolute;top:calc(100% + 8px);left:-28px;right:-10px;
  background:#252b33;border:1px solid rgba(196,130,10,0.22);
  border-radius:3px;z-index:200;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.65);}
.csel.open .csel-opts{display:block;}
.csel-opt{padding:10px 14px;font-family:'Raleway',sans-serif;font-size:13.5px;color:#F5E6C8;cursor:pointer;transition:background .15s;}
.csel-opt:hover{background:rgba(196,130,10,0.12);}
.csel-opt.selected{color:#C4820A;}

/* ── Language tags ── */
.lang-inp{background:transparent;border:none;outline:none;color:#F5E6C8;
  font-family:'Raleway',sans-serif;font-size:14px;width:100%;}
.lang-inp::placeholder{color:rgba(245,230,200,0.27);}
.lang-tags-row{display:flex;flex-wrap:wrap;gap:5px;margin-top:8px;}
.lang-tags-row:empty{display:none;}
.lang-tag{display:inline-flex;align-items:center;gap:5px;background:rgba(196,130,10,0.1);
  border:1px solid rgba(196,130,10,0.28);border-radius:2px;padding:2px 9px;font-size:12px;color:#F5E6C8;}
.lang-tag-del{font-size:9px;color:rgba(196,130,10,0.48);cursor:pointer;transition:color .15s;}
.lang-tag-del:hover{color:#C4820A;}

/* ── Bullet sections ── */
.pro-hdr{font-family:'Cinzel',serif;font-size:9px;letter-spacing:2.8px;color:rgba(196,130,10,0.75);
  text-transform:uppercase;margin-bottom:11px;font-weight:600;}
.pro-grid{display:grid;grid-template-columns:1fr 1fr;gap:36px;margin-bottom:24px;}
.bul-inp-row{display:flex;align-items:center;gap:8px;padding-bottom:6px;position:relative;}
.bul-inp-row::before{content:'';position:absolute;bottom:0;left:0;right:0;height:1.5px;background:rgba(245,230,200,0.12);}
.bul-inp-row::after{content:'';position:absolute;bottom:0;left:0;width:100%;height:2px;background:#C4820A;
  transform:scaleX(0);transform-origin:left;transition:transform .35s ease;}
.bul-inp-row:focus-within::after{transform:scaleX(1);}
.bul-add-btn{font-size:14px;color:rgba(196,130,10,0.42);cursor:pointer;flex-shrink:0;order:2;transition:color .2s;}
.bul-add-btn:hover{color:#C4820A;}
.bul-inp{background:transparent;border:none;outline:none;color:#F5E6C8;
  font-family:'Raleway',sans-serif;font-size:13.5px;flex:1;order:1;}
.bul-inp::placeholder{color:rgba(245,230,200,0.23);font-style:italic;}
.bul-item{display:flex;align-items:center;gap:8px;padding:5px 0;}
.bul-dot{width:4px;height:4px;border-radius:50%;background:#C4820A;flex-shrink:0;margin-left:2px;opacity:.8;}
.bul-txt{font-size:13.5px;color:#F5E6C8;flex:1;outline:none;font-family:'Raleway',sans-serif;
  background:transparent;border:none;border-bottom:1px solid transparent;
  padding-bottom:2px;transition:border-color .25s;cursor:default;}
.bul-txt[contenteditable="true"]{border-bottom-color:#C4820A;cursor:text;}
.bul-del{font-size:13px;color:rgba(196,130,10,0.33);cursor:pointer;opacity:0;transition:opacity .15s;flex-shrink:0;}
.bul-item:hover .bul-del{opacity:1;}

/* ── Actions ── */
.act-row{display:flex;align-items:center;justify-content:flex-end;gap:12px;
  padding-top:4px;animation:fadeUp .75s .4s ease both;}
.btn-cancel{background:transparent;border:1px solid rgba(196,130,10,0.28);color:rgba(245,230,200,0.5);
  padding:10px 26px;font-family:'Cinzel',serif;font-size:9px;letter-spacing:2.5px;
  cursor:pointer;transition:all .24s;border-radius:2px;text-transform:uppercase;}
.btn-cancel:hover{border-color:rgba(196,130,10,0.6);color:#F5E6C8;}
.btn-create{border:none;color:#1a1d23;padding:11px 34px;
  font-family:'Cinzel',serif;font-size:9px;letter-spacing:3px;
  cursor:pointer;border-radius:2px;font-weight:700;text-transform:uppercase;
  position:relative;overflow:hidden;
  background:linear-gradient(135deg,#b87608,#C4820A 40%,#d4950f);
  box-shadow:0 4px 18px rgba(196,130,10,0.3),inset 0 1px 0 rgba(255,255,255,0.15);
  transition:box-shadow .24s,transform .18s;}
.btn-create::after{content:'';position:absolute;inset:0;
  background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.14) 50%,transparent 100%);
  background-size:300% 100%;animation:shimmer 2.8s ease infinite;}
.btn-create:hover{box-shadow:0 6px 26px rgba(196,130,10,0.45),inset 0 1px 0 rgba(255,255,255,0.15);
  transform:translateY(-1px);}
.btn-create:active{transform:translateY(0);}

/* ── Toast ── */
.toast{position:fixed;bottom:32px;left:50%;transform:translateX(-50%) translateY(80px);
  background:#252b33;border:1px solid rgba(196,130,10,0.35);
  color:#F5E6C8;font-family:'Raleway',sans-serif;font-size:13px;
  padding:13px 26px;border-radius:3px;z-index:999;
  display:flex;align-items:center;gap:10px;
  box-shadow:0 10px 36px rgba(0,0,0,0.55);
  transition:transform .38s cubic-bezier(.34,1.56,.64,1),opacity .3s ease;opacity:0;}
.toast.show{transform:translateX(-50%) translateY(0);opacity:1;}
.toast i{font-size:16px;color:#C4820A;}
`;

const html = `
<div class="ep">

  <!-- ── Rich Background ── -->
  <div class="geo-bg">
    <svg width="100%" height="100%" style="position:absolute;inset:0;opacity:0.016" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="geo" x="0" y="0" width="90" height="90" patternUnits="userSpaceOnUse">
          <polygon points="45,5 83,25 83,65 45,85 7,65 7,25" fill="none" stroke="#C4820A" stroke-width="0.7"/>
          <line x1="45" y1="5" x2="45" y2="85" stroke="#C4820A" stroke-width="0.3"/>
          <line x1="7" y1="25" x2="83" y2="65" stroke="#C4820A" stroke-width="0.3"/>
          <line x1="83" y1="25" x2="7" y2="65" stroke="#C4820A" stroke-width="0.3"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#geo)"/>
    </svg>
    <div class="wood-lines"></div>
    <div class="gtr"></div>
    <div class="gbl"></div>
    <div class="gctr"></div>
  </div>

  <div class="ec">

    <!-- ── Page Header ── -->
    <div class="pg-hdr">
      <div class="pg-eyebrow">
        <div class="pg-eye-line"></div>
        <i class="ti ti-building-castle pg-eye-icon"></i>
        <span class="pg-eye-txt">Infinity Castle</span>
        <i class="ti ti-building-castle pg-eye-icon"></i>
        <div class="pg-eye-line r"></div>
      </div>
      <h1 class="pg-title">New Employee</h1>
      <p class="pg-sub">Staff Registry · Fine Dining</p>
      <div class="pg-orn">
        <svg width="300" height="16" viewBox="0 0 300 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="8" x2="122" y2="8" stroke="#C4820A" stroke-width="0.6" opacity="0.42"/>
          <rect x="128" y="4" width="8" height="8" fill="none" stroke="#C4820A" stroke-width="1" transform="rotate(45 132 8)" opacity="0.7"/>
          <rect x="132" y="5.5" width="5" height="5" fill="#C4820A" transform="rotate(45 134.5 8)" opacity="0.3"/>
          <line x1="140" y1="8" x2="160" y2="8" stroke="#C4820A" stroke-width="0.6" opacity="0.42"/>
          <circle cx="150" cy="8" r="2" fill="#C4820A" opacity="0.5"/>
          <line x1="140" y1="8" x2="160" y2="8" stroke="#C4820A" stroke-width="0.6" opacity="0.42"/>
          <rect x="162" y="4" width="8" height="8" fill="none" stroke="#C4820A" stroke-width="1" transform="rotate(45 166 8)" opacity="0.7"/>
          <rect x="166" y="5.5" width="5" height="5" fill="#C4820A" transform="rotate(45 168.5 8)" opacity="0.3"/>
          <line x1="174" y1="8" x2="300" y2="8" stroke="#C4820A" stroke-width="0.6" opacity="0.42"/>
        </svg>
      </div>
    </div>

    <!-- ── Avatar + Salary ── -->
    <div class="av-sec">
      <div class="av-outer">
        <div class="av-orbit3"></div>
        <div class="av-orbit2"></div>
        <div class="av-orbit"></div>
        <div class="av-ring" id="avRing">
          <img class="av-img" id="avImg" alt=""/>
          <div class="av-inner">
            <i class="ti ti-upload"></i>
            <span>Upload Photo</span>
          </div>
        </div>
      </div>
      <input class="av-file" type="file" id="avFile" accept="image/*"/>
    </div>

    <div class="sal-sec">
      <div class="sal-wrap">
        <i class="ti ti-coin sal-icon"></i>
        <span class="sal-pkr">PKR</span>
        <input class="sal-inp" id="salInp" type="text" placeholder="XX,XXX / mo" inputmode="numeric" autocomplete="off"/>
      </div>
    </div>

    <!-- ── Card 1: Personal Information ── -->
    <div class="sec-card d1">
      <div class="sec-card-inner">
        <div class="sec-hdr">
          <div class="sec-hdr-line"></div>
          <div class="sec-hdr-gem"></div>
          <span class="sec-label">Personal Information</span>
          <div class="sec-hdr-gem"></div>
          <div class="sec-hdr-line r"></div>
        </div>
        <div class="frow g3">
          <div class="field">
            <div class="fi-wrap">
              <i class="ti ti-user field-icon"></i>
              <input class="fi" id="fullName" type="text" placeholder="Full Name" autocomplete="name"/>
            </div>
          </div>
          <div class="field" style="position:relative;">
            <div class="fi-wrap" id="genderWrap">
              <i class="ti ti-users-group field-icon"></i>
              <div class="csel" id="csel" tabindex="0">
                <div class="csel-face" id="cselFace">
                  <span id="cselTxt">Male</span>
                  <i class="ti ti-chevron-down"></i>
                </div>
                <div class="csel-opts" id="cselOpts">
                  <div class="csel-opt selected" data-val="male">Male</div>
                  <div class="csel-opt" data-val="female">Female</div>
                  <div class="csel-opt" data-val="custom">Custom</div>
                </div>
              </div>
            </div>
          </div>
          <div class="field">
            <div class="fi-wrap">
              <div class="date-wrap empty" id="dobWrap" data-ph="Date of Birth">
                <input type="date" class="date-inp empty" id="dob"/>
              </div>
            </div>
          </div>
        </div>
        <div class="frow g1" style="margin-bottom:0;">
          <div class="field">
            <div class="fi-wrap">
              <i class="ti ti-map-pin field-icon"></i>
              <input class="fi" id="address" type="text" placeholder="Street Address" autocomplete="street-address"/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Card 2: Contact Details ── -->
    <div class="sec-card d2">
      <div class="sec-card-inner">
        <div class="sec-hdr">
          <div class="sec-hdr-line"></div>
          <div class="sec-hdr-gem"></div>
          <span class="sec-label">Contact Details</span>
          <div class="sec-hdr-gem"></div>
          <div class="sec-hdr-line r"></div>
        </div>
        <div class="frow g3" style="margin-bottom:22px;">
          <div class="field">
            <div class="fi-wrap">
              <i class="ti ti-id field-icon"></i>
              <input class="fi" id="cnic" type="text" placeholder="12345-1234567-1" maxlength="15"/>
            </div>
          </div>
          <div class="field">
            <div class="fi-wrap">
              <i class="ti ti-device-mobile field-icon"></i>
              <input class="fi" id="phone" type="tel" placeholder="03XX-XXXXXXX"/>
            </div>
          </div>
          <div class="field">
            <div class="fi-wrap">
              <i class="ti ti-mail field-icon"></i>
              <input class="fi" id="email" type="email" placeholder="example@gmail.com" autocomplete="email"/>
            </div>
          </div>
        </div>
        <div class="frow g3" style="margin-bottom:0;">
          <div class="field" style="grid-column:1/2;">
            <div class="fi-wrap">
              <i class="ti ti-world field-icon"></i>
              <input class="lang-inp" id="li" type="text" placeholder="Spoken Language"/>
            </div>
            <div class="lang-tags-row" id="ltags"></div>
          </div>
          <div class="field" style="grid-column:2/3;">
            <div class="fi-wrap">
              <div class="date-wrap empty" id="jdateWrap" data-ph="Joining Date">
                <input type="date" class="date-inp empty" id="jdate"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Card 3: Role & Skills ── -->
    <div class="sec-card d3">
      <div class="sec-card-inner">
        <div class="sec-hdr">
          <div class="sec-hdr-line"></div>
          <div class="sec-hdr-gem"></div>
          <span class="sec-label">Role &amp; Skills</span>
          <div class="sec-hdr-gem"></div>
          <div class="sec-hdr-line r"></div>
        </div>
        <div class="pro-grid">
          <div>
            <div class="pro-hdr">Assigned Tasks</div>
            <div id="tlist"></div>
            <div class="bul-inp-row">
              <input class="bul-inp" id="tinp" type="text" placeholder="Add a task…"/>
              <i class="ti ti-check bul-add-btn" id="tadd"></i>
            </div>
          </div>
          <div>
            <div class="pro-hdr">Work Capabilities</div>
            <div id="clist"></div>
            <div class="bul-inp-row">
              <input class="bul-inp" id="cinp" type="text" placeholder="Add a capability…"/>
              <i class="ti ti-check bul-add-btn" id="cadd"></i>
            </div>
          </div>
        </div>
        <div>
          <div class="pro-hdr">Speciality</div>
          <div id="slist"></div>
          <div class="bul-inp-row" style="margin-top:4px;">
            <input class="bul-inp" id="sinp" type="text" placeholder="Add a speciality…"/>
            <i class="ti ti-check bul-add-btn" id="sadd"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Actions ── -->
    <div class="act-row">
      <button class="btn-cancel" id="btnCancel">Cancel</button>
      <button class="btn-create" id="btnCreate">Create Employee</button>
    </div>

  </div>

  <div class="toast" id="toast">
    <i class="ti ti-circle-check"></i>
    <span id="toastMsg">Employee created successfully!</span>
  </div>
</div>
`;

function formatComma(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  return digits ? Number(digits).toLocaleString("en-US") : "";
}

function setupDatePlaceholder(inp: HTMLInputElement, wrap: HTMLElement) {
  function sync() {
    const empty = !inp.value;
    inp.classList.toggle("empty", empty);
    wrap.classList.toggle("empty", empty);
  }
  inp.addEventListener("change", sync);
  inp.addEventListener("input", sync);
  inp.addEventListener("click", () => {
    if (inp.classList.contains("empty")) {
      try { inp.showPicker(); } catch { inp.focus(); }
    }
  });
  sync();
}

function showToast(root: HTMLElement, msg: string) {
  const toast = root.querySelector("#toast") as HTMLElement;
  const toastMsg = root.querySelector("#toastMsg") as HTMLElement;
  toastMsg.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

function collectFormData(root: HTMLElement) {
  const get = (id: string) => (root.querySelector(`#${id}`) as HTMLInputElement)?.value ?? "";
  const tasks = Array.from(root.querySelectorAll("#tlist .bul-txt")).map(el => el.textContent?.trim()).filter(Boolean);
  const caps  = Array.from(root.querySelectorAll("#clist .bul-txt")).map(el => el.textContent?.trim()).filter(Boolean);
  const specs = Array.from(root.querySelectorAll("#slist .bul-txt")).map(el => el.textContent?.trim()).filter(Boolean);
  const gender = (root.querySelector("#cselTxt") as HTMLElement)?.textContent ?? "Male";
  const avatar = (root.querySelector("#avImg") as HTMLImageElement)?.src ?? "";
  return {
    name: get("fullName"), gender, dob: get("dob"), cnic: get("cnic"),
    phone: get("phone"), email: get("email"), joiningDate: get("jdate"),
    address: get("address"), salary: get("salInp"),
    tasks, capabilities: caps, specialities: specs,
    avatar: avatar.startsWith("data:") ? "[photo uploaded]" : "",
  };
}

function initForm(root: HTMLDivElement) {

  /* Salary */
  const salInp = root.querySelector("#salInp") as HTMLInputElement;
  salInp.addEventListener("keydown", (e) => {
    const k = (e as KeyboardEvent).key;
    if (!/^\d$/.test(k) && !["Backspace","Delete","ArrowLeft","ArrowRight","Tab","Home","End"].includes(k))
      e.preventDefault();
  });
  salInp.addEventListener("input", () => {
    salInp.value = formatComma(salInp.value.replace(/,/g, ""));
  });

  /* Date placeholders */
  setupDatePlaceholder(root.querySelector("#dob") as HTMLInputElement, root.querySelector("#dobWrap") as HTMLElement);
  setupDatePlaceholder(root.querySelector("#jdate") as HTMLInputElement, root.querySelector("#jdateWrap") as HTMLElement);

  /* CNIC auto-mask */
  const cnicInp = root.querySelector("#cnic") as HTMLInputElement;
  cnicInp.addEventListener("input", () => {
    const digits = cnicInp.value.replace(/\D/g, "").slice(0, 13);
    let masked = digits;
    if (digits.length > 5) masked = digits.slice(0,5) + "-" + digits.slice(5);
    if (digits.length > 12) masked = masked.slice(0,13) + "-" + masked.slice(13);
    cnicInp.value = masked;
  });

  /* Gender Dropdown */
  const csel     = root.querySelector("#csel")       as HTMLElement;
  const cselFace = root.querySelector("#cselFace")   as HTMLElement;
  const cselTxt  = root.querySelector("#cselTxt")    as HTMLElement;
  const cselOpts = root.querySelector("#cselOpts")   as HTMLElement;
  const gWrap    = root.querySelector("#genderWrap") as HTMLElement;
  const toggleCsel = (e: Event) => {
    e.stopPropagation();
    const opening = !csel.classList.contains("open");
    csel.classList.toggle("open", opening);
    gWrap.classList.toggle("focused", opening);
  };
  cselFace.addEventListener("click", toggleCsel);
  csel.addEventListener("keydown", (e) => {
    const k = (e as KeyboardEvent).key;
    if (k === "Enter" || k === " ") toggleCsel(e);
  });
  cselOpts.querySelectorAll(".csel-opt").forEach(opt => {
    opt.addEventListener("click", (e) => {
      e.stopPropagation();
      cselOpts.querySelectorAll(".csel-opt").forEach(o => o.classList.remove("selected"));
      opt.classList.add("selected");
      cselTxt.textContent = (opt as HTMLElement).textContent;
      csel.classList.remove("open");
      gWrap.classList.remove("focused");
    });
  });
  document.addEventListener("click", () => {
    csel.classList.remove("open");
    gWrap.classList.remove("focused");
  });

  /* Language tags */
  const langs: string[] = [];
  const ltags = root.querySelector("#ltags")!;
  const li    = root.querySelector("#li") as HTMLInputElement;
  function renderLangs() {
    ltags.innerHTML = "";
    langs.forEach(l => {
      const tag = document.createElement("span"); tag.className = "lang-tag";
      const lbl = document.createElement("span"); lbl.textContent = l;
      const x   = document.createElement("span"); x.className = "lang-tag-del"; x.textContent = "✕";
      x.addEventListener("click", (e) => { e.stopPropagation(); langs.splice(langs.indexOf(l),1); renderLangs(); });
      tag.appendChild(lbl); tag.appendChild(x); ltags.appendChild(tag);
    });
    li.placeholder = "Spoken Language";
  }
  renderLangs();
  li.addEventListener("keydown", (e) => {
    const key = (e as KeyboardEvent).key;
    if (key === "Enter" || key === ",") {
      e.preventDefault();
      const v = li.value.trim().replace(/,/g,"");
      if (v && !langs.includes(v)) { langs.push(v); renderLangs(); }
      li.value = "";
    } else if (key === "Backspace" && !li.value && langs.length) {
      langs.pop(); renderLangs();
    }
  });

  /* Bullet lists */
  function makeBullet(listId: string, text: string) {
    const list = root.querySelector(`#${listId}`)!;
    const item = document.createElement("div"); item.className = "bul-item";
    const dot  = document.createElement("div"); dot.className = "bul-dot";
    const txt  = document.createElement("div"); txt.className = "bul-txt";
    (txt as HTMLElement).contentEditable = "false"; txt.textContent = text;
    const del  = document.createElement("i"); del.className = "ti ti-trash bul-del";
    item.appendChild(dot); item.appendChild(txt); item.appendChild(del);
    del.addEventListener("click", () => item.remove());
    item.addEventListener("click", (e) => {
      if (e.target === del) return;
      (txt as HTMLElement).contentEditable = "true";
      (txt as HTMLElement).focus();
      (del as HTMLElement).style.opacity = "1";
    });
    txt.addEventListener("blur", () => {
      (txt as HTMLElement).contentEditable = "false";
      (del as HTMLElement).style.opacity = "";
      if (!txt.textContent?.trim()) item.remove();
    });
    txt.addEventListener("keydown", (e: Event) => {
      if ((e as KeyboardEvent).key === "Enter") { e.preventDefault(); (txt as HTMLElement).blur(); }
    });
    list.appendChild(item);
  }
  function setupList(inpId: string, addId: string, listId: string) {
    const inp = root.querySelector(`#${inpId}`) as HTMLInputElement;
    const btn = root.querySelector(`#${addId}`)!;
    const add = () => { const v = inp.value.trim(); if (v) { makeBullet(listId, v); inp.value = ""; } };
    inp.addEventListener("keydown", (e) => { if ((e as KeyboardEvent).key === "Enter") { e.preventDefault(); add(); } });
    btn.addEventListener("click", add);
  }
  setupList("tinp","tadd","tlist");
  setupList("cinp","cadd","clist");
  setupList("sinp","sadd","slist");

  /* Avatar */
  const avRing = root.querySelector("#avRing") as HTMLElement;
  const avImg  = root.querySelector("#avImg")  as HTMLImageElement;
  const avFile = root.querySelector("#avFile") as HTMLInputElement;
  function applyImage(file: File) {
    if (!file?.type.startsWith("image/")) return;
    const r = new FileReader();
    r.onload = (ev) => {
      avImg.src = ev.target!.result as string;
      avImg.classList.add("visible");
      avRing.classList.add("has-img");
    };
    r.readAsDataURL(file);
  }
  avRing.addEventListener("click", () => avFile.click());
  avFile.addEventListener("change", () => { if (avFile.files?.[0]) applyImage(avFile.files[0]); });
  avRing.addEventListener("dragover", (e) => { e.preventDefault(); avRing.classList.add("drag-over"); });
  avRing.addEventListener("dragleave", () => avRing.classList.remove("drag-over"));
  avRing.addEventListener("drop", (e) => {
    e.preventDefault(); avRing.classList.remove("drag-over");
    const file = (e as DragEvent).dataTransfer?.files?.[0];
    if (file) applyImage(file);
  });

  /* Buttons */
  const btnCancel = root.querySelector("#btnCancel") as HTMLButtonElement;
  const btnCreate = root.querySelector("#btnCreate") as HTMLButtonElement;
  btnCancel.addEventListener("click", () => {
    (root.querySelector("#fullName") as HTMLInputElement).value = "";
    (root.querySelector("#cnic") as HTMLInputElement).value = "";
    (root.querySelector("#phone") as HTMLInputElement).value = "";
    (root.querySelector("#email") as HTMLInputElement).value = "";
    (root.querySelector("#address") as HTMLInputElement).value = "";
    (root.querySelector("#salInp") as HTMLInputElement).value = "";
    const dob = root.querySelector("#dob") as HTMLInputElement;
    const jdate = root.querySelector("#jdate") as HTMLInputElement;
    dob.value = ""; dob.classList.add("empty");
    (root.querySelector("#dobWrap") as HTMLElement).classList.add("empty");
    jdate.value = ""; jdate.classList.add("empty");
    (root.querySelector("#jdateWrap") as HTMLElement).classList.add("empty");
    avImg.src = ""; avImg.classList.remove("visible"); avRing.classList.remove("has-img");
    root.querySelectorAll(".bul-item").forEach(el => el.remove());
    langs.length = 0; renderLangs();
    cselTxt.textContent = "Male";
    cselOpts.querySelectorAll(".csel-opt").forEach(o => o.classList.remove("selected"));
    (cselOpts.querySelector("[data-val='male']") as HTMLElement)?.classList.add("selected");
  });
  btnCreate.addEventListener("click", () => {
    const data = collectFormData(root);
    console.log("Employee data:", data);
    showToast(root, "Employee created successfully!");
  });
}

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
    container.innerHTML = html;
    const root = container.querySelector(".ep") as HTMLDivElement;
    if (root) initForm(root);
    return () => { document.head.removeChild(style); };
  }, []);

  return <div ref={containerRef} />;
}
