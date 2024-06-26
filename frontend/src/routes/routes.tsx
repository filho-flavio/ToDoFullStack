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
  user: object;
}

const RoutesApp: React.FC = () => {
  const { user } = useAuth() as AuthState;

  return (
    <Router>
      <Routes>
        {/* Rota de registro disponível apenas para usuários não autenticados */}
        {!user && <Route path="/" element={<Register />} />}

        {/* Rotas protegidas */}
        {user && (
          <Route
            path="/*"
            element={
              <>
                <Sidebar />
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/all-tasks" element={<AllTasks />} />
                </Routes>
              </>
            }
          />
        )}

        {/* Redirecionar usuários autenticados para a página inicial */}
        {user && <Route path="/*" element={<Navigate to="/home" />} />}
      </Routes>
    </Router>
  );
};

export default RoutesApp;
