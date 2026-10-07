/**
 * CARE Garden Planner - India Frost Date & Weekly Planting Planner
 * Powered by Google Gemini AI API
 */

// Configurable Gemini API Key (set via window.GEMINI_API_KEY or localStorage.setItem("GEMINI_API_KEY", "..."))
const GEMINI_API_KEY = window.GEMINI_API_KEY || (typeof localStorage !== "undefined" && localStorage.getItem("GEMINI_API_KEY")) || "";
const GEMINI_MODELS = ["gemini-flash-lite-latest", "gemini-3.8-flash", "gemini-flash-latest"];

// Indian Agro-Climatic Zones & Frost/Cold Date Database
const REGIONS_DATA = {
  "delhi": {
    name: "Delhi NCR (Northern Plains)",
    zone: "Zone 2 - Subtropical Plains",
    firstColdDate: "Dec 20",
    lastColdDate: "Feb 05",
    lowestTemp: "3°C - 5°C",
    frostType: "Occasional Light Ground Frost / Cold Waves",
    currentStatus: "Peak Rabi Sowing Week (Direct Sow)",
    advice: "Optimal week to sow winter greens (Palak, Methi, Sarson), carrots, and peas before nighttime temperatures dip in December.",
    sowNow: ["Spinach (Palak)", "Fenugreek (Methi)", "Red Carrots (Gajar)", "Green Peas (Matar)", "Radish (Mooli)", "Mustard (Sarson)", "Marigold (Genda)"]
  },
  "shimla": {
    name: "Shimla & HP Hills (Cold Temperate)",
    zone: "Zone 1 - Western Himalayas",
    firstColdDate: "Nov 15",
    lastColdDate: "Mar 01",
    lowestTemp: "-2°C to 2°C",
    frostType: "Moderate to Heavy Frost / Freeze Risk",
    currentStatus: "Pre-Frost Prep & Cold-Hardy Planting",
    advice: "First frost arrives in ~40 days. Plant garlic bulbs, winter onions, and protect frost-sensitive potted herbs. Move succulents indoors.",
    sowNow: ["Garlic (Lahsun)", "Winter Onions", "Winter Spinach", "Broad Beans", "Pansies", "Strawberries (Mulch)"]
  },
  "chandigarh": {
    name: "Chandigarh & Punjab / Haryana",
    zone: "Zone 2 - Indo-Gangetic Plains",
    firstColdDate: "Dec 15",
    lastColdDate: "Feb 10",
    lowestTemp: "2°C - 5°C",
    frostType: "Light Frost & Dense Winter Fog",
    currentStatus: "Prime Rabi Vegetable Sowing",
    advice: "Soil temperature is ideal for brassicas (Cauliflower, Broccoli) and root crops. Sow seeds in well-drained organic compost.",
    sowNow: ["Cauliflower", "Broccoli", "Turnips (Shalgam)", "Methi", "Carrots", "Beetroot", "Coriander"]
  },
  "lucknow": {
    name: "Lucknow & UP Plains",
    zone: "Zone 2 - Central Gangetic Plain",
    firstColdDate: "Dec 22",
    lastColdDate: "Feb 02",
    lowestTemp: "4°C - 7°C",
    frostType: "Mild Frost / Heavy Winter Dew",
    currentStatus: "Optimal Cool-Season Sowing",
    advice: "Great week for direct sowing leafy greens and transplanting tomato seedlings. Mulch beds to retain moisture.",
    sowNow: ["Palak", "Kasuri Methi", "Cherry Tomatoes", "Peas", "Dhania", "Petunias", "Chrysanthemums"]
  },
  "jaipur": {
    name: "Jaipur & Rajasthan (Semi-Arid North)",
    zone: "Zone 2 - Semi-Arid Subtropical",
    firstColdDate: "Dec 28",
    lastColdDate: "Jan 30",
    lowestTemp: "4°C - 8°C",
    frostType: "Rare Frost / Cold Nights, Sunny Days",
    currentStatus: "Active Winter Garden Kickoff",
    advice: "Warm sunny days and cooling nights provide optimal conditions for both root vegetables and flowering annuals.",
    sowNow: ["Radish (Mooli)", "Methi", "Coriander", "French Beans", "Marigolds", "Dahlia"]
  },
  "bengaluru": {
    name: "Bengaluru & Karnataka Plateau",
    zone: "Zone 4 - Deccan Highland (Frost-Free)",
    firstColdDate: "No Frost",
    lastColdDate: "No Frost",
    lowestTemp: "14°C - 16°C",
    frostType: "Year-Round Pleasant / Frost-Free",
    currentStatus: "Post-Monsoon Peak Sowing Window",
    advice: "No frost risk in Bengaluru! Enjoy year-round gardening. October is ideal for container vegetables, herbs, and exotic ornamental greens.",
    sowNow: ["Bush Beans", "Capsicum / Bell Peppers", "Cherry Tomatoes", "Basil & Rosemary", "Lettuce", "Pilea & Foliage"]
  },
  "mumbai": {
    name: "Mumbai & Konkan Coast",
    zone: "Zone 5 - Tropical Maritime (Frost-Free)",
    firstColdDate: "No Frost",
    lastColdDate: "No Frost",
    lowestTemp: "17°C - 19°C",
    frostType: "Tropical / Completely Frost-Free",
    currentStatus: "Post-Monsoon Winter Garden Setup",
    advice: "Tropical coastal climate with no frost threat. Plant warm-weather favorites, leafy greens, and enjoy outdoor tropical foliage.",
    sowNow: ["Okra (Bhindi)", "Cherry Tomatoes", "Brinjal (Eggplant)", "Malabar Spinach", "Chillies", "Monstera & Tropicals"]
  },
  "kolkata": {
    name: "Kolkata & Eastern Plains",
    zone: "Zone 3 - Lower Gangetic Subtropical",
    firstColdDate: "Frost-Free",
    lastColdDate: "Frost-Free",
    lowestTemp: "11°C - 13°C",
    frostType: "Mild Cool Winter / Frost-Free",
    currentStatus: "Winter Vegetable Planting Season",
    advice: "Mild winter conditions allow fantastic production of cauliflower, cabbage, beetroot, and seasonal marigolds and dahlias.",
    sowNow: ["Cauliflower (Phoolgobhi)", "Knol Khol", "Beetroot", "Coriander (Dhania)", "Dahlia", "Calendula"]
  },
  "pune": {
    name: "Pune & Western Maharashtra",
    zone: "Zone 4 - Deccan Plateau",
    firstColdDate: "No Frost",
    lastColdDate: "No Frost",
    lowestTemp: "8°C - 11°C",
    frostType: "Crisp Cool Nights / Sunny Days",
    currentStatus: "Peak Winter Sowing & Strawberry Setup",
    advice: "Crisp nights and sunny days make October the golden month for strawberries, exotic greens, and winter terrace farming.",
    sowNow: ["Strawberries", "Broccoli", "Spinach", "Green Peas", "Petunias", "French Beans"]
  }
};

