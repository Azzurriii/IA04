# React Authentication with JWT (Access + Refresh Tokens)

A full-stack authentication system implementing secure JWT-based authentication with access and refresh tokens. Built with React, NestJS, Axios, React Query, and React Hook Form.

## 🚀 Features

- ✅ **JWT Authentication** - Secure access and refresh token implementation
- ✅ **Automatic Token Refresh** - Seamless token renewal using Axios interceptors
- ✅ **React Query Integration** - Efficient server state management
- ✅ **React Hook Form** - Form validation with Zod schema
- ✅ **Protected Routes** - Route guards for authenticated users
- ✅ **In-Memory Access Tokens** - Enhanced security with memory storage
- ✅ **Persistent Refresh Tokens** - localStorage for long-term sessions
- ✅ **TypeScript** - Full type safety across the stack
- ✅ **Clean Architecture** - Modular and maintainable code structure

## 📁 Project Structure

```
IA04/
├── backend/                # NestJS Backend
│   ├── src/
│   │   ├── auth/          # Authentication module
│   │   │   ├── dto/       # Data Transfer Objects
│   │   │   ├── guards/    # Auth guards
│   │   │   └── strategies/ # JWT strategies
│   │   ├── users/         # User management
│   │   └── main.ts        # Entry point
│   └── .env               # Environment variables
│
└── frontend/              # React Frontend
    ├── src/
    │   ├── components/    # Reusable components
    │   ├── context/       # React Context (Auth)
    │   ├── pages/         # Page components
    │   ├── services/      # API & Axios configuration
    │   ├── styles/        # CSS styles
    │   └── types/         # TypeScript types
    └── ...
```

## 🛠️ Tech Stack

### Backend
- **NestJS** - Progressive Node.js framework
- **JWT** - JSON Web Tokens for authentication
- **Passport** - Authentication middleware
- **bcryptjs** - Password hashing
- **TypeScript** - Type-safe backend code

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client with interceptors
- **React Query** - Server state management
- **React Hook Form** - Form handling with validation
- **React Router** - Client-side routing
- **Zod** - Schema validation
- **TypeScript** - Type-safe frontend code

## 📋 Prerequisites

- Node.js 18+ and npm
- Git

## 🚀 Getting Started

### 1. Clone the Repository

```bash
cd /home/thanh.vo/uni/IA04
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies (already installed)
npm install

# The .env file is already configured with:
# JWT_ACCESS_SECRET=your-super-secret-access-token-key-change-in-production
# JWT_REFRESH_SECRET=your-super-secret-refresh-token-key-change-in-production
# PORT=3000

# Start the backend server
npm run start:dev
```

Backend will run on `http://localhost:3000`

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend

# Install dependencies (already installed)
npm install

# Start the development server
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🔐 Demo Credentials

A demo user is pre-seeded in the backend:

```
Email: user@example.com
Password: password123
```

## 🎯 How It Works

### Authentication Flow

1. **Login**
   - User submits credentials via React Hook Form
   - Backend validates and returns access + refresh tokens
   - Access token stored in memory
   - Refresh token stored in localStorage

2. **API Requests**
   - Axios interceptor automatically attaches access token to requests
   - Backend validates token via JWT strategy

3. **Token Refresh**
   - When access token expires (15 minutes), API returns 401
   - Axios interceptor catches 401 and calls refresh endpoint
   - New tokens are issued and original request is retried
   - If refresh fails, user is redirected to login

4. **Logout**
   - Tokens are cleared from memory and localStorage
   - User is redirected to login page

### Key Implementation Details

#### Token Storage
- **Access Token**: Stored in memory (more secure, cleared on refresh)
- **Refresh Token**: Stored in localStorage (persists across sessions)

#### Axios Interceptors
Located in `frontend/src/services/axios.ts`:
- **Request Interceptor**: Adds access token to Authorization header
- **Response Interceptor**: Handles 401 errors and automatic token refresh

#### Protected Routes
- `ProtectedRoute` component checks authentication status
- Redirects to login if not authenticated
- Shows loading state during auth check

