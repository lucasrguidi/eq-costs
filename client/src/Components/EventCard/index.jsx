import React from 'react';
import { Button, CardContainer, ImgContainer, TextContainer } from './styles';

function EventCard({ name, description, admin }) {
  return (
    <CardContainer>
      <TextContainer>
        <h1>{name}</h1>
        <p>{description}</p>
        <p>Criador: {admin}</p>
        <Button>Ver gastos</Button>
      </TextContainer>
    </CardContainer>
  );
}

export default EventCard;
