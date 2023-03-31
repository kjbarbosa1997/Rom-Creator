import * as React from "react";
import { useState } from "react";
import $ from "jquery";
import './pages.css';
import './Forms.css';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper';
import { OutlinedInput } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Typography } from "@mui/material";



export default function CustomerForm() {


    const { register, control, handleSubmit, reset, trigger, setError } = useForm({

    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "tasks"
    })

    const [name, setName] = useState("");
    const [result, setResult] = useState("");
  
    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleSumbit = (e) => {
      e.preventDefault();
      const form = $(e.target);
      $.ajax({
          type: "POST",
          url: form.attr("action"),
          data: form.serialize(),
          success(data) {
              setResult(data);
          },
      });
    };
    return (

        <form action="http://localhost:8000/scripts/customerScript.php"
        method="post"
        >
            <Paper elevation={10} sx={{ m: 4}}>
            <Typography variant="h5" component="h1" className="header">Submit a ticket</Typography>
            <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                
                <Grid item xs={6} style={{ marginBottom: 10 }}>
                    
                                <Box
                                    sx={{
                                        marginTop: 8,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center'
                                    }}
                                >
                                <ul>     
                                   
                                        <li>
                                            <OutlinedInput sx={{ m: 5, bottom: 5 }} placeholder="Project Name" {...register("Project Name", {})} id="projectName" name="projectName" />
                                        </li>

                                   
                                        <li>
                                            <OutlinedInput sx={{ m: 5, bottom: 5 }} placeholder="Name" {...register("Name", {})} id="name" name="name"/>
                                        </li>

                                        <li>
                                            <OutlinedInput sx={{ m: 5, bottom: 5 }} placeholder="Email"{...register("Email", {})} id="email" name="email" />
                                        </li>

                                </ul>
                                </Box>
                        
                        </Grid>
                    
                        <Grid item xs={6} style={{ marginBottom: 10 }}>
                    
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                            >
                            <ul>
                             
                                <li>
                                    <OutlinedInput sx={{ m: 5, bottom: 5 }} placeholder="TPM" {...register("TPM", {})} id="tpm" name="tpm" />
                                </li>

                              
                                <li>
                                    <OutlinedInput sx={{ m: 5, bottom: 5 }} placeholder="Financial Analyst" {...register("Financial Analyst", {})} id="financialAnalyst" name="financialAnalyst" />
                                </li>





                            </ul>
                            <ul>
                                <div className="uploadBox">

                                    <li>
                                        <InputLabel variant="h6" component="h1">Upload documentation here: </InputLabel> 
                                        <OutlinedInput className="fileUpload" type="file" id="fileUpload" name="fileUpload" />
                                    </li>
                                </div>

                                
                            </ul>
                            
                            </Box>
                            
                            
                            
                            </Grid>
                            
                            
                            </Grid>
                            </Paper>
                            
                            <Box m={1} display="flex" justifyContent="center" alignItems="flex-end">
                            <Button type="submit" variant="contained" color="primary" 
                    onChange={(event) => handleChange(event)}>
                                    Submit
                                </Button>
                            </Box>
                            
                            
                    
                            
              
                 
               
             </form>

       

    );
}