// Plant Database
const PLANTS_DATA = [
  {
    id: "pilea",
    name: "Pilea Peperomioides",
    hindi: "Chinese Money Plant",
    category: "indoor",
    image: "assets/pilea_plant.jpg",
    frostBadge: "Protect < 10°C",
    timing: "Plant / Propagate: Year-round",
    harvest: "Indoor Foliage",
    sun: "Bright Indirect Light",
    water: "When top inch dries",
    frostTol: "Frost sensitive; bring indoors during North India winter nights.",
    desc: "A stunning coin-shaped foliage plant celebrated for prosperity and effortless indoor growth. Thrives on bright windowsills."
  },
  {
    id: "cactus",
    name: "Ribbed Golden Cactus",
    hindi: "Desert Cactus (Echinocactus)",
    category: "cactus",
    image: "assets/plant_cactus.jpg",
    frostBadge: "Frost Hardy (Dry Soil)",
    timing: "Repot / Divide: Spring & Autumn",
    harvest: "Perennial Succulent",
    sun: "Direct Full Sunlight (6+ hrs)",
    water: "Once every 2-3 weeks in winter",
    frostTol: "Extremely hardy if soil remains bone-dry. Reduce watering significantly in winter.",
    desc: "Minimalist architectural plant. Requires virtually zero maintenance and thrives in bright terrace pots."
  },
  {
    id: "succulent",
    name: "Haworthia Zebra",
    hindi: "Mini Pearl Succulent",
    category: "cactus",
    image: "assets/plant_succulent.jpg",
    frostBadge: "Mild Frost Tolerant",
    timing: "Ideal potting: Oct - Nov",
    harvest: "Perennial Compact",
    sun: "Bright Filtered Light",
    water: "Once every 10-14 days",
    frostTol: "Tolerates down to 5°C with ease; keep sheltered from winter rainwater.",
    desc: "Exquisite striped rosette succulent in a pastel ceramic planter. Perfect for modern study desks and coffee tables."
  },
  {
    id: "hanging",
    name: "Trailing English Ivy",
    hindi: "Hanging Vine / Ivy",
    category: "indoor",
    image: "assets/plant_hanging.jpg",
    frostBadge: "Cold Hardy (Down to 0°C)",
    timing: "Plant now for lush winter drape",
    harvest: "Perennial Trailing",
    sun: "Partial Shade / Gentle Morning Sun",
    water: "Keep soil lightly moist",
    frostTol: "Highly cold hardy. Enjoys cool Indian winter breezes on balconies.",
    desc: "Gracefully cascading evergreen vine. Excellent natural air-purifier that adds vertical elegance to balconies and terraces."
  },
  {
    id: "palak",
    name: "Desi Spinach (Palak)",
    hindi: "Spinacia oleracea",
    category: "veggies",
    image: "assets/plant_greens.jpg",
    frostBadge: "Frost Hardy (Tolerates 2°C)",
    timing: "🌱 Sow This Week: Oct 1 - Oct 25",
    harvest: "30 - 35 Days",
    sun: "4-6 hrs Winter Sun",
    water: "Moist, rich well-drained soil",
    frostTol: "Frost enhances its sweetness! Ideal cool-season staple across all North and Central Indian states.",
    desc: "The champion winter vegetable for Indian home gardens. Fast growing, cut-and-come-again harvest for months."
  },
  {
    id: "gajar",
    name: "Indian Winter Red Carrot",
    hindi: "Gajar (Daucus carota)",
    category: "veggies",
    image: "assets/tip_veggies.jpg",
    frostBadge: "Frost Tolerant",
    timing: "🌱 Sow This Week: Oct 1 - Oct 20",
    harvest: "75 - 85 Days",
    sun: "Full Winter Sunlight",
    water: "Deep watering, loose sandy-loam soil",
    frostTol: "Loves cold winter weather; roots develop maximum sweetness as nighttime temperatures fall.",
    desc: "Juicy, sweet crimson red Indian carrots. Sow directly in deep containers (at least 12-14 inches deep) or garden beds."
  },
  {
    id: "methi",
    name: "Kasuri Methi (Fenugreek)",
    hindi: "Trigonella foenum-graecum",
    category: "herbs",
    image: "assets/plant_greens.jpg",
    frostBadge: "Frost Hardy",
    timing: "🌱 Sow This Week: Oct 1 - Nov 15",
    harvest: "25 - 30 Days",
    sun: "Partial to Full Sun",
    water: "Regular gentle misting",
    frostTol: "Thrives in chilly weather. Can withstand severe winter nights without damage.",
    desc: "One of the easiest and fastest herbs to cultivate on an Indian balcony. High iron, fragrant, ready to snip in under a month."
  },
  {
    id: "marigold",
    name: "African Marigold (Genda)",
    hindi: "Tagetes erecta",
    category: "flowers",
    image: "assets/tip_frost.jpg",
    frostBadge: "Protect from Hard Frost (<4°C)",
    timing: "🌱 Sow / Transplant: Early October",
    harvest: "Blooms in 50-60 Days",
    sun: "Full Direct Sunlight",
    water: "Moderate, allow topsoil to dry",
    frostTol: "Provide canopy or light frost cover during peak North Indian cold snaps in early January.",
    desc: "Vibrant golden blossoms that welcome the festive season and naturally repel garden pests with their fragrant foliage."
  }
];

