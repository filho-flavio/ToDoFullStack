import { ChangeEvent, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./Signin.css";

const Signin: React.FC = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (validateForm()) {
      const res = signIn(formData);

      if (res) {
        navigate("/home");
      }
    } else {
      alert("Fill all fields to signin!");
    }
  };

  const validateForm = () => {
    if (formData.username !== "" && formData.password !== "") return true;

    return false;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <div className="container-signin">
        <form onSubmit={handleSubmit} className="form-container">
          <div className="header-signin">
            <h1>Sign In</h1>
            <p>Have an account, sign in</p>
          </div>
          <div className="main-signin">
            <div className="group-input">
              <label htmlFor="username">E-mail</label>
              <input
                type="text"
                id="username"
                name="username"
                className="input"
                placeholder="Enter your user name..."
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="group-input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="input"
                placeholder="Enter your password..."
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <a href="#">Forget Your Password?</a>
            <button className="btn-submit-sign-in pointer" type="submit">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signin;
