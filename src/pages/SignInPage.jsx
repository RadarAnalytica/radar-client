import React, { useContext, useEffect } from 'react';
import SignInForm from '../containers/SignInForm';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../service/AuthContext';

const SignInPage = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    const handleNavigation = () => {
      if (!user) return;

      if (!user.subscription_status) {
        navigate('/tariffs');
      } else if (user.is_onboarded) {
        navigate('/linked-shops');
      } else {
        navigate('/onboarding');
      }
    };
    handleNavigation();
    //setTimeout(handleNavigation, 300);
  }, [navigate, user]);

  return (
    <div className='signin-page'>
      <SignInForm />
    </div>
  );
};

export default SignInPage;
