import React, { useState } from 'react';
import frontImage from '../../image/back1.jpg';
import {auth } from '../../firebase';
import Modal from '@mui/material/Modal';
import { Input } from '@mui/material';
import Box from '@mui/material/Box';
import instagram from '../../image/instagram.jpg'
import './Front.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

function Front() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [open, setOpen] = useState(false);

    const signUp = (event) => {
        event.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                return authUser.user.updateProfile({
                    displayName: username,
                })
            })
            .catch((error) => alert(error.message))
        setOpen(false);
    }

    const signIn = (event) => {
        event.preventDefault();
        auth
            .signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error.message))

        // setOpenSignIn(false)
    }
    return (
        <div className="front">
            <div className="container">
                <img className='front_img' src={frontImage} alt='Front-page' />
                <div className="font_form">
                     <h1 className='front_heading'>INSTAGRAM</h1>
                    <div className="signIn">
                        <input
                            type='text'
                            placeholder='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type='password'
                            placeholder='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type='submit' onClick={signIn}>Log In</button>
                    </div>
                    <div className="signUp">
                        <p >Don't have an account?<strong className='signUpbutton' onClick={() => setOpen(true)}>SignUp</strong></p>
                        {
                            open
                                ? (
                                    <Modal
                                        open={open}
                                        onClose={() => setOpen(false)}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <form className='app_signup'>
                                                <center>
                                                    <img src={instagram} alt="instagram" className="app_headerImage" />
                                                </center>

                                                <Input
                                                    type='text'
                                                    placeholder='username'
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                />
                                                <Input
                                                    type='text'
                                                    placeholder='email'
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                <Input
                                                    type='password'
                                                    placeholder='password'
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                                <button type='submit' onClick={signUp}>SIgn Up</button>
                                            </form>
                                        </Box>
                                    </Modal>
                                )
                                :(
                                    null
                                )
                        }

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Front;