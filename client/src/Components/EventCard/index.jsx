import React from 'react';
import { Button, CardContainer, TextContainer } from './styles';
import { useNavigate } from 'react-router-dom';

function EventCard({ event }) {
  const { id, name, description, admin } = event;
  const navigate = useNavigate();

  const handleSeeExpenses = () => {
    navigate(`/events/${id}`);
  };

  return (
    <CardContainer>
      <TextContainer>
        <h1>{name}</h1>
        <p>{description}</p>
        <p>Criador: {admin}</p>
        <Button onClick={handleSeeExpenses}>Ver gastos</Button>
      </TextContainer>
    </CardContainer>
  );
}

export default EventCard;
