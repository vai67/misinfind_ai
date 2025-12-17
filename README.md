# Misinformation Detector

CS 222 Final Project

A web-based application that uses machine learning and natural language processing to analyze news articles and social media text and determine whether the content is likely REAL or FAKE.

---

## Project Overview

The Misinformation Detector is designed to help users critically evaluate online information. By leveraging NLP techniques and a supervised machine learning model, the app provides fast, accessible credibility checks for pasted text such as headlines, articles, or social media posts.

Key features:
- Paste text input (articles, headlines, posts)
- Machine learning–based REAL/FAKE classification
- Simple, user-friendly interface
- JSON-based API response
- Built as a free, educational tool

---

## Motivation

Misinformation spreads rapidly on social media, and many users struggle to distinguish credible information from false or misleading content. False information can influence public opinion and real-world decisions.  
Our goal is to promote critical thinking, media literacy, and responsible information consumption.

---

## Tech Architecture

### Frontend
- HTML
- CSS
- JavaScript
- React.js

### Backend
- Python
- Flask (REST API middleware)
- scikit-learn

### Machine Learning Stack
- TF-IDF Vectorizer  
  Converts text into numerical feature vectors based on word importance.
- PassiveAggressiveClassifier  
  Linear classifier that updates the model only when predictions are incorrect, making it well-suited for text classification.

---

## Training Data and Model

- Collected labeled political news articles with REAL/FAKE classifications
- Cleaned and standardized dataset (duplicates removed, missing values handled)
- 80/20 train-test split
- Model evaluated using:
  - Accuracy
  - Confusion matrix
- Trained model and vectorizer saved for reuse in the web application

---

## Middleware API

The Flask API acts as middleware between the frontend and the machine learning model:
- Receives text input via POST requests
- Loads the trained TF-IDF vectorizer and classifier
- Processes input text and returns a REAL/FAKE prediction as JSON
- Includes sanity checks and self-tests for reliability

---

## Code Quality and Testing

- Dataset validation and sanity checks
- Assertions to prevent data leakage and shape mismatches
- Prediction and response validation
- ESLint used on the frontend for clean, maintainable code
- Versioned model artifacts for reproducible deployment

---

## User Interface

- Clean and accessible design
- Text submission input box
- Single-click analysis
- Clear verdict display
- Iterated from initial concept to final design based on usability

---

## What Makes This Project Unique

- Completely free to use
- No paywalls or subscriptions
- Focused on accessibility and public awareness
- Designed as an educational tool rather than a commercial product
- Simple and transparent compared to existing misinformation tools

---

## Future Work

- Train on larger, more diverse, and up-to-date datasets
- Experiment with advanced NLP models beyond TF-IDF
- Add confidence scoring and clearer explanations
- Integrate social media feed scanning
- Develop browser extension support
- Add a database to store past inputs and continuously improve the model

---

## Team

- Angelina Zhou  
- Jazmin Uribe  
- Vaibhavi Srivastava  
- Camryn Lee  

---
## Installation and Setup
Installation and Reproducibility Instructions

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend

### Frontend Setup
2. To run the frontend, navigate to the frontend directory and execute:
```bash
   cd backend
npm install  
npm start
```
The application will run on http://localhost:3000/
