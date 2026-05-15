// Source-of-truth content for both portfolio variants.
// Pulled from the resume (2026-05) — supersedes the old waseemahmed.in copy.

const CONTENT = {
  identity: {
    name: 'Waseem Ahmed',
    role: 'Software + AI/ML Engineer',
    tagline: 'Engineer at Samsung Research America. I build internal products end-to-end and tune LLM inference pipelines for cloud and accelerator runtimes.',
    location: 'Mountain View, CA',
    email: 'ahmed.waseem.usa@gmail.com',
    workEmail: 'waseem.ahmed@samsung.com',
    phone: '+1 (352) 871-4522',
    linkedin: 'https://www.linkedin.com/in/waseem09/',
    site: 'waseemahmed.in',
    resume: 'https://waseemahmed.in/Main%20Resume.pdf',
  },

  // Featured. This is the "now" panel.
  now: {
    company: 'Samsung Research America',
    division: 'Android Platform / Galaxy AI',
    title: 'Partner Engineer',
    location: 'Mountain View, CA',
    since: 'Aug 2025',
    status: 'active',
    summary:
      'Building internal products end-to-end and tuning LLM inference for production. Full-stack ownership across cross-functional teams — including joint platform work with Google.',
    stack: ['llama.cpp', 'vLLM', 'HF Transformers', 'Android', 'GPU inference'],
    highlights: [
      'Architect and ship internal products end-to-end — full-stack ownership.',
      'Tune LLM serving (llama.cpp, vLLM, HF) with GPU acceleration focus.',
      'Co-develop Android features with Google partners on joint API initiatives.',
      'Author and file patents on AI + mobile platform innovations.',
    ],
  },

  experience: [
    {
      id: 'samsung-pe',
      org: 'Samsung Research America',
      title: 'Partner Engineer — Android Platform / Galaxy AI',
      where: 'Mountain View, CA',
      from: '08/2025',
      to: 'present',
      tags: ['LLM serving', 'Android', 'Full-stack', 'Patents'],
      bullets: [
        'Drive end-to-end SDLC across multiple teams: requirements → integration → QA.',
        'Optimize LLM inference with llama.cpp, vLLM, HF Transformers — GPU acceleration focus.',
        'Co-develop Android features with Google; align API specs on joint platform initiatives.',
        'Author and file patents contributing to Samsung\u2019s IP portfolio.',
      ],
    },
    {
      id: 'samsung-intern',
      org: 'Samsung Research America',
      title: 'Software Engineer Intern',
      where: 'Mountain View, CA',
      from: '05/2025',
      to: '08/2025',
      tags: ['Django', 'React', 'Firebase AI', 'POC'],
      bullets: [
        'Patent application (in progress) for an original concept developed during the internship.',
        'Built POC integrating 2+ AI features into a mobile Camera Application via Firebase AI.',
        'Extended Django + React internal tooling: user management, Selenium scrapers, team dashboards.',
      ],
    },
    {
      id: 'biovision',
      org: 'University of Florida — BioVision Lab',
      title: 'Graduate Assistant, LLM Engineer',
      where: 'Gainesville, FL',
      from: '08/2024',
      to: '08/2025',
      tags: ['VLM', 'LoRA', 'FAISS', 'A100'],
      bullets: [
        'Fine-tuned InternVL 2.5 on custom dataset with LoRA adapters on A100 GPUs.',
        'Fine-tuned Open-CLIP (ViT-H-14-378-quickgelu) with Wise-FT methods to minimize loss.',
        'Generated embeddings via Florence, BioClip, OpenClip, Unicom; integrated FAISS for similarity search across 100K+ image/caption pairs.',
        'Cut similarity-search latency from 50 min to <1 min via FAISS indexing.',
        'Tuned resolution / batch-size trade-offs for OpenCLIP training stability.',
      ],
    },
    {
      id: 'uf-data',
      org: 'UF Data Studio Lab',
      title: 'Graduate Assistant',
      where: 'Gainesville, FL',
      from: '08/2024',
      to: '05/2025',
      tags: ['ASR', 'Whisper', 'HiperGator', 'SLURM'],
      bullets: [
        'Analyzed Indian-accent audio across 26 states on HiperGator/SLURM to improve ASR feature extraction.',
        'Led collection of 1,000 diverse audio samples for accent-inclusive training data.',
        'Fine-tuned OpenAI Whisper Medium (769M) for Indian-accented transcription.',
      ],
    },
    {
      id: 'ta',
      org: 'University of Florida',
      title: 'Teaching Assistant',
      where: 'Gainesville, FL',
      from: '08/2023',
      to: '12/2023',
      tags: ['React', 'Agile', 'Curriculum'],
      bullets: [
        'Delivered 15+ interactive lectures on web development, Agile, and programming fundamentals.',
        'Co-developed 25+ modules with project teams across departments.',
      ],
    },
  ],

  projects: [
    {
      id: 'indian-asr',
      title: 'Indian-Accented English Transcription',
      kind: 'Research / ASR',
      stack: ['Whisper', 'PyTorch', 'MFA', 'SLURM', 'HiperGator'],
      blurb:
        'Feature-extraction pipeline that boosted ASR transcription accuracy by 15% on Indian-accented English.',
      detail: [
        'Cleaned and restructured 9.6 hours of audio from 117 speakers across 19 states — fixed missing speaker IDs, generated mel spectrograms in PyTorch.',
        'Integrated 1,000+ audio samples spanning 15+ accents; applied forced alignment (MFA) to refine transcripts.',
        'Engineered feature-extraction pipelines that lifted ASR accuracy by 15%, paving the path for Whisper fine-tuning.',
      ],
      metric: { value: '+15%', label: 'ASR accuracy lift' },
    },
    {
      id: 'clinical-nlp',
      title: 'AI-Driven Clinical Note Simplification',
      kind: 'NLP / Healthcare',
      stack: ['BERT', 'Hugging Face', 'PyTorch'],
      blurb:
        'Fine-tuned NLP models on 50K+ patient notes to cut annotation overhead while holding error rate under 5%.',
      detail: [
        'Compiled training corpus from open-source medical textbooks and 50,000+ patient notes.',
        'Fine-tuned NLP models that reduced manual annotation time by 30%.',
        'Targeted error rate <5% for downstream clinical documentation use.',
      ],
      metric: { value: '−30%', label: 'annotation time' },
    },
    {
      id: 'cuong-nhu',
      title: 'Cuong Nhu Cypress — Club Web',
      kind: 'Web / UX',
      stack: ['React', 'JavaScript', 'CSS'],
      blurb:
        'Responsive rebuild with a feedback loop that eliminated the top three drop-off causes.',
      detail: [
        'Engineered responsive interfaces in JS/CSS — engagement up 30%.',
        'Shipped a feedback system that eliminated the top 3 user drop-off causes; retention up 15%.',
      ],
      metric: { value: '+30%', label: 'engagement' },
    },
  ],

  skills: [
    {
      group: 'Languages',
      items: ['Python', 'C / C++', 'Java', 'JavaScript / TypeScript', 'SQL', 'R', 'Bash', 'HTML / CSS'],
    },
    {
      group: 'ML & AI',
      items: [
        'PyTorch',
        'TensorFlow',
        'Hugging Face Transformers',
        'llama.cpp',
        'vLLM',
        'FAISS',
        'Scikit-learn',
        'LoRA / Wise-FT',
      ],
    },
    {
      group: 'Models I\u2019ve shipped with',
      items: ['Whisper', 'BERT', 'GPT-3.5', 'InternVL 2.5', 'Open-CLIP', 'Florence 2', 'BioClip', 'Unicom'],
    },
    {
      group: 'Infra & Systems',
      items: ['Docker', 'Kubernetes', 'SLURM', 'HiperGator HPC', 'Google Cloud', 'PostgreSQL', 'ETL', 'CI/CD'],
    },
  ],

  patents: [
    {
      id: 'p1',
      status: 'drafting',
      area: 'Mobile camera + on-device AI feature pipeline',
      note: 'Original concept from Samsung internship — application in progress.',
    },
    {
      id: 'p2',
      status: 'authoring',
      area: 'AI + Android platform innovations',
      note: 'Multiple invention disclosures authored as Partner Engineer.',
    },
  ],

  achievement: {
    title: 'Product Innovation Challenge — NASA T2U',
    subtitle: 'First place, Fire-Arch Project',
    year: '2024',
    body: 'A three-part wildfire response solution recognized under NASA\u2019s T2U initiative for integrating NASA IP into real-world products.',
    bullets: [
      'Mobile application backed by a NASA-patented decision tree for wildfire evacuation protocols.',
      'Universal in-vehicle filter design using NASA patents for emergency air conditions.',
      'NASA FIRMS data integration for predictive wildfire monitoring.',
    ],
  },

  // Headline metrics for the top recruiter-grab strip.
  metrics: [
    { value: 8,   suffix: '+', label: 'models fine-tuned',  sub: 'Whisper · InternVL · CLIP · BERT' },
    { value: 2,   suffix: '',  label: 'patents in flight',  sub: 'authoring + drafting' },
    { value: 15,  suffix: '%', label: 'ASR accuracy lift',  sub: 'Indian-accent English' },
    { value: 50,  suffix: '×', label: 'faster retrieval',   sub: 'FAISS · 50min → <1min' },
  ],

  // Currently-active threads (shown in "Now" panel as a live log).
  currently: [
    { status: 'shipping',   text: 'Internal full-stack AI products end-to-end' },
    { status: 'optimizing', text: 'LLM inference via llama.cpp / vLLM on GPU' },
    { status: 'authoring',  text: 'Patent applications for AI + mobile platform' },
    { status: 'aligning',   text: 'Android platform APIs with Google partners' },
  ],

  // Cycling tagline words for the hero.
  cycle: [
    'LLM-powered products',
    'Galaxy AI features',
    'GPU-tuned inference',
    'platform tooling',
  ],

  // Real before/after wins from the resume — for the Impact panel.
  impact: [
    {
      id: 'faiss',
      title: 'Embedding similarity search',
      stack: 'FAISS · BioClip · OpenCLIP',
      before: { value: 50, unit: 'min', label: 'baseline' },
      after:  { value: 1,  unit: 'min', label: 'after FAISS index' },
      lift: '50× faster',
    },
    {
      id: 'asr',
      title: 'Indian-accent ASR accuracy',
      stack: 'Whisper · MFA · SLURM',
      before: { value: 75, unit: '%', label: 'baseline F1' },
      after:  { value: 90, unit: '%', label: 'after fine-tune' },
      lift: '+15% F1',
    },
    {
      id: 'notes',
      title: 'Clinical-note annotation time',
      stack: 'BERT · HF · PyTorch',
      before: { value: 100, unit: '%', label: 'manual baseline' },
      after:  { value: 70,  unit: '%', label: 'after NLP fine-tune' },
      lift: '−30% time',
    },
  ],

  education: {
    school: 'University of Florida',
    degree: 'M.S., Computer Science',
    from: 'Jan 2023',
    to: 'Dec 2024',
    where: 'Gainesville, FL',
    coursework: [
      'Natural Language Processing',
      'Data Engineering',
      'Advanced Data Structures',
      'Analysis of Algorithms',
      'Distributed Operating Systems',
      'Human-Computer Interaction',
      'UX Design',
      'Software Engineering',
      'Computer Networks',
      'Engineering Innovation',
    ],
  },
};

window.CONTENT = CONTENT;
