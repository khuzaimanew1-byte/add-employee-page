import { useEffect, useRef } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Raleway:wght@300;400;500;600&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

::-webkit-scrollbar{width:5px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:rgba(196,130,10,0.35);border-radius:3px;}
::-webkit-scrollbar-thumb:hover{background:rgba(196,130,10,0.6);}
*{scrollbar-width:thin;scrollbar-color:rgba(196,130,10,0.35) transparent;}

.ep *{box-sizing:border-box;margin:0;padding:0;}
.ep{
  background:#20242B;
  min-height:100vh;
  font-family:'Raleway',sans-serif;
  color:#F5E6C8;
  position:relative;
  overflow:hidden;
  padding-bottom:80px;
}

/* ── Subtle ambient glows only — no pattern ── */
.geo-bg{position:absolute;inset:0;pointer-events:none;z-index:0;}
.gtr{
  position:absolute;top:-80px;right:-60px;
  width:480px;height:480px;
  background:radial-gradient(ellipse,rgba(196,130,10,0.13) 0%,transparent 65%);
}
.gbl{
  position:absolute;bottom:-80px;left:-60px;
  width:380px;height:380px;
  background:radial-gradient(ellipse,rgba(196,130,10,0.09) 0%,transparent 65%);
}

.ec{position:relative;z-index:1;max-width:820px;margin:0 auto;padding:0 44px;}

/* ── Avatar ── */
.av-sec{
  display:flex;flex-direction:column;align-items:center;
  padding-top:40px;margin-bottom:0;
}
.av-ring{
  width:114px;height:114px;
  border-radius:50%;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  cursor:pointer;
  background:#313842;
  transition:box-shadow .28s, background .28s;
  position:relative;overflow:hidden;
  box-shadow:
    0 0 0 1.5px rgba(196,130,10,0.65),
    0 0 0 4px rgba(196,130,10,0.10),
    0 8px 28px rgba(0,0,0,0.5);
}
.av-ring:hover{
  background:#363e4a;
  box-shadow:
    0 0 0 1.5px #C4820A,
    0 0 0 5px rgba(196,130,10,0.17),
    0 10px 36px rgba(0,0,0,0.6);
}
.av-ring.drag-over{
  box-shadow:
    0 0 0 2px #C4820A,
    0 0 0 7px rgba(196,130,10,0.2),
    0 10px 36px rgba(0,0,0,0.6);
}
.av-img{width:100%;height:100%;object-fit:cover;position:absolute;inset:0;border-radius:50%;display:none;}
.av-img.visible{display:block;}

/* default inner (no image) */
.av-inner{
  display:flex;flex-direction:column;align-items:center;gap:7px;
  position:relative;z-index:1;
}
.av-inner i{
  font-size:26px;color:#C4820A;
  opacity:.9;
}
.av-inner span{
  font-family:'Cinzel',serif;font-size:6.5px;letter-spacing:2.2px;
  color:rgba(196,130,10,0.6);text-transform:uppercase;
}