// Tips & Tricks Articles Data
const TIPS_DATA = {
  tip1: {
    title: "5 Excellent tips on how to take care of your rooftop garden during winter frost",
    category: "Rooftop Gardening",
    image: "assets/tip_frost.jpg",
    content: `
      <p>As winter sets in across Northern and Central India, nighttime temperature drops and chilly winds can stress delicate balcony and rooftop plants. Here is how to safeguard your green sanctuary:</p>
      <br>
      <h4>1. Water in the Morning, Never at Night</h4>
      <p>Water your terrace pots between 9:00 AM and 11:00 AM. Wet soil overnight chills the root zone and can cause root shock during cold snaps.</p>
      <br>
      <h4>2. Mulch Pot Surfaces Generously</h4>
      <p>Spread a 2-inch layer of dry leaves, cocopeat, or wood shavings over pot surfaces to insulate root balls from sharp temperature drops.</p>
      <br>
      <h4>3. Cluster Pots Together for Microclimate Protection</h4>
      <p>Group individual pots together against a warm south-facing wall. They trap warmth and shield one another from biting winds.</p>
      <br>
      <h4>4. Use Agro-Netting or Cotton Cloth on Cold Snap Nights</h4>
      <p>During late December cold waves in North India, cover vulnerable plants (tomatoes, chillies, succulents) with light breathable cloth before sunset.</p>
      <br>
      <h4>5. Boost Potassium & Organic Compost</h4>
      <p>A gentle dose of vermicompost and wood ash strengthens plant cell walls, significantly boosting natural cold resistance.</p>
    `
  },
  tip2: {
    title: "8 rare indoor plants that will make your house lively & air clean",
    category: "Indoor Botanical Care",
    image: "assets/tip_veggies.jpg",
    content: `
      <p>Indoor plants transform modern Indian urban apartments into tranquil, oxygen-rich wellness havens. Here are top resilient choices:</p>
      <br>
      <h4>1. Pilea Peperomioides (Chinese Money Plant)</h4>
      <p>Beloved for its circular emerald foliage and easy propagation. Brings good energy and adapts wonderfully to Indian winters indoors.</p>
      <br>
      <h4>2. Monstera Deliciosa (Swiss Cheese Plant)</h4>
      <p>The iconic statement plant. Thrives in bright indirect light and gently humidifies dry winter air.</p>
      <br>
      <h4>3. Haworthia & Zebra Succulents</h4>
      <p>Compact, architectural, and requiring water just once or twice a month during cooler months.</p>
      <br>
      <h4>4. Golden Pothos & Philodendron Ceylon</h4>
      <p>Indestructible climbers that filter airborne toxins while draping gracefully from shelves.</p>
    `
  },
  tip3: {
    title: "Sowing winter vegetables in October: Full calendar for Indian climatic zones",
    category: "Seasonal Planting Guide",
    image: "assets/tip_balcony.jpg",
    content: `
      <p>October marks the start of the Rabi agricultural season in India — the single most rewarding gardening window of the entire year!</p>
      <br>
      <h4>Direct Sowing This Week (Oct 1 - Oct 15):</h4>
      <ul>
        <li><strong>Spinach (Palak) & Kasuri Methi:</strong> Shallow sow 0.5 cm deep; germinates in 4-6 days.</li>
        <li><strong>Desi Red Carrots & Mooli (Radish):</strong> Direct sow in loose sandy soil; thin seedlings to 3 inches apart.</li>
        <li><strong>Green Peas (Matar):</strong> Soak seeds overnight and plant 1 inch deep in full sun.</li>
      </ul>
      <br>
      <h4>Nursery Tray Sowing (Transplant in November):</h4>
      <ul>
        <li>Broccoli, Cauliflower, Cabbage, and Cherry Tomatoes.</li>
      </ul>
    `
  }
};

