const initialState = null;

export const voteAnecdoteNotif = (content) => {
  return {
    type: 'SET_NOTIFICATION',
    notification: `you voted '${content}'`,
  };
};

export const createAnecdoteNotif = (content) => {
  return {
    type: 'SET_NOTIFICATION',
    notification: `you created '${content}'`,
  };
};

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
    notification: null,
  };
};

const reducer = (state = initialState, action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification;
    case 'REMOVE_NOTIFICATION':
      return action.notification;
    default:
      return state;
  }
};

export default reducer;
