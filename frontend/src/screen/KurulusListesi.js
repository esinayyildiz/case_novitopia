import React, {useState, useEffect}  from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../my.css'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import {  createKurulus, deleteKurulus, ListKurulus } from '../actions/kurulusListActions';
import { Row, Col, Table} from 'react-bootstrap'
import Loader from '../component/Loader'
import Message from '../component/Message'
import {LinkContainer} from 'react-router-bootstrap'


function KurulusListesi() {

    const dispatch = useDispatch()
    const history = useNavigate()

    const kurulusList = useSelector(state=>state.kurulusList)
    const {loading, error, kuruluslar} = kurulusList

    const kurulusDelete = useSelector(state=>state.kurulusDelete)
    const {loading:loadingDelete, error:errorDelete, success:successDelete} = kurulusDelete

    const kurulusCreate = useSelector(state=>state.kurulusCreate)
    const {loading:loadingCreate, error:errorCreate, success:successCreate, kurulus:createdKurulus} = kurulusCreate

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin


    useEffect(() => {
        if (!userInfo) {
            history('/login')
        } 
        if(successCreate){
            history(`/admin/kurulus/${createdKurulus._id}/edit`)
        }
        

         else {
            dispatch(ListKurulus())
        }

    }, [dispatch, history, userInfo,createdKurulus,successCreate,successDelete])

    const creteKurulusHandler = () => {
        dispatch(createKurulus())
    }

    const deleteHandler = (id)=>{
        if(window.confirm('Silmek istediğine emin misin ? '))
        {
            dispatch(deleteKurulus(id))
        }
    }

  

  return (
    <div>
        <Row>
            <Col md={10}>
            <h2 className='kurulus-title'>Kuruluslar</h2>

                
            </Col>
            <Col md={2} className="text-right">
            <Button onClick={creteKurulusHandler} className='my-3'> <i className='fas fa-plus'></i> Kurulus ekle</Button>


            </Col>

        </Row>

        {loadingDelete && <Loader/>}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
        {loading ? (<Loader/>)
    : error ? (<Message variant='danger'>{error}</Message> ):
    (

            <div>
               <Table striped responsive className='table-sm'>
               <thead>
                        <tr>
                            <th>ID</th>
                            <th>İsim</th>
                            <th>Ülke</th>
                            <th>kategori</th>
                            <th>çalışan sayısı</th>
                            <th>İşlem</th>

                        </tr>

                    </thead>

                    <tbody>
                        {kuruluslar.map(kurulus=>(
                            <tr key={kurulus._id}>
                                <td>{kurulus._id}</td>
                                <td>{kurulus.kurulus_adi}</td>
                                <td>{kurulus.ulke}</td>
                                <td>{kurulus.kurulus_turu}</td>
                                <td>{kurulus.calisan_sayisi}</td>

                                <td>
                            <LinkContainer to=''><Button><i className='fas fa-edit'></i> </Button></LinkContainer>
                            <Button onClick={()=>deleteHandler(kurulus._id)} ><i className='fas fa-trash'></i> </Button>
                            


                        </td>




                            </tr>



                        ))}


                    </tbody>

                </Table>





            </div>






        )
        
    } 




    </div>
  )
}

export default KurulusListesi