import { Grid, Container, Box, Paper, Typography, Divider } from '@mui/material';
import './IntroductionComponent.css';
import { useTheme } from '@mui/material/styles';

export const TEST_ID_INTRODUCTION_COMPONENT = "introduction-component"

const IntroductionComponent = () => {
    const theme = useTheme();

    return (
        <Container maxWidth="md" data-testid={TEST_ID_INTRODUCTION_COMPONENT}>
            <Box sx={{ flexGrow: 1 }} padding={theme.spacing(2)}>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} sm={4} columns={12}>
                        <Typography variant='h5'>Rules</Typography>
                    </Grid>
                    <Grid item xs={12} sm={8} columns={12}>
                        <Grid>
                            <Grid item xs={12} columns={12} marginBottom={theme.spacing(2)}>
                                <Paper elevation={0} className='introduction-rules-description'>
                                    <Box padding={theme.spacing(2)} textAlign="left">
                                        <span>
                                            This application simulates the movements of a robot vacuum (RoboVac) in an area of dimensions 5 × 5 units.
                                        </span>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} columns={12} marginBottom={theme.spacing(2)}>
                                <Paper elevation={0} className='introduction-rules-description'>
                                    <Box padding={theme.spacing(2)} textAlign="left">
                                        <span>
                                            There are no obstructions in the area. Robovac is free to roam around the area but must not leave the area. You may attempt to move RoboVac out of the area, but it will not be allowed.
                                        </span>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} columns={12} marginBottom={theme.spacing(2)}>
                                <Paper elevation={0} className='introduction-rules-description'>
                                    <Box padding={theme.spacing(2)} textAlign="left">
                                        <span>
                                            The first valid command to the robot is a <code>PLACE</code> command, after that, any sequence of commands may be issued, in any order, including another PLACE command.
                                        </span>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} columns={12} marginBottom={theme.spacing(2)}>
                                <Paper elevation={0} className='introduction-rules-description'>
                                    <Box padding={theme.spacing(2)} textAlign="left">
                                        <span>
                                            All commands in the sequence will be discarded until a valid <code>PLACE</code> command has been executed.
                                        </span>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} columns={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12} columns={6} textAlign="left">
                        <Typography variant='h5'>Commands</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} columns={12}>
                        <code className='introduction-command-text'>PLACE X,Y,F</code>
                    </Grid>
                    <Grid item xs={12} sm={8} columns={12}>
                        <Paper elevation={0} className='introduction-command-description'>
                            <Box padding={theme.spacing(2)}>
                                <span>
                                    Puts the robot in the area at position X,Y and facing direction F (NORTH, SOUTH, EAST, or WEST).
                                </span>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4} columns={12}>
                        <code className='introduction-command-text'>MOVE</code>
                    </Grid>
                    <Grid item xs={12} sm={8} columns={12}>
                        <Paper elevation={0} className='introduction-command-description'>
                            <Box padding={theme.spacing(2)}>
                                <span>
                                    Moves the robot one unit forward in the direction it is currently facing.
                                </span>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4} columns={12}>
                        <code className='introduction-command-text'>LEFT<br />RIGHT</code>
                    </Grid>
                    <Grid item xs={12} sm={8} columns={12}>
                        <Paper elevation={0} className='introduction-command-description'>
                            <Box padding={theme.spacing(2)}>
                                <span>
                                    Rotates the robot 90 degrees in the specified direction without changing the position of the robot.
                                </span>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4} columns={12}>
                        <code className='introduction-command-text'>REPORT</code>
                    </Grid>
                    <Grid item xs={12} sm={8} columns={12}>
                        <Paper elevation={0} className='introduction-command-description'>
                            <Box padding={theme.spacing(2)}>
                                <span>
                                    Announces the X,Y and F of the robot.
                                </span>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} columns={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12} sm={4} columns={12}>
                        <Typography variant='h5'>Examples</Typography>
                    </Grid>
                    <Grid item xs={12} sm={8} columns={12}>
                        <Grid>
                            <Grid item xs={12} columns={12} marginBottom={theme.spacing(2)}>
                                <Paper elevation={0} className='introduction-command-description'>
                                    <Box padding={theme.spacing(2)} textAlign="left">
                                        <code>
                                            PLACE 0,0,NORTH<br />MOVE<br />REPORT
                                        </code>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} columns={12}>
                                <Paper elevation={0} className='introduction-command-description'>
                                    <Box padding={theme.spacing(2)} textAlign="left">
                                        <code>
                                            PLACE 1,2,EAST<br />MOVE<br />MOVE<br />LEFT<br />MOVE<br />REPORT
                                        </code>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default IntroductionComponent;