## 📡 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/login` | Login user | No |
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/refresh` | Refresh access token | No |
| POST | `/auth/logout` | Logout user | Yes |
| GET | `/profile` | Get user profile | Yes |

### Request/Response Examples

**Login Request:**
```json
POST /auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Login Response:**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "Demo User"
  },
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc..."
}
```

## 🎨 Pages

1. **Login Page** (`/login`)
   - Email/password form with validation
   - Redirects to dashboard on success
   - Shows demo credentials

2. **Register Page** (`/register`)
   - User registration with name, email, password
   - Automatic login after registration

3. **Dashboard** (`/dashboard`)
   - Protected route (requires authentication)
   - Displays user information
   - Logout button

## 🧪 Testing the Application

### Test Scenarios

1. **Login Flow**
   - Navigate to `http://localhost:5173`
   - Use demo credentials to login
   - Verify redirect to dashboard

2. **Protected Routes**
   - Try accessing `/dashboard` without login
   - Should redirect to `/login`

3. **Token Refresh**
   - Login and wait for access token to expire (15 minutes)
   - Make an API call (or refresh the page)
   - Token should auto-refresh without logout

4. **Logout**
   - Click logout button
   - Verify tokens are cleared
   - Verify redirect to login

5. **Registration**
   - Create new account via `/register`
   - Should auto-login after registration

## 🚀 Deployment

### Backend Deployment Options

1. **Heroku**
   ```bash
   # In backend directory
   heroku create your-app-name
   heroku config:set JWT_ACCESS_SECRET=your-secret
   heroku config:set JWT_REFRESH_SECRET=your-secret
   git push heroku main
   ```

2. **Railway** / **Render**
   - Connect GitHub repository
   - Set environment variables
   - Deploy automatically

### Frontend Deployment Options

#### Vercel (Recommended)
```bash
# In frontend directory
npm install -g vercel
vercel
```

#### Netlify
```bash
# In frontend directory
npm run build
# Drag and drop 'dist' folder to Netlify
```

#### GitHub Pages
```bash
# Add to vite.config.ts:
# base: '/repo-name/'

npm run build
# Deploy dist folder to gh-pages branch
```

### Environment Configuration for Production

Update `frontend/src/services/axios.ts`:
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
```

Create `.env.production`:
```
VITE_API_URL=https://your-backend-api.com
```

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT tokens with expiration
- ✅ Access token in memory (XSS protection)
- ✅ HTTP-only cookies option available
- ✅ CORS configuration
- ✅ Input validation with class-validator
- ✅ TypeScript for type safety

## 📚 Code Highlights

### Axios Instance with Interceptors
Key file: `frontend/src/services/axios.ts`
- Automatic token attachment
- Automatic token refresh on 401
- Centralized error handling

### React Query Integration
Key file: `frontend/src/context/AuthContext.tsx`
- Mutations for login/register/logout
- Queries for user profile
- Cache invalidation on auth changes

### React Hook Form Validation
Key file: `frontend/src/pages/Login.tsx`
- Zod schema validation
- Error handling
- Type-safe forms

## 🐛 Troubleshooting

### Backend won't start
- Check if port 3000 is available
- Verify .env file exists
- Run `npm install` again

### Frontend won't start
- Check if port 5173 is available
- Clear node_modules and reinstall
- Check for TypeScript errors

### CORS errors
- Verify backend CORS settings in `main.ts`
- Check frontend API URL configuration

### Tokens not working
- Check JWT secrets in .env
- Verify token expiration times
- Clear localStorage and try again

## 📝 Assignment Requirements Checklist

- ✅ Access token and refresh token implementation
- ✅ Axios instance with token interceptors
- ✅ React Query for mutations and queries
- ✅ React Hook Form with validation
- ✅ Protected routes with authentication guards
- ✅ Logout with token cleanup
- ✅ Token stored in memory (access) and localStorage (refresh)
- ✅ Automatic token refresh on expiration
- ✅ Error handling with user feedback
- ✅ TypeScript throughout
- ✅ Clean, modular code structure
- ✅ Comprehensive README
- ✅ Ready for deployment

## 🎓 Learning Outcomes

This project demonstrates:
- JWT authentication patterns
- Token refresh mechanisms
- Axios interceptor patterns
- React Query state management
- React Hook Form integration
- Protected route implementation
- TypeScript best practices
- Full-stack development

## 👨‍💻 Author

Created as part of the IA04 university assignment.

## 📄 License

This project is for educational purposes.
