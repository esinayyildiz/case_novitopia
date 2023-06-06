import React, { useEffect, useState } from 'react'
import {  useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {updateUserProfile, getUserDetails} from '../actions/userActions'
import { Row, Col, Form, Button, Table } from 'react-bootstrap'
import Message from '../component/Message'
import Loader from '../component/Loader'
import { USER_UPDATE_PROFILE_RESET } from '../constans/userConstans'
 


function Profile() {

    

    const [name, setName] =useState('')
    const [email, setEmail] =useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const history = useNavigate()


    const userDetails = useSelector(state=>state.userDetails)
    const {error, loading, user} = userDetails
    
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state=>state.userUpdateProfile)
    const {success} = userUpdateProfile


    

  
    useEffect(() => {
        if (!userInfo) {
            history('/login')
        } else {
            if (!user || !user.name || success || userInfo._id !== user._id) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success])

    

    const submitHandler = (e)=>{
        e.preventDefault()

        if(password!==confirmPassword){
            setMessage('Parolalar eşleşmedi!!')
        }
        else
        {
            dispatch(updateUserProfile({
                'id': user.id,
                'name': name,
                'email': email,
                'password':password


            }))
            setMessage('')

        }


    }



  return (
    <div>
        <Row>
            <Col md={4}>
                <h2 className='kurulus-title'>Kişisel Bilgilerim</h2>
                {message && <Message variant='danger'>{error}</Message>}
                {loading && <Loader/>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>İsim</Form.Label>
                        <Form.Control
                         required 
                        type='name'
                        placeholder='İsim Giriniz'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        
                        ></Form.Control>


                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                         required 
                        type='email'
                        placeholder='Email Giriniz'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        
                        ></Form.Control>


                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Parola</Form.Label>
                        <Form.Control
                         required 
                        type='password'
                        placeholder='Password Giriniz'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        
                        ></Form.Control>


                    </Form.Group>


                    <Form.Group controlId='passwordConfirm'>
                        <Form.Label>Tekrar Parola</Form.Label>
                        <Form.Control
                         required 
                        type='password'
                        placeholder='Password Giriniz'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        
                        ></Form.Control>


                    </Form.Group><br></br>

                    <Button type='submit' variant='primary'>Güncelle</Button>



                </Form>
            
            </Col>



        </Row>


        
    </div>
  )
}

export default Profile