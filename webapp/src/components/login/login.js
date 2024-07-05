import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, Navigate, useNaviga} from 'react-router-dom';


function Login(){
  
  const [userName, setUserName] = useState('');
  const [userPwd, setUserPwd] = useState('');

  const handleLogin = () => {
    fetch('/login', {
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
        setMessage('Login successful');
        Navigate('/login')
      })
      .catch(error => setMessage(`Error: ${error.message}`));
  };
  return(
  <div className="login">
    <h5 className='login'>Login</h5>
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      '& > :not(style)': { m: 1, width: '25ch' },
    }}
      component="form"
      noValidate
      autoComplete="off"
    >
      <TextField id="user-Name" label="User_Name" variant="outlined" />
      <TextField id="User-Password" label="Password" variant="outlined"/>
      <Button sx={{justifyContent:'center', alignItems: 'center'}} variant="contained"  onClick={handleLogin}>Login</Button>
      <p>Don't have an account? <Link to='/register'>Register</Link></p>
    </Box>
  </div>
)
}

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
