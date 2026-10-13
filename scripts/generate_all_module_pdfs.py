import os
from fpdf import FPDF

class CoursePDF(FPDF):
    def __init__(self, course_code, module_title, total_pages_str=""):
        super().__init__(orientation="P", unit="mm", format="A4")
        self.course_code = course_code
        self.module_title = module_title
        self.set_auto_page_break(auto=True, margin=20)
        self.set_margins(left=20, top=20, right=20)

    def header(self):
        self.set_font("Helvetica", "B", 8)
        self.set_text_color(100, 116, 139)
        self.cell(0, 6, f"{self.course_code} - {self.module_title}".upper(), border=0, align="L")
        self.ln(4)
        self.set_draw_color(226, 232, 240)
        self.set_line_width(0.3)
        self.line(20, 18, 190, 18)
        self.ln(6)

    def footer(self):
        self.set_y(-15)
        self.set_draw_color(226, 232, 240)
        self.set_line_width(0.3)
        self.line(20, 282, 190, 282)
        self.set_font("Helvetica", "", 8)
        self.set_text_color(148, 163, 184)
        self.cell(0, 10, f"Page {self.page_no()}", border=0, align="C")

    def chapter_title(self, num_and_title):
        self.set_font("Helvetica", "B", 14)
        self.set_text_color(15, 23, 42)
        self.ln(3)
        self.multi_cell(0, 7, num_and_title)
        self.ln(2)

    def section_header(self, text):
        self.set_font("Helvetica", "B", 11)
        self.set_text_color(30, 41, 59)
        self.ln(2)
        self.multi_cell(0, 6, text)
        self.ln(1)

    def body_paragraph(self, text):
        self.set_font("Helvetica", "", 10)
        self.set_text_color(51, 65, 85)
        self.multi_cell(0, 5.5, text)
        self.ln(2)

    def bullet_item(self, bold_prefix, text):
        self.set_font("Helvetica", "B", 10)
        self.set_text_color(30, 41, 59)
        prefix = f"-  {bold_prefix}: " if bold_prefix else "-  "
        self.write(5.5, prefix)
        self.set_font("Helvetica", "", 10)
        self.set_text_color(51, 65, 85)
        self.multi_cell(0, 5.5, text)
        self.ln(1)

    def callout_box(self, title, text, bg_r=240, bg_g=249, bg_b=255, border_r=186, border_g=230, border_b=253):
        self.ln(2)
        self.set_fill_color(bg_r, bg_g, bg_b)
        self.set_draw_color(border_r, border_g, border_b)
        self.set_line_width(0.4)
        
        # calculate approximate height
        self.rect(20, self.get_y(), 170, 24, style="FD")
        curr_y = self.get_y()
        self.set_xy(24, curr_y + 2)
        self.set_font("Helvetica", "B", 9)
        self.set_text_color(14, 116, 144)
        self.cell(0, 5, title, ln=1)
        self.set_x(24)
        self.set_font("Helvetica", "", 9)
        self.set_text_color(51, 65, 85)
        self.multi_cell(162, 4.5, text)
        self.set_y(curr_y + 26)

    def code_block(self, code_lines):
        self.ln(2)
        self.set_fill_color(248, 250, 252)
        self.set_draw_color(203, 213, 225)
        self.set_font("Courier", "", 8.5)
        self.set_text_color(15, 23, 42)
        full_code = "\n".join(code_lines)
        self.multi_cell(0, 4.5, full_code, border=1, fill=True)
        self.ln(3)

