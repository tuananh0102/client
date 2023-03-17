import {createContext} from 'react'

const AuthContext = createContext({
    auth: false,
    setAuth: (auth) => {}
})

export default AuthContext