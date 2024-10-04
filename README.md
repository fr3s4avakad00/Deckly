

# Deckly - Study Helper

**Deckly** is a comprehensive web-based study tool that allows users to create quizzes, cue cards, and extract text from images. Built using JavaScript, HTML, and Tesseract.js, the project also integrates OpenAI to generate educational content based on images.

---

## Features

### 1. Quiz Creator
- Users can create quizzes by inputting questions, multiple-choice answers, and marking the correct option.
- Quizzes are stored locally, allowing users to save and replay them.

### 2. Cue Card Creator
- Enables users to create cue cards for studying.
- Users can create, save, edit, and flip cue cards between the question and answer sides for better retention.

### 3. Text Extraction from Images (OCR)
- Upload images of notes or documents.
- Deckly extracts the text from images using Tesseract.js and displays it for review.

### 4. Text Generation via OpenAI
- Generates multiple-choice questions based on image descriptions.
- Images are uploaded to Imgur and OpenAI generates a description, followed by MCQs.

---

## Technologies Used
- **HTML/CSS**: For structuring and styling the app interface.
- **JavaScript**: Core functionality for quiz creation, cue cards, and OCR.
- **Tesseract.js**: Optical Character Recognition (OCR) for text extraction from images.
- **OpenAI API**: For generating questions and answers from image content.
- **Imgur API**: For hosting images used in text generation.
- **LocalStorage**: For saving quiz and cue card data locally.

---

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/deckly-study-helper.git
    cd deckly-study-helper
    ```

2. **Install dependencies**:
   Make sure you have Node.js and npm installed. Then run:
    ```bash
    npm install
    ```

3. **Environment Setup**:
   Create a `.env` file in the root directory and add your OpenAI and Imgur credentials:
    ```bash
    OPENAI_API_KEY=your-openai-api-key
    IMGUR_CLIENT_ID=your-imgur-client-id
    ```

4. **Run the application**:
   Open `helo.html` in your browser to use the app locally (use Live Server extension on VScode to run).

---

## Project Structure
```
deckly-study-helper/
│
├── public/
    ├── account.js                  # Cue card management with storage
    ├── accountPage.html            # Cue card creation with files
    ├── cueCard.html                # Cue card text editing UI
    ├── cueCard.js                  # Cue card flip and save functionality
    ├── helo.html                   # Main HTML file for web app
    ├── main.js                     # File upload and OCR, also backend for connecting buttons
    ├── index.html                  # frontend for Open AI implementation
    ├── ocr.js                      # OCR text extraction using Tesseract.js
    ├── quiz.html                   # Interactive quiz creation and file input
    ├── quiz.js                     # Quiz creation, file loading, and logic
    ├── quizPage.html               # Quiz creation homepage with navigation
    ├── quizpage.js                 # Quiz management with option to create, edit, delete, and play
    ├── quizQuestions.js            # Question class for storing quiz questions and answers
    ├── readNote.html               # Study helper with OCR functionality for note extraction
├── README.md                   # Project documentation
├── output/                     # Output storage for generated MCQs
├── .env                        # stores OpenAI credentials
└── app.js                      # Image upload with API-based processing to create MC

```

---

## Usage

### 1. Creating a Quiz
- Go to the "Quiz Creator" section.
- Enter a quiz name and add questions with answer choices.
- Mark the correct answer and save the quiz.

### 2. Creating Cue Cards
- Use the "Cue Card Creator" section to manually add or load cue cards from text files.
- Each cue card can be edited or deleted.

### 3. Extracting Text from Images
- Upload an image and Deckly extracts the text using OCR for review.

### 4. Generating MCQs
- Images uploaded are processed using Imgur and OpenAI to generate descriptions, MCQs, and cue cards, which are stored in the output folder.

---

## License

This project is licensed under the MIT License.
