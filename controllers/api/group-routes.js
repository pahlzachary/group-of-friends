const router = require("express").Router();

const { User, Match, Campfire } = require("../../models");
const withAuth = require("../../utils/auth");
//TODO: Need to add withAuth later

//create a group
router.post("/", (req, res) => {
  Campfire.create({
    group_name: req.body.group_name,
    group_email: req.session.email,
    group_location: req.body.group_location,
    activity_title: req.body.activity_title,
    activity_description: req.body.activity_description,
    activity_date: req.body.activity_date,
    open_slots: req.body.open_slots,
    creating_user_id: req.body.creating_user_id
  })
    .then(dbGroupData => {
      console.log('GROUP DATA', dbGroupData);
      res.json(dbGroupData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//read all group's info
//TODO: not sure if we need to pull all group info for app functionality.
router.get("/", (req, res) => {
  Campfire.findAll({
    //exclude any info?
    // include: [
    //   {
    //     model: User,
    //     attributes: ["id", "email"],
    //   },
    //   {
    //     model: Match,
    //     attributes: ["mathced"],
    //   },
    // ],
  })
    .then((dbGroupData) => res.json(dbGroupData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//read 1 specific group's info
//TODO: We can use this when we add search functionality for a specific group.
//TODO: TESTED AND WORKING
router.get("/:id", (req, res) => {
  Campfire.findOne({
    where: { id: req.params.id },
    // include: [
    //   {
    //     model: User,
    //     attributes: ["id", "email"],
    //   },
    //   {
    //     model: Match,
    //     attributes: ["mathced"],
    //   },
    // ],
  })
    .then((dbGroupData) => {
      if (!dbGroupData) {
        res.status(404).json({ message: "Group not found" });
        return;
      }
      res.json(dbGroupData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//update and edit group
router.put("/:id", (req, res) => {
  Campfire.update(
      //TODO: needs review - not sure correct
      //Campfire.create is not generating an id?
    {
      group_name: req.body.group_name,
      group_email: req.body.group_email,
      group_location: req.body.group_location,
      activity_title: req.body.activity_title,
      activity_description: req.body.activity_description,
      activity_date: req.body.activity_date,
      open_slots: req.body.open_slots,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbGroupData) => {
      if (!dbGroupData) {
        res.status(404).json({ message: "Group not found" });
        return;
      }
      res.json(dbGroupData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//delete Group
router.delete('/:id', (req, res) => {
    Campfire.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbGroupData => {
        if (!dbGroupData) {
          res.status(404).json({ message: 'Group not found' });
          return;
        }
        res.json(dbGroupData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });



module.exports = router;
