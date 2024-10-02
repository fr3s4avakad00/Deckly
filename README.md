# Deckly (Study Helper)

**NOTICE: repo is unorganized, and I tried fixing it but its janky**
Please ignore any .js or .html files in the highest directory. If you click into the Deckly Folder from the highest directory, you will find a second Deckly Folder nested in the first one. I tried deleting the second one but it behaves weird. Just ignore anything related to the second Deckly file and what is under it

Deckly is a study assistant tool that helps users organize and review their notes using text extraction, flashcards, quizzes, and GPT-4 powered summarization. With Deckly, users can upload handwritten or digital notes, convert them into flashcards, take quizzes, and even chat with GPT-4 for summaries or Q&A about their study materials.

## Features

### 1. Backend (HTML/Server Logic)
- **OCR Engine**: Uses Tesseract or Google Vision API to extract text from images uploaded by users.
- **Output**: Extracted text is used across the app, such as for flashcards, quizzes, and summaries.

### 2. Image-to-Text Conversion
- **Image Upload**: Users upload images of handwritten or digital notes.
- **Text Extraction**: OCR engine extracts text from the uploaded images.

### 3. Frontend (User Interface)
- **Flashcard Creation**: Allows users to create flashcards from extracted text.
- **Testing/Quiz Section**: Enables users to take quizzes based on the flashcards or uploaded notes.
- **Chat Interface**: Lets users interact with GPT-4 for summarization and Q&A.
- **Navigation/UX**: Ensures a smooth transition between uploading, studying, and testing.

### 4. Flashcard System
- **Text-to-Flashcard Generator**: Converts extracted text into flashcards for studying.
- **Flashcard Storage**: Saves flashcards for future use and review.
- **Flashcard UI**: Displays flashcards for easy studying.

### 5. Testing/Quiz System
- **Quiz Generator**: Creates quizzes from flashcards or extracted notes.
- **Test Results**: Tracks user progress and displays scores.

### 6. GPT-4 Integration
- **Summarization**: Uses GPT-4 to generate summaries from extracted notes.
- **Question/Answer Chat**: Users can ask questions about their notes, and GPT-4 will provide answers.
- **Key Points Generation**: Extracts key points from the notes for quick review.

## Getting Started
1. **Image Upload**: Users can upload images of their notes.
2. **Text Extraction**: The OCR engine extracts text.
3. **Flashcard Creation**: Flashcards are generated from the extracted text.
4. **Study**: Users review the flashcards, chat with GPT-4, or take quizzes.
5. **Test**: Take quizzes to assess knowledge and track progress.

## Tech Stack
- **Frontend**: JavaScript for the user interface.
- **Backend**: HTML and server logic for image uploads and text processing.
- **OCR Engine**: Tesseract or Google Vision API for image-to-text conversion.
- **GPT-4**: Integrated for summarization, Q&A, and content generation.

## Future Features
- Advanced quiz customization.
- Enhanced flashcard systems with spaced repetition.
- Detailed progress analytics.

## Contributing
We welcome contributions! Please fork the repository, make your changes, and submit a pull request.

## License
This project is licensed under the MIT License.
