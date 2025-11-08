
---

## 🧩 1️⃣ Create your `.env` file

Create a file named **`.env`** inside the root folder (same level as `backend/` and `frontend/`):

```bash
# Environment
NODE_ENV=development
PORT=5000

# MongoDB
MONGO_URI=mongodb+srv://avsxxxxxxxxingh02as02:arnavsingxxxxxh2004@cluster0.l4t5p71.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

# JWT
JWT_SECRET=abc1xxxx23

# PayPal
PAYPAL_CLIENT_ID=AWlaxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxRnqfLN

# Cloudinary
CLOUDINARY_CLOUD_NAME=dlaxxxxxxxx
CLOUDINARY_API_KEY=99868834xxxxx
CLOUDINARY_API_SECRET=plhBYDNTjxxxxxxxxxxxxxxx

# Google Vision
GOOGLE_VISION_KEY_PATH=./backend/config/google-vision-key.json

# Gemini / Google Generative AI
GEMINI_API_KEY=
```

> ⚠️ **Important:** never commit this file to GitHub — it contains private keys.

---

## ⚙️ 2️⃣ Install dependencies

At the project root (where your `package.json` is):

```bash
npm install
```

That installs both your backend and shared dependencies.

If your React client is in a `frontend/` folder, also run:

```bash
cd frontend
npm install
cd ..
```

---

## 🚀 3️⃣ Start the development environment

Your `package.json` defines these scripts:

| Command          | What it does                              |
| ---------------- | ----------------------------------------- |
| `npm run server` | Starts backend only with Nodemon          |
| `npm run client` | Starts React frontend only                |
| `npm run dev`    | Runs both backend + frontend concurrently |

### → To start everything together:

```bash
npm run dev
```

Your backend will start on [http://localhost:5000](http://localhost:5000)
and your React frontend (default Create React App) on [http://localhost:3000](http://localhost:3000).

---

## 🧠 4️⃣ Backend folder structure (typical)

```
backend/
 ├── config/
 │    └── google-vision-key.json
 ├── controllers/
 ├── models/
 ├── routes/
 ├── services/
 ├── utils/
 ├── server.js
 └── .env   ← already created
```

---

## 🧩 5️⃣ Run database seeding (optional)

If you have a `backend/seeder.js`, you can populate sample data:

```bash
npm run data:import
```

To clear it:

```bash
npm run data:destroy
```

---

## 🧠 6️⃣ Environment flow check

When you start:

* `.env` variables are loaded through `dotenv` in `server.js`
* `mongoose.connect(process.env.MONGO_URI)` connects MongoDB
* `PORT` controls your Express port
* `Cloudinary` keys handle uploads
* `Gemini` key authorizes your AI API
* `Google Vision` key path points to your local JSON credentials file

---

## ✅ 7️⃣ Quick test

Open your terminal after `npm run dev` — you should see:

```
✅ Redis connected
MongoDB Connected: cluster0...
Server running in development mode on port 5000
```

Then navigate to `http://localhost:3000`.

---

## 🧠 8️⃣ Typical issues & fixes

| Issue                     | Fix                                                                     |
| ------------------------- | ----------------------------------------------------------------------- |
| `.env` not loading        | Ensure `require('dotenv').config()` at top of `server.js`               |
| MongoDB connection error  | Verify `MONGO_URI` and network access                                   |
| Cloudinary upload fails   | Double-check your API key & secret                                      |
| Gemini API error          | Ensure you enabled Generative Language API in your Google Cloud project |
| `npm run dev` not working | Install `concurrently` (`npm install concurrently`)                     |

---

## ✅ Summary

After setting `.env` correctly, your workflow is:

```bash
# 1. Install everything
npm install
cd frontend && npm install && cd ..

# 2. Create .env in project root (as above)

# 3. Run both servers
npm run dev
```

---

Would you like me to also include a short **`server.js` template** that loads `.env`, connects MongoDB, and starts Express correctly (to verify your environment variables load properly)?
