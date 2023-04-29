import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material"

interface IProps {
    onConfirmReset: () => void,
    onCancelReset: () => void
}

const ResetConfirmationDialog = (props: IProps) => {
    return (
        <Dialog
            open={true}
            onClose={props.onCancelReset}>
            <DialogTitle id="reset-confirmation-alert-dialog-title">
                Reset Command
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="reset-confirmation-alert-dialog-description">
                    Are you sure that you want to reset?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onCancelReset}>No</Button>
                <Button onClick={props.onConfirmReset} autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ResetConfirmationDialog;