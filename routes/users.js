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
})

router.put('/:id', (req,res,next)=> {
  console.log('hit put')
  User.update(req.body, {
    where : { id : req.params.id * 1 }
  })
})

router.post('/', (req,res,next)=> {
  console.log('hit post')
  console.log('body is', req.body)
  User.create(req.body)
    .then(()=>{
      console.log('creation success')
      res.send()
    })
     .catch((err)=> {
       console.log('got err', err)
       res.send()
     })
})

router.delete('/:id', (req,res,next)=> {
  console.log('deleting user...')
  User.destroy({ where : { id : req.params.id }})
    .then(()=> {
      console.log('destroyed id', req.params.id)
      res.send()
    })
})

module.exports = router
