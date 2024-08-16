import { createContext, useState, useEffect, useMemo } from 'react';
import { URL } from './config';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState();
  const [user, setUser] = useState(null);

  const token = document.cookie.split(';')
    .find(c => c.trim().startsWith('radar='))
    ?.split('=')[1];

  // useEffect(() => {
  //   const token = document.cookie.split(';')
  //     .find(c => c.trim().startsWith('radar='))
  //     ?.split('=')[1];
  //   if (token) {
  //     setAuthToken(token);
  //     setUser(jwtDecode(token));
  //   }
  // }, []);
  console.log('token', token);

  const updateUser = (user) => {
    this.setState((prevState) => ({ user }));
  };

  const navigate = useNavigate();
  const login = async (email, password, setError, setShow) => {
    if (!password || !email) {
      setError('Введите корректное значение для всех полей');
      return;
    }
    
    try {
      const response = await fetch(URL + '/api/user/signin', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      });
  
      const data = await response.json();
  
      if (response.status === 303) {
        window.location = data.redirect;
        return;
      }
      if (response.status !== 200) {
        setError(data.message);
        setShow(true);
        return;
      }
  
      if (data?.token === "undefined") {
        setError('Неверный логин или пароль');
        setShow(true);
        return;
      }
  
      setAuthToken(data);
      setUser(jwtDecode(data?.token));
      localStorage.setItem('authToken', data?.token);
  
      if (data.isOnboarded) {
        navigate('/dashboard');
      } else {
        navigate('/onboarding');
      }
    } catch (error) {
      setError('Произошла ошибка при входе');
      setShow(true);
    }
  };
const target = localStorage.getItem('authToken');
  useEffect(() => {    if (target && target !== "undefined") {
      setAuthToken(target);
      try {
        const decodedUser = jwtDecode(target);
        setUser(decodedUser);
      } catch (error) {
        console.error("Error decoding token:", error);
        // Handle the error appropriately, e.g., clear the invalid token
        localStorage.removeItem('authToken');
        localStorage.removeItem('activeShop');
      }
    }
  }, [target]);

  const register = async (object) => {
    const res = await fetch(`${URL}/api/user/signup`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(object),
    });
    const data = await res.json();
    return data;
  };

  const [dataobject, setDataobject] = useState();

  const [showMobile, setShowMobile] = useState(false);

  // const [userImage, setUserImage] = useState()
  // useEffect(() => {
  //     user && user.id ? ServiceFunctions.getOneUser(user.id, authToken.token).then(data => setUserImage(data.image)) : setUserImage()
  // }, [])

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('dashboard');
    localStorage.removeItem('activeShop');
  };

  // Offcanvas functions
  const [showMenu, setShowMenu] = useState(false);
  const handleOpenMenu = () => setShowMenu(true);
  const handleCloseMenu = () => setShowMenu(false);

  const contextData = useMemo(
    () => ({
      login,
      logout,
      user,
      authToken,
      setUser,
      showMenu,
      handleCloseMenu,
      handleOpenMenu,
      register,
      dataobject,
      setDataobject,
      showMobile,
      setShowMobile,
    }),
    [user, authToken]
  );

  useEffect(() => {
    let interval = setInterval(() => {
      if (user && user.exp * 1000 < Date.now()) {
        logout();
      }
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
