import {CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS} from  '../constans/cartConstans'

import axios from 'axios'


export const addToCart=(id)=>async(dispatch,getState)=>{
    const {data} = await axios.get(`/api/kuruluslar/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
          kurulus: data._id,
          kurulus_adi: data.kurulus_adi,
          kurulus_logo: data.kurulus_logo,

       
        },
      })
      
    
      localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

export const removeFromCart = (id) => (dispatch, getState)=>{
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    })


}







