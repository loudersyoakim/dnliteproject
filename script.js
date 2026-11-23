const WA_NUMBER = "6285372777912";
const $ = (id) => document.getElementById(id);

let cart = JSON.parse(localStorage.getItem("dn_cart") || "{}");
let currentLang = localStorage.getItem("dn_lang") || "id";

// Metadata gambar & deskripsi untuk setiap varian produk di halaman keranjang
const productCatalog = {
  "Wine Coffee (Specialty) 250 gr": {
    img: "images/box-front.jpg",
    sub_id: "Fermentasi Wine · Medium Roast · 250 gr",
    sub_en: "Wine Fermentation · Medium Roast · 250 gr",
  },
  "Classic Arabika Bold (250 gr)": {
    img: "images/box-side.jpg",
    sub_id: "Body Tebal · Medium-Dark Roast · 250 gr",
    sub_en: "Full Body · Medium-Dark Roast · 250 gr",
  },
  "Classic Arabika Lite (250 gr)": {
    img: "images/box-art.jpg",
    sub_id: "Aroma Floral & Halus · Light-Medium · 250 gr",
    sub_en: "Smooth & Floral Notes · Light-Medium · 250 gr",
  },
  "Greenbeans Gayo Arabica (1 kg)": {
    img: "images/box-back.jpg",
    sub_id: "Biji Kopi Mentah Sortasi Grade 1 · 1 kg",
    sub_en: "Grade 1 Sorted Raw Green Beans · 1 kg",
  },
};

