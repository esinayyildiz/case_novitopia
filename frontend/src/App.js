import './App.css';
import './bootstrap.min.css';
import logo from './logo.svg';

import Header from './component/Header';
import Footer from './component/Footer';
import Home from './screen/Home'
import { Routes, Route } from "react-router-dom";
import { Container } from 'react-bootstrap';
import KurulusScreen from './screen/KurulusScreen';
import Login from './screen/Login';
import Register from './screen/Register';
import Profile from './screen/Profile';
import KurulusListesi from './screen/KurulusListesi';
import UserList from './screen/userList';
import EditUser from './screen/EditUser';
import KurulusEdit from './screen/KurulusEdit';
import CartScreen from './screen/CartScreen';


function App() {
  return (
    <div>
      <Header></Header>
      <Container className = 'mt-50 mb-50 justify-content-center'>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/kuruluslar" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/admin/kuruluslist" element={<KurulusListesi/>}/>
        <Route path="/admin/userlist" element={<UserList/>}/>
        <Route path="/admin/user/:id/edit" element={<EditUser/>}/>
        <Route path="/admin/kurulus/:id/edit" element={<KurulusEdit/>}/>
        <Route path="/cart/:id" element={<CartScreen/>}/>



        






      </Routes>      


      <Footer></Footer>
      </Container>

    </div>
  );
}

export default App;
