const express = require('express');
const authRoute = require('./auth.route');
const profileRoute = require('./profile.route')


const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute
  },
  {
    path: '/profile',
    route: profileRoute
  },


];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;