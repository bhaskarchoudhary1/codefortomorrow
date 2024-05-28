
import { check } from "express-validator"

const validate = (method: string) => {
  switch (method) {
    case 'login': {
      return [
        check('email').not().isEmpty().withMessage('The email field is required.'),
        check('password').not().isEmpty().withMessage('The password field is required.'),
      ]
    }
    case 'register': {
      return [
        check('email').not().isEmpty().withMessage('Email field is required'),
        check('email').isEmail().withMessage('Email is invalid format'),
        check('password').not().isEmpty().withMessage('The password field is required.')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/\d/).withMessage('Password must contain at least one numeric digit')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character'),
      ]
    }
  }
}

export default validate