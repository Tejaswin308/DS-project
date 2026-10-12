import React, { useState } from 'react';
import { ExternalLink, Search, X } from 'lucide-react';

interface Tool {
  name: string;
  description: string;
  category: string;
  url: string;
  icon: string;
  badge?: string;
}

const tools: Tool[] = [
  // Languages & Environments
  {
    name: 'Python 3',
    description: 'Primary programming language for data science, ML, and statistical computing.',
    category: 'Language',
    url: 'https://www.python.org/',
    icon: '🐍',
    badge: 'Core',
  },
  {
    name: 'Jupyter Notebook',
    description: 'Interactive web-based environment for writing code, equations, visualizations and narrative text.',
    category: 'Environment',
    url: 'https://jupyter.org/',
    icon: '📓',
    badge: 'Core',
  },
  {
    name: 'Google Colab',
    description: 'Free cloud-hosted Jupyter notebooks with GPU support — no local setup required.',
    category: 'Environment',
    url: 'https://colab.research.google.com/',
    icon: '☁️',
  },
  // Data Manipulation
  {
    name: 'NumPy',
    description: 'Fundamental library for numerical computing — multi-dimensional arrays and mathematical functions.',
    category: 'Data',
    url: 'https://numpy.org/',
    icon: '🔢',
    badge: 'Core',
  },
  {
    name: 'Pandas',
    description: 'Powerful data manipulation and analysis library — DataFrames, Series, and CSV/Excel I/O.',
    category: 'Data',
    url: 'https://pandas.pydata.org/',
    icon: '🐼',
    badge: 'Core',
  },
  // Visualization
  {
    name: 'Matplotlib',
    description: 'Comprehensive library for creating static, animated, and interactive visualizations.',
    category: 'Visualization',
    url: 'https://matplotlib.org/',
    icon: '📊',
  },
  {
    name: 'Seaborn',
    description: 'Statistical data visualization based on Matplotlib — beautiful default styles and color palettes.',
    category: 'Visualization',
    url: 'https://seaborn.pydata.org/',
    icon: '🎨',
  },
  {
    name: 'Plotly',
    description: 'Interactive graphing library for Python — web-ready charts, dashboards and 3D plots.',
    category: 'Visualization',
    url: 'https://plotly.com/python/',
    icon: '📈',
  },
  // Machine Learning
  {
    name: 'Scikit-learn',
    description: 'Simple and efficient ML tools for classification, regression, clustering and preprocessing.',
    category: 'ML',
    url: 'https://scikit-learn.org/',
    icon: '🤖',
    badge: 'Core',
  },
  {
    name: 'XGBoost',
    description: 'Optimized distributed gradient boosting — high performance for structured/tabular data.',
    category: 'ML',
    url: 'https://xgboost.readthedocs.io/',
    icon: '⚡',
  },
  {
    name: 'TensorFlow',
    description: 'End-to-end open-source ML platform for deep learning and neural network models.',
    category: 'Deep Learning',
    url: 'https://www.tensorflow.org/',
    icon: '🧠',
  },
  {
    name: 'PyTorch',
    description: 'Dynamic computation graphs and intuitive API — preferred for research and custom deep learning.',
    category: 'Deep Learning',
    url: 'https://pytorch.org/',
    icon: '🔥',
  },
  // Statistics
  {
    name: 'SciPy',
    description: 'Scientific computing library — statistics, optimization, integration, and signal processing.',
    category: 'Statistics',
    url: 'https://scipy.org/',
    icon: '📐',
  },
  {
    name: 'Statsmodels',
    description: 'Statistical modeling, hypothesis tests, and time-series analysis for Python.',
    category: 'Statistics',
    url: 'https://www.statsmodels.org/',
    icon: '📉',
  },
  // Utilities
  {
    name: 'OpenCV',
    description: 'Computer vision library for image processing, video capture and object detection.',
    category: 'Utility',
    url: 'https://opencv.org/',
    icon: '👁️',
  },
  {
    name: 'NLTK',
    description: 'Natural Language Toolkit — text processing, tokenization, parsing and semantic reasoning.',
    category: 'NLP',
    url: 'https://www.nltk.org/',
    icon: '🗣️',
  },
  {
    name: 'spaCy',
    description: 'Industrial-strength NLP library — named entity recognition, POS tagging, dependency parsing.',
    category: 'NLP',
    url: 'https://spacy.io/',
    icon: '💬',
  },
  {
    name: 'Kaggle',
    description: 'Platform for data science competitions, open datasets, notebooks, and learning courses.',
    category: 'Platform',
    url: 'https://www.kaggle.com/',
    icon: '🏆',
  },
  {
    name: 'UCI ML Repository',
    description: 'Collection of publicly available datasets for machine learning research and education.',
    category: 'Platform',
    url: 'https://archive.ics.uci.edu/',
    icon: '🗄️',
  },
  {
    name: 'VS Code',
    description: 'Lightweight, extensible source code editor with excellent Python and Jupyter integration.',
    category: 'Environment',
    url: 'https://code.visualstudio.com/',
    icon: '🖥️',
  },
];

const categories = ['All', ...Array.from(new Set(tools.map(t => t.category)))];

