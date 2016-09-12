export function fetchItFn(fetchit, email, pw, uuid) {
  return function(dispatch) {
    dispatch({
      type: 'ADD_USER_MAN_FULFILLED',
      payload: {
        fetchit: fetchit,
        email: email,
        pw: pw,
        uuid: uuid,
      }
    });
  };
}
