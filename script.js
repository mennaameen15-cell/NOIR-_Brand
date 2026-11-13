const WA = "971581637677", SHIP = 60, DAYS = 7;

const P = [
  { id: "heavy-hoodie", n: "Heavyweight Oversized Hoodie", p: 750, cols: ["Black", "Off-White", "Olive", "Brown"], v: ["hoodie-b", "hoodie-w", "hoodie-o", "hoodie-br"] },
  { id: "essential-crewneck", n: "Essential Gold Crewneck", p: 650, cols: ["Black", "Off-White", "Olive", "Brown"], v: ["crew-b", "crew-w", "crew-o", "crew-br"] },
  { id: "heavy-suit", n: "Heavyweight Full Tracksuit", p: 1200, cols: ["Black", "Off-White"], v: ["suit-b", "suit-w"] },
  { id: "heavy-pants", n: "Heavyweight Sweatpants", p: 550, cols: ["Black", "Off-White"], v: ["suit-b", "suit-w"] }
];

const IMG = {
  "hoodie-b": "images/NOIRÉ Heavyweight Hoodie - Onyx Black.jpg",
  "hoodie-w": "images/NOIRÉ Heavyweight Hoodie - Ivory White.jpg",
  "hoodie-o": "images/NOIRÉ Heavyweight Hoodie - Olive Drab.jpg",
  "hoodie-br": "images/NOIRÉ Heavyweight Hoodie - Cocoa Brown.jpg",
  "crew-b": "images/NOIRÉ Essential Crewneck - Onyx Black.jpg",
  "crew-w": "images/NOIRÉ Essential Crewneck - Ivory White.jpg",
  "crew-o": "images/NOIRÉ Essential Crewneck - Olive Drab.jpg",
  "crew-br": "images/NOIRÉ Essential Crewneck - Cocoa Brown.jpg",
  "suit-b": "images/NOIRÉ Heavyweight Suit - Onyx Black.jpg",
  "suit-w": "images/NOIRÉ Heavyweight Suit - Ivory White.jpg"
};

const $ = i => document.getElementById(i);
const g = id => P.find(x => x.id == id);

const ld = (k, d) => {
  try { return JSON.parse(localStorage.getItem(k)) || d } catch (e) { return d }
};

const sv = (k, v) => {
  try { localStorage.setItem(k, JSON.stringify(v)) } catch (e) {}
};

let C = ld("noir-c2", []),
    U = ld("noir-u", {}),
    S = { i: 0, sz: "M" },
    Q = "";

const art = (p, i) => `<img src="${IMG[p.v[i]]}" alt="${p.n}">`;
const wa = m => "https://wa.me/" + WA + "?text=" + encodeURIComponent(m);

const card = p => `
  <div class="card" onclick="location.hash='p-${p.id}'">
    <div class="im">${art(p, 0)}${p.v[1] ? art(p, 1) : ""}</div>
    <h3>${p.n}</h3>
    <div class="sw">${p.cols.map(c => `<i class="${c == "Black" || c == "Olive" || c == "Brown" ? "" : "w"}"></i>`).join("")}</div>
    <div class="mut">${p.p} EGP</div>
    <span class="btn">Choose options</span>
  </div>
`;

const home = () => `
  <section class="hero">
    <div class="hl">
      <h1>NOIRÉ</h1>
      <p>Crafted for cold days. Premium gold embroidered winter drop.</p>
      <a class="btn l" href="#catalog">Shop the collection</a>
    </div>
    <div class="hr">${art(P[2], 0)}${art(P[2], 1)}</div>
  </section>

  <div class="w">
    <h2 class="t">Winter Arrivals</h2>
    <div class="grid">${P.map(card).join("")}</div>
  </div>

 <section class="about-sec">
    <div class="w about-grid">
      <div class="about-img-single">
            <img src="images/NOIRÉ About Section.jpg" alt="NOIRÉ ">      </div>
      <div class="about-txt">
        <span class="sub-t">OUR CRAFT</span>
        <h2>ABOUT NOIRÉ</h2>
        <p>In a world full of trends, we choose the <b>Essentials</b>. At <b>NOIRÉ</b>, we redefine the meaning of "Basic". Our mission is to provide high-quality, timeless winter pieces that combine heavyweight comfort with a modern luxury aesthetic.</p>
        <p>Every stitch and gold embroidery is crafted with precision, using premium Egyptian cotton to ensure that your everyday wear is not just a garment, but a statement of quality.</p>
        <div class="badges">
          <span>PREMIUM FABRICS</span>
          <span>TAILORED CUTS</span>
        </div>
      </div>
    </div>
  </section>

  <div class="w">
    <div class="trust">
      <div><b>Cash on delivery</b><span class="mut">Pay when it arrives</span></div>
      <div><b>Sizes S to XL</b><span class="mut">Heavyweight cotton</span></div>
      <div><b>Easy exchange</b><span class="mut">Within ${DAYS} days</span></div>
    </div>
  </div>
`;
const catalog = () => {
  const r = P.filter(p => p.n.toLowerCase().includes(Q.toLowerCase()));
  return `
    <div class="w">
      <h2 class="t">Catalog</h2>
      ${r.length ? `<div class="grid">${r.map(card).join("")}</div>` : `<p class="ctr mut">No products match “${Q.replace(/[<>&]/g, "")}”. Try another word.</p>`}
    </div>
  `;
};

