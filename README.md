# Project Title
Dynamic Form Builder

## Description
Dynamic Form Builder is a web application that allows users to create, customize, and manage forms dynamically. With an intuitive drag-and-drop interface, users can add various input types, configure validation rules, and easily integrate forms into their applications.

## Installation
To install the project, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/Roopali-02/DynamicFormBuilder.git
    ```

2. Navigate to the backend directory:
    ```bash
    cd DynamicFormBuilder/backend
    ```

3. Install the backend dependencies:
    ```bash
    npm install
    ```

4. Start the backend server:
    ```bash
    npm run dev
    ```

5. Open a new terminal window, and navigate back to the project root directory:
    ```bash
    cd ..
    ```

6. Install the frontend dependencies:
    ```bash
    npm install
    ```

7. Start the frontend application:
    ```bash
    npm start
    ```
## Environment Variables
This project requires the following environment variables to be set in the backend:

- **MONGO_URI**: The connection string for your MongoDB database. You can create a `.env` file in the backend directory and add the following line:

    ```plaintext
    MONGO_URI="your_mongodb_connection_string_here"
    ```

    Replace `your_mongodb_connection_string_here` with your actual MongoDB URI, which you should keep private and not share publicly.

### .gitignore for the .env File
Ensure that your `.env` file (where the actual URI will be stored) is listed in your `.gitignore` file. This prevents it from being pushed to your Git repository:

```plaintext
# .gitignore
.env

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
