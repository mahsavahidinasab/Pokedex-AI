# Pokedex App Guide

## Status

This repository currently contains the product and architecture plans. The application dependencies, startup scripts, and `.env.example` template are added as the app is implemented.

## Target stack

| Technology | Version baseline | Purpose |
| --- | --- | --- |
| Node.js | 20 LTS or later | Local runtime |
| Express | 5.x | Web server and routing |
| EJS | 3.x | Server-rendered views |
| MongoDB | 7.x or later | Local application database |
| Mongoose | 8.x | MongoDB data models |
| express-session | 1.x | Browser session support |
| connect-mongo | 5.x | MongoDB-backed session storage |
| Passport | 0.7.x | Authentication framework |
| passport-local | 1.x | Username/password authentication |
| bcrypt | 5.x | Password hashing |
| dotenv | 16.x | Local environment configuration |

Pokemon catalog and detail data comes from the public PokeAPI.

## Planned folder structure

```text
pokedex-app/
├── .env                  # Local configuration; never commit
├── .env.example          # Safe template of required environment variables
├── server.js             # App setup, middleware, database, sessions, and startup
├── config/
│   └── passport.js       # Local Passport strategy and session serialization
├── models/
│   ├── User.js           # User accounts
│   └── Favorite.js       # A saved Pokemon belonging to a user
├── routes/
│   ├── auth.js           # Registration, login, and logout
│   └── pokedex.js        # Browse, details, and favorites
├── middleware/
│   └── ensureAuthenticated.js  # Protects signed-in-only actions
├── services/
│   └── pokeapi.js        # PokeAPI access and response shaping
├── views/
│   ├── partials/         # Shared view fragments
│   ├── login.ejs
│   ├── register.ejs
│   ├── index.ejs
│   └── pokemon.ejs
└── public/               # Stylesheets and other static assets
```

## Running locally

Once the application implementation is present:

1. Install Node.js 20 LTS or later and run a local MongoDB instance.
2. Install dependencies with `npm install`.
3. Copy `.env.example` to `.env` and fill in the local values.
   - PowerShell: `Copy-Item .env.example .env`
4. Start the app with `npm run dev` for development, or `npm start` for a normal local run.
5. Open the local URL printed in the terminal.

## Environment configuration convention

All environment-specific configuration belongs in `.env`; do not hard-code secrets, database URLs, ports, or session settings in application files. Use `.env.example` as the committed, non-secret reference for every required variable.

At minimum, the template should document:

```text
PORT=
MONGODB_URI=
SESSION_SECRET=
```

Rules:

- `.env` is local-only and must remain gitignored.
- `.env.example` contains variable names and safe placeholder values only—never real credentials or secrets.
- When adding a new environment variable, update `.env.example` in the same change.
