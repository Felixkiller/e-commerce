# e-commerce
🌐 Modern e-commerce platform for internet data packages. Built with React, Ant Design, and JSON Server. Features shopping cart, checkout system, and order tracking with beautiful gradient UI.
# 🌐 DataNet E-Commerce - Internet Data Package Store

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?logo=vite)
![Ant Design](https://img.shields.io/badge/Ant%20Design-5.12.0-0170FE?logo=ant-design)
![License](https://img.shields.io/badge/License-MIT-green)

Sebuah aplikasi e-commerce modern untuk pembelian paket data internet dengan antarmuka yang menarik dan user experience yang optimal. Dibangun menggunakan React, Ant Design, dan JSON Server sebagai mock backend.


## ✨ Features

### 🔐 Authentication
- ✅ Login system dengan validasi
- ✅ Session management
- ✅ Protected routes
- ✅ Logout functionality

### 🛒 E-Commerce Functionality
- ✅ **Product Catalog** - Browse paket data dengan tampilan card menarik
- ✅ **Shopping Cart** - Kelola items sebelum checkout
- ✅ **Checkout System** - Proses pembelian yang smooth
- ✅ **Order History** - Lihat riwayat transaksi
- ✅ **Real-time Updates** - Badge notifikasi dan feedback langsung

### 🎨 UI/UX
- ✅ Modern gradient design (Purple-Pink theme)
- ✅ Responsive layout (Mobile & Desktop)
- ✅ Smooth animations & transitions
- ✅ Loading states
- ✅ Empty states
- ✅ Success/Error notifications
- ✅ Interactive components

### 💻 Technical Features
- ✅ **CRUD Operations** (Create, Read, Update, Delete)
- ✅ RESTful API integration
- ✅ Axios untuk HTTP requests
- ✅ React Hooks (useState, useEffect)
- ✅ Component-based architecture
- ✅ Mock backend dengan JSON Server
- ✅ Clean code structure

---

## 🚀 Tech Stack

| Technology | Description |
|------------|-------------|
| **React 18** | JavaScript library untuk building UI |
| **Vite** | Next generation frontend tooling |
| **Ant Design** | Enterprise-class UI design system |
| **Axios** | Promise-based HTTP client |
| **JSON Server** | Full fake REST API |
| **Tailwind CSS** | Utility-first CSS framework |

---

## 📋 Prerequisites

Sebelum memulai, pastikan sudah menginstall:

- **Node.js** (v14 atau lebih tinggi) - [Download](https://nodejs.org/)
- **npm** atau **yarn**
- **Git**

---

## ⚡ Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/username/datanet-ecommerce.git
cd datanet-ecommerce
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install JSON Server (Global)

```bash
npm install -g json-server
```

### 4. Run Application

Buka **2 terminal**:

**Terminal 1 - Backend (JSON Server):**
```bash
json-server --watch db.json --port 3001
```

**Terminal 2 - Frontend (React App):**
```bash
npm run dev
```

### 5. Access Application

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:3001](http://localhost:3001)

### 6. Login Credentials

```
Email: demo@user.com
Password: demo123
```

---

## 📁 Project Structure

```
datanet-ecommerce/
├── 📄 db.json                  # Mock database
├── 📄 package.json             # Dependencies & scripts
├── 📄 vite.config.js           # Vite configuration
├── 📄 tailwind.config.js       # Tailwind configuration
├── 📄 index.html               # HTML entry point
├── 📂 src/
│   ├── 📄 main.jsx            # React entry point
│   ├── 📄 App.jsx             # Main application component
│   ├── 📄 App.css             # Custom styles
│   └── 📄 index.css           # Global styles
└── 📄 README.md               # Documentation
```

---

## 🔌 API Endpoints

JSON Server secara otomatis membuat endpoint RESTful:

### Users
```http
GET    /users
GET    /users/:id
GET    /users?email={email}&password={password}
```

### Packages
```http
GET    /packages
GET    /packages/:id
```

### Cart
```http
GET    /cart
POST   /cart
DELETE /cart/:id
```

### Transactions
```http
GET    /transactions
GET    /transactions?userId={userId}
POST   /transactions
```

---

## 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (Vite) |
| `npm run build` | Build untuk production |
| `npm run preview` | Preview production build |
| `npm run server` | Start JSON Server |

---

## 💡 How to Use

### 1. Login
- Masukkan email dan password
- Klik "Sign In"
- Akan redirect ke halaman home

### 2. Browse Packages
- Lihat katalog paket data
- Perhatikan badge "Popular" pada paket terbaik
- Hover pada card untuk melihat animasi

### 3. Add to Cart
- Klik tombol "Add to Cart" pada paket yang diinginkan
- Badge notifikasi akan update
- Success message muncul

### 4. View Cart
- Klik icon shopping cart di header
- Review items di cart
- Hapus item jika diperlukan
- Lihat total harga

### 5. Checkout
- Klik "Checkout Now"
- Transaksi akan diproses
- Redirect ke halaman Order History

### 6. View Orders
- Klik "My Orders" di navigation
- Lihat semua transaksi completed
- Detail: tanggal, harga, status

---

## 🎨 Features Walkthrough

### Login Page
- Gradient background yang eye-catching
- Form validation
- Loading state saat proses login
- Error handling

### Package Catalog
- Grid layout responsive
- Color-coded packages
- Feature list untuk setiap paket
- Popular badge indicator
- Smooth hover animations

### Shopping Cart
- List semua items
- Remove functionality
- Real-time total calculation
- Empty state ketika cart kosong
- Checkout button

### Order History
- Chronological order list
- Detailed transaction info
- Status indicator
- Timestamp
- Empty state untuk new users

---

## 🛠️ Development

### Database Structure (db.json)

```json
{
  "users": [...],
  "packages": [...],
  "cart": [...],
  "transactions": [...]
}
```

### Component Hierarchy

```
App
├── Login
├── Header
├── HomeView
│   └── PackageCard
├── CartView
└── TransactionsView
```

### API Service Layer

```javascript
// services/api.js structure
- authAPI
  - login()
- packageAPI
  - getAll()
- cartAPI
  - getAll(), add(), remove(), clear()
- transactionAPI
  - getAll(), create(), getByUserId()
```

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Login dengan credentials yang benar
- [ ] Login dengan credentials salah (error handling)
- [ ] Browse semua packages
- [ ] Add multiple items to cart
- [ ] Update badge count
- [ ] Remove item dari cart
- [ ] Checkout dengan cart kosong (warning)
- [ ] Checkout dengan items
- [ ] View transaction history
- [ ] Logout functionality
- [ ] Responsive design (mobile view)

### Test API Endpoints

Buka browser dan test:
```
http://localhost:3001/users
http://localhost:3001/packages
http://localhost:3001/cart
http://localhost:3001/transactions
```

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process di port 3001
npx kill-port 3001

# Atau gunakan port lain
json-server --watch db.json --port 3002
```

Jangan lupa update `API_URL` di `App.jsx`:
```javascript
const API_URL = 'http://localhost:3002';
```

### JSON Server Not Found

```bash
# Install ulang global
npm install -g json-server

# Atau gunakan npx
npx json-server --watch db.json --port 3001
```

### Dependencies Error

```bash
# Clear dan reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Tailwind CSS Error

Jika muncul error `Unknown rule @tailwind`:

**Option 1:**
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Option 2:**
Remove `@tailwind` directives dan gunakan custom CSS

---

## 📸 Screenshots

### Login Page
```
┌─────────────────────────┐
│   🌐 DataNet Provider   │
│                         │
│  ┌─────────────────┐   │
│  │ Email           │   │
│  └─────────────────┘   │
│  ┌─────────────────┐   │
│  │ Password        │   │
│  └─────────────────┘   │
│  ┌─────────────────┐   │
│  │   Sign In       │   │
│  └─────────────────┘   │
└─────────────────────────┘
```

### Package Catalog
```
┌─────────────┬─────────────┬─────────────┬─────────────┐
│    Lite     │    Power    │    Ultra    │  Unlimited  │
│  Up to 10   │  Up to 25   │  Up to 50   │  Up to 100  │
│    Mbps     │    Mbps     │    Mbps     │    Mbps     │
│  Rp 25,000  │  Rp 55,000  │  Rp 95,000  │  Rp 150,000 │
└─────────────┴─────────────┴─────────────┴─────────────┘
```

---

## 🔮 Future Enhancements

### Planned Features
- [ ] Search & filter packages
- [ ] User registration
- [ ] Password reset functionality
- [ ] Payment gateway integration
- [ ] Order tracking system
- [ ] Wishlist functionality
- [ ] Package comparison
- [ ] Review & rating system
- [ ] Referral program
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Multi-language support

### Technical Improvements
- [ ] Unit testing (Jest, React Testing Library)
- [ ] E2E testing (Cypress)
- [ ] State management (Redux/Zustand)
- [ ] TypeScript migration
- [ ] PWA capabilities
- [ ] SEO optimization
- [ ] Performance optimization
- [ ] Docker containerization
- [ ] CI/CD pipeline

---

## 📝 Development Timeline

| Phase | Task | Duration |
|-------|------|----------|
| 1 | Project setup & configuration | 30 min |
| 2 | Database design | 15 min |
| 3 | API service implementation | 30 min |
| 4 | Authentication flow | 20 min |
| 5 | Package catalog UI | 40 min |
| 6 | Cart functionality | 30 min |
| 7 | Checkout & transactions | 25 min |
| 8 | Styling & animations | 30 min |
| 9 | Testing & debugging | 20 min |
| **Total** | | **3h 30m** |

**Start Time:** December 15, 2025 - 14:30 WIB  
**End Time:** December 16, 2025 - 18:00 WIB

---

## 🤝 Contributing

Contributions are welcome! Ikuti langkah berikut:

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Contribution Guidelines

- Follow existing code style
- Write meaningful commit messages
- Add comments untuk logic yang complex
- Test semua changes sebelum PR
  
---

## 👨‍💻 Author

**Frontend Developer**
- GitHub: [@yFelixkiller](https://github.com/felixkiller)
- Email: felixjuatsa@gmail.com.com
- LinkedIn: [Felix](www.linkedin.com/in/felix-christian-juarsa-1527a4190)

---

## 🙏 Acknowledgments

- [React Documentation](https://react.dev/)
- [Ant Design](https://ant.design/)
- [JSON Server](https://github.com/typicode/json-server)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Laracasts React Tutorials](https://laracasts.com/)
- [DNet Provider](https://dnetprovider.id/) - Design inspiration

---

## 📞 Support

Jika ada pertanyaan atau issues:

1. Check [Issues](https://github.com/Felixkiller/datanet-ecommerce/issues) page
2. Create new issue dengan detail lengkap
3. Email: felixjuatsa@gmail.com

---

## ⭐ Show Your Support

Jika project ini membantu, berikan ⭐️!

---

<div align="center">

**Made with ❤️ using React & Ant Design**

[Demo](https://your-demo-link.com) • [Report Bug](https://github.com/Felixkillert/datanet-ecommerce/issues) • [Request Feature](https://github.com/Felixkiller/datanet-ecommerce/issues)

</div>
