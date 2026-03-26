# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.



# Contacts Management App

Contacts Management application built to efficiently handle contact data with a clean and scalable architecture.

# Architecture Overview

The project follows a layered architecture pattern, ensuring clear separation of concerns and maintainability.


# Presentation Layer

Located in: pages/ and components/

-Includes 

*Contacts list page 
*Add/Edit contact form 
*Search input and filters

-This layer

*Displays data to the user 
*Handles user interactions 
*Communicates with the state layer

# State Management Layer

Located in: pages/ and components/

-Contact Store

*Fetching contacts
*Creating contacts
*Updating contacts
*Deleting contacts


-Search Logic

*Filtering contacts
*Managing search input
*Updating UI results dynamically

# API / Service Layer

Located in:

services/

-Responsible for:

*API calls (GET, POST, PUT, DELETE)
*Handling HTTP requests
*Data transformation and formatting

# Features

*Add new contacts
*Search contacts
*Edit contacts
*Delete contacts
*Display contact list

# Future Improvements

*Authentication system
*Database integration
*Advanced filtering
*UI/UX improvements