def generate_module_1_pdf():
    pdf = CoursePDF("SPECIALIZATION ELECTIVE - DATA SCIENCE (22DS102006)", "MODULE 1 INTRODUCTION")
    
    # Page 1
    pdf.add_page()
    pdf.set_font("Helvetica", "B", 18)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(0, 10, "Module 1: INTRODUCTION", ln=1, align="L")
    pdf.set_font("Helvetica", "I", 11)
    pdf.set_text_color(100, 116, 139)
    pdf.cell(0, 6, "Course Code: 22DS102006 - Specialization Elective in Data Science", ln=1)
    pdf.ln(4)

    pdf.chapter_title("1. Definition of Data Science")
    pdf.body_paragraph(
        "Data Science (DS) is the study and practice of collecting, storing, processing, and analyzing data "
        "to extract meaningful insights and support decision-making. It incorporates scientific methods, "
        "computational thinking, and systematic analysis of data. DS fundamentally combines computer science, "
        "statistics, mathematics, and domain expertise."
    )
    pdf.section_header("The 3Vs of Data that Justify its Rise:")
    pdf.bullet_item("Volume", "Massive amounts of data generated globally, scaling into zettabytes (ZB).")
    pdf.bullet_item("Velocity", "Extreme speed at which data is generated and streamed in real-time.")
    pdf.bullet_item("Variety", "Structured (tables, SQL) and unstructured formats (text, images, audio, video).")
    pdf.body_paragraph(
        "Data science is used to derive actionable insights to solve real-world problems through systematic, "
        "repeatable, and verifiable processes."
    )
    pdf.callout_box(
        "Figure 1.1: Increase of Data Volume in 15 Years",
        "IDC's Digital Universe Study reveals global data increased to over 40 zettabytes by 2020 - a 50-fold increase since 2010. This proves the soaring importance of Data Science in managing and analyzing this massive scale."
    )
    pdf.section_header("Where Do We See Data Science?")
    pdf.body_paragraph("Data science has permeated every major sector of the modern global economy:")

    # Page 2
    pdf.add_page()
    pdf.section_header("Key Application Domains of Data Science")
    pdf.bullet_item("Finance", "Facilitates fraud detection, credit risk assessment, customer segmentation, and algorithmic investment strategies. Predictive models assist in loan underwriting and automated portfolio balancing.")
    pdf.bullet_item("Public Policy", "Governments leverage citizen data, traffic sensors, and public service metrics to enhance municipal governance. Open platforms like data.gov power evidence-based policy formulation.")
    pdf.bullet_item("Politics", "Voter profiling, micro-targeted campaign messaging, and social media sentiment analysis enable political strategists to maximize voter turnout.")
    pdf.bullet_item("Healthcare", "Revolutionizes medical diagnosis, genomic research, electronic health records (EHR), and personalized medicine. Wearable sensors monitor vitals in real time for preventative care.")
    pdf.bullet_item("Urban Planning & Smart Cities", "Integrates IoT sensor grids to optimize traffic flow, reduce electrical grid loads, and ensure emergency response. Chicago's Plow Tracker and Boston's SnowCOP are prime examples.")
    pdf.bullet_item("Education", "Personalized adaptive learning pathways, monitoring student engagement metrics, and early warning systems for academic interventions.")
    pdf.bullet_item("Libraries & Information Science", "Automated systematic literature searches, semantic metadata indexing, and natural language retrieval for global scientific repositories.")
    pdf.bullet_item("Business & E-Commerce", "Customer lifetime value prediction, dynamic pricing, churn reduction, and collaborative filtering engines powering tech giants like Amazon and Netflix.")
    pdf.bullet_item("Industrial & Manufacturing", "Predictive maintenance, supply chain resilience, computer-vision quality inspection, and IoT telematics.")

    # Page 3
    pdf.add_page()
    pdf.chapter_title("2. Skills & Roles in Data Science")
    pdf.body_paragraph(
        "Success in Data Science requires merging curiosity, analytical acumen, and rigorous technical craftsmanship. "
        "Three foundational competencies define the hybrid nature of a modern data scientist:"
    )
    pdf.bullet_item("a) Willingness to Experiment", "Curious, creative problem-solvers who formulate rigorous hypotheses and explore data freely. Employers often assess curiosity through open-ended scenario questions.")
    pdf.bullet_item("b) Proficiency in Mathematical Reasoning", "Solid command of probability, multivariable calculus, linear algebra, and statistical hypothesis testing.")
    pdf.bullet_item("c) Data Literacy", "The fundamental 21st-century capability to read, critique, manipulate, and articulate stories with complex datasets.")
    
    pdf.section_header("Roles & Job Archetypes in Data Science (Dave Holtz Framework)")
    pdf.bullet_item("Data Analyst (Entry-Level)", "Focuses on descriptive querying, KPI dashboards, business intelligence, and reporting using SQL, Excel, MySQL, Google Analytics, and Tableau.")
    pdf.bullet_item("Data Wrangler / Data Engineer", "Designs robust extraction pipelines, ETL workflows, and scalable architectures for massive unstructured datasets; requires strong systems programming.")
    pdf.bullet_item("Product-Focused Data Scientist", "Develops data-driven software services (recommendation systems, ranking algorithms); requires deep machine learning and product experimentation.")
    pdf.bullet_item("Generalist in Data-Driven Companies", "Operates across the full end-to-end lifecycle: ingestion, exploratory analysis, ML modeling, and executive storytelling.")

    # Page 4
    pdf.add_page()
    pdf.chapter_title("3. Tools for Data Science")
    pdf.body_paragraph(
        "Industry practitioners rely on versatile programming languages and computational toolkits that facilitate rapid prototyping, reproducible research, and enterprise deployment."
    )
    pdf.section_header("A) Python Programming Language")
    pdf.bullet_item("Characteristics", "High-level, interpreted, general-purpose scripting language with intuitive readable syntax and vast scientific computing community support.")
    pdf.bullet_item("Data Manipulation", "Pandas for dataframes, series manipulation, and time-series alignment.")
    pdf.bullet_item("Numerical Computing", "NumPy for N-dimensional vector operations, SciPy for scientific routines.")
    pdf.bullet_item("Data Visualization", "Matplotlib and Seaborn for high-grade static and statistical plotting.")
    pdf.bullet_item("Machine Learning", "Scikit-Learn for classical algorithms, TensorFlow and PyTorch for deep neural networks.")

    pdf.section_header("B) R Statistical Computing Language")
    pdf.bullet_item("Characteristics", "Designed specifically for mathematical statistics, bioinformatics, and publication-ready graphics supported by CRAN.")
    pdf.bullet_item("Key Packages", "ggplot2 for the Grammar of Graphics, dplyr for data wrangling, RMarkdown for reproducible research.")

    # Page 5
    pdf.add_page()
    pdf.section_header("C) SQL (Structured Query Language)")
    pdf.body_paragraph(
        "The standard declarative language for interacting with relational database management systems (RDBMS). "
        "Crucial for extracting, joining, aggregating, and filtering datasets directly within enterprise databases "
        "before loading filtered subsets into Python or R memory."
    )
    pdf.section_header("D) UNIX / Linux Shell Environment")
    pdf.bullet_item("Core Strengths", "Enables stream processing, headless execution on remote compute clusters, and automation of recurring ETL pipelines.")
    pdf.bullet_item("Text Processing Utilities", "grep, awk, sed, cut, sort, uniq, and shell scripting reduce overhead without needing complex scripts.")
    
    pdf.section_header("Supporting Ecosystem Tools")
    pdf.bullet_item("Jupyter Notebooks", "Interactive literate programming combining markdown explanations, equations, code, and live visualizations.")
    pdf.bullet_item("Tableau & Power BI", "Enterprise visual analytics and executive dashboard development.")
    pdf.bullet_item("Hadoop & Spark", "Distributed fault-tolerant processing frameworks for multi-terabyte Big Data.")

    # Page 6
    pdf.add_page()
    pdf.chapter_title("4. Data Types: Structured vs. Unstructured")
    pdf.body_paragraph(
        "Data fundamentally bifurcates into structured and unstructured formats. Understanding this dichotomy dictates the choice of ingestion pipeline, storage engine, and modeling strategy."
    )
    pdf.section_header("Structured Data")
    pdf.body_paragraph(
        "Neatly organized in tabular schemas where each row denotes an entity record and columns denote strictly typed attributes. "
        "Attributes may be numeric, categorical, boolean, or temporal. Easily queried via SQL and stored in relational engines."
    )
    pdf.callout_box(
        "Table 1.1: Customer Data Sample",
        "custid | sex | is.employed | income | marital.stat | housing.type | num.vehicles | age | state.of.res\n"
        "2068   | F   | NA          | 11300  | Married      | Homeowner    | 2            | 49  | Michigan\n"
        "2848   | M   | True        | 4500   | Never married| Rented       | 3            | 22  | Georgia"
    )

    pdf.section_header("Unstructured Data")
    pdf.body_paragraph(
        "Lacks predefined relational models. Includes free text, customer feedback logs, audio recordings, video streams, and sensor waveforms. "
        "Represents ~80% of all data generated worldwide. Requires sophisticated natural language processing (NLP), computer vision, and embeddings to unlock value."
    )

    # Page 7
    pdf.add_page()
    pdf.chapter_title("5. Data Collections & Acquisition")
    pdf.section_header("5.1 Open Data Initiatives")
    pdf.body_paragraph(
        "Datasets published freely without intellectual property or commercial licensing restrictions. "
        "In 2013, the White House established Project Open Data (Memorandum M-13-3), mandating federal data release in machine-readable formats."
    )
    pdf.section_header("Core Principles of Open Data:")
    pdf.bullet_item("Public", "Universally open by default unless restricted by privacy, security, or confidentiality.")
    pdf.bullet_item("Accessible", "Provided in accessible, machine-readable, non-proprietary file formats.")
    pdf.bullet_item("Described", "Documented thoroughly with comprehensive metadata standards.")
    pdf.bullet_item("Reusable", "Licensed for unrestricted non-commercial and commercial reuse.")
    pdf.bullet_item("Complete", "Released in raw, unprocessed fidelity alongside processed summaries.")
    pdf.bullet_item("Timely", "Published promptly to maintain contemporary analytical relevance.")

    pdf.section_header("5.2 Social Media & API Harvesting")
    pdf.body_paragraph(
        "Web APIs (REST, GraphQL) allow programmatic extraction of public social discourse, engagement metrics, "
        "and geographical check-ins. Notable examples include the Meta Graph API and the Yelp Open Academic Challenge."
    )

    # Page 8
    pdf.add_page()
    pdf.section_header("5.3 Multimodal & IoT Telematics")
    pdf.body_paragraph(
        "Interconnected smart sensors generate multimodal streams combining telemetry, spatial geolocation, audio, and imagery. "
        "In biomedical research, multimodal neurological scans (EEG, MEG, fMRI) are processed through techniques like Statistical Parametric Mapping (SPM) developed by Karl Friston."
    )
    pdf.section_header("5.4 Data Storage & Presentation Formats")
    pdf.bullet_item("CSV (Comma-Separated Values)", "Plain-text tabular format universally recognized by analysis tools. Parsing requires careful handling of commas inside text quotes.")
    pdf.bullet_item("TSV (Tab-Separated Values)", "Uses tab delimiters (\t), reducing delimiters collision in narrative fields.")
    pdf.bullet_item("XML (Extensible Markup Language)", "Hierarchical, self-describing tagged format designed for cross-platform interoperability.")
    pdf.bullet_item("RSS (Really Simple Syndication)", "XML dialect tailored for content syndication, automated feed harvesting, and real-time alerts.")

    # Page 9
    pdf.add_page()
    pdf.chapter_title("6. Data Preprocessing & Cleaning")
    pdf.body_paragraph(
        "Raw real-world data is inherently dirty, noisy, incomplete, and heterogeneous. Preprocessing accounts for up to 80% of a data scientist's project time."
    )
    pdf.section_header("Common Problems in Raw Data:")
    pdf.bullet_item("Incomplete Data", "Missing attribute values, unrecorded user surveys, or failed sensor intervals.")
    pdf.bullet_item("Noisy Data", "Erroneous readings, corrupt sensors, or extreme anomalous spikes.")
    pdf.bullet_item("Inconsistent Data", "Conflicting formats (e.g. DD/MM/YYYY vs MM/DD/YYYY), casing discrepancies, duplicate keys.")

    pdf.section_header("Seven Essential Preprocessing Tasks:")
    pdf.bullet_item("1. Data Cleaning", "Deduplicating entries, repairing typographic errors, and validating integrity.")
    pdf.bullet_item("2. Data Wrangling (Munging)", "Restructuring unstructured blobs into clean tabular dataframes.")
    pdf.bullet_item("3. Missing Value Handling", "Listwise deletion, mean/median imputation, k-NN imputation, or predictive regression filling.")
    pdf.bullet_item("4. Noise Smoothing", "Moving average filters, binning smoothing, and outlier trimming via Z-score / IQR.")
    pdf.bullet_item("5. Data Integration", "Resolving schema alignment, schema entity conflicts, and unit conversions (USD vs INR).")
    pdf.bullet_item("6. Data Reduction", "Aggregation and dimensionality reduction (PCA) preserving key variance.")
    pdf.bullet_item("7. Discretization", "Transforming continuous numeric variables into ordinal bins (Cold, Warm, Hot).")

    # Page 10
    pdf.add_page()
    pdf.chapter_title("7. Data Analysis vs. Data Analytics")
    pdf.body_paragraph(
        "While colloquially interchanged, Dave Kasik (Senior Technical Fellow at Boeing) highlights an important cognitive distinction: "
        "Data Analysis refers to the hands-on inspection and querying of historical data. Data Analytics encompasses the overarching scientific "
        "methodology and statistical machinery that builds predictive models and operational systems."
    )
    pdf.callout_box(
        "Time-Oriented Distinction",
        "- Data Analysis: Retrospective lens. 'What happened and why did it happen?'\n"
        "- Data Analytics: Forward-looking lens. 'What will happen next and how should we act?'"
    )
    pdf.section_header("The Six Analytical Paradigms:")
    pdf.bullet_item("1. Descriptive Analysis", "Summarizes historical states using quantitative measures.")
    pdf.bullet_item("2. Diagnostic Analytics", "Investigates root causes, anomalies, and correlations behind past outcomes.")
    pdf.bullet_item("3. Predictive Analytics", "Forecasts likelihoods of future states using statistical modeling.")
    pdf.bullet_item("4. Prescriptive Analytics", "Recommends optimal courses of action via simulation and optimization.")
    pdf.bullet_item("5. Exploratory Data Analysis (EDA)", "Uncovers emergent patterns without preconceived hypotheses.")
    pdf.bullet_item("6. Mechanistic Analysis", "Models deterministic causal relationships in physical/controlled systems.")

    # Page 11
    pdf.add_page()
    pdf.chapter_title("8. Descriptive Analysis & Variables")
    pdf.body_paragraph(
        "Descriptive statistics organize and summarize raw observations into comprehensible numerical indices and graphs."
    )
    pdf.section_header("Measurement Scales of Variables:")
    pdf.bullet_item("Nominal", "Categorical labels without intrinsic ordering (e.g., Color, Gender, Operating System).")
    pdf.bullet_item("Ordinal", "Ordered categories where differences between ranks are not quantified (e.g., Low, Medium, High).")
    pdf.bullet_item("Interval", "Quantitative numerical values with equal intervals, but no true absolute zero (e.g., Temperature in Celsius).")
    pdf.bullet_item("Ratio", "Quantitative values possessing an absolute zero point; supports ratio comparisons (e.g., Income, Age, Weight).")

    pdf.section_header("Role-Based Classification:")
    pdf.bullet_item("Independent (Predictor)", "The explanatory factor or feature that drives the outcome.")
    pdf.bullet_item("Dependent (Outcome)", "The response variable whose behavior is being measured or forecasted.")

    # Page 12
    pdf.add_page()
    pdf.section_header("Visualizing Distributions & Normality")
    pdf.bullet_item("Histograms", "Binned frequency charts showing the probability density of continuous numerical attributes.")
    pdf.bullet_item("Pie & Bar Charts", "Visualizes proportion distribution for categorical frequencies.")
    pdf.bullet_item("The Normal Distribution", "Symmetric, bell-shaped Gaussian distribution where mean, median, and mode coincide.")
    pdf.bullet_item("Skewness", "Measures asymmetric tail distortion (positive/right skew vs negative/left skew).")
    pdf.bullet_item("Kurtosis", "Measures the peakedness or tail heaviness of a distribution relative to normal.")

    pdf.section_header("Measures of Central Tendency:")
    pdf.bullet_item("Mean (Arithmetic Average)", "Sum of observations divided by sample count. Highly sensitive to extreme outliers.")
    pdf.bullet_item("Median", "Middle value of ordered observations. Robust against skewness and outliers.")
    pdf.bullet_item("Mode", "Most frequently occurring observation. Primary central measure for nominal data.")

    # Page 13
    pdf.add_page()
    pdf.section_header("Measures of Dispersion (Spread)")
    pdf.bullet_item("Range", "Difference between the maximum and minimum observations.")
    pdf.bullet_item("Interquartile Range (IQR)", "Difference between the 75th percentile (Q3) and 25th percentile (Q1); captures the central 50%.")
    pdf.bullet_item("Population Variance (sigma^2)", "Measures average squared deviation across an entire population: sigma^2 = SUM(x_i - mu)^2 / N")
    pdf.bullet_item("Sample Variance (s^2)", "Unbiased sample estimator with Bessel's correction: s^2 = SUM(x_i - x_bar)^2 / (n - 1)")
    pdf.bullet_item("Standard Deviation (s)", "Square root of variance: s = sqrt(s^2). Expressed in original measurement units.")

    pdf.chapter_title("9. Diagnostic Analytics")
    pdf.body_paragraph(
        "Diagnostic analytics investigates 'Why did this trend or anomaly occur?' By establishing causal links, "
        "correlation coefficients (Pearson's r spanning -1.0 to +1.0), and cohort segmentation, analysts isolate the underlying mechanisms."
    )

    # Page 14
    pdf.add_page()
    pdf.chapter_title("10. Predictive Analytics")
    pdf.body_paragraph(
        "Predictive analytics evaluates historical and real-time patterns to estimate the probability of unknown future outcomes. "
        "It provides probabilistic forecasts rather than deterministic guarantees."
    )
    pdf.section_header("The 4-Step Predictive Workflow:")
    pdf.bullet_item("Step 1: Data Collection", "Aggregating historical features, ground-truth labels, and metadata.")
    pdf.bullet_item("Step 2: Data Cleaning", "Eliminating bias, imputing missing observations, and standardizing scales.")
    pdf.bullet_item("Step 3: Pattern Recognition", "Training statistical regressors, classifiers, and ensemble estimators.")
    pdf.bullet_item("Step 4: Prediction & Evaluation", "Deploying models and verifying accuracy on hold-out validation sets.")
    pdf.section_header("Key Industry Applications:")
    pdf.bullet_item("Financial Risk", "Credit scoring models, default probability forecasting.")
    pdf.bullet_item("Marketing", "Customer churn prediction, campaign response propensity.")
    pdf.bullet_item("Healthcare", "Sepsis early detection and readmission risk scores.")

    # Page 15
    pdf.add_page()
    pdf.chapter_title("11. Prescriptive Analytics")
    pdf.body_paragraph(
        "Prescriptive analytics surpasses prediction by asking: 'What specific action should we execute to achieve our objective?' "
        "It combines predictive probability distributions with mathematical optimization, decision theory, and game-theoretic simulations."
    )
    pdf.bullet_item("Operational Methodology", "Simulates multiple candidate policies under uncertainty to optimize objective functions (e.g. maximize revenue, minimize patient wait times).")
    pdf.bullet_item("Industry Adoption", "High computational complexity and organizational inertia currently limit full prescriptive adoption to ~3% of enterprises, making it a high-value frontier.")

    pdf.chapter_title("12. Exploratory Data Analysis (EDA)")
    pdf.body_paragraph(
        "Pioneered by John Tukey, EDA is an open-ended mindset rather than a rigid sequence of recipes. "
        "Analysts inspect distributions, pairwise scatter plots, and boxplots to allow the data to reveal its internal structure "
        "before committing to parametric assumptions."
    )

    # Page 16
    pdf.add_page()
    pdf.chapter_title("13. Mechanistic Analysis")
    pdf.body_paragraph(
        "Mechanistic analysis mathematically models the explicit cause-and-effect relationship in physical, engineering, or tightly controlled biological environments. "
        "Unlike empirical correlation, mechanistic models describe deterministic physical laws."
    )
    pdf.section_header("Linear Model Representation:")
    pdf.body_paragraph("y = beta_0 + beta_1 * x + epsilon\n\nWhere:\n- beta_0 = Baseline intercept\n- beta_1 = Slope or effect size of change in x upon y\n- x = Controlled input parameter\n- y = Measured physical output")
    pdf.callout_box(
        "Summary of Module 1",
        "Module 1 establishes the bedrock of the 22DS102006 curriculum: data science definitions, ecosystem tools (Python/R/SQL), data representations, robust preprocessing workflows, and the entire spectrum of analysis types from descriptive to mechanistic."
    )

    os.makedirs("public/pdfs", exist_ok=True)
    pdf.output("public/pdfs/Module-1-Introduction-Data-Science.pdf")
    print("Module 1 PDF generated successfully.")

