# 🎬 Movie Booking System API

**Node.js | Express | MongoDB | Mongoose | JWT | Payment Processing**

A production-ready backend API for a comprehensive Movie Ticket Booking System built using Node.js and MongoDB. This project demonstrates real-world backend architecture including modular service design, role-based access control, payment processing, and booking workflows with expiration handling.

## 📌 Overview

The Movie Booking System is a scalable, enterprise-grade API that manages the complete booking lifecycle from movie catalog browsing to payment processing. It implements industry-standard patterns like JWT authentication, error handling, logging, and request/response middleware.

## 🚀 Key Features

### 👤 User Management
- Secure user model with unique email enforcement
- Role-based access control (Customer, Admin, Staff)
- User status management (Approved, Pending, Rejected)
- User authentication and profile management
- Role-specific permissions and restrictions

### 🎬 Movie Management
- Comprehensive movie catalog with metadata (genres, cast, duration, release date)
- Movie CRUD operations with validation
- Search and filter capabilities
- Support for multiple genres per movie
- Movie availability tracking across theatres

### 🏛️ Theatre Management
- Multi-theatre support with location-based filtering
- City and pincode-based search
- Movie availability per theatre
- Seat configuration management
- Dynamic movie catalog per theatre

### 🕒 Show Scheduling
- Schedule movies with specific date/time
- Seat availability tracking per show
- Price management per show
- Show-specific seat configurations
- Theatre and movie relationship management

### 🎟️ Booking System
- Real-time seat selection and reservation
- Booking expiration (5-minute timeout for unpaid bookings)
- Multiple booking status tracking (Pending, Successful, Expired, Cancelled)
- Cost calculation based on seat count and show price
- User-specific booking retrieval with authorization checks

### 💳 Payment Processing
- Complete payment workflow integration
- Amount validation against booking total cost
- Automatic booking expiration handling
- Payment status tracking (Success, Failed, Pending)
- Seat configuration updates on successful payment
- Role-based payment history retrieval (User vs Admin views)

### 📧 Email Notifications
- User email notifications via external notification service
- Support for booking confirmations, payment updates, and system notifications
- Configurable notification service endpoint

### 🔐 Security & Logging
- Request/error logging middleware for debugging
- Environment-based configuration
- Error handling with appropriate HTTP status codes
- User authorization checks for sensitive operations

## 🧱 Tech Stack

| Component | Technology |
|-----------|-----------|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Database** | MongoDB |
| **ODM** | Mongoose |
| **Authentication** | JWT (jsonwebtoken) |
| **Password Hashing** | bcrypt |
| **HTTP Client** | axios |
| **Logging** | Winston |
| **Config** | dotenv |
| **Testing** | Jest |

## 📁 Project Structure

```
src/
├── config/              # Configuration files
│   └── logger.js       # Winston logger setup
├── controller/         # Route controllers
│   ├── booking-controller.js
│   ├── movie-controller.js
│   ├── show-controller.js
│   ├── theatre-controller.js
│   ├── user-controller.js
│   └── payment-controller.js
├── middleware/         # Express middleware
│   ├── auth.js        # JWT authentication
│   └── error-handler.js
├── model/             # MongoDB models
│   ├── Booking.js
│   ├── Movie.js
│   ├── Show.js
│   ├── Theatre.js
│   ├── User.js
│   └── Payment.js
├── route/             # API routes
│   ├── booking-router.js
│   ├── movie-router.js
│   ├── show-router.js
│   ├── theatre-router.js
│   ├── user-router.js
│   └── payment-router.js
├── service/           # Business logic
│   ├── booking-service.js
│   ├── movie-service.js
│   ├── show-service.js
│   ├── theatre-service.js
│   ├── user-service.js
│   ├── payment-service.js
│   └── email-service.js
├── utils/             # Utility functions
│   └── constants.js   # Status codes, role constants
└── index.js           # Application entry point

test/
├── service/           # Service unit tests
│   ├── booking-service.test.js
│   ├── movie-service.test.js
│   ├── show-service.test.js
│   ├── threater-service.test.js
│   ├── user-service.test.js
│   ├── payment-service.test.js
│   └── email-service.test.js
```

## ⚙️ Getting Started

### 1. Clone Repository
```bash
git clone https://github.com/your-username/Movie-Booking-using-Nodejs.git
cd Movie-Booking-using-Nodejs
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb://localhost:27017/movie-booking

# Authentication
AUTH_KEY=your_jwt_secret_key_here

# Email/Notification Service
NOTI_SERVICE=http://notification-service-url/api
```

