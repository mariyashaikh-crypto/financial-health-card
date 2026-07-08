# Financial Health Card for MSMEs

An AI-powered Financial Health Card platform that evaluates the financial health and loan eligibility of Micro, Small, and Medium Enterprises (MSMEs) using financial and alternative business data. The system generates an explainable financial assessment to assist lenders and business owners in making informed credit decisions.

---

## Overview

Financial Health Card is a full-stack web application that leverages Machine Learning to analyze key financial indicators such as revenue, expenses, GST compliance, credit score, banking history, and UPI transactions. Based on these inputs, the application predicts a Financial Health Score, classifies business risk, estimates loan eligibility, and provides personalized recommendations.

The platform focuses on delivering transparent and explainable AI-driven credit assessment in an intuitive and user-friendly interface.

---

## Features

- AI-based Financial Health Score Prediction
- MSME Loan Eligibility Assessment
- Risk Level Classification
- Explainable AI Recommendations
- Revenue vs Expense Visualization
- Professional Financial Health Report
- Responsive UI for Desktop and Mobile
- Real-time Prediction through Flask REST API

---

## Technology Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router
- Framer Motion
- Recharts

### Backend
- Flask
- Flask-CORS

### Machine Learning
- Python
- Scikit-learn
- XGBoost
- Pandas
- NumPy
- Joblib

### Deployment
- Firebase Hosting (Frontend)
- Render (Backend)
- GitHub

---

## System Architecture

```
                User
                  │
                  ▼
      React + Tailwind Frontend
                  │
          HTTP REST API Request
                  │
                  ▼
          Flask Backend (Render)
                  │
        Machine Learning Model
                  │
                  ▼
      Financial Health Prediction
                  │
                  ▼
    Health Score • Risk • Eligibility
                  │
                  ▼
      Interactive Financial Report
```

---

## Workflow

1. User enters business financial information.
2. Frontend validates the inputs.
3. Data is sent to the Flask REST API.
4. Machine Learning model processes the data.
5. Financial Health Score is predicted.
6. Risk level and loan eligibility are calculated.
7. Personalized recommendations are generated.
8. Results are displayed as a Financial Health Card.

---

## Project Structure

```
FinancialHealthCard
│
├── backend
│   ├── app.py
│   ├── predictor.py
│   ├── requirements.txt
│   └── ...
│
├── frontend
│   ├── src
│   ├── public
│   └── ...
│
├── models
│
└── README.md
```

---

## Live Demo

(https://project-live-b2595.web.app)

## Future Enhancements

- PDF Financial Report Generation
- User Authentication
- Database Integration
- Historical Assessment Tracking
- Advanced Financial Analytics Dashboard
- Multi-language Support

---

## Developed By

**Mariya Shaikh**

---

## License

This project is developed for academic and educational purposes.
