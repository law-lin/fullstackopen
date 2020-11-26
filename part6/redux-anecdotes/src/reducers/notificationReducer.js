const initialState = null;

export const setNotification = (notification, seconds) => {
  return async (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
        notification: null,
      });
    }, 10000);
    dispatch({
      type: 'SET_NOTIFICATION',
      notification,
    });
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
