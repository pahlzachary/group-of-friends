const Users = require('./Users');
const Matches = require('./Matches');
const Campfire = require('./Campfire');


//More than 1 user can match with a group
// Users.hasMany(Match, {
//      foreignKey: 'user_id',
//      constraints: false
// })

//Users create the Campfires
Campfire.belongsTo(Users, {
     foreignKey: 'creating_user_id'
});

Campfire.belongsToMany(Users, {
     through: Matches,
     foreignKey: 'group_id'
})

Users.belongsToMany(Campfire, {
     through: Matches,
     foreignKey: 'user_id'
})

module.exports = { Users, Campfire, Matches };
