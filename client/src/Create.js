import * as React from 'react';
import axios from 'axios';
import { useRef, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import LinkIcon from '@mui/icons-material/Link';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';

const EXPRESS_URL = 'https://moviesdb.run.goorm.site/inject/';

export default function InsetDividers() {
	const [loading, setLoading] = useState(false);
	const [value, setValue] = useState();

	async function sendUrl() {
		setLoading(true);
		const sendurl = EXPRESS_URL + urlRef.current.value.split('/m/', 2)[1];
		const res = await axios.get(sendurl);
		setValue('');
		console.log(res.data);
		alert(res.data.message);
		setLoading(false);
	}
	const urlRef = useRef();
	return (
		<React.Fragment>
			<Box sx={{ color: '#007FFF', display: 'flex', justifyContent: 'flex-end' }}>
				<List sx={{ maxWidth: 360 }}>
					<ListItem>
						<ListItemAvatar>
							<LinkIcon color="primary" sx={{ fontSize: 40 }} />
						</ListItemAvatar>
						<TextField
							onChange={(newValue) => {setValue(newValue.target.value);}}
							required
							multiline
							inputRef={urlRef}
							defaultValue={value}
							value={value}
							id="link"
							label="Required"
						/>
						<Box sx={{ p: 1, display: 'flex', justifyContent: 'flex-end' }}>
							<LoadingButton loading={loading} onClick={sendUrl} variant="contained">
								<span>Make</span>
							</LoadingButton>
						</Box>
					</ListItem>
				</List>
			</Box>
		</React.Fragment>
	);
}