const { validationResult } = require("express-validator")
const User = require("../models/user")

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

const signup = async (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        res.status(422).send({error: "Invalid inputs passed!"})
        return
    }

    const { email, password } = req.body

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
        password
    })

    try {
        await createdUser.save()
    } catch (err) {
        res.status(500).send({error: "Signup failed."})
        return
    }

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

    res.json({
        message: "Logged in",
        user: existingUser[0].toObject({getters: true})
    })
}

exports.getUsers = getUsers
exports.signup = signup
exports.login = login