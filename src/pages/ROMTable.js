import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import axios from 'axios';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useState } from "react";
import $ from "jquery";

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 69 },
  { id: 6, lastName: 'Melisandre', firstName: 'Null', age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];






export default function DataTable() {

  


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

<form action="http://localhost:8000/scripts/rom-db.php?romID=1"
        method="post"
        >

          
    
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />

      <Button type="submit" variant="contained" onChange={(event) => handleChange(event)}>Generate ROM</Button>
    </div>
    </form>
  );
}