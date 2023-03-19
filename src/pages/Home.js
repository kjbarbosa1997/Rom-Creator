import React from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';


export default function Home (){

    return (
    <div className="homePaper">
      <Paper elevation={3} sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
        <div className='homePaperContainer'>
        <h1 className="titleText">Welcome to the NUWC Cost Center ROM Generator!</h1>
        <p className="subTitleText">Make a selection below to get started!</p>
        <Button variant="contained" href="/customer">Submit a Ticket</Button>
        <Button variant="contained" href="/admin">Admin</Button>
        <Button variant="contained" href="/romtable">Submitted Data Table</Button>
          
          <div id="creatorTag" className="creatorTag">
            <p>Created by Team 12 - 2023</p>
          </div>
        </div>
      </Paper>
      </div>
    );

}