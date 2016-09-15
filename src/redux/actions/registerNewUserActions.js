export function registerNewUser(fetchit, email, pw, uuid) {
  return function(dispatch) {
    dispatch({
      type: 'REGISTER_NEW_USER_FULFILLED',
      payload: {
        email: email,
        pw: pw,
        uuid: uuid,
      }
    });
  };
}
