const initialState = '';

export const filterChange = (filter) => {
  return {
    type: 'SET_FILTER',
    filter,
  };
};

const reducer = (state = initialState, action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'SET_FILTER':
      return action.filter;
    default:
      return state;
  }
};

export default reducer;
