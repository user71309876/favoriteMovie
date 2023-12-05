import { useState, useEffect } from 'react';
import axios from 'axios';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Fab from '@mui/material/Fab';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// 3010 포트 도메인
// URL 맨 뒤에 / (슬래시) 없어야 하므로 주의할 것
const EXPRESS_URL = 'https://moviesdb.run.goorm.site';

function SongTable() {
	const [director, setDirector] = useState('감독(최고 신선도)');
	const [directorNames, setDirectorNames] = useState([]);
	const [items, setItems] = useState([]);
	var default_items

	async function directorChange(event) {
		setDirector(event.target.value);
		if (event.target.value) {
			const all = await axios.get(EXPRESS_URL + '/movie');
			const temp = all.data.filter(function (data) {
				return data.name===event.target.value;
			});
			setItems(temp)
		} else {
			const all = await axios.get(EXPRESS_URL + '/movie');
			setItems(all.data);
		}
	}
	useEffect(() => {
		refresh();
	}, []);

	async function refresh() {
		const all = await axios.get(EXPRESS_URL + '/movie');
		const director_name = await axios.get(EXPRESS_URL + '/director');
		console.log(director_name.data);
		console.log(all.data);
		setItems(all.data);
		setDirectorNames(director_name.data);
	}

	async function del(url) {
		const res = await axios.get(EXPRESS_URL + '/del/' + url);
		alert(res.data.message);
		refresh();
	}

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<Fab
				color="primary"
				sx={{
					position: 'fixed',
					top: (theme) => theme.spacing(2),
					right: (theme) => theme.spacing(2),
				}}
				onClick={() => {
					refresh();
				}}
			>
				<RefreshIcon />
			</Fab>
			<TableContainer sx={{ maxHeight: 545 }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							<TableCell>포스터</TableCell>
							<TableCell>제목</TableCell>
							<TableCell>
								<FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
									<InputLabel id="demo-simple-select-label">
										감독(최고 신선도)
									</InputLabel>
									<Select
										labelId="demo-simple-select-standard-label"
										id="demo-simple-select-standard"
										value={director}
										onChange={directorChange}
										label="Age"
									>
										<MenuItem value="">
											<em>None</em>
										</MenuItem>
										{directorNames.map((name, i) => (
											<MenuItem key={name.name} value={name.name}>
												{name.name}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</TableCell>
							<TableCell>선호도</TableCell>
							<TableCell>삭제</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{items.map((song, i) => (
							<TableRow hover role="checkbox" key={i}>
								<TableCell>
									<a
										href={'https://www.rottentomatoes.com/m/' + song.url}
										target="_blank"
										rel="noreferrer"
									>
										<img src={song.imgurl} alt="포스터" />
									</a>
								</TableCell>
								<TableCell>{song.title}</TableCell>
								<TableCell>
									{song.name}({song.HighScore})
								</TableCell>
								{song.rating == null ? (
									<TableCell />
								) : (
									<TableCell>
										<img
											src={
												process.env.PUBLIC_URL +
												`/images/${song.rating}.jpg`
											}
											alt="선호도"
										/>
									</TableCell>
								)}
								<TableCell>
									<Button
										variant="outlined"
										onClick={() => {
											del(song.url);
										}}
										endIcon={<DeleteIcon />}
									>
										삭제
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
}

export default SongTable;