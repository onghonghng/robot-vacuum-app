import { ReactElement } from "react";
import { Direction } from "../../../interfaces/direction/Direction";
import { Position } from "../../../interfaces/position/Position";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid } from "@mui/material"
import { ArrowCircleDown, ArrowCircleLeft, ArrowCircleRight, ArrowCircleUp, CheckBoxOutlineBlank } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

interface IProps {
    position: Position,
    direction: Direction,
    onClose: () => void
}

const ViewPositionDialog = (props: IProps) => {
    const theme = useTheme();

    const renderPositionMap = () => {
        let elements: ReactElement[] = [];
        for (let y = 5; y >= 0; y--) {
            for (let x = 0; x <= 5; x++) {
                if (x === props.position.x && y === props.position.y) {
                    switch (props.direction) {
                        case Direction.NORTH:
                            elements.push(
                                <Grid item xs={2} columns={12}>
                                    <ArrowCircleUp />
                                </Grid>
                            );
                            break;
                        case Direction.EAST:
                            elements.push(
                                <Grid item xs={2} columns={12}>
                                    <ArrowCircleRight />
                                </Grid>
                            );
                            break;
                        case Direction.SOUTH:
                            elements.push(
                                <Grid item xs={2} columns={12}>
                                    <ArrowCircleDown />
                                </Grid>
                            );
                            break;
                        case Direction.WEST:
                            elements.push(
                                <Grid item xs={2} columns={12}>
                                    <ArrowCircleLeft />
                                </Grid>
                            );
                            break;
                        default:
                            break;

                    }
                } else {
                    elements.push(
                        <Grid item xs={2} columns={12}>
                            <CheckBoxOutlineBlank />
                        </Grid>
                    );
                }
            }
        }
        return elements;
    }
    return (
        <Dialog
            open={true}
            onClose={props.onClose}>
            <DialogTitle id="reset-confirmation-alert-dialog-title">
                View Current Position
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="reset-confirmation-alert-dialog-description" marginBottom={theme.spacing(3)}>
                    RoboVac is currently at position {props.position.x},{props.position.y} and is facing {props.direction}.
                </DialogContentText>
                <Grid container>
                    {renderPositionMap()}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ViewPositionDialog;