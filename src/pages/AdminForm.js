import React, { useState } from 'react';
import { createTheme, ThemeProvider, Paper, Box, Container, Button, Grid, FormControl, Select, MenuItem, TextField, Fab, OutlinedInput, FormLabel, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import AddIcon from '@mui/icons-material/Add';
import ReactDOM from 'react-dom';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import axios from 'axios';
import { data } from 'jquery';
import { initializeApp } from 'firebase/app';
import { getAnalytics, setDefaultEventParameters } from "firebase/analytics";

const theme = createTheme({

});

const firebaseConfig = {
    apiKey: "AIzaSyBzW9_vdvR8RE3eFElUTH-V0qdGpmmKs6U",
    authDomain: "capstoneproject12umassd2023.firebaseapp.com",
    databaseURL: "https://capstoneproject12umassd2023-default-rtdb.firebaseio.com",
    projectId: "capstoneproject12umassd2023",
    storageBucket: "capstoneproject12umassd2023.appspot.com",
    messagingSenderId: "431350852544",
    appId: "1:431350852544:web:f1cfdd7748702a7410b625",
    measurementId: "G-EFSEHNFG79"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

function App() {

    const [startDate, setStartDate] = useState(new Date());

    const [endDate, setEndDate] = useState(new Date());

    const [service, setService] = useState('');
    
    const handleChange = (event) => {
        setService(event.target.value);
    };

    const { register, control, handleSubmit } = useForm({

        defaultValues: {
            services: [{ taskName: "", serviceName: "", units: "", 
                            isPaymentRecurring: "", yearlyCost: "", 
                            weeklyCost: "", startDate: "", 
                            endDate: "", taskDescription: "" }]
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "services"
    })

    const SendToPHP = (data) => {
        var i = 0;
        console.log(data);
        for(i = 0; i<data.services.length; i++){
            const url = "http://localhost:8000/scripts/adminScript.php";
            let fData = new FormData();
            fData.append('adminaccess', true);
            fData.append('task', data.services[i].taskName);
            fData.append('service', data.services[i].serviceName);
            fData.append('units', data.services[i].units);
            fData.append('payment', data.services[i].isPaymentRecurring);
            fData.append('yearlycost', data.services[i].yearlyCost);
            fData.append('weeklycost', data.services[i].weeklyCost);
            fData.append('dosstart', data.services[i].startDate);
            fData.append('dosend', data.services[i].endDate);
            fData.append('description', data.services[i].taskDescription);
            axios.post(url, fData)
            .then(response=> alert(response.data))
            .catch(error=> alert(error));
        }
    }

    const submitForm = (e) => {
        console.log(e);
    };

    return (
        <ThemeProvider theme={theme}>
            <form onSubmit={handleSubmit(SendToPHP)}>
                <ul>
                    {fields.map((item, index) => (
                        <li key={item.id}>
                            <Paper elevation={10} className="adminPaper" sx={{ m: 4 }}>
                                <Grid container spacing={0}> {/*Split the right half into two halves, left and right*/}
                                    <Grid item xs={3} >
                                        <Container className='boxLeft'>
                                        <OutlinedInput className="taskName" placeholder="Task Name" {...register(`services.${index}.taskName`)} />
                                            <TextField
                                                className='services'
                                                value={service}
                                                onChange={handleChange}
                                                select // tell TextField to render select
                                                label="Services"
                                                sx={{ m: 2, minWidth: 258 }}
                                                inputProps={register(`services.${index}.serviceName`, {
                                                    required: 'Please Select a Service',
                                                  })}>
                                                <MenuItem value="Service 1">Service 1</MenuItem>
                                                <MenuItem value="Service 2">Service 2</MenuItem>
                                                <MenuItem value="Service 3">Service 3</MenuItem>
                                                <MenuItem value="Service 4">Service 4</MenuItem>
                                                <MenuItem value="Service 5">Service 5</MenuItem>
                                                <MenuItem value="Service 6">Service 6</MenuItem>
                                            </TextField>
                                            <OutlinedInput className="units" placeholder="Units" {...register(`services.${index}.units`)} />

                                            <FormControl className='radioButtons'>
                                                <FormLabel id="demo-radio-buttons-group-label">Recurrent Payment</FormLabel>
                                                <RadioGroup

                                                    row
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    name="radio-buttons-group"
                                                    defaultValue="no"
                                                    sx={{ p: 1 }}
                                                >
                                                    <FormControlLabel value="true" control={<Radio {...register(`services.${index}.isPaymentRecurring`)} />} label="Yes" />
                                                    <FormControlLabel value="false" control={<Radio {...register(`services.${index}.isPaymentRecurring`)} />} label="No" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Container>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <Container className='boxMiddle'>
                                            <OutlinedInput sx={{ m: 5, bottom: 5 }} placeholder="Yearly Cost" {...register(`services.${index}.yearlyCost`)} />
                                            <OutlinedInput sx={{ m: 5, bottom: 50 }} placeholder="Weekly Cost" {...register(`services.${index}.weeklyCost`)} />

                                            {/* Implement register component above on input data that does not print to console*/}

                                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                                <DesktopDatePicker

                                                    label="Date of Service Start"
                                                    value={startDate}
                                                    className='startDate'
                                                    inputFormat="MM/DD/YYYY"
                                                    startDate={startDate}
                                                    onChange={(newValue) => {
                                                        setStartDate(newValue);
                                                    }}
                                                    inputProps={register(`services.${index}.startDate`, {
                                                        required: 'Please Select a Start Date',
                                                      })}
                                                    renderInput={(params) => 
                                                        <TextField 
                                                            {...params} 
                                                            
                                                        />}
                                                />
                                            </LocalizationProvider>
                                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                                <DesktopDatePicker
                                                    label="Date of Service End"
                                                    value={endDate}
                                                    className='endDate'
                                                    inputFormat="MM/DD/YYYY"
                                                    endDate={endDate}
                                                    onChange={(newValue) => {
                                                        setEndDate(newValue);
                                                    }}
                                                    inputProps={register(`services.${index}.endDate`, {
                                                        required: 'Please Select an End Date',
                                                      })}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>

                                        </Container>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Container className='boxRight'>
                                            <TextField
                                                {...register(`services.${index}.taskDescription`)}
                                                fullWidth
                                                id="outlined-multiline-flexible"
                                                label="Task Description"
                                                multiline
                                                sx={{ m: 2, right: 15, top: 20 }}
                                                rows={13}
                                            />
                                        </Container>
                                    </Grid>

                                    <Button type="button" variant="outlined" className="removeButtonAdmin" onClick={() => remove(index)}>Remove</Button>
                                </Grid>
                            </Paper>
                            
                        </li>
                        
                    ))}
                </ul>
                <Fab color="primary" aria-label="add" type="button" onClick={() => append()} variant="outlined" className="addButtonAdmin" sx={{ position: 'absolute', bottom: 20, right: 20 }}>
                <AddIcon />
                </Fab>
                <Box display="flex" justifyContent="center" sx={{ m: 2 }}> <Button variant="contained" type="submit" sx={{ position: 'sticky' }}> Submit </Button> </Box>
            </form>
        </ThemeProvider>
    );
}
export default App;
