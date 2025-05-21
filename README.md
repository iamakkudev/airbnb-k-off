
# Airbnb-K-Off 🏡

A full-stack Airbnb clone built using **Node.js**, **Express.js**, **MongoDB Atlas**, **EJS**, **Bootstrap**, and several modern web technologies. The app allows users to register, log in, create listings, upload images, search locations, and more — closely mimicking the core functionalities of Airbnb.

---

## 🚀 Features

- 🧭 Full-featured **MVC architecture**
- 🗺️ Integrated **Google Maps API** for location search
- 📷 **Cloudinary** for image uploads and storage
- 🔐 **Authentication & Authorization** using **Passport.js**
- 🧾 RESTful APIs with CRUD operations
- 📝 Dynamic server-rendered pages using **EJS templates**
- ⚠️ Robust error handling middleware
- 💾 Cloud database via **MongoDB Atlas**
- 🎨 Fully responsive UI using **Bootstrap**

---

## 🛠 Tech Stack

| Layer        | Technology                                |
|--------------|--------------------------------------------|
| **Frontend** | EJS, Bootstrap, Vanilla JavaScript         |
| **Backend**  | Node.js, Express.js                        |
| **Database** | MongoDB Atlas (with Mongoose ODM)          |
| **Auth**     | Passport.js (Local Strategy)               |
| **Media**    | Cloudinary (image uploads)                 |
| **Location** | Google Maps API / Mapbox (for geocoding)   |
| **Other**    | Dotenv, Connect-flash, Method-override     |

---

## 📸 Screenshots

> *(Add screenshots or demo GIFs here if available)*

---

## 🔧 Installation & Setup

1. **Clone the repository**  
   ```bash
   git clone https://github.com/iamakkudev/airbnb-k-off.git
   cd airbnb-k-off
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Set up environment variables**  
   Create a `.env` file in the root with the following:

   ```env
   DB_URL=your_mongodb_atlas_url
   SECRET=your_session_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_KEY=your_cloudinary_key
   CLOUDINARY_SECRET=your_cloudinary_secret
   MAPBOX_TOKEN=your_mapbox_or_google_maps_token
   ```

4. **Start the app**  
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Authentication

- User authentication handled via **Passport.js (Local Strategy)**
- Session management using `express-session`
- Passwords hashed and salted securely using **bcrypt**
- Authorization middleware protects routes like:
  - Posting listings
  - Editing/deleting listings
  - Writing reviews

---

## 🗂 Folder Structure

```
airbnb-k-off/
├── public/          # Static assets (CSS, JS)
├── routes/          # Express route handlers
├── controllers/     # Route logic
├── models/          # Mongoose schemas
├── views/           # EJS templates
├── middleware/      # Custom middleware
├── utils/           # Helpers (e.g., ExpressError)
├── app.js           # Entry point
├── package.json     
└── .env             
```

---

## 📌 Future Enhancements

- Add payment integration (e.g., Stripe)
- Improve location autocomplete with Mapbox Places API
- Add real-time messaging between users
- User dashboard for bookings and listings

---

## 🧑‍💻 Author

**Akkudev** – [GitHub: @iamakkudev](https://github.com/iamakkudev)

---

## 📄 License

MIT License – see the [LICENSE](LICENSE) file for details.
