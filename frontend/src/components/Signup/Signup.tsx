import "./Signup.css";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const Signup: React.FC = () => {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
  });
  const { singUp } = useAuth();

  const handleSubmit = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (validateForm()) {
      singUp(formData);
    } else {
      setMessage("Fill all fields!")
    }
  };

  const validateForm = () => {
    if (
      formData.fullName === "" ||
      formData.username === "" ||
      formData.password === ""
    ) {
      return false;
    }

    return true;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <div className="container-signup">
        <form onSubmit={handleSubmit} className="form-container">
          <div className="header-signup">
            <h1>Sign Up</h1>
            <p>Create your account now</p>
          </div>
          <div className="main-signup">
            <div className="group-input">
              <label htmlFor="fullName">Full name</label>
              <input
                type="text"
                id="fullName"
                className="input"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name..."
              />
            </div>

            <div className="group-input">
              <label htmlFor="username-sign-up">User name</label>
              <input
                type="text"
                id="username-sign-up"
                name="username"
                className="input"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your user name..."
              />
            </div>

            <div className="group-input">
              <label htmlFor="password-sign-up">Password</label>
              <input
                type="password"
                id="password-sign-up"
                className="input"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password..."
              />
            </div>
            <p className="error-sign-up">{message}</p>
            <button className="btn-submit-sign-in pointer" type="submit">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
