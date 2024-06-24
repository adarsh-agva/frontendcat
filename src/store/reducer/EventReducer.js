import{
    EVENT_REQUEST,
    EVENT_SUCCESS,
    EVENT_FAIL,
}from "../types/EventConstants";

export const eventReducer = (state ={},action)=>{
    switch(action.type){
        case EVENT_REQUEST:
            return{
                loading:true,
            };
        case EVENT_SUCCESS:
            return{
                loading:false,
                data: action.payload,
            };
        case EVENT_FAIL:
            return{
                loading:false,
                error: action.payload,
            };    
    default:
        return state;
    }
};
