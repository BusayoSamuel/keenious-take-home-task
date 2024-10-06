### Decisions Made

For this project, I utilized AI tools to assist with the initial code generation while making a number of key modifications and enhancements to meet my needs. Below are some of the notable decisions and customizations I made:

**Styling and Design**: I modified the styling of article cards to match the Keenious website. This included adding hyperlinks to the articles and performing null checks for any missing data fields.

**API Integration**: I crafted custom prompts to generate the appropriate URLs from the OpenAlex API and to retrieve article summaries from the OpenAI API.

**Error Handling**: To improve user experience, I implemented error-catching mechanisms for both the OpenAlex and OpenAI APIs, customizing the error messages to provide clear and useful feedback to users.

**Code Refactoring**: I defined the overall folder structure and refactored the code into reusable components to enhance readability and scalability of the application.

**UI/UX Features Implemented**:

**1.Dark Mode**: Implemented a dark mode toggle by creating a new theme with a different color palette, allowing users to switch between light and dark modes seamlessly.

**2.Clear Chat**: The clear chat button is a standard button that clears the chat history.

**3.Skeleton Loader**: The skeleton loader is a custom component that displays a loading state for the chat. The loader is displayed when the chat is loading and disappears when the chat is loaded.

**4.Auto-scroll**: The chat feature includes an auto-scroll functionality that ensures smooth scrolling to the user's latest message as new messages are loaded. The chat also auto-scrolls to the bottom upon refreshing the window.

**5.Error Handling**: Meaningful error messages are displayed when the chat API returns an error or if the user's input is invalid.

**6.Responsive Design**: The chat is responsive and can be viewed on both desktop and mobile devices.

**7.Chat History**: The chat history is stored in the browser’s local storage, allowing users to retain their chat history even after closing or refreshing the browser.

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
