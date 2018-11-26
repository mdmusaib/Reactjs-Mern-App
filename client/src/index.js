import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';

import * as serviceWorker from './serviceWorker';
const initial={
	user:[]
}
function reducer(state=initial,action){
	switch(action.type){
		case "USERS":
			return {
			user:state.user.concat(action.data)
	}
		case "ADDUSER":
			return {
			user:state.user.concat(action.data)
		}

		case "UPDATEUSER":
    return {
    	...state,
    	user:state.user.map(p=>p._id === action.data._id?
    		{...p ,username:action.data.username,address:action.data.address,contact:action.data.contact,email:action.data.email}:
  		p
    	 )
    	}

    	case "DELETEUSER":
    		return  {
    		user: [...state.user.filter(item => item !== action.data)],
  }

	default: 
			return state;	
	}
	
}


const store = createStore(reducer);



render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)



serviceWorker.unregister();