### 4. Install Jest for Testing
```bash
npm install --save-dev jest
```

### 5. Run the Application
```bash
# Development with auto-reload
npm run dev

# Production
npm start
```

### 6. Run Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📊 API Endpoints

### User Management
- `POST /api/users` - Create user
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/email/:email` - Get user by email
- `PUT /api/users/:id/role-status` - Update user role/status (Admin only)

### Movie Management
- `POST /api/movies` - Create movie
- `GET /api/movies` - Get all movies (with optional filters)
- `GET /api/movies/:id` - Get movie by ID
- `PUT /api/movies/:id` - Update movie
- `DELETE /api/movies/:id` - Delete movie

### Theatre Management
- `POST /api/theatres` - Create theatre
- `GET /api/theatres` - Get theatres (with filters: city, pincode, name, movieId)
- `GET /api/theatres/:id` - Get theatre by ID
- `PUT /api/theatres/:id` - Update theatre
- `DELETE /api/theatres/:id` - Delete theatre
- `PUT /api/theatres/:id/movies` - Add/remove movies from theatre
- `GET /api/theatres/:id/movies` - Get movies in theatre

### Show Management
- `POST /api/shows` - Create show
- `GET /api/shows` - Get shows (with filters: theatreId, movieId)
- `PUT /api/shows/:id` - Update show
- `DELETE /api/shows/:id` - Delete show

### Booking Management
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get user's bookings
- `GET /api/bookings/:id` - Get specific booking
- `PUT /api/bookings/:id` - Update booking

### Payment Processing
- `POST /api/payments` - Create payment
- `GET /api/payments/:id` - Get payment details
- `GET /api/payments` - Get all payments (role-based)

## 🧪 Testing

This project includes comprehensive unit tests for all service functions using Jest:

```bash
# Run all tests
npm test

# Watch mode (auto-run on file changes)
npm run test:watch

# Coverage report
npm run test:coverage
```

**Test Coverage:**
- ✅ Booking Service (9 tests)
- ✅ Movie Service (15 tests)
- ✅ Show Service (18 tests)
- ✅ Theatre Service (34 tests)
- ✅ User Service (22 tests)
- ✅ Payment Service (16 tests)
- ✅ Email Service (18 tests)

**Total: 132+ Unit Tests**

## 🧠 Architecture Highlights

### Service Layer Architecture
- **Service-oriented design** - Business logic separated from controllers
- **Database abstraction** - Models handle data access
- **Error standardization** - Consistent error handling with status codes
- **Logging & monitoring** - Request and error logging via Winston

### Data Modeling
- **Relational design** - MongoDB references for normalized data
- **Schema validation** - Mongoose validators for data integrity
- **Timestamp tracking** - Automatic createdAt/updatedAt fields
- **Indexing** - Optimized queries on frequently accessed fields

### Security Features
- **JWT authentication** - Secure token-based authentication
- **Password hashing** - bcrypt for secure password storage
- **Role-based access control** - Admin vs Customer authorization
- **User authorization checks** - Prevent unauthorized booking access

### Booking Workflow
1. User creates booking for available show/seats
2. Booking created with 5-minute expiration window
3. User initiates payment
4. System validates amount matches booking total
5. On success: booking marked successful, seats updated in show
6. On failure: booking cancelled, payment recorded as failed
7. Expired bookings automatically marked as expired

## 📈 Future Enhancements

- [ ] Advanced seat locking mechanism (concurrency control)
- [ ] Real payment gateway integration (Stripe/Razorpay)
- [ ] Admin dashboard with analytics
- [ ] Movie ratings and reviews system
- [ ] Wishlist/favorites functionality
- [ ] Caching layer (Redis) for performance
- [ ] Bulk booking discount logic
- [ ] Cancellation policies and refund handling
- [ ] Real-time seat availability updates (WebSocket)
- [ ] Mobile app API optimization

## 🎯 Learning Outcomes

This project demonstrates:

- ✅ Real-world backend system design and architecture
- ✅ MongoDB schema modeling with relational references
- ✅ JWT authentication and authorization patterns
- ✅ Service-oriented architecture with separation of concerns
- ✅ Comprehensive error handling and logging
- ✅ Unit testing best practices with Jest and mocking
- ✅ Booking workflow with expiration and payment processing
- ✅ RESTful API design principles
- ✅ Production-level Node.js project structure
- ✅ Environment-based configuration management

## 📄 License

This project is licensed for educational and learning purposes.