const dict = {
  id: {
    nav_home: "Beranda",
    nav_about: "Tentang",
    nav_products: "Produk",
    nav_process: "Proses",
    nav_contact: "Kontak",
    hero_eyebrow: "Gayo Specialty Premium",
    hero_title: "Rasa Murni<br />dari Dataran<br />Tinggi Gayo",
    hero_sub:
      "100% Arabica Specialty, Single Origin Gayo<br />Wine Coffee · Classic Arabika · Greenbeans",
    hero_cta: "Belanja Sekarang",
    story_eyebrow: "Tentang Kami",
    story_title: "Dari Dataran Tinggi Gayo<br />ke Cangkir Anda",
    story_desc:
      "Kami menghadirkan kopi Gayo Arabica pilihan dari dataran tinggi Aceh untuk para penikmat kopi maupun pelaku industri roastery yang menghargai kualitas, keaslian, dan karakter rasa di setiap seduhan.",
    story_cta: "Pelajari Selengkapnya",
    stat_1: "Arabica Specialty Gayo",
    stat_2: "Varian Produk Pilihan",
    stat_3: "Origin Dataran Tinggi Aceh",
    stat_4: "Roast & Sortasi Ketat",
    prod_eyebrow: "Produk Kami",
    prod_title: "Koleksi Kopi Gayo Pilihan",
    p1_sub: "Fermentasi Wine · Medium Roast · 250 gr",
    p2_sub: "Body Tebal · Medium-Dark Roast · 250 gr",
    p3_sub: "Aroma Floral & Halus · Light-Medium · 250 gr",
    p4_sub: "Biji Kopi Mentah Sortasi Grade 1 · 1 kg",
    btn_add: "+ Pesan",
    btn_added: "Ditambahkan",
    btn_add_long: "Tambah ke Pesanan",
    spec_eyebrow: "Detail Kemasan Utama",
    spec_title: "Wine Coffee (Specialty)",
    spec_lead:
      "Diproduksi oleh <strong>DN Lite Coffee &amp; Ito Roastery</strong>. Dikemas eksklusif untuk menjaga kompleksitas aroma khas fermentasi wine.",
    th_ing: "Komposisi",
    th_bean: "Biji Kopi",
    th_grind: "Ukuran Giling",
    th_roast: "Level Sangrai",
    th_acid: "Tingkat Keasaman",
    th_weight: "Berat Bersih",
    proc_eyebrow: "Proses Kami",
    proc_title: "Dari Kebun ke Cangkir",
    p_step1_t: "Seleksi Greenbeans Gayo",
    p_step1_d:
      "Biji kopi Arabica pilihan dari dataran tinggi Gayo yang disortasi ketat untuk kualitas ekspor maupun sangrai.",
    p_step2_t: "Wine & Classic Process",
    p_step2_d:
      "Fermentasi wine terkontrol untuk seri Specialty, serta pengolahan klasik untuk profil Bold dan Lite.",
    p_step3_t: "Sangrai Presisi",
    p_step3_d:
      "Disangrai bersama Ito Roastery sesuai karakter masing-masing varian agar cita rasa optimal.",
    p_step4_t: "Kemasan Eksklusif",
    p_step4_d:
      "Dikemas dalam kotak bertekstur elegan dengan aksen emas hangat untuk menjaga kesegaran aroma.",
    feed_desc:
      "Kisah kebun dataran tinggi Gayo, ritual seduh harian, dan apresiasi untuk para petani lokal.",
    feed_cta: "Ikuti @dnlite",
    foot_contact: "Kontak & Legalitas",
    foot_order: "Pesanan Anda",
    order_empty: "Belum ada produk dipilih.",
    foot_wa: "Pesan via WhatsApp",
    // Halaman Keranjang
    cart_eyebrow: "Ringkasan Pesanan",
    cart_title: "Keranjang Belanja Anda",
    cart_list_title: "Daftar Produk Dipilih",
    cart_clear: "Kosongkan Keranjang",
    cart_quick_title: "Tambah Varian Lain",
    cart_back: "← Kembali ke Katalog",
    cart_empty_msg:
      "Keranjang belanja Anda masih kosong. Silakan pilih varian kopi di bawah atau kembali ke katalog.",
    btn_remove: "Hapus",
    chk_eyebrow: "Konfirmasi Pesanan",
    chk_title: "Detail Pengiriman",
    chk_total_label: "Total Item",
    chk_name_label: "Nama Pemesan",
    chk_method_label: "Metode Penerimaan",
    chk_note_label: "Catatan Pesanan (Opsional)",
    chk_submit: "Order Sekarang via WhatsApp",
    chk_hint:
      "Admin DN Lite akan mengonfirmasi total harga & ongkos kirim melalui WhatsApp (0853-7277-7912).",
  },
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_products: "Products",
    nav_process: "Process",
    nav_contact: "Contact",
    hero_eyebrow: "Gayo Specialty Premium",
    hero_title: "Pure Taste<br />From Gayo<br />Highlands",
    hero_sub:
      "100% Arabica Specialty, Single Origin Gayo<br />Wine Coffee · Classic Arabica · Greenbeans",
    hero_cta: "Shop Now",
    story_eyebrow: "Our Story",
    story_title: "From Gayo Highlands<br />to Your Cup",
    story_desc:
      "We bring selected Gayo Arabica coffee from the highlands of Aceh to coffee lovers and roasteries who value quality, authenticity, and a richer experience in every cup.",
    story_cta: "Learn More",
    stat_1: "Gayo Specialty Arabica",
    stat_2: "Curated Product Variants",
    stat_3: "Aceh Highland Single Origin",
    stat_4: "Fresh Roast & Strict Sorting",
    prod_eyebrow: "Our Products",
    prod_title: "Curated Gayo Coffee Collection",
    p1_sub: "Wine Fermentation · Medium Roast · 250 gr",
    p2_sub: "Full Body · Medium-Dark Roast · 250 gr",
    p3_sub: "Smooth & Floral Notes · Light-Medium · 250 gr",
    p4_sub: "Grade 1 Sorted Raw Green Beans · 1 kg",
    btn_add: "+ Order",
    btn_added: "Added",
    btn_add_long: "Add to Order",
    spec_eyebrow: "Flagship Packaging Detail",
    spec_title: "Wine Coffee (Specialty)",
    spec_lead:
      "Produced by <strong>DN Lite Coffee &amp; Ito Roastery</strong>. Exclusively packaged to preserve the distinct wine-fermented aroma.",
    th_ing: "Ingredients",
    th_bean: "Coffee Beans",
    th_grind: "Grind Size",
    th_roast: "Roast Level",
    th_acid: "Acidity",
    th_weight: "Net Weight",
    proc_eyebrow: "Our Process",
    proc_title: "From Farm to Cup",
    p_step1_t: "Gayo Greenbeans Selection",
    p_step1_d:
      "Hand-picked Arabica beans from Gayo highlands, strictly sorted for both specialty roasting and green bean supply.",
    p_step2_t: "Wine & Classic Process",
    p_step2_d:
      "Controlled wine fermentation for our Specialty line, alongside classic processing for Bold and Lite profiles.",
    p_step3_t: "Precision Roasting",
    p_step3_d:
      "Roasted in collaboration with Ito Roastery to unlock each variant's optimal flavor profile.",
    p_step4_t: "Signature Packaging",
    p_step4_d:
      "Packed in textured luxury boxes with warm gold accents to lock in freshness.",
    feed_desc:
      "Stories from the Gayo highlands, daily brewing rituals, and appreciation for our local farmers.",
    feed_cta: "Follow @dnlite",
    foot_contact: "Contact & Legality",
    foot_order: "Your Order",
    order_empty: "No products selected yet.",
    foot_wa: "Order via WhatsApp",
    // Cart Page
    cart_eyebrow: "Order Summary",
    cart_title: "Your Shopping Cart",
    cart_list_title: "Selected Products",
    cart_clear: "Clear Cart",
    cart_quick_title: "Add Other Variants",
    cart_back: "← Back to Catalog",
    cart_empty_msg:
      "Your shopping cart is currently empty. Add coffee variants below or return to the catalog.",
    btn_remove: "Remove",
    chk_eyebrow: "Order Confirmation",
    chk_title: "Delivery Details",
    chk_total_label: "Total Items",
    chk_name_label: "Customer Name",
    chk_method_label: "Receiving Method",
    chk_note_label: "Order Notes (Optional)",
    chk_submit: "Order Now via WhatsApp",
    chk_hint:
      "DN Lite admin will confirm the total price & shipping fee via WhatsApp (0853-7277-7912).",
  },
};

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("dn_lang", lang);
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (dict[lang] && dict[lang][key]) {
      el.innerHTML = dict[lang][key];
    }
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  renderCart();
}

