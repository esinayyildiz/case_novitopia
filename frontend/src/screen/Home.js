import React,{useState,useEffect} from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import Kurulus from '../component/Kurulus'
import axios from 'axios'
import { ListKurulus } from '../actions/kurulusListActions'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../component/Loader'
import Message from '../component/Message'



function Home() {
  const dispatch =useDispatch()
  const kurulusList = useSelector(state=>state.kurulusList)
  const {loading,error,kuruluslar} = kurulusList

  useEffect(()=>{

    dispatch(ListKurulus())   
    

  }, [dispatch])


  return (
    <div>
      {loading ? <Loader/>
       :error ? <Message variant='danger'>{error}</Message>
       :
            <Row>
            {kuruluslar.map(kurulus=>(

                <Col key ={kurulus._id} sm = {12} md = {6} lg = {4} xl = {3}>
                      <Kurulus kurulus = {kurulus}/>

                 </Col>

            ))}

        </Row>
}
    </div>
  )
}

export default Home