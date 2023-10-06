import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const EventsService = () => {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL_EVENTS,
  });

  const loadEvents = async () => {
    try {
      const token = localStorage.getItem('access_token');

      const { data } = await axiosInstance.get('', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return {
    loadEvents,
  };
};

export default EventsService;