function updateItemQty(name, delta) {
  const nextQty = (cart[name] || 0) + delta;
  if (nextQty <= 0) {
    delete cart[name];
  } else {
    cart[name] = nextQty;
  }
  renderCart();
}

function removeItem(name) {
  delete cart[name];
  renderCart();
}

function renderCart() {
  localStorage.setItem("dn_cart", JSON.stringify(cart));
  const items = Object.entries(cart);
  const total = items.reduce((s, [, q]) => s + q, 0);
  const list = items.map(([n, q]) => `${q}× ${n}`).join(", ");

  // Update badge keranjang di navbar
  if ($("cartCount")) $("cartCount").textContent = total;

  // Update ringkasan di footer
  if ($("orderNote")) {
    $("orderNote").textContent = total ? list : dict[currentLang].order_empty;
  }

  // Update tombol WA di footer (jika ada)
  if ($("wa")) {
    const text =
      currentLang === "id"
        ? total
          ? `Halo DN Lite, saya ingin memesan: ${list}`
          : "Halo DN Lite, saya ingin bertanya tentang produk kopi Gayo."
        : total
          ? `Hello DN Lite, I would like to order: ${list}`
          : "Hello DN Lite, I would like to inquire about your Gayo coffee products.";
    $("wa").href =
      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
  }

  // Render khusus halaman keranjang.html
  const container = $("cartListContainer");
  if (container) {
    if ($("summaryTotalQty")) {
      $("summaryTotalQty").textContent = `${total} item`;
    }
    if ($("orderWaBtn")) {
      $("orderWaBtn").disabled = total === 0;
    }

    if (items.length === 0) {
      container.innerHTML = `<div class="cart-empty-state">${dict[currentLang].cart_empty_msg}</div>`;
    } else {
      container.innerHTML = items
        .map(([name, qty]) => {
          const meta = productCatalog[name] || {
            img: "images/box-front.jpg",
            sub_id: "Gayo Arabica Specialty",
            sub_en: "Gayo Arabica Specialty",
          };
          const subText = currentLang === "id" ? meta.sub_id : meta.sub_en;
          return `
            <div class="cart-row">
              <img src="${meta.img}" alt="${name}" />
              <div class="cart-row-info">
                <h3>${name}</h3>
                <p>${subText}</p>
              </div>
              <div class="qty-control">
                <button type="button" data-action="dec" data-item="${name}" aria-label="Kurangi">−</button>
                <span>${qty}</span>
                <button type="button" data-action="inc" data-item="${name}" aria-label="Tambah">+</button>
              </div>
              <button type="button" class="remove-item-btn" data-action="del" data-item="${name}">
                ${dict[currentLang].btn_remove}
              </button>
            </div>
          `;
        })
        .join("");

      // Pasang event listener untuk tombol -, +, dan Hapus
      container.querySelectorAll("button[data-action]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const item = btn.dataset.item;
          const act = btn.dataset.action;
          if (act === "inc") updateItemQty(item, 1);
          if (act === "dec") updateItemQty(item, -1);
          if (act === "del") removeItem(item);
        });
      });
    }
  }
}

