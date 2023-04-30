import { Box, Grid } from '@mui/material';
import classnames from 'classnames';
import './MessageComponent.css';
import { useTheme } from '@mui/material/styles';

interface IProps {
    index: number,
    sent: boolean,
    content: string,
}

export const TEST_ID_MESSAGE_COMPONENT_CONTENT_PREFIX = "message-component-content";

const MessageComponent = (props: IProps) => {
    const theme = useTheme();

    return (
        <Box
            key={`message-component-` + props.index}
            id={`message-component-` + props.index}
            className={classnames({ 'sent-message-row': props.sent, 'received-message-row': !props.sent })} 
            padding={theme.spacing(1)}>
            <Grid className={classnames('message', { 'sent-message': props.sent, 'received-message': !props.sent })}>
                <Grid item xs={12}>
                    <Box whiteSpace="pre-wrap" padding={theme.spacing(2)}>
                        <span data-testid={TEST_ID_MESSAGE_COMPONENT_CONTENT_PREFIX + '-' + props.index}>
                            {props.content}
                        </span>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default MessageComponent;