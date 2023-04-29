import { Grid, AppBar, Toolbar, Typography, Button, Box, Divider } from '@mui/material';
import './ChatContainer.css';
import CommandComponent from '../components/CommandComponent';
import { Command } from '../../../interfaces/command/Command';
import { CommandType } from '../../../interfaces/command/CommandType';
import { MoveCommand } from '../../../interfaces/command/MoveCommand';
import { PlaceCommand } from '../../../interfaces/command/PlaceCommand';
import { Direction } from '../../../interfaces/direction/Direction';
import { Position } from '../../../interfaces/position/Position';
import { LeftCommand } from '../../../interfaces/command/LeftCommand';
import { RightCommand } from '../../../interfaces/command/RightCommand';
import { ReportCommand } from '../../../interfaces/command/ReportCommand';
import { useEffect, useState, useRef } from 'react';
import { RobotVacuum } from '../../../interfaces/robotVacuum/RobotVacuum';
import { Message } from '../../../interfaces/message/Message';
import { MessageType } from '../../../interfaces/message/MessageType';
import MessagesContainer from './MessagesContainer';
import IntroductionComponent from '../components/IntroductionComponent';
import ResetConfirmationDialog from '../components/ResetConfirmationDialog';
import ViewPositionDialog from '../components/ViewPositionDialog';

