import React, { useCallback, useEffect, useState } from "react";
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function App() {

    /* Query data when page loads */
    useEffect(() => {
        getData('');
    }, []);

    /* Array containing user data */
    let [users, setUsers] = useState([]);

    function getData(path: string) {
        /* Query API using axios */
        axios.get('https://reqres.in/api/users' + path)
            .then(function (response) {
                /* Append current page of user data to user array */
                setUsers(current => [...current, ...response.data.data]);

                /* If available, retrieve next page of user data */
                if (response.data.page < response.data.total_pages) {
                    let path = `?page=${response.data.page + 1}`;
                    getData(path);
                }
            })
            .catch(function (error) {
                /* Log error */
                console.log(error);
            });
    }

    return (
        <div id="page-container">
            <div id="page-title" style={{ textAlign: "center", padding: "20px", color: "#444" }}>
                <h1>Users Table</h1>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 1000 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Avatar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            users.map((row) => (
                                <TableRow key={users.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.first_name}</TableCell>
                                    <TableCell>{row.last_name}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell><img src={row.avatar} style={{ maxWidth: "50px" }}/></TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default App;
