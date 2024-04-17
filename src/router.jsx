import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import UserSelect from "./pages/UserSelect";
import Protected from "./pages/Protected";
import Ecommerse from "./pages/Ecommerse";

import SignIn from "./pages/SignIn";
import ProtectedRoute from "./components/ProtectedRoute";
import Customers from "./pages/Customers";
import Empolyees from "./pages/Employees";
import Orders from "./pages/Orders";
import Calendar from "./pages/Calendar";
import Kanban from "./pages/Kanban";
import Editor from "./pages/Editor";
import Sign from "./pages/Sign";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="user-select" element={<UserSelect />} />
        <Route path="login" element={<Login />} />
        <Route path="sign" element={<Sign />} />
        <Route path="signin" element={<SignIn />} />
        <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <Protected />
              </ProtectedRoute>
            }
          />
        <Route
            path="/ec"
            element={
              <ProtectedRoute>
                <Ecommerse/>
              </ProtectedRoute>
            }
          />
        <Route
            path="/ecommerce"
            element={
              <ProtectedRoute>
                <Ecommerse/>
              </ProtectedRoute>
            }
          />
        <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders/>
              </ProtectedRoute>
            }
          />
        <Route
            path="/employees"
            element={
              <ProtectedRoute>
                <Empolyees/>
              </ProtectedRoute>
            }
          />
        <Route
            path="/customers"
            element={
              <ProtectedRoute>
                <Customers/>
              </ProtectedRoute>
            }
          />
        <Route
            path="/kanban"
            element={
              <ProtectedRoute>
                <Kanban/>
              </ProtectedRoute>
            }
          />
        <Route
            path="/editor"
            element={
              <ProtectedRoute>
                <Editor/>
              </ProtectedRoute>
            }
          />
        <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <Calendar/>
              </ProtectedRoute>
            }
          />

        {/* <Route path="protected" element={<Protected />} /> */}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </>
  ),
  // { basename: import.meta.env.DEV ? "/" : "/react-face-auth/" }
  { basename: "/" }
);

export default router;
