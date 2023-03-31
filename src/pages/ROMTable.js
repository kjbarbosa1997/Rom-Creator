import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import axios from 'axios';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useState } from "react";
import $ from "jquery";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { TextField } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'Ticket ID', width: 70 },
  { field: 'projectName', headerName: 'Project Name', width: 300 },
  { field: 'clientName', headerName: 'Client Name', width: 130 },
  { field: 'clientEmail', headerName: 'Client Email', type: 'string', width: 220},
  { field: 'tpm', headerName: 'TPM', width: 160},
  { field: 'financialAnalyst', headerName: 'Financial Analyst', width: 160},
];








export default function DataTable() {
  const [dataArray, setDataArray] = useState([]);
  


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

  
    $(document).ready(function() {
      $.ajax({
        url: "http://localhost:8000/scripts/populateTable.php",
        method: "GET",
        dataType: "json",
        success: function(data) {
          const rowData = data.map((row, index) => {
            return {
              id: index + 1,
              projectName: row.projectName,
              clientName: row.name,
              clientEmail: row.email,
              tpm: row.tpm,
              financialAnalyst: row.financialAnalyst
            }
          })
          setDataArray(rowData);

          
          console.log(dataArray);
        }
      })
    })
  


  return (

<form action="http://localhost:8000/scripts/rom-db.php?romID=1"
        method="post"
        >




    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={dataArray}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />

  
      

      <div className = "generateButton">
      <InputLabel className='romIDInputLabel'>Choose Project Name to generate ROM for: </InputLabel>
      <TextField
                        className='romID'
                        select
                        label="ROM Name"
                        sx={{ marginTop: 3, marginLeft: 3, minWidth: 200 }}
                        inputProps={register(`services.${0}.serviceID`, {
                        required: 'Please Select a Project Name',
                        })}>
                            {dataArray.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                {option.projectName}
                                </MenuItem>
                            ))}

                        </TextField>
                        </div>
      <Button className="romSubmitButton" type="submit" variant="contained" onChange={(event) => handleChange(event)}>Generate ROM</Button>
      
    </div>
    </form>
  );
}