def generate_module_2_pdf():
    pdf = CoursePDF("SPECIALIZATION ELECTIVE - DATA SCIENCE (22DS102006)", "MODULE 2 DATA EXTRACTION")
    
    # Page 1
    pdf.add_page()
    pdf.set_font("Helvetica", "B", 18)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(0, 10, "Module 2: DATA EXTRACTION", ln=1, align="L")
    pdf.set_font("Helvetica", "I", 11)
    pdf.set_text_color(100, 116, 139)
    pdf.cell(0, 6, "Course Code: 22DS102006 - Feature Selection, Decision Trees, SVD & PCA", ln=1)
    pdf.ln(4)

    pdf.chapter_title("1. Extracting Meaning from Data")
    pdf.body_paragraph(
        "Organizations adopt two prominent philosophical frameworks for extracting meaning from big data: "
        "the crowdsourced competitive engineering paradigm pioneered by William Cukierski (Kaggle) "
        "and the mixed-methods behavioral paradigm advocated by David Huffaker (Google)."
    )
    pdf.section_header("A) William Cukierski's Kaggle Paradigm")
    pdf.bullet_item("Feature Extraction", "Transforming raw, unstructured observations into well-formed mathematical feature spaces to avoid garbage-in, garbage-out modeling.")
    pdf.bullet_item("Feature Selection", "Isolating the most informative subsets of variables to minimize model complexity, eliminate collinearity, and boost generalization.")
    pdf.bullet_item("Crowdsourced Competitions", "Kaggle distributes anonymized training datasets with withheld test targets, fostering rapid iterations on a dynamic public/private leaderboard.")
    pdf.bullet_item("The Leapfrogging Effect", "Competitors continuously outdo prior solutions, driving breakthrough architectures (e.g. Netflix Prize). However, prolonged competitions can yield overly complex ensembles difficult to deploy in production.")

    # Page 2
    pdf.add_page()
    pdf.section_header("The Dynamics of Leapfrogging & Industry Collaborations")
    pdf.bullet_item("Economic Leapfrogging", "Developing economies bypassing legacy infrastructures (e.g. skipping wire landlines directly to 5G cellular finance).")
    pdf.bullet_item("Technological Leapfrogging", "Skipping iterative software generations to deploy state-of-the-art transformer pipelines directly.")
    pdf.bullet_item("Corporate Impact", "Allstate improved its actuarial risk prediction accuracy by 271% through Kaggle crowdsourcing; small prize pools unlocked immense corporate IP.")
    pdf.bullet_item("Recruitment & Ethical Considerations", "Competitions serve as talent discovery platforms, but raise questions regarding unpaid contributor value and corporate exploitation.")

    pdf.section_header("B) David Huffaker's Google Paradigm (Mixed Methods)")
    pdf.bullet_item("Mixed-Methods Synergy", "Combining large-scale quantitative clickstream telemetry with in-depth qualitative user interviews and ethnographic observation.")
    pdf.bullet_item("From Description to Prediction", "Evolving descriptive dashboards into predictive models of user satisfaction and long-term retention.")
    pdf.bullet_item("Ethics & Informed Consent", "Prioritizing transparency, user privacy controls, and explainable models over black-box scoring.")

    # Page 3
    pdf.add_page()
    pdf.chapter_title("2. Feature Selection Strategies")
    pdf.body_paragraph(
        "Features are measurable attributes that describe observed phenomena. Feature selection systematically removes redundant, noisy, or irrelevant features."
    )
    pdf.section_header("Why Feature Selection is Imperative:")
    pdf.bullet_item("Mitigating Overfitting", "Simpler models with fewer degrees of freedom generalize significantly better to unseen test distributions.")
    pdf.bullet_item("Computational Efficiency", "Fewer dimensions translate to vastly reduced training times and lower RAM footprints during batch/real-time inference.")
    pdf.bullet_item("Model Interpretability", "Enables stakeholders to understand the true causal drivers behind predictions.")

    pdf.section_header("The Four Feature Selection Approaches:")
    pdf.bullet_item("1. Filter Methods", "Ranks features based on statistical association independent of model training (Pearson correlation, Chi-Square test, Mutual Information). Fast and computationally lightweight.")
    pdf.bullet_item("2. Wrapper Methods", "Evaluates feature subsets by repeatedly training and testing a chosen estimator (e.g. Recursive Feature Elimination - RFE). Computationally intensive but high performance.")
    pdf.bullet_item("3. Embedded Methods", "Feature selection occurs natively during model optimization (e.g. LASSO L1 regularization driving coefficients to zero, decision tree split rankings).")
    pdf.bullet_item("4. Hybrid Methods", "Filters out 90% of noise variables via filter methods first, then optimizes remaining subsets using wrapper routines.")

    # Page 4
    pdf.add_page()
    pdf.section_header("Stepwise Regression & Model Selection Criteria")
    pdf.body_paragraph(
        "Stepwise regression systematically tests combinations of features through sequential additions and deletions."
    )
    pdf.bullet_item("Forward Selection", "Begins with an intercept-only model; iteratively adds the feature that yields the greatest reduction in residual sum of squares.")
    pdf.bullet_item("Backward Elimination", "Begins with all candidate variables; iteratively removes the least statistically significant predictor until all remaining p-values meet alpha threshold.")
    pdf.bullet_item("Bidirectional (Stepwise)", "Alternates forward entry and backward pruning to ensure no redundant predictors are retained.")

    pdf.section_header("Model Evaluation Criteria:")
    pdf.bullet_item("R-squared (R^2)", "Proportion of target variance explained by the model.")
    pdf.bullet_item("Adjusted R^2", "Penalizes the addition of non-informative variables that artificially inflate raw R^2.")
    pdf.bullet_item("Akaike Information Criterion (AIC)", "Balances model likelihood against parameter count (AIC = 2k - 2ln(L)). Lower AIC indicates superior efficiency.")
    pdf.bullet_item("Bayesian Information Criterion (BIC)", "Imposes a steeper penalty on parameter count based on sample size ln(n).")
    pdf.bullet_item("Cross-Validation Error", "K-fold cross-validation estimates out-of-sample generalization error directly.")

    # Page 5
    pdf.add_page()
    pdf.chapter_title("3. User Retention Modeling & Decision Trees")
    pdf.body_paragraph(
        "In product data science, predictive retention models forecast which user actions lead to long-term loyalty versus churn."
    )
    pdf.section_header("Interpretability vs. Predictive Power")
    pdf.body_paragraph(
        "High-capacity neural networks can predict churn with high AUC, but fail to explain why. "
        "Decision trees offer transparent rule paths (e.g., 'If session_length < 2 min and ad_views >= 3 -> Churn probability = 87%'). "
        "A/B testing is crucial to distinguish genuine causality from correlation."
    )
    pdf.chapter_title("4. Entropy & Information Theory")
    pdf.body_paragraph(
        "Entropy measures the level of disorder, impurity, or uncertainty in a probability distribution."
    )
    pdf.section_header("Formula for a Binary Variable X in {0, 1}:")
    pdf.body_paragraph(
        "H(X) = - p(X=1) * log2 p(X=1) - p(X=0) * log2 p(X=0)\n\n"
        "Key Properties:\n"
        "- Zero Entropy (H = 0): Completely pure node (e.g. 100% yes, 0% no). Zero uncertainty.\n"
        "- Maximum Entropy (H = 1.0 bit): Completely impure node (50% yes, 50% no). Peak uncertainty."
    )

    # Page 6
    pdf.add_page()
    pdf.chapter_title("5. Decision Tree Algorithm")
    pdf.body_paragraph(
        "Decision trees recursively partition feature space into homogeneous rectangular regions through a sequence of binary conditions."
    )
    pdf.section_header("Core Components:")
    pdf.bullet_item("Root Node", "The top-most node containing the entire dataset, split on the feature yielding maximum Information Gain.")
    pdf.bullet_item("Internal Nodes", "Decision decision points checking feature thresholds (e.g. income > 50,000).")
    pdf.bullet_item("Branches", "Outcomes of decision checks leading to child nodes.")
    pdf.bullet_item("Leaf Nodes", "Terminal nodes providing final class predictions or regression value averages.")

    pdf.section_header("Handling Continuous Variables:")
    pdf.bullet_item("Threshold Sorting", "Sort unique continuous values in ascending order and test midpoints as candidate split boundaries.")
    pdf.bullet_item("Information Gain Maximization", "Select the split point c that maximizes: Information Gain = H(Parent) - [ (N_left/N)*H(Left) + (N_right/N)*H(Right) ].")
    pdf.bullet_item("Tree Pruning", "Pre-pruning limits max_depth and min_samples_split; post-pruning applies cost-complexity pruning (alpha) to prevent overfitting.")

    # Page 7
    pdf.add_page()
    pdf.chapter_title("6. Random Forests & Ensemble Bagging")
    pdf.body_paragraph(
        "Random Forest is an ensemble learning method that constructs a multitude of uncorrelated decision trees at training time "
        "and aggregates their individual predictions via majority voting (classification) or averaging (regression)."
    )
    pdf.section_header("Key Architectural Mechanisms:")
    pdf.bullet_item("Bootstrap Aggregating (Bagging)", "Each tree trains on a random bootstrap sample drawn with replacement (~63.2% unique records, ~36.8% out-of-bag).")
    pdf.bullet_item("Random Feature Subspacing", "At each split node, only a random subset of features F (typically sqrt(p) for classification, p/3 for regression) is considered. This decorrelates individual trees.")
    pdf.bullet_item("Full Depth Growth", "Individual trees are allowed to grow deep without pruning; their high variance is neutralized when hundreds of trees are averaged.")

    # Page 8
    pdf.add_page()
    pdf.section_header("Implementation Example in R (Diamonds Dataset)")
    pdf.code_block([
        "# Load libraries and diamond price data",
        "require(ggplot2)",
        "require(glmnet)",
        "require(rpart)",
        "require(randomForest)",
        "",
        "data(diamonds)",
        "diamonds$Expensive <- ifelse(diamonds$price >= 12000, 1, 0)",
        "diamonds$price <- NULL",
        "",
        "# Train Decision Tree via rpart",
        "modTree <- rpart(Expensive ~ ., data = diamonds)",
        "",
        "# Train Random Forest Classifier",
        "modForest <- randomForest(as.factor(Expensive) ~ ., data = diamonds,",
        "                          ntree = 200, mtry = 3, importance = TRUE)",
        "print(importance(modForest))"
    ])
    pdf.section_header("Pros and Cons of Random Forests:")
    pdf.bullet_item("Pros", "Exceptional predictive accuracy, highly resistant to overfitting, built-in feature importance estimation, handles missing data.")
    pdf.bullet_item("Cons", "Black-box nature compared to single tree, high computational and memory cost for massive datasets.")

    # Page 9
    pdf.add_page()
    pdf.chapter_title("7. Singular Value Decomposition (SVD)")
    pdf.body_paragraph(
        "Singular Value Decomposition (SVD) is a fundamental theorem in linear algebra stating that any real m x n matrix X of rank k "
        "can be factorized into the product of three constituent matrices:\n\n"
        "X = U * S * V^T\n\n"
        "Where:\n"
        "- U is an m x k orthogonal matrix whose columns are the left singular vectors (eigenvectors of X * X^T).\n"
        "- S is a k x k diagonal matrix with non-negative real singular values sorted in descending order: sigma_1 >= sigma_2 >= ... >= sigma_k > 0.\n"
        "- V is an n x k orthogonal matrix whose columns are the right singular vectors (eigenvectors of X^T * X)."
    )
    pdf.section_header("Applications in Data Science:")
    pdf.bullet_item("Low-Rank Approximation", "Truncating S to the top d singular values (d < k) creates the optimal rank-d approximation of X under the Frobenius norm (Eckart-Young Theorem).")
    pdf.bullet_item("Recommender Systems", "Decomposes user-item rating matrices into latent user preferences (U) and latent item characteristics (V).")

    # Page 10
    pdf.add_page()
    pdf.chapter_title("8. Principal Component Analysis (PCA)")
    pdf.body_paragraph(
        "Principal Component Analysis is the premier unsupervised linear dimensionality reduction technique. "
        "It projects high-dimensional data onto orthogonal axes (principal components) that capture the maximum possible variance "
        "while eliminating covariance."
    )
    pdf.section_header("Step-by-Step Mathematical Algorithm:")
    pdf.bullet_item("Step 1: Mean Centering", "Standardize each feature column to have mean zero and unit variance (Z-score normalization).")
    pdf.bullet_item("Step 2: Covariance Matrix", "Compute covariance matrix Sigma = (1/n) * X^T * X.")
    pdf.bullet_item("Step 3: Eigen-Decomposition", "Calculate eigenvalues lambda_i and eigenvectors v_i such that Sigma * v_i = lambda_i * v_i.")
    pdf.bullet_item("Step 4: Sorting & Selection", "Order eigenvectors by eigenvalues descending; choose the top d eigenvectors explaining >= 90-95% of cumulative variance.")
    pdf.bullet_item("Step 5: Projection", "Transform original data: Z = X * V_d.")

    pdf.section_header("Core Advantages & Benefits of PCA:")
    pdf.bullet_item("Curse of Dimensionality", "Compresses dozens/hundreds of features into a compact uncorrelated feature set.")
    pdf.bullet_item("Visual Exploration", "Projects multi-dimensional clusters into 2D/3D scatter plots.")
    pdf.bullet_item("Noise Attenuation", "Discards components with near-zero eigenvalues which typically represent measurement noise.")

    os.makedirs("public/pdfs", exist_ok=True)
    pdf.output("public/pdfs/Module-2-Data-Extraction.pdf")
    print("Module 2 PDF generated successfully.")

