# StudioSpace 📽️

**StudioSpace** is a high-performance peer-to-peer marketplace designed for creators, filmmakers, photographers, podcasters, and musicians. Studio owners and hosts can list their creative spaces—ranging from photography cyc walls and cinema sound stages to podcast lounges and music recording suites—while creators can seamlessly discover, filter, inspect dynamic availability, and reserve studio slots[cite: 1].

---

## 🔗 Live Site & Repositories

- **Live Server URL:** [Live Server](https://b14-a8-catharry.vercel.app/login)
- **Server Repository:** [https://github.com/khalidhasanbadhon502/b14-a8-cat_harry_server](https://github.com/khalidhasanbadhon502/b14-a8-cat_harry_server)
- **Client Repository:** [https://github.com/khalidhasanbadhon502/b14-a8-cat_harry](https://github.com/khalidhasanbadhon502/b14-a8-cat_harry)

---

## ✨ Key Features

- **Dynamic Studio Discovery & Filtering:** Discover studio slots, filter by creative categories (Photo Studios, Sound Stages, Podcast Rooms, Music Suites, Art Workshops), and search by location[cite: 1, 2].
- **Complete Studio Management (CRUD):** Hosts can create new studio listings, update details, view owned listings, and delete spaces with custom confirmation dialogs.
- **Interactive Booking System & Overlap Prevention:** Book studio slots instantly with pending/confirmed status tracking and server-side double-booking collision checks[cite: 4, 5].
- **Robust Authentication & JWT Security:** Complete authentication via Email/Password and Google OAuth with HTTPOnly cookie-based session management[cite: 3, 5].
- **Modern UI & Theme System:** Full light/dark mode support, responsive layouts across devices, dynamic skeleton loaders, and modern toast feedback via Sonner[cite: 1, 5].

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Base UI / Shadcn UI[cite: 5]
- **State & Notifications:** Sonner (Toast), Lucide React[cite: 1]
- **Backend:** Node.js, Express.js, TypeScript[cite: 5]
- **Database & Auth:** MongoDB Atlas, Mongoose, BetterAuth / JWT[cite: 5]
- **Deployment:** Vercel (Client) / Render (Server)[cite: 1]

---

## 🚀 Local Setup Instructions

Follow these steps to set up and run the project locally:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/b14-a8-cat_harry.git](https://github.com/your-username/b14-a8-cat_harry.git)
   cd b14-a8-cat_harry
