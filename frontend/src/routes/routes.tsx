import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "../pages/Register/Register";
import Home from "../pages/Home/Home";
import AllTasks from "../pages/AllTasks/AllTasks";
import { useAuth } from "../hooks/useAuth";
import Sidebar from "../components/Sidebar/Sidebar";

interface AuthState {
  signed: boolean;
}

const RoutesApp: React.FC = () => {
  const { signed } = useAuth() as AuthState;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />

        {/* Rotas protegidas */}
        {signed && (
          <Route
            path="/*"
            element={
              <>
                <Sidebar />
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/all-tasks" element={<AllTasks />} />
                  <Route path="/members" element={<Home />} />
                </Routes>
              </>
            }
          />
        )}
        {!signed && <Route path="/*" element={<Navigate to="/" />} />}
      </Routes>
    </Router>
  );
};

export default RoutesApp;