function prod(id) {
  const p = g(id);
  if (!p) return home();
  const col = p.cols[Math.min(S.i, p.cols.length - 1)];
  const m = `Hello NOIRÉ! I’d like to order:\n\n${p.n} / ${col} / ${S.sz} × 1 = ${p.p} EGP\nShipping: ${SHIP} EGP\nTotal: ${p.p + SHIP} EGP (cash on delivery)` + uinfo();
  const sz = ["S", "M", "L", "XL"].map(v => `<button class="opt ${v == S.sz ? "on" : ""}" onclick="S.sz='${v}';route(1)">${v}</button>`).join("");
  const cl = p.cols.map((c, i) => `<button class="opt ${c == col ? "on" : ""}" onclick="S.i=${i};route(1)">${c}</button>`).join("");
  return `
    <div class="w pp">
      <div>
        <div class="im big">${art(p, S.i)}</div>
        ${p.v.length > 1 ? `<div class="th">${p.v.map((_, i) => `<div class="im ${i == S.i ? "on" : ""}" onclick="S.i=${i};route(1)">${art(p, i)}</div>`).join("")}</div>` : ""}
      </div>
      <div>
        <h1 class="pn">${p.n}</h1>
        <div class="mut">${p.p} EGP</div>
        <p style="margin-top:14px;max-width:46ch">Heavyweight Egyptian cotton, premium gold embroidery, oversized winter cut.</p>
        <h4>Color</h4>
        <div class="op">${cl}</div>
        <h4>Size</h4>
        <div class="op">${sz}</div>
        <div class="acts">
          <button class="btn s" onclick="add('${p.id}')">Add to bag</button>
          <a class="btn" target="_blank" rel="noopener" href="${wa(m)}">Order on WhatsApp</a>
        </div>
        <ul>
          <li>Cash on delivery</li>
          <li>Exchange within ${DAYS} days</li>
        </ul>
      </div>
    </div>
  `;
}

const contact = () => `
  <div class="w narrow">
    <h2 class="t">Contact</h2>
    <p class="ctr">Questions about sizes, orders or exchanges? Message us on WhatsApp.</p>
    <p class="ctr"><a class="btn s" target="_blank" rel="noopener" href="${wa("Hello NOIRÉ!")}">Chat on WhatsApp</a></p>
    <p class="ctr mut">Instagram @noir.eg · hello@noir.eg</p>
  </div>
`;

const policies = () => `
  <div class="w narrow">
    <h2 class="t">Policies</h2>
    <h3 class="ph">Privacy</h3>
    <p>We collect your name, phone number and delivery address only to prepare and deliver your order. We never sell your details. Details saved under “My details” stay on your own device.</p>
    <h3 class="ph">Shipping and delivery</h3>
    <p>Delivery across Egypt costs ${SHIP} EGP and usually takes 2 to 5 working days. We confirm every order by WhatsApp or phone before it ships.</p>
    <h3 class="ph">Payment</h3>
    <p>Payment is cash on delivery. Please have the exact amount ready when the courier arrives.</p>
    <h3 class="ph">Exchange and returns</h3>
    <p>You can exchange an item for another size within ${DAYS} days of delivery if it is unworn, unwashed and has its tags. Message us on WhatsApp to arrange it.</p>
    <h3 class="ph">Terms</h3>
    <p>An order is confirmed once we contact you. Prices are in Egyptian pounds and may change. We may cancel an order if we cannot reach you after several attempts.</p>
  </div>
`;

