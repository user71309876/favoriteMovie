import * as React from 'react';
import { NavLink } from "react-router-dom";

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

export default function ContainedButtons() {
  return (
	<Box display="flex" justifyContent="flex-end">
    <Stack direction="row" spacing={2} sx={{ margin:1}}>
		<NavLink to="/">
    		<Button variant="contained" >Home</Button>
        </NavLink>
		<NavLink to="/create">
    			<Button variant="contained" >Create</Button>
        </NavLink>
    </Stack>
	</Box>
  );
}