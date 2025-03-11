import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthContext, { AuthProvider } from './service/AuthContext';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </AuthProvider>
    </Router>
    {/* </React.StrictMode> */}
  </Provider>
);