/* hover overlay when image is set */
.av-ring.has-img .av-inner{display:none;}
.av-overlay{
  display:none;
  position:absolute;inset:0;border-radius:50%;z-index:3;
  background:rgba(20,23,28,0.72);
  flex-direction:column;align-items:center;justify-content:center;gap:6px;
}
.av-ring.has-img:hover .av-overlay{display:flex;}
.av-overlay i{font-size:20px;color:#F5E6C8;}
.av-overlay span{font-family:'Cinzel',serif;font-size:6.5px;letter-spacing:2px;color:rgba(245,230,200,0.7);text-transform:uppercase;}

.av-file{display:none;}
.av-hint{
  font-family:'Cinzel',serif;font-size:7.5px;letter-spacing:2.8px;
  color:rgba(196,130,10,0.45);text-transform:uppercase;
  margin-top:11px;margin-bottom:20px;
}

/* ── Salary Pill — compact chip ── */
.sal-sec{
  display:flex;align-items:center;justify-content:center;
  margin-bottom:28px;
}
.sal-pill{
  display:inline-flex;align-items:center;
  background:rgba(196,130,10,0.07);
  border:1px solid rgba(196,130,10,0.45);
  border-radius:100px;
  padding:5px 16px 5px 14px;
  gap:5px;
  transition:border-color .25s, box-shadow .25s, background .25s;
  cursor:text;
}
.sal-pill:focus-within{
  border-color:#C4820A;
  background:rgba(196,130,10,0.11);
  box-shadow:0 0 0 3px rgba(196,130,10,0.12);
}
.sal-pill-cur{
  font-family:'Cinzel',serif;
  font-size:9px;letter-spacing:1.6px;
  color:#C4820A;
  user-select:none;
  flex-shrink:0;
}
.sal-pill-div{
  width:1px;height:12px;
  background:rgba(196,130,10,0.35);
  flex-shrink:0;
}
.sal-pill-inp{
  background:transparent;border:none;outline:none;
  color:#F5E6C8;font-family:'Raleway',sans-serif;
  font-size:13px;font-weight:500;
  width:72px;
  transition:width .3s ease;
  text-align:left;
}
.sal-pill-inp:focus{width:110px;}
.sal-pill-inp::placeholder{color:rgba(245,230,200,0.38);font-weight:400;}
.sal-pill-mo{
  font-family:'Cinzel',serif;font-size:9px;letter-spacing:1px;
  color:rgba(196,130,10,0.55);
  user-select:none;flex-shrink:0;
}

/* ── Layout ── */
.ep .divider{border:none;border-top:1px solid rgba(196,130,10,0.15);margin:0 0 26px;}
.frow{display:grid;gap:0 40px;margin-bottom:26px;}
.g3{grid-template-columns:1fr 1fr 1fr;}
.g2{grid-template-columns:1fr 1fr;}
.g1{grid-template-columns:1fr;}
.field{position:relative;padding-bottom:2px;}

/* ── Underline fields ── */
.fi-wrap{position:relative;display:flex;align-items:center;gap:7px;padding-bottom:6px;}
.fi-wrap::before{content:'';position:absolute;bottom:0;left:0;right:0;height:1.5px;background:rgba(245,230,200,0.14);}
.fi-wrap::after{content:'';position:absolute;bottom:0;left:0;width:100%;height:2px;background:#C4820A;
  transform:scaleX(0);transform-origin:left;transition:transform .35s ease;}
.fi-wrap:focus-within::after,.fi-wrap.focused::after{transform:scaleX(1);}
.fi-wrap>.field-icon{font-size:14px;color:rgba(196,130,10,0.65);flex-shrink:0;}
.fi{background:transparent;border:none;outline:none;color:#F5E6C8;
  font-family:'Raleway',sans-serif;font-size:14px;width:100%;}
.fi::placeholder{color:rgba(245,230,200,0.35);}

/* ── Date ── */
.date-wrap{position:relative;flex:1;display:flex;align-items:center;}
.date-wrap.empty::before{
  content:attr(data-ph);
  position:absolute;left:0;top:50%;transform:translateY(-50%);
  color:rgba(245,230,200,0.35);font-family:'Raleway',sans-serif;font-size:14px;
  pointer-events:none;z-index:1;white-space:nowrap;
}
.date-inp{
  background:transparent;border:none;outline:none;
  font-family:'Raleway',sans-serif;font-size:14px;
  width:100%;cursor:pointer;color-scheme:dark;position:relative;z-index:2;
}
.date-inp.empty{color:transparent;}
.date-inp.empty::-webkit-datetime-edit{opacity:0;}
.date-inp.empty::-webkit-datetime-edit-fields-wrapper{opacity:0;}
.date-inp:not(.empty){color:#F5E6C8;}
.date-inp::-webkit-calendar-picker-indicator{
  filter:invert(65%) sepia(40%) saturate(600%) hue-rotate(10deg);
  cursor:pointer;opacity:.65;
}
.date-inp::-webkit-calendar-picker-indicator:hover{opacity:1;}
.date-inp.empty::-webkit-calendar-picker-indicator{
  position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:pointer;
}

/* ── Gender Dropdown ── */
.csel{position:relative;flex:1;outline:none;}
.csel-face{display:flex;align-items:center;justify-content:space-between;cursor:pointer;
  color:#F5E6C8;font-family:'Raleway',sans-serif;font-size:14px;user-select:none;}
.csel-face i{font-size:13px;color:rgba(196,130,10,0.65);transition:transform .2s;flex-shrink:0;}
.csel.open .csel-face i{transform:rotate(180deg);}
.csel-opts{display:none;position:absolute;top:calc(100% + 8px);left:-28px;right:-10px;
  background:#313842;border:1px solid rgba(196,130,10,0.3);
  border-radius:3px;z-index:200;overflow:hidden;
  box-shadow:0 12px 32px rgba(0,0,0,0.65);}
.csel.open .csel-opts{display:block;}
.csel-opt{padding:9px 14px;font-family:'Raleway',sans-serif;font-size:13.5px;color:#F5E6C8;cursor:pointer;transition:background .15s;}
.csel-opt:hover{background:rgba(196,130,10,0.13);}
.csel-opt.selected{color:#C4820A;}

/* ── Language tags ── */
.lang-inp{background:transparent;border:none;outline:none;color:#F5E6C8;
  font-family:'Raleway',sans-serif;font-size:14px;width:100%;}
.lang-inp::placeholder{color:rgba(245,230,200,0.35);}
.lang-tags-row{display:flex;flex-wrap:wrap;gap:5px;margin-top:8px;}
.lang-tags-row:empty{display:none;}
.lang-tag{display:inline-flex;align-items:center;gap:5px;background:rgba(196,130,10,0.1);
  border:1px solid rgba(196,130,10,0.3);border-radius:2px;padding:2px 8px;font-size:12px;color:#F5E6C8;}
.lang-tag-del{font-size:9px;color:rgba(196,130,10,0.55);cursor:pointer;}
.lang-tag-del:hover{color:#C4820A;}

/* ── Pro sections ── */
.pro-hdr{font-family:'Cinzel',serif;font-size:9.5px;letter-spacing:2.5px;color:#C4820A;text-transform:uppercase;margin-bottom:13px;}
.pro-grid{display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-bottom:26px;}
.bul-inp-row{display:flex;align-items:center;gap:8px;padding-bottom:6px;position:relative;}
.bul-inp-row::before{content:'';position:absolute;bottom:0;left:0;right:0;height:1.5px;background:rgba(245,230,200,0.14);}
.bul-inp-row::after{content:'';position:absolute;bottom:0;left:0;width:100%;height:2px;background:#C4820A;
  transform:scaleX(0);transform-origin:left;transition:transform .35s ease;}
.bul-inp-row:focus-within::after{transform:scaleX(1);}
.bul-add-btn{font-size:14px;color:rgba(196,130,10,0.55);cursor:pointer;flex-shrink:0;order:2;transition:color .2s;}
.bul-add-btn:hover{color:#C4820A;}
.bul-inp{background:transparent;border:none;outline:none;color:#F5E6C8;
  font-family:'Raleway',sans-serif;font-size:13.5px;flex:1;order:1;}
.bul-inp::placeholder{color:rgba(245,230,200,0.3);font-style:italic;}
.bul-item{display:flex;align-items:center;gap:8px;padding:5px 0;}
.bul-dot{width:4px;height:4px;border-radius:50%;background:#C4820A;flex-shrink:0;margin-left:2px;}
.bul-txt{font-size:13.5px;color:#F5E6C8;flex:1;outline:none;font-family:'Raleway',sans-serif;
  background:transparent;border:none;border-bottom:1px solid transparent;
  padding-bottom:2px;transition:border-color .25s;cursor:default;}
.bul-txt[contenteditable="true"]{border-bottom-color:#C4820A;cursor:text;}
.bul-del{font-size:13px;color:rgba(196,130,10,0.4);cursor:pointer;opacity:0;transition:opacity .15s;flex-shrink:0;}
.bul-item:hover .bul-del{opacity:1;}

/* ── Bottom row ── */
.bot-row{display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-top:6px;}
.bot-right{display:flex;align-items:flex-end;justify-content:flex-end;gap:10px;padding-bottom:4px;}

/* ── Cancel — icon circle ── */
.btn-cancel{
  display:flex;align-items:center;justify-content:center;
  width:36px;height:36px;flex-shrink:0;
  background:rgba(245,230,200,0.06);
  border:1px solid rgba(245,230,200,0.18);
  border-radius:50%;
  color:rgba(245,230,200,0.55);
  cursor:pointer;
  transition:border-color .2s, color .2s, background .2s, transform .22s;
}
.btn-cancel i{font-size:15px;pointer-events:none;}
.btn-cancel:hover{
  background:rgba(245,230,200,0.1);
  border-color:rgba(245,230,200,0.4);
  color:#F5E6C8;
  transform:rotate(90deg);
}

/* ── Create button ── */
.btn-create{
  display:inline-flex;align-items:center;gap:7px;
  background:#C4820A;
  border:none;
  color:#1C1F26;
  padding:0 22px;
  height:36px;
  font-family:'Cinzel',serif;font-size:9px;letter-spacing:2px;
  cursor:pointer;
  border-radius:2px;
  font-weight:700;
  text-transform:uppercase;
  transition:background .2s, box-shadow .2s, transform .18s;
  box-shadow:0 3px 14px rgba(196,130,10,0.38);
}
.btn-create i{font-size:13px;flex-shrink:0;}
.btn-create:hover{
  background:#d4920f;
  box-shadow:0 5px 20px rgba(196,130,10,0.52);
  transform:translateY(-1px);
}
.btn-create:active{transform:translateY(0);box-shadow:0 2px 8px rgba(196,130,10,0.3);}

/* ── Toast ── */
.toast{
  position:fixed;bottom:32px;left:50%;transform:translateX(-50%) translateY(80px);
  background:#313842;border:1px solid rgba(196,130,10,0.38);
  color:#F5E6C8;font-family:'Raleway',sans-serif;font-size:13px;
  padding:12px 24px;border-radius:3px;z-index:999;
  display:flex;align-items:center;gap:10px;
  box-shadow:0 8px 32px rgba(0,0,0,0.5);
  transition:transform .35s ease,opacity .35s ease;opacity:0;
}
.toast.show{transform:translateX(-50%) translateY(0);opacity:1;}
.toast i{font-size:16px;color:#C4820A;}
`;

const html = `
<div class="ep">
  <div class="geo-bg">
    <div class="gtr"></div>
    <div class="gbl"></div>
  </div>

  <div class="ec">
    <!-- Avatar -->
    <div class="av-sec">
      <div class="av-ring" id="avRing">
        <img class="av-img" id="avImg" alt=""/>
        <div class="av-inner">
          <i class="ti ti-camera"></i>
          <span>Upload Photo</span>
        </div>
        <div class="av-overlay">
          <i class="ti ti-camera"></i>
          <span>Change</span>
        </div>
      </div>
      <input class="av-file" type="file" id="avFile" accept="image/*"/>
      <div class="av-hint">Employee Profile</div>
    </div>

    <!-- Salary Pill -->
    <div class="sal-sec">
      <div class="sal-pill">
        <span class="sal-pill-cur">PKR</span>
        <div class="sal-pill-div"></div>
        <input class="sal-pill-inp" id="salInp" type="text" placeholder="XX,XXX" inputmode="numeric" autocomplete="off"/>
        <span class="sal-pill-mo">/ mo</span>
      </div>
    </div>

    <hr class="divider">

    <!-- Row 1: Full Name · Gender · Date of Birth -->
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

    <!-- Row 2: CNIC · Phone · Email -->
    <div class="frow g3">
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

    <!-- Row 3: Language · Joining Date -->
    <div class="frow g3">
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
      <div style="grid-column:3/4;"></div>
    </div>

    <!-- Row 4: Address -->
    <div class="frow g1" style="margin-bottom:28px;">
      <div class="field">
        <div class="fi-wrap">
          <i class="ti ti-map-pin field-icon"></i>
          <input class="fi" id="address" type="text" placeholder="Street Address" autocomplete="street-address"/>
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
        <button class="btn-cancel" id="btnCancel" title="Discard & Reset">
          <i class="ti ti-x"></i>
        </button>
        <button class="btn-create" id="btnCreate">
          <i class="ti ti-user-plus"></i>
          Create Employee
        </button>
      </div>
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
  const csel     = root.querySelector("#csel")      as HTMLElement;
  const cselFace = root.querySelector("#cselFace")  as HTMLElement;
  const cselTxt  = root.querySelector("#cselTxt")   as HTMLElement;
  const cselOpts = root.querySelector("#cselOpts")  as HTMLElement;
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
    const f = (e as DragEvent).dataTransfer?.files[0]; if (f) applyImage(f);
  });

  /* Buttons */
  root.querySelector("#btnCancel")!.addEventListener("click", () => {
    if (confirm("Discard changes and reset the form?")) location.reload();
  });

  root.querySelector("#btnCreate")!.addEventListener("click", () => {
    const data = collectFormData(root);
    if (!data.name.trim()) {
      (root.querySelector("#fullName") as HTMLInputElement).focus();
      showToast(root, "Please enter the employee's full name.");
      return;
    }
    console.log("Employee data:", data);
    showToast(root, `Employee "${data.name}" created successfully!`);
  });
}

export default function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (rootRef.current) initForm(rootRef.current); }, []);
  return (
    <>
      <style>{css}</style>
      <div ref={rootRef} dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
