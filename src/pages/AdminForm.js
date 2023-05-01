import React, { useState } from 'react';
import { createTheme, ThemeProvider, Paper, Box, Container, Button, Grid, FormControl, Select, MenuItem, TextField, Fab, OutlinedInput, FormLabel, FormControlLabel, Radio, RadioGroup, InputLabel } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import $ from "jquery";
import AddIcon from '@mui/icons-material/Add';
import { useForm, useFieldArray, Controller} from 'react-hook-form';
import axios from 'axios';
import './Forms.css';


const theme = createTheme({

});

export default function AdminForm() {

    const [dataArray, setDataArray] = useState([]);

    const [serviceArray, setServiceArray] = useState([]);

    const [startDate, setStartDate] = useState(new Date());

    const [endDate, setEndDate] = useState(new Date());


    
    const [serviceID, setServiceID] = useState("");


    const { register, control, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
        services: [{
            taskName: "", units: "",
            isPaymentRecurring: "", yearlyCost: "",
            weeklyCost: "", startDate: new Date().toISOString().substring(0, 10),
            endDate: new Date().toISOString().substring(0, 10), taskDescription: "",
            serviceID: ""
        }]
    }
});

    
    
    const { fields, append, remove } = useFieldArray({
        control,
        name: "services"
    })

    const SendToPHP = (data) => {
        var i = 0;
        
        for (i = 0; i < data.services.length; i++) {
            const url = "http://localhost:8000/scripts/adminScript.php";
            let fData = new FormData();
            //let serviceID = data.services[i].getAttribute('data-service-id');
            fData.append('adminaccess', true);
            fData.append('romID', data.romID);
            fData.append('taskName', data.services[i].taskName);
            fData.append('serviceID', data.services[i].serviceName);
            fData.append('units', data.services[i].units);
            fData.append('startDate', data.services[i].startDate);
            fData.append('endDate', data.services[i].endDate);
            fData.append('taskDescription', data.services[i].taskDescription);
            //console.log(data);
            console.log(fData);
            axios.post(url, fData)
                .then(response => alert(response.data))
                .catch(error => alert(error));
            
                
        }
        
    }

    const submitForm = (e) => {
        //console.log(e);
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
                projectID: row.ticketID
              }
            })
            setDataArray(rowData);
            //console.log(rowData);
  
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
                serviceID: row.serviceID
              }
            })
            setServiceArray(rowDataServices);
            //console.log(rowDataServices);

           
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
                        required
                        label="Project Name"
                        sx={{ marginTop: 3, marginLeft: 3, minWidth: 200 }}
                        inputProps={register('romID', {
                       
                        })}>
                             {dataArray.map((option) => (
                                <MenuItem key={option.id} value={option.projectID}>
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
                                                value={getValues(`services.${index}.serviceName`)}
                                                onChange={(event) => setValue(`services.${index}.serviceName`, event.target.value)}
                                                select // tell TextField to render select
                                                label="Services"
                                                sx={{ marginTop: 3, marginLeft: 0, minWidth: 200 }}
                                                inputProps={register(`services.${index}.serviceName`, {
                                                })}
                                            >
                                                {serviceArray.map((option) => (
                                                <MenuItem key={option.id} value={option.serviceID}>
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
  <Controller
    name={`services.${index}.startDate`}
    control={control}
    rules={{ required: 'Please Select a Start Date' }}
    render={({ field }) => (
      <DesktopDatePicker
        label="Date of Service Start"
        value={field.value}
        className="startDate"
        inputFormat="MM/DD/YYYY"
        onChange={field.onChange}
        renderInput={(params) => <TextField {...params} />}
      />
    )}
  />
</LocalizationProvider>

<LocalizationProvider dateAdapter={AdapterMoment}>
  <Controller
    name={`services.${index}.endDate`}
    control={control}
    rules={{ required: 'Please Select an End Date' }}
    render={({ field }) => (
      <DesktopDatePicker
        label="Date of Service End"
        value={field.value}
        inputFormat="MM/DD/YYYY"
        onChange={field.onChange}
        renderInput={(params) => <TextField {...params} />}
      />
    )}
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
