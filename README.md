# BeyondChats Articles

A full-stack content platform that automatically fetches, rewrites, and publishes technical articles using web scraping and an LLM pipeline, with a modern React frontend.

---

## 📌 Project Overview

BeyondChats Articles is a **content aggregation and rewriting system** that:

* Fetches the latest article from the backend
* Finds reference articles via Google search
* Scrapes reference content
* Rewrites the article using an LLM
* Publishes the updated article
* Displays articles in a modern card-based UI

The project is divided into **Frontend** and **Backend**, communicating via REST APIs.

---

## 🏗️ Architecture

```
Frontend (React + Vite + Tailwind)
        │
        │ HTTP (Axios)
        ▼
Backend (Node.js + Express)
        │
        ▼
MongoDB
        │
        ▼
External Services
  - Google Search (scraping)
  - LLM API (Groq / LLaMA)
```

---

## 🧰 Tech Stack

### Frontend

* React 18
* Vite
* React Router DOM
* Tailwind CSS
* Axios
* GSAP (animations)

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Axios
* Cheerio
* dotenv

### LLM

* Groq API
* LLaMA 3.1

---

## 📂 Project Structure

### Frontend

```
frontend/
├── src/
│   ├── pages/
│   │   ├── ArticleList.jsx
│   │   └── ArticleDetail.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
│   └── index.css
```

### Backend

```
backend/
├── models/
│   └── Article.js
├── routes/
│   └── articleRoutes.js
├── controllers/
│   └── articleController.js
├── utils/
│   ├── googleSearch.js
│   ├── scrapeArticle.js
│   └── llm.js
├── rewriteAndPublish.js
└── server.js
```

---

## 🗄️ Database Schema

### Article Model

```js
{
  title: String,
  content: String,
  sourceUrl: String,
  type: "original" | "updated",
  references: [String],
  createdAt: Date,
  updatedAt: Date
}
```

MongoDB automatically generates `_id` for each article, which is used for routing.

---

## 🔌 API Endpoints

### Get All Articles

```
GET /api/articles
```

### Get Latest Article

```
GET /api/articles/latest
```

### Get Article by ID

```
GET /api/articles/:id
```

### Create Article

```
POST /api/articles
```

---

## 🤖 Automated Rewrite Pipeline

The rewrite pipeline is handled by `rewriteAndPublish.js`.

### Steps

1. Fetch latest article
2. Perform Google search using article title
3. Scrape reference articles
4. Rewrite content using LLM
5. Publish updated article to backend

### Run the script

```
node rewriteAndPublish.js
```

---

## 🎨 Frontend Features

### Article List

* Card-based layout
* Hover animations
* Content preview
* Responsive grid

### Article Detail

* Full article rendering
* Loading & error states
* Safe HTML rendering

---

## 🛡️ Error Handling

### Backend

* ObjectId validation
* Graceful 404 handling
* Server error logging

### Frontend

* Loading indicators
* Error fallback UI
* No black-screen crashes

---

## ⚙️ Environment Variables

Create a `.env` file in backend:

```
MONGODB_URI=your_mongodb_connection_string
LLM_API_KEY=your_groq_api_key
```

---

## 🚀 Getting Started

### Backend

```
cd backend
npm install
npm run dev
```

### Frontend

```
cd frontend
npm install
npm run dev
```

Open in browser:

```
http://localhost:5173
```

---

## 🔮 Future Improvements

* Slug-based URLs
* Article tags & categories
* Server-side caching
* SEO optimization
* Authentication & roles

---

## 🧪 API Examples

### Get All Articles

**Request**

```http
GET /api/articles
```

**Response**

```json
[
  {
    "_id": "694e4190e16481991858d612",
    "title": "Sample Article",
    "content": "<p>Article HTML content...</p>",
    "type": "original",
    "createdAt": "2025-07-09T10:22:11.123Z"
  }
]
```

---

### Get Article by ID

**Request**

```http
GET /api/articles/:id
```

**Response**

```json
{
  "_id": "694e4190e16481991858d612",
  "title": "Sample Article",
  "content": "<p>Full article content...</p>",
  "references": ["https://example.com"],
  "type": "updated"
}
```

---

### Create Article

**Request**

```http
POST /api/articles
Content-Type: application/json
```

```json
{
  "title": "New Article",
  "content": "<p>HTML content</p>",
  "type": "original",
  "references": []
}
```

---

## 🚀 Deployment

### Frontend (Vercel)

```bash
npm run build
```

Upload the `dist/` folder or connect your Git repository.

### Backend (Render)

* Set environment variables
* Use Node 18+
* Start command:

```bash
npm start
```

Ensure MongoDB is accessible from the deployment platform.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch

   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes
4. Push to your fork
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## ⭐ Acknowledgements

* Groq API
* LLaMA 3.1
* Tailwind CSS
* MongoDB
* Open-source community
