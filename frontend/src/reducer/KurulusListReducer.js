import{KURULUS__LIST_REQUEST,
    KURULUS__LIST_SUCCESS,
    KURULUS__LIST_FAIL,
    KURULUS__DETAILS_REQUEST,
    KURULUS__DETAILS_SUCCESS,
    KURULUS__DETAILS_FAIL,KURULUS__DELETE_REQUEST,KURULUS__DELETE_SUCCESS,
    KURULUS__DELETE_FAIL,KURULUS__CREATE_REQUEST,KURULUS__CREATE_SUCCESS,KURULUS__CREATE_FAIL,
    KURULUS__CREATE_RESET, KURULUS__UPDATE_REQUEST,KURULUS__UPDATE_SUCCESS,
    KURULUS__UPDATE_FAIL,KURULUS__UPDATE_RESET
} from '../constans/kurulusConstans'

export default function KurulusListReducer (state={kuruluslar:[]},action){
    switch(action.type){
        case KURULUS__LIST_REQUEST:
            return {loading:true, kuruluslar:[]}
        case KURULUS__LIST_SUCCESS:
            return {loading:false, kuruluslar:action.payload}
        case KURULUS__LIST_FAIL:
            return {loading:false, error:action.payload}

        default:
            return state

    }


}

export const KurulusDetailsReducer= (state={kurulus: {reviews :[] }},action)=>{
    switch(action.type){
        case KURULUS__DETAILS_REQUEST:
            return {loading:true, ...state}
        case KURULUS__DETAILS_SUCCESS:
            return {loading:false, kurulus:action.payload}
        case KURULUS__DETAILS_FAIL:
            return {loading:false, error: action.payload}

        default:
            return state

    }


}


export const kurulusDeleteReducer =(state={ }, action)=>{
    switch (action.type){
        case KURULUS__DELETE_REQUEST:
            return {loading:true }
        case KURULUS__DELETE_SUCCESS:
            return {loading:false, success:true}
        case KURULUS__DELETE_FAIL:
            return {loading:false, error: action.payload}
        
    

        default:
            return state
    }

}


export const KurulusCreateReducer =(state={ }, action)=>{
    switch (action.type){
        case KURULUS__CREATE_REQUEST:
            return {loading:true }
        case KURULUS__CREATE_SUCCESS:
            return {loading:false, success:true, kurulus: action.payload}
        case KURULUS__CREATE_FAIL:
            return {loading:false, error: action.payload}
        case KURULUS__CREATE_RESET:
                return {}
        
    

        default:
            return state
    }

}


export const kurulusUpdateReducer = (state = { kurulus: {} }, action) => {
    switch (action.type) {
        case KURULUS__UPDATE_REQUEST:
            return { loading: true }

        case KURULUS__UPDATE_SUCCESS:
            return { loading: false, success: true, kurulus: action.payload }

        case KURULUS__UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case KURULUS__UPDATE_RESET:
            return { kurulus: {} }

        default:
            return state
    }
}
