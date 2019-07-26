const express = require("express");
const next = require("next");
const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_DEV !== "production"; //true false
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler(); //part of next config

const path = require("path");
const session = require("express-session");
const upload = require("multer")({ dest: "uploads/" });

const knex = require("knex")(require("../knexfile.js"));

const KnexSessionStore = require("connect-session-knex")(session);
const store = new KnexSessionStore({ knex });

const app = express();

app.use(
  session({
    secret: "julia",
    cookie: { maxAge: 10 * 365 * 24 * 60 * 60 * 1000 },
    store: store
  })
);

const countVisits = req => {
  var n = req.session.views || 0;
  req.session.views = ++n;
  return req.session.views;
};

nextApp.prepare().then(() => {
  app.use("/api/photos", (req, res) => {
    let n = countVisits(req);
    res.json({
      messege: `I'm your API, sir ${n}`,
      visits: n,
      name: req.session.name
    });
  });
  app.use("/api/set-name", (req, res) => {
    req.session.name = req.query.name;
    res.json({ status: "OK", name: req.session.name });
  });
  app.get("*", (req, res) => {
    return handle(req, res); // for all the react stuff
  });
  app.listen(PORT, err => {
    if (err) throw err;
    console.log(`ready at http://localhost:${PORT}`);
  });
});
