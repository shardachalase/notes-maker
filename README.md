# Notes WebApp (Full Stack) 📝

A sleek, robust, and modern Full-Stack Note-taking application modeled after premium Dribbble designs. Create, edit, tag, and attach files to your notes using a beautifully responsive React interface built on top of a secure Node/Express/MongoDB architecture.

## 🚀 Features

- **Modern Glassmorphic UI:** Smooth hover animations, floating components, and dedicated dashboard grids utilizing a custom Vanilla CSS design system.
- **Robust Authentication:** Secure JSON Web Token (JWT) based user registration and login endpoints utilizing `bcryptjs` for strict password encryption.
- **Full CRUD operations:** Instantly add, read, update, or safely delete specific notes assigned to your unique user ID.
- **File & Image Attachments:** Directly attach `.pdf`, `.png`, and `.jpg` contents to your notes! Thumbnails are natively rendered securely in the application grid utilizing a local `multer` upload pipeline.
- **Responsive Layouts:** Collapsible contextual sidebars perfectly optimized for both desktop arrays and smartphone columns.

## 🛠️ Technology Stack

- **Frontend:** React 18, Vite, React Router DOM, React Icons, Axios
- **Backend:** Node.js, Express, Mongoose (MongoDB), Multer, JsonWebToken, BcryptJS

## 🏗️ Local Installation

### Prerequisites
Make sure you have Node installed locally. You will also need a local MongoDB instance running or an active MongoDB Atlas Connection URI.

### 1. Clone the repository
```bash
git clone https://github.com/sai-maker-cloud/Notes-webapp-Full-Stack-.git
cd Notes-webapp-Full-Stack-
```

### 2. Configure the Backend Environment
1. Navigate into the backend folder structure:
```bash
cd Backend
```
2. Create a `.env` file containing your secrets:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_secret=your_super_secret_jwt_key
```
3. Install the dependencies:
```bash
npm install
```
4. Start the development server (Defaults to Port 5000):
```bash
node server.js 
# or use nodemon if preferred
```

### 3. Configure the Frontend Environment
1. Open a new terminal instance and navigate to the frontend folder:
```bash
cd frontend
```
2. Install the necessary Vite/React dependencies:
```bash
npm install
```
3. Boot the local React UI rendering server:
```bash
npm run dev
```

Navigate to the localhost port provided by Vite (often `http://localhost:5173`) in your browser to start organizing your thoughts natively!

## 📸 Usage & Attachments
- **To upload an attachment**, click the Paperclip icon located beside the Note Title entry box. Selected image files will render an embedded grid thumbnail automatically. Other files will default to a descriptive PDF/Document icon.
- **Tags** can be quickly added by typing the category keyword into the bottom input and pressing `Enter`. Click the `X` to quickly discard tags before saving.
