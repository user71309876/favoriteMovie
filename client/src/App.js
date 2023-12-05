import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import './App.css';
import MovieTable from './MovieTable.js';

import Create from './Create.js';


const App = () => {
  return (
    <div>
		<Typography component="div">
			<Box sx={{ fontSize: 'h3.fontSize', p: 3 , textAlign: 'center'}}>내가 즐겨보는 영화</Box>
		  </Typography>
		

		<Router>
			<Create />
			<Routes>
				<Route exact path="/" element={<MovieTable />} />
			</Routes>
		</Router>
    </div>
  )
}

export default App