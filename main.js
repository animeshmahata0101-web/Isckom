/**
 * ISKCON JHARGRAM - Main Devotional Engine
 * Real-time Aarti Timings, Japa Counter, Pushpanjali Physics, and Event Data Hub
 */

// Default Events Dataset for ISKCON Jhargram
const DEFAULT_EVENTS = [
  {
    id: "evt-1",
    title: "Jhargram Sri Jagannath Rathayatra Mahotsav",
    category: "Festival",
    date: "2026-07-06",
    time: "02:00 PM onwards",
    location: "Main Temple Ground to Raghunathpur, Jhargram",
    description: "The grand chariot festival of Lord Jagannatha, Baladeva, and Subhadra Maharani through the historic streets of Jhargram. Over 10,000 devotees pulling the sacred ropes, 24-hour Harinama Sankirtana, and massive free Khichuri Prasadam distribution.",
    image: "https://images.unsplash.com/photo-1626014303757-64673297a7a5?auto=format&fit=crop&w=800&q=80",
    badge: "Grand Annual Festival",
    featured: true
  },
  {
    id: "evt-2",
    title: "Sri Krishna Janmashtami Maha Mahotsav",
    category: "Festival",
    date: "2026-09-04",
    time: "04:30 AM to Midnight",
    location: "Sri Sri Radha Madhava Temple Hall",
    description: "Divine appearance day of the Supreme Personality of Godhead, Lord Sri Krishna. Midnight 108 Sacred Kalash Maha-Abhisheka, 108 Bhoga offerings, Vaishnava drama by ISKCON Youth Forum, and ecstatic kirtan until 1:00 AM.",
    image: "https://images.unsplash.com/photo-1609137144822-4217730e7df7?auto=format&fit=crop&w=800&q=80",
    badge: "Midnight Celebration",
    featured: true
  },
  {
    id: "evt-3",
    title: "Sri Radhashtami Flower Abhisheka",
    category: "Festival",
    date: "2026-09-18",
    time: "09:00 AM – 02:00 PM",
    location: "Temple Sanctorum",
    description: "Celebrating the auspicious appearance of Srimati Radharani, the queen of Vrindavan. Thousands of fragrant lotus, rose, and marigold petals showered in Pushpa Abhisheka, followed by Chhapan Bhog feast.",
    image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80",
    badge: "Pushpa Abhisheka",
    featured: true
  },
  {
    id: "evt-4",
    title: "Kartik Deepotsav & Damodarashtaka",
    category: "Special Month",
    date: "2026-10-26",
    time: "Every Evening 06:45 PM",
    location: "Courtyard & Tulasi Mancha",
    description: "The most sacred month of the year. Devotees offer pure ghee lamps (Deep Daan) to Lord Damodara while melodiously chanting the ancient Sri Damodarashtaka prayers.",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
    badge: "Month of Kartik",
    featured: true
  },
  {
    id: "evt-5",
    title: "Sunday Love Feast & Harinama Kirtan",
    category: "Weekly",
    date: "Every Sunday",
    time: "04:30 PM – 07:30 PM",
    location: "Sri Chaitanya Auditorium & Prasad Hall",
    description: "A spiritual sanctuary for everyone. Enjoy soulful mridanga and kartal kirtan, Vedic wisdom discourse on Bhagavad Gita, question-answer session, and unlimited delicious pure vegetarian sanctified Prasadam.",
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=80",
    badge: "All Are Welcome",
    featured: false
  },
  {
    id: "evt-6",
    title: "Mokshada Ekadashi & Gita Jayanti",
    category: "Ekadashi",
    date: "2026-12-20",
    time: "All Day Fasting",
    location: "ISKCON Jhargram Mandir",
    description: "The day Lord Krishna spoke the Bhagavad Gita to Arjuna on the battlefield of Kurukshetra. Recitation of all 18 chapters of Bhagavad Gita As It Is, special yajna, and phalahari prasadam.",
    image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80",
    badge: "Strict Fasting",
    featured: false
  }
];

// Default Announcement
const DEFAULT_ANNOUNCEMENT = {
  active: true,
  message: "🌸 Hare Krishna! Join us this Sunday at 4:30 PM for the Sunday Love Feast & Bhagavad Gita Discourse. Free sanctified Maha-Prasadam for all devotees.",
  linkText: "Plan Your Visit →",
  linkUrl: "visit.html"
};

