# Architecture Plan

## Scope

This document translates the product requirements into a proposed application architecture. It is a plan for a local-only Pokedex app with account registration, sign-in, Pokemon browsing and details, and private favorites.

## Proposed project structure

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
`-- public/
```

## Responsibilities

### `server.js`

The application entry point. It connects to MongoDB, configures Express, enables sessions and authentication, makes shared user-facing data available to views, serves static assets, and registers the authentication and Pokedex routes.

### `config/passport.js`

Configures Passport's local sign-in strategy. It finds an account by username, verifies the submitted password, and defines how the signed-in user is stored in and restored from a session.

### `models/User.js`

Defines an account with a unique username, a securely stored password hash, and timestamps. It provides the password-verification behavior used at sign-in. Plain-text passwords are never stored.

### `models/Favorite.js`

Defines a Pokemon saved by one account. Each favorite stores:

- the owning user;
- the PokeAPI Pokemon ID;
- a Pokemon name and optional sprite URL for display; and
- timestamps.

A unique `user` plus `pokemonId` pairing prevents a user from saving the same Pokemon more than once. Favorites are always queried using the currently signed-in user, so no user can access another user's collection.

### `routes/auth.js`

Owns account actions:

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/register` | Show registration form |
| `POST` | `/register` | Create an account and sign the user in |
| `GET` | `/login` | Show sign-in form |
| `POST` | `/login` | Authenticate an existing user |
| `POST` | `/logout` | End the current session |

### `routes/pokedex.js`

Owns Pokemon and favorite actions:

| Method | Path | Purpose | Access |
|---|---|---|---|
| `GET` | `/` | Browse Pokemon | Public |
| `GET` | `/pokemon/:nameOrId` | Show Pokemon details | Public |
| `GET` | `/favorites` | Show the current user's favorites | Signed in |
| `POST` | `/favorites` | Add a Pokemon to favorites | Signed in |
| `POST` | `/favorites/:pokemonId/delete` | Remove a favorite | Signed in |

The favorites page uses `views/index.ejs` in a favorites-list state, avoiding a separate favorite view in the agreed folder structure.

### `middleware/ensureAuthenticated.js`

Protects routes that need an account. If the visitor is signed in, the request continues. Otherwise, the visitor is directed to sign in with a clear message.

### `services/pokeapi.js`

Isolates PokeAPI access from routing and views. It retrieves Pokemon lists and individual Pokemon records, then presents the required display data in a consistent shape. Failures from the external data source are converted into user-friendly unavailable-data states.

### Views and static assets

- `views/partials/` contains shared navigation and feedback messages.
- `views/login.ejs` and `views/register.ejs` contain account forms.
- `views/index.ejs` presents the Pokemon browse experience and the signed-in user's favorites-list state.
- `views/pokemon.ejs` presents one Pokemon's reference details and its favorite status.
- `public/` contains browser-facing style sheets, images, and optional client-side assets.

## Sessions and authentication

1. A visitor registers with a username and password.
2. The app validates the submission, prevents duplicate usernames, hashes the password, and creates the account.
3. Successful registration signs the visitor in.
4. At sign-in, Passport's local strategy looks up the username and verifies the submitted password against the stored password hash.
5. Passport stores only the user ID in the session.
6. `express-session` sends a signed session cookie to the browser, while `connect-mongo` persists session data in MongoDB.
7. On each later request, Passport restores the signed-in user from the session. Views can then show signed-in navigation and account-specific favorite status.
8. Signing out destroys the server-side session and clears the browser session cookie.

The session secret and MongoDB connection information belong in `.env`; `.env.example` documents the required names without real values. The real `.env` file is ignored by Git.

## Data and request flow

```text
Browser -> Express route -> authentication check, where needed
        -> PokeAPI service or MongoDB model
        -> EJS view -> Browser
```

- Browse and detail pages retrieve reference data from PokeAPI.
- A signed-in Pokemon detail request also checks whether that Pokemon is in the current user's favorites.
- Adding or removing a favorite writes only to MongoDB and derives the owner from the authenticated session, never from submitted form data.
- If a Pokemon is missing, the app shows a helpful not-found result. If PokeAPI is unavailable, it shows a clear temporary-unavailable message rather than an internal error.

## Completion criteria

The architecture is ready to implement when it supports these flows without conflicting responsibilities:

- Public visitors can browse Pokemon and view details.
- Visitors can register, sign in, and sign out.
- Signed-in users can add, view, and remove only their own favorites.
- Duplicate favorites are prevented.
- Sessions survive normal navigation and are stored outside the browser.
- User-facing views consistently know whether a user is signed in.
