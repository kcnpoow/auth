import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import { registerAction } from '../store/user.slice/register.js';

export default function () {
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, 'The name should have a minimum length of 3 characters')
      .max(16, 'The name should have a maximum length of 16 characters')
      .required('Name is required'),
    email: yup
      .string()
      .email('Please enter a valid email address')
      .required('Email is required'),
    password: yup
      .string()
      .strict(true)
      .min(8, 'The password should have a minimum length of 8 characters')
      .max(32, 'The password should have a maximum length of 32 characters')
      .matches(/[A-Z]/, 'The password should have a minimum of 1 uppercase letter')
      .matches(/[a-z]/, 'The password should have a minimum of 1 lowercase letter')
      .matches(/\d/, 'The password should have a minimum of 1 digit')
      .trim('The password should not have spaces')
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required')
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  return (
    <Container className='h-100 py-1' fluid>
      <Row className='h-100 align-items-center justify-content-center'>
        <Col sm={9} md={7} lg={5} xl={4}>
          <h1 className='mb-4 text-yellow font-weight-800 text-center'>Welcome</h1>
          <p className='text-gray text-center'>Sign up to get started!</p>
          <div className='p-4 bg-gray rounded-3'>
            <Formik
              initialValues={{ name: 'name', email: 'email@email.com', password: 'asdasdasdS1', confirmPassword: 'asdasdasdS1' }}
              validationSchema={validationSchema}
              validateOnBlur={false}
              validateOnChange={false}
              onSubmit={async (values, { setFieldError }) => {
                const result = await dispatch(registerAction(values));
                setError('');

                if (result.meta.requestStatus === 'fulfilled') {
                  navigate('/login');
                  return;
                }

                if (result.meta.requestStatus === 'rejected') {
                  if (result.payload.status === 409) {
                    setFieldError('email', result.payload.message);
                  } else {
                    setError('Error');
                  }
                  return;
                }
              }}
            >
              {({ values, errors, setFieldError, handleChange, handleSubmit }) => (
                <Form onSubmit={handleSubmit} onChange={e => setFieldError(e.target.id, '')}>
                  <Form.Group className='mb-3' controlId='name'>
                    <Form.Label>Full name</Form.Label>
                    <Form.Control
                      className='rounded-4'
                      autoComplete='off'
                      placeholder='Enter name'
                      value={values.name}
                      onChange={handleChange('name')}
                    />
                    <Form.Text className='text-danger'>{errors.name}</Form.Text>
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='email'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      className='rounded-4'
                      autoComplete='off'
                      placeholder='Email'
                      value={values.email}
                      onChange={handleChange('email')}
                    />
                    <Form.Text className='text-danger'>{errors.email}</Form.Text>
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      className='rounded-4'
                      type='password'
                      autoComplete='off'
                      placeholder='Password'
                      value={values.password}
                      onChange={handleChange('password')}
                    />
                    <Form.Text className='text-danger'>{errors.password}</Form.Text>
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='confirmPassword'>
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control
                      className='rounded-4'
                      type='password'
                      autoComplete='off'
                      placeholder='Password'
                      value={values.confirmPassword}
                      onChange={handleChange('confirmPassword')}
                    />
                    <Form.Text className='text-danger'>{errors.confirmPassword}</Form.Text>
                  </Form.Group>
                  <Alert className={`${error === '' ? 'd-none' : 'd-block'} text-center`} variant='danger'>{error}</Alert>
                  <div className='mb-3'>
                    Already have an account? <NavLink className='link text-purple' to='/login' type='button'>Login here</NavLink>
                  </div>
                  <Button className='w-100 text-purple font-weight-600 bg-yellow border-none rounded-0' type='submit'>
                    SIGN UP
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </Col>
      </Row>
    </Container >
  );
}