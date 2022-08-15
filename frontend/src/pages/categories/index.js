import React,{useEffect,useState} from "react";
import {
  Button,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,DialogTitle,DialogActions
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { BrowserRouter as Router, Link } from "react-router-dom";

import useRequestResource from "src/hooks/useRequestResource";


export const Categories = () => {
  const {getResourceList,resourceList, deleteResource}=useRequestResource({
    endpoint:"categories"
  })
  const [open,setOpen]=useState(false);
  const [idToDelete,setIdToDelete]=useState(null)

  useEffect(()=>{
    getResourceList();
  },getResourceList)


  const handleConfirmDelete=(id)=>{
    setIdToDelete(id);
    setOpen(true)
  }
  const handleDeleteClose=()=>{
    setOpen(false)
  }
  const handleDelete=()=>{
    setOpen(false);
    deleteResource(idToDelete)
  }

  return (
    <div>
    <Dialog open={open} onClose={handleDeleteClose}>
      <DialogTitle>
        Are you sure you want to delete this?
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleDelete}>Yes</Button>
        <Button onClick={handleDeleteClose}>No</Button>
      </DialogActions>
    </Dialog>
    <Box sx={{
      display:"flex",
      justifyContent:"flex-end",
      mb:4,
      mt:4
    }}>
      <Button component={Link} variant="contained" color="primary" to="/categories/create">
        Create Category
      </Button>
    </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 360 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Color</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resourceList.results.map((r) => {
              return (
                <TableRow key={r.id}>
                  <TableCell align="left">{r.name}</TableCell>
                  <TableCell align="left">{r.color}</TableCell>
                  <TableCell align="right">
                  <Box sx={{display:"flex", justifyContent:"flex-end"}}>
                    <Link to={`/categories/edit/${r.id}`} key="category-edit">
                      <IconButton size="large">
                        <EditIcon/>
                      </IconButton>
                    </Link>
                    <IconButton size="large" onClick={()=>{
                      handleConfirmDelete(r.id)
                    }}>
                      <DeleteIcon/>
                    </IconButton>
                  </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
