import React, { useContext, useEffect, useState } from 'react';
import Footer from '../../Components/Footer';
import Navbar from '../../Components/Navbar';
import {
  Button,
  Container,
  Events,
  EventContainer,
  MainContainer,
  MenuBar,
  Details,
} from './styles';
import EventsService from '../../Services/EventsService';
import { useParams } from 'react-router-dom';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Event = () => {
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const eventsService = EventsService();

  useEffect(() => {
    setLoading(true);
    async function getEventDetails() {
      try {
        const data = await eventsService.loadEventDetails(id);
        setEventData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getEventDetails();
  }, [id]);

  return (
    <Container>
      <Navbar />
      <MainContainer>
        <EventContainer>
          <MenuBar>
            <Details>
              <h1>{eventData?.name || <Skeleton width={100} />}</h1>
              <p>{eventData?.description || <Skeleton width={100} />}</p>
            </Details>
            <Button onClick={() => setModalNewEventIsOpen(true)}>Nova despesa</Button>
          </MenuBar>
          <Events></Events>
        </EventContainer>
      </MainContainer>
      <Footer />
    </Container>
  );
};

export default Event;
