# Pokedex App Guide

## Project purpose

This repository contains a local-only Pokedex web application. Users can register, sign in, browse Pokemon data from PokeAPI, view Pokemon details, and maintain private favorites.

## Stack and target versions

Use these versions when creating or updating the package manifest:

| Technology | Target version | Role |
|---|---:|---|
| Node.js | `22.x` LTS | Local runtime |
| Express | `5.x` | Web server and routing |
| EJS | `3.x` | Server-rendered views |
| MongoDB | `8.x` | Local application and session database |
| Mongoose | `8.x` | MongoDB models |
| express-session | `1.x` | Session middleware |
| connect-mongo | `5.x` | MongoDB-backed session store |
| Passport | `0.7.x` | Authentication framework |
| passport-local | `1.x` | Username/password authentication |
| bcrypt | `5.x` | Password hashing |
| dotenv | `16.x` | Local environment configuration |
| nodemon | `3.x` | Development server reloading |

PokeAPI is the read-only Pokemon reference-data source. Do not persist its full dataset locally; store only the user-owned favorite records and the minimum display information needed for a favorite.

## Folder structure

```text
pokedex-app/
|-- .env
|-- .env.example
|-- server.js
|-- config/
|   `-- passport.js
|-- models/
|   |-- User.js
|   `-- Favorite.js
|-- routes/
|   |-- auth.js
|   `-- pokedex.js
|-- middleware/
|   `-- ensureAuthenticated.js
|-- services/
|   `-- pokeapi.js
|-- views/
|   |-- partials/
|   |-- login.ejs
|   |-- register.ejs
|   |-- index.ejs
|   `-- pokemon.ejs
|-- public/
`-- docs/
    |-- PRODUCT.md
    |-- ARCHITECTURE.md
    `-- REVIEW.md
```

Keep responsibilities within these locations:

- `server.js` configures the application, database connection, sessions, Passport, and routes.
- `config/passport.js` contains the local Passport strategy and session serialization behavior.
- `models/` contains only Mongoose schemas and model behavior.
- `routes/` owns HTTP request handling; `auth.js` owns account routes and `pokedex.js` owns Pokemon and favorites routes.
- `middleware/ensureAuthenticated.js` protects signed-in-only actions.
- `services/pokeapi.js` is the only layer that calls PokeAPI.
- `views/` contains EJS templates; shared UI belongs in `views/partials/`.
- `public/` contains browser-facing static assets.

## Local setup and run

1. Install Node.js 22 LTS and ensure a local MongoDB instance is available.
2. Copy `.env.example` to `.env` and replace all placeholder values required by the application.
3. Install dependencies with `npm install` after the package manifest is present.
4. Start the development server with `npm run dev`.
5. Open `http://localhost:3000` unless `PORT` specifies another port.

The intended package scripts are:

```text
npm run dev    # Run the app with automatic reloads
npm start      # Run the app normally
```

## Environment configuration

All environment-specific configuration lives in `.env`. Do not hard-code connection strings, session secrets, ports, credentials, or URLs in application files.

- Treat `.env` as local and secret; it must remain Git-ignored.
- Use `.env.example` as the committed template for required variable names and safe placeholder values.
- When adding a new environment variable, add its placeholder and short guidance to `.env.example` in the same change.
- Never commit real credentials, session secrets, or MongoDB connection strings.

For this app, the expected configuration includes `PORT`, `MONGODB_URI`, and `SESSION_SECRET`. Any stale configuration entries that do not support the local Passport strategy should be removed from `.env.example` when the authentication implementation is created.

## Implementation conventions

- Use server-rendered EJS pages; do not introduce a separate frontend framework.
- Use the local Passport strategy only.
- Protect favorites pages and mutations with `ensureAuthenticated`.
- Derive favorite ownership from the signed-in session, never from client-submitted user identifiers.
- Prevent duplicate favorites with a unique user-and-Pokemon-ID constraint.
- Keep PokeAPI errors and missing-Pokemon states user-friendly.
