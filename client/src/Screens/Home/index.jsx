import React, { useContext, useEffect, useState } from 'react';
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
import Modal from '../../Components/Modal';
import ModalNewEvent from './Utils/ModalNewEvent';
import { AuthContext } from '../../Context/AuthContext';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [modalNewEventIsOpen, setModalNewEventIsOpen] = useState(false);

  const authContext = useContext(AuthContext);

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
        {modalNewEventIsOpen && <ModalNewEvent setModal={setModalNewEventIsOpen} />}

        <EventsContainer>
          <MenuBar>
            <SearchInput placeholder='Buscar evento' type='text' onChange={handleSearch} />
            <Button onClick={() => setModalNewEventIsOpen(true)}>Novo evento</Button>
          </MenuBar>
          <Events>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => <EventCard key={event.id} event={event} />)
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