const pages = { home, catalog, contact, policies };

function route(keep) {
  const h = location.hash.slice(1) || "home";
  $("app").innerHTML = h.startsWith("p-") ? prod(h.slice(2)) : (pages[h] || home)();
  document.querySelectorAll("[data-h]").forEach(a => a.classList.toggle("on", a.dataset.h == h));
  if (!keep) scrollTo(0, 0);
}

addEventListener("hashchange", () => {
  S = { i: 0, sz: "M" };
  route();
});

function uinfo() {
  return U.name ? `\nName: ${U.name}\nPhone: ${U.phone || ""}\nAddress: ${U.addr || ""}` : "";
}

function rc() {
  const n = C.reduce((a, x) => a + x.q, 0),
        sub = C.reduce((a, x) => a + x.q * g(x.id).p, 0);
  
  $("bd").style.display = n ? "" : "none";
  $("bd").textContent = n;
  
  $("cl").innerHTML = C.length ? C.map((x, i) => {
    const p = g(x.id);
    return `
      <div class="ci">
        <div class="im">${art(p, x.i)}</div>
        <div>
          <b>${p.n}</b>
          <div class="mut">${g(x.id).cols[Math.min(x.i, g(x.id).cols.length - 1)]} / ${x.sz}</div>
          <div class="q">
            <button aria-label="Less" onclick="qt(${i},-1)">−</button> ${x.q} 
            <button aria-label="More" onclick="qt(${i},1)">+</button>
          </div>
        </div>
        <div>${p.p * x.q} EGP</div>
      </div>
    `;
  }).join("") : `<p class="mut" style="padding:20px 0">Your bag is empty. Pick an item from the catalog.</p>`;
  
  $("st").textContent = sub + " EGP";
  $("sh").textContent = (C.length ? SHIP : 0) + " EGP";
  $("tt").textContent = (C.length ? sub + SHIP : 0) + " EGP";
  
  const lines = C.map(x => `- ${g(x.id).n} / ${g(x.id).cols[Math.min(x.i, g(x.id).cols.length - 1)]} / ${x.sz} × ${x.q} = ${g(x.id).p * x.q} EGP`).join("\n");
  $("wl").href = wa(`Hello NOIRÉ! I’d like to order:\n${lines}\nSubtotal: ${sub} EGP\nShipping: ${SHIP} EGP\nTotal: ${sub + SHIP} EGP (cash on delivery)` + uinfo());
  $("wl").style.display = C.length ? "" : "none";
}

function qt(i, d) {
  C[i].q += d;
  if (C[i].q < 1) C.splice(i, 1);
  sv("noir-c2", C);
  rc();
}

function add(id) {
  const k = C.find(x => x.id == id && x.i == S.i && x.sz == S.sz);
  k ? k.q++ : C.push({ id, i: S.i, sz: S.sz, q: 1 });
  sv("noir-c2", C);
  rc();
  od("cart");
}

function od(n) {
  $("ov").classList.add("open");
  ["cart", "acc"].forEach(x => $(x).classList.toggle("open", x == n));
}

function cd() {
  $("ov").classList.remove("open");
  ["cart", "acc"].forEach(x => $(x).classList.remove("open"))
}

function saveU() {
  U = {
    name: $("un").value.trim(),
    phone: $("up").value.trim(),
    addr: $("ua").value.trim()
  };
  sv("noir-u", U);
  rc();
  cd();
}

function tg() {
  const s = $("sb");
  s.classList.toggle("open");
  if (s.classList.contains("open")) $("q").focus();
}

function srch(v) {
  Q = v;
  if (location.hash != "#catalog") location.hash = "catalog";
  else route(1);
}

addEventListener("keydown", e => {
  if (e.key == "Escape") cd();
});

const tk = ["FIRST SILENCE · WINTER DROP", "HEAVYWEIGHT COTTON", "SIZES S TO XL", "CASH ON DELIVERY"].map(x => `<span>${x}</span>`).join("");
$("ann").innerHTML = `<div>${tk.repeat(6)}</div>`;

$("un").value = U.name || "";
$("up").value = U.phone || "";
$("ua").value = U.addr || "";

rc();
route();