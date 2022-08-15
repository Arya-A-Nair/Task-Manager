import React from "react";
import ReactDom from "react-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { Categories } from "./pages/categories";
import CategoryDetails from "./pages/categories/CategoryDetails";

export default function App() {
  return (
    <div>
      <CssBaseline />
      <Router>
        <Box
          sx={{
            bgcolor: (theme) => theme.palette.background.default,
            minHeight: "100vh",
          }}
        >
          <Routes>
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/create" element={<CategoryDetails />} />
            <Route path="/categories/edit/:id" element={<CategoryDetails />} />
          </Routes>
        </Box>
      </Router>
    </div>
  );
}

ReactDom.render(<App />, document.getElementById("root"));
