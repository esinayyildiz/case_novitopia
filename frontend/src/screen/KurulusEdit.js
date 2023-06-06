import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {  Form, Button} from 'react-bootstrap'
import Message from '../component/Message'
import FormContainer from '../component/FormContainer'
import Loader from '../component/Loader'
import { Link } from 'react-router-dom'
import { KURULUS__UPDATE_RESET } from '../constans/kurulusConstans'
import { updateKurulus, ListKurulusDetails } from '../actions/kurulusListActions'
import axios from 'axios'

function KurulusEdit() {

  const {id} = useParams();

  

  const [kurulus_adi, setKurulus_adi] =useState('')
  const [calisan_sayisi, setCalisan_sayisi] =useState(0)
  const [kurulus_logo, setKurulus_logo] =useState('')
  const [web_site, setWeb_site] =useState('') 
  const [kurulus_turu, setKurulus_turu] =useState('')
  const [ulke, setUlke] =useState('')
  const [uploading, setUploading] =useState(false)
  
  const dispatch = useDispatch()
  const history = useNavigate()

  const ListKurulusDetail = useSelector(state=>state.ListKurulusDetail)
  const {error, loading, kurulus} = ListKurulusDetail

  const kurulusUpdate = useSelector(state=>state.kurulusUpdate)
  const {error :errorUpdate, loading:loadingUpdate, success: successUpdate} = kurulusUpdate



  useEffect(() => {

      
        if (successUpdate) {
            dispatch({type:KURULUS__UPDATE_RESET})
            history('/admin/kuruluslist')
        } else {
            if (!kurulus.kurulus_adi  || kurulus._id !== Number(id)) {
                dispatch(ListKurulusDetails(id))
            } else {
                setKurulus_adi(kurulus.kurulus_adi)
                setKurulus_logo(kurulus.kurulus_logo)
                setUlke(kurulus.ulke)
                setKurulus_turu(kurulus.kurulus_turu)
                setWeb_site(kurulus.web_site)
                setCalisan_sayisi(kurulus.calisan_sayisi)
            }
        }
}, [dispatch,  kurulus, history, id, successUpdate])

const submitHandler = (e)=>{
    e.preventDefault()
    dispatch(updateKurulus({_id: id , kurulus_adi, kurulus_logo, ulke,  kurulus_turu, web_site, calisan_sayisi }))


}


const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()

    formData.append('kurulus_logo', file)
    formData.append('kurulus_id', id)

    setUploading(true)

    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post('/api/kuruluslar/upload/', formData, config)


        setKurulus_logo(data)
        setUploading(false)

    } catch (error) {
        setUploading(false)
    }
}






  return (
   

    <div>
    <Link to='/admin/kuruluslist'> Geri</Link>

    <FormContainer>
        <h1>Kurulus Ekle</h1>
        {loadingUpdate && <Loader/>}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (

            <Form onSubmit={submitHandler}>


            <Form.Group controlId='kurulus_adi'>
                    <Form.Label>Kurulus Adı</Form.Label>
                    <Form.Control
                     required 
                    type='text'
                    placeholder='Kuruluş İsim Giriniz'
                    value={kurulus_adi}
                    onChange={(e) => setKurulus_adi(e.target.value)}
                    
                    ></Form.Control>


                </Form.Group>

                <Form.Group controlId='kurulus_turu'>
                    <Form.Label>Kategori</Form.Label>
                    <Form.Control
                     required 
                    type='text'
                    placeholder='Kategori giriniz'
                    value={kurulus_turu}
                    onChange={(e) => setKurulus_turu(e.target.value)}
                    
                    ></Form.Control>


                </Form.Group>

                <Form.Group controlId='kurulus_logo'>
                    <Form.Label>Resim</Form.Label>
                    <Form.Control
                     required 
                    type='text'
                    placeholder='Resim Giriniz'
                    value={kurulus_logo}
                    onChange={(e) => setKurulus_logo(e.target.value)}
                    
                    ></Form.Control>
                    <input type="file" onChange={uploadFileHandler}></input>
                    {uploading && <Loader/>}


                </Form.Group>

                <Form.Group controlId='ulke'>
                    <Form.Label>Ülke</Form.Label>
                    <Form.Control
                     required 
                    type='text'
                    placeholder='Ülke Giriniz'
                    value={ulke}
                    onChange={(e) => setUlke(e.target.value)}
                    
                    ></Form.Control>


                </Form.Group>



                <Form.Group controlId='web_site'>
                    <Form.Label>Web site</Form.Label>
                    <Form.Control
                     required 
                    type='text'
                    placeholder='web siteyi giriniz'
                    value={web_site}
                    onChange={(e) => setWeb_site(e.target.value)}
                    
                    ></Form.Control>


                </Form.Group>

                <Form.Group controlId='calisan_sayisi'>
                    <Form.Label>Çalışan sayısı</Form.Label>
                    <Form.Control
                     required 
                    type='number'
                    placeholder='Çalısan sayısı Giriniz'
                    value={calisan_sayisi}
                    onChange={(e) => setCalisan_sayisi(e.target.value)}
                    
                    ></Form.Control>


                </Form.Group>
                <br></br>


            

                <Button type='submit' variant='warning'>Ekle</Button>





            </Form>




        )}


    </FormContainer>



</div>


  )
}


export default KurulusEdit