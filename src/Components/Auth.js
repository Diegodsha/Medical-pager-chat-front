import { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import back from '../assets/back.jpg';

const cookies = new Cookies();

const initialState = {
    fullName: '',
    userName: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: '',
}

const Auth = () => {
    const [Form, setForm] = useState(initialState)
  const [IsSignUp, setIsSignUp] = useState(true);

  const handleChange = (e) => {
    setForm({...Form, [e.target.name]: e.target.value})

  };
  const switchMode = () => {
    setIsSignUp((prevIsSingUp) => !prevIsSingUp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { userName, password, phoneNumber, avatarURL } = Form;
    const URL = 'https://med-pager.herokuapp.com/auth';
    const { data:{ token, userId, hashedPassword, fullName } } = await axios.post(`${URL}/${IsSignUp ? 'signup' : 'login'}`, {
      userName, password, fullName: Form.fullName, phoneNumber, avatarURL
    })

    cookies.set('token', token)
    cookies.set('userName', userName)
    cookies.set('fullName', fullName)
    cookies.set('userId', userId)

    if(IsSignUp){
      cookies.set('phoneNumber', phoneNumber)
    cookies.set('avatarURL', avatarURL)
    cookies.set('hashedPassword', hashedPassword)
    }

    window.location.reload()
  }

  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>{IsSignUp ? 'Sign Up' : 'Sign In'}</p>
          <form onSubmit={handleSubmit}>
            {IsSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">Dr Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Dr Smith - Dr James"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="userName">Username</label>
              <input
                type="text"
                name="userName"
                placeholder="drsmith - drjames"
                onChange={handleChange}
                required
              />
            </div>
            {IsSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="+524772635681"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {IsSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="avatarURL">Avatar URL</label>
                <input
                  type="text"
                  name="avatarURL"
                  placeholder="Avatar URL"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
            {IsSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_button">
                <button>{ IsSignUp ? 'Sign Up' : 'Sign In' }</button>
            </div>
          </form>
          <div className="auth__form-container_fields-account">
            <p>
              {IsSignUp
                ? 'Already have an account?'
                : "Don't have an account ?"}
              <span onClick={switchMode}>
                {IsSignUp ? ' Sign In' : ' Sign Up'}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="auth__form-container_image">
          <img src={back} alt="back" />
      </div>
    </div>
  );
};

export default Auth;
