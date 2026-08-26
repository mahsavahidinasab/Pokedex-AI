# Pokedex AI

A full-stack Pokémon web application built with **Node.js, Express, MongoDB, EJS, and PokeAPI**. Users can browse Pokémon, view detailed information, create an account using Google authentication, and save their favorite Pokémon.

## Features

* Browse Pokémon from the PokeAPI
* View detailed Pokémon information
* Search and explore Pokémon
* Google OAuth authentication
* User sessions with Passport.js
* Add and remove Pokémon from favorites
* View saved favorite Pokémon
* Responsive user interface
* MongoDB database for user and favorite Pokémon data
* Server-side rendering with EJS

## Technologies

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **EJS**
* **Passport.js**
* **Google OAuth 2.0**
* **HTML5**
* **CSS3**
* **Bootstrap**
* **PokeAPI**

## Project Structure

```text
Pokedex-AI/
├── config/          # Application configuration and Passport setup
├── middleware/      # Express middleware
├── models/          # MongoDB/Mongoose models
├── routes/          # Application routes
├── services/        # External API and application services
├── public/
│   └── css/         # Stylesheets
├── views/           # EJS templates
├── .env.example     # Environment variable template
├── .gitignore
├── package.json
├── package-lock.json
└── server.js        # Application entry point
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/mahsavahidinasab/Pokedex-AI.git
cd Pokedex-AI
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Then add the required environment variables, including your MongoDB connection string, session secret, and Google OAuth credentials.

**Never commit your `.env` file to GitHub.**

### 4. Configure Google OAuth

Create OAuth credentials in Google Cloud Console and configure the callback URL used by the application.

For local development, the callback URL is:

```text
http://localhost:3000/auth/google/callback
```

Make sure the values in your `.env` file match your Google OAuth configuration.

### 5. Start the application

For development:

```bash
npm run dev
```

Or, if the project does not define a development script:

```bash
node server.js
```

The application will be available at:

```text
http://localhost:3000
```

## Authentication

The application uses **Passport.js** and Google OAuth for authentication.

Users can:

* Sign in with Google
* Create an account automatically through Google authentication
* Maintain a session while browsing
* Save Pokémon to their personal favorites

## Favorites

Authenticated users can add Pokémon to their favorites from the Pokémon details page.

Favorites are associated with the authenticated user and stored in MongoDB.

## API

Pokémon information is provided by **PokeAPI**.

PokeAPI is a free RESTful Pokémon API that provides information such as Pokémon names, sprites, types, abilities, statistics, height, and weight.

## Environment Variables

The application requires environment-specific configuration. See `.env.example` for the variables required by the project.

Typical configuration includes:

```env
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Do not commit real credentials or secrets to the repository.

## Future Improvements

* Pokémon search and filtering
* Pagination
* Favorite Pokémon management page
* Improved error handling
* Pokémon type filtering
* Deployment to a cloud platform
* Improved mobile UI
* Additional AI-powered Pokémon features

## License

This project is intended for educational and portfolio purposes.

Pokémon and related trademarks are property of their respective owners. Pokémon data is provided through PokeAPI.
