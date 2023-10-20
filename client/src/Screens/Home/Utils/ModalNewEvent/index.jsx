import React, { useState } from 'react';
import { Form, Button } from './styles';
import { Field, useFormik } from 'formik';
import * as Yup from 'yup';
import FormikInput from '../../../../Components/FormikInput';
import EventsService from '../../../../Services/EventsService';
import Modal from '../../../../Components/Modal';
import FormikTextArea from '../../../../Components/FormikTextArea';
import { useNavigate } from 'react-router-dom';

function ModalNewEvent({ setModal }) {
  const [onQuery, setOnQuery] = useState(false);
  const eventsService = EventsService();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Campo obrigatório'),
      description: Yup.string().required('Campo obrigatório'),
    }),
    onSubmit: async (values) => {
      setOnQuery(true);
      const response = await eventsService.createEvent(values);
      setOnQuery(false);
      if (response) {
        setModal(false);
        navigate('/');
      }
    },
  });

  return (
    <Modal title='Novo evento' setModal={setModal}>
      <Form onSubmit={formik.handleSubmit}>
        <FormikInput
          name='name'
          label='Nome'
          placeholder='Nome do evento'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          type='text'
          touched={formik.touched}
          errors={formik.errors}
        />
        <FormikTextArea
          name='description'
          label='Descrição'
          placeholder='Descrição do evento'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
          touched={formik.touched}
          errors={formik.errors}
          rows={4}
        />
        <Button type='submit' disabled={onQuery}>
          {onQuery ? 'Criando...' : 'Criar'}
        </Button>
      </Form>
    </Modal>
  );
}

export default ModalNewEvent;
