const { ExtractJwt, Strategy } = require("passport-jwt");
const { JWT_KEY } = require("../constants");

const { fromAuthHeaderAsBearerToken: jwtFromRequest } = ExtractJwt;

module.exports = (passport) => {
  passport.use(
    new Strategy(
      { jwtFromRequest: jwtFromRequest(), secretOrKey: JWT_KEY },
      (payload, done) => done(null, payload)
    )
  );
};
