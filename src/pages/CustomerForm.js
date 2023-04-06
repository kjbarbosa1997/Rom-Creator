import * as React from "react";
import './pages.css';
import './Forms.css';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper';
import { OutlinedInput } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Typography } from "@mui/material";
import axios from 'axios';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "./firebase-config"


export default function CustomerForm() {
    const { register, handleSubmit } = useForm({

    });
    
    const onSubmit = (data) => {

        const fileUpload = data.files[0];

        const fileRef = ref(storage, `firebase/files/${fileUpload.name}`);

        uploadBytes(fileRef, fileUpload);

        const fileURL = getDownloadURL(ref(storage, `firebase/files/${fileUpload.name}`))
            .then((url) => {
                return url;
            });

        const saveData = async () => {
            const a = await fileURL;
            let fData = new FormData();

            fData.append("name", data.name);
            fData.append("email", data.email);
            fData.append("projectName", data.projectName);
            fData.append("tpm", data.tpm);
            fData.append("financialAnalyst", data.financialAnalyst);
            fData.append("fileName", fileUpload.name);
            fData.append("fileURL", a);

            axios.post("http://localhost:8000/scripts/customerScript.php", fData)
                .then(response => alert(response.data))
                .catch(error => alert(error));

            for (const pair of fData.entries()) {
                console.log(`${pair[0]}: ${pair[1]}`);
            }
        };
        saveData();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Paper elevation={10} sx={{ m: 4 }}>
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
                                    <OutlinedInput sx={{ m: 5, bottom: 5 }} placeholder="Project Name" {...register("projectName")} />
                                </li>
                                <li>
                                    <OutlinedInput sx={{ m: 5, bottom: 5 }} placeholder="Name" {...register("name")} />
                                </li>
                                <li>
                                    <OutlinedInput sx={{ m: 5, bottom: 5 }} placeholder="Email"{...register("email")} />
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
                                    <OutlinedInput sx={{ m: 5, bottom: 5 }} placeholder="TPM" {...register("tpm")} />
                                </li>
                                <li>
                                    <OutlinedInput sx={{ m: 5, bottom: 5 }} placeholder="Financial Analyst" {...register("financialAnalyst")} />
                                </li>
                            </ul>
                            <ul>
                                <div className="uploadBox">

                                    <li>
                                        <InputLabel component="h1">Upload documentation here: </InputLabel>
                                        <OutlinedInput className="fileUpload" type="file" {...register("files")} />
                                    </li>
                                </div>
                            </ul>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            <Box m={1} display="flex" justifyContent="center" alignItems="flex-end">
                <Button type="submit" variant="contained" color="primary"
                // onChange={(event) => handleChange(event)}
                >
                    Submit
                </Button>
            </Box>
        </form>
    );
}