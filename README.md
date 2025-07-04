# MyFood - Zomato-like Food Delivery App

A modern food delivery application built with React, Node.js, and MongoDB, featuring a beautiful Zomato-inspired UI.

## 🚀 Features

### Frontend (React + Vite)
- **Modern UI**: Zomato-inspired design with Tailwind CSS
- **Onboarding Flow**: Location selection and user registration for first-time users
- **Menu Management**: Browse, search, and filter menu items
- **Cart System**: Add/remove items with quantity controls
- **Responsive Design**: Works perfectly on desktop and mobile
- **Authentication**: Login/Register with form validation

### Backend (Node.js + Express + MongoDB)
- **RESTful API**: Complete CRUD operations for menu items
- **Authentication**: JWT-based user authentication
- **Order Management**: Create and track orders
- **MongoDB Integration**: Scalable database with Mongoose ODM
- **Image Upload**: Cloudinary integration for menu images

## 🛠️ Tech Stack

### Frontend
- React 18 with Vite
- React Router DOM
- Tailwind CSS
- Axios for API calls
- React Toastify for notifications
- Lucide React for icons

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Multer + Cloudinary for image uploads
- bcryptjs for password hashing

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Install dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Environment Configuration:**
   Create a `.env` file in the server directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/myfood
   JWT_SECRET=your-super-secret-jwt-key
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   ```

3. **Start the server:**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Install dependencies:**
   ```bash
   cd client
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

### Running Both Together

From the root directory:
```bash
npm run dev
```

## 🗂️ Project Structure

```
MyFood/
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── index.js
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── api/
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## 🎯 API Endpoints

### Menu Items
- `GET /api/menu` - Get all menu items
- `GET /api/menu/:id` - Get menu item by ID
- `POST /api/menu` - Create new menu item (Admin)
- `PUT /api/menu/:id` - Update menu item (Admin)
- `DELETE /api/menu/:id` - Delete menu item (Admin)

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (Protected)

### Orders
- `POST /api/orders` - Create new order (Protected)
- `GET /api/orders/my-orders` - Get user orders (Protected)
- `GET /api/orders/:id` - Get order by ID (Protected)
- `PUT /api/orders/:id/status` - Update order status (Admin)

## 🎨 UI Features

### Home Page
- Hero section with call-to-action
- Food categories with images
- Trending restaurants
- Special offers section

### Menu Page
- Search functionality
- Cuisine type filters
- Add to cart with quantity controls
- Responsive card layout

### Onboarding
- Location selection
- User registration flow
- Modern form design

### Authentication
- Login/Register forms
- Password visibility toggle
- Form validation
- Social login options

## 🚀 Deployment

### Frontend (Netlify)
1. Build the project: `npm run build`
2. Deploy to Netlify with the `dist` folder

### Backend (Render/Railway)
1. Set environment variables
2. Deploy to Render or Railway
3. Update frontend API base URL

### Database (MongoDB Atlas)
1. Create MongoDB Atlas cluster
2. Update connection string in environment variables

## 🔧 Development

### Adding New Features
1. Create new components in `client/src/components/`
2. Add new pages in `client/src/pages/`
3. Create API endpoints in `server/routes/`
4. Add controllers in `server/controllers/`

### Styling
- Use Tailwind CSS classes
- Follow the existing color scheme (red-500 primary)
- Maintain responsive design

## 📱 Mobile Responsiveness

The app is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@myfood.com or create an issue in the repository. 