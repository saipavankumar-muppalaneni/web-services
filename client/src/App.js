import { BrowserRouter, HashRouter } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./hooks/UserContext";
import { createHashHistory } from 'history'
import MainNavigation from "./routes";

export const history = createHashHistory()
function App() {
  return (
    <div className="App">
      <HashRouter  >
        <AuthProvider>
          <MainNavigation />
        </AuthProvider>
      </HashRouter>
    </div>
  );
}

export default App;
