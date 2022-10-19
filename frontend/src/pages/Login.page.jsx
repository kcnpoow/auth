import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { loginAction } from '../store/user.slice/login.js'

export default function () {
  const validationSchema = yup.object().shape({
    email: yup.string().required('Email is required'),
    password: yup.string().required('Password is required')
  });

  const dispatch = useDispatch();
  const [error, setError] = useState('');

  return (
    <Container className='h-100 py-1' fluid>
      <Row className='h-100 align-items-center justify-content-center'>
        <Col sm={9} md={7} lg={5} xl={4}>
          <h1 className='mb-4 text-yellow font-weight-800 text-center'>Welcome Back!</h1>
          <p className='text-gray text-center'>Login to have access!</p>
          <div className='p-4 bg-gray rounded-3'>
            <Formik
              initialValues={{ email: 'email@email.com', password: 'asdasdasdS1' }}
              validationSchema={validationSchema}
              validateOnBlur={false}
              validateOnChange={false}
              onSubmit={async (values) => {
                const result = await dispatch(loginAction(values));

                if (result.meta.requestStatus === 'rejected') {
                  if (result.payload.status === 401 || result.payload.status === 404) {
                    setError('Email or password is incorrect');
                  } else {
                    setError('Error');
                  }
                  return;
                }
              }}
            >
              {({ values, errors, setFieldError, handleChange, handleSubmit }) => (
                <Form onSubmit={handleSubmit} onChange={e => {
                  setFieldError(e.target.id, '');
                  setError('');
                }}>
                  <Form.Group className='mb-3' controlId='email'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      className='rounded-4'
                      autoComplete='off'
                      placeholder='Enter email'
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
                  <Alert className={`${error === '' ? 'd-none' : 'd-block'} text-center`} variant='danger'>{error}</Alert>
                  <div className='mb-3'>
                    Need an account? <NavLink className='link text-purple' to='/register' type='button'>Sign Up Here</NavLink>
                  </div>
                  <Button className='w-100 text-purple font-weight-600 bg-yellow border-none rounded-0' type='submit'>
                    LOGIN
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