🎬 Movie Booking System API

Node.js | Express | MongoDB | Mongoose

A scalable backend API for a Movie Ticket Booking System built using Node.js and MongoDB.
This project demonstrates real-world backend architecture including relational data modeling, indexing, and booking workflows.

📌 Overview

The Movie Booking System provides APIs to manage users, movies, shows, and ticket bookings.
It follows a modular architecture with Mongoose-based schema design and relational references to simulate real-world booking platforms.

🚀 Key Features
👤 User Management
Secure user model with unique email enforcement
Role-based structure (user, admin)
Scalable authentication-ready schema design
🎬 Movie Management
Store detailed movie metadata
Supports genres, cast, ratings, runtime, and media assets
Optimized for catalog browsing systems
🕒 Show Scheduling
Schedule movies with specific date and time
Enforced uniqueness constraint on (movie, showDateTime)
Seat availability tracking per show
🎟️ Booking System
Seat selection and reservation handling
Payment tracking with status lifecycle
Association between users and shows via references
🔗 Data Modeling
Fully relational design using MongoDB references (ObjectId)
Normalized schema structure for scalability
Timestamp tracking for all entities
🧱 Tech Stack
Runtime: Node.js
Framework: Express.js
Database: MongoDB
ODM: Mongoose
Config: dotenv

⚙️ Getting Started
1. Clone Repository
git clone https://github.com/your-username/movie-booking-nodejs.git
cd movie-booking-nodejs
2. Install Dependencies
npm install
3. Environment Configuration

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
4. Run the Application
npm start
🧠 Architecture Highlights
Modular schema-based design
Normalized MongoDB relationships using references
Indexing for performance optimization
Extensible structure for authentication and payments
Clean separation of models and routes
📈 Future Enhancements
JWT-based authentication & authorization
Seat locking / concurrency control
Payment gateway integration (Stripe / Razorpay)
Admin dashboard APIs
Email notifications for bookings
Caching layer (Redis)
🎯 Learning Outcomes

This project demonstrates:

Real-world backend system design
MongoDB schema modeling & relationships
Indexing strategies in NoSQL databases
API-ready scalable architecture
Production-level Node.js project structure
📄 License

This project is licensed for educational and learning purposes.