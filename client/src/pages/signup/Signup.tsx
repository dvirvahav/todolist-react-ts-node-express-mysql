import { FC, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import Axios from 'axios';

export const Signup: FC = () => {
  const [username, setUsername] = useState<string>('');
  const [mail, setMail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate: NavigateFunction = useNavigate();

  const handleSignup = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    Axios.post('/api/signup', {
      username: username,
      mail: mail,
      firstName: firstName,
      lastName: lastName,
      password: password,
    })
      .then((response) => {
        if (response.data !== 'Error') {
          navigate('/login');
        }
      })
      .catch(() => {
        alert("Couldn't get a response from server");
      });
  };

  return (
    <div className='Login-body'>
      <div className='Login'>
        <h1>Please fill the form</h1>
        <form method='post' onSubmit={handleSignup}>
          <input
            type='text'
            placeholder='Username'
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <br />
          <input
            type='email'
            placeholder='Email'
            required
            value={mail}
            onChange={(event) => setMail(event.target.value)}
          />
          <br />

          <input
            type='text'
            placeholder='first name'
            required
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
          <br />
          <input
            type='text'
            placeholder='last name'
            required
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
          <br />
          <input
            type='password'
            placeholder='Password'
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete='new-password'
          />

          <br />
          <br />
          <input type='submit' className='Login-button' value='Register' />

          <br />
          <br />
          <br />
        </form>
        <input
          type='text'
          value='Already have an account? Click here'
          onClick={() => {
            navigate('/login');
          }}
          readOnly
        />
      </div>
    </div>
  );
};
