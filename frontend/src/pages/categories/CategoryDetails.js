import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Grid, TextField, Typography, Paper, Button, Box } from "@mui/material";
import * as yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import useRequestResource from "src/hooks/useRequestResource";

function CategoryDetails() {
 

  const {addResource, resource, getResource, updateResource}=useRequestResource({endpoint:"categories"})

  const [initialValues,setInitialValues]=useState({
    name:"",
    color:""
  })
  const {id}=useParams()

  const navigate=useNavigate()

useEffect(()=>{
    if(id){
        getResource(id)
    }
},[id])

useEffect(()=>{
    if(resource){
        setInitialValues({
            name:resource.name,
            color:resource.color
        })
    }
},[resource])

  const handleSubmit=values=>{
    if(id){
        updateResource(id,values,()=>{
            navigate("/categories")
        })
        return;
    }
    console.log("hello")
    addResource(values,()=>{
        navigate("/categories")
    })
  }

  return (
    <Paper
      sx={{
        borderRadius: "2px",
        boxShadow: (theme) => theme.shadows[5],
        padding: (theme) => theme.spacing(2, 4, 3),
      }}
    >
      <Typography variant="h6" mb={4}>
        {id?"Edit Category":"Create Category"}
      </Typography>

      <Formik onSubmit={handleSubmit} initialValues={initialValues} enableReinitialize>
        {(formik) => {
          return (
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="name"
                    label="Name"
                    {...formik.getFieldProps("name")}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="color"
                    label="color"
                    {...formik.getFieldProps("color")}
                    error={formik.touched.color && Boolean(formik.errors.color)}
                    helperText={formik.touched.color && formik.errors.color}
                  />
                </Grid>
                <Grid item>
                  <Box
                    sx={{
                      display: "flex",
                      margin: (theme) => theme.spacing(1),
                      marginTop: (theme) => theme.spacing(3),
                    }}
                  >
                    <Button
                      component={Link}
                      to="/categories"
                      size="medium"
                      variant="outlined"
                      sx={{ mr: 2 }}
                    >Back</Button>
                    <Button type="submit" size="medium" variant="contained" color="primary">
                      Submit
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          );
        }}
      </Formik>
    </Paper>
  );
}

export default CategoryDetails;
