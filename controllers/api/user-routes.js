const router = require("express").Router();
const { Users, Match, Campfire } = require("../../models");
const { Op } = require('sequelize');

//create user
router.post("/", (req, res) => {
  Users.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    location: req.body.location,
  })
    .then((dbUserData) => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.email = dbUserData.email;
        req.session.location = dbUserData.location;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//user login
router.post("/login", (req, res) => {
  Users.findOne({
    where: { email: req.body.email },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: "Email not found" });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.email = dbUserData.email;
      req.session.loggedIn = true;

      console.log('DBUSERDATA', dbUserData);
      console.log('SESSION', req.session);
      res.json({ user: dbUserData, plain: true });
    });
  });
});

//TODO: untested
//user logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//reads all users
router.get("/", (req, res) => {
  Users.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//reads 1 specific user
//TODO: WORKING WITHOUT EXTRA INCLUDE STATEMENT
router.get("/:id", (req, res) => {
  Users.findOne({
    attributes: { exclude: ["password"] },
    where: { id: req.session.user_id },
    
    include: [
      {
        model: Campfire,
        attributes: [
          "id",
          "group_name",
        //   "group_email",
          "group_location",
          "activity_title",
          "activity_description",
          "activity_date",
          "open_slots",
        ],
      },
      {
        model: Match,
        attributes: ["matched"],
        include: [
          {
            model: Campfire,
            where: {
              user_id: {[Op.col]: req.session.user_id}
            }
          }, 
        ]
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      console.log(dbUserData);
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//update user info
//TODO: No data in route to update any info
router.put("/:id", (req, res) => {
  Users.update(req.body, {
    individualHooks: true,
    where: { id: req.params.id },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//delete user profile
router.delete("/:id", (req, res) => {
  Users.destroy({
    where: { id: req.params.id },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});



module.exports = router;
