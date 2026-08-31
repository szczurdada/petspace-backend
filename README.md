# Petspace - Backend

API and real-time server for [Petspace](https://github.com/k1nada/petspace-frontend), the social network where you make a profile for your pet instead of yourself.

## What's in it

- JWT auth, multi-step onboarding
- Friends, friend requests, followers/following
- Posts, comments, likes, reposts, post walls
- Family tree (parent/child pets)
- Photo uploads through Cloudinary
- Real-time chat and online presence via Socket.IO
- Breed/country reference data, with seed scripts to fill the DB

## Stack

Node.js, Express 5, MongoDB, Mongoose, Socket.IO, JWT, bcryptjs, Cloudinary, Multer, express-validator

## Structure

```
src/
  server.js       app entry point
  config/         app configuration
  models/         Mongoose schemas
  middleware/     auth middleware, file upload (multer)
  sockets/        Socket.IO event handlers
  utils/          shared helpers (cloudinary, error formatting)
  scripts/        one-off seed scripts (breeds, countries)
  modules/        one folder per domain (auth, posts, friends, family, chat, ...),
                   each holding its router + controller
```

## Running it

```bash
npm install
npm start
```

Needs a `.env` with:

```
PORT=
JWT_SECRET=
MONGO_URL=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_SECRET_KEY=
```

To seed breeds/countries:

```bash
node src/scripts/seedBreeds.js
node src/scripts/seedCountries.js
```

## Status

In development.

## Related

- Frontend: [petspace-frontend](https://github.com/k1nada/petspace-frontend)
