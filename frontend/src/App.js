import React from "react";
import ReactDom from "react-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { Categories } from "./pages/categories";
import CategoryDetails from "./pages/categories/CategoryDetails";
import { SnackbarProvider } from "notistack";
import { LoadingOverlayResource } from "./components/LoadingOverlayResource";

export default function App() {
  return (
    <div>
      <CssBaseline />
      <LoadingOverlayResource>
        <SnackbarProvider>
          <Router>
            <Box
              sx={{
                bgcolor: (theme) => theme.palette.background.default,
                minHeight: "100vh",
                width:"100%"
              }}
            >
              <Routes>
                <Route path="/categories" element={<Categories />} />
                <Route
                  path="/categories/create"
                  element={<CategoryDetails />}
                />
                <Route
                  path="/categories/edit/:id"
                  element={<CategoryDetails />}
                />
              </Routes>
            </Box>
          </Router>
        </SnackbarProvider>
      </LoadingOverlayResource>
    </div>
  );
}

ReactDom.render(<App />, document.getElementById("root"));
