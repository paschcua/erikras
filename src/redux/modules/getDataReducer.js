export default function reducer(state={
    fetchit: false,
    user: {
      email: null,
      pw: null,
      uuid: null,
    },
  }, action) {
    switch (action.type) {
      case 'ADD_USER_MAN': {
        return {...state, fetchit: true};
      }
      case 'ADD_USER_MAN_REJECTED': {
        return {...state, fetchit: false};
      }
      case 'ADD_USER_MAN_FULFILLED': {
        return {
          ...state,
          fetchit: true,
          user: action.payload,
        };
      }
    }
    return state;
}
