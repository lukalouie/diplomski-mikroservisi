import React, {useState, createContext} from 'react';

const AuthContext = createContext({
    loggedIn: false,
    logIn: function() {},
    logOut: function() {}
})

export function AuthContextProvider(props) {

    const [loggedIn, setLoggedIn] = useState(false)

    function isLoggedIn() {
        return loggedIn
    }

    function logInHandler() {
        setLoggedIn(true)
    }

    function logOutHandler() {
        setLoggedIn(false)
    }

    const context = {
        loggedIn: loggedIn,
        logIn: logInHandler,
        logOut: logOutHandler
    }

    return <AuthContext.Provider value={context}>
            {props.children}
    </AuthContext.Provider>

}

export default AuthContext