def generate_module_3_pdf():
    pdf = CoursePDF("SPECIALIZATION ELECTIVE - DATA SCIENCE (22DS102006)", "MODULE 3 ADVANCED MACHINE LEARNING")
    pdf.add_page()
    pdf.set_font("Helvetica", "B", 18)
    pdf.cell(0, 10, "Module 3: ADVANCED MACHINE LEARNING", ln=1)
    pdf.set_font("Helvetica", "I", 11)
    pdf.set_text_color(100, 116, 139)
    pdf.cell(0, 6, "Course Code: 22DS102006 - Supervised, Unsupervised & Deep Neural Networks", ln=1)
    pdf.ln(4)

    pdf.chapter_title("1. Supervised Learning & Kernel Methods")
    pdf.body_paragraph("Covers support vector machines (SVM), maximum margin hyperplanes, and the kernel trick (RBF, Polynomial) for non-linear boundaries. Rigorous evaluation using ROC-AUC, Precision-Recall curves, and confusion matrix analytics.")
    
    pdf.chapter_title("2. Unsupervised Clustering & Density Estimation")
    pdf.body_paragraph("Partitioning methods including K-Means, K-Medoids, and silhouette coefficient optimization. Density-based clustering (DBSCAN) for discovering non-spherical clusters and isolating noise/outliers.")

    pdf.chapter_title("3. Deep Neural Architectures")
    pdf.body_paragraph("From single-layer perceptrons to deep feed-forward networks (MLP). Activation functions (ReLU, GELU, Softmax), backpropagation calculus via computational graphs, and loss function landscapes (Cross-Entropy, MSE).")

    pdf.chapter_title("4. Convolutional & Sequential Architectures")
    pdf.body_paragraph("2D Convolutional neural networks (CNN) with pooling layers for spatial computer vision. Recurrent Neural Networks (RNN) and Long Short-Term Memory (LSTM) cells for temporal sequential modeling.")

    os.makedirs("public/pdfs", exist_ok=True)
    pdf.output("public/pdfs/Module-3-Advanced-Machine-Learning.pdf")
    print("Module 3 PDF generated successfully.")

