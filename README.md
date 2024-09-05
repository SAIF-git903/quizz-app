# Quiz Application

This is a Quiz Application built with React, using TailwindCSS for styling and axios for fetching quiz data from the Open Trivia Database (opentdb.com). The app provides a multiple-choice quiz experience with shuffled options, score tracking, and the ability to reveal correct answers.

## Features

- **Multiple Choice Questions:** The app fetches questions from the Open Trivia Database and displays them with shuffled options.
- **Score Tracking:** Keeps track of the user's score throughout the quiz.
- **Answer Reveal:** Allows users to reveal the correct answer after each question.
- **Responsive Design:** The application is fully responsive and adapts to different screen sizes.
- **TailwindCSS Loader:** Displays a loader until the quiz data is fetched from the API.
- **Toast Notifications:** Uses `react-hot-toast` to show feedback for correct and incorrect answers.

## Technologies Used

- **React:** JavaScript library for building user interfaces.
- **TailwindCSS:** Utility-first CSS framework for styling.
- **Axios:** Promise-based HTTP client for making API requests.
- **React-Router-Dom:** For handling routing in the application.
- **React-Hot-Toast:** For showing toast notifications.
- **Heroicons:** For displaying icons in the UI.

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/quiz-app.git
cd quiz-app
```
2. **Install Dependencies:**

```bash
npm install
```

3. **Run the development server:**

```bash
npm start
```

4. **Open your browser to view your application**

Visit http://localhost:3000 to view the app in the browser.

## API Reference
This application uses the Open Trivia Database API to fetch quiz questions. You can learn more about the API [here](https://opentdb.com/).

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments
- Open Trivia Database for providing the quiz questions.
- TailwindCSS for providing an amazing utility-first CSS framework.
- React-Hot-Toast for the toast notifications.
