import React, { useEffect, useState } from 'react';
import Footer from '../../Components/Footer';
import Navbar from '../../Components/Navbar';
import SearchInput from '../../Components/SearchInput';
import {
  Button,
  Container,
  Events,
  EventsContainer,
  MainContainer,
  MenuBar,
  NoEventsFound,
} from './styles';
import EventCard from '../../Components/EventCard';
import EventsService from '../../Services/EventsService';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const eventsService = EventsService();

  useEffect(() => {
    async function getEvents() {
      const events = await eventsService.loadEvents();
      setEvents(events);
    }

    getEvents();
  }, []);

  const handleSearch = ({ target }) => {
    setSearch(target.value);
  };

  const filteredEvents = events.filter((event) => {
    return event.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <Container>
      <Navbar />
      <MainContainer>
        <EventsContainer>
          <MenuBar>
            <SearchInput placeholder='Buscar evento' type='text' onChange={handleSearch} />
            <Button>Novo evento</Button>
          </MenuBar>
          <Events>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  name={event.name}
                  description={event.description}
                  admin={event.admin}
                />
              ))
            ) : (
              <NoEventsFound>Nenhum evento encontrado</NoEventsFound>
            )}
          </Events>
        </EventsContainer>
      </MainContainer>
      <Footer />
    </Container>
  );
};

export default Home;