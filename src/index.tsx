import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
const isStrictMode = true; // TODO: проверять значение из .env
const AppWrapper = isStrictMode ? React.StrictMode : React.Fragment;

root.render(
  <Provider store={store}>
    <AppWrapper>
      <Router>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </Router>
    </AppWrapper>
  </Provider>
);
