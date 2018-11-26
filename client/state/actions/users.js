import 'isomorphic-fetch';

export const testapi = () => {
  return (dispatch)=>{
		return fetch('https://reqres.in/api/users')
	    .then(res => {
	      return res.json();
	    })
	    .then(users => {
        
	      dispatch({ type: 'USER_AUTHENTICATED', user: users })
	    })
  }
}
