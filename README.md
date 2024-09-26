
# Full Stack Authentication App

This project consists of two main folders: `backend` and `frontend`. The backend is a Node.js application with TypeScript, using Express and MongoDB. The frontend is built with React and Vite.

## Prerequisites

- Node.js (>= v14)
- MongoDB installed and running
- npm or yarn

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

## Backend Setup

### Install Backend Dependencies

1. Navigate to the `backend` folder:

   ```bash
   cd backend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

### Setup Environment Variables

1. Create a `.env` file in the `backend` folder.
2. Add the following environment variables:

   ```bash
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   MAIL_HOST=smtp.your-email.com
   MAIL_PORT=587
   MAIL_USER=your-email@example.com
   MAIL_PASS=your-email-password
   ```

### Running the Backend

- **Development Mode**:

  ```bash
  npm run dev
  ```

- **Production Mode**:

  First, build the TypeScript files:

  ```bash
  npm run build
  ```

  Then, start the server:

  ```bash
  npm start
  ```

## Frontend Setup

### Install Frontend Dependencies

1. Navigate to the `frontend` folder:

   ```bash
   cd ../frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

### Running the Frontend

- **Development Mode**:

  ```bash
  npm run dev
  ```

  The frontend will be available at [http://localhost:5173](http://localhost:5173).

- **Build for Production**:

  ```bash
  npm run build
  ```

  The built files will be available in the `dist` folder.

## Project Structure

```bash
your-repo-name/
├── backend/
│   ├── dist/                # Compiled JS files (after running `npm run build`)
│   ├── src/                 # Source code (TypeScript files)
│   ├── app.ts               # Main app entry point
│   ├── .env                 # Environment variables
│   ├── package.json         # Backend dependencies and scripts
│   └── tsconfig.json        # TypeScript configuration
└── frontend/
    ├── src/                 # React source code
    ├── public/              # Public assets
    ├── package.json         # Frontend dependencies and scripts
    └── vite.config.ts       # Vite configuration
```

## License

This project is licensed under the ISC License.