// Tombol + Pesan di halaman katalog
document.querySelectorAll(".add").forEach((b) =>
  b.addEventListener("click", () => {
    cart[b.dataset.name] = (cart[b.dataset.name] || 0) + 1;
    const origKey = b.dataset.i18n;
    b.textContent = dict[currentLang].btn_added;
    setTimeout(() => {
      b.textContent = dict[currentLang][origKey];
    }, 1000);
    renderCart();
  }),
);

// Tombol Tambah Cepat di halaman keranjang.html
document.querySelectorAll("[data-add-item]").forEach((btn) =>
  btn.addEventListener("click", () => {
    updateItemQty(btn.dataset.addItem, 1);
  }),
);

// Tombol Kosongkan Keranjang
if ($("clearCartBtn")) {
  $("clearCartBtn").addEventListener("click", () => {
    cart = {};
    renderCart();
  });
}

// Submit Form Checkout WhatsApp di keranjang.html
if ($("checkoutForm")) {
  $("checkoutForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const items = Object.entries(cart);
    if (items.length === 0) return;

    const name = $("custName").value.trim();
    const method = $("custMethod").value;
    const note = $("custNote").value.trim();
    const itemLines = items
      .map(([n, q], idx) => `${idx + 1}. ${n} (${q}×)`)
      .join("\n");

    const message =
      currentLang === "id"
        ? `Halo *DN Lite*, saya ingin melakukan pemesanan:\n\n` +
          `*Daftar Pesanan:*\n${itemLines}\n\n` +
          `*Nama Pemesan:* ${name}\n` +
          `*Metode:* ${method}\n` +
          (note ? `*Catatan:* ${note}\n\n` : `\n`) +
          `Mohon info total harga & pembayarannya. Terima kasih.`
        : `Hello *DN Lite*, I would like to place an order:\n\n` +
          `*Order List:*\n${itemLines}\n\n` +
          `*Customer Name:* ${name}\n` +
          `*Method:* ${method}\n` +
          (note ? `*Notes:* ${note}\n\n` : `\n`) +
          `Please let me know the total price & payment details. Thank you.`;

    window.open(
      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener",
    );
  });
}

// Galeri thumbnail kemasan
document.querySelectorAll(".thumbs button").forEach((t) =>
  t.addEventListener("click", () => {
    if ($("mainImg")) $("mainImg").src = t.dataset.src;
    document
      .querySelectorAll(".thumbs button")
      .forEach((x) => x.classList.toggle("on", x === t));
  }),
);

// Floating Language Switcher
document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
});

// Navbar scroll & mobile menu
const nav = $("nav");
const menu = $("menu");
if (nav && !nav.classListntains("always-solid")) {
  const onScroll = () => nav.classList.toggle("solid", scrollY > 40);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

if ($("burger") && menu) {
  $("burger").addEventListener("click", () => menu.classList.toggle("open"));
  menu.addEventListener(
    "click",
    (e) => e.target.tagName === "A" && menu.classList.remove("open"),
  );
}

applyLanguage(currentLang);
