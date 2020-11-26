import React from 'react';
import Filter from './components/Filter';
import Notification from './components/Notification';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';

const App = () => {
  return (
    <div>
      <Filter />
      <Notification />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  );
};

export default App;
