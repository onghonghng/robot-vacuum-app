# Robot Vacuum ReactJS Application

Prepared by: Ong Hong Hng

This project is a ReactJS web app that simulates a robot vacuum in an area of dimensions 5 units by 5 units. 

Visit [https://onghonghng.github.io/robot-vacuum-app/](https://onghonghng.github.io/robot-vacuum-app/) to give it a try!

The application is deployed using GitHub Pages.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The followings are the brief explanation of the project. 

## Requirements

- The application is managed by yarn, so yarn is required on the system.

## Design

- The application allows the user to chat with the robot vacuum. Commands are sent as a form of a message, and the output is replied as a message. There is a form of conversation between the user and the robot vacuum.

## Assumptions

- The minimum x and y coordinate allowed for the PLACE command is 0.
    - The lowest possible x,y position is 0,0.
- The maximum x and y coordinate allowed for the PLACE command is 5.
    - The lowest possible x,y position is 5,5.

## Instructions
### Running the Application in Local Machine
1.	Please clone the repository to your local machine to run or test the application.
2.	In the project directory, open a terminal window or command prompt.
3.	Install the required dependencies by running the following command: `yarn install`
4.	To run the app in the development mode, run: `yarn start`
5.	Open[http://localhost:3000](http://localhost:3000) to view it in the browser.
6.	To run the tests of the app, run: `yarn test`

### Commanding the Robot Vacuum
1.	Enter a command in the text field and press the `send` button.
2.	The command will be processed and the output will be returned.
3.	`View Position` button gives a visual representation of the current position and direction of the robot vacuum.
4.	`Reset` button sets the robot vacuum back to the original state.