import { motion, spring } from "framer-motion";
import "./InfoRegister.css";

interface Props {
  setSignUp: () => boolean;
  signUp: boolean;
}

const InfoRegister: React.FC<Props> = ({ setSignUp, signUp }) => {
  const handleRegister = () => {
    setSignUp(!signUp);

    const info = document.querySelector<HTMLElement>(".container-register");
    info?.classList.toggle("active");

    const containerInfo = document.querySelector<HTMLElement>(
      ".container-info-register"
    );
    containerInfo?.classList.toggle("active");
  };

  return (
    <>
      <motion.div transition={spring} className="container-info-register">
        <div className="info-title">
          <h2>TODO LIST</h2>
        </div>
        <div className="info-description">
          <p>Start your journey with us.</p>
        </div>
        <div className="info-actions">
          <p className="info-question">{ signUp ? "Have an account?" : "Don't have an account?"}</p>
          <p className="info-discover">
            Discover the best way to manage your tasks.
          </p>
          <button className="info-register-button pointer" onClick={handleRegister}>
            {signUp ? "SIGN IN" : "SIGN UP"}
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default InfoRegister;
