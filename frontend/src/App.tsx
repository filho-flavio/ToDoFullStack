import "./App.css";
import AuthProvider from "./context/auth";
import RoutesApp from "./routes/routes";

function App() {
  return (
    <>
      <AuthProvider>
        <RoutesApp />
      </AuthProvider>
    </>
  );
}

export default App;
