import { useEffect, useRef } from "react";

/* ─────────────────────────── CSS ─────────────────────────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Raleway:wght@300;400;500;600&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

::-webkit-scrollbar{width:5px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:rgba(196,130,10,0.32);border-radius:3px;}
::-webkit-scrollbar-thumb:hover{background:rgba(196,130,10,0.55);}
*{scrollbar-width:thin;scrollbar-color:rgba(196,130,10,0.32) transparent;}

.ep *{box-sizing:border-box;margin:0;padding:0;}
.ep{background:#20242B;min-height:100vh;font-family:'Raleway',sans-serif;color:#F5E6C8;position:relative;overflow:hidden;padding-bottom:80px;}
.geo-bg{position:absolute;inset:0;pointer-events:none;z-index:0;}
.gtr{position:absolute;top:-100px;right:-80px;width:460px;height:460px;background:radial-gradient(ellipse,rgba(196,130,10,0.12) 0%,transparent 70%);}
.gbl{position:absolute;bottom:-100px;left:-80px;width:380px;height:380px;background:radial-gradient(ellipse,rgba(196,130,10,0.08) 0%,transparent 70%);}
.ec{position:relative;z-index:1;max-width:820px;margin:0 auto;padding:0 44px;}

/* ── Avatar ── */
.av-sec{display:flex;flex-direction:column;align-items:center;padding-top:38px;margin-bottom:22px;}
.av-ring{width:116px;height:116px;border-radius:50%;border:1.5px solid rgba(196,130,10,0.7);
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  cursor:pointer;background:rgba(196,130,10,0.05);
  transition:background .25s,border-color .25s,box-shadow .25s;
  position:relative;overflow:hidden;box-shadow:0 0 0 4px rgba(196,130,10,0.06);}
