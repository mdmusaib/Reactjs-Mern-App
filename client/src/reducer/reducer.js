import * as actionType from './action';

const initialState={
	user:[]
};

const reducer= (state=initialState,action)=>{
	console.log(action);
	switch(action.type){
		case actionType.ADD_USER:
		return {
			...state,
		}
		case actionType.UPDATE_USER:
		return{
			...state,
		}
		case actionType.DELETE_USER:
		return {
			...state,
		}
		default:
		return state;
	}
};

export default reducer;