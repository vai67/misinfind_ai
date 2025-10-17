import numpy as np
import pandas as pd
import itertools
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import PassiveAggressiveClassifier
from sklearn.metrics import accuracy_score, confusion_matrix

#Read the data
df=pd.read_csv('data/news_cleaned.csv')
#Get shape and head
print("Dataset shape:", df.shape)
print(df.head())

# get the labels from the DataFrame
labels = df.label
labels.head()

# split the data into train and test
x_train, x_test, y_train, y_test = train_test_split(df['text'], labels, test_size=0.2, random_state=7)