const categoryColors: Record<string, string> = {
  Language:     '#0EA5A8',
  Environment:  '#6366F1',
  Data:         '#D97706',
  Visualization:'#EC4899',
  ML:           '#16A34A',
  'Deep Learning': '#DC2626',
  Statistics:   '#7C3AED',
  NLP:          '#2563EB',
  Utility:      '#0891B2',
  Platform:     '#059669',
};

export default function ToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = tools.filter(t => {
    const matchCat = selectedCategory === 'All' || t.category === selectedCategory;
    const q = search.toLowerCase();
    const matchSearch = !q || t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <main className="page-enter">
      {/* Hero */}
      <section
        className="py-12 md:py-16 relative overflow-hidden"
        style={{ background: 'var(--c-bg)' }}
        aria-labelledby="tools-heading"
      >
        <div
          className="absolute -top-20 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
            filter: 'blur(48px)',
          }}
          aria-hidden="true"
        />
        <div className="container-max relative">
          <div className="section-label mb-3">Laboratory Resources</div>
          <h1
            id="tools-heading"
            className="font-black mb-4"
            style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--c-text)' }}
          >
            Data Science <span className="gradient-text">Tools &amp; Libraries</span>
          </h1>
          <p
            className="text-base md:text-lg leading-relaxed max-w-2xl mb-8"
            style={{ color: 'var(--c-text-2)' }}
          >
            A curated collection of {tools.length} essential tools, libraries, and platforms used across
            the DS Lab curriculum at Mohan Babu University.
          </p>

          {/* Search */}
          <div className="relative max-w-md">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: 'var(--c-text-3)' }}
            />
            <input
              type="text"
              placeholder="Search tools..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl outline-none border transition-all"
              style={{
                background: 'var(--c-surface)',
                color: 'var(--c-text)',
                borderColor: 'var(--c-border)',
              }}
              onFocus={e => {
                e.target.style.borderColor = 'var(--c-accent)';
                e.target.style.boxShadow = '0 0 0 3px var(--c-accent-dim)';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'var(--c-border)';
                e.target.style.boxShadow = 'none';
              }}
              aria-label="Search tools"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--c-text-3)' }}
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="divider" />

      <section className="container-max py-8 page-bg">
        {/* Category filter chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => {
            const active = selectedCategory === cat;
            const color = cat === 'All' ? '#0EA5A8' : (categoryColors[cat] || '#0EA5A8');
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all"
                style={{
                  background: active ? color : 'var(--c-surface)',
                  color: active ? '#fff' : 'var(--c-text-2)',
                  borderColor: active ? color : 'var(--c-border)',
                  boxShadow: active ? `0 4px 14px ${color}40` : 'none',
                }}
                aria-pressed={active}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div
            className="flex flex-col items-center py-16 text-center rounded-2xl border"
            style={{
              background: 'var(--c-surface)',
              borderColor: 'var(--c-border)',
            }}
          >
            <div className="text-4xl mb-3">🔍</div>
            <p className="font-semibold mb-1" style={{ color: 'var(--c-text)' }}>No tools found</p>
            <p className="text-sm" style={{ color: 'var(--c-text-3)' }}>Try a different keyword or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(tool => (
              <ToolCard key={tool.name} tool={tool} />
            ))}
          </div>
        )}

        {/* Result count */}
        <p
          className="mt-6 text-xs text-center"
          style={{ color: 'var(--c-text-3)' }}
        >
          Showing {filtered.length} of {tools.length} tools
        </p>
      </section>
    </main>
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  const color = categoryColors[tool.category] || '#0EA5A8';

  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-2xl border overflow-hidden flex flex-col transition-all"
      style={{
        background: 'var(--c-surface)',
        borderColor: 'var(--c-border)',
        boxShadow: 'var(--shadow-sm)',
        textDecoration: 'none',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = `var(--shadow-lg), 0 0 24px ${color}20`;
        (e.currentTarget as HTMLElement).style.borderColor = color + '50';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-sm)';
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--c-border)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      }}
    >
      {/* Top color bar */}
      <div className="h-1 w-full" style={{ background: color }} />

      <div className="p-4 flex-1 flex flex-col">
        {/* Icon + badge */}
        <div className="flex items-start justify-between mb-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{ background: color + '15', border: `1px solid ${color}25` }}
          >
            {tool.icon}
          </div>
          {tool.badge && (
            <span
              className="px-2 py-0.5 text-xs font-bold rounded-full"
              style={{ background: color + '18', color }}
            >
              {tool.badge}
            </span>
          )}
        </div>

        {/* Name */}
        <h3
          className="font-bold text-sm mb-1 group-hover:transition-colors"
          style={{ color: 'var(--c-text)' }}
        >
          {tool.name}
        </h3>

        {/* Category chip */}
        <span
          className="inline-block text-xs font-semibold mb-2"
          style={{ color }}
        >
          {tool.category}
        </span>

        {/* Description */}
        <p
          className="text-xs leading-relaxed flex-1"
          style={{ color: 'var(--c-text-2)' }}
        >
          {tool.description}
        </p>

        {/* Link */}
        <div
          className="flex items-center gap-1 mt-4 text-xs font-semibold transition-colors"
          style={{ color: 'var(--c-text-3)' }}
        >
          <ExternalLink size={11} />
          Visit Official Docs
        </div>
      </div>
    </a>
  );
}
