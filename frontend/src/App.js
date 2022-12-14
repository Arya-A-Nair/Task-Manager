import React from "react";
import ReactDom from "react-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { Categories } from "./pages/categories";
import CategoryDetails from "./pages/categories/CategoryDetails";
import { SnackbarProvider } from "notistack";
import { LoadingOverlayResource } from "./components/LoadingOverlayResource";
import SignUp from "./pages/Auth/SignUp";
import SignIn from "./pages/Auth/SignIn";
import AuthContextProvider from "./contexts/AuthContextProvider";
import { RequireAuth } from "./components/RequireAuth";
import { RequireNotAuth } from "./components/RequireNotAuth";
import BaseLayout from "./components/BaseLayout";
import Tasks from "./pages/Tasks";
import TaskDetails from "./pages/Tasks/TaskDetails";
import Dashboard from "./pages/Dashboard";
import "./index.css";
import RequestResetPassword from "./pages/Auth/RequestResetPassword";
import ResetPasswordConfirm from "./pages/Auth/ResetPasswordConfirm";
export default function App() {
  return (
    <div>
      <CssBaseline />
      <AuthContextProvider>
        <SnackbarProvider>
          <Router>
            <Box
              sx={{
                bgcolor: (theme) => theme.palette.background.default,
                minHeight: "100vh",
                width: "100%",
              }}
            >
              <Routes>
                <Route element={<RequireAuth />}>
                  <Route element={<BaseLayout />}>
                    <Route path="/categories" element={<Categories />} />
                    <Route
                      path="/categories/create"
                      element={<CategoryDetails />}
                    />
                    <Route
                      path="/categories/edit/:id"
                      element={<CategoryDetails />}
                    />
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="/tasks/create" element={<TaskDetails />} />
                    <Route path="/tasks/edit/:id" element={<TaskDetails />} />
                    <Route path="/" element={<Dashboard />} />
                  </Route>
                </Route>
                <Route element={<RequireNotAuth />}>
                  <Route path="/auth/signup" element={<SignUp />} />
                  <Route
                    path="/auth/password-reset"
                    element={<RequestResetPassword />}
                  />
                  <Route path="/auth/signin" element={<SignIn />} />
                  <Route
                    path="/auth/password-reset/confirm/:uid/:token"
                    element={<ResetPasswordConfirm />}
                  />
                </Route>
              </Routes>
            </Box>
          </Router>
        </SnackbarProvider>
      </AuthContextProvider>
    </div>
  );
}

ReactDom.render(<App />, document.getElementById("root"));
