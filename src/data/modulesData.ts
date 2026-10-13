export interface ModuleTopic {
  title: string;
  description: string;
  pageReference?: number;
}

export interface ModulePdfFigure {
  title: string;
  caption: string;
  type: 'chart' | 'matrix' | 'table' | 'flowchart' | 'formula' | 'code';
  description?: string;
  details?: string[];
}

export interface ModulePdfPage {
  pageNumber: number;
  title: string;
  sectionCode?: string;
  content: string[];
  keyPoints?: string[];
  figures?: ModulePdfFigure[];
  formulas?: {
    name: string;
    formula: string;
    where?: string[];
  }[];
  codeSnippet?: {
    language: string;
    code: string;
    description?: string;
  };
  tableData?: {
    headers: string[];
    rows: (string | number)[][];
    caption?: string;
  };
}

export interface ModulePdfInfo {
  fileName: string;
  fileUrl: string;
  totalPages: number;
  fileSize: string;
  subjectCode: string;
  academicYear: string;
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
  duration: string;
  experiments: number;
  topics: ModuleTopic[];
  outcomes: string[];
  pdfInfo: ModulePdfInfo;
  pdfPages: ModulePdfPage[];
}

export const modulesData: Module[] = [
  {
    id: 'module-1',
    number: 1,
    title: 'Introduction to Data Science & Preprocessing',
    subtitle: 'Foundations, Data Ecosystem & The 6 Analytical Paradigms',
    description:
      'Official syllabus module (22DS102006). Master the definitions, 3Vs of data growth, cross-industry applications, roles & skills, tools (Python, R, SQL, UNIX), structured vs unstructured formats, open data principles, data cleaning & wrangling, and the 6 core analytics types from descriptive to mechanistic.',
    icon: '📊',
    color: '#0EA5A8',
    duration: '4 Weeks',
    experiments: 4,
    pdfInfo: {
      fileName: '22DS102006_Module1_Introduction.pdf',
      fileUrl: '/pdfs/Module-1-Introduction-Data-Science.pdf',
      totalPages: 18,
      fileSize: '1.4 MB',
      subjectCode: 'DATA SCIENCE (22DS102006)',
      academicYear: 'Specialization Elective - B.Tech Data Science',
      description:
        'Official 18-page university lecture notes on Data Science fundamentals, data types, preprocessing, and the 6 types of analytics.',
    },
    topics: [
      {
        title: 'Definition of Data Science & The 3Vs',
        description:
          'Interdisciplinary fusion of CS, statistics, mathematics and domain expertise. The 3Vs: Volume (zettabytes), Velocity, and Variety.',
        pageReference: 1,
      },
      {
        title: 'Where Do We See Data Science?',
        description:
          'Transformative applications across 9 domains: Finance, Public Policy, Politics, Healthcare, Urban Planning, Education, Libraries, Business, and Industrial IoT.',
        pageReference: 2,
      },
      {
        title: 'Skills & Roles in Data Science',
        description:
          'Curiosity & experimentation, mathematical reasoning, and data literacy. Job roles: Data Analyst, Data Wrangler/Engineer, Product DS, and Generalist.',
        pageReference: 3,
      },
      {
        title: 'Tools Ecosystem: Python, R, SQL, UNIX',
        description:
          'Python libraries (Pandas, NumPy, Scikit-learn), R statistical computing, SQL querying on relational databases, and UNIX shell batch processing.',
        pageReference: 4,
      },
      {
        title: 'Data Types: Structured vs Unstructured',
        description:
          'Tabular schemas vs unstructured text/video/audio. Challenges of natural language processing and semantic ambiguity.',
        pageReference: 6,
      },
      {
        title: 'Data Collections & Open Data Principles',
        description:
          'White House Project Open Data (M-13-3), 7 open data principles, social media APIs (Graph API, Yelp Challenge), and multimodal sensor telematics (EEG/fMRI/SPM).',
        pageReference: 7,
      },
      {
        title: 'Data Storage & Exchange Formats',
        description:
          'CSV comma escaping, TSV tab separation, XML hierarchical schemas, and RSS Really Simple Syndication web feeds.',
        pageReference: 9,
      },
      {
        title: 'Data Preprocessing & Cleaning Workflows',
        description:
          'Fixing dirty data: missing value imputation, noise smoothing, schema integration, data reduction (PCA/aggregation), and discretization.',
        pageReference: 10,
      },
      {
        title: 'Data Analysis vs. Data Analytics',
        description:
          'Dave Kasik (Boeing) framework: retrospective analysis ("what happened") vs forward-looking analytics ("what will happen next").',
        pageReference: 12,
      },
      {
        title: 'Descriptive Analysis, Centrality & Spread',
        description:
          'Measurement scales (Nominal, Ordinal, Interval, Ratio), normal distribution, mean, median, mode, IQR, variance, and standard deviation.',
        pageReference: 13,
      },
      {
        title: 'Diagnostic & Predictive Analytics',
        description:
          'Root-cause causal analytics, correlation coefficients (-1 to +1), and 4-step predictive modeling lifecycle.',
        pageReference: 16,
      },
      {
        title: 'Prescriptive, Exploratory (EDA) & Mechanistic',
        description:
          'Optimization & game theory simulations, Tukey EDA mindset, and deterministic mechanistic modeling (y = beta_0 + beta_1 * x).',
        pageReference: 17,
      },
    ],
    outcomes: [
      'Define Data Science and explain how Volume, Velocity, and Variety drove the 50-fold data explosion',
      'Identify and evaluate DS applications across finance, public policy, healthcare, and urban planning',
      'Distinguish the core competencies of Data Analysts, Data Engineers, Product Data Scientists, and Generalists',
      'Differentiate structured from unstructured data and leverage open data repositories & APIs',
      'Execute the 7 preprocessing tasks: cleaning, wrangling, imputation, smoothing, integration, reduction, and discretization',
      'Compute measures of central tendency, dispersion, variance, standard deviation, and normal curve properties',
      'Apply the 6 analytics paradigms (Descriptive, Diagnostic, Predictive, Prescriptive, Exploratory, Mechanistic)',
    ],
    pdfPages: [
      {
        pageNumber: 1,
        title: 'Definition of Data Science & The Rise of Big Data',
        sectionCode: 'Section 1',
        content: [
          'Data Science (DS) is the study and practice of collecting, storing, processing, and analyzing data to extract meaningful insights and support decision-making.',
          'It incorporates scientific methods, computational thinking, and systematic analysis of data. DS fundamentally combines computer science, statistics, mathematics, and domain expertise.',
          'Data science is used to derive meaningful insights to solve real-world problems through systematic, repeatable, and verifiable processes.',
        ],
        keyPoints: [
          'Volume: Massive amounts of data scaling rapidly into zettabytes (ZB).',
          'Velocity: Extreme speed at which data is generated, streamed, and updated.',
          'Variety: Heterogeneous structured (relational tables) and unstructured formats (text, images, audio, video).',
        ],
        figures: [
          {
            title: 'Figure 1.1: Increase of Data Volume in 15 Years',
            caption: 'Source: IDC Digital Universe Study, December 2012',
            type: 'chart',
            description:
              'By 2020, global data usage surged past 40 zettabytes — a 50-fold increase since 2010. This exponential curve demonstrates the critical importance of Data Science in processing vast amounts of information.',
            details: [
              '2006: ~0.16 ZB',
              '2010: ~1.2 ZB',
              '2014: ~8.0 ZB',
              '2020: 40.0+ ZB (50x increase)',
            ],
          },
        ],
      },
      {
        pageNumber: 2,
        title: 'Where Do We See Data Science? (Cross-Domain Applications)',
        sectionCode: 'Section 1 (Contd.)',
        content: [
          'Data science finds widespread application across a multitude of domains owing to its capability to extract meaningful insights from vast and complex datasets.',
        ],
        keyPoints: [
          'Finance: Fraud detection, credit risk assessment, customer segmentation, automated loan approvals, and algorithmic investment strategies.',
          'Public Policy: Governments leverage data.gov and traffic sensors to enhance governance, transit flow, and public service resource allocation.',
          'Politics: Voter profiling, micro-targeted campaign messaging, and social media sentiment analysis to optimize outreach.',
          'Healthcare: Disease diagnosis, genomic analysis, electronic health records, and wearable trackers for real-time preventive patient care.',
          'Urban Planning: Smart city initiatives using IoT sensor grids; prominent systems include Chicago’s Plow Tracker and Boston’s SnowCOP.',
          'Education: Adaptive personalized learning systems monitoring student engagement and academic intervention triggers.',
          'Libraries & Information Science: Automated systematic literature reviews, semantic metadata indexing, and digital archive curation.',
          'Business Sector: Consumer purchase behavior modeling, demand forecasting, and personalized recommendation engines (Amazon, Netflix).',
          'Industrial Sectors: Predictive maintenance on manufacturing lines, supply chain optimization, and real-time IoT machinery telematics.',
        ],
      },
      {
        pageNumber: 3,
        title: 'Skills & Professional Roles in Data Science',
        sectionCode: 'Section 2',
        content: [
          'The success of Data Science involves adopting a mindset that merges curiosity, analytical thinking, and technical craftsmanship.',
          'Three foundational competencies define the hybrid nature of a modern data scientist:',
        ],
        keyPoints: [
          'a) Willingness to Experiment: Curious, creative problem-solvers who formulate hypotheses and explore datasets openly.',
          'b) Proficiency in Mathematical Reasoning: Solid understanding of statistics, linear algebra, probability, and numerical interpretation.',
          'c) Data Literacy: The fundamental 21st-century capability to read, critique, manipulate, and articulate stories with data.',
          'Data Analyst: Entry-level role focused on KPI reporting, dashboards, Excel, SQL, Google Analytics, and Tableau.',
          'Data Wrangler / Engineer: Builds robust extraction pipelines, ETL architectures, and distributed systems for massive raw data.',
          'Product-Focused Data Scientist: Designs intelligent features (recommendation algorithms, search ranking) within user-facing software.',
          'Generalist in Data-Driven Companies: Wears multiple hats spanning data engineering, exploratory modeling, ML, and stakeholder reporting.',
        ],
      },
      {
        pageNumber: 4,
        title: 'Skills Matrix & Data Science Tools (Python)',
        sectionCode: 'Sections 2 & 3',
        content: [
          'Generalist roles in data-driven companies work on established cross-functional teams and require broad competencies across the full lifecycle.',
          'Becoming a successful data scientist requires hands-on experience with industry-standard computational tools.',
        ],
        figures: [
          {
            title: 'Figure 1.2: Types of Data Science Roles',
            caption: 'Relative Importance of Competencies Across Archetypes',
            type: 'matrix',
            description:
              'Compares skill weightings across Data Analyst, Data Wrangler, Product-Focused Data Scientist, and Non-Data Company Generalist.',
            details: [
              'Basic Tools: High across all roles',
              'Software Engineering: Critical for Data Wranglers & Product Data Scientists',
              'Statistics & ML: Essential for Product Data Scientists & Generalists',
              'Data Munging & Visualization: Paramount for Analysts & Wranglers',
            ],
          },
        ],
        keyPoints: [
          'Python: High-level interpreted scripting language with intuitive syntax, rapid iteration, and massive open-source ecosystem.',
          'Pandas: Tabular data manipulation and series analysis.',
          'NumPy & SciPy: Vectorized N-dimensional computing and scientific numerical routines.',
          'Matplotlib & Seaborn: Publication-grade static and statistical plotting.',
          'Scikit-learn, TensorFlow & PyTorch: End-to-end machine learning and deep neural networks.',
        ],
      },
      {
        pageNumber: 5,
        title: 'Tools for Data Science: R, SQL & UNIX',
        sectionCode: 'Section 3 (Contd.)',
        content: [
          'Complementary tools form the production data science stack, enabling scalable querying and headless command-line automation.',
        ],
        keyPoints: [
          'B) R Programming Language: Designed specifically for statistical modeling, hypothesis testing, ggplot2 graphics, and CRAN package ecosystem.',
          'C) SQL (Structured Query Language): Declarative domain-specific language for relational databases. Essential for querying, filtering, joining, and aggregating massive datasets too large to load as flat CSV files.',
          'D) UNIX (Shell / Command Line): Stream processing, text wrangling (grep, sed, awk), log filtering, and pipeline automation without GUI overhead.',
        ],
      },
      {
        pageNumber: 6,
        title: 'Production Ecosystem & Data Types (Structured vs Unstructured)',
        sectionCode: 'Sections 3 & 4',
        content: [
          'UNIX is frequently combined with Python or R in enterprise cloud environments. Other key industry tools include Jupyter Notebooks, Tableau / Power BI for BI dashboards, and Apache Hadoop / Spark for distributed Big Data.',
          'Data fundamentally classifies into structured or unstructured formats — a distinction that governs storage, querying, and analytical processing.',
        ],
        keyPoints: [
          'Structured Data: Neatly organized in tabular formats with strictly defined rows and columns. Easily stored and queried in SQL RDBMS.',
          'Attributes include numerical values, text categories, booleans, and dates with clear schema headers.',
          'Unstructured Data: Free text, audio, video, sensor streams, and images without predefined models. Comprises >80% of real-world enterprise data.',
        ],
      },
      {
        pageNumber: 7,
        title: 'Customer Data Schema & Open Data Frameworks',
        sectionCode: 'Sections 4 & 5',
        content: [
          'Structured data relies on consistent naming and schema typing. In contrast, unstructured narrative data presents semantic ambiguity requiring Natural Language Processing (NLP).',
          'Open Data refers to datasets released freely to the public without legal or licensing restrictions, pioneered by White House Project Open Data (Memorandum M-13-3).',
        ],
        tableData: {
          caption: 'Table 1.1: Customer Data Sample',
          headers: ['custid', 'sex', 'is.employed', 'income', 'marital.stat', 'housing.type', 'num.vehicles', 'age', 'state.of.res'],
          rows: [
            ['2068', 'F', 'NA', '11300', 'Married', 'Homeowner free & clear', 2, 49, 'Michigan'],
            ['2073', 'F', 'NA', '0', 'Married', 'Rented', 3, 40, 'Florida'],
            ['2848', 'M', 'True', '4500', 'Never married', 'Rented', 3, 22, 'Georgia'],
            ['5641', 'M', 'True', '20000', 'Never married', 'Occupied with no rent', 0, 22, 'New Mexico'],
            ['6369', 'F', 'True', '12000', 'Never married', 'Rented', 1, 31, 'Florida'],
          ],
        },
      },
      {
        pageNumber: 8,
        title: 'Open Data Principles, Social APIs & Multimodal Streams',
        sectionCode: 'Section 5 (Contd.)',
        content: [
          'Open data initiatives adhere to strict guidelines to ensure maximum public utility and transparency.',
        ],
        keyPoints: [
          'Principles of Open Data: Public, Accessible (machine-readable), Described (rich metadata), Reusable (open licenses), Complete (raw originals), Timely, and Managed After Release.',
          'Social Media APIs: Programmatic data extraction via Meta Graph API, Twitter/X endpoints, and Yelp Dataset Challenge for sentiment analysis and NLP.',
          'Multimodal Data: IoT connected environments combining time-series, video, audio, and biomedical imaging (EEG, MEG, fMRI).',
          'Statistical Parametric Mapping (SPM): Karl Friston’s methodology for identifying functional brain activity patterns from multimodal neuroimaging.',
        ],
      },
      {
        pageNumber: 9,
        title: 'Data Storage & Exchange: CSV, TSV, XML & RSS',
        sectionCode: 'Section 5.4',
        content: [
          'Data is serialized into standard interchange formats depending on its hierarchy and consumption channel.',
        ],
        keyPoints: [
          'CSV (Comma-Separated Values): Ubiquitous plain-text tabular format; requires careful escape handling when fields contain embedded commas.',
          'TSV (Tab-Separated Values): Eliminates comma collision ambiguity using tab characters (\\t); common in raw bioinformatics and server logs.',
          'XML (Extensible Markup Language): Self-describing hierarchical tags (<record><price>99</price></record>); cross-platform interoperability.',
          'RSS (Really Simple Syndication): XML 1.0 web syndication feed for delivering automated content streams (news feeds, financial alerts, blog posts).',
        ],
      },
      {
        pageNumber: 10,
        title: 'RSS Applications & Data Preprocessing Foundations',
        sectionCode: 'Sections 5.4 & 6',
        content: [
          'RSS feeds remain valuable for lightweight polling across mobile devices, smartwatches, and automated news aggregator spiders.',
          'In the real world, raw data is rarely perfect. Data preprocessing is the foundational phase where dirty data is cleaned, structured, and normalized before modeling.',
        ],
        keyPoints: [
          'Why RSS is Useful: Lightweight, fast loading, automated push notifications, and device-agnostic.',
          'Data Preprocessing: Accounts for ~80% of project time; directly determines the validity and accuracy of downstream machine learning algorithms.',
        ],
      },
      {
        pageNumber: 11,
        title: 'Common Data Quality Defects & Preprocessing Tasks',
        sectionCode: 'Section 6 (Contd.)',
        content: [
          'Data is termed "dirty" when it contains incomplete records, noise, or structural inconsistencies.',
        ],
        keyPoints: [
          'Incomplete Data: Missing values, omitted sensor readings, or incomplete user survey submissions.',
          'Noisy Data: Erroneous measurements, sensor drift, and distorted outlier spikes.',
          'Inconsistent Data: Mismatched datetime formats, casing discrepancies, and schema collisions.',
          'Data Cleaning: Removing duplicates, fixing typos, and standardizing categories.',
          'Data Munging (Wrangling): Reshaping unstructured text blobs into analysis-ready dataframes.',
          'Handling Missing Values: Record deletion, default substitution, or statistical imputation (mean, median, regression).',
          'Smoothing Noisy Data: Binning, moving averages, and outlier bounds.',
          'Data Integration: Merging multiple databases, resolving schema conflicts, and harmonizing currency units (USD vs INR).',
        ],
      },
      {
        pageNumber: 12,
        title: 'Data Reduction, Discretization & Analysis vs. Analytics',
        sectionCode: 'Sections 6 & 7',
        content: [
          'Data Reduction condenses records via aggregation (e.g., monthly sales totals) and dimensionality reduction (PCA, feature pruning) without losing critical variance.',
          'Discretization transforms continuous numbers into ordinal bins (e.g., temperatures into "Cold", "Moderate", "Hot").',
          'Dave Kasik (Boeing) highlights the core distinction between Data Analysis and Data Analytics:',
        ],
        keyPoints: [
          'Nominal: Unordered labels (e.g. Color, City).',
          'Ordinal: Ordered rankings without quantified intervals (e.g. Low, Medium, High).',
          'Continuous: Numeric measurements (e.g. Age, Temperature, Revenue).',
          'Data Analysis: Hands-on exploration of historical data. Retrospective lens ("What happened?").',
          'Data Analytics: Forward-looking science combining predictive models, algorithms, and decision systems ("What will happen next?").',
        ],
      },
      {
        pageNumber: 13,
        title: 'The 6 Analytics Paradigms & Descriptive Statistics',
        sectionCode: 'Sections 7 & 8',
        content: [
          'Analytical techniques categorize into six distinct methodologies across the data lifecycle:',
          '1. Descriptive Analysis: Summarizing past and current states ("What is happening now?").',
          '2. Diagnostic Analytics: Uncovering underlying causes ("Why did it happen?").',
          '3. Predictive Analytics: Estimating future probabilities ("What is likely to occur?").',
          '4. Prescriptive Analytics: Determining optimal actions ("What should we do?").',
          '5. Exploratory Analysis (EDA): Open-ended visual pattern discovery.',
          '6. Mechanistic Analysis: Deterministic cause-effect equations.',
        ],
        keyPoints: [
          'Variables by Measurement: Nominal, Ordinal, Interval (no true zero, e.g. Celsius), Ratio (absolute true zero, e.g. Weight, Income).',
          'Variables by Role: Independent (Predictor / Feature) vs. Dependent (Outcome / Target).',
        ],
      },
      {
        pageNumber: 14,
        title: 'Frequency Distributions, Normality, Centrality & Spread',
        sectionCode: 'Section 8 (Contd.)',
        content: [
          'Descriptive metrics quantify the shape, center, and spread of numerical distributions.',
        ],
        keyPoints: [
          'Frequency Distribution: Histograms for continuous density; Pie/Bar charts for categorical proportions.',
          'Normal Distribution: Symmetrical bell curve where mean, median, and mode coincide.',
          'Skewness: Measures tail asymmetry (positive right-skew vs negative left-skew).',
          'Kurtosis: Measures peakedness and tail heaviness.',
          'Mean: Arithmetic average; highly sensitive to extreme outliers.',
          'Median: Middle value of sorted observations; robust to outliers and skewed data.',
          'Mode: Most frequently occurring value; ideal for categorical data.',
          'Range: Max value minus Min value.',
          'Interquartile Range (IQR): Middle 50% (Q3 - Q1); robust against extreme outliers.',
        ],
      },
      {
        pageNumber: 15,
        title: 'Mathematical Formulas: Variance & Standard Deviation',
        sectionCode: 'Section 8.5 & 8.6',
        content: [
          'Variance measures the degree to which individual observations deviate from the mean. Standard deviation converts variance back into the original units of measurement.',
        ],
        formulas: [
          {
            name: 'Population Variance (sigma^2)',
            formula: 'sigma^2 = [ SUM_{i=1}^{N} (x_i - mu)^2 ] / N',
            where: ['sigma^2 = population variance', 'x_i = individual data value', 'mu = population mean', 'N = total population size'],
          },
          {
            name: 'Sample Variance (s^2)',
            formula: 's^2 = [ SUM_{i=1}^{n} (x_i - x_bar)^2 ] / (n - 1)',
            where: ['s^2 = sample variance', 'x_i = sample observation', 'x_bar = sample mean', 'n - 1 = degrees of freedom (Bessel correction)'],
          },
          {
            name: 'Sample Standard Deviation (s)',
            formula: 's = sqrt( s^2 ) = sqrt( [ SUM_{i=1}^{n} (x_i - x_bar)^2 ] / (n - 1) )',
            where: ['Expresses spread in original measurement units (e.g. dollars, years).'],
          },
        ],
      },
      {
        pageNumber: 16,
        title: 'Diagnostic & Predictive Analytics Workflows',
        sectionCode: 'Sections 9 & 10',
        content: [
          'Diagnostic Analytics investigates the root causes of anomalies detected during descriptive summaries (causal analysis).',
          'Predictive Analytics estimates unknown future outcomes by recognizing patterns in historical data.',
        ],
        keyPoints: [
          'Correlation: Quantifies linear relationship strength between two variables from -1.0 (strong negative) to +1.0 (strong positive).',
          'Probabilistic Forecasting: Predictive analytics yields probabilities, not certainties.',
          '4-Step Predictive Process: 1) Data Collection -> 2) Data Cleaning -> 3) Pattern Recognition (Models) -> 4) Prediction & Validation.',
          'Applications: Credit scoring, customer churn propensity, healthcare risk alerts.',
          'Tools: Scikit-learn, SAS, IBM SPSS, RapidMiner.',
        ],
      },
      {
        pageNumber: 17,
        title: 'Prescriptive Analytics & Exploratory Data Analysis (EDA)',
        sectionCode: 'Sections 11 & 12',
        content: [
          'Prescriptive Analytics goes beyond forecasting to evaluate candidate decisions and prescribe optimal courses of action using mathematical optimization, game theory, and simulations.',
          'Exploratory Data Analysis (EDA), championed by John Tukey, is a discovery mindset using visual plots (scatterplots, boxplots) to uncover hidden patterns before formal hypothesis testing.',
        ],
        keyPoints: [
          'Prescriptive Use Case: Healthcare patient prioritization and dynamic ICU bed allocation.',
          'Industry Adoption: Computationally intensive; currently utilized by ~3% of enterprises.',
          'EDA Philosophy: Open-ended exploration without preconceived hypotheses to inform subsequent model design.',
        ],
      },
      {
        pageNumber: 18,
        title: 'Mechanistic Analysis & Module 1 Summary',
        sectionCode: 'Section 13',
        content: [
          'Mechanistic Analysis models the explicit, deterministic cause-and-effect mechanisms governing physical, industrial, or tightly controlled experimental systems.',
        ],
        formulas: [
          {
            name: 'Linear Mechanistic Relationship',
            formula: 'y = beta_0 + beta_1 * x',
            where: ['beta_0 = Baseline intercept', 'beta_1 = Slope / effect size of x on y', 'x = Independent physical variable', 'y = Dependent output response'],
          },
        ],
        keyPoints: [
          'Use Cases: Modeling atmospheric CO2 impact on global thermal absorption; industrial mechanical wear.',
          'Module 1 Takeaway: Establishes complete theoretical fluency across data representations, cleaning protocols, and the full spectrum of analytical inquiry.',
        ],
      },
    ],
  },
  {
    id: 'module-2',
    number: 2,
    title: 'Data Extraction, Modeling & Dimensionality Reduction',
    subtitle: 'Kaggle vs. Google Paradigms, Feature Selection, Decision Trees & SVD/PCA',
    description:
      'Official syllabus module (22DS102006). Master competitive data science (William Cukierski / Kaggle) vs mixed-methods behavioral modeling (David Huffaker / Google), leapfrogging, filter/wrapper/embedded feature selection, stepwise regression, entropy & decision trees, Random Forests with R code, and matrix decomposition via SVD and PCA.',
    icon: '🔍',
    color: '#6366F1',
    duration: '5 Weeks',
    experiments: 5,
    pdfInfo: {
      fileName: '22DS102006_Module2_Data_Extraction.pdf',
      fileUrl: '/pdfs/Module-2-Data-Extraction.pdf',
      totalPages: 17,
      fileSize: '1.2 MB',
      subjectCode: 'DATA SCIENCE (22DS102006)',
      academicYear: 'Specialization Elective - B.Tech Data Science',
      description:
        'Official 17-page university lecture notes on competitive data extraction, feature selection, decision trees, random forests, SVD, and PCA.',
    },
    topics: [
      {
        title: 'Extracting Meaning from Data (Cukierski vs Huffaker)',
        description:
          'Kaggle crowdsourced competitive engineering vs Google mixed-methods social research (qualitative + quantitative telemetry).',
        pageReference: 1,
      },
      {
        title: 'The Leapfrogging Phenomenon & Corporate Crowdsourcing',
        description:
          'Economic, technological, and innovation leapfrogging. Real-world case studies: Allstate 271% model improvement and talent scouting.',
        pageReference: 2,
      },
      {
        title: 'Feature Selection Principles & Motivations',
        description:
          'Why feature selection is critical: reducing overfitting, enhancing computational efficiency, and maximizing stakeholder interpretability.',
        pageReference: 3,
      },
      {
        title: 'Four Feature Selection Strategies',
        description:
          'Filter methods (Chi-square, correlation), Wrapper methods (RFE), Embedded methods (LASSO L1 regularization), and Hybrid pipelines.',
        pageReference: 4,
      },
      {
        title: 'Stepwise Regression & Model Evaluation Metrics',
        description:
          'Forward selection, backward elimination, and bidirectional search. Model scoring via AIC, BIC, R^2, Adjusted R^2, and Cross-Validation.',
        pageReference: 4,
      },
      {
        title: 'User Retention Modeling & Interpretability',
        description:
          'A/B testing, causal vs correlational understanding, and balancing interpretability with raw predictive power in decision trees.',
        pageReference: 5,
      },
      {
        title: 'Shannon Entropy & Information Theory',
        description:
          'Mathematical formula H(X) = -p*log2(p) - (1-p)*log2(1-p). Measuring impurity, zero entropy vs maximum entropy (1 bit).',
        pageReference: 6,
      },
      {
        title: 'Decision Tree Algorithms & Continuous Variables',
        description:
          'Root, internal, and leaf nodes. Information gain splitting, handling continuous thresholds (scikit-learn vs manual splitting), and pruning.',
        pageReference: 7,
      },
      {
        title: 'Random Forests & Ensemble Bagging with R Code',
        description:
          'Bootstrap aggregating (~80% sampling with replacement), F random features at splits, unpruned tree depth, and R implementation on diamonds & iris datasets.',
        pageReference: 9,
      },
      {
        title: 'Singular Value Decomposition (SVD)',
        description:
          'X = U * S * V^T matrix decomposition into orthogonal U, diagonal S, and orthogonal V. Low-rank approximations and latent feature discovery.',
        pageReference: 12,
      },
      {
        title: 'SVD Step-by-Step Mathematical Algorithm',
        description:
          'Computing X*X^T, finding eigenvalues, calculating singular values, right singular vectors V, left singular vectors U, and constructing SVD.',
        pageReference: 14,
      },
      {
        title: 'Principal Component Analysis (PCA)',
        description:
          'Matrix approximation X approx U * V^T, minimizing sum of squared errors, orthogonal principal components, variance maximization, and dimensionality reduction.',
        pageReference: 15,
      },
    ],
    outcomes: [
      'Compare crowdsourced competitive data science with behavioral mixed-methods qualitative analytics',
      'Understand leapfrogging dynamics and ethical considerations in enterprise crowdsourcing',
      'Execute filter, wrapper, embedded (Lasso), and stepwise regression feature selection routines',
      'Calculate Shannon Entropy and Information Gain to determine optimal decision tree split nodes',
      'Implement Decision Trees and Random Forests in R and Python with bootstrap aggregating',
      'Decompose datasets using Singular Value Decomposition (SVD) for collaborative filtering and latent factors',
      'Apply Principal Component Analysis (PCA) for variance maximization and noise reduction',
    ],
    pdfPages: [
      {
        pageNumber: 1,
        title: 'Extracting Meaning from Data: Cukierski (Kaggle) vs. Huffaker (Google)',
        sectionCode: 'Section 1',
        content: [
          'Companies extract meaning from data through two prominent approaches with divergent philosophies: William Cukierski from Kaggle and David Huffaker from Google.',
        ],
        keyPoints: [
          'William Cukierski (Kaggle): Emphasizes feature extraction (converting raw data into clean formats) and feature selection (isolating key predictive attributes).',
          'Kaggle Competition Framework: Organizations collaborate with Kaggle to host contests where global data scientists predict concealed target test values.',
          'Dynamic Leaderboards: Fosters continuous peer iteration and the "leapfrogging" effect, where competitors sequentially surpass leading scores.',
          'Complex Models: Extended competitions risk creating excessively complex model architectures (as seen in the Netflix Prize).',
        ],
      },
      {
        pageNumber: 2,
        title: 'Leapfrogging Dynamics, Collaborations & Ethical Considerations',
        sectionCode: 'Section 1 (Contd.)',
        content: [
          'Leapfrogging refers to bypassing intermediate stages of progress in favor of more advanced solutions.',
        ],
        keyPoints: [
          'Economic Leapfrogging: Emerging nations adopting mobile cellular networks directly, bypassing landline wire infrastructure.',
          'Technological Leapfrogging: Enterprises skipping gradual upgrades to implement state-of-the-art machine learning architectures.',
          'Corporate Success: Allstate achieved a 271% improvement in an actuarial risk model through Kaggle; a $1,000 contest produced >$100,000 in solution value.',
          'Recruitment: Facebook organized a competition where top rank earned a job interview, drawing 422 participants.',
          'Ethical Concerns: Cathy O’Neil notes that small prize incentives can exploit unpaid global talent while displacing in-house corporate analytics teams.',
        ],
      },
      {
        pageNumber: 3,
        title: 'David Huffaker’s Google Perspective & Feature Selection Intro',
        sectionCode: 'Sections 1 & 2',
        content: [
          'David Huffaker (Google) advocates a mixed-methods strategy in social research, synthesizing qualitative user interviews and ethnography with large-scale telemetry.',
          'Features refer to individual measurable attributes or variables that describe an observed phenomenon. They form the foundational input space for all predictive models.',
        ],
        keyPoints: [
          'From Description to Prediction: Shifting from reporting historical user activity to forecasting future engagement.',
          'Retention Modeling: Predicting user lifecycle drop-off to guide targeted intervention strategies.',
          'Ethics & Privacy: Transparent data collection, informed consent, and user control.',
          'Why Feature Selection Matters: Minimizes overfitting, accelerates training/inference times, and maximizes model interpretability.',
        ],
      },
      {
        pageNumber: 4,
        title: 'Feature Selection Approaches & Stepwise Regression',
        sectionCode: 'Section 2 (Contd.)',
        content: [
          'Feature selection isolates the most informative variables using four core paradigms:',
        ],
        keyPoints: [
          'Filter Methods: Ranks features via statistical tests (Correlation, Chi-Square, Mutual Information) independent of model training.',
          'Wrapper Methods: Evaluates feature combinations by training candidate models (e.g., Recursive Feature Elimination - RFE).',
          'Embedded Methods: Selection occurs natively during training (e.g., LASSO L1 regularization penalizing coefficients to zero).',
          'Hybrid Methods: Combines fast filter pruning with fine-grained wrapper evaluation.',
          'Example: Chasing Dragons gaming app predicting 30-day user retention.',
          'Stepwise Regression: Forward Selection (adds best feature sequentially), Backward Elimination (removes least impactful), Bidirectional Selection (alternates adding and removing).',
        ],
      },
      {
        pageNumber: 5,
        title: 'Model Selection Criteria & User Retention Models',
        sectionCode: 'Sections 2 & 3',
        content: [
          'Data scientists evaluate candidate models against rigorous statistical criteria:',
        ],
        keyPoints: [
          'R-squared: Proportion of variance explained by the model.',
          'P-values: Evaluates statistical significance of individual feature coefficients.',
          'Akaike Information Criterion (AIC): Penalizes model complexity; lower scores indicate optimal fit-to-simplicity balance.',
          'Bayesian Information Criterion (BIC): Similar to AIC with steeper complexity penalties based on sample size.',
          'Entropy / Information Gain: Measures impurity reduction in classification splits.',
          'Adjusted R-squared: Penalizes redundant non-informative predictors.',
          'Cross-Validation Scores: Measures generalization across out-of-fold validation splits.',
          'User Retention: Balancing high accuracy with actionable operational insights (e.g., avoiding ads in the first 5 minutes of app onboarding).',
        ],
      },
      {
        pageNumber: 6,
        title: 'Causation vs Correlation & Shannon Entropy',
        sectionCode: 'Sections 3 & 5',
        content: [
          'Understanding causation versus correlation is vital: high engagement correlates with retention but does not inherently cause it.',
          'Entropy, originated by Claude Shannon in information theory, measures uncertainty, randomness, or impurity in a system.',
        ],
        formulas: [
          {
            name: 'Shannon Entropy for Binary Variable X',
            formula: 'H(X) = - p(X=1) * log_2 p(X=1) - p(X=0) * log_2 p(X=0)',
            where: ['p(X=1) = probability of outcome 1', 'p(X=0) = probability of outcome 0'],
          },
        ],
        keyPoints: [
          'Zero Entropy (H = 0): Complete certainty; all records belong to the same single class.',
          'Maximum Entropy (H = 1 bit): Peak uncertainty; outcomes are equally distributed (50% / 50%).',
        ],
      },
      {
        pageNumber: 7,
        title: 'Entropy Curve & Decision Tree Fundamentals',
        sectionCode: 'Sections 5 & 6',
        content: [
          'The entropy curve follows a symmetrical concave parabola peaking at p = 0.5 with H(X) = 1.0.',
          'Decision trees partition decision logic into a sequence of binary conditions, serving as powerful intuitive classifiers and regressors.',
        ],
        figures: [
          {
            title: 'Figure: Entropy Curve',
            caption: 'H(X) as a function of Pr(X=1)',
            type: 'chart',
            description: 'Parabolic curve rising from 0 at Pr=0 to peak at 1.0 at Pr=0.5, then declining back to 0 at Pr=1.0.',
          },
        ],
        keyPoints: [
          'Root Node: Initial split based on the feature providing maximum Information Gain.',
          'Internal Nodes: Test conditions on specific attributes.',
          'Branches: Directed paths representing condition outcomes.',
          'Leaf Nodes: Terminal nodes providing final class or regression predictions.',
          'Student Scenario Example: "Is there a party?" -> "Deadline near?" -> "Study" / "Party" / "Watch TV".',
        ],
      },
      {
        pageNumber: 8,
        title: 'Decision Tree Architecture & Continuous Variables',
        sectionCode: 'Section 6 (Contd.)',
        content: [
          'Decision trees recursively partition subsets until all instances belong to the same class or stopping criteria are satisfied.',
        ],
        figures: [
          {
            title: 'Figure: College Student Decision Flowchart',
            caption: 'Example Hierarchical Tree Rules',
            type: 'flowchart',
            description:
              'Root [IsThereAParty?] -> If Yes: Party; If No: Check [Deadline?] -> If Urgent: Study; If Near: Check [Lazy?] -> If Yes: TV, If No: Study; If No Deadline: Pub.',
          },
        ],
        keyPoints: [
          'Algorithm Workflow: 1) Full dataset -> 2) Calculate parent entropy -> 3) Compute Information Gain for all candidate features -> 4) Split on highest gain -> 5) Recurse -> 6) Prune to avoid overfitting.',
          'Continuous Variables: Scikit-learn automatically evaluates optimal thresholds. Manual implementation sorts values and evaluates information gain at each midpoint boundary.',
        ],
      },
      {
        pageNumber: 9,
        title: 'Continuous Threshold Splitting & Random Forests',
        sectionCode: 'Sections 6 & 7',
        content: [
          'Finding optimal thresholds for continuous features evaluates candidate cuts (e.g., dragons slain < 10 vs >= 10) to maximize impurity drop.',
          'Random Forest is an ensemble learning method that aggregates multiple decision trees via Bagging (Bootstrap Aggregating) to dramatically improve robustness and accuracy.',
        ],
        keyPoints: [
          'Bagging: Reduces variance, prevents overfitting, and boosts generalization by averaging uncorrelated trees.',
          'Hyperparameter N: Number of trees grown in the forest.',
          'Hyperparameter F: Number of features randomly sampled at each split (typically sqrt(p)).',
        ],
      },
      {
        pageNumber: 10,
        title: 'Random Forest Algorithm & R Code Implementation',
        sectionCode: 'Section 7 (Contd.)',
        content: [
          'In bootstrapping, random samples with replacement (~80% of data) train each individual tree. Trees are deliberately left unpruned to learn complex granular patterns.',
        ],
        codeSnippet: {
          language: 'R',
          code: `# Load the diamonds dataset
require(ggplot2)
data(diamonds)
head(diamonds)

# Plot histogram of diamond prices with reference line at $12,000
ggplot(diamonds) + geom_histogram(aes(x=price)) +
  geom_vline(xintercept=12000)`,
          description: 'Inspecting diamond price distributions before binary labeling.',
        },
      },
      {
        pageNumber: 11,
        title: 'R Implementation: GLMNet, RPart & Bootstrapping',
        sectionCode: 'Section 7 (Contd.)',
        content: [
          'Comparing logistic regression, single decision trees, and bootstrapped estimators in R:',
        ],
        codeSnippet: {
          language: 'R',
          code: `# Binary label: 'Expensive' if price >= $12,000
diamonds$Expensive <- ifelse(diamonds$price >= 12000, 1, 0)
diamonds$price <- NULL

# Logistic Regression using glmnet
require(glmnet)
x <- model.matrix(~., diamonds[, -ncol(diamonds)])
y <- as.matrix(diamonds$Expensive)
system.time(modGlmnet <- glmnet(x=x, y=y, family="binomial"))
plot(modGlmnet, label=TRUE)

# Single Decision Tree Model
require(rpart)
modTree <- rpart(Expensive ~ ., data=diamonds)
plot(modTree); text(modTree)

# Bagging (Bootstrap Aggregation)
require(boot)
boot.mean <- function(x, i) { mean(x[i]) }
boot(data=diamonds$carat, statistic=boot.mean, R=120)`,
          description: 'Training GLMNet, decision tree, and computing bootstrap statistics.',
        },
      },
      {
        pageNumber: 12,
        title: 'Boosting, Random Forests & SVD Introduction',
        sectionCode: 'Sections 7 & 8',
        content: [
          'Ensemble models can also be trained using boosting (mboost) and full random forests (randomForest library):',
        ],
        codeSnippet: {
          language: 'R',
          code: `# Boosting with mboost
require(mboost)
modglmBoost <- glmboost(as.factor(Expensive) ~ ., data=diamonds,
                        family=Binomial(link="logit"))

# Random Forest on Iris Dataset
require(randomForest)
modForest <- randomForest(Species ~ ., data=iris,
                          importance=TRUE, proximity=TRUE)`,
          description: 'Running random forest on iris with feature importance.',
        },
        keyPoints: [
          'Pros of Random Forest: High accuracy, resistant to overfitting, built-in feature importance estimation.',
          'Cons: Loss of single-tree interpretability, high computational memory overhead.',
          'SVD Concept: Any m x n matrix X of rank k factorizes into three constituent matrices.',
        ],
      },
      {
        pageNumber: 13,
        title: 'Singular Value Decomposition (SVD) Mathematical Formulation',
        sectionCode: 'Section 8 (Contd.)',
        content: [
          'Singular Value Decomposition decomposes any real matrix X of dimensions m x n into:',
        ],
        formulas: [
          {
            name: 'SVD Matrix Factorization',
            formula: 'X = U * S * V^T',
            where: [
              'U = m x k orthogonal matrix (left singular vectors)',
              'S = k x k diagonal matrix with singular values sigma_1 >= sigma_2 >= ... >= sigma_k >= 0',
              'V = k x n orthogonal matrix (right singular vectors)',
            ],
          },
        ],
        keyPoints: [
          'User-Item Matrices: X represents user ratings; rank k denotes latent preference patterns.',
          'Low-Rank Approximation: Retaining the top d singular values in S achieves optimal low-rank data compression (Eckart-Young theorem).',
          'Dimensionality Reduction: Maps original items into a compact latent feature space.',
        ],
      },
      {
        pageNumber: 14,
        title: 'SVD Algorithm Step-by-Step Guide',
        sectionCode: 'Section 8 (Contd.)',
        content: [
          'SVD computation proceeds through systematic linear algebra steps:',
        ],
        keyPoints: [
          'Step 1: Start with real m x n matrix X.',
          'Step 2: Compute square symmetric matrix X * X^T (size m x m).',
          'Step 3: Solve characteristic equation det(X * X^T - lambda * I) = 0 to find eigenvalues lambda_i.',
          'Step 4: Calculate singular values: sigma_i = sqrt(lambda_i).',
          'Step 5: Compute eigenvectors of X^T * X corresponding to lambda_i to form columns of right singular matrix V.',
          'Step 6: Compute left singular vectors: u_i = (1 / sigma_i) * X * v_i to form columns of U.',
          'Challenges: SVD requires complete data (missing ratings require imputation) and is computationally demanding on large-scale datasets.',
        ],
      },
      {
        pageNumber: 15,
        title: 'Principal Component Analysis (PCA) Foundations',
        sectionCode: 'Sections 8 & 9',
        content: [
          'Step 7 forms diagonal matrix S with singular values sigma_i. Step 8 combines U, S, and V^T to construct the complete SVD.',
          'Principal Component Analysis (PCA) is an unsupervised dimensionality reduction technique that approximates data matrix X by the product of lower-dimensional matrices U and V^T:',
        ],
        formulas: [
          {
            name: 'PCA Low-Rank Approximation',
            formula: 'X approx U * V^T',
            where: [
              'U = m x d matrix of user/instance latent representations',
              'V = n x d matrix of feature/item latent attributes',
              'Goal: Minimize sum of squared reconstruction errors ||X - U * V^T||_F^2',
            ],
          },
        ],
        keyPoints: [
          'Latent Dimensions: Typically d ~ 100 in production recommender and embedding spaces.',
          'Dot Product Prediction: Predicted score of user i for item j is u_i * v_j.',
        ],
      },
      {
        pageNumber: 16,
        title: 'Properties of PCA & How It Works in Simple Terms',
        sectionCode: 'Section 9 (Contd.)',
        content: [
          'PCA generates mutually orthogonal, uncorrelated principal components that explain maximal variance:',
        ],
        keyPoints: [
          'Uncorrelated Components: Eliminates collinearity, creating a compact, orthogonal representation.',
          'Transformation Invariance: For any invertible d x d matrix G, (U * G) * (V * G^-T)^T = U * V^T.',
          'Orthogonality in U & V: Ensures zero redundant overlap between extracted principal components.',
          'Connection to SVD: PCA is computationally implemented via SVD on mean-centered covariance matrices.',
          'Simple Analogy: 1) Data Simplification (reducing dozens of physical attributes) -> 2) Finding Principal Components (combinations capturing the most variance) -> 3) Transformation into uncorrelated feature space.',
        ],
      },
      {
        pageNumber: 17,
        title: 'Dimensionality Reduction & Benefits of PCA',
        sectionCode: 'Section 9 (Contd.)',
        content: [
          'By selecting a few principal components explaining >= 90-95% of cumulative variance, PCA reduces dimensions without sacrificing critical insights.',
        ],
        keyPoints: [
          'Simplification: Makes complex multi-dimensional datasets easier to model and visualize in 2D/3D.',
          'Efficiency: Slashes compute and memory requirements for downstream classifiers.',
          'Noise Reduction: Drops components with near-zero variance that primarily reflect measurement noise.',
          'Speeds Up Training: Eliminates curse of dimensionality, enabling faster convergence.',
          'Summary: Module 2 establishes complete mastery over crowdsourced feature engineering, decision trees, random forests, and matrix factorization via SVD and PCA.',
        ],
      },
    ],
  },
  {
    id: 'module-3',
    number: 3,
    title: 'Advanced Machine Learning & Deep Architectures',
    subtitle: 'Supervised Classifiers, Unsupervised Clustering, Backprop & CNN/RNN',
    description:
      'Curriculum module exploring support vector machines, kernel methods, ensemble gradient boosting (XGBoost, LightGBM), K-Means & DBSCAN clustering, multi-layer perceptrons, backpropagation, and deep convolutional/sequential neural networks.',
    icon: '🧠',
    color: '#16A34A',
    duration: '5 Weeks',
    experiments: 5,
    pdfInfo: {
      fileName: '22DS102006_Module3_Advanced_ML.pdf',
      fileUrl: '/pdfs/Module-3-Advanced-Machine-Learning.pdf',
      totalPages: 8,
      fileSize: '1.1 MB',
      subjectCode: 'DATA SCIENCE (22DS102006)',
      academicYear: 'Specialization Elective - B.Tech Data Science',
      description: 'Comprehensive study materials on Kernel SVM, Deep Neural Networks, Backprop, CNNs, and Clustering.',
    },
    topics: [
      {
        title: 'Support Vector Machines & Kernel Trick',
        description: 'Maximum margin hyperplanes, soft margin slack variables, and RBF/polynomial kernels for non-linear boundaries.',
        pageReference: 1,
      },
      {
        title: 'Advanced Ensembles: XGBoost & LightGBM',
        description: 'Histogram-based gradient boosting, second-order Taylor approximations, and Optuna hyperparameter optimization.',
        pageReference: 2,
      },
      {
        title: 'Unsupervised Clustering: K-Means & DBSCAN',
        description: 'Centroid optimization, silhouette scores, and density-based spatial clustering for arbitrary shapes and outlier rejection.',
        pageReference: 3,
      },
      {
        title: 'Multi-Layer Perceptrons & Backpropagation',
        description: 'Feed-forward networks, activation functions (ReLU, GELU), computational graphs, and loss landscapes.',
        pageReference: 4,
      },
      {
        title: 'Convolutional Neural Networks (CNN)',
        description: '2D convolutions, receptive fields, pooling layers, and transfer learning with ResNet/EfficientNet for computer vision.',
        pageReference: 6,
      },
    ],
    outcomes: [
      'Formulate and train linear and kernel Support Vector Machines',
      'Tune gradient boosted decision tree ensembles with XGBoost and LightGBM',
      'Execute K-Means and DBSCAN clustering on complex datasets',
      'Derive and implement backpropagation across multi-layer neural networks',
      'Construct Convolutional Neural Networks for image classification',
    ],
    pdfPages: [
      {
        pageNumber: 1,
        title: 'Support Vector Machines & Maximum Margin Classification',
        sectionCode: 'Section 1',
        content: [
          'Support Vector Machines (SVM) find the optimal separating hyperplane that maximizes the geometric margin between opposing classes.',
          'When data is non-linearly separable, the kernel trick projects features into infinite-dimensional Hilbert spaces without explicit coordinate calculation.',
        ],
        keyPoints: [
          'Support Vectors: Training points closest to the separating boundary that define the margin width.',
          'RBF (Gaussian) Kernel: K(x, z) = exp(-gamma * ||x - z||^2).',
          'Slack Variables (C): Balances margin maximization against classification penalty.',
        ],
      },
      {
        pageNumber: 2,
        title: 'Gradient Boosting, XGBoost & LightGBM',
        sectionCode: 'Section 2',
        content: [
          'Gradient boosting fits sequential decision trees to the negative gradient (residuals) of the loss function.',
          'XGBoost introduces second-order Taylor expansions and L1/L2 leaf weight regularization.',
        ],
        keyPoints: [
          'Residual Learning: Each new estimator repairs errors made by the current ensemble.',
          'LightGBM: Exclusive Feature Bundling (EFB) and Gradient-based One-Side Sampling (GOSS) for extreme training speed.',
        ],
      },
      {
        pageNumber: 3,
        title: 'Unsupervised Clustering & Spatial Density',
        sectionCode: 'Section 3',
        content: [
          'Clustering partitions unlabeled observations into cohesive clusters based on distance metrics.',
        ],
        keyPoints: [
          'K-Means: Minimizes within-cluster sum of squares (WCSS) via iterative Expectation-Maximization.',
          'DBSCAN: Density-Based Spatial Clustering of Applications with Noise detects arbitrary geometries without pre-specifying K.',
        ],
      },
      {
        pageNumber: 4,
        title: 'Artificial Neural Networks & Backpropagation',
        sectionCode: 'Section 4',
        content: [
          'Multi-Layer Perceptrons (MLP) compose linear matrix transformations with non-linear activation functions.',
          'Backpropagation applies the multivariate chain rule across the computational graph to calculate weight gradients.',
        ],
        keyPoints: [
          'Activations: Sigmoid, Tanh, ReLU (max(0, z)), Leaky ReLU, and GELU.',
          'Optimization: Stochastic Gradient Descent (SGD), Momentum, RMSProp, and Adam.',
        ],
      },
    ],
  },
  {
    id: 'module-4',
    number: 4,
    title: 'Big Data Analytics & Distributed Computing',
    subtitle: 'Large-Scale Data Processing with Apache Spark, Hadoop & Streaming',
    description:
      'Curriculum module covering distributed storage and compute frameworks: HDFS, MapReduce, Apache Spark RDDs and DataFrames, PySpark pipelines, real-time message brokering with Apache Kafka, and distributed NoSQL databases.',
    icon: '🌐',
    color: '#D97706',
    duration: '5 Weeks',
    experiments: 4,
    pdfInfo: {
      fileName: '22DS102006_Module4_Big_Data.pdf',
      fileUrl: '/pdfs/Module-4-Big-Data-Analytics.pdf',
      totalPages: 8,
      fileSize: '1.0 MB',
      subjectCode: 'DATA SCIENCE (22DS102006)',
      academicYear: 'Specialization Elective - B.Tech Data Science',
      description: 'Distributed computing, Hadoop ecosystem, PySpark architectures, and real-time Kafka streaming.',
    },
    topics: [
      {
        title: 'Hadoop Ecosystem & HDFS Architecture',
        description: 'Distributed master-worker architecture, NameNode and DataNode topology, block replication, and MapReduce.',
        pageReference: 1,
      },
      {
        title: 'Apache Spark & Resilient Distributed Datasets (RDD)',
        description: 'In-memory distributed computing, directed acyclic graphs (DAG), lazy evaluation, transformations, and actions.',
        pageReference: 2,
      },
      {
        title: 'PySpark & Scalable Spark SQL DataFrames',
        description: 'Catalyst query optimizer, Tungsten execution engine, window aggregations, and distributed feature transformers.',
        pageReference: 3,
      },
      {
        title: 'Real-Time Streaming with Apache Kafka',
        description: 'Event-driven pub-sub architectures, partition balancing, consumer offset management, and Spark Structured Streaming.',
        pageReference: 4,
      },
    ],
    outcomes: [
      'Explain HDFS architecture and distributed fault-tolerant storage',
      'Author scalable PySpark transformations and actions on multi-gigabyte datasets',
      'Optimize query plans using the Spark Catalyst optimizer',
      'Design event streaming pipelines using Apache Kafka and Spark Structured Streaming',
    ],
    pdfPages: [
      {
        pageNumber: 1,
        title: 'Distributed Storage Foundations: HDFS & MapReduce',
        sectionCode: 'Section 1',
        content: [
          'Hadoop Distributed File System (HDFS) stores files across commodity compute nodes by partitioning them into 128MB blocks with 3x replication.',
        ],
        keyPoints: [
          'NameNode: Manages filesystem namespace and block location metadata.',
          'DataNodes: Store and serve actual raw data blocks.',
          'MapReduce: Map phase filters and sorts; Reduce phase aggregates grouped records.',
        ],
      },
      {
        pageNumber: 2,
        title: 'In-Memory Computing: Apache Spark & RDDs',
        sectionCode: 'Section 2',
        content: [
          'Apache Spark achieves up to 100x faster execution than MapReduce by caching intermediate datasets in distributed RAM.',
        ],
        keyPoints: [
          'RDD: Fault-tolerant immutable distributed collection of objects.',
          'Transformations: Lazy operations (map, filter, groupByKey) producing new RDDs.',
          'Actions: Eager operations (count, collect, saveAsTextFile) triggering DAG execution.',
        ],
      },
    ],
  },
  {
    id: 'module-5',
    number: 5,
    title: 'Natural Language Processing & Generative AI',
    subtitle: 'Text Analytics, Attention Transformers & Large Language Models',
    description:
      'Curriculum module exploring computational linguistics, subword tokenization, Word2Vec and GloVe embeddings, self-attention and transformer architectures (BERT, GPT), vector embeddings, and Retrieval-Augmented Generation (RAG).',
    icon: '💬',
    color: '#8B5CF6',
    duration: '5 Weeks',
    experiments: 4,
    pdfInfo: {
      fileName: '22DS102006_Module5_NLP_GenAI.pdf',
      fileUrl: '/pdfs/Module-5-Natural-Language-Processing.pdf',
      totalPages: 8,
      fileSize: '1.1 MB',
      subjectCode: 'DATA SCIENCE (22DS102006)',
      academicYear: 'Specialization Elective - B.Tech Data Science',
      description: 'Text mining, embeddings, attention mechanisms, modern Transformers, and RAG architectures.',
    },
    topics: [
      {
        title: 'Text Preprocessing & Subword Tokenization',
        description: 'Lemmatization, TF-IDF vectorization, Byte-Pair Encoding (BPE), and WordPiece tokenizers.',
        pageReference: 1,
      },
      {
        title: 'Word Embeddings & Semantic Spaces',
        description: 'Distributed representations: Word2Vec Continuous Bag-of-Words (CBOW) and Skip-Gram, GloVe, and cosine similarity.',
        pageReference: 2,
      },
      {
        title: 'The Transformer Architecture & Self-Attention',
        description: 'Scaled dot-product attention, multi-head attention heads, positional encodings, and encoder-decoder mechanisms.',
        pageReference: 3,
      },
      {
        title: 'Foundation Models & Large Language Models (LLMs)',
        description: 'Pre-training objectives (Masked Language Modeling in BERT vs Causal LM in GPT), instruction tuning, and RLHF.',
        pageReference: 4,
      },
      {
        title: 'Retrieval-Augmented Generation (RAG) & Vector DBs',
        description: 'Semantic dense retrieval, chunking strategies, vector indexings (HNSW), and prompt grounding.',
        pageReference: 5,
      },
    ],
    outcomes: [
      'Preprocess natural language corpora and construct dense word embeddings',
      'Explain the mathematics of scaled dot-product attention and multi-head attention',
      'Fine-tune pre-trained transformer models for text classification and sentiment analysis',
      'Build end-to-end Retrieval-Augmented Generation (RAG) systems with vector databases',
    ],
    pdfPages: [
      {
        pageNumber: 1,
        title: 'Text Tokenization & Distributed Vector Spaces',
        sectionCode: 'Section 1',
        content: [
          'Natural language preprocessing transforms unstructured prose into discrete numerical token representations.',
        ],
        keyPoints: [
          'TF-IDF: Balances term frequency against document rarity across the corpus.',
          'Word2Vec: Predicts context words given target (Skip-Gram) or target given context (CBOW).',
        ],
      },
      {
        pageNumber: 2,
        title: 'Self-Attention & The Transformer Architecture',
        sectionCode: 'Section 2',
        content: [
          'Vaswani et al. (2017) introduced "Attention Is All You Need", replacing recurrence with parallel self-attention.',
        ],
        formulas: [
          {
            name: 'Scaled Dot-Product Attention',
            formula: 'Attention(Q, K, V) = softmax( (Q * K^T) / sqrt(d_k) ) * V',
            where: ['Q = Query matrix', 'K = Key matrix', 'V = Value matrix', 'd_k = Key dimension scaling factor'],
          },
        ],
      },
    ],
  },
  {
    id: 'module-6',
    number: 6,
    title: 'MLOps, Model Deployment & Production Data Science',
    subtitle: 'Containerization, FastAPI Serving, CI/CD & AI Governance',
    description:
      'Curriculum module covering industrializing machine learning: model serialization with ONNX, microservice deployment via FastAPI, Docker containerization, Kubernetes orchestration, CI/CD automated testing, drift detection, and AI ethics.',
    icon: '🚀',
    color: '#DC2626',
    duration: '4 Weeks',
    experiments: 3,
    pdfInfo: {
      fileName: '22DS102006_Module6_MLOps.pdf',
      fileUrl: '/pdfs/Module-6-MLOps-Production-Data-Science.pdf',
      totalPages: 8,
      fileSize: '1.0 MB',
      subjectCode: 'DATA SCIENCE (22DS102006)',
      academicYear: 'Specialization Elective - B.Tech Data Science',
      description: 'End-to-end ML production lifecycle, FastAPI model serving, Docker packaging, CI/CD, and monitoring.',
    },
    topics: [
      {
        title: 'Model Serialization & Standard Packaging',
        description: 'Joblib, Pickle security risks, ONNX (Open Neural Network Exchange), and TorchScript.',
        pageReference: 1,
      },
      {
        title: 'RESTful Model Serving with FastAPI',
        description: 'Asynchronous request handling, Pydantic type validation, schema docs (Swagger), and batch scoring.',
        pageReference: 2,
      },
      {
        title: 'Containerization & Docker for Data Science',
        description: 'Multi-stage Dockerfiles, virtual environment isolation, GPU base images, and container registries.',
        pageReference: 3,
      },
      {
        title: 'Continuous Integration & Continuous Delivery (CI/CD)',
        description: 'Automated unit tests, data schema validation, model regression checks, and GitHub Actions pipelines.',
        pageReference: 4,
      },
      {
        title: 'Model Monitoring, Drift Detection & Explainable AI',
        description: 'Detecting data drift (KS-test) and concept drift, Prometheus metrics, SHAP values, and ethical governance.',
        pageReference: 5,
      },
    ],
    outcomes: [
      'Serialize machine learning models into high-performance ONNX formats',
      'Develop and deploy asynchronous inference APIs using FastAPI and Pydantic',
      'Containerize predictive services using production-grade multi-stage Dockerfiles',
      'Implement real-time monitoring for covariate shift and concept drift',
    ],
    pdfPages: [
      {
        pageNumber: 1,
        title: 'Model Serialization & FastAPI Microservice Architecture',
        sectionCode: 'Section 1',
        content: [
          'Transferring trained weights from development notebooks into production environments requires standardized serialization formats.',
        ],
        keyPoints: [
          'ONNX: Open cross-platform runtime optimizing graph operations for CPU/GPU acceleration.',
          'FastAPI: High-performance asynchronous Python web framework featuring auto-generated OpenAPI documentation.',
        ],
      },
      {
        pageNumber: 2,
        title: 'Data Drift, Model Monitoring & AI Ethics',
        sectionCode: 'Section 2',
        content: [
          'Once deployed, real-world data distributions inevitably diverge from training data distributions over time.',
        ],
        keyPoints: [
          'Covariate Shift: Changes in input feature distribution P(X) while P(Y|X) remains constant.',
          'Concept Drift: Changes in ground truth relationship P(Y|X).',
          'SHAP & LIME: Game-theoretic attribution explaining individual prediction contributions for regulatory compliance.',
        ],
      },
    ],
  },
];
