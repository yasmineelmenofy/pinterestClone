# Pinterest Clone API

A secure, production-quality REST API built with Node.js, Express, TypeScript, and MongoDB. Features full authentication, image uploads, and user management.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js v5
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT with HTTP-only cookies
- **File Upload:** Multer
- **Password Hashing:** bcrypt

## Features

- Secure authentication (register, login, logout) using JWT and HTTP-only cookies
- Image upload with file type validation (images only)
- Homepage endpoint returning all images with uploader details
- Get, update, and delete your own images
- Authorization checks — users can only modify their own content
- Centralized error handling with custom ApiError class
- User profile management

## Getting Started

### Prerequisites

- Node.js v20+
- MongoDB (local or Atlas)

### Installation

```bash
# Clone the repository
git clone https://github.com/yasmineelmenofy/Pinterest-clone.git
cd Pinterest-clone

# Install dependencies
npm install
```

### Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Then update it with your values:

```env
MONGO_URI=mongodb://localhost:27017/pinterest_clone
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d
PORT=5000
```

### Running the Project

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start
```

## API Endpoints

### Auth Routes — `/api/auth`

| Method | Endpoint    | Description                   | Protected |
| ------ | ----------- | ----------------------------- | --------- |
| POST   | `/register` | Register a new user           | ❌        |
| POST   | `/login`    | Login with email and password | ❌        |
| POST   | `/logout`   | Logout and clear cookie       | ✅        |
| GET    | `/me`       | Get current user profile      | ✅        |
| PATCH  | `/me`       | Update current user profile   | ✅        |

### Image Routes — `/api/images`

| Method | Endpoint     | Description                    | Protected |
| ------ | ------------ | ------------------------------ | --------- |
| GET    | `/`          | Get all images (homepage)      | ❌        |
| GET    | `/me` | Get current user's images      | ✅        |
| GET    | `/:id`       | Get single image by id         | ✅        |
| POST   | `/`          | Upload a new image             | ✅        |
| PATCH  | `/:id`       | Update image title/description | ✅        |
| DELETE | `/:id`       | Delete an image                | ✅        |

## Project Structure

```
src/
├── config/
│   ├── db.ts          # MongoDB connection
│   └── multer.ts      # Multer file upload config
├── controllers/
│   ├── auth.controller.ts
│   └── image.controller.ts
├── middlewares/
│   ├── protect.ts        # JWT authentication middleware
│   └── error.middleware.ts
├── models/
│   ├── User.model.ts
│   └── Image.model.ts
├── routes/
│   ├── auth.routes.ts
│   └── image.routes.ts
├── types/
│   └── express.d.ts   # Extended Express Request type
├── utils/
│   ├── ApiError.ts
│   └── generateToken.ts
├── app.ts
└── server.ts
```

## Authentication

This API uses JWT tokens stored in HTTP-only cookies for security. After login or registration, the token is automatically sent and stored as a cookie. Protected routes require a valid token cookie to be present.
