# 🧪 DS LAB — Data Science Laboratory & Interactive Learning Portal

[![React](https://img.shields.io/badge/React-19.3.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

> A modern, responsive web application and digital laboratory record designed for **hands-on Data Science, Machine Learning, and Statistical Analysis**. Built with React 19, TypeScript, Vite, and Tailwind CSS.

---

## 📌 Table of Contents

- [Overview](#-overview)
- [✨ Key Features](#-key-features)
- [🔬 Lab Experiments Catalog](#-lab-experiments-catalog)
- [📚 Curriculum Modules](#-curriculum-modules)
- [🛠️ Data Science Tools Directory](#️-data-science-tools-directory)
- [🪪 Digital Student Profile & ID Card](#-digital-student-profile--id-card)
- [💻 Tech Stack](#-tech-stack)
- [📂 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development Server](#development-server)
  - [Production Build](#production-build)
- [💾 Data Persistence](#-data-persistence)
- [👩‍💻 Student & Mentorship Details](#-student--mentorship-details)
- [📜 License](#-license)

---

## 🌟 Overview

**DS LAB** serves as an interactive laboratory companion and digital portfolio for academic Data Science coursework. It transitions static lab manuals into an engaging web application featuring runnable Python code examples, sub-experiment breakdowns, output visualizations, YouTube lecture references, and full laboratory management.

Students can track experiments, inspect algorithmic syntax, view expected analytical outputs, and manage a digital academic profile with a 3D-flippable student ID card.

---

## ✨ Key Features

- **📖 Interactive Experiment Explorer**:
  - Detailed aims, objectives, core syntax, Python implementation code, and formatted outputs for each experiment.
  - Dedicated sub-experiment breakdown (**Part A** and **Part B**) for modular practice.
  - One-click code copying to clipboard with toast notifications.
  - Embedded video tutorials (YouTube) and external GitHub links.

- **⚡ Full Experiment Management (CRUD)**:
  - Add new experiments and sub-experiments via modal forms.
  - Edit existing experiment details, descriptions, programs, and references.
  - Delete experiments with safety confirmation dialogs.
  - Real-time search filtering across titles, topics, numbers, and descriptions.

- **📑 5 Structured Academic Modules**:
  - Deep-dive coverage across fundamental data analysis, statistical inference, feature engineering, ensemble methods, and dimensionality reduction.
  - Module learning outcomes, duration estimates, and topic breakdowns.

- **🧰 Curated Tools & Libraries Hub**:
  - Direct reference catalog for core libraries (NumPy, Pandas, Matplotlib, Seaborn, Scikit-learn, XGBoost, TensorFlow, Plotly, etc.).
  - Categorized into Languages, Environments, Data Processing, Visualization, and ML/DL.

- **🪪 Interactive Digital Student ID Card**:
  - Flip card animation between front and back views.
  - Displays academic credentials, photo avatar, barcodes, and faculty details.
  - Direct print/export support via `window.print()`.

- **🌓 Dynamic Dark & Light Theme**:
  - Modern glassmorphic aesthetic with custom CSS tokens.
  - Theme state remembered automatically across browser sessions.

- **📱 Fully Responsive Design**:
  - Optimized for desktop workstations, tablets, and mobile devices.

---

## 🔬 Lab Experiments Catalog

| # | Experiment Title | Part A (Sub-Exp A) | Part B (Sub-Exp B) | Key Libraries / Concepts |
|---|------------------|---------------------|---------------------|---------------------------|
| **01** | **Time Series Analysis** | Create Time Series using `datetime` | Generate `DatetimeIndex` via `date_range` | Pandas, NumPy, Resampling, Periods |
| **02** | **Exploratory Data Analysis (EDA)** | Statistical Summary & Missing Values | Correlation Heatmap & Distribution Plots | Pandas, Seaborn, Matplotlib, Outliers |
| **03** | **Linear Regression** | Simple Linear Regression | Multiple Linear Regression | Scikit-learn, MSE, R² Score, Train-Test Split |
| **04** | **Decision Tree Classifier** | Tree with Gini Criterion | Tree with Entropy / Information Gain | DecisionTreeClassifier, Pruning, Graphviz |
| **05** | **Random Forest Classifier** | Random Forest Classification | Feature Importance Ranking & Visualization | RandomForestClassifier, Bagging, OOB Score |
| **06** | **Principal Component Analysis (PCA)** | 2D Component Projection & Visualization | Scree Plot & Explained Variance Ratio | PCA, StandardScaler, Dimensionality Reduction |
| **07** | **K-Means Clustering** | K-Means Clustering on Iris Data | Optimal K Determination via Elbow Method | KMeans, Inertia, Silhouette Score |
| **08** | **Naive Bayes Classifier** | Gaussian Naive Bayes Classifier | Confusion Matrix Heatmap & Classification Report | GaussianNB, MultinomialNB, Bayes Theorem |
| **09** | **Support Vector Machine (SVM)** | Linear Kernel SVM | RBF (Radial Basis Function) Kernel SVM | SVC, Hyperplane, Margin, GridSearchCV |
| **10** | **Data Preprocessing & Feature Engineering** | Null Imputation & Categorical Encoding | Feature Scaling: StandardScaler vs MinMaxScaler | SimpleImputer, LabelEncoder, Feature Scaling |

---

## 📚 Curriculum Modules

The portal organizes theoretical and practical concepts into **5 core modules**:

1. **Module 1: Types of Data Analysis**
   - *Foundations of Analytical Thinking*
   - Descriptive, Diagnostic, Predictive, and Prescriptive analysis with real-world EDA workflows.
2. **Module 2: Extracting Meaning from Data**
   - *Statistical Methods & Interpretation*
   - Hypothesis testing, probability distributions, correlation vs. causation, visualization best practices, and data storytelling.
3. **Module 3: Feature Selection & Decision Tree Foundations**
   - *Building Intelligent Models*
   - Feature engineering, filter/wrapper/embedded methods, ID3/C4.5/CART tree algorithms, and tree pruning.
4. **Module 4: Ensemble Learning**
   - *Power of Combined Predictors*
   - Bagging, Random Forests, AdaBoost, Gradient Boosting, XGBoost, LightGBM, and stacking pipelines.
5. **Module 5: Dimensionality Reduction**
   - *Simplifying Complex Data*
   - Principal Component Analysis (PCA), Linear Discriminant Analysis (LDA), t-SNE, UMAP, and autoencoders.

---

## 🛠️ Data Science Tools Directory

The **Tools** tab provides quick access, official documentation links, and classifications for industry-standard packages:

- **Languages & Environments:** Python 3, Jupyter Notebook, Google Colab
- **Data Manipulation:** NumPy, Pandas
- **Visualization:** Matplotlib, Seaborn, Plotly
- **Machine Learning & Deep Learning:** Scikit-Learn, XGBoost, LightGBM, TensorFlow, PyTorch
- **Web Applications & Dashboarding:** Streamlit, Gradio

---

## 🪪 Digital Student Profile & ID Card

Students can personalize their academic details directly through the browser:
- **Full Name & Roll Number** (e.g., `24102A030088`)
- **Branch & Section** (Data Science)
- **Subject & Faculty Advisor** (`S.BOSUBABU SIR`)
- **Social Profiles:** GitHub, LeetCode, LinkedIn, Instagram, Personal Website
- **3D Card Flip View:** Front face displays student credentials and avatar; back face displays contact details, barcode, institution branding, and verification stamps.
- **Print Friendly:** Dedicated print styles to produce hard-copy ID slips.

---

## 💻 Tech Stack

- **Frontend Core:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build System & Dev Server:** [Vite 8](https://vitejs.dev/)
- **CSS & Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with native CSS variables and glassmorphism styling
- **Routing:** [React Router v7](https://reactrouter.com/) (`react-router-dom`)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Persistence:** Browser `localStorage` with initial dataset fallback and schema hydration

---

## 📂 Project Structure

```bash
DS-project/
├── index.html              # HTML entry point with meta tags & typography
├── package.json            # Scripts, dependencies, and project metadata
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite bundler configuration with Tailwind plugin
├── public/                 # Static public assets (favicons, icons)
└── src/
    ├── main.tsx            # Application entry point
    ├── App.tsx             # Root component with routing and modal state
    ├── index.css           # Global Tailwind tokens, color palette, and utilities
    ├── components/         # Reusable UI components
    │   ├── CodeBlock.tsx           # Syntax highlighted code display with copy button
    │   ├── DeleteConfirmModal.tsx  # Safety modal for deleting experiments
    │   ├── EmptyState.tsx          # Fallback display when search has no matches
    │   ├── ExperimentCard.tsx      # Grid card previewing experiment overview
    │   ├── ExperimentFormModal.tsx # Add/Edit experiment modal form
    │   ├── ExperimentMenu.tsx      # Quick action dropdown menu
    │   ├── ExperimentStats.tsx     # Progress metrics and completed counts
    │   ├── ExperimentToolbar.tsx   # Search and action bar
    │   ├── Footer.tsx              # Application footer with links
    │   ├── GitHubLink.tsx          # External repository link badge
    │   ├── Header.tsx              # Top navigation bar with theme switcher
    │   ├── HeroSection.tsx         # Welcome hero banner with student badge
    │   ├── Modal.tsx               # Base accessible modal wrapper
    │   ├── StudentIDCardModal.tsx  # 3D interactive flip student ID card
    │   ├── StudentProfileCard.tsx  # Profile overview card
    │   ├── StudentProfileModal.tsx # Profile edit modal
    │   ├── Toast.tsx               # Toast notification container
    │   └── VideoPlayer.tsx         # Embedded YouTube video player
    ├── contexts/
    │   └── ThemeContext.tsx        # Light/Dark mode state and persistence
    ├── data/
    │   ├── defaultExperiments.ts   # Pre-seeded 10 data science experiments
    │   ├── defaultStudent.ts       # Initial student profile configuration
    │   └── modulesData.ts          # Course modules syllabus and outcomes
    ├── hooks/
    │   ├── useExperiments.ts       # Hook for experiment state, search, and CRUD
    │   ├── useStudentProfile.ts    # Hook for student profile loading and saving
    │   └── useToast.ts             # Hook for triggerable notification toasts
    ├── layouts/
    │   └── AppLayout.tsx           # Common layout shell (Header + Main + Footer)
    ├── pages/
    │   ├── HomePage.tsx            # Main laboratory library & experiments list
    │   ├── ModulesPage.tsx         # Syllabus modules breakdown
    │   ├── ToolsPage.tsx           # Data science tools and libraries hub
    │   ├── ExperimentDetailsPage.tsx # Single experiment in-depth view
    │   ├── SubExperimentPage.tsx   # Part A / Part B sub-experiment view
    │   └── NotFoundPage.tsx        # 404 Route fallback
    ├── types/
    │   ├── experiment.ts           # TypeScript interfaces for experiments
    │   └── student.ts              # TypeScript interfaces for student profiles
    └── utils/
        └── storage.ts              # LocalStorage sync, defaults merge & helpers
```

---

## 🚀 Getting Started

Follow these instructions to run the project locally on your machine.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version **18.x** or higher recommended)
- [npm](https://www.npmjs.com/) (bundled with Node.js) or `pnpm` / `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Tejaswin308/DS-project.git
   cd DS-project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Development Server

Start the local Vite development server:
```bash
npm run dev
```

The application will start at:
```
http://localhost:5173/
```
Open the URL in your browser to view and interact with the application.

### Production Build

To compile and bundle the application for production:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## 💾 Data Persistence

All updates made within the portal—including newly created experiments, edits, deletions, custom student profile changes, and theme preferences—are saved automatically in the browser's `localStorage` under isolated keys:
- `dsLab_experiments`
- `dsLab_studentProfile`
- `dsLab_theme`

If local data is cleared, the system seamlessly seeds back the complete 10 default experiments and academic curriculum.

---

## 👩‍💻 Student & Mentorship Details

- **Student Developer:** [M.Tejaswini](https://portfolio-lovat-eight-q1hh4pwhhe.vercel.app/)
- **Roll Number:** `24102A030079`
- **Department:** Data Science
- **Course / Subject:** Data Science Laboratory
- **Under the Guidance of:** **S. BOSUBABU SIR** (Assistant Professor)
- **Portfolio:** [portfolio-lovat-eight-q1hh4pwhhe.vercel.app](https://portfolio-lovat-eight-q1hh4pwhhe.vercel.app/)
- **LinkedIn:** [Tejaswini Reddy](https://www.linkedin.com/in/tejaswini-reddy-785a47344)
- **LeetCode:** [Tejaswinireddy_30](https://leetcode.com/u/Tejaswinireddy_30/)
- **GitHub:** [@Tejaswin308](https://github.com/Tejaswin308)

---

## 📜 License

This project is licensed under the [MIT License](LICENSE) — free to use for academic and educational purposes.

---

<p align="center">
  Made with ❤️ for Data Science Education & Practical Learning
</p>
