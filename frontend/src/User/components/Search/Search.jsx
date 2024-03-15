import React from 'react'
import { Box } from '@mui/material'
import "./Search.scss";
import SingleCard from '../Single/SingleCard';

const Search = ({ userdata }) => {

    return (

        <Box sx={{ display: 'flex', justifyContent: 'center', height: '100vh' }}   >
            <Box sx={{ m: 1, width: '100%' }}>
                <Box sx={{ p: 3, overflowY: 'hidden', }}>
                    {
                        userdata.map((data, key) => (
                            <SingleCard data={data} key={key} />
                        ))
                    }


                </Box>

            </Box>



        </Box>
    )
}

export default Search
