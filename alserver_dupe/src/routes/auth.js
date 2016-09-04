import express from 'express'
import User from '../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config'

let router = express.Router()

router.post('/', (req, res) => {
  const {identifier, password} = req.body

  return User.findOne({
    $or: [
      {username: identifier},
      {email: identifier}]
  }).then(user => {
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({
          id: user.id,
          username: user.username
        }, config.jwtSecret)
        res.json({token})
      } else {
        res.status(401).json({errors: {form: 'Invalid Credentials'}})
      }
    } else {
      res.status(401).json({errors: {form: 'Invalid Credentials'}})
    }
  })
})

export default router