def generate_module_4_pdf():
    pdf = CoursePDF("SPECIALIZATION ELECTIVE - DATA SCIENCE (22DS102006)", "MODULE 4 BIG DATA ANALYTICS")
    pdf.add_page()
    pdf.set_font("Helvetica", "B", 18)
    pdf.cell(0, 10, "Module 4: BIG DATA ANALYTICS & DISTRIBUTED COMPUTING", ln=1)
    pdf.set_font("Helvetica", "I", 11)
    pdf.set_text_color(100, 116, 139)
    pdf.cell(0, 6, "Course Code: 22DS102006 - Apache Spark, PySpark, Hadoop & Streaming Systems", ln=1)
    pdf.ln(4)

    pdf.chapter_title("1. Distributed Computing Fundamentals")
    pdf.body_paragraph("The Hadoop Distributed File System (HDFS) and MapReduce paradigm. Master-worker topologies, replication strategies, and fault tolerance across distributed compute commodity clusters.")

    pdf.chapter_title("2. In-Memory Distributed Analytics with Apache Spark")
    pdf.body_paragraph("Resilient Distributed Datasets (RDDs), DAG execution planners, lazy evaluation, transformations vs actions, and Spark SQL DataFrames. Hands-on PySpark scripting for processing terabyte datasets.")

    pdf.chapter_title("3. Real-Time Event Streaming")
    pdf.body_paragraph("Apache Kafka architecture: topics, partitions, broker clusters, producer/consumer offsets. Spark Structured Streaming for low-latency windowed aggregations on streaming sensor logs.")

    os.makedirs("public/pdfs", exist_ok=True)
    pdf.output("public/pdfs/Module-4-Big-Data-Analytics.pdf")
    print("Module 4 PDF generated successfully.")

