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
    const [hasFirstPlaceCommand, setHasFirstPlaceCommand] = useState<boolean>(false);

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
        commandMessages.trim();
        addMessage(commandMessages, MessageType.SEND);
        setScrollToBottom(true);
        setShowResetButton(true);

        const commands: string[] = commandMessages.split("\n");
        let validCommandsFromInput: Command[] = validCommands;
        let hasInvalidCommands: boolean = false;
        let numberOfNewValidCommands: number = 0;
        commands.forEach((message) => {
            if (message !== "") {
                const command: Command | undefined = mapMessageToCommand(message);
                if (command) {
                    validCommandsFromInput.push(command);
                    numberOfNewValidCommands++;
                } else {
                    hasInvalidCommands = true;
                }
            }
        });

        if (hasInvalidCommands && numberOfNewValidCommands === 0) {
            const content = "I don't quite undestand the command that you've just sent.\n\nCan you try again with the valid commands?"
            addMessage(content, MessageType.RECEIVE);
            setScrollToBottom(true);
        }

        const indexOfFirstPlaceCommand = validCommandsFromInput.findIndex(command => command instanceof PlaceCommand);
        if (indexOfFirstPlaceCommand === -1 && !hasFirstPlaceCommand) {
            const content = "Seems like there isn't any PLACE command yet.\n\nThe first valid command is a PLACE command.\n\nAll commands in the sequence will be discarded until a valid PLACE command has been executed."
            addMessage(content, MessageType.RECEIVE);
            setScrollToBottom(true);
            setProcessing(false);
        }

        if (validCommandsFromInput.length === 0) {
            setProcessing(false);
        }

        setValidCommands(validCommandsFromInput);
        commandRobotVacuuum();
    }

    const mapMessageToCommand = (message: string): Command | undefined => {
        message = message.toUpperCase();
        message = message.trim();
        if (message.includes(CommandType.PLACE)) {
            let locationDirectionMessage = message.replace(CommandType.PLACE, "");
            locationDirectionMessage.trim();

            const locationDirection: string[] = locationDirectionMessage.trim().split(",");
            const position: Position = { x: parseInt(locationDirection[0]), y: parseInt(locationDirection[1]) };

            let direction: Direction;

            if (locationDirection[2] === Direction.NORTH) {
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
        } else if (message === CommandType.MOVE) {
            return new MoveCommand();
        } else if (message === CommandType.LEFT) {
            return new LeftCommand();
        } else if (message === CommandType.RIGHT) {
            return new RightCommand();
        } else if (message === CommandType.REPORT) {
            return new ReportCommand();
        }
        return undefined;
    }

    const commandRobotVacuuum = () => {
        const indexOfFirstPlaceCommand = validCommands.findIndex(command => command instanceof PlaceCommand);
        let hasPlaceCommand = hasFirstPlaceCommand;
        if (!hasFirstPlaceCommand) {
            hasPlaceCommand = indexOfFirstPlaceCommand > -1;
            setHasFirstPlaceCommand(hasPlaceCommand);
        }

        if (hasPlaceCommand) {
            if (indexOfFirstPlaceCommand !== 0) {
                validCommands.splice(0, indexOfFirstPlaceCommand);
            }

            let position: Position = { x: MIN_POSITION_X, y: MIN_POSITION_Y };
            let direction: Direction = Direction.NORTH;
            let newRobotVacuum: RobotVacuum = {
                position: position,
                direction: direction
            }

            if (robotVacuum) {
                newRobotVacuum.position.x = robotVacuum.position.x;
                newRobotVacuum.position.y = robotVacuum.position.y;
                newRobotVacuum.direction = robotVacuum.direction;
            }

            let hasError: boolean = false;
            let errorMessage: string = "";

            validCommands.filter(command => !command.executed)
                .forEach(command => {
                    if (command instanceof PlaceCommand) {
                        const placeCommand: PlaceCommand = command as PlaceCommand;
                        if (placeCommand.position.x >= MIN_POSITION_X && placeCommand.position.y >= MIN_POSITION_Y && placeCommand.position.x <= MAX_POSITION_X && placeCommand.position.y <= MAX_POSITION_Y) {
                            newRobotVacuum.position.x = placeCommand.position.x;
                            newRobotVacuum.position.y = placeCommand.position.y;
                            newRobotVacuum.direction = placeCommand.direction;
                            command.executed = true;
                        } else {
                            hasError = true;
                            errorMessage = "Please enter a PLACE command that is within " + MIN_POSITION_X + "," + MIN_POSITION_Y + " and " + MAX_POSITION_X + "," + MAX_POSITION_Y + ".";
                        }
                    } else if (command instanceof MoveCommand && !hasError) {
                        if (newRobotVacuum.direction === Direction.NORTH) {
                            const plannedPositionY = newRobotVacuum.position.y + 1;
                            if (plannedPositionY <= MAX_POSITION_Y) {
                                newRobotVacuum.position.y = plannedPositionY;
                            }
                        } else if (newRobotVacuum.direction === Direction.SOUTH) {
                            const plannedPositionY = newRobotVacuum.position.y - 1;
                            if (plannedPositionY >= MIN_POSITION_Y) {
                                newRobotVacuum.position.y = plannedPositionY;
                            }
                        } else if (newRobotVacuum.direction === Direction.EAST) {
                            const plannedPositionX = newRobotVacuum.position.x + 1;
                            if (plannedPositionX <= MAX_POSITION_X) {
                                newRobotVacuum.position.x = plannedPositionX;
                            }
                        } else if (newRobotVacuum.direction === Direction.WEST) {
                            const plannedPositionX = newRobotVacuum.position.x - 1;
                            if (plannedPositionX >= MIN_POSITION_X) {
                                newRobotVacuum.position.x = plannedPositionX;
                            }
                        }
                        command.executed = true;
                    } else if (command instanceof LeftCommand && !hasError) {
                        if (newRobotVacuum.direction === Direction.NORTH) {
                            newRobotVacuum.direction = Direction.WEST;
                            command.executed = true;
                        } else if (newRobotVacuum.direction === Direction.SOUTH) {
                            newRobotVacuum.direction = Direction.EAST;
                            command.executed = true;
                        } else if (newRobotVacuum.direction === Direction.EAST) {
                            newRobotVacuum.direction = Direction.NORTH;
                            command.executed = true;
                        } else if (newRobotVacuum.direction === Direction.WEST) {
                            newRobotVacuum.direction = Direction.SOUTH;
                            command.executed = true;
                        }
                    } else if (command instanceof RightCommand && !hasError) {
                        if (newRobotVacuum.direction === Direction.NORTH) {
                            newRobotVacuum.direction = Direction.EAST;
                            command.executed = true;
                        } else if (newRobotVacuum.direction === Direction.SOUTH) {
                            newRobotVacuum.direction = Direction.WEST;
                            command.executed = true;
                        } else if (newRobotVacuum.direction === Direction.EAST) {
                            newRobotVacuum.direction = Direction.SOUTH;
                            command.executed = true;
                        } else if (newRobotVacuum.direction === Direction.WEST) {
                            newRobotVacuum.direction = Direction.NORTH;
                            command.executed = true;
                        }
                    } else if (command instanceof ReportCommand) {
                        setTimeout(() => {
                            setProcessing(false);
                        }, 300);
                        let content: string = "";
                        if (hasError) {
                            content = errorMessage;
                        } else {
                            content = newRobotVacuum.position.x + "," + newRobotVacuum.position.y + "," + newRobotVacuum.direction;
                        }
                        addMessage(content, MessageType.RECEIVE);
                        setScrollToBottom(true);
                        setShowViewPositionButton(true);
                        setValidCommands([]);
                        command.executed = true;
                    }
                    setRobotVacuum(newRobotVacuum);
                });
        }
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
        setShowViewPositionDialog(false);
        setShowViewPositionButton(false);
        setValidCommands([]);
        setMessages([]);
        setHasFirstPlaceCommand(false);

        let position: Position = { x: MIN_POSITION_X, y: MIN_POSITION_Y };
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