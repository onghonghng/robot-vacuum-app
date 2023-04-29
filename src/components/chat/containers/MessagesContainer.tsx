import MessageComponent from '../components/MessageComponent';
import { Message } from '../../../interfaces/message/Message';
import { MessageType } from '../../../interfaces/message/MessageType';
import './MessagesContainer.css';
import { Grid, List, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface IProps {
    messages: Message[],
}

const MessagesContainer = (props: IProps) => {
    const theme = useTheme();

    return (
        <Container maxWidth="md">
            <Grid container className='messages-container' padding={theme.spacing(2)}>
                <Grid item xs={12}>
                    <List className='conversations'>
                        {props.messages.map((message, index) =>
                            <MessageComponent
                                key={index}
                                index={index}
                                sent={message.type === MessageType.SEND}
                                content={message.content} />)}
                    </List>
                </Grid>
            </Grid>
        </Container>
    );
}

export default MessagesContainer;