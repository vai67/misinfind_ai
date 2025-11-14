import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import PassiveAggressiveClassifier
from sklearn.metrics import accuracy_score, confusion_matrix
from sklearn.model_selection import train_test_split

# Read the data
df = pd.read_csv("data/news_cleaned.csv")
# Get shape and head
print("Dataset shape:", df.shape)
print(df.head())

# sanity checks for data
assert not df.empty, "Dataset is empty."
assert "text" in df.columns and "label" in df.columns, "Missing required columns"
assert df["text"].isnull().sum() == 0, "Null values in text columns."
unique_labels = set(df["label"])
assert unique_labels <= {"FAKE", "REAL"}, f"Unexpected labels: {unique_labels}"


# get the labels from the DataFrame
labels = df.label
labels.head()

# split the data into train and test
x_train, x_test, y_train, y_test = train_test_split(
    df["text"], labels, test_size=0.2, random_state=7
)

# test split
assert len(x_train) > 0 and len(x_test) > 0, "Train/test slit empty"
assert len(x_train) == len(y_train), "Inconsistent train data lengths"
assert len(x_test) == len(y_test), "Inconsistent test data lengths"
print("Train and test split successful")

# DataFlair - Initialize a TfidfVectorizer
tfidf_vectorizer = TfidfVectorizer(stop_words="english", max_df=0.7)

# DataFlair - Fit and transform train set, transform test set
tfidf_train = tfidf_vectorizer.fit_transform(x_train)
tfidf_test = tfidf_vectorizer.transform(x_test)

# test vectorizer
assert tfidf_train.shape[0] == len(x_train), "TF-IDF train set row mismatch"
assert tfidf_test.shape[0] == len(x_test), "TF-IDF test set row mismatch"
assert tfidf_train.shape[1] == tfidf_test.shape[1], "TF-IDF feature count mismatch"
print("TF-IDF vectorization successful")

# DataFlair - Initialize a PassiveAggressiveClassifier
pac = PassiveAggressiveClassifier(max_iter=50)
pac.fit(tfidf_train, y_train)

# DataFlair - Predict on the test set and calculate accuracy
y_pred = pac.predict(tfidf_test)
score = accuracy_score(y_test, y_pred)
print(f"Accuracy: {round(score * 100, 2)}%")

# test cases for evaluation
assert len(y_pred) == len(y_test), "Prediction/test size mismatch."
assert 0 <= score <= 1, f"Invalid accuracy score: {score}"

# DataFlair - Build confusion matrix
cm = confusion_matrix(y_test, y_pred, labels=["FAKE", "REAL"])
print(confusion_matrix(y_test, y_pred, labels=["FAKE", "REAL"]))
assert cm.shape == (2, 2), "Confusion matrix should be 2x2."
