import { 
    KURULUS__LIST_REQUEST,
    KURULUS__LIST_SUCCESS,
    KURULUS__LIST_FAIL, 

    KURULUS__DETAILS_REQUEST,
    KURULUS__DETAILS_SUCCESS,
    KURULUS__DETAILS_FAIL,

    KURULUS__DELETE_FAIL,
    KURULUS__DELETE_REQUEST,
    KURULUS__DELETE_SUCCESS,

    KURULUS__CREATE_FAIL, 
    KURULUS__CREATE_REQUEST,
    KURULUS__CREATE_RESET,
    KURULUS__CREATE_SUCCESS,

    KURULUS__UPDATE_FAIL,
    KURULUS__UPDATE_REQUEST, 
    KURULUS__UPDATE_RESET,
    KURULUS__UPDATE_SUCCESS,

} from '../constans/kurulusConstans'
import axios from 'axios'



export const ListKurulus=()=> async(dispatch)=>{
    try {
        dispatch({type:KURULUS__LIST_REQUEST})
        const {data} = await axios.get('/api/kuruluslar/')

        dispatch({
            type:KURULUS__LIST_SUCCESS,
            payload:data
        })


        
    } catch (error) {
        dispatch({
            type: KURULUS__LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }

    



}


export const ListKurulusDetails =(id)=> async(dispatch)=>{

    try {
        dispatch({ type: KURULUS__DETAILS_REQUEST })

        const { data } = await axios.get(`/api/kuruluslar/${id}`)

        dispatch({
            type: KURULUS__DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: KURULUS__DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }

    



}



export const deleteKurulus = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: KURULUS__DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/kuruluslar/delete/${id}/`,
            config
        )

        dispatch({
            type: KURULUS__DELETE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: KURULUS__DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const createKurulus = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: KURULUS__CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(
            `/api/kuruluslar/create/` , {},
            config
        )

        dispatch({
            type: KURULUS__CREATE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: KURULUS__CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const updateKurulus = (kurulus) => async (dispatch, getState) => {
    try {
        dispatch({
            type: KURULUS__UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/kuruluslar/update/${kurulus._id}/`,
            kurulus,
            config
        )
        dispatch({
            type: KURULUS__UPDATE_SUCCESS,
            payload: data
        })


        dispatch({
            type: KURULUS__DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: KURULUS__UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}






