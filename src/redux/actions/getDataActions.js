export function fetchItFn(fetchit, email, pw, uuid) {
  return {
    type: 'ADD_USER_MAN',
    payload: {
      fetchit,
      email,
      pw,
      uuid,
    }
  };
}
