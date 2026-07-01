import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

/*
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
*/
import {Suspense,lazy,} from "react";

import ProtectedRoute from "./routes/ProtectedRoute";

import { ToastContainer } from "react-toastify";

const Login = lazy(() => import("./pages/Login") ); 
const Register = lazy(() => import("./pages/Register") );
const Chat = lazy(() => import("./pages/Chat") );

function App() {

  return (

    <BrowserRouter>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>

  <Route path="/" element={<login/>} />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />

        </Routes>

        <ToastContainer />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