// Storage helpers
function getStoredEvents() {
  const data = localStorage.getItem('iskcon_jhargram_events');
  if (!data) {
    localStorage.setItem('iskcon_jhargram_events', JSON.stringify(DEFAULT_EVENTS));
    return DEFAULT_EVENTS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return DEFAULT_EVENTS;
  }
}

function getStoredAnnouncement() {
  const data = localStorage.getItem('iskcon_jhargram_announcement');
  if (!data) {
    localStorage.setItem('iskcon_jhargram_announcement', JSON.stringify(DEFAULT_ANNOUNCEMENT));
    return DEFAULT_ANNOUNCEMENT;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return DEFAULT_ANNOUNCEMENT;
  }
}

// Real-Time Daily Aarti Schedule & Live Status Tracker
const AARTI_SCHEDULE = [
  { name: "Mangala Aarti", time: "04:30", period: "AM", desc: "First auspicious aarti of the dawn" },
  { name: "Tulasi Aarti", time: "05:00", period: "AM", desc: "Worship of sacred Vrinda Devi" },
  { name: "Shringar & Guru Puja", time: "07:15", period: "AM", desc: "Deity Darshan in full divine dress" },
  { name: "Srimad Bhagavatam Discourse", time: "08:00", period: "AM", desc: "Vedic philosophy & realization" },
  { name: "Raj Bhoga Aarti", time: "12:30", period: "PM", desc: "Midday opulent feast offering" },
  { name: "Dhoop (Vaikalika) Aarti", time: "16:30", period: "PM", desc: "Afternoon incense ceremony (Altar reopens)" },
  { name: "Sandhya (Gaura) Aarti", time: "19:00", period: "PM", desc: "Evening kirtan with camphor lamp" },
  { name: "Sayana Aarti", time: "20:30", period: "PM", desc: "Final night prayers before rest" }
];

function updateAartiStatus() {
  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTimeVal = currentHours * 60 + currentMinutes;

  let currentAarti = null;
  let nextAarti = null;
  let nextAartiDiff = Infinity;

  // Find next aarti
  for (let aarti of AARTI_SCHEDULE) {
    const [hStr, mStr] = aarti.time.split(":");
    const aartiTimeVal = parseInt(hStr, 10) * 60 + parseInt(mStr, 10);
    
    // Check if within 30 min window of starting
    if (currentTimeVal >= aartiTimeVal && currentTimeVal <= aartiTimeVal + 30) {
      currentAarti = aarti;
    }

    let diff = aartiTimeVal - currentTimeVal;
    if (diff <= 0) {
      diff += 24 * 60; // Next day
    }
    if (diff < nextAartiDiff) {
      nextAartiDiff = diff;
      nextAarti = aarti;
    }
  }

  // Update DOM elements if present
  const statusBadge = document.getElementById("live-aarti-status");
  const nextAartiText = document.getElementById("next-aarti-countdown");
  const nextAartiName = document.getElementById("next-aarti-name");

  if (statusBadge) {
    if (currentAarti) {
      statusBadge.innerHTML = `<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
        <span class="w-2 h-2 mr-2 rounded-full bg-emerald-500 live-pulse"></span>
        NOW HAPPENING: ${currentAarti.name}
      </span>`;
    } else {
      const isTempleOpen = (currentTimeVal >= 270 && currentTimeVal <= 780) || (currentTimeVal >= 990 && currentTimeVal <= 1260);
      statusBadge.innerHTML = isTempleOpen ? 
        `<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
          <span class="w-2 h-2 mr-2 rounded-full bg-amber-500"></span>
          TEMPLE OPEN FOR DARSHAN
        </span>` :
        `<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-stone-200 text-stone-700 border border-stone-300">
          <span class="w-2 h-2 mr-2 rounded-full bg-stone-500"></span>
          ALTAR RESTING (Opens at 04:30 PM / 04:30 AM)
        </span>`;
    }
  }

  if (nextAartiText && nextAarti) {
    const hours = Math.floor(nextAartiDiff / 60);
    const mins = nextAartiDiff % 60;
    const timeString = hours > 0 ? `${hours}h ${mins}m` : `${mins} mins`;
    nextAartiText.textContent = `In ${timeString}`;
    if (nextAartiName) nextAartiName.textContent = `${nextAarti.name} (${nextAarti.time} ${nextAarti.period})`;
  }
}

