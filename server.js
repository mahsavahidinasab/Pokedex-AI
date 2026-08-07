require('dotenv').config();

const dns = require("dns");
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
const session = require('express-session');
const {MongoStore} = require('connect-mongo');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('./config/passport');
const authRoutes = require('./routes/auth');
const pokedexRoutes = require('./routes/pokedex');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: 'sessions',
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use(authRoutes);
app.use(pokedexRoutes);

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully.');

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
  }
}

startServer();
