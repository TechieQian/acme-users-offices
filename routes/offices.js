const router = require('express').Router()
const { Office } = require('../db/index').models

router.get('/', (req,res,next)=> {
  Office.findAll(
    { order: [ 'id' ] }
  )
    .then((offices)=>{
      res.send(offices)
    })
})

router.post('/', (req,res,next)=> {
  console.log('creating office')
  Office.create(req.body)
    .then((offices)=>{
      res.send(offices)
    })
})


module.exports = router
