import React, { useState } from 'react';
import { createTheme, ThemeProvider, Paper, Box, Container, Button, Grid, FormControl, Select, MenuItem, TextField, Fab, OutlinedInput, FormLabel, FormControlLabel, Radio, RadioGroup, InputLabel } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import $ from "jquery";
import AddIcon from '@mui/icons-material/Add';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import axios from 'axios';
import './Forms.css';


const theme = createTheme({

});

export default function AdminForm() {

    const [dataArray, setDataArray] = useState([]);

    const [serviceArray, setServiceArray] = useState([]);

    const [startDate, setStartDate] = useState(new Date());

    const [endDate, setEndDate] = useState(new Date());

    const [serviceID, setServiceID] = useState('');

    const [projectName, setProjectName] = useState('');

    const [serviceName, setServiceName] = useState('');

    const handleChange = (event) => {
        setServiceID(event.target.value);
        setServiceName(event.target.name);
        setProjectName(event.target.projectName);

    };

    const handleServiceChange = (name) => {
        setProjectName(name);
    };

    const { register, control, handleSubmit, setValue, getValues } = useForm({

        defaultValues: {
            services: [{
                taskName: "", serviceID: 0, units: "",
                isPaymentRecurring: "", yearlyCost: "",
                weeklyCost: "", startDate: "",
                endDate: "", taskDescription: "",
                projectID: 0
            }]
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "services"
    })

    const SendToPHP = (data) => {
        var i = 0;
        console.log(data);
        for (i = 0; i < data.services.length; i++) {
            const url = "http://localhost:8000/scripts/adminScript.php";
            let fData = new FormData();
            fData.append('adminaccess', true);
            fData.append('taskName', data.services[i].taskName);
            fData.append('serviceID', data.services[i].serviceID);
            fData.append('units', data.services[i].units);
            // fData.append('payment', data.services[i].isPaymentRecurring);
            // fData.append('yearlycost', data.services[i].yearlyCost);
            // fData.append('weeklycost', data.services[i].weeklyCost);
            fData.append('startDate', data.services[i].startDate);
            fData.append('endDate', data.services[i].endDate);
            fData.append('taskDescription', data.services[i].taskDescription);
            axios.post(url, fData)
                .then(response => alert(response.data))
                .catch(error => alert(error));
        }
    }

    const submitForm = (e) => {
        console.log(e);
    };

    $(document).ready(function() {
        $.ajax({
          url: "http://localhost:8000/scripts/populateTable.php",
          method: "GET",
          dataType: "json",
          success: function(data) {
            const rowData = data.map((row, index) => {
              return {
                projectName: row.projectName,
              }
            })
            setDataArray(rowData);
  
          }
        })
      })

      $(document).ready(function() {
        $.ajax({
          url: "http://localhost:8000/scripts/populateServicesDropdown.php",
          method: "GET",
          dataType: "json",
          success: function(data) {
            const rowDataServices = data.map((row, index) => {
              return {
                serviceName: row.serviceName,
              }
            })
            setServiceArray(rowDataServices);
  
            //console.log(serviceArray);
            
          }
        })
      })

    return (
        <ThemeProvider theme={theme}>
            <form onSubmit={handleSubmit(SendToPHP)} >
                <ul>
                    <div className='romIDPicker'>
                    <InputLabel>Select a Project Name to associate these tasks with: </InputLabel>
                    <TextField
                       
                        className='projectName'
                        select
                      
                        
                        label="Test Project"
                        sx={{ marginTop: 3, marginLeft: 3, minWidth: 200 }}
                        inputProps={register(`services.${0}.serviceName`, {
                       
                        })}>
                             {dataArray.map((option) => (
                                <MenuItem key={option.id} value={option.projectName}>
                                {option.projectName}
                                </MenuItem>
                             ))}

                        </TextField>
                        </div>


                    {fields.map((item, index) => (
                        <li key={item.id}>
                            <Paper elevation={10} className="adminPaper" sx={{ m: 4 }}>
                                <Grid container spacing={0}> {/*Split the right half into two halves, left and right*/}
                                    <Grid item xs={3} >
                                        <Container className='boxLeft'>
                                            <OutlinedInput className="taskName" placeholder="Task Name" {...register(`services.${index}.taskName`)} />
                                            <TextField
                                            className='serviceName'
                                            select
                                            value={getValues && getValues(`services.${index}.serviceName`)}
                                            onChange={(newValue) => {
                                                setValue(`services.${index}.serviceName`, newValue);
                                            }}
                                            label="Service Name"
                                            sx={{ marginTop: 3, marginLeft: 0, minWidth: 200 }}
                                            inputProps={register(`services.${0}.serviceName`, {
                                            
                                            })}>
                                                {serviceArray.map((option) => (
                                                    <MenuItem key={option.id} value={option.serviceName}>
                                                    {option.serviceName}
                                                    </MenuItem>
                                                ))}
    
                                        </TextField>

                                                    
                                        
                                            <OutlinedInput className="units" placeholder="Units" {...register(`services.${index}.units`)} />


                                        </Container>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <Container className='boxMiddle'>


                                            {/* Implement register component above on input data that does not print to console*/}

                                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                                <DesktopDatePicker

                                                    label="Date of Service Start"
                                                    value={getValues && getValues(`services.${index}.startDate`)}
                                                    className='startDate'
                                                    inputFormat="MM/DD/YYYY"
                                                    startDate={getValues && getValues(`services.${index}.startDate`)}
                                                    onChange={(newValue) => {
                                                        setValue(`services.${index}.startDate`, newValue);
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
                                                    value={getValues && getValues(`services.${index}.endDate`)}
                                                    inputFormat="MM/DD/YYYY"
                                                    endDate={endDate}
                                                    onChange={(newValue) => {
                                                        setValue(`services.${index}.endDate`, newValue);
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
                                                rows={10}
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
                <Box display="flex" justifyContent="center" sx={{ m: 2 }}>
                    <Button
                        variant="contained"
                        type="submit"
                        sx={{ position: 'sticky' }}
                        // component={Link} to="http://localhost:8000/scripts/rom-from-db.php"
                    >
                        Submit
                    </Button>
                </Box>
            </form>
        </ThemeProvider>
    );
}
