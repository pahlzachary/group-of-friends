const Users = require('./Users');
const Match = require('./Match');
const Campfire = require('./Campfire');

//TODO: Refine associations to pull campfires based on Match table
//TODO: Refine associations to pull users based on Match table
//create associations
//User can match with more than one group
//TODO: this is breaking table generation
// Match.hasMany(Users, {
//      foreignKey: 'id'
// });

//More than 1 user can match with a group
Users.hasMany(Match, {
     foreignKey: 'user_id',
     constraints: false
})

//Groups will have more than 1 match
Campfire.hasMany(Match, {
     foreignKey: 'id'
});

 //Need to match with more than 1 Campfire
// Campfire.belongsToMany(Match, {
//      foreignKey: 'group_id'
// });

//Users create the Campfires
Campfire.belongsTo(Users, {
     foreignKey: 'creating_user_id'
});

module.exports = { Users, Campfire, Match };
