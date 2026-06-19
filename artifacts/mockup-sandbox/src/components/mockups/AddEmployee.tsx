import { useEffect, useRef } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Raleway:wght@300;400;500;600&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

.ep *{box-sizing:border-box;margin:0;padding:0;}
.ep{background:#20242B;min-height:100vh;font-family:'Raleway',sans-serif;color:#F5E6C8;position:relative;overflow:hidden;padding-bottom:70px;}
.geo-bg{position:absolute;inset:0;pointer-events:none;z-index:0;}
.gtr{position:absolute;top:-100px;right:-80px;width:460px;height:460px;background:radial-gradient(ellipse,rgba(196,130,10,0.12) 0%,transparent 70%);}
.gbl{position:absolute;bottom:-100px;left:-80px;width:380px;height:380px;background:radial-gradient(ellipse,rgba(196,130,10,0.08) 0%,transparent 70%);}
.ec{position:relative;z-index:1;max-width:820px;margin:0 auto;padding:0 44px;}

.av-sec{display:flex;flex-direction:column;align-items:center;padding-top:38px;margin-bottom:20px;}
.av-ring{width:120px;height:120px;border-radius:50%;border:1.5px solid #C4820A;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;background:rgba(196,130,10,0.06);transition:background 0.25s,border-color 0.25s;position:relative;overflow:hidden;}
.av-ring:hover{background:rgba(196,130,10,0.14);border-color:#d9960f;}
.av-ring .av-img{width:100%;height:100%;object-fit:cover;border-radius:50%;position:absolute;inset:0;display:none;}
.av-ring .av-img.visible{display:block;}
.av-ring .av-inner{display:flex;flex-direction:column;align-items:center;gap:5px;transition:opacity 0.2s;position:relative;z-index:1;}
.av-ring .av-inner i{font-size:26px;color:#C4820A;}
.av-ring .av-inner span{font-family:'Cinzel',serif;font-size:8px;letter-spacing:1.5px;color:rgba(196,130,10,0.7);text-transform:uppercase;}
.av-ring.drag-over{border-color:#C4820A;background:rgba(196,130,10,0.2);box-shadow:0 0 0 3px rgba(196,130,10,0.2);}
.av-ring.has-img .av-inner{opacity:0;}
.av-ring.has-img:hover .av-inner{opacity:1;z-index:2;background:rgba(32,36,43,0.65);width:100%;height:100%;border-radius:50%;position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;}
.av-file{display:none;}

.sal-sec{display:flex;flex-direction:column;align-items:center;margin-top:10px;margin-bottom:30px;}
.sal-wrap{display:flex;align-items:center;gap:8px;position:relative;width:210px;}
.sal-wrap::before{content:'';position:absolute;bottom:0;left:0;right:0;height:1px;background:rgba(196,130,10,0.3);}
.sal-wrap::after{content:'';position:absolute;bottom:0;left:0;width:100%;height:1.5px;background:#C4820A;transform:scaleX(0);transform-origin:left;transition:transform 0.35s ease;}
.sal-wrap:focus-within::after{transform:scaleX(1);}
.sal-pkr{font-family:'Cinzel',serif;font-size:10px;color:#C4820A;opacity:0.75;letter-spacing:1px;}
.sal-inp{background:transparent;border:none;outline:none;color:#F5E6C8;font-family:'Raleway',sans-serif;font-size:15px;font-weight:500;letter-spacing:1px;width:100%;text-align:center;padding-bottom:6px;}
.sal-inp::placeholder{color:rgba(245,230,200,0.25);font-size:13px;}

.ep .divider{border:none;border-top:1px solid rgba(196,130,10,0.13);margin:0 0 26px;}
.frow{display:grid;gap:0 40px;margin-bottom:26px;}
.g3{grid-template-columns:1fr 1fr 1fr;}
.g2{grid-template-columns:1fr 1fr;}
.g1{grid-template-columns:1fr;}
.field{position:relative;padding-bottom:2px;}

.fi-wrap{position:relative;display:flex;align-items:center;gap:6px;padding-bottom:6px;}
.fi-wrap::before{content:'';position:absolute;bottom:0;left:0;right:0;height:1px;background:rgba(245,230,200,0.15);}
.fi-wrap::after{content:'';position:absolute;bottom:0;left:0;width:100%;height:1.5px;background:#C4820A;transform:scaleX(0);transform-origin:left;transition:transform 0.35s ease;}
.fi-wrap:focus-within::after{transform:scaleX(1);}
.fi-wrap i{font-size:14px;color:rgba(196,130,10,0.5);flex-shrink:0;}
.fi{background:transparent;border:none;outline:none;color:#F5E6C8;font-family:'Raleway',sans-serif;font-size:14px;width:100%;}
.fi::placeholder{color:rgba(245,230,200,0.25);}

.date-display-wrap{position:relative;display:flex;align-items:center;width:100%;}
.date-txt{background:transparent;border:none;outline:none;color:#F5E6C8;font-family:'Raleway',sans-serif;font-size:14px;width:100%;cursor:text;}
.date-txt::placeholder{color:rgba(245,230,200,0.25);}
.date-hidden{position:absolute;opacity:0;pointer-events:none;width:1px;height:1px;top:0;left:0;}
.cal-i{font-size:14px;color:rgba(196,130,10,0.5);cursor:pointer;flex-shrink:0;transition:color 0.2s;}
.cal-i:hover{color:#C4820A;}

.gsel{background:transparent;border:none;outline:none;color:#F5E6C8;font-family:'Raleway',sans-serif;font-size:14px;width:100%;-webkit-appearance:none;appearance:none;cursor:pointer;padding-bottom:0;}
.gsel option{background:#272c34;color:#F5E6C8;}
.chev{position:absolute;right:0;bottom:8px;font-size:13px;color:rgba(196,130,10,0.45);pointer-events:none;}
.lang-tags-row{display:flex;flex-wrap:wrap;align-items:center;gap:5px;flex:1;}
.lang-tag{font-size:13.5px;color:#F5E6C8;}
.lang-dot{color:rgba(196,130,10,0.45);font-size:12px;}
.lang-inp{background:transparent;border:none;outline:none;color:#F5E6C8;font-family:'Raleway',sans-serif;font-size:14px;min-width:70px;flex:1;}
.lang-inp::placeholder{color:rgba(245,230,200,0.25);}
.pro-hdr{font-family:'Cinzel',serif;font-size:9.5px;letter-spacing:2.5px;color:#C4820A;text-transform:uppercase;margin-bottom:13px;opacity:0.85;}
.pro-grid{display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-bottom:26px;}

.bul-inp-row{display:flex;align-items:center;gap:8px;padding-bottom:6px;position:relative;}
.bul-inp-row::before{content:'';position:absolute;bottom:0;left:0;right:0;height:1px;background:rgba(245,230,200,0.15);}
.bul-inp-row::after{content:'';position:absolute;bottom:0;left:0;width:100%;height:1.5px;background:#C4820A;transform:scaleX(0);transform-origin:left;transition:transform 0.35s ease;}
.bul-inp-row:focus-within::after{transform:scaleX(1);}
.bul-inp-row i{font-size:14px;color:rgba(196,130,10,0.45);cursor:pointer;flex-shrink:0;}
.bul-inp-row i:hover{color:#C4820A;}
.bul-inp{background:transparent;border:none;outline:none;color:#F5E6C8;font-family:'Raleway',sans-serif;font-size:13.5px;width:100%;}
.bul-inp::placeholder{color:rgba(245,230,200,0.22);font-style:italic;}
.bul-item{display:flex;align-items:center;gap:8px;padding:5px 0;cursor:default;}
.bul-dot{width:4px;height:4px;border-radius:50%;background:#C4820A;flex-shrink:0;margin-left:2px;}
.bul-txt{font-size:13.5px;color:#F5E6C8;flex:1;outline:none;font-family:'Raleway',sans-serif;background:transparent;border:none;border-bottom:1px solid transparent;padding-bottom:2px;transition:border-color 0.25s;cursor:default;}
.bul-txt[contenteditable="true"]{border-bottom-color:#C4820A;cursor:text;}
.bul-del{font-size:13px;color:rgba(196,130,10,0.35);cursor:pointer;opacity:0;transition:opacity 0.15s;flex-shrink:0;}
.bul-item:hover .bul-del{opacity:1;}
.bot-row{display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-top:6px;}
.bot-right{display:flex;align-items:flex-end;justify-content:flex-end;gap:14px;padding-bottom:4px;}
.btn-cancel{background:transparent;border:1px solid rgba(196,130,10,0.3);color:rgba(245,230,200,0.55);padding:9px 22px;font-family:'Cinzel',serif;font-size:10px;letter-spacing:2px;cursor:pointer;transition:all 0.22s;border-radius:2px;}
.btn-cancel:hover{border-color:rgba(196,130,10,0.65);color:#F5E6C8;}
.btn-create{background:#C4820A;border:none;color:#1a1d23;padding:9px 28px;font-family:'Cinzel',serif;font-size:10px;letter-spacing:2.5px;cursor:pointer;transition:background 0.22s;border-radius:2px;font-weight:600;}
.btn-create:hover{background:#d4920f;}
`;

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
    <div class="av-sec">
      <div class="av-ring" id="avRing">
        <img class="av-img" id="avImg" alt=""/>
        <div class="av-inner">
          <i class="ti ti-upload"></i>
          <span>Upload Photo</span>
        </div>
      </div>
      <input class="av-file" type="file" id="avFile" accept="image/*"/>
    </div>

    <div class="sal-sec">
      <div class="sal-wrap">
        <span class="sal-pkr">PKR</span>
        <input class="sal-inp" type="text" placeholder="0" inputmode="numeric"/>
      </div>
    </div>

    <hr class="divider">

    <div class="frow g3">
      <div class="field">
        <div class="fi-wrap">
          <input class="fi" type="text" placeholder="Full Name"/>
        </div>
      </div>
      <div class="field" style="position:relative;">
        <div class="fi-wrap">
          <select class="gsel" id="gsel">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="custom">Custom</option>
          </select>
          <i class="ti ti-chevron-down chev" aria-hidden="true"></i>
        </div>
      </div>
      <div class="field">
        <div class="fi-wrap">
          <div class="date-display-wrap">
            <input class="date-txt" id="dobDisplay" type="text" placeholder="Date of Birth" readonly/>
            <input class="date-hidden" type="date" id="dob"/>
          </div>
          <i class="ti ti-calendar cal-i" id="dobCal"></i>
        </div>
      </div>
    </div>

    <div class="frow g3">
      <div class="field">
        <div class="fi-wrap">
          <input class="fi" type="text" placeholder="12345-1234567-1"/>
        </div>
      </div>
      <div class="field">
        <div class="fi-wrap">
          <i class="ti ti-device-mobile" aria-hidden="true"></i>
          <input class="fi" type="tel" placeholder="03XX-XXXXXXX"/>
        </div>
      </div>
      <div class="field">
        <div class="fi-wrap">
          <i class="ti ti-mail" aria-hidden="true"></i>
          <input class="fi" type="email" placeholder="example@gmail.com" autocomplete="email"/>
        </div>
      </div>
    </div>

    <div class="frow g3">
      <div class="field" style="grid-column:1/2;">
        <div class="fi-wrap" id="langWrap" style="cursor:text;flex-wrap:wrap;gap:5px;">
          <i class="ti ti-world" aria-hidden="true" style="flex-shrink:0;"></i>
          <div class="lang-tags-row" id="ltags"></div>
          <input class="lang-inp" id="li" type="text" placeholder="Spoken Language"/>
        </div>
      </div>
      <div class="field" style="grid-column:2/3;">
        <div class="fi-wrap">
          <div class="date-display-wrap">
            <input class="date-txt" id="jdateDisplay" type="text" placeholder="Joining Date" readonly/>
            <input class="date-hidden" type="date" id="jdate"/>
          </div>
          <i class="ti ti-calendar cal-i" id="jdateCal"></i>
        </div>
      </div>
      <div style="grid-column:3/4;"></div>
    </div>

    <div class="frow g1" style="margin-bottom:28px;">
      <div class="field">
        <div class="fi-wrap">
          <i class="ti ti-map-pin" aria-hidden="true"></i>
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
          <i class="ti ti-check" id="tadd"></i>
          <input class="bul-inp" id="tinp" type="text" placeholder="Add a task..."/>
        </div>
      </div>
      <div>
        <div class="pro-hdr">Work Capabilities</div>
        <div id="clist"></div>
        <div class="bul-inp-row">
          <i class="ti ti-check" id="cadd"></i>
          <input class="bul-inp" id="cinp" type="text" placeholder="Add a capability..."/>
        </div>
      </div>
    </div>

    <div class="bot-row">
      <div class="bot-left">
        <div class="pro-hdr">Speciality</div>
        <div id="slist"></div>
        <div class="bul-inp-row" style="margin-top:4px;">
          <i class="ti ti-check" id="sadd"></i>
          <input class="bul-inp" id="sinp" type="text" placeholder="Add a speciality..."/>
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

function initForm(root: HTMLDivElement) {
  function makeBullet(listId: string, text: string) {
    const list = root.querySelector(`#${listId}`)!;
    const item = document.createElement("div");
    item.className = "bul-item";
    const dot = document.createElement("div");
    dot.className = "bul-dot";
    const txt = document.createElement("div");
    txt.className = "bul-txt";
    (txt as HTMLElement).contentEditable = "false";
    txt.textContent = text;
    const del = document.createElement("i");
    del.className = "ti ti-trash bul-del";
    item.appendChild(dot);
    item.appendChild(txt);
    item.appendChild(del);
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
      if ((e as KeyboardEvent).key === "Enter") {
        e.preventDefault();
        (txt as HTMLElement).blur();
      }
    });
    list.appendChild(item);
  }

  function setup(inpId: string, addId: string, listId: string) {
    const inp = root.querySelector(`#${inpId}`) as HTMLInputElement;
    const btn = root.querySelector(`#${addId}`)!;
    const add = () => {
      const v = inp.value.trim();
      if (v) { makeBullet(listId, v); inp.value = ""; }
    };
    inp.addEventListener("keydown", (e) => {
      if ((e as KeyboardEvent).key === "Enter") { e.preventDefault(); add(); }
    });
    btn.addEventListener("click", add);
  }

  setup("tinp", "tadd", "tlist");
  setup("cinp", "cadd", "clist");
  setup("sinp", "sadd", "slist");
  ["Menu planning and development", "Kitchen management", "Food quality control", "Staff supervision"].forEach((t) => makeBullet("tlist", t));
  ["Grilling", "Stock control", "Team leadership", "Hygiene standards"].forEach((c) => makeBullet("clist", c));
  ["BBQ", "Karahi", "Biryani", "Grilling"].forEach((s) => makeBullet("slist", s));

  const langs = ["Urdu", "Punjabi"];
  const ltags = root.querySelector("#ltags")!;
  const li = root.querySelector("#li") as HTMLInputElement;

  function renderLangs() {
    ltags.innerHTML = "";
    langs.forEach((l, i) => {
      if (i > 0) {
        const d = document.createElement("span");
        d.className = "lang-dot";
        d.textContent = "•";
        ltags.appendChild(d);
      }
      const t = document.createElement("span");
      t.className = "lang-tag";
      t.textContent = l;
      ltags.appendChild(t);
    });
    li.placeholder = langs.length ? "" : "Spoken Language";
  }
  renderLangs();

  root.querySelector("#langWrap")!.addEventListener("click", () => li.focus());

  li.addEventListener("keydown", (e) => {
    const key = (e as KeyboardEvent).key;
    if (key === "Enter" || key === ",") {
      e.preventDefault();
      const v = li.value.trim().replace(",", "");
      if (v) { langs.push(v); renderLangs(); li.value = ""; }
    } else if (key === "Backspace" && !li.value && langs.length) {
      langs.pop(); renderLangs();
    }
  });

  function formatDate(val: string) {
    if (!val) return "";
    const p = val.split("-");
    if (p.length !== 3) return val;
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${p[2]} ${months[parseInt(p[1], 10) - 1]} ${p[0]}`;
  }

  function setupDate(displayId: string, hiddenId: string, calId: string) {
    const display = root.querySelector(`#${displayId}`) as HTMLInputElement;
    const hidden = root.querySelector(`#${hiddenId}`) as HTMLInputElement;
    const cal = root.querySelector(`#${calId}`)!;

    function openPicker() {
      try { (hidden as any).showPicker(); } catch { hidden.click(); }
    }

    hidden.addEventListener("change", () => {
      display.value = formatDate(hidden.value);
    });

    display.addEventListener("click", () => {
      if (!hidden.value) openPicker();
    });

    cal.addEventListener("click", (e) => {
      e.stopPropagation();
      openPicker();
    });
  }

  setupDate("dobDisplay", "dob", "dobCal");
  setupDate("jdateDisplay", "jdate", "jdateCal");

  const avRing = root.querySelector("#avRing") as HTMLElement;
  const avImg = root.querySelector("#avImg") as HTMLImageElement;
  const avFile = root.querySelector("#avFile") as HTMLInputElement;

  function applyImage(file: File) {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      avImg.src = e.target!.result as string;
      avImg.classList.add("visible");
      avRing.classList.add("has-img");
    };
    reader.readAsDataURL(file);
  }

  avRing.addEventListener("click", () => avFile.click());
  avFile.addEventListener("change", () => {
    if (avFile.files?.[0]) applyImage(avFile.files[0]);
  });
  avRing.addEventListener("dragover", (e) => {
    e.preventDefault();
    avRing.classList.add("drag-over");
  });
  avRing.addEventListener("dragleave", () => avRing.classList.remove("drag-over"));
  avRing.addEventListener("drop", (e) => {
    e.preventDefault();
    avRing.classList.remove("drag-over");
    const file = (e as DragEvent).dataTransfer?.files[0];
    if (file) applyImage(file);
  });
}

export default function AddEmployee() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rootRef.current) initForm(rootRef.current);
  }, []);

  return (
    <>
      <style>{css}</style>
      <div ref={rootRef} dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