.av-ring:hover{background:rgba(196,130,10,0.11);border-color:#C4820A;box-shadow:0 0 0 6px rgba(196,130,10,0.1);}
.av-ring.drag-over{border-color:#C4820A;background:rgba(196,130,10,0.18);}
.av-img{width:100%;height:100%;object-fit:cover;position:absolute;inset:0;border-radius:50%;display:none;}
.av-img.visible{display:block;}
.av-inner{display:flex;flex-direction:column;align-items:center;gap:6px;position:relative;z-index:1;}
.av-inner i{font-size:24px;color:#C4820A;}
.av-inner span{font-family:'Cinzel',serif;font-size:7.5px;letter-spacing:1.8px;color:rgba(196,130,10,0.65);text-transform:uppercase;}
.av-ring.has-img .av-inner{opacity:0;}
.av-ring.has-img:hover .av-inner{opacity:1;position:absolute;inset:0;border-radius:50%;
  background:rgba(26,29,35,0.62);display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:2;}
.av-file{display:none;}

/* ── Salary ── */
.sal-sec{display:flex;align-items:center;justify-content:center;margin-bottom:28px;}
.sal-wrap{display:flex;align-items:center;gap:7px;position:relative;width:220px;}
.sal-wrap::before{content:'';position:absolute;bottom:0;left:0;right:0;height:1.5px;background:rgba(196,130,10,0.22);}
.sal-wrap::after{content:'';position:absolute;bottom:0;left:0;width:100%;height:2px;background:#C4820A;transform:scaleX(0);transform-origin:left;transition:transform .35s ease;}
.sal-wrap:focus-within::after{transform:scaleX(1);}
.sal-icon{font-size:13px;color:rgba(196,130,10,0.52);padding-bottom:7px;flex-shrink:0;}
.sal-pkr{font-family:'Cinzel',serif;font-size:9.5px;color:#C4820A;opacity:.7;letter-spacing:1.2px;padding-bottom:7px;flex-shrink:0;}
.sal-inp{background:transparent;border:none;outline:none;color:#F5E6C8;
  font-family:'Raleway',sans-serif;font-size:14px;font-weight:500;width:100%;padding-bottom:7px;}
.sal-inp::placeholder{color:rgba(245,230,200,0.28);font-size:13px;font-weight:400;}

/* ── Divider / Grid ── */
.ep .divider{border:none;border-top:1px solid rgba(196,130,10,0.12);margin:0 0 26px;}
.frow{display:grid;gap:0 40px;margin-bottom:26px;}
.g3{grid-template-columns:1fr 1fr 1fr;}
.g2{grid-template-columns:1fr 1fr;}
.g1{grid-template-columns:1fr;}
.field{position:relative;padding-bottom:2px;}

/* ── Field underline (focus-within + .focused helper) ── */
.fi-wrap{position:relative;display:flex;align-items:center;gap:7px;padding-bottom:6px;}
.fi-wrap::before{content:'';position:absolute;bottom:0;left:0;right:0;height:1.5px;background:rgba(245,230,200,0.12);}
.fi-wrap::after{content:'';position:absolute;bottom:0;left:0;width:100%;height:2px;background:#C4820A;
  transform:scaleX(0);transform-origin:left;transition:transform .35s ease;}
.fi-wrap:focus-within::after,.fi-wrap.focused::after{transform:scaleX(1);}
.fi-wrap>.field-icon{font-size:14px;color:rgba(196,130,10,0.52);flex-shrink:0;}
.fi{background:transparent;border:none;outline:none;color:#F5E6C8;
  font-family:'Raleway',sans-serif;font-size:14px;width:100%;}
.fi::placeholder{color:rgba(245,230,200,0.28);}

/* ── Custom Gender Dropdown ── */
.csel{position:relative;flex:1;outline:none;}
.csel-face{display:flex;align-items:center;justify-content:space-between;cursor:pointer;
  color:#F5E6C8;font-family:'Raleway',sans-serif;font-size:14px;user-select:none;}
.csel-face i{font-size:13px;color:rgba(196,130,10,0.52);transition:transform .2s;flex-shrink:0;}
.csel.open .csel-face i{transform:rotate(180deg);}
.csel-opts{display:none;position:absolute;top:calc(100% + 8px);left:-28px;right:-10px;
  background:#1e2229;border:1px solid rgba(196,130,10,0.25);
  border-radius:3px;z-index:200;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,0.55);}
.csel.open .csel-opts{display:block;}
.csel-opt{padding:9px 14px;font-family:'Raleway',sans-serif;font-size:13.5px;color:#F5E6C8;
  cursor:pointer;transition:background .15s;}
.csel-opt:hover{background:rgba(196,130,10,0.12);}
.csel-opt.selected{color:#C4820A;}

/* ══════════════════════════════════════════════
   DATE FIELD — Ghost Overlay Pattern
   
   Phase 1 (no value):
     ┌─ .date-ghost-zone (flex:1, position:relative) ─┐  + cal-icon on right
     │  ◉ .date-ghost   (opacity:0, absolute, inset:0) │  ← receives all clicks, browser opens picker
     │  ◉ .date-phtext  (absolute, pointer-events:none)│  ← visible placeholder / set text
     └───────────────────────────────────────────────-─┘

   Phase 2 (value set):
     ┌─ .date-real-wrap (flex:1) ─────────────────────┐
     │  ◉ <input type="date">  visible, styled         │  ← native picker + our styled icon
     └────────────────────────────────────────────────┘
     cal-icon hidden (native date has its own on right)

   The ghost is opacity:0 but full-size → browser click-to-open works
   without ANY showPicker() call. No JS trick, no race condition.
══════════════════════════════════════════════ */
.date-ghost-zone{position:relative;flex:1;height:22px;display:flex;align-items:center;}
.date-phtext{position:absolute;left:0;top:50%;transform:translateY(-50%);
  font-family:'Raleway',sans-serif;font-size:14px;
  color:rgba(245,230,200,0.28);pointer-events:none;white-space:nowrap;z-index:1;}
.date-phtext.val{color:#F5E6C8;}

/* Ghost — invisible but interactive, covers entire date-ghost-zone */
.date-ghost{
  position:absolute;inset:0;width:100%;height:100%;
  opacity:0;cursor:pointer;z-index:2;
  border:none;background:transparent;color:transparent;outline:none;
}
/* Hide native calendar indicator (we have our own on the right) */
.date-ghost::-webkit-calendar-picker-indicator{
  position:absolute;width:100%;height:100%;opacity:0;cursor:pointer;
}

/* Cal icon — sits right of .date-ghost-zone; z-index > ghost so it's clickable */
.cal-icon{
  font-size:14px;color:rgba(196,130,10,0.52);
  cursor:pointer;flex-shrink:0;transition:color .2s;z-index:3;position:relative;
}
.cal-icon:hover{color:#C4820A;}

/* Phase 2: real visible date input */
.date-real-wrap{flex:1;display:none;align-items:center;}
.date-real-wrap.active{display:flex;}
.date-set{
  background:transparent;border:none;outline:none;
  font-family:'Raleway',sans-serif;font-size:14px;color:#F5E6C8;
  width:100%;cursor:pointer;color-scheme:dark;
}
.date-set::-webkit-calendar-picker-indicator{
  filter:invert(65%) sepia(40%) saturate(600%) hue-rotate(10deg);
  cursor:pointer;opacity:.65;margin-left:4px;
}
.date-set::-webkit-calendar-picker-indicator:hover{opacity:1;}

/* Hide ghost zone + cal-icon once phase2 is active */
.fi-wrap.phase2 .date-ghost-zone{display:none;}
.fi-wrap.phase2 .cal-icon{display:none;}
.fi-wrap.phase2 .date-real-wrap{display:flex;}

/* ── Language tags ── */
.lang-inp{background:transparent;border:none;outline:none;color:#F5E6C8;
  font-family:'Raleway',sans-serif;font-size:14px;width:100%;}
.lang-inp::placeholder{color:rgba(245,230,200,0.28);}
.lang-tags-row{display:flex;flex-wrap:wrap;gap:5px;margin-top:8px;}
.lang-tags-row:empty{display:none;}
.lang-tag{display:inline-flex;align-items:center;gap:5px;background:rgba(196,130,10,0.1);
  border:1px solid rgba(196,130,10,0.28);border-radius:2px;padding:2px 8px;
  font-size:12px;color:#F5E6C8;}
.lang-tag-del{font-size:9px;color:rgba(196,130,10,0.5);cursor:pointer;}
.lang-tag-del:hover{color:#C4820A;}

/* ── Pro sections ── */
.pro-hdr{font-family:'Cinzel',serif;font-size:9.5px;letter-spacing:2.5px;color:#C4820A;
  text-transform:uppercase;margin-bottom:13px;opacity:.85;}
.pro-grid{display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-bottom:26px;}
.bul-inp-row{display:flex;align-items:center;gap:8px;padding-bottom:6px;position:relative;}
.bul-inp-row::before{content:'';position:absolute;bottom:0;left:0;right:0;height:1.5px;background:rgba(245,230,200,0.12);}
.bul-inp-row::after{content:'';position:absolute;bottom:0;left:0;width:100%;height:2px;background:#C4820A;
  transform:scaleX(0);transform-origin:left;transition:transform .35s ease;}
.bul-inp-row:focus-within::after{transform:scaleX(1);}
.bul-add-btn{font-size:14px;color:rgba(196,130,10,0.45);cursor:pointer;flex-shrink:0;order:2;transition:color .2s;}
.bul-add-btn:hover{color:#C4820A;}
.bul-inp{background:transparent;border:none;outline:none;color:#F5E6C8;
  font-family:'Raleway',sans-serif;font-size:13.5px;flex:1;order:1;}
.bul-inp::placeholder{color:rgba(245,230,200,0.24);font-style:italic;}
.bul-item{display:flex;align-items:center;gap:8px;padding:5px 0;}
.bul-dot{width:4px;height:4px;border-radius:50%;background:#C4820A;flex-shrink:0;margin-left:2px;}
.bul-txt{font-size:13.5px;color:#F5E6C8;flex:1;outline:none;font-family:'Raleway',sans-serif;
  background:transparent;border:none;border-bottom:1px solid transparent;
  padding-bottom:2px;transition:border-color .25s;cursor:default;}
.bul-txt[contenteditable="true"]{border-bottom-color:#C4820A;cursor:text;}
.bul-del{font-size:13px;color:rgba(196,130,10,0.35);cursor:pointer;opacity:0;transition:opacity .15s;flex-shrink:0;}
.bul-item:hover .bul-del{opacity:1;}
.bot-row{display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-top:6px;}
.bot-right{display:flex;align-items:flex-end;justify-content:flex-end;gap:14px;padding-bottom:4px;}
.btn-cancel{background:transparent;border:1px solid rgba(196,130,10,0.3);color:rgba(245,230,200,0.55);
  padding:9px 22px;font-family:'Cinzel',serif;font-size:10px;letter-spacing:2px;
  cursor:pointer;transition:all .22s;border-radius:2px;}
.btn-cancel:hover{border-color:rgba(196,130,10,0.65);color:#F5E6C8;}
.btn-create{background:#C4820A;border:none;color:#1a1d23;padding:9px 28px;
  font-family:'Cinzel',serif;font-size:10px;letter-spacing:2.5px;
  cursor:pointer;transition:background .22s;border-radius:2px;font-weight:600;}
.btn-create:hover{background:#d4920f;}
`;

/* ─────────────────────────── HTML ─────────────────────────── */
const html = `
<div class="ep">
  <div class="geo-bg">
    <svg width="100%" height="100%" style="position:absolute;inset:0;opacity:0.014" xmlns="http://www.w3.org/2000/svg">
      <defs><pattern id="geo" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
        <polygon points="40,4 76,22 76,58 40,76 4,58 4,22" fill="none" stroke="#C4820A" stroke-width="0.8"/>
        <line x1="40" y1="4" x2="40" y2="76" stroke="#C4820A" stroke-width="0.35"/>
        <line x1="4" y1="22" x2="76" y2="58" stroke="#C4820A" stroke-width="0.35"/>
        <line x1="76" y1="22" x2="4" y2="58" stroke="#C4820A" stroke-width="0.35"/>
      </pattern></defs>
      <rect width="100%" height="100%" fill="url(#geo)"/>
    </svg>
    <div class="gtr"></div><div class="gbl"></div>
  </div>

  <div class="ec">

    <!-- Avatar -->
    <div class="av-sec">
      <div class="av-ring" id="avRing">
        <img class="av-img" id="avImg" alt=""/>
        <div class="av-inner"><i class="ti ti-upload"></i><span>Upload Photo</span></div>
      </div>
      <input class="av-file" type="file" id="avFile" accept="image/*"/>
    </div>

    <!-- Salary -->
    <div class="sal-sec">
      <div class="sal-wrap">
        <i class="ti ti-coin sal-icon"></i>
        <span class="sal-pkr">PKR</span>
        <input class="sal-inp" id="salInp" type="text" placeholder="XX,XXX / mo" inputmode="numeric" autocomplete="off"/>
      </div>
    </div>

    <hr class="divider">

    <!-- Row 1: Full Name · Gender · Date of Birth -->
    <div class="frow g3">
      <div class="field">
        <div class="fi-wrap">
          <i class="ti ti-user field-icon"></i>
          <input class="fi" type="text" placeholder="Full Name"/>
        </div>
      </div>

      <!-- Custom Gender Dropdown -->
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

      <!-- Date of Birth -->
      <div class="field">
        <div class="fi-wrap" id="dobWrap">
          <i class="ti ti-calendar field-icon"></i>
          <!-- Phase 1: Ghost zone -->
          <div class="date-ghost-zone">
            <span class="date-phtext" id="dobPhText">Date of Birth</span>
            <input type="date" class="date-ghost" id="dobGhost"/>
          </div>
          <!-- Cal icon: right side, z-index above ghost -->
          <i class="ti ti-calendar-event cal-icon" id="dobCalIcon"></i>
          <!-- Phase 2: real visible date input -->
          <div class="date-real-wrap" id="dobRealWrap">
            <input type="date" class="date-set" id="dobReal"/>
          </div>
        </div>
      </div>
    </div>

    <!-- Row 2: CNIC · Phone · Email -->
    <div class="frow g3">
      <div class="field">
        <div class="fi-wrap">
          <i class="ti ti-id field-icon"></i>
          <input class="fi" type="text" placeholder="12345-1234567-1"/>
        </div>
      </div>
      <div class="field">
        <div class="fi-wrap">
          <i class="ti ti-device-mobile field-icon"></i>
          <input class="fi" type="tel" placeholder="03XX-XXXXXXX"/>
        </div>
      </div>
      <div class="field">
        <div class="fi-wrap">
          <i class="ti ti-mail field-icon"></i>
          <input class="fi" type="email" placeholder="example@gmail.com" autocomplete="email"/>
        </div>
      </div>
    </div>

    <!-- Row 3: Language · Joining Date -->
    <div class="frow g3">
      <div class="field" style="grid-column:1/2;">
        <div class="fi-wrap">
          <i class="ti ti-world field-icon"></i>
          <input class="lang-inp" id="li" type="text" placeholder="Spoken Language"/>
        </div>
        <div class="lang-tags-row" id="ltags"></div>
      </div>

      <!-- Joining Date -->
      <div class="field" style="grid-column:2/3;">
        <div class="fi-wrap" id="jdateWrap">
          <i class="ti ti-calendar field-icon"></i>
          <div class="date-ghost-zone">
            <span class="date-phtext" id="jdatePhText">Joining Date</span>
            <input type="date" class="date-ghost" id="jdateGhost"/>
          </div>
          <i class="ti ti-calendar-event cal-icon" id="jdateCalIcon"></i>
          <div class="date-real-wrap" id="jdateRealWrap">
            <input type="date" class="date-set" id="jdateReal"/>
          </div>
        </div>
      </div>
      <div style="grid-column:3/4;"></div>
    </div>

    <!-- Row 4: Address -->
    <div class="frow g1" style="margin-bottom:28px;">
      <div class="field">
        <div class="fi-wrap">
          <i class="ti ti-map-pin field-icon"></i>
          <input class="fi" type="text" placeholder="Street Address"/>
        </div>
      </div>
    </div>

    <hr class="divider">

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

    <div class="bot-row">
      <div class="bot-left">
        <div class="pro-hdr">Speciality</div>
        <div id="slist"></div>
        <div class="bul-inp-row" style="margin-top:4px;">
          <input class="bul-inp" id="sinp" type="text" placeholder="Add a speciality…"/>
          <i class="ti ti-check bul-add-btn" id="sadd"></i>
        </div>
      </div>
      <div class="bot-right">
        <button class="btn-cancel">Cancel</button>
        <button class="btn-create">Create Employee</button>
      </div>
    </div>

  </div>
</div>
`;

/* ─────────────────────────── JS init ─────────────────────────── */

/** Standard 100,000 format (international) */
function formatComma(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  return Number(digits).toLocaleString("en-US");
}

/**
 * Sets up a date field with the ghost-overlay pattern.
 *
 * Phase 1 (empty):
 *   - .date-ghost-zone visible: opacity-0 full-size date input covers the area.
 *     Clicking anywhere in the zone or on the cal-icon → browser opens picker natively.
 *   - .date-phtext shows placeholder (pointer-events:none — never blocks ghost).
 *   - cal-icon click → ghost.showPicker() (direct user-gesture handler → works reliably).
 *
 * Phase 2 (value set):
 *   - fi-wrap gets class "phase2" → hides ghost zone + cal-icon via CSS.
 *   - .date-real-wrap shown: real visible <input type="date"> with styled picker icon.
 *   - Clearing real input → reverts to Phase 1.
 */
function setupDate(
  root: HTMLElement,
  ghostId: string, phTextId: string, calIconId: string,
  wrapId: string, realWrapId: string, realId: string
) {
  const ghost    = root.querySelector(`#${ghostId}`)    as HTMLInputElement;
  const phText   = root.querySelector(`#${phTextId}`)   as HTMLElement;
  const calIcon  = root.querySelector(`#${calIconId}`)  as HTMLElement;
  const wrap     = root.querySelector(`#${wrapId}`)     as HTMLElement;
  const realWrap = root.querySelector(`#${realWrapId}`) as HTMLElement;
  const realInp  = root.querySelector(`#${realId}`)     as HTMLInputElement;

  // Cal icon: direct click handler → showPicker on ghost (user gesture → works in iframe)
  calIcon.addEventListener("click", () => {
    try { ghost.showPicker(); } catch { ghost.focus(); ghost.click(); }
  });

  // Ghost changed → activate Phase 2
  ghost.addEventListener("change", () => {
    if (!ghost.value) return;
    realInp.value = ghost.value;
    phText.textContent = formatDateDisplay(ghost.value);
    phText.classList.add("val");
    wrap.classList.add("phase2");
    realWrap.classList.add("active");
    // Flash underline
    wrap.classList.add("focused");
    setTimeout(() => wrap.classList.remove("focused"), 500);
  });

  // Phase 2 input changed / cleared
  realInp.addEventListener("change", () => {
    if (realInp.value) {
      phText.textContent = formatDateDisplay(realInp.value);
    } else {
      // Clear → back to Phase 1
      ghost.value = "";
      phText.classList.remove("val");
      phText.textContent = phText.dataset.ph!;
      wrap.classList.remove("phase2");
      realWrap.classList.remove("active");
    }
  });

  // Store original placeholder
  phText.dataset.ph = phText.textContent!;
}

function formatDateDisplay(val: string): string {
  const [y, m, d] = val.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${parseInt(d,10)} ${months[parseInt(m,10)-1]} ${y}`;
}

function initForm(root: HTMLDivElement) {

  /* ── Salary ── */
  const salInp = root.querySelector("#salInp") as HTMLInputElement;
  salInp.addEventListener("keydown", (e) => {
    const k = (e as KeyboardEvent).key;
    if (!/^\d$/.test(k) && !["Backspace","Delete","ArrowLeft","ArrowRight","Tab","Home","End"].includes(k))
      e.preventDefault();
  });
  salInp.addEventListener("input", () => {
    const pos = salInp.selectionStart ?? salInp.value.length;
    const raw = salInp.value.replace(/,/g, "");
    const formatted = formatComma(raw);
    salInp.value = formatted;
    // Restore cursor roughly
    const diff = formatted.length - salInp.value.length;
    try { salInp.setSelectionRange(pos + diff, pos + diff); } catch {}
  });

  /* ── Date fields ── */
  setupDate(root, "dobGhost",   "dobPhText",   "dobCalIcon",   "dobWrap",   "dobRealWrap",   "dobReal");
  setupDate(root, "jdateGhost", "jdatePhText", "jdateCalIcon", "jdateWrap", "jdateRealWrap", "jdateReal");

  /* ── Custom Gender Dropdown ── */
  const csel     = root.querySelector("#csel")     as HTMLElement;
  const cselFace = root.querySelector("#cselFace") as HTMLElement;
  const cselTxt  = root.querySelector("#cselTxt")  as HTMLElement;
  const cselOpts = root.querySelector("#cselOpts") as HTMLElement;
  const gWrap    = root.querySelector("#genderWrap") as HTMLElement;

  const toggleCsel = (e: Event) => {
    e.stopPropagation();
    const opening = !csel.classList.contains("open");
    csel.classList.toggle("open", opening);
    gWrap.classList.toggle("focused", opening);
  };
  cselFace.addEventListener("click", toggleCsel);
  csel.addEventListener("keydown", (e) => {
    if ((e as KeyboardEvent).key === "Enter" || (e as KeyboardEvent).key === " ") toggleCsel(e);
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

  /* ── Language tags — placeholder ALWAYS shown ── */
  const langs: string[] = ["Urdu","Punjabi"];
  const ltags = root.querySelector("#ltags")!;
  const li    = root.querySelector("#li") as HTMLInputElement;

  function renderLangs() {
    ltags.innerHTML = "";
    langs.forEach(l => {
      const tag = document.createElement("span"); tag.className = "lang-tag";
      const lbl = document.createElement("span"); lbl.textContent = l;
      const x   = document.createElement("span"); x.className = "lang-tag-del"; x.textContent = "✕";
      x.addEventListener("click", (e) => {
        e.stopPropagation();
        langs.splice(langs.indexOf(l), 1);
        renderLangs();
      });
      tag.appendChild(lbl); tag.appendChild(x);
      ltags.appendChild(tag);
    });
    // Placeholder NEVER removed regardless of tag count
    li.placeholder = "Spoken Language";
  }
  renderLangs();

  li.addEventListener("keydown", (e) => {
    const key = (e as KeyboardEvent).key;
    if (key === "Enter" || key === ",") {
      e.preventDefault();
      const v = li.value.trim().replace(/,/g, "");
      if (v && !langs.includes(v)) { langs.push(v); renderLangs(); }
      li.value = "";
    } else if (key === "Backspace" && !li.value && langs.length) {
      langs.pop(); renderLangs();
    }
  });

  /* ── Bullet lists ── */
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
  ["Menu planning and development","Kitchen management","Food quality control","Staff supervision"]
    .forEach(t => makeBullet("tlist", t));
  ["Grilling","Stock control","Team leadership","Hygiene standards"]
    .forEach(c => makeBullet("clist", c));
  ["BBQ","Karahi","Biryani","Grilling"]
    .forEach(s => makeBullet("slist", s));

  /* ── Avatar ── */
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
  avRing.addEventListener("dragover",  (e) => { e.preventDefault(); avRing.classList.add("drag-over"); });
  avRing.addEventListener("dragleave", () => avRing.classList.remove("drag-over"));
  avRing.addEventListener("drop", (e) => {
    e.preventDefault();
    avRing.classList.remove("drag-over");
    const f = (e as DragEvent).dataTransfer?.files[0];
    if (f) applyImage(f);
  });
}

/* ─────────────────────────── Component ─────────────────────────── */
export default function AddEmployee() {
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (rootRef.current) initForm(rootRef.current); }, []);
  return (
    <>
      <style>{css}</style>
      <div ref={rootRef} dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
