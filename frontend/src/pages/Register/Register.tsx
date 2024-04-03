import { useState } from "react";
import InfoRegister from "../../components/InfoRegister/InfoRegister";
import Signin from "../../components/Signin/Signin";
import "./Register.css";
import Signup from "../../components/Signup/Signup";

const Register = () => {
  const [signUp, setSignUp] = useState(false);
  return (
    <>
      <div className="container-register">
        <div id="change" className="content-register">
          <div className="container-form sign-in">
            <Signin />
          </div>

          <div className="container-form sign-up">
            <Signup />
          </div>

          <div className="container-toggle">
            <InfoRegister signUp={signUp} setSignUp={setSignUp} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
