import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
export default function Signup() {
  const [username, setUsername] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handlePassChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleMailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMail(e.target.value);
  };
  const handleFirstnameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };
  const handleLastnameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleSignup = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    Axios.post("/api/signup", {
      username: username,
      mail: mail,
      firstName: firstName,
      lastName: lastName,
      password: password,
    })
      .then((response) => {
        if (response.data !== "Error") {
          navigate("/login");
        }
      })
      .catch(() => {
        alert("Couldn't get a response from server");
      });
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    navigate("/login");
  };

  return (
    <div className="Login-body">
      <div className="Login">
        <h1>Please fill the form</h1>
        <form method="post" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={handleUserChange}
          />
          <br />
          <input
            type="email"
            placeholder="Email"
            required
            value={mail}
            onChange={handleMailChange}
          />
          <br />

          <input
            type="text"
            placeholder="first name"
            required
            value={firstName}
            onChange={handleFirstnameChange}
          />
          <br />
          <input
            type="text"
            placeholder="last name"
            required
            value={lastName}
            onChange={handleLastnameChange}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={handlePassChange}
          />

          <br />
          <br />
          <input type="submit" className="Login-button" value="Register" />

          <br />
          <br />
          <br />
        </form>
        <input
          type="submit"
          value="Already have an account? Click here"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}
