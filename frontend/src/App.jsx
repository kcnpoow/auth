import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authAction } from './store/user.slice/auth.js'
import PrivateRoute from './components/PrivateRoute.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import HomePage from './pages/Home.page.jsx';
import LoginPage from './pages/Login.page.jsx';
import RegisterPage from './pages/Register.page.jsx';
import style from './style.module.css';

export default function () {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(authAction());
  }, []);

  if (isLoading) {
    return 'Loading...';
  }

  return (
    <div className={style.wrapper}>
      <div className={style.wrapperInner}>
        <Routes>
          <Route path='/' element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          } />
          <Route path='login' element={
            <ProtectedRoute>
              <LoginPage />
            </ProtectedRoute>
          } />
          <Route path='register' element={
            <ProtectedRoute>
              <RegisterPage />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </div>
  );
}