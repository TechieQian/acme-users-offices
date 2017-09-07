const Office = require('./Office')
const User = require('./User')
const db = require('./conn')

const sync = ()=> { return db.sync({ force : true})}

const seed = ()=> {
  return Office.create({name : "Weihai", lat : 0 , lng : 0})
  .then((o1)=> {
    return Promise.all([
      User.create({ name : "angela"}),
      User.create({ name : "bob", officeId : o1.id})
    ])
  })
}

User.belongsTo(Office)
Office.hasMany(User)

module.exports = {
  sync,
  seed,
  models : {
    Office,
    User
  }
}
