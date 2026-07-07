import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score

# -----------------------
# Load Dataset
# -----------------------
df = pd.read_csv("data/MSME_Financial_Health_Dataset.csv")

# -----------------------
# Encode Text Columns
# -----------------------
encoder_industry = LabelEncoder()
encoder_repayment = LabelEncoder()

df["industry_type"] = encoder_industry.fit_transform(df["industry_type"])
df["repayment_history"] = encoder_repayment.fit_transform(df["repayment_history"])

# -----------------------
# Drop unnecessary columns
# -----------------------
df = df.drop(["business_id", "business_name"], axis=1)

# -----------------------
# Features (X) and Target (y)
# -----------------------
X = df.drop("financial_health_score", axis=1)
y = df["financial_health_score"]

# -----------------------
# Split the data
# -----------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42
)

# -----------------------
# Train Model
# -----------------------
print("Training model... Please wait.")

model = RandomForestRegressor(
    n_estimators=20,
    max_depth=10,
    min_samples_split=10,
    min_samples_leaf=5,
    random_state=42,
    n_jobs=-1
)

model.fit(X_train, y_train)

print("Model Trained Successfully!")

# -----------------------
# Predictions
# -----------------------
predictions = model.predict(X_test)

# -----------------------
# Evaluate Model
# -----------------------
mae = mean_absolute_error(y_test, predictions)
r2 = r2_score(y_test, predictions)

print("\nModel Performance")
print("-------------------------")
print(f"Mean Absolute Error : {mae:.2f}")
print(f"R² Score            : {r2:.4f}")

import joblib

# Save the trained model
joblib.dump(model, "models/financial_health_model.pkl")

# Save the label encoders
joblib.dump(encoder_industry, "models/industry_encoder.pkl")
joblib.dump(encoder_repayment, "models/repayment_encoder.pkl")

print("\nModel and encoders saved successfully!")