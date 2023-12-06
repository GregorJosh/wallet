import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { lazy } from 'react';
import { useDispatch } from 'react-redux';

import { getPatterns } from 'redux/global/operations';

import SharedLayout from 'components/SharedLayout/SharedLayout';
import { PrivateRoute } from 'components/PrivateRoute/PrivateRoute';

const RegisterPage = lazy(() => import('pages/AuthPages/RegisterPage'));
const LoginPage = lazy(() => import('pages/AuthPages/LoginPage'));
const HomePage = lazy(() => import('pages/Home/Home.jsx'));
const StatisticsPage = lazy(() => import('pages/Statistics/Statistics.jsx'));

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPatterns());
  }, [dispatch]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route
            path="home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="statistics"
            element={
              <PrivateRoute>
                <StatisticsPage />
              </PrivateRoute>
            }
          />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
