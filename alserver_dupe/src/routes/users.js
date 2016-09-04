import express from 'express'
import commonValidations from '../shared/validations/signup'
import bcrypt from 'bcrypt'
import isEmpty from 'lodash/isEmpty'

import User from '../models/user'

let router = express.Router()

function validateInput(data, otherValidations) {
  let {errors} = otherValidations(data)

  return User.findOne({
    $or: [
      {email: data.email},
      {username: data.username}]
  }).then(user => {
    if (user) {
      if (user.username === data.username) {
        errors.username = 'There is a user with that username'
      }
      if (user.email === data.email) {
        errors.email = 'There is a user with that email'
      }
    }
    return {
      errors,
      isValid: isEmpty(errors)
    }
  })
}

router.get('/:identifier', (req, res) => {
  User.findOne({
    $or: [
      {email: req.params.identifier},
      {username: req.params.identifier}]
  }).then(user => {
    const {username, email} = user
    res.json({user: {username, email}})
  })
})

router.post('/', (req, res) => {
  validateInput(req.body, commonValidations).then(({errors, isValid}) => {
    if (isValid) {
      const {username, password, timezone, email} = req.body
      const password_digest = bcrypt.hashSync(password, 10)

      let user = new User({username, timezone, email, password: password_digest})
      user.save()
        .then(user => res.json({success: true}))
        .catch(err => res.status(500).json({error: err}))
    } else {
      res.status(400).json(errors)
    }
  })
})

export default router
