
# React Project Setup

This guide will walk you through setting up a React project, installing dependencies, running the development server, and configuring environment variables.

## Steps to Setup the Project

### 1. Navigate to the project directory
Open your terminal and navigate to your project folder by running the following command:

```bash
cd your-project-directory
```

Replace `your-project-directory` with the actual name or path to your project folder.

### 2. Install dependencies

Run the following command to install all necessary dependencies:

```bash
npm install
```

This will install all the packages listed in your `package.json` file.

### 3. Create an `.env` file

In the root of your project, create a file called `.env` and add the following line:

```plaintext
OPENAI_API_KEY=your-openai-api-key
```

Replace `your-openai-api-key` with your actual OpenAI API key.

### 4. Start the development server

To start the development server, run the following command:

```bash
npm run dev
```

This will launch the project in development mode, and you can access it through the local URL provided (usually `http://localhost:3000`).

### 5. Verify Setup

Make sure everything is working correctly by visiting the local server URL in your browser. You should see your React application running.

## Additional Information

- **OpenAI API Key**: Make sure your `.env` file is not pushed to version control by adding it to your `.gitignore` file if it’s not already excluded.

```plaintext
.env
```

That's it! You've successfully set up your React project with environment variables.