// Application State
let currentSelectedRegion = "delhi";
let currentPlantFilter = "all";
let isAiGenerating = false;

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  initRegionSelector();
  initTabs();
  initPlantFilters();
  initModals();
  initGeminiAssistant();
  updateRegionDisplay("delhi");
});

/**
 * Initialize Indian Region / Frost Date Selector
 */
function initRegionSelector() {
  const select = document.getElementById("regionSelect");
  if (!select) return;

  select.addEventListener("change", (e) => {
    currentSelectedRegion = e.target.value;
    updateRegionDisplay(currentSelectedRegion);
  });
}

/**
 * Update UI values based on selected Indian Region
 */
function updateRegionDisplay(regionKey) {
  const data = REGIONS_DATA[regionKey] || REGIONS_DATA["delhi"];
  
  const frostValElem = document.getElementById("frostVal");
  const frostSubElem = document.getElementById("frostSub");
  const tempValElem = document.getElementById("tempVal");
  const tempSubElem = document.getElementById("tempSub");
  const heroRegionBadge = document.getElementById("heroRegionBadge");
  const heroStatusText = document.getElementById("heroStatusText");

  // Calculate days remaining until frost/cold snap
  let countdownText = "";
  if (data.firstColdDate.includes("Dec")) {
    countdownText = "First cold snap in ~75 days";
  } else if (data.firstColdDate.includes("Nov")) {
    countdownText = "First frost in ~40 days";
  } else {
    countdownText = "Year-round growing window";
  }

  if (frostValElem) frostValElem.textContent = data.firstColdDate;
  if (frostSubElem) frostSubElem.textContent = countdownText;
  if (tempValElem) tempValElem.textContent = data.lowestTemp;
  if (tempSubElem) tempSubElem.textContent = data.currentStatus;
  
  if (heroRegionBadge) {
    heroRegionBadge.innerHTML = `<span class="dot"></span> ${data.name} · ${data.currentStatus}`;
  }
  
  if (heroStatusText) {
    heroStatusText.textContent = data.advice;
  }
}

