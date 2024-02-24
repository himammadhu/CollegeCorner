import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Avatar, Box, Button } from '@mui/material'
import axios from 'axios'

const Accepted = () => {
    const [rows, setRows] = useState([])
    const rowsWithId = rows.map((row, index) => ({ ...row, id: index + 1 }))
    const columns = [
        { field: '_id', headerName: 'ID', flex: 3 },
        {
            field: 'Proof',
            headerName: 'Proof',
            flex: 3,
            renderCell: (params) => {
                console.log(params)

                return (
                    <>
                        <Avatar
                            src={params.row.Proof}

                        // onClick={() => deleteData(params.row.ward_id)}
                        />
                    </>
                )
            },
        },
        {
            field: 'name',
            headerName: 'Name',
            flex: 3,
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 3,
        },
        {
            field: 'password',
            headerName: 'Password',
            flex: 3,
        },
        {
            field: 'Action',
            headerName: 'Action',

            flex: 4,
            renderCell: (params) => {
                return (
                    <Box sx={{ display: 'flex', gap: 3 }}>
                       
                        <Button
                            variant='outlined'
                            onClick={() => rejectCollege(params.row._id)}
                        >
                            Reject
                        </Button>
                    </Box>
                )
            },
        },
    ]

    const fetchCollege = () => {
        axios.get('http://localhost:5000/CollegeAccepted').then((response) => {
            console.log(response.data.Collegelist)
            setRows(response.data.Collegelist)
        })
    }

   
    const rejectCollege = (Id) => {
        axios.put(`http://localhost:5000/rejectCollege/${Id}`).then((response) => {
            console.log(response.data)
        })
    }

    useEffect(() => {
        fetchCollege()
    }, [])
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rowsWithId}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    )
}

export default Accepted