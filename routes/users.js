const router = require('express').Router()
const { User, Office } = require('../db/index').models

router.get('/', (req,res,next)=> {
  User.findAll({
    order: [ 'id' ],
    include: [{ model: Office }]
  })
    .then((users)=>{
      res.send(users)
    })
    .catch((err)=> {
      res.send({err})
    })
})

router.put('/:id', (req,res,next)=> {
  User.findById(req.params.id)
    .then((user)=> {
      if (req.body.officeId) {
        user.setOffice(req.body.officeId)
      }
      else {
        user.setOffice(null)
      }
      res.send()
    })
    .catch(next)
})

router.post('/', (req,res,next)=> {
  User.create(req.body)
    .then(()=>{
      res.send()
    })
    .catch((err)=> {
      res.send({err})
    })
  })

router.delete('/:id', (req,res,next)=> {
  User.destroy({ where : { id : req.params.id }})
    .then(()=> {
      res.send()
    })
    .catch(next)
})

module.exports = router
