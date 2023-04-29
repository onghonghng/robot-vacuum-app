import { render, screen, fireEvent } from '@testing-library/react';
import ChatContainer from '../../../../components/chat/containers/ChatContainer';
import { TEST_ID_INPUT_COMMAND, TEST_ID_BUTTON_SEND } from '../../../../components/chat/components/CommandComponent';
import { TEST_ID_MESSAGE_COMPONENT_CONTENT_PREFIX } from '../../../../components/chat/components/MessageComponent';
import { TEST_ID_INTRODUCTION_COMPONENT } from '../../../../components/chat/components/IntroductionComponent';

describe('ChatContainer', () => {
    test('Command with PLACE 0,0,NORTH MOVE REPORT', () => {
        render(<ChatContainer />);
        const inputValue = 'PLACE 0,0,NORTH\nMOVE\nREPORT';
        const expectedOutput = '0,1,NORTH';
        
        const inputCommand: HTMLTextAreaElement = screen.getByTestId(TEST_ID_INPUT_COMMAND);
        const buttonSend: HTMLElement = screen.getByTestId(TEST_ID_BUTTON_SEND);
        const containerIntroductionComponent = screen.getByTestId(TEST_ID_INTRODUCTION_COMPONENT);

        expect(containerIntroductionComponent).toBeInTheDocument();
        
        fireEvent.change(inputCommand, { target: { value: inputValue } });
        expect(inputCommand.value).toBe(inputValue);
        
        fireEvent.click(buttonSend);
        
        const spanMessageComponentContent1: HTMLSpanElement = screen.getByTestId(TEST_ID_MESSAGE_COMPONENT_CONTENT_PREFIX + '-0');
        const spanMessageComponentContent2: HTMLSpanElement = screen.getByTestId(TEST_ID_MESSAGE_COMPONENT_CONTENT_PREFIX + '-1');
        
        expect(screen.queryByTestId(TEST_ID_INTRODUCTION_COMPONENT)).not.toBeInTheDocument();
        expect(spanMessageComponentContent1.textContent).toBe(inputValue);
        expect(spanMessageComponentContent2.textContent).toBe(expectedOutput);
    });
    
    test('Command with PLACE 0,0,NORTH LEFT REPORT', () => {
        render(<ChatContainer />);
        const inputValue = 'PLACE 0,0,NORTH\nLEFT\nREPORT';
        const expectedOutput = '0,0,WEST';
        
        const inputCommand: HTMLTextAreaElement = screen.getByTestId(TEST_ID_INPUT_COMMAND);
        const buttonSend: HTMLElement = screen.getByTestId(TEST_ID_BUTTON_SEND);
        const containerIntroductionComponent = screen.getByTestId(TEST_ID_INTRODUCTION_COMPONENT);

        expect(containerIntroductionComponent).toBeInTheDocument();
        
        fireEvent.change(inputCommand, { target: { value: inputValue } });
        expect(inputCommand.value).toBe(inputValue);
        
        fireEvent.click(buttonSend);
        
        const spanMessageComponentContent1: HTMLSpanElement = screen.getByTestId(TEST_ID_MESSAGE_COMPONENT_CONTENT_PREFIX + '-0');
        const spanMessageComponentContent2: HTMLSpanElement = screen.getByTestId(TEST_ID_MESSAGE_COMPONENT_CONTENT_PREFIX + '-1');
        
        expect(screen.queryByTestId(TEST_ID_INTRODUCTION_COMPONENT)).not.toBeInTheDocument();
        expect(spanMessageComponentContent1.textContent).toBe(inputValue);
        expect(spanMessageComponentContent2.textContent).toBe(expectedOutput);
    });

    test('Command with PLACE 1,2,EAST MOVE MOVE LEFT MOVE REPORT', () => {
        render(<ChatContainer />);
        const inputValue = 'PLACE 1,2,EAST\nMOVE\nMOVE\nLEFT\nMOVE\nREPORT';
        const expectedOutput = '3,3,NORTH';
        
        const inputCommand: HTMLTextAreaElement = screen.getByTestId(TEST_ID_INPUT_COMMAND);
        const buttonSend: HTMLElement = screen.getByTestId(TEST_ID_BUTTON_SEND);
        const containerIntroductionComponent = screen.getByTestId(TEST_ID_INTRODUCTION_COMPONENT);

        expect(containerIntroductionComponent).toBeInTheDocument();
        
        fireEvent.change(inputCommand, { target: { value: inputValue } });
        expect(inputCommand.value).toBe(inputValue);
        
        fireEvent.click(buttonSend);
        
        const spanMessageComponentContent1: HTMLSpanElement = screen.getByTestId(TEST_ID_MESSAGE_COMPONENT_CONTENT_PREFIX + '-0');
        const spanMessageComponentContent2: HTMLSpanElement = screen.getByTestId(TEST_ID_MESSAGE_COMPONENT_CONTENT_PREFIX + '-1');
        
        expect(screen.queryByTestId(TEST_ID_INTRODUCTION_COMPONENT)).not.toBeInTheDocument();
        expect(spanMessageComponentContent1.textContent).toBe(inputValue);
        expect(spanMessageComponentContent2.textContent).toBe(expectedOutput);
    });

    test('Command with PLACE 5,5,NORTH MOVE REPORT', () => {
        render(<ChatContainer />);
        const inputValue = 'PLACE 5,5,NORTH\nMOVE\nREPORT';
        const expectedOutput = '5,5,NORTH';
        
        const inputCommand: HTMLTextAreaElement = screen.getByTestId(TEST_ID_INPUT_COMMAND);
        const buttonSend: HTMLElement = screen.getByTestId(TEST_ID_BUTTON_SEND);
        const containerIntroductionComponent = screen.getByTestId(TEST_ID_INTRODUCTION_COMPONENT);

        expect(containerIntroductionComponent).toBeInTheDocument();
        
        fireEvent.change(inputCommand, { target: { value: inputValue } });
        expect(inputCommand.value).toBe(inputValue);
        
        fireEvent.click(buttonSend);
        
        const spanMessageComponentContent1: HTMLSpanElement = screen.getByTestId(TEST_ID_MESSAGE_COMPONENT_CONTENT_PREFIX + '-0');
        const spanMessageComponentContent2: HTMLSpanElement = screen.getByTestId(TEST_ID_MESSAGE_COMPONENT_CONTENT_PREFIX + '-1');
        
        expect(screen.queryByTestId(TEST_ID_INTRODUCTION_COMPONENT)).not.toBeInTheDocument();
        expect(spanMessageComponentContent1.textContent).toBe(inputValue);
        expect(spanMessageComponentContent2.textContent).toBe(expectedOutput);
    });
});
