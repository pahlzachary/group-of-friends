const router = require("express").Router();
const { Users, Match, Campfire } = require("../models");
const withAuth = require("../utils/auth");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");

//Render User Dashboard
router.get("/dashboard", (req, res) => {
  Match.findAll({
    where: {
      user_id: req.session.user_id,
    },
  }).then((userMatchData) => {
    //const userData = userMatchData.get({ plain: true });
    const loggedIn = req.session.loggedIn;
    console.log('MATCH DATA', userMatchData);

    if (loggedIn) {
      res.render("dashboard", {
        userMatchData,
        loggedIn: req.session.loggedIn,
        username: req.session.username,
      });
    } else {
      res.render("login");
    }
  });
});

//Render Group Create page
//TODO: NEED CREATE-GROUP HANDLEBARS PAGE
router.get("/create-group", (req, res) => {
  const loggedIn = req.session.loggedIn;
  const user_id = req.session.user_id;
  
  if (loggedIn) {
    res.render("create-group", {
      loggedIn,
      user_id
    });
  } else {
    res.render("login");
  }
});

//Render Group Edit page
//TODO: NEED EDIT-GROUP HANDLEBARS PAGE
router.get("/edit-group", (req, res) => {
  if (req.session.loggedIn) {
    res.render("edit-group");
  } else {
    res.render("login");
  }
});

//Render Match/'Campfire'/Display random groups for matching
//TODO: NEED CAMPFIRE HANDLEBARS PAGE
router.get("/campfire", (req, res) => {
  const loggedIn = req.session.loggedIn;
  if (loggedIn) {
    Campfire.findAll({
      order: Sequelize.literal("rand()"),
      limit: 1,
    })
      .then((matchResData) => {
        //if match.matched = T || F where matchResData.id = match.group_id, get another campfire
        if (!matchResData) {
          console.log("no campfires found");
          res.status(404).json({ message: "No campfires found." });
          return;
        }

        console.log("MATCHRESDATA");

        res.render("campfire");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  } else {
    res.render("login");
  }
});

//Render Login page
//TODO: TESTED AND WORKING
router.get("/login", (req, res) => {
  res.render("login");
});

//Render Register page
//TODO: NEED REGISTER HANDLEBARS PAGE
router.get("/register", (req, res) => {
  res.render("register");
});

//Render Landing Page  -- Is anything going here?
router.get("/", (req, res) => {
  res.render("homepage");
});
//TODO: any other pages that we need to get this rolling?

//Render Matched Page
router.get("/matched", (req, res) => {
  Match.findAll({
    where: {
      user_id: req.session.user_id,
    },
    include: [
      {
        model: Campfire,
      },
    ],
  }).then((campfireData) => {
       console.log('CAMPFIRE DATA', campfireData);
    res.render("matched", {
        campfireData,
      })
      .catch((err) => console.log(err));
  });
});

//Render My Groups Page
router.get("/created", (req, res) => {
  Campfire.findAll({
    where: {
      creating_user_id: req.session.user_id,
    },
  })
    .then((campfireData) => {
      res.render("created", {
        campfireData,
      });
    })
    .catch((err) => console.log(err));
});

//Find a group user has not seen already
//TODO: this works for displaying random new group!
router.get("/testCampfire", (req, res) => {
  Campfire.findAll({
    order: Sequelize.literal("rand()"),
    limit: 1,
    include: {
      model: Match,
      where: {
        user_id: req.body.id,
        matched: true,
        matched: false,
      },
    },
  })
    .then((matchResData) => {
      //if match.matched = T || F where matchResData.id = match.group_id, get another campfire
      //TODO: FIGURE OUT THIS LOGIC ON MONDAY
      if (!matchResData) {
        console.log("no campfires found");
        res
          .status(404)
          .json({
            message: `You've visted all the campfires in your area.  Check back later for new content!`,
          });
        return;
      }

      console.log("MATCHRESDATA", matchResData);
      res.render("campfire");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
