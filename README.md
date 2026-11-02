# RecAIcle

RecAIcle is a mobile-first web application that uses Artificial Intelligence to recognize different types of waste from an uploaded image.

The user can select or upload an image of a waste item, after which the application sends it to an AI model that predicts the waste category and returns a confidence score.

The project was developed as part of my second challenge at Fontys ICT.

## Main Features

- Upload or drag and drop a waste image
- Preview the selected image
- AI waste classification
- Waste category and confidence result
- User registration and login
- Account page with editable user information
- Waste Legend page with waste categories and icons
- About Us page with project information and technology stack
- Responsive mobile-first design
- Desktop landing page with QR code for mobile access

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React

### Backend
- FastAPI
- Python

### Artificial Intelligence
- Hugging Face Transformers
- PyTorch
- `dima806/garbage_types_image_detection`

### Database and Authentication
- PostgreSQL
- Prisma ORM
- bcrypt.js
- jose
- JWT authentication using an HTTP-only cookie

## Project Structure

```text
RecAIcle/
│
├── app/                 # Next.js pages and API routes
├── components/          # Reusable React components
├── lib/                 # Prisma and shared functionality
├── prisma/              # Prisma schema and migrations
├── ai/                  # FastAPI and AI model integration
├── public/              # Static files
└── ...
```

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd RecAIcle
```

### 2. Install Node.js Dependencies

```bash
npm install
```

### 3. Create the Python Virtual Environment

```powershell
python -m venv .venv
```

Activate it on Windows:

```powershell
.venv\Scripts\Activate.ps1
```

### 4. Install Python Dependencies

```powershell
pip install fastapi uvicorn python-multipart transformers torch Pillow safetensors
```

## Environment Variables

Create a `.env` file in the root of the project.

Example:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/recaicle?schema=public"

AUTH_SECRET="YOUR_SECRET_KEY"
```

The PostgreSQL database must already exist before connecting Prisma.

## Prisma Setup

Generate the Prisma client:

```bash
npx prisma generate
```

If migrations are included in the project, run:

```bash
npx prisma migrate dev
```

## Starting the Application

RecAIcle uses two separate development servers:

1. Next.js frontend/backend
2. FastAPI AI backend

Both must be running for the scanning functionality to work.

### Start Next.js

Open a terminal in the project folder:

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:3000
```

### Start FastAPI

Open a second terminal in the project folder.

Activate the Python virtual environment:

```powershell
.venv\Scripts\Activate.ps1
```

Then start FastAPI:

```powershell
python -m uvicorn ai.api:app --reload --port 8000
```

The FastAPI server will run at:

```text
http://127.0.0.1:8000
```

FastAPI documentation can be opened at:

```text
http://127.0.0.1:8000/docs
```

## AI Flow

```text
Upload image
    ↓
Next.js
    ↓
FastAPI /predict
    ↓
Hugging Face AI model
    ↓
Waste category + confidence
    ↓
Next.js result modal
```

The AI model is loaded when the FastAPI server starts and remains available for future prediction requests.

## Waste Recognition

The application currently works best when the uploaded image contains one clear main waste item.

The AI may be less accurate when:

- Multiple waste materials are visible
- The object is heavily damaged or dirty
- The background is complicated
- The object looks significantly different from the images used to train the model

## Authentication

Users can:

- Register an account
- Log in
- Log out
- View their account information
- Edit their name and email

Passwords are hashed using bcrypt.js.

Authentication is handled using a JWT stored inside an HTTP-only cookie.

## Database

PostgreSQL is used to store application data.

Prisma ORM is used to communicate between the Next.js application and PostgreSQL.

The main database models are:

- User
- Scan

## Development Notes

The project was developed as a four-week Fontys ICT challenge.

During development, several different AI models were tested before selecting the final Hugging Face model. The project helped me gain practical experience with integrating Artificial Intelligence into a complete web application containing a frontend, backend, authentication and database.

## Author

**Kristiyan Tsenov**

Fontys University of Applied Sciences  
ICT Start Semester – Challenge 2
