import React, { useState, useEffect } from 'react';
import Logo from '../../Assets/logo-eq-costs.png';
import { Button, Container, Form, Welcome } from './styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormikInput from '../../Components/FormikInput';
import UserService from '../../Services/UserService';
import { Link } from 'react-router-dom';

function SignUp() {
  const [onQuery, setOnQuery] = useState(false);
  const userService = UserService();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(5, 'Username deve conter no mínimo 5 caracteres')
        .max(30, 'Username deve conter no máximo 30 caracteres')
        .required('Campo obrigatório')
        .matches(/^[a-zA-Z0-9_.]+$/, 'Nomes de usuário só podem conter letras, números _ e .'),
      email: Yup.string().email('Email inválido').required('Campo obrigatório'),
      password: Yup.string().required('Campo obrigatório'),
    }),
    onSubmit: async (values) => {
      setOnQuery(true);
      await userService.signup(values);
      setOnQuery(false);
    },
  });

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <Container>
      <Form onSubmit={formik.handleSubmit}>
        <img src={Logo} alt='Logotipo da Eq Costs' style={{ height: '8em', objectFit: 'cover' }} />
        <Welcome>
          <h2>Cadastre-se! 👋🏻</h2>
          <p>Já possui uma conta?</p>
          <Link to={'/login'}>Faça login!</Link>
        </Welcome>
        <FormikInput
          name='username'
          label='Usuário'
          placeholder='Digite o seu usuário'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          type='text'
          touched={formik.touched}
          errors={formik.errors}
        />
        <FormikInput
          name='email'
          label='Email'
          placeholder='Digite o seu email'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          type='text'
          touched={formik.touched}
          errors={formik.errors}
        />
        <FormikInput
          name='password'
          label='Senha'
          placeholder='Digite a sua senha'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          type='password'
          touched={formik.touched}
          errors={formik.errors}
        />
        <Button type='submit' disabled={onQuery}>
          {onQuery ? 'Entrando...' : 'Entrar'}
        </Button>
      </Form>
    </Container>
  );
}

export default SignUp;
