import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { upvote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    // get matching anecdotes
    let filteredAnecdotes = state.anecdotes.map((anecdote) => {
      if (anecdote.content.includes(state.filter)) {
        return anecdote;
      }
    });
    // remove undefined elements
    return filteredAnecdotes.filter((f) => f);
  });
  console.log(anecdotes);
  anecdotes.sort((a, b) => b.votes - a.votes);

  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(upvote(anecdote));
    dispatch(setNotification(`you voted '${anecdote.content}'`, 10));
  };

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
