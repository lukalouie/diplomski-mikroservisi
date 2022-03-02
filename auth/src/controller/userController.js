const { validationResult } = require("express-validator")
const User = require("../models/user")
const querystring = require("querystring")
const axios = require("axios")
const { google } = require("googleapis")
const jwt = require("jsonwebtoken") 

const getCurrent = async (req, res) => {
    console.log("started")
    if (!req.session.jwt) {
        console.log("no jwt")
        return res.send({ currentUser: null });
      }
    
      try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY);
        res.send({ currentUser: payload });
      } catch (err) {
        res.send({ currentUser: null });
      }
}

const getUsers = async (req, res) => {
    let users

    try {
        users = await User.find({}, "-password")
    } catch (err) {
        res.status(500).send("Could not fetch users.")
        return
    }

    res.json({users: users.map(user => user.toObject({getters: true})) })
}

const generatePass = () => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789@#$'
              
    for (i = 1; i <= 10; i++) {
        let char = Math.floor(Math.random() * str.length + 1);
                  
        pass += str.charAt(char)
    }

    return pass

}

//sign s googleom, napravi random pass
const signWithGoogle = async (email) => {
    
    
    let existingUser

    try {
        existingUser = await User.find({ email: email })
    } catch (err) {
        throw new Error("Sign in failed.")
    }
    if (existingUser.length !== 0) {
        console.log("signed in with google")
        return ({
            message: "Logged in",
            user: existingUser[0].toObject({getters: true})
        })
    }

    let password = generatePass()

    const createdUser = new User({
        email,
        password
    })

    try {
        await createdUser.save()
    } catch (err) {
        throw new Error("Sign up failed.")
    }

    console.log("signed up with google")
    return ({ user: createdUser.toObject({getters: true})})
}

const signup = async (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        res.status(422).send({error: "Invalid inputs passed!"})
        return
    }

    const { email, password, admin } = req.body

    let existingUser

    try {
        existingUser = await User.find({ email: email })
    } catch (err) {
        res.status(500).send({error: "Signup failed."})
        return
    }
    if (existingUser.length !== 0) {
        res.status(422).send({error: "User already exists!"})
        return
    }

    const createdUser = new User({
        email,
        password,
        admin
    })

    try {
        await createdUser.save()
    } catch (err) {
        res.status(500).send({error: "Signup failed."})
        return
    }

    const userJwt = jwt.sign(
        {
          email: createdUser.email,
          admin: createdUser.admin
        },
        process.env.JWT_KEY,
        { expiresIn: '1800s' }
      )
    
    req.session = {
        jwt: userJwt
    }
    console.log(userJwt)
    res.status(201).json({ user: createdUser.toObject({getters: true})})
}

const login = async (req, res) => {
    const {email, password} = req.body
    let existingUser

    try {
        existingUser = await User.find({email: email})
    } catch (err) {
        res.status(500).send({error: "Login failed."})
        return
    }

    if (existingUser.length === 0 || existingUser[0].password !== password) {
        res.status(401).send({error: "User with these credentials does not exist."})
        return
    }

    const userJwt = jwt.sign(
        {
          email: existingUser[0].email,
          admin: existingUser[0].admin
        },
        process.env.JWT_KEY,
        { expiresIn: '1800s' }
      )
    
    req.session = {
        jwt: userJwt
    }


    res.json({
        message: "Logged in",
        user: existingUser[0].toObject({getters: true})
    })
}

const signOut = (req, res) => {
    req.session = null

    res.send({})
}

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_SECRET,
  "https://poke.dev/api/users/auth/google/redirect",
)

const getGoogleAuthURL = () => {
    /*
     * Generate a url that asks permissions to the user's email and profile
     */
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ];

    return oauth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: scopes
    });
  }


exports.getUsers = getUsers
exports.signup = signup
exports.login = login
exports.getGoogleAuthURL = getGoogleAuthURL
exports.oauth2Client = oauth2Client
exports.signWithGoogle = signWithGoogle
exports.getCurrent = getCurrent
exports.signOut = signOut