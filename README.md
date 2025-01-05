# Coin Changer React App

This React.js web application calculates the **minimum** number of coins needed to make up a target amount.

For example:
- Target amount = $7.03
- Coin denominator = [0.01, 0.5, 1, 5, 10]
- Output by app: [0.01, 0.01, 0.01, 1, 1, 5]

## Tech stack
- Languages: **React.js (JavaScript) & CSS**
- Infrastructure (Containerization & Deployment): **Docker & AWS EC2**

## APIs used
https://github.com/melvincwng/2025_melvin_backend (**Java/DropWizard Web Service**)

## Unit Tests
Done using **React Testing Library**, with a total of **6** unit tests cases in **App.test.js**

## How to run the application locally on your computer (Setup Instructions)
1. Open up any terminal (e.g. Git Bash), change into a directory of your choice, and clone this repository by entering the following command: `git clone https://github.com/melvincwng/2025_melvin_frontend.git`
2. Open the repository in an IDE of your choice (e.g. VSCode) and in the terminal, enter the following commands to install required dependencies and start the app locally:
    ```
    npm install
    npm start
    ```
3. The app will then run on http://localhost:3000/. Kindly follow the [Setup Instructions for the Backend Web Service over here](https://github.com/melvincwng/2025_melvin_backend/blob/master/README.md) to ensure the app can fetch necessary data from the backend, should you need to run/develop/test the backend app locally

## How to build and run this application in a Docker Container?
1. **Important Prerequisite:**
   - Please ensure Docker Desktop/Docker Engine is already installed on your machine. If you need instructions on how to install Docker, you can refer to their documentation over [here](https://docs.docker.com/desktop/)
2. Open a terminal, and change directory to where you stored this React.js project
3. Alternatively, open the React.js project in an IDE of your choice, and then open the terminal that is integrated into your IDE
4. In the terminal, enter this command: `docker build -t react-app-docker .`
5. The command above builds a Docker Image named `react-app-docker` on your computer. You can change the image name to something else if you prefer, but make sure to update the name consistently in any subsequent commands.
6. If you encounter the error below, it means your Docker Desktop/Docker Engine is not running on your computer. Turn it on to resolve the error:
   ```
   ERROR: error during connect: Head "http://%2F%2F.%2Fpipe%2FdockerDesktopLinuxEngine/_ping": open //./pipe/dockerDesktopLinuxEngine: The system cannot find the file specified.
   ```
7. After building the Docker Image, to run your app inside a Docker container, enter either **one** of the following two commands:
   ```
   Choose and enter only ONE of the following commands in terminal
    
   Option A (To test the app against your localhost backend):
   docker run -p 3000:3000 -e REACT_APP_BACKEND_API_URL=http://localhost:8080/api/v1 react-app-docker

   Option B (To test the app against the actual deployed backend live API):
   docker run -p 3000:3000 -e REACT_APP_BACKEND_API_URL=http://34.235.114.16:8080/api/v1 react-app-docker
   ```
8. To stop the Docker Container, just press `Ctrl + C` in your terminal.

## Live Demo:
http://50.19.69.247:3000/

![image](https://github.com/user-attachments/assets/98298439-1130-49e2-9acf-06b1cfa5794e)

## Useful References:
- https://www.docker.com/blog/how-to-dockerize-react-app/








