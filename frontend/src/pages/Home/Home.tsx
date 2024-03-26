//import Sidebar from "../../components/Sidebar/Sidebar";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="home-container">
        {/* <div className="home-sidebar">
          <Sidebar />
        </div> */}
        <div className="home-content">
          <div className="home-title">
            <h2>Welcome</h2>
            <div className="underline"></div>
          </div>
          <div className="home-description">
            <p>Hi there, my name is Flavio Filho!</p>
            <p>
              I developed this <strong>TODO LIST</strong> to improve my skills
              developing. I hope that you can to enjoy and learn with my
              project!
            </p>
            <p>Funcionalities:</p>
            <video src="" className="home-video"></video>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
