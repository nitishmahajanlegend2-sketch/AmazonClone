# 🛒 Full-Stack MERN Amazon Clone

A high-performance e-commerce platform built using the MERN stack. This project focuses on secure user authentication, role-based access control (RBAC), and a dynamic administrative management system.

---

## 🚀 Tech Stack

- **Frontend:** React.js (Hooks, Context API, React Router)
- **Backend:** Node.js & Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT) with secure cookie/header storage
- **Payments:** Razorpay Integration (Test Mode)
- **Styling:** CSS3 / Styled Components
- **Deployment:** Vercel (Frontend) & Render (Backend)

---

## ✨ Key Features

### 🔐 Secure Authentication
- Implemented **JWT-based authentication** to manage user sessions.
- **Role-Based Logic:** Strict separation between User and Admin accounts. Only authenticated admins can access the product management suite.

### 🛠️ Admin Command Center (CRUD)
- A dedicated dashboard for store owners to manage inventory.
- **Create:** Add new products with titles, descriptions, pricing, and images.
- **Read:** View all current inventory synced directly from MongoDB.
- **Update/Delete:** Modify existing product details or remove items instantly from the live storefront.

### 💳 Payment Integration
- Integrated **Razorpay API** to handle the complete transaction lifecycle, from order creation to payment verification.

### 📱 Dynamic UI/UX
- Responsive design for mobile and desktop.
- **Dynamic Rendering:** Product cards are automatically generated and updated based on the backend database.

---

## 🗺️ Project Roadmap

- [x] Initial Project Setup & Architecture
- [x] MongoDB Schema Design (User & Product Models)
- [x] JWT Authentication & Protected Routes
- [x] Admin Panel with Full CRUD Functionality
- [x] Razorpay Payment Gateway Integration
- [ ] **Phase 2:** Development of Dedicated Product Detail Pages
- [ ] **Phase 3:** Advanced Search & Category Filtering
- [ ] **Phase 4:** User Order History & Profile Management

---

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/yourusername/amazon-clone.git](https://github.com/yourusername/amazon-clone.git)
   # For Backend
cd server
npm install

# For Frontend
cd client
npm install

# Start Server
Create a .env file in the root directory of the server and add:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
npm start

# Start Client
npm run dev
📄 License
This project is open-source and available under the MIT License.
