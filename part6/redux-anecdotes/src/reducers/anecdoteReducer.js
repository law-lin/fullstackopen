import anecdoteService from '../services/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};
// Action creators
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    });
  };
};

export const upvote = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.voteAnecdote(anecdote);
    dispatch({
      type: 'UPVOTE',
      data: { id: anecdote.id },
    });
  };
};

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(anecdote);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    });
  };
};

const reducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'UPVOTE':
      const id = action.data.id;
      const anecdoteToUpvote = state.find((a) => a.id === id);
      const changedAnecdote = {
        ...anecdoteToUpvote,
        votes: anecdoteToUpvote.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    case 'NEW_ANECDOTE':
      return [...state, action.data];
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return state;
  }
};

export default reducer;
