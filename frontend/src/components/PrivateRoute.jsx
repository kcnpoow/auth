import React from 'react';
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

export default function (props) {
  const { isAuthenticated } = useSelector(state => state.user);

  if (!isAuthenticated) {
    return <Navigate to='login' />
  }

  return props.children;
}