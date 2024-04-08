import "./App.css";
import AuthProvider from "./context/auth";
import DragAndDropProvider from "./context/dragAndDrop";
import RoutesApp from "./routes/routes";

function App() {
  return (
    <>
      <AuthProvider>
        <DragAndDropProvider>
          <RoutesApp />
        </DragAndDropProvider>
      </AuthProvider>
    </>
  );
}

export default App;
