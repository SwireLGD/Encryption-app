import React, { useState } from 'react';
import { Props } from './types.d';
import { Container, TextField, Button, Grid, TextareaAutosize } from '@mui/material';
import axiosApi from './axiosApi';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';

const App: React.FC = () => {
  const [state, setState] = useState<Props>({
    password: '',
    message: '',
    encodedMessage: '',
    decodedMessage: ''
  });

  const handleEncode = async () => {
    if (!state.password) alert('Enter a password!');
    else {
      try {
        const response = await axiosApi.post('/encode', { password: state.password, message: state.message });
        setState(prevState => ({ ...prevState, encodedMessage: response.data.encoded }));
      } catch (error) {
        console.error('Something went wrong', error);
      }
    }
  };

  const handleDecode = async () => {
    if (!state.password) alert('Enter a password!');
    else {
      try {
        const response = await axiosApi.post('/decode', { password: state.password, message: state.encodedMessage });
        setState(prevState => ({ ...prevState, decodedMessage: response.data.decoded }));
      } catch (error) {
        console.error('Something went wrong', error);
      }
    }
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} alignItems="center" justifyContent="center" style={{ marginTop: 20 }}>
        <Grid item xs={12}>
          <TextareaAutosize
            minRows={3}
            placeholder="Decoded Message"
            style={{ width: '100%' }}
            value={state.decodedMessage}
            onChange={(e) => setState(prevState => ({ ...prevState, decodedMessage: e.target.value }))}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            value={state.password}
            onChange={(e) => setState(prevState => ({ ...prevState, password: e.target.value }))}
          />
        </Grid>
          <Button variant="contained" sx={{ margin: '20px' }} onClick={handleEncode} startIcon={<ArrowDownward />}></Button>
          <Button variant="contained" onClick={handleDecode} startIcon={<ArrowUpward />}></Button>
        <Grid item xs={12}>
          <TextareaAutosize
            minRows={3}
            placeholder="Encoded Message"
            style={{ width: '100%' }}
            value={state.encodedMessage}
            onChange={(e) => setState(prevState => ({ ...prevState, encodedMessage: e.target.value }))}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
