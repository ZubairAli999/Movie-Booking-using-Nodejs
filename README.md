🎬 Movie Booking System (Node.js + MongoDB)

A backend API for a Movie Booking platform built using Node.js, Express, and MongoDB (Mongoose).
It supports users, movies, shows, and booking management with relational schema design.

🚀 Features
👤 User management with unique email authentication
🎬 Movie catalog with metadata (title, genres, cast, rating, etc.)
🕒 Show scheduling with movie + datetime uniqueness constraint
🎟️ Booking system with seat selection and payment tracking
🔗 Relational schema design using MongoDB references
🧾 Timestamp tracking for all collections
🧱 Tech Stack
Node.js
Express.js
MongoDB
Mongoose
dotenv
📁 Project Structure
Movie-Booking-using-Nodejs/
│
├── src/
│   ├── index.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Movie.js
│   │   ├── Show.js
│   │   └── Booking.js
│   │
│   └── routes/   (future expansion)
│
├── .env
├── .gitignore
├── package.json
└── README.md
🧑‍💻 Database Models
👤 User
name: String
email: String (unique, lowercase)
password: String
role: String (user/admin)
timestamps: true
🎬 Movie
title: String
overview: String
poster: String (URL)
backdrop: String (URL)
release_date: Date
genres: [String]
casts: [String]
runtime: Number
vote_average: Number
timestamps: true
🕒 Show
movie: ObjectId (ref: Movie)
showDateTime: Date
availableSeats: Number
price: Number
timestamps: true

📌 Constraint:

Unique index on (movie, showDateTime)
🎟️ Booking
user: ObjectId (ref: User)
show: ObjectId (ref: Show)
bookedSeats: [String/Number]
amount: Number
paymentStatus: String (pending/completed/failed)
paymentInfo: Object
timestamps: true
⚙️ Setup Instructions
1. Clone the repository
git clone https://github.com/your-username/movie-booking-nodejs.git
cd movie-booking-nodejs
2. Install dependencies
npm install
3. Create .env file
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
4. Run the project
npm start
📌 Future Improvements
Authentication with JWT
Seat locking system
Payment gateway integration (Stripe/Razorpay)
Admin dashboard
Email notifications
🧠 Learning Goals

This project helps you understand:

MongoDB schema relationships
Mongoose population (ref)
Real-world booking system design
Indexing & constraints in NoSQL
Backend architecture using Node.js
📄 License

This project is open-source and available for learning purposes.