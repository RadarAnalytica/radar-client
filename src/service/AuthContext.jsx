import { createContext, useState, useEffect } from "react";
import { URL } from "./config";
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext


export const AuthProvider = ({ children }) => {

    const [authToken, setAuthToken] = useState()
    const [user, setUser] = useState(null)

    const navigate = useNavigate()

    const login = async (email, password) => {
        const response = await fetch(URL + '/api/user/signin', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        })
        const data = await response.json()
        if (response.status === 200) {
            setAuthToken(data)
            setUser(jwtDecode(data.token))
            localStorage.setItem('authToken', data)
            if (data.isOnboarded) {
                navigate('/dashboard')
            } else if (!data.isOnboarded) {
                navigate('/onboarding')
            }
        } else {
            alert('Something went wrong')
        }
    }

    const target = localStorage.getItem('accessToken')
    useEffect(() => {
        if (target) {
            setAuthToken(target)
            setUser(jwtDecode(target.token))
        }
    }, [target])

    const register = async (object) => {
        const res = await fetch(`${URL}/api/user/signup`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(object)
        })
        const data = res.json()
        setAuthToken(data)
        setUser(jwtDecode(data.token))
        localStorage.setItem('authToken', JSON.stringify(data))
        return data
    }

    // const [userImage, setUserImage] = useState()
    // useEffect(() => {
    //     user && user.id ? ServiceFunctions.getOneUser(user.id, authToken.token).then(data => setUserImage(data.image)) : setUserImage()
    // }, [])


    const logout = () => {
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem('authToken')
        window.location.reload()
    }

    // Offcanvas functions
    const [showMenu, setShowMenu] = useState(false)
    const handleOpenMenu = () => setShowMenu(true)
    const handleCloseMenu = () => setShowMenu(false)

    const contextData = {
        login: login,
        logout: logout,
        user: user,
        authToken: authToken,
        // userImage: userImage,
        showMenu: showMenu,
        handleCloseMenu: handleCloseMenu,
        handleOpenMenu: handleOpenMenu,
        register
    }

    useEffect(() => {
        let interval = setInterval(() => {
            if (user && user.exp * 1000 < Date.now()) {
                logout()
            }
        }, 6000)
        return () => clearInterval(interval)
    }, [])

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}