import './CommandComponent.css';
import { Container, Box, IconButton, Input, InputAdornment, FormControl, Typography, Grid, LinearProgress } from '@mui/material';
import Send from '@mui/icons-material/Send';
import { useState } from 'react';

interface IProps {
    onSend: (commandMessage: string) => void,
    processing: boolean,
}

export const TEST_ID_INPUT_COMMAND = 'input-command';
export const TEST_ID_BUTTON_SEND = 'button-send';

const CommandComponent = (props: IProps) => {
    const [commandMessage, setCommandMessage] = useState<string>('');

    const handleOnClick = () => {
        if (commandMessage) {
            props.onSend(commandMessage);
            setCommandMessage('');
        }
    }

    const handleOnChangeInput = (event: any) => {
        setCommandMessage(event.target.value);
    }

    return (
        <Container maxWidth="md" className='command-container'>
            <Grid container alignItems="flex-end">
                {props.processing && <Grid item xs={12}>
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                </Grid>}
                <Grid item xs={12}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <Input
                            id="input-command"
                            inputProps={{ 'data-testid': TEST_ID_INPUT_COMMAND }}
                            multiline
                            placeholder="Enter command"
                            value={commandMessage}
                            onChange={handleOnChangeInput}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        data-testid={TEST_ID_BUTTON_SEND}
                                        onClick={handleOnClick}
                                        disabled={commandMessage === ''}
                                        className='button-send-icon'>
                                        <Send />
                                    </IconButton>
                                </InputAdornment>
                            }
                            minRows={1}
                            maxRows={5}
                            sx ={{ border: 0 }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="caption" display="block">
                        A Robot Vacuum App powered by ReactJS. Developed by Ong Hong Hng.
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    )
}

export default CommandComponent;