const MIN_POSITION_X = 0;
const MIN_POSITION_Y = 0;
const MAX_POSITION_X = 5;
const MAX_POSITION_Y = 5;
const ChatContainer = () => {

    const [validCommands, setValidCommands] = useState<Command[]>([]);
    const [robotVacuum, setRobotVacuum] = useState<RobotVacuum>();
    const [messages, setMessages] = useState<Message[]>([]);
    const bodyContentRef = useRef<HTMLDivElement>(null);
    const [scrollToBottom, setScrollToBottom] = useState<boolean>(false);
    const [processing, setProcessing] = useState<boolean>(false);
    const [showResetDialog, setShowResetDialog] = useState<boolean>(false);
    const [showResetButton, setShowResetButton] = useState<boolean>(false);
    const [showViewPositionDialog, setShowViewPositionDialog] = useState<boolean>(false);
    const [showViewPositionButton, setShowViewPositionButton] = useState<boolean>(false);

    useEffect(() => {
        if (validCommands.length > 0) {
            commandRobotVacuuum();
        } else {
            let position: Position = {
                x: 0,
                y: 0
            };
            let direction: Direction = Direction.NORTH;
            let newRobotVacuum: RobotVacuum = {
                position: position,
                direction: direction
            }
            setRobotVacuum(newRobotVacuum);
            setProcessing(false);

            if (messages.length > 0) {
                const content = "I don't quite undestand the command that you've just sent.\n\nCan you try again with the valid commands?"
                addMessage(content, MessageType.RECEIVE);
                setScrollToBottom(true);
            }
        }
    }, [validCommands]);

    useEffect(() => {
        if (scrollToBottom) {
            setTimeout(() => {
                const bodyContent = bodyContentRef.current;
                if (bodyContent) {
                    bodyContent.scrollTop = bodyContent.scrollHeight;
                }
                setScrollToBottom(false);
            }, 100);
        }
    }, [scrollToBottom]);

    const addMessage = (content: string, type: MessageType) => {
        const message: Message = {
            type: type,
            content: content
        }
        let updatedMessages = messages;
        updatedMessages.push(message);
        setMessages(updatedMessages);
    }

    const handleOnSendForCommandComponent = (commandMessages: string) => {
        setProcessing(true);

        addMessage(commandMessages, MessageType.SEND);
        setScrollToBottom(true);
        setShowResetButton(true);

        const commands: string[] = commandMessages.split("\n");
        let hasFirstPlaceCommand: boolean = false;
        let validCommandsFromInput: Command[] = [];
        commands.forEach((message) => {
            const command: Command | undefined = mapMessageToCommand(message);
            if (command) {
                if (hasFirstPlaceCommand) {
                    validCommandsFromInput.push(command);
                } else {
                    if (command instanceof PlaceCommand) {
                        hasFirstPlaceCommand = true;
                        validCommandsFromInput.push(command);
                    }
                }
            }
        });
        setValidCommands(validCommandsFromInput);
    }

    const mapMessageToCommand = (message: string): Command | undefined => {
        message = message.toUpperCase();
        if (message.includes(CommandType.PLACE)) {
            let locationDirectionMessage = message.replace(CommandType.PLACE, "");
            locationDirectionMessage.trim();

            const locationDirection: string[] = locationDirectionMessage.trim().split(",");
            const position: Position = { x: parseInt(locationDirection[0]), y: parseInt(locationDirection[1]) };

            let direction: Direction;

            if (locationDirection[2] === Direction.NORTH.toString()) {
                direction = Direction.NORTH;
            } else if (locationDirection[2] === Direction.SOUTH) {
                direction = Direction.SOUTH;
            } else if (locationDirection[2] === Direction.EAST) {
                direction = Direction.EAST;
            } else if (locationDirection[2] === Direction.WEST) {
                direction = Direction.WEST;
            } else {
                return undefined;
            }

            return new PlaceCommand(position, direction);
        } else if (message.includes(CommandType.MOVE)) {
            return new MoveCommand();
        } else if (message.includes(CommandType.LEFT)) {
            return new LeftCommand();
        } else if (message.includes(CommandType.RIGHT)) {
            return new RightCommand();
        } else if (message.includes(CommandType.REPORT)) {
            return new ReportCommand();
        }
        return undefined;
    }

    const commandRobotVacuuum = () => {
        let position: Position = { x: 0, y: 0 };
        let direction: Direction = Direction.NORTH;
        let robotVacuum: RobotVacuum = {
            position: position,
            direction: direction
        }
        let hasError: boolean = false;
        let errorMessage: string = "";
        validCommands.forEach(command => {
            if (command instanceof PlaceCommand) {
                const placeCommand: PlaceCommand = command as PlaceCommand;
                if (placeCommand.position.x >= MIN_POSITION_X && placeCommand.position.y >= MIN_POSITION_Y && placeCommand.position.x <= MAX_POSITION_X && placeCommand.position.y <= MAX_POSITION_Y) {
                    robotVacuum.position.x = placeCommand.position.x;
                    robotVacuum.position.y = placeCommand.position.y;
                    robotVacuum.direction = placeCommand.direction;
                } else {
                    hasError = true;
                    errorMessage = "Please enter a PLACE command that is within " + MIN_POSITION_X + "," + MIN_POSITION_Y + " and " +  MAX_POSITION_X + "," + MAX_POSITION_Y + ".";
                }
            } else if (command instanceof MoveCommand && !hasError) {
                if (robotVacuum.direction === Direction.NORTH) {
                    const plannedPositionY = robotVacuum.position.y + 1;
                    if (plannedPositionY <= MAX_POSITION_Y) {
                        robotVacuum.position.y = plannedPositionY;
                    }
                } else if (robotVacuum.direction === Direction.SOUTH) {
                    const plannedPositionY = robotVacuum.position.y - 1;
                    if (plannedPositionY >= MIN_POSITION_Y) {
                        robotVacuum.position.y = plannedPositionY;
                    }
                } else if (robotVacuum.direction === Direction.EAST) {
                    const plannedPositionX = robotVacuum.position.x + 1;
                    if (plannedPositionX <= MAX_POSITION_X) {
                        robotVacuum.position.x = plannedPositionX;
                    }
                } else if (robotVacuum.direction === Direction.WEST) {
                    const plannedPositionX = robotVacuum.position.x - 1;
                    if (plannedPositionX >= MIN_POSITION_X) {
                        robotVacuum.position.x = plannedPositionX;
                    }
                }
            } else if (command instanceof LeftCommand && !hasError) {
                if (robotVacuum.direction === Direction.NORTH) {
                    robotVacuum.direction = Direction.WEST;
                } else if (robotVacuum.direction === Direction.SOUTH) {
                    robotVacuum.direction = Direction.EAST;
                } else if (robotVacuum.direction === Direction.EAST) {
                    robotVacuum.direction = Direction.NORTH;
                } else if (robotVacuum.direction === Direction.WEST) {
                    robotVacuum.direction = Direction.SOUTH;
                }
            } else if (command instanceof RightCommand && !hasError) {
                if (robotVacuum.direction === Direction.NORTH) {
                    robotVacuum.direction = Direction.EAST;
                } else if (robotVacuum.direction === Direction.SOUTH) {
                    robotVacuum.direction = Direction.WEST;
                } else if (robotVacuum.direction === Direction.EAST) {
                    robotVacuum.direction = Direction.SOUTH;
                } else if (robotVacuum.direction === Direction.WEST) {
                    robotVacuum.direction = Direction.NORTH;
                }
            } else if (command instanceof ReportCommand) {
                setTimeout(() => {
                    setProcessing(false);
                }, 300);
                let content: string = "";
                if (hasError) {
                    content = errorMessage;
                } else {
                    content = robotVacuum.position.x + "," + robotVacuum.position.y + "," + robotVacuum.direction;
                }
                addMessage(content, MessageType.RECEIVE);
                setScrollToBottom(true);
                setShowViewPositionButton(true);
            }
            setRobotVacuum(robotVacuum);
            
        });
    }

    const handleOnClickViewPosition = () => {
        setShowViewPositionDialog(true);
    }

    const handleOnCloseViewPosition = () => {
        setShowViewPositionDialog(false);
    }

    const handleOnClickReset = () => {
        setShowResetDialog(true);
    }

    const handleOnCancelReset = () => {
        setShowResetDialog(false);
    }

    const handleOnConfirmReset = () => {
        setShowResetDialog(false);
        setShowResetButton(false);
        setValidCommands([]);
        setMessages([]);
        let position: Position = {
            x: 0,
            y: 0
        };
        let direction: Direction = Direction.NORTH;
        let newRobotVacuum: RobotVacuum = {
            position: position,
            direction: direction
        }
        setRobotVacuum(newRobotVacuum);
        const bodyContent = bodyContentRef.current;
        if (bodyContent) {
            bodyContent.scrollTop = 0;
        }
    }

    return (
        <Grid container direction="column">
            <Grid item xs>
                <Box>
                    <AppBar position="sticky" className='app-bar'>
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                RoboVac
                            </Typography>
                            {showViewPositionButton && <Button color="inherit" onClick={handleOnClickViewPosition}>View Position</Button>}
                            {showResetButton && <Button color="inherit" onClick={handleOnClickReset}>Reset</Button>}
                        </Toolbar>
                    </AppBar>
                </Box>
            </Grid>
            <Grid item xs>
                <Box ref={bodyContentRef} className='chat-body-content'>
                    {messages.length === 0 ?
                        <>
                            <IntroductionComponent />
                        </>
                        :
                        <>
                            {<MessagesContainer messages={messages} />}
                        </>}
                </Box>
            </Grid>
            <Grid item xs className='footer'>
                <Divider />
                <CommandComponent onSend={handleOnSendForCommandComponent} processing={processing} />
            </Grid>
            {showResetDialog && <ResetConfirmationDialog onConfirmReset={handleOnConfirmReset} onCancelReset={handleOnCancelReset} />}
            {showViewPositionDialog && robotVacuum && <ViewPositionDialog position={robotVacuum.position} direction={robotVacuum.direction} onClose={handleOnCloseViewPosition} />}
        </Grid>
    )
}

export default ChatContainer;