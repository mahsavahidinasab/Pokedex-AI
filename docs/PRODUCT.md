# Pokedex

## Product purpose

Pokedex is a local, personal Pokemon reference app. It lets people create an account, explore Pokemon information, and keep a private collection of favorites they can return to whenever they sign in.

The app is intended to run for the user locally. It is not a public social network or shared Pokemon database: each person's favorites belong only to that person.

## Who it is for

The app is for Pokemon fans who want a simple place to browse Pokemon and save the ones they like. It should feel quick, familiar, and easy to use without requiring Pokemon expertise.

## Core experience

1. A visitor opens the Pokedex and can browse available Pokemon.
2. They can select a Pokemon to see its key details.
3. To save Pokemon, they create an account or sign in.
4. A signed-in user can add or remove favorites and view their personal favorites list.
5. When they come back and sign in again, their favorites are still available.

## Features and definition of done

### Account registration

Visitors can create an account using a unique identity and a password. The app clearly confirms a successful registration and makes it clear when the chosen identity is already in use or the submitted information is incomplete.

Done when:

- A new visitor can create an account from the app.
- The new account can be used to sign in.
- Duplicate accounts are prevented and explained clearly.
- Registration failures give the visitor an understandable next step.

### Sign in and sign out

Registered users can sign in to access their personal favorites. They can sign out when finished, after which their account-specific content is no longer accessible from that session.

Done when:

- A registered user can sign in with valid credentials.
- Invalid sign-in attempts receive a clear, non-revealing error message.
- The app visibly indicates whether the user is signed in.
- A signed-in user can sign out.
- After signing out, protected account areas require signing in again.

### Browse Pokemon

Anyone can browse a discoverable list of Pokemon. Each result gives enough information to identify the Pokemon and open its details.

Done when:

- Visitors and signed-in users can view a Pokemon browse experience.
- Each listed Pokemon is identifiable at a glance.
- Selecting a listed Pokemon opens that Pokemon's details.
- The experience remains useful when Pokemon information is temporarily unavailable, with a clear message rather than a broken page.

### Pokemon details

Anyone can open an individual Pokemon page to learn about it. The page presents a clear visual identity and the most useful reference information, such as its name, image, types, abilities, and basic measurements.

Done when:

- A Pokemon detail page can be reached from browsing.
- The page clearly identifies the selected Pokemon.
- Key Pokemon attributes are displayed in a readable, consistent layout.
- If a requested Pokemon cannot be found, the user sees a helpful not-found state.
- Signed-in users can tell whether this Pokemon is already a favorite.

### Favorites

Signed-in users can save Pokemon to a personal favorites collection from the relevant Pokemon experience. They can remove a saved Pokemon, and the same Pokemon cannot appear more than once in their favorites.

Done when:

- Saving a Pokemon is available only to signed-in users.
- A signed-in user can add a Pokemon to favorites.
- A signed-in user can remove a Pokemon from favorites.
- Favorite status is reflected clearly on Pokemon details.
- A user cannot create duplicate favorites.
- One user's favorites are never shown to another user.

### My favorites

Signed-in users have a dedicated page for their saved Pokemon. It provides a useful overview and lets them continue exploring individual Pokemon.

Done when:

- A signed-in user can open their favorites page.
- The page shows only that user's saved Pokemon.
- Each favorite can be opened for more details.
- An empty collection has a friendly, informative empty state.
- The page is unavailable to signed-out visitors except through signing in.
-  a Favorite model (userId, pokemonId, pokemonName, sprite), 
- POST /pokemon/:name/favorite and 
- GET /favorites (both behind ensureAuthenticated),
- and a way to un-favorite.


### Navigation and feedback

The product has straightforward navigation between browsing, Pokemon details, account actions, and favorites. Important outcomes, such as signing in, saving a favorite, or encountering an error, are communicated clearly.

Done when:

- A user can reliably reach the main browse experience, their favorites, and account actions.
- Navigation reflects whether the user is signed in.
- Successes, validation issues, and unavailable content are presented in plain language.
- Pages have consistent titles and a coherent Pokedex identity.

## Product boundaries

This initial product does not include social features, public profiles, sharing favorites, trading, team building, editing Pokemon information, or administrative tools. Pokemon reference information is read-only within the app; users personalize the product only through their own favorites.

## Release-ready outcome

The product is complete when a person can run the app locally, create an account, sign in, browse Pokemon, open clear detail pages, save and remove private favorites, revisit those favorites after returning, and sign out confidently. The app should make each state, including signed in, signed out, empty favorites, missing Pokemon, and temporarily unavailable Pokemon information, understandable to the user.
