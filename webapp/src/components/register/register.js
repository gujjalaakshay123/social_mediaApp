import React from 'react';
import PropTypes from 'prop-types';
import '../../App.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Register(){

  const [userName, setUserName] = useState('');
  const [userPwd, setUserPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = () => {
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userName, userPwd })
    })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          throw new Error(data.message);
        }
        setMessage('Registration successful');
      })
      .catch(error => setMessage(`Error: ${error.message}`));
  };

  return (
  <div className="register">
    <h5 className='register'>Register</h5>
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      '& > :not(style)': { m: 1, width: '25ch' },
    }}
      component="form"
      noValidate
      autoComplete="off"
    >
      <TextField id="userName" label="User_Name" variant="outlined" />
      <TextField id="UserPassword" label="Password" variant="outlined"/>
      <TextField id="UserEmail" label="Email" variant="outlined"/>
      <Button sx={{justifyContent:'center', alignItems: 'center'}} onClick={handleRegister} variant="contained">Register</Button>
      <p>Already have an account? <Link to='/'>Login</Link></p>
    </Box>

  </div>
);
}
Register.propTypes = {};

Register.defaultProps = {};

export default Register;
