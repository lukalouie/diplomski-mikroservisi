import React, {useState, createContext} from 'react';

const AuthContext = createContext({
    loggedIn: false,
    logIn: function() {},
    logOut: function() {},
    user: {},
    getUser: function() {},
    setUser: function(user) {}
})

export function AuthContextProvider(props) {

    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState({})

    async function getUserHandler() {
        return user
    }

    function isLoggedIn() {
        return loggedIn
    }

    function logInHandler() {
        setLoggedIn(true)
    }

    function logOutHandler() {
        setLoggedIn(false)
    }

    function setUserHandler(user) {
        setUser(user)
    }

    const context = {
        loggedIn: loggedIn,
        logIn: logInHandler,
        logOut: logOutHandler,
        user: user,
        getUser: getUserHandler,
        setUser: setUserHandler
    }

    return <AuthContext.Provider value={context}>
            {props.children}
    </AuthContext.Provider>

}

export default AuthContext