def generate_module_5_pdf():
    pdf = CoursePDF("SPECIALIZATION ELECTIVE - DATA SCIENCE (22DS102006)", "MODULE 5 NLP & GENERATIVE AI")
    pdf.add_page()
    pdf.set_font("Helvetica", "B", 18)
    pdf.cell(0, 10, "Module 5: NATURAL LANGUAGE PROCESSING & GEN AI", ln=1)
    pdf.set_font("Helvetica", "I", 11)
    pdf.set_text_color(100, 116, 139)
    pdf.cell(0, 6, "Course Code: 22DS102006 - Text Analytics, Attention Transformers & LLMs", ln=1)
    pdf.ln(4)

    pdf.chapter_title("1. Text Processing & Word Embeddings")
    pdf.body_paragraph("Tokenization, byte-pair encoding (BPE), TF-IDF vectorization, Word2Vec skip-gram, GloVe distributed semantic spaces, and cosine similarity retrieval.")

    pdf.chapter_title("2. The Transformer Architecture")
    pdf.body_paragraph("Scaled dot-product attention, multi-head self-attention mechanisms, positional encodings, layer normalization, and feedforward networks. BERT encoder representations and GPT autoregressive decoders.")

    pdf.chapter_title("3. Modern Generative AI & Vector Search")
    pdf.body_paragraph("Foundation models, prompt engineering, few-shot prompting, Retrieval-Augmented Generation (RAG) using dense vector databases (Chroma, Pinecone, FAISS), and fine-tuning with LoRA.")

    os.makedirs("public/pdfs", exist_ok=True)
    pdf.output("public/pdfs/Module-5-Natural-Language-Processing.pdf")
    print("Module 5 PDF generated successfully.")

