const express = require('express')
const { check } = require('express-validator')
const axios = require("axios")
const jwt = require("jsonwebtoken")

const userController = require('../controller/userController')

const router = express.Router()

router.get('/', userController.getUsers)

router.get("/current", userController.getCurrent)

router.post(
  '/signup',
  [
    check('email')
      .normalizeEmail()
      .isEmail(),
    check('password').isLength({ min: 5 })
  ],
  userController.signup
)

router.post('/login', userController.login)

router.get("/auth/google/url", (req, res) => {
  return res.send(userController.getGoogleAuthURL())
})

router.get("/signout", userController.signOut)

// Getting the user from Google with the code
router.get(`/auth/google/redirect`, async (req, res) => {
  const code = req.query.code


  const { tokens } = await userController.oauth2Client.getToken(code)

  // Fetch the user's profile with the access token and bearer
  const googleUser = await axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokens.id_token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      console.error(`Failed to fetch user`)
      throw new Error(error.message)
    })

  const token = jwt.sign(googleUser, process.env.JWT_KEY)
  console.log(googleUser)
  userController.signWithGoogle(googleUser.email)
  
  res.cookie("auth_token", token, {
    maxAge: 900000,
    httpOnly: true,
    secure: false,
  })
  res.redirect("https://poke.dev/auth/google-landing")
})

router.get("/auth/google/user", (req, res) => {
  console.log("get user")
  try {
    const decoded = jwt.verify(req.cookies["auth_token"], process.env.JWT_KEY)
    console.log("decoded", decoded)
    return res.status(201).json({user: decoded})
  } catch (err) {
    console.log(err)
    res.send(null)
  }
})

module.exports = router
