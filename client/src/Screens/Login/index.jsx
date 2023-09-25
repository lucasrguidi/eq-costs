import React, { useState, useEffect } from 'react';
import Logo from '../../Assets/logo-eq-costs.png';
import { Button, Container, Form, Welcome } from './styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormikInput from '../../Components/FormikInput';
import UserService from '../../Services/UserService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const userService = new UserService();

function Login() {
  const [onQuery, setOnQuery] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Email inválido').required('Campo obrigatório'),
      password: Yup.string().required('Campo obrigatório'),
    }),
    onSubmit: async (values) => {
      setOnQuery(true);
      try {
        const response = await userService.login(values);
        if (response) {
          toast.success('Logado com sucesso!');
          navigate('/home');
        }
      } catch (error) {
        toast.error('Email ou senha inválidos');
      } finally {
        setOnQuery(false);
      }
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
          <h2>Bem-vindo! 👋🏻</h2>
          <p>Não possui uma conta?</p>
          <a>Cadastre-se!</a>
        </Welcome>
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

export default Login;