def generate_module_6_pdf():
    pdf = CoursePDF("SPECIALIZATION ELECTIVE - DATA SCIENCE (22DS102006)", "MODULE 6 MLOPS & PRODUCTION DATA SCIENCE")
    pdf.add_page()
    pdf.set_font("Helvetica", "B", 18)
    pdf.cell(0, 10, "Module 6: MLOPS & PRODUCTION DATA SCIENCE", ln=1)
    pdf.set_font("Helvetica", "I", 11)
    pdf.set_text_color(100, 116, 139)
    pdf.cell(0, 6, "Course Code: 22DS102006 - Model Deployment, Pipelines, Monitoring & AI Ethics", ln=1)
    pdf.ln(4)

    pdf.chapter_title("1. Model Packaging & Microservices")
    pdf.body_paragraph("Serializing trained estimators (Joblib, ONNX, TorchScript). Building production RESTful inference endpoints with FastAPI, request validation with Pydantic, and async batching.")

    pdf.chapter_title("2. Containerization & CI/CD Pipelines")
    pdf.body_paragraph("Docker containerization for reproducible ML environments. Automated testing, linting, model regression benchmarks, and continuous deployment via GitHub Actions and cloud registries.")

    pdf.chapter_title("3. Monitoring, Drift Detection & AI Governance")
    pdf.body_paragraph("Tracking concept drift, covariate shift, and latency degradation in live traffic using tools like Evidently AI and Prometheus. Algorithmic fairness audits, explainability with SHAP, and compliance frameworks.")

    os.makedirs("public/pdfs", exist_ok=True)
    pdf.output("public/pdfs/Module-6-MLOps-Production-Data-Science.pdf")
    print("Module 6 PDF generated successfully.")

if __name__ == "__main__":
    generate_module_1_pdf()
    generate_module_2_pdf()
    generate_module_3_pdf()
    generate_module_4_pdf()
    generate_module_5_pdf()
    generate_module_6_pdf()
    print("All module PDFs generated successfully!")
