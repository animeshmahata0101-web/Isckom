# ISKCON Jhargram — Official Website & Admin Event System
**Sri Sri Radha Madhava Mandir | Jhargram, West Bengal, India**

> Crafted with **UI/UX Pro Max** design intelligence: authentic sacred Vedic aesthetics, human-centered devotional warmth, and zero generic AI clichés.

---

## 🛕 Multi-Page Architecture

1. [index.html](file:///data/data/com.termux/files/home/isckon/index.html) — **Main Temple Home**
   - Live Aarti Timetable with real-time countdown to next Aarti (Mangala, Shringar, Raj Bhog, Sandhya, etc.).
   - Interactive 108 Harinama Japa Meditation Companion (Web Audio bell tones, haptic feedback, round counters).
   - Dynamic Upcoming Festivals grid pulled automatically from the Admin data store.
   - Srila Prabhupada & His 1965 Transatlantic Voyage tribute.
   - Sunday Love Feast spotlight & Food for Life prasadam relief.
   - Official social integration ([Facebook](https://www.facebook.com/share/18m7z58HY5/) and [Google Maps Location](https://share.google/XQ5Nl7fRtkdQHCqpt)).

2. [darshan.html](file:///data/data/com.termux/files/home/isckon/darshan.html) — **Daily Deity Darshan**
   - High-resolution sacred darshan of Sri Sri Radha Madhava, Sri Sri Gaura Nitai, Lord Jagannatha, and Lord Narasimhadeva.
   - Interactive **Pushpanjali Flower Shower** (Devotees can click to shower fragrant petals at the lotus feet of the Deities with chime audio).
   - Daily darshan hours and archana guidelines.

3. [events.html](file:///data/data/com.termux/files/home/isckon/events.html) — **Festivals & Rathayatra**
   - Interactive categories: Major Festivals, Sunday Love Feast, Kartik Deepotsav, Ekadashi Fasting.
   - Fully synced with [admin.html](file:///data/data/com.termux/files/home/isckon/admin.html) via localStorage.
   - Ekadashi Tithi fast-breaking (Parana) guide.

4. [prabhupada.html](file:///data/data/com.termux/files/home/isckon/prabhupada.html) — **Srila Prabhupada & ISKCON**
   - The historic 1965 transatlantic crossing on the cargo steamship *Jaladuta*.
   - The Seven Constitutional Purposes of ISKCON (1966 New York incorporation).
   - Literary legacy: Bhagavad-gītā As It Is and Śrīmad-Bhāgavatam.

5. [seva.html](file:///data/data/com.termux/files/home/isckon/seva.html) — **Devotional Seva & Annadanam**
   - Offer Food for Life meals, Gau Seva (Goshala care), and Deity garlands.
   - Instant **Printable Devotional Seva Receipt & Blessing Certificate Generator**.
   - Direct bank transfer and UPI details for ISKCON Jhargram.

6. [visit.html](file:///data/data/com.termux/files/home/isckon/visit.html) — **Plan Your Visit**
   - Direct verified Google Maps GPS link ([https://share.google/XQ5Nl7fRtkdQHCqpt](https://share.google/XQ5Nl7fRtkdQHCqpt)).
   - Transit directions from Jhargram Railway Station (JGM) and Bus Stand.
   - Temple etiquette (footwear, dress code, mahaprasadam).
   - Contact form with confirmation notice.

7. [admin.html](file:///data/data/com.termux/files/home/isckon/admin.html) — **Admin Event Portal**
   - Passkey protected (Default passcode: `harekrishna`).
   - Add new festivals (Title, Category, Date, Time, Location, Description, Image, Featured status).
   - Edit or delete existing events with 1 click.
   - Manage the live announcement marquee banner displayed across the website.
   - One-click restore button for default Jhargram demo events.

---

## 🎨 Design System & Aesthetics (Non-AI Look)

- **Palette**: Sacred Kesariya Saffron (`#B43403`, `#EA580C`), Temple Ceremonial Gold (`#D4AF37`), Sandalwood Cream (`#FCF9F2`), and Deep Rosewood (`#22120C`).
- **Typography**: Classical Divine Serifs (*Cinzel*, *Rozha One*) paired with clean *Plus Jakarta Sans*.
- **Touch & Accessibility**: 44px+ touch targets, WCAG AA 4.5:1 text contrast ratios, accessible SVGs.

---

## 🚀 How to Run Locally

```bash
cd /data/data/com.termux/files/home/isckon
python3 -m http.server 8080
```
Open your browser at `http://localhost:8080` (or `http://localhost:8080/admin.html` for the admin portal).
