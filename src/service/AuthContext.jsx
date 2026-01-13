import {
  createContext,
  useState,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { URL } from './config';
import { jwtDecode } from 'jwt-decode';
import { useCookie } from './utils';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const decode = (token) => {
    try {
      if (token) {
        return jwtDecode(token);
      }
      
    } catch (error) {
      console.error('Error decoding token:', error);
      // deleteCookie('radar');
    }
  };

  const [value, deleteCookie] = useCookie('radar');
  const [authToken, setAuthToken] = useState();
  const [adminToken, setAdminToken] = useState();
  const [user, setUser] = useState(decode(value));
  const [ impersonateUser, setImpersonateUser] = useState(null)
  let prevToken = authToken;

  useEffect(() => {
    if (value && value !== prevToken) {
      const user = decode(value);
      setAuthToken(value);
      setUser(user);

      if (user?.role?.toLowerCase() === 'admin') {
        setAdminToken(value)
      }
    }

    console.log('user', user);
  }, [value]);


  // To delete the cookie:
  // deleteCookie();
  // const decodedValue = useCookie('radar');

  // console.log('decodedValue', decodedValue);

  // const updateUser = (user) => {
  //   this.setState((prevState) => ({ user }));
  // };
  //
  // const navigate = useNavigate();
  const login = async (email, password, setError, setShow) => {
    if (!password || !email) {
      setError('Введите корректное значение для всех полей');
      return;
    }

    try {
      const response = await fetch(`${URL}/api/user/login`, {
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

      if (data?.token === 'undefined') {
        setError('Неверный логин или пароль');
        setShow(true);
        return;
      }

      setAuthToken(value);
      setUser(decode(value));
      window.location = `${URL}/main`;
    } catch (error) {
      setError('Произошла ошибка при входе');
      setShow(true);
    }
  };
  // const target = localStorage.getItem('authToken');
  //   useEffect(() => {    if (target && target !== "undefined") {
  //       setAuthToken(target);
  //       try {
  //         const decodedUser = jwtDecode(target);
  //         setUser(decodedUser);
  //       } catch (error) {
  //         console.error("Error decoding token:", error);
  //         // Handle the error appropriately, e.g., clear the invalid token
  //         localStorage.removeItem('authToken');
  //         localStorage.removeItem('activeShop');
  //       }
  //     }
  //   }, [target]);

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

  const refreshUserPromiseRef = useRef(null);
  const refreshSubscriptionCheckPromiseRef = useRef(null);
  const refreshOnboardingCheckPromiseRef = useRef(null);

  // const [userImage, setUserImage] = useState()
  // useEffect(() => {
  //     user && user.id ? ServiceFunctions.getOneUser(user.id, authToken.token).then(data => setUserImage(data.image)) : setUserImage()
  // }, [])

  const logout = async () => {
    document.cookie = `radar=;max-age=-1;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=${URL.split('://')[1]}`;
    document.cookie = `radar=;max-age=-1;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=.${URL.split('://')[1]}`;
    document.cookie = `radar=;max-age=-1;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=${window.location.hostname}`;
    document.cookie = `radar=;max-age=-1;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=.${window.location.hostname}`;
    // Delete cookie using the hook's deleteCookie function
    deleteCookie();

    if (user?.email === 'demo@radar.ru') {
      window.location.replace(`${URL}/signup`);
    } else {
      setAuthToken(null);
      setUser(null);
      window.location.replace(URL);
    }
  };

  const refreshUser = async () => {
    if (refreshUserPromiseRef.current) {
      return refreshUserPromiseRef.current;
    }

    const refreshPromise = (async () => {
      const maxAttempts = 5;
      const delay = 1000;
      
      try {
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
          try {
            const headers = {
              'content-type': 'application/json',
            };
            
            if (authToken) {
              headers.authorization = 'JWT ' + authToken;
            }
            
            const res = await fetch(`${URL}/api/user/refresh`, {
              method: 'GET',
              headers,
            });
            const data = await res.json();
            
            if (res.ok && data?.token) {
              // Обновляем токен в cookie
              Cookies.set('radar', data.token, { expires: 7 });
              
              setAuthToken(data.token);
              setUser(decode(data.token));
              
              return { success: true, token: data.token };
            }
          } catch (error) {
            console.error(`Попытка ${attempt} не удалась:`, error);
          }
          
          if (attempt < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, delay));
          }
        }
        
        return { success: false, token: null };
      } finally {
        refreshUserPromiseRef.current = null;
      }
    })();

    refreshUserPromiseRef.current = refreshPromise;
    return refreshPromise;
  };

  const refreshSubscriprionCheck = async () => {
    if (refreshSubscriptionCheckPromiseRef.current) {
      return refreshSubscriptionCheckPromiseRef.current;
    }

    const refreshPromise = (async () => {
      const maxAttempts = 5;
      const delay = 1000;
      
      try {
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
          try {
            const headers = {
              'content-type': 'application/json',
            };
            
            if (authToken) {
              headers.authorization = 'JWT ' + authToken;
            }
            
            const res = await fetch(`${URL}/api/user/refresh`, {
              method: 'GET',
              headers,
            });
            const data = await res.json();
            
            if (res.ok && data?.token) {
              Cookies.set('radar', data.token, { expires: 7 });
              
              setAuthToken(data.token);
              const decodedUser = decode(data.token);
              setUser(decodedUser);
              
              const subscriptionStatus = decodedUser?.subscription_status;
              const isValidSubscription = subscriptionStatus !== null && subscriptionStatus?.toLowerCase() !== 'expired';
              
              return { success: isValidSubscription, token: data.token };
            }
          } catch (error) {
            console.error(`Попытка ${attempt} не удалась:`, error);
          }
          
          if (attempt < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, delay));
          }
        }
        
        return { success: false, token: null };
      } finally {
        refreshSubscriptionCheckPromiseRef.current = null;
      }
    })();

    refreshSubscriptionCheckPromiseRef.current = refreshPromise;
    return refreshPromise;
  };

  const refreshOnboardingCheck = async () => {
    if (refreshOnboardingCheckPromiseRef.current) {
      return refreshOnboardingCheckPromiseRef.current;
    }

    const refreshPromise = (async () => {
      const maxAttempts = 5;
      const delay = 1000;
      
      try {
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
          try {
            const headers = {
              'content-type': 'application/json',
            };
            
            if (authToken) {
              headers.authorization = 'JWT ' + authToken;
            }
            
            const res = await fetch(`${URL}/api/user/refresh`, {
              method: 'GET',
              headers,
            });
            const data = await res.json();
            
            if (res.ok && data?.token) {
              Cookies.set('radar', data.token, { expires: 7 });
              
              setAuthToken(data.token);
              const decodedUser = decode(data.token);
              setUser(decodedUser);
              
              const isOnboarded = decodedUser?.is_onboarded === true;
              
              return { success: isOnboarded, token: data.token };
            }
          } catch (error) {
            console.error(`Попытка ${attempt} не удалась:`, error);
          }
          
          if (attempt < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, delay));
          }
        }
        
        return { success: false, token: null };
      } finally {
        refreshOnboardingCheckPromiseRef.current = null;
      }
    })();

    refreshOnboardingCheckPromiseRef.current = refreshPromise;
    return refreshPromise;
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
      refreshUser,
      refreshSubscriprionCheck,
      refreshOnboardingCheck,
      adminToken,
      setAuthToken,
      impersonateUser,
      setImpersonateUser
    }),
    [user, authToken]
  );

  // useEffect(() => {
  //   let interval = setInterval(() => {
  //     if (user && user.exp * 1000 < Date.now()) {
  //       logout();
  //     }
  //   }, 6000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
