/**
 * ISKCON JHARGRAM - Admin Panel Controller
 * Event Management (Add, Edit, Delete), Announcement Control, Seva Viewer
 */

const ADMIN_PASS_KEY = 'iskcon_admin_pass';
const DEFAULT_PASS = 'harekrishna';

function getAdminPassword() {
  return localStorage.getItem(ADMIN_PASS_KEY) || DEFAULT_PASS;
}

function checkAuth() {
  return sessionStorage.getItem('iskcon_admin_authenticated') === 'true';
}

function loginAdmin(pass) {
  if (pass === getAdminPassword()) {
    sessionStorage.setItem('iskcon_admin_authenticated', 'true');
    return true;
  }
  return false;
}

function logoutAdmin() {
  sessionStorage.removeItem('iskcon_admin_authenticated');
  window.location.reload();
}

document.addEventListener("DOMContentLoaded", () => {
  const loginModal = document.getElementById("admin-login-modal");
  const adminContent = document.getElementById("admin-main-dashboard");
  const loginForm = document.getElementById("admin-login-form");
  const loginError = document.getElementById("admin-login-error");
  const logoutBtn = document.getElementById("admin-logout-btn");

  // Authentication gate
  if (!checkAuth()) {
    if (loginModal) loginModal.classList.remove("hidden");
    if (adminContent) adminContent.classList.add("hidden");
  } else {
    if (loginModal) loginModal.classList.add("hidden");
    if (adminContent) adminContent.classList.remove("hidden");
    initAdminDashboard();
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const pass = document.getElementById("admin-password-input").value;
      if (loginAdmin(pass)) {
        if (loginError) loginError.classList.add("hidden");
        if (loginModal) loginModal.classList.add("hidden");
        if (adminContent) adminContent.classList.remove("hidden");
        initAdminDashboard();
      } else {
        if (loginError) {
          loginError.classList.remove("hidden");
          loginError.textContent = "Invalid passcode. Hint: harekrishna";
        }
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", logoutAdmin);
  }
});

function initAdminDashboard() {
  renderAdminEventsList();
  initEventFormModal();
  initAnnouncementForm();
  renderAdminStats();
  initPasswordReset();
}

function renderAdminStats() {
  const events = getStoredEvents();
  const ann = getStoredAnnouncement();

  const totalEventsEl = document.getElementById("stat-total-events");
  const featuredEventsEl = document.getElementById("stat-featured-events");
  const announcementStatusEl = document.getElementById("stat-announcement-status");

  if (totalEventsEl) totalEventsEl.textContent = events.length;
  if (featuredEventsEl) featuredEventsEl.textContent = events.filter(e => e.featured).length;
  if (announcementStatusEl) {
    announcementStatusEl.textContent = ann.active ? "Active" : "Disabled";
    announcementStatusEl.className = ann.active ? "text-emerald-700 font-bold" : "text-stone-500 font-bold";
  }
}

function renderAdminEventsList() {
  const container = document.getElementById("admin-events-table-body");
  if (!container) return;
  const events = getStoredEvents();

  if (events.length === 0) {
    container.innerHTML = `<tr><td colspan="6" class="px-6 py-8 text-center text-stone-500 text-sm">No events found. Click "Add New Event" to create one.</td></tr>`;
    return;
  }

  container.innerHTML = events.map((evt, idx) => `
    <tr class="border-b border-stone-200 hover:bg-amber-50/40 transition-colors">
      <td class="px-6 py-4">
        <div class="flex items-center space-x-3">
          <img src="${evt.image}" alt="" class="w-12 h-12 rounded-lg object-cover border border-amber-200 shrink-0" />
          <div>
            <div class="font-bold text-stone-900 font-serif text-sm">${evt.title}</div>
            <div class="text-xs text-stone-500 line-clamp-1">${evt.location}</div>
          </div>
        </div>
      </td>
      <td class="px-6 py-4 text-xs font-semibold">
        <span class="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
          ${evt.category}
        </span>
      </td>
      <td class="px-6 py-4 text-xs text-stone-600">
        <div>${evt.date}</div>
        <div class="text-stone-400">${evt.time}</div>
      </td>
      <td class="px-6 py-4 text-center">
        <button onclick="toggleFeaturedEvent('${evt.id}')" class="text-xs px-2.5 py-1 rounded-md font-semibold transition-colors ${evt.featured ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-stone-100 text-stone-600 border border-stone-300'}">
          ${evt.featured ? '★ Featured' : '☆ Standard'}
        </button>
      </td>
      <td class="px-6 py-4 text-right space-x-2">
        <button onclick="editEventPrompt('${evt.id}')" class="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs font-semibold shadow-sm transition-all">
          Edit
        </button>
        <button onclick="deleteEventConfirm('${evt.id}')" class="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded text-xs font-semibold shadow-sm transition-all">
          Delete
        </button>
      </td>
    </tr>
  `).join("");
}

// Global functions exposed for inline onclick handlers
window.toggleFeaturedEvent = function(id) {
  let events = getStoredEvents();
  events = events.map(e => {
    if (e.id === id) {
      return { ...e, featured: !e.featured };
    }
    return e;
  });
  localStorage.setItem('iskcon_jhargram_events', JSON.stringify(events));
  renderAdminEventsList();
  renderAdminStats();
};

window.deleteEventConfirm = function(id) {
  if (confirm("Are you sure you want to delete this festival/event? This action will immediately update the live website.")) {
    let events = getStoredEvents();
    events = events.filter(e => e.id !== id);
    localStorage.setItem('iskcon_jhargram_events', JSON.stringify(events));
    renderAdminEventsList();
    renderAdminStats();
  }
};

window.editEventPrompt = function(id) {
  const events = getStoredEvents();
  const evt = events.find(e => e.id === id);
  if (!evt) return;

  const modal = document.getElementById("event-form-modal");
  const modalTitle = document.getElementById("modal-form-title");
  
  document.getElementById("form-event-id").value = evt.id;
  document.getElementById("form-event-title").value = evt.title;
  document.getElementById("form-event-category").value = evt.category;
  document.getElementById("form-event-date").value = evt.date;
  document.getElementById("form-event-time").value = evt.time;
  document.getElementById("form-event-location").value = evt.location;
  document.getElementById("form-event-image").value = evt.image;
  document.getElementById("form-event-desc").value = evt.description;
  document.getElementById("form-event-featured").checked = !!evt.featured;

  if (modalTitle) modalTitle.textContent = "Edit Temple Event";
  if (modal) modal.classList.remove("hidden");
};

function initEventFormModal() {
  const modal = document.getElementById("event-form-modal");
  const openBtn = document.getElementById("btn-add-new-event");
  const closeBtn = document.getElementById("btn-close-event-modal");
  const form = document.getElementById("event-editor-form");
  const modalTitle = document.getElementById("modal-form-title");

  if (openBtn) {
    openBtn.addEventListener("click", () => {
      if (form) form.reset();
      document.getElementById("form-event-id").value = "";
      if (modalTitle) modalTitle.textContent = "Add New Temple Event";
      if (modal) modal.classList.remove("hidden");
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = document.getElementById("form-event-id").value;
      const title = document.getElementById("form-event-title").value.trim();
      const category = document.getElementById("form-event-category").value;
      const date = document.getElementById("form-event-date").value.trim();
      const time = document.getElementById("form-event-time").value.trim();
      const location = document.getElementById("form-event-location").value.trim();
      let image = document.getElementById("form-event-image").value.trim();
      const description = document.getElementById("form-event-desc").value.trim();
      const featured = document.getElementById("form-event-featured").checked;

      if (!image) {
        image = "https://images.unsplash.com/photo-1609137144822-4217730e7df7?auto=format&fit=crop&w=800&q=80";
      }

      let events = getStoredEvents();

      if (id) {
        // Update existing
        events = events.map(item => {
          if (item.id === id) {
            return { ...item, title, category, date, time, location, image, description, featured };
          }
          return item;
        });
      } else {
        // Create new
        const newEvent = {
          id: "evt-" + Date.now(),
          title,
          category,
          date,
          time,
          location,
          image,
          description,
          featured
        };
        events.unshift(newEvent);
      }

      localStorage.setItem('iskcon_jhargram_events', JSON.stringify(events));
      if (modal) modal.classList.add("hidden");
      renderAdminEventsList();
      renderAdminStats();
      alert("Festival / Event successfully published to the website!");
    });
  }
}

function initAnnouncementForm() {
  const form = document.getElementById("announcement-admin-form");
  if (!form) return;

  const current = getStoredAnnouncement();
  const toggle = document.getElementById("ann-active-toggle");
  const msgInput = document.getElementById("ann-message-input");
  const linkTextInput = document.getElementById("ann-linktext-input");
  const linkUrlInput = document.getElementById("ann-linkurl-input");

  if (toggle) toggle.checked = current.active;
  if (msgInput) msgInput.value = current.message;
  if (linkTextInput) linkTextInput.value = current.linkText;
  if (linkUrlInput) linkUrlInput.value = current.linkUrl;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const updated = {
      active: toggle ? toggle.checked : true,
      message: msgInput ? msgInput.value.trim() : "",
      linkText: linkTextInput ? linkTextInput.value.trim() : "Details →",
      linkUrl: linkUrlInput ? linkUrlInput.value.trim() : "events.html"
    };
    localStorage.setItem('iskcon_jhargram_announcement', JSON.stringify(updated));
    renderAdminStats();
    alert("Live Announcement Marquee updated successfully!");
  });
}

function initPasswordReset() {
  const resetBtn = document.getElementById("btn-reset-demo-data");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("Reset events and announcement back to default Jhargram temple demo data?")) {
        localStorage.removeItem('iskcon_jhargram_events');
        localStorage.removeItem('iskcon_jhargram_announcement');
        renderAdminEventsList();
        renderAdminStats();
        initAnnouncementForm();
        alert("Demo events restored!");
      }
    });
  }
}
