const router = require("express").Router();
const { Users, Matches, Campfire } = require("../models");
const withAuth = require("../utils/auth");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");

//Render User Dashboard
router.get("/dashboard", (req, res) => {
  Matches.findAll({
    where: {
      user_id: req.session.user_id,
    },
  }).then((userMatchData) => {
    //const userData = userMatchData.get({ plain: true });
    const loggedIn = req.session.loggedIn;
    //console.log('MATCH DATA', userData);

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
router.get("/create-group", (req, res) => {
  const loggedIn = req.session.loggedIn;
  const user_id = req.session.user_id;

  if (loggedIn) {
    console.log('USERID', user_id);
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

//Render Campfire - random groups for matching
router.get("/campfire", (req, res) => {
  Campfire.findOne({
    order: [
      Sequelize.fn( 'RAND' ),
    ]
  })

  
    .then((matchResData) => {
      
      
      if (!matchResData) {
        console.log("no campfires found");
        res
          .status(404)
          .json({
            message: `You've visited all the campfires in your area.  Check back later for new content!`,
          });
        return;
       
      }
      const user_id = req.session.user_id;
      const matchData = matchResData.get({ plain: true });
      const loggedIn = req.session.loggedIn;


      console.log('user_id', user_id);
      res.render('campfire', { matchData, user_id, loggedIn });
      //res.json(matchResData);

    })

    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Render Login page
router.get("/login", (req, res) => {
  res.render("login");
});

//Render Register page
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
  Matches.findAll({
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

module.exports = router;
