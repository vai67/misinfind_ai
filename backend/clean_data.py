import pandas as pd

df = pd.read_csv("data/news.csv")

df = df.drop_duplicates()
df = df.dropna()
df.columns = df.columns.str.strip()

df.to_csv("news_cleaned.csv", index=False)
print("Dataset cleaned, saved as news_cleaned.csv")