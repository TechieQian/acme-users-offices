const router = require('express').Router()
const { User, Office } = require('../db/index').models

router.get('/', (req,res,next)=> {
  Office.findAll({
    order: [ 'id' ],
    include: [{ model: User }]
  })
    .then((offices)=>{
      res.send(offices)
    })
})


router.post('/', (req,res,next)=> {
  Office.create(req.body)
    .then((offices)=>{
      res.send(offices)
    })
})

router.delete('/:id', (req,res,next)=> {
  console.log('hitting delete route')
  Office.destroy({ where : { id : req.params.id }})
    .then(()=> {
      res.send()
    })
})

module.exports = router