// 108 Harinama Japa Bead Meditation Counter
let japaBeadCount = 0;
let japaRoundsCount = parseInt(localStorage.getItem('iskcon_japa_rounds') || '0', 10);

function initJapaCounter() {
  const beadCountEl = document.getElementById("japa-bead-number");
  const roundCountEl = document.getElementById("japa-round-number");
  const chantBtn = document.getElementById("japa-chant-btn");
  const resetBtn = document.getElementById("japa-reset-btn");
  const progressCircle = document.getElementById("japa-progress-circle");

  if (!chantBtn) return;

  function updateDisplay() {
    if (beadCountEl) beadCountEl.textContent = japaBeadCount;
    if (roundCountEl) roundCountEl.textContent = japaRoundsCount;

    if (progressCircle) {
      const circumference = 2 * Math.PI * 54; // radius 54
      const offset = circumference - (japaBeadCount / 108) * circumference;
      progressCircle.style.strokeDashoffset = offset;
    }
  }

  chantBtn.addEventListener("click", () => {
    japaBeadCount++;
    playBellTone(600 + (japaBeadCount % 12) * 20, 0.15);

    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(15);
    }

    if (japaBeadCount >= 108) {
      japaRoundsCount++;
      japaBeadCount = 0;
      localStorage.setItem('iskcon_japa_rounds', japaRoundsCount.toString());
      if (navigator.vibrate) {
        navigator.vibrate([40, 40, 80]);
      }
      playRoundCompletedChime();
      triggerPushpanjali();
    }
    updateDisplay();
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("Reset current beads to 0?")) {
        japaBeadCount = 0;
        updateDisplay();
      }
    });
  }

  updateDisplay();
}

// Web Audio API Synthesizer for Temple Bells & Chimes
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playBellTone(freq = 528, duration = 0.5) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    // Bell envelope
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Audio context not allowed until interaction
  }
}

function playRoundCompletedChime() {
  try {
    const chords = [528, 660, 792, 1056];
    chords.forEach((note, index) => {
      setTimeout(() => playBellTone(note, 1.2), index * 120);
    });
  } catch (e) {}
}

// Pushpanjali (Fragrant Flower Shower Offering)
function triggerPushpanjali() {
  playBellTone(784, 0.8);
  const petalEmojis = ['🌸', '🌺', '🌼', '🏵️', '✨'];
  const petalCount = 35;

  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement("div");
    petal.className = "petal";
    petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
    petal.style.left = Math.random() * 95 + "vw";
    petal.style.top = "-5vh";
    petal.style.fontSize = Math.random() * 20 + 16 + "px";
    petal.style.animationDuration = Math.random() * 3 + 2.5 + "s";
    petal.style.animationDelay = Math.random() * 0.8 + "s";
    document.body.appendChild(petal);

    setTimeout(() => {
      if (petal.parentNode) petal.parentNode.removeChild(petal);
    }, 6000);
  }
}

// Mobile Navigation Drawer
function initMobileNav() {
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const navDrawer = document.getElementById("mobile-nav-drawer");
  const closeBtn = document.getElementById("mobile-nav-close");

  if (toggleBtn && navDrawer) {
    toggleBtn.addEventListener("click", () => {
      navDrawer.classList.toggle("hidden");
    });
  }
  if (closeBtn && navDrawer) {
    closeBtn.addEventListener("click", () => {
      navDrawer.classList.add("hidden");
    });
  }
}

