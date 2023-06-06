import React, {useState, useEffect}  from 'react'
import { useParams,useNavigate  } from 'react-router-dom'
import '../my.css'
import { Row, Col, Container } from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import { Button} from 'react-bootstrap'
import axios from 'axios'
import kuruluslar from '../kurulus'
import {ListKurulusDetails} from '../actions/kurulusListActions'
import Loader from '../component/Loader'
import Message from '../component/Message'

function KurulusScreen() {


  const {id} =useParams();
  const dispatch = useDispatch()
  const {loading,error} = ListKurulusDetails
  const kurulus = kuruluslar.find((p)=>p._id ===(id));


  useEffect(()=>{
       dispatch(ListKurulusDetails(`${id}`))
       



}, []) 

let navigate = useNavigate();
const addTaCartHandler=()=>{
  let path =(`/cart/${id}`)
  navigate(path);


}



  return (
    
    <div>
        {loading ? <Loader/>
       :error ? <Message variant='danger'>{error}</Message>
       :

      
        <Row>
        <div className='header'>
            <div className='row'>
                <div className='col-md-9'> <h2 className='kurulus-title underline'>{kurulus.kurulus_adi} </h2> </div>
            </div>
        </div>
        <div className='container-body mt-20'>
            <div className='row'>
            <div className='col-md-5'>
                <ul>
                    <li> Kategori :{kurulus.kurulus_turu} </li>
                    <li> Yer:{kurulus.ulke} </li>
                    <li> Web sitesi :{kurulus.web_site} </li>
                    <li> Çalışan sayısı :{kurulus.calisan_sayisi} </li>



                </ul>
                
     
                <div className='col-md-12 mt-20'>
                <Button onClick={addTaCartHandler} variant='warning'> <i className="fa-solid fa-cart-shopping"></i> fdgdffffffffffff Ekle</Button>

                </div>
                
             </div>
            <div className='col-md-7'>  
            <img src={kurulus.kurulus_logo} className="card-img img-fluid img-detail-full"></img>
            </div>


            </div>

            </div>

      </Row>

        
}
        </div>

  )
  }  
export default KurulusScreen