/**
 * Tab Navigation (Our Mission / Our Vision / Frost Advisory)
 */
function initTabs() {
  const tabBtns = document.querySelectorAll(".tab-btn");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-tab");
      
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      document.querySelectorAll(".tab-content-panel").forEach(p => p.classList.remove("active"));
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add("active");
    });
  });
}

/**
 * Plant Collection Filter Chips
 */
function initPlantFilters() {
  const filterChips = document.querySelectorAll(".filter-chip");
  filterChips.forEach(chip => {
    chip.addEventListener("click", () => {
      filterChips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      
      const filter = chip.getAttribute("data-filter");
      renderPlantCards(filter);
    });
  });

  // Initial render
  renderPlantCards("all");
}

/**
 * Render Plant Cards dynamically based on active filter
 */
function renderPlantCards(filter) {
  const grid = document.getElementById("collectionGrid");
  if (!grid) return;

  grid.innerHTML = "";
  
  const filteredPlants = filter === "all" 
    ? PLANTS_DATA 
    : PLANTS_DATA.filter(p => p.category === filter);

  filteredPlants.forEach(plant => {
    const card = document.createElement("div");
    card.className = "plant-card";
    card.innerHTML = `
      <div class="plant-card-media">
        <img src="${plant.image}" alt="${plant.name}" class="plant-card-img" loading="lazy">
        <span class="plant-badge-frost">${plant.frostBadge}</span>
      </div>
      <div class="plant-card-body">
        <div class="plant-card-tag">${plant.timing}</div>
        <h4 class="plant-card-name">${plant.name}</h4>
        <div class="plant-card-hindi">${plant.hindi}</div>
        <div class="plant-card-meta">
          <span><strong>Sun:</strong> ${plant.sun.split(" ")[0]}</span>
          <span><strong>Harvest:</strong> ${plant.harvest}</span>
        </div>
        <button class="plant-card-btn" onclick="openPlantModal('${plant.id}')">
          View Care & Sowing Guide
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
}

/**
 * Modal Management
 */
function initModals() {
  // Close buttons
  document.querySelectorAll(".modal-close-btn, .modal-overlay").forEach(el => {
    el.addEventListener("click", (e) => {
      if (e.target === el) {
        closeAllModals();
      }
    });
  });

  // Escape key to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllModals();
  });
}

function closeAllModals() {
  document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("active"));
}

function openModal(modalId) {
  closeAllModals();
  const m = document.getElementById(modalId);
  if (m) m.classList.add("active");
}

/**
 * Open Plant Details Modal
 */
window.openPlantModal = function(plantId) {
  const plant = PLANTS_DATA.find(p => p.id === plantId);
  if (!plant) return;

  const titleElem = document.getElementById("plantModalTitle");
  const bodyElem = document.getElementById("plantModalBody");

  if (titleElem) titleElem.textContent = `${plant.name} (${plant.hindi})`;
  if (bodyElem) {
    bodyElem.innerHTML = `
      <div style="display:flex; gap:20px; margin-bottom:20px; align-items:flex-start;">
        <img src="${plant.image}" style="width:130px; height:130px; border-radius:12px; object-fit:cover; flex-shrink:0;">
        <div>
          <span style="display:inline-block; font-size:12px; font-weight:700; color:var(--color-primary); margin-bottom:6px;">
            ${plant.timing}
          </span>
          <p style="font-size:14px; line-height:1.6; color:var(--color-text-body); margin-bottom:8px;">${plant.desc}</p>
        </div>
      </div>
      <div style="background:var(--bg-page); border:1px solid var(--border-light); border-radius:12px; padding:16px; margin-bottom:18px;">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; font-size:13px;">
          <div><strong>Frost Tolerance:</strong> <br>${plant.frostTol}</div>
          <div><strong>Sun Exposure:</strong> <br>${plant.sun}</div>
          <div><strong>Watering Need:</strong> <br>${plant.water}</div>
          <div><strong>Maturity / Harvest:</strong> <br>${plant.harvest}</div>
        </div>
      </div>
      <button class="btn-primary" style="width:100%;" onclick="askAiAboutPlant('${plant.name}')">
        ✨ Ask AI Specialist: How to sow in my city this week?
      </button>
    `;
  }

  openModal("plantModal");
};

/**
 * Open Article Tip Modal
 */
window.openTipModal = function(tipKey) {
  const tip = TIPS_DATA[tipKey];
  if (!tip) return;

  const titleElem = document.getElementById("tipModalTitle");
  const bodyElem = document.getElementById("tipModalBody");

  if (titleElem) titleElem.textContent = tip.title;
  if (bodyElem) {
    bodyElem.innerHTML = `
      <div style="margin-bottom:20px; border-radius:12px; overflow:hidden; max-height:260px;">
        <img src="${tip.image}" style="width:100%; height:100%; object-fit:cover;">
      </div>
      <div style="font-size:14.5px; line-height:1.7; color:var(--color-text-body);">
        ${tip.content}
      </div>
    `;
  }

  openModal("tipModal");
};

/**
 * Open Contact / Helpline Modal
 */
window.openContactModal = function() {
  openModal("contactModal");
};

/**
 * Open AI Specialist Modal
 */
window.openAiModal = function() {
  openModal("aiModal");
};

/**
 * Trigger AI prompt for specific plant
 */
window.askAiAboutPlant = function(plantName) {
  closeAllModals();
  openAiModal();
  const regionName = REGIONS_DATA[currentSelectedRegion]?.name || "North India";
  const prompt = `Give me step-by-step planting and frost protection instructions for ${plantName} in ${regionName} during the current week of October. Keep it practical and concise.`;
  sendAiMessage(prompt);
};

/**
 * Gemini AI Integration
 */
function initGeminiAssistant() {
  const sendBtn = document.getElementById("chatSendBtn");
  const input = document.getElementById("chatInput");

  if (sendBtn && input) {
    sendBtn.addEventListener("click", () => {
      const text = input.value.trim();
      if (text) {
        sendAiMessage(text);
        input.value = "";
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        const text = input.value.trim();
        if (text) {
          sendAiMessage(text);
          input.value = "";
        }
      }
    });
  }

  // Pre-set quick chips
  document.querySelectorAll(".chat-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const query = chip.getAttribute("data-prompt");
      if (query) {
        sendAiMessage(query);
      }
    });
  });
}

/**
 * Send user query to Gemini API and render streaming/structured response
 */
async function sendAiMessage(messageText) {
  if (isAiGenerating) return;

  const messagesContainer = document.getElementById("chatMessages");
  if (!messagesContainer) return;

  // Append user bubble
  appendChatBubble(messageText, "user");

  // Append bot loading bubble
  const loadingBubble = appendChatBubble("Consulting Indian horticultural database & climate models...", "bot");
  isAiGenerating = true;

  const regionInfo = REGIONS_DATA[currentSelectedRegion] || REGIONS_DATA["delhi"];

  const systemContext = `You are the lead horticultural specialist at CARE Garden Planner India.
The user is asking about gardening in India.
Current User Region: ${regionInfo.name}
Zone: ${regionInfo.zone}
First Expected Frost / Cold Snap: ${regionInfo.firstColdDate}
Lowest Winter Temperature: ${regionInfo.lowestTemp}
Current Season: October Rabi Sowing Season.

Provide a friendly, highly practical, and concise response (around 3 to 5 clear bullet points or 2 short paragraphs).
Focus on:
1. Exact sowing and care instructions for this week in October.
2. Soil mix, winter sunlight requirements, and watering schedule.
3. Frost and cold wave protection tailored to the region.
Avoid robotic fluff. Use common Indian garden terms when relevant (e.g. Palak, Methi, Vermicompost, Neem oil spray).`;

  let responseText = "";

  // Attempt API call through models cascade if API key is provided
  if (GEMINI_API_KEY) {
    for (const model of GEMINI_MODELS) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
        const payload = {
          contents: [
            {
              role: "user",
              parts: [{ text: `${systemContext}\n\nUser Question: ${messageText}` }]
            }
          ],
          generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 600
          }
        };

        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          const data = await response.json();
          if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
            responseText = data.candidates[0].content.parts[0].text;
            break; // successfully generated
          }
        }
      } catch (err) {
        console.warn(`Model ${model} request error:`, err);
      }
    }
  }

  // Fallback to local expert engine if API hits network or quota limits
  if (!responseText) {
    responseText = getLocalGardeningAdvice(messageText, regionInfo);
  }

  // Format response with clean HTML
  loadingBubble.innerHTML = formatMarkdown(responseText);
  isAiGenerating = false;
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

/**
 * Append chat bubble into conversation window
 */
function appendChatBubble(text, sender) {
  const messagesContainer = document.getElementById("chatMessages");
  const bubble = document.createElement("div");
  bubble.className = `chat-bubble ${sender}`;
  bubble.textContent = text;
  messagesContainer.appendChild(bubble);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  return bubble;
}

/**
 * Simple markdown formatter for clean display
 */
function formatMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/^### (.*$)/gim, "<h4 style='margin:8px 0 4px; color:var(--color-forest);'>$1</h4>")
    .replace(/^## (.*$)/gim, "<h3 style='margin:10px 0 6px; color:var(--color-forest);'>$1</h3>")
    .replace(/^\s*[-*]\s+(.*$)/gim, "<li style='margin-left:16px; margin-bottom:4px;'>$1</li>")
    .replace(/\n\n/g, "<br><br>")
    .replace(/\n/g, "<br>");
}

/**
 * Built-in Expert Fallback Engine
 */
function getLocalGardeningAdvice(query, region) {
  const q = query.toLowerCase();
  if (q.includes("spinach") || q.includes("palak")) {
    return `**Spinach (Palak) Guide for ${region.name}:**\n` +
      `• **This Week:** Sow seeds directly 1 cm deep in rich potting mix (40% soil, 40% vermicompost, 20% cocopeat).\n` +
      `• **Frost Tolerance:** Palak thrives in cold temperatures (${region.lowestTemp}). Light frost actually sweetens leaves!\n` +
      `• **Harvest:** Ready for your first cut in 30 days. Cut outer leaves and let the center regrow.`;
  }
  if (q.includes("frost") || q.includes("protect") || q.includes("winter")) {
    return `**Frost & Cold Wave Defense in ${region.name}:**\n` +
      `• **Timeline:** First cold spell expected around ${region.firstColdDate}.\n` +
      `• **Morning Watering:** Water pots at 9 AM so soil warms up in the sun. Damp soil holds more heat than bone-dry soil.\n` +
      `• **Mulching:** Add 2 inches of dried leaves or cocopeat over container soil to insulate roots.\n` +
      `• **Covering:** Use lightweight cotton cloth or green agro-netting on freezing nights (under 4°C).`;
  }
  return `**Weekly Garden Plan for ${region.name}:**\n` +
    `• **Current Window:** ${region.currentStatus}.\n` +
    `• **Direct Sow Now:** ${region.sowNow.slice(0, 4).join(", ")}.\n` +
    `• **Sunlight:** Shift balcony pots to receive at least 5-6 hours of unfiltered southern winter sun.\n` +
    `• **Care Tip:** Spray diluted neem oil (5ml/L) once every 14 days to prevent winter aphid infestations.`;
}
