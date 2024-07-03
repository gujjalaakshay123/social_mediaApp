import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/navbar.js'
import Register from './components/register/register.js';
import Login from './components/login/login.js';
import Profile from './components/profile/profile.js';

function App() {
  return (
    <div className='main_app'>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={ <Login></Login>}></Route>
        <Route path='/register' element={ <Register/>}></Route>
        <Route path='/profile' element={ <Profile/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
