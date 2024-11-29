import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn import svm
from sklearn.metrics import accuracy_score

# Load and preprocess the diabetes dataset
diabetes_dataset = pd.read_csv('./diabetes.csv')

X = diabetes_dataset.drop(columns='Outcome', axis=1)
Y = diabetes_dataset['Outcome']

scaler = StandardScaler()
X = scaler.fit_transform(X)

# Split the data
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, stratify=Y, random_state=2)

# Train the model
classifier = svm.SVC(kernel='linear')
classifier.fit(X_train, Y_train)

# Define the prediction function
def predict_diabetes(input_data):
    input_data_as_numpy_array = np.asarray(input_data).reshape(1, -1)
    std_data = scaler.transform(input_data_as_numpy_array)
    prediction = classifier.predict(std_data)
    return 'The person is diabetic' if prediction[0] == 1 else 'The person is not diabetic'
