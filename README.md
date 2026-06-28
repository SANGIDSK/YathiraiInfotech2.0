# Yathirai InfoTech — MERN Stack

Full-stack web application preserving the original design, powered by:
**MongoDB · Express · React · Node.js**

---

## 📁 Project Structure

```
yathirai-mern/
├── client/
│   ├── public/          bg.png, bgf.png, logo.png, s.png
│   └── src/
│       ├── App.js       Router setup
│       ├── App.css      All styles
│       └── components/
│           ├── Home.js              /
│           ├── About.js             /about
│           ├── Courses.js           /courses
│           ├── Clients.js           /clients
│           ├── Contact.js           /contact
│           ├── AdminLogin.js        /admin
│           ├── AdminDashboard.js    /admin/dashboard  (protected)
│           ├── Navbar.js
│           ├── Bubbles.js
│           ├── EnquiryModal.js
│           ├── PageLayout.js
│           └── ProtectedRoute.js
├── server/
│   ├── index.js
│   ├── middleware/auth.js
│   ├── models/  Enquiry.js  Course.js  Admin.js
│   └── routes/  enquiry.js  courses.js  auth.js
├── .env.example
└── package.json
```

---

## 🚀 Setup

### 1. Install dependencies
```bash
npm install
cd client && npm install && cd ..
```

### 2. Configure environment
```bash
cp .env.example .env
# Set MONGO_URI and JWT_SECRET in .env
# Set Gmail SMTP credentials if you want enquiry emails delivered:
# EMAIL_HOST=smtp.gmail.com
# EMAIL_PORT=587
# EMAIL_SECURE=false
# EMAIL_USER=yathirai.in@gmail.com
# EMAIL_PASS=<your-gmail-app-password>
# EMAIL_FROM=yathirai.in@gmail.com
# ENQUIRY_TO=yathirai.in@gmail.com
```

> Note: Gmail typically requires an app password, not your normal Gmail login password.

### 3. Create first admin (run once after server starts)
```bash
curl -X POST http://localhost:5000/api/auth/setup \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"yourpassword"}'
```

### 4. Start development
```bash
npm run dev
# React → http://localhost:3000
# API   → http://localhost:5000
```

---

## 🌐 Pages

| Route              | Page                      |
|--------------------|---------------------------|
| /                  | Home                      |
| /about             | About                     |
| /courses           | Courses (live from DB)    |
| /clients           | Testimonials + stats      |
| /contact           | Contact form              |
| /admin             | Admin login               |
| /admin/dashboard   | Admin panel (JWT-protected)|

---

## 🔌 API Endpoints

| Method | Endpoint             | Auth | Description           |
|--------|----------------------|------|-----------------------|
| POST   | /api/enquiry         | No   | Submit enquiry        |
| GET    | /api/enquiry         | Yes  | List enquiries        |
| GET    | /api/courses         | No   | Active courses        |
| GET    | /api/courses/all     | Yes  | All courses           |
| POST   | /api/courses         | Yes  | Create course         |
| PUT    | /api/courses/:id     | Yes  | Update course         |
| DELETE | /api/courses/:id     | Yes  | Delete course         |
| POST   | /api/auth/login      | No   | Admin login (JWT)     |
| POST   | /api/auth/setup      | No   | Create first admin    |

---

## 🏗 Production Build

```bash
cd client && npm run build
```

Add to `server/index.js` for production serving:
```js
const path = require('path');
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
);
```
