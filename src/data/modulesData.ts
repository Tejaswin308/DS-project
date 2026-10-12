export interface ModuleTopic {
  title: string;
  description: string;
}

export interface Module {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  topics: ModuleTopic[];
  outcomes: string[];
  duration: string;
  experiments: number;
}

export const modulesData: Module[] = [
  {
    id: 'module-1',
    number: 1,
    title: 'Types of Data Analysis',
    subtitle: 'Foundations of Analytical Thinking',
    description:
      'Understand the spectrum of data analysis — from descriptive summaries to prescriptive intelligence. This module lays the foundation for applying the right analytical approach to real-world problems.',
    icon: '📊',
    color: '#0EA5A8',
    duration: '4 Weeks',
    experiments: 3,
    topics: [
      {
        title: 'Descriptive Analysis',
        description:
          'Summarize historical data using statistical measures like mean, median, mode, standard deviation and variance. Build dashboards and summary reports using Python and Pandas.',
      },
      {
        title: 'Diagnostic Analysis',
        description:
          'Identify causes of past outcomes using drill-down techniques, correlation analysis, and hypothesis testing to understand "why" something happened.',
      },
      {
        title: 'Predictive Analysis',
        description:
          'Use regression models, classification algorithms, and time-series forecasting to predict future outcomes from historical patterns.',
      },
      {
        title: 'Prescriptive Analysis',
        description:
          'Recommend optimal actions using optimization algorithms, simulation and decision science to answer "what should we do next?"',
      },
      {
        title: 'Exploratory Data Analysis (EDA)',
        description:
          'Visually investigate datasets using Seaborn and Matplotlib, discovering distributions, outliers, correlations and patterns before formal modeling.',
      },
    ],
    outcomes: [
      'Distinguish between the four types of data analysis',
      'Apply EDA techniques to any dataset',
      'Select the appropriate analysis type for a given business problem',
      'Build descriptive and diagnostic reports in Python',
    ],
  },
  {
    id: 'module-2',
    number: 2,
    title: 'Extracting Meaning from Data',
    subtitle: 'Statistical Methods & Interpretation',
    description:
      'Go beyond raw numbers and develop the skill of deriving actionable insights. This module covers statistical inference, data visualization, and storytelling with data — transforming noise into knowledge.',
    icon: '🔍',
    color: '#6366F1',
    duration: '5 Weeks',
    experiments: 4,
    topics: [
      {
        title: 'Statistical Inference',
        description:
          'Apply hypothesis testing (t-tests, chi-square, ANOVA), p-values, and confidence intervals to make data-driven decisions from sample populations.',
      },
      {
        title: 'Probability Distributions',
        description:
          'Work with Normal, Binomial, Poisson, and Exponential distributions. Understand when and how to apply each in real-world data scenarios.',
      },
      {
        title: 'Correlation & Causation',
        description:
          'Measure relationships using Pearson and Spearman correlations, and understand the critical distinction between correlation and causation in analytical reporting.',
      },
      {
        title: 'Data Visualization for Insights',
        description:
          'Create compelling charts, heat maps, pair plots, and interactive dashboards using Matplotlib, Seaborn and Plotly that communicate complex findings clearly.',
      },
      {
        title: 'Data Storytelling',
        description:
          'Structure analytical findings into narratives for non-technical audiences, applying the Pyramid Principle and SCQA framework to present data insights effectively.',
      },
    ],
    outcomes: [
      'Conduct hypothesis tests and interpret p-values',
      'Select and apply appropriate probability distributions',
      'Build insightful visualizations communicating key findings',
      'Tell a compelling data story for diverse audiences',
    ],
  },
  {
    id: 'module-3',
    number: 3,
    title: 'Feature Selection & Decision Tree Foundations',
    subtitle: 'Building Intelligent Models',
    description:
      'Master the art of choosing the right variables and building interpretable tree-based models. Feature selection directly impacts model accuracy and efficiency, while decision trees provide a transparent window into machine learning logic.',
    icon: '🌳',
    color: '#16A34A',
    duration: '5 Weeks',
    experiments: 5,
    topics: [
      {
        title: 'Feature Engineering',
        description:
          'Create new meaningful variables from raw data through encoding, binning, polynomial features, and interaction terms that boost model performance.',
      },
      {
        title: 'Filter Methods for Feature Selection',
        description:
          'Use statistical tests (chi-square, ANOVA F-test, mutual information) and correlation analysis to rank features and remove irrelevant variables.',
      },
      {
        title: 'Wrapper & Embedded Methods',
        description:
          'Apply Recursive Feature Elimination (RFE), LASSO regularization and tree-based importance scores to select optimal feature subsets.',
      },
      {
        title: 'Decision Tree Algorithm',
        description:
          'Understand the ID3, C4.5, and CART algorithms. Learn how trees split on Gini impurity and information gain to make classification and regression decisions.',
      },
      {
        title: 'Tree Pruning & Hyperparameter Tuning',
        description:
          'Control tree complexity through pre-pruning (max depth, min samples) and post-pruning (cost-complexity) to prevent overfitting and improve generalization.',
      },
    ],
    outcomes: [
      'Engineer meaningful features from raw datasets',
      'Apply filter, wrapper, and embedded feature selection',
      'Build and interpret decision tree classifiers',
      'Tune trees to balance bias-variance tradeoff',
    ],
  },
  {
    id: 'module-4',
    number: 4,
    title: 'Ensemble Learning',
    subtitle: 'Power of Combined Predictors',
    description:
      'Discover how combining multiple weak learners creates powerful models. Ensemble methods like Random Forests, Gradient Boosting and XGBoost consistently top ML competition leaderboards by reducing variance and bias simultaneously.',
    icon: '🧩',
    color: '#D97706',
    duration: '6 Weeks',
    experiments: 5,
    topics: [
      {
        title: 'Bagging & Random Forests',
        description:
          'Understand Bootstrap Aggregating (Bagging) and how Random Forests build hundreds of decorrelated trees using random feature subsets for robust predictions.',
      },
      {
        title: 'Boosting – AdaBoost',
        description:
          'Learn how AdaBoost iteratively adjusts sample weights to focus on misclassified instances, converting weak classifiers into a strong ensemble.',
      },
      {
        title: 'Gradient Boosting Machines',
        description:
          'Master the gradient boosting framework — fitting residuals sequentially with decision trees — implementing it from scratch and via scikit-learn.',
      },
      {
        title: 'XGBoost & LightGBM',
        description:
          'Apply industrial-grade boosting libraries with regularization, parallel processing, and histogram-based splits. Tune hyperparameters using GridSearchCV and Optuna.',
      },
      {
        title: 'Stacking & Blending',
        description:
          'Combine heterogeneous models (SVM, neural nets, trees) using a meta-learner through stacking and blending strategies for state-of-the-art performance.',
      },
    ],
    outcomes: [
      'Implement Random Forests and understand out-of-bag error',
      'Differentiate and apply AdaBoost, GBM, XGBoost',
      'Tune ensemble hyperparameters systematically',
      'Build stacking pipelines for competition-level accuracy',
    ],
  },
  {
    id: 'module-5',
    number: 5,
    title: 'Dimensionality Reduction',
    subtitle: 'Simplifying Complex Data',
    description:
      'High-dimensional data is the curse of modern machine learning. Dimensionality reduction techniques remove noise, combat the curse of dimensionality, enable visualization, and accelerate model training — without losing essential information.',
    icon: '🔬',
    color: '#DC2626',
    duration: '4 Weeks',
    experiments: 4,
    topics: [
      {
        title: 'Principal Component Analysis (PCA)',
        description:
          'Project data onto orthogonal principal components that capture maximum variance. Apply PCA for noise reduction, visualization, and preprocessing before modeling.',
      },
      {
        title: 'Linear Discriminant Analysis (LDA)',
        description:
          'Use supervised dimensionality reduction to find axes that maximize class separability — powerful for classification tasks with labeled training data.',
      },
      {
        title: 't-SNE (t-distributed Stochastic Neighbor Embedding)',
        description:
          'Visualize high-dimensional data in 2D/3D by preserving local structure using probability distributions. Ideal for exploring clusters in image and text embeddings.',
      },
      {
        title: 'UMAP (Uniform Manifold Approximation)',
        description:
          'Apply a modern manifold learning technique that preserves both local and global structure, faster than t-SNE with better scalability for large datasets.',
      },
      {
        title: 'Autoencoders for Reduction',
        description:
          'Use neural network encoders to learn compact latent representations of data, enabling non-linear dimensionality reduction beyond PCA capabilities.',
      },
    ],
    outcomes: [
      'Apply PCA to reduce features while preserving variance',
      'Use LDA for supervised dimension reduction',
      'Visualize clusters with t-SNE and UMAP',
      'Implement autoencoders for non-linear reduction',
    ],
  },
];