// Render dynamic announcement banner if present
function renderAnnouncementBanner() {
  const container = document.getElementById("top-announcement-banner");
  if (!container) return;
  const ann = getStoredAnnouncement();
  if (!ann || !ann.active) {
    container.classList.add("hidden");
    return;
  }
  container.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 text-xs sm:text-sm flex items-center justify-between font-medium">
      <div class="flex items-center space-x-2 truncate">
        <span class="text-amber-300">🕊️</span>
        <span class="truncate">${ann.message}</span>
      </div>
      <a href="${ann.linkUrl}" class="ml-4 text-amber-200 hover:text-white underline whitespace-nowrap text-xs transition-colors">
        ${ann.linkText}
      </a>
    </div>
  `;
}

// Render Featured Events on Homepage
function renderHomeEvents() {
  const container = document.getElementById("home-events-grid");
  if (!container) return;
  const events = getStoredEvents();
  const featured = events.filter(e => e.featured).slice(0, 3);

  container.innerHTML = featured.map(evt => `
    <div class="devotional-card flex flex-col overflow-hidden group">
      <div class="relative h-52 w-full overflow-hidden bg-stone-100">
        <img src="${evt.image}" alt="${evt.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        <span class="absolute top-3 left-3 px-3 py-1 bg-amber-900/90 text-amber-200 text-xs font-semibold rounded-full backdrop-blur-sm shadow">
          ${evt.category}
        </span>
      </div>
      <div class="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div class="flex items-center text-xs text-amber-800 font-semibold mb-2">
            <svg class="w-4 h-4 mr-1.5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            ${evt.date} • ${evt.time}
          </div>
          <h3 class="text-xl font-bold text-stone-900 font-serif mb-2 leading-tight group-hover:text-amber-800 transition-colors">
            ${evt.title}
          </h3>
          <p class="text-stone-600 text-sm line-clamp-3 mb-4 leading-relaxed">
            ${evt.description}
          </p>
        </div>
        <div class="pt-4 border-t border-amber-100 flex items-center justify-between text-xs text-stone-500">
          <span class="flex items-center truncate mr-2">
            <svg class="w-3.5 h-3.5 mr-1 text-stone-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
            ${evt.location}
          </span>
          <a href="events.html" class="text-amber-700 hover:text-amber-900 font-bold whitespace-nowrap">Details →</a>
        </div>
      </div>
    </div>
  `).join("");
}

// Render All Events on Events Page with Filter
function renderEventsPage() {
  const container = document.getElementById("all-events-container");
  if (!container) return;
  const events = getStoredEvents();

  function display(list) {
    if (list.length === 0) {
      container.innerHTML = `<div class="col-span-full py-16 text-center text-stone-500">No events found in this category.</div>`;
      return;
    }
    container.innerHTML = list.map(evt => `
      <article class="devotional-card overflow-hidden flex flex-col md:flex-row group border border-amber-200/60">
        <div class="md:w-5/12 h-64 md:h-auto relative overflow-hidden bg-stone-200">
          <img src="${evt.image}" alt="${evt.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden"></div>
          <span class="absolute top-4 left-4 px-3 py-1 bg-amber-900/90 text-amber-100 text-xs font-semibold rounded-full shadow">
            ${evt.category}
          </span>
        </div>
        <div class="p-6 md:p-8 md:w-7/12 flex flex-col justify-between">
          <div>
            <div class="flex flex-wrap items-center gap-3 text-xs text-amber-800 font-medium mb-3">
              <span class="flex items-center bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                <svg class="w-3.5 h-3.5 mr-1.5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                ${evt.date}
              </span>
              <span class="flex items-center text-stone-500">
                <svg class="w-3.5 h-3.5 mr-1 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                ${evt.time}
              </span>
            </div>
            <h2 class="text-2xl font-bold text-stone-900 font-serif mb-3 leading-snug group-hover:text-amber-800 transition-colors">
              ${evt.title}
            </h2>
            <p class="text-stone-600 text-sm leading-relaxed mb-4">
              ${evt.description}
            </p>
          </div>
          <div class="pt-4 border-t border-amber-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <span class="flex items-center text-stone-600">
              <svg class="w-4 h-4 mr-1.5 text-amber-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
              ${evt.location}
            </span>
            <a href="visit.html" class="kesariya-gradient-btn px-4 py-2 rounded-lg text-xs font-semibold text-center whitespace-nowrap shadow-sm">
              Attend Festival
            </a>
          </div>
        </div>
      </article>
    `).join("");
  }

  display(events);

  // Category filter tabs
  const filterBtns = document.querySelectorAll(".event-filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active", "bg-amber-800", "text-white"));
      btn.classList.add("active", "bg-amber-800", "text-white");
      const category = btn.getAttribute("data-category");
      if (category === "all") {
        display(events);
      } else {
        display(events.filter(e => e.category.toLowerCase() === category.toLowerCase()));
      }
    });
  });
}

// Initialise common components on page load
document.addEventListener("DOMContentLoaded", () => {
  renderAnnouncementBanner();
  updateAartiStatus();
  setInterval(updateAartiStatus, 60000); // Check every minute
  initMobileNav();
  initJapaCounter();
  renderHomeEvents();
  renderEventsPage();

  // Attach pushpanjali triggers
  const pushpanjaliBtns = document.querySelectorAll(".pushpanjali-trigger");
  pushpanjaliBtns.forEach(btn => {
    btn.addEventListener("click", triggerPushpanjali);
  });
});
