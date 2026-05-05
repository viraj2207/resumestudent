export const TEMPLATES = [
  { id: 'classic',   name: 'Classic Professional', desc: 'Timeless single-column design, perfect for law, finance & traditional industries.' },
  { id: 'modern',    name: 'Modern Split',          desc: 'Contemporary two-column with navy sidebar — ideal for corporate roles.' },
  { id: 'creative',  name: 'Creative Edge',         desc: 'Vibrant gradient sidebar with skill indicators — made for designers & marketers.' },
  { id: 'minimal',   name: 'Minimal Clean',         desc: 'Ultra-clean layout with elegant typography — timeless and versatile.' },
  { id: 'executive', name: 'Executive Elite',       desc: 'Premium dark-header with gold accents — suited for C-level & senior roles.' },
  { id: 'techpro',   name: 'Tech Pro',              desc: 'Dark theme with monospace accents — built for engineers & developers.' },
  { id: 'bold',      name: 'Bold Impact',           desc: 'High-contrast design with thick accents — made to grab attention instantly.' },
  { id: 'academic',  name: 'Academic Scholar',      desc: 'Traditional academic style — ideal for research, teaching & graduate applications.' },
  { id: 'startup',   name: 'Startup Vibe',          desc: 'Card-based modern layout with colorful badges — great for tech startups.' },
  { id: 'corporate', name: 'Corporate Navy',        desc: 'Full dark-navy professional theme — commands authority in any boardroom.' },
  { id: 'gradient',  name: 'Gradient Flow',         desc: 'Bold purple-to-blue gradient header — fresh and memorable design.' },
  { id: 'compact',   name: 'Compact Pro',           desc: 'Space-efficient dense layout — fits more content without sacrificing clarity.' },
  { id: 'elegant',   name: 'Elegant Serif',         desc: 'Playfair Display headings with warm tones — luxury feel for premium roles.' },
  { id: 'dark',      name: 'Dark Matter',           desc: 'Single-column dark theme with neon accents — bold and modern statement.' },
  { id: 'twotone',   name: 'Two Tone',              desc: 'Split-panel header with dual-color design — distinctive and professional.' }
];

export const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

export const SAMPLE_RESUME = {
  personal: {
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexjohnson',
    github: 'github.com/alexjohnson',
    website: 'alexjohnson.dev',
    summary: 'Passionate software engineer with 3+ years of experience building scalable web applications. Strong background in React, Node.js, and cloud technologies. Committed to writing clean, maintainable code and delivering exceptional user experiences.'
  },
  experience: [
    {
      company: 'TechCorp Inc.',
      position: 'Software Engineer',
      startDate: 'Jun 2022',
      endDate: 'Present',
      current: true,
      description: 'Led development of customer-facing React applications serving 500K+ monthly users. Improved page load performance by 40% through code splitting and lazy loading. Collaborated with cross-functional teams to deliver 3 major product releases.'
    },
    {
      company: 'StartupXYZ',
      position: 'Junior Developer',
      startDate: 'Jan 2021',
      endDate: 'May 2022',
      current: false,
      description: 'Built RESTful APIs with Node.js and Express. Implemented real-time features using WebSockets. Contributed to agile development process with bi-weekly sprints.'
    }
  ],
  education: [
    {
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startYear: '2017',
      endYear: '2021',
      gpa: '3.8'
    }
  ],
  skills: [
    { name: 'React / Next.js', level: 'Expert' },
    { name: 'JavaScript / TypeScript', level: 'Expert' },
    { name: 'Node.js', level: 'Advanced' },
    { name: 'Python', level: 'Intermediate' },
    { name: 'AWS / Cloud', level: 'Intermediate' },
    { name: 'PostgreSQL', level: 'Advanced' }
  ],
  projects: [
    {
      name: 'CloudDash',
      technologies: 'React, Node.js, AWS, PostgreSQL',
      description: 'Open-source cloud cost monitoring dashboard with real-time alerts and budget tracking for AWS resources.',
      url: 'github.com/alexj/clouddash'
    }
  ],
  certifications: [
    { name: 'AWS Certified Developer – Associate', issuer: 'Amazon Web Services', year: '2023' }
  ]
};
