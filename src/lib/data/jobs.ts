export type EmploymentType = 'Full-time' | 'Contract';

export interface JobPosting {
  id: number;
  slug: string;
  title: string;
  industry: string;
  location: string;
  type: EmploymentType;
  description: string;
  experience: string;
  salary?: string;
  responsibilities: string[];
  requirements: string[];
}

export const jobPostings: JobPosting[] = [
  // ── IT & Technology ──────────────────────────────────────────────────────
  {
    id: 1,
    slug: 'full-stack-developer',
    title: 'Full Stack Developer',
    industry: 'IT & Technology',
    location: 'Bengaluru',
    type: 'Full-time',
    description: 'Build and maintain scalable web applications using modern JavaScript frameworks. Collaborate with cross-functional teams to ship robust, user-centric digital products.',
    experience: '3–5 yrs experience',
    salary: '₹12–18 LPA',
    responsibilities: [
      'Architect, develop, and maintain high-performance web applications using React/Next.js and Node.js.',
      'Collaborate with product managers and designers to translate requirements into technical specifications.',
      'Implement secure and efficient RESTful APIs or GraphQL endpoints.',
      'Optimize applications for maximum speed and scalability.',
      'Write clean, testable, and reusable code, and participate in code reviews.'
    ],
    requirements: [
      '3-5 years of professional experience as a Full Stack Developer.',
      'Strong proficiency in JavaScript/TypeScript, React, and Node.js.',
      'Experience with relational (PostgreSQL) and NoSQL (MongoDB) databases.',
      'Familiarity with cloud platforms (AWS/GCP) and CI/CD pipelines.',
      'Excellent problem-solving skills and ability to work independently.'
    ]
  },
  {
    id: 2,
    slug: 'data-analyst',
    title: 'Data Analyst',
    industry: 'IT & Technology',
    location: 'Pune',
    type: 'Full-time',
    description: 'Analyse large datasets and build executive dashboards using Python, SQL, and Power BI. Translate data into clear, actionable insights for business stakeholders.',
    experience: '2–4 yrs experience',
    salary: '₹8–12 LPA',
    responsibilities: [
      'Extract, clean, and analyze complex datasets from multiple sources.',
      'Develop interactive and visually appealing dashboards in Power BI or Tableau.',
      'Identify trends, patterns, and anomalies in data to support strategic decision-making.',
      'Automate regular reporting processes using Python and SQL.',
      'Work closely with marketing and sales teams to define KPIs and track performance.'
    ],
    requirements: [
      '2-4 years of experience in data analysis or business intelligence.',
      'Advanced SQL skills for complex querying and data manipulation.',
      'Proficiency in Python (Pandas, NumPy) and data visualization tools.',
      'Strong analytical mindset with attention to detail.',
      'Excellent communication skills to present findings to non-technical stakeholders.'
    ]
  },
  {
    id: 3,
    slug: 'devops-engineer',
    title: 'DevOps Engineer',
    industry: 'IT & Technology',
    location: 'Gurgaon',
    type: 'Full-time',
    description: 'Own CI/CD pipelines, infrastructure-as-code, and cloud operations on AWS or GCP. Partner with development teams to improve deployment velocity and system reliability.',
    experience: '4–6 yrs experience',
    salary: '₹15–22 LPA',
    responsibilities: [
      'Design, build, and maintain highly available and scalable cloud infrastructure.',
      'Implement and manage continuous integration and deployment (CI/CD) pipelines.',
      'Monitor system performance, troubleshoot issues, and ensure high uptime.',
      'Automate infrastructure provisioning using Terraform or CloudFormation.',
      'Enforce security best practices across all cloud environments.'
    ],
    requirements: [
      '4-6 years of experience in DevOps, Cloud Engineering, or related roles.',
      'Deep knowledge of AWS or GCP services and architecture.',
      'Strong scripting skills (Bash, Python) and experience with Docker/Kubernetes.',
      'Experience with CI/CD tools like Jenkins, GitLab CI, or GitHub Actions.',
      'Understanding of networking, DNS, and security protocols.'
    ]
  },
  {
    id: 4,
    slug: 'ui-ux-designer',
    title: 'UI/UX Designer',
    industry: 'IT & Technology',
    location: 'Mumbai',
    type: 'Contract',
    description: 'Design intuitive digital experiences from wireframe to final delivery. Conduct user research, prototype flows, and collaborate closely with product and engineering teams.',
    experience: '2–3 yrs experience',
    salary: '₹6–10 LPA equivalent',
    responsibilities: [
      'Create user-centered designs by understanding business requirements and user feedback.',
      'Develop wireframes, storyboards, user flows, and interactive prototypes.',
      'Design high-fidelity UI elements, keeping brand guidelines and design systems in mind.',
      'Conduct usability testing and iterate based on insights.',
      'Collaborate with developers to ensure accurate implementation of designs.'
    ],
    requirements: [
      '2-3 years of proven UI/UX design experience with a strong portfolio.',
      'Proficiency in design tools like Figma, Sketch, or Adobe XD.',
      'Solid understanding of user-centered design principles and methodologies.',
      'Experience in designing for both web and mobile platforms.',
      'Ability to communicate design concepts clearly and effectively.'
    ]
  },

  // ── Manufacturing ─────────────────────────────────────────────────────────
  {
    id: 5,
    slug: 'senior-production-engineer',
    title: 'Senior Production Engineer',
    industry: 'Manufacturing',
    location: 'Pune',
    type: 'Full-time',
    description: 'Lead production line optimisation and OEE improvement initiatives. Manage cross-functional teams to consistently meet quality, safety, and throughput targets.',
    experience: '5–7 yrs experience',
    salary: '₹10–15 LPA',
    responsibilities: [
      'Oversee daily production operations and ensure production targets are met.',
      'Implement Lean Manufacturing and Six Sigma principles to optimize processes.',
      'Monitor and improve Overall Equipment Effectiveness (OEE).',
      'Manage and train a team of production supervisors and operators.',
      'Ensure strict adherence to safety and quality protocols on the shop floor.'
    ],
    requirements: [
      '5-7 years of experience in manufacturing or production engineering.',
      'Bachelor’s degree in Mechanical or Industrial Engineering.',
      'Strong knowledge of Lean manufacturing, 5S, and continuous improvement.',
      'Proven leadership skills and ability to manage cross-functional teams.',
      'Excellent problem-solving and analytical abilities.'
    ]
  },
  {
    id: 6,
    slug: 'quality-assurance-manager',
    title: 'Quality Assurance Manager',
    industry: 'Manufacturing',
    location: 'Ahmedabad',
    type: 'Full-time',
    description: 'Drive quality systems, ISO compliance, and supplier audits. Lead a team of QA engineers and partner with production to maintain zero-defect standards across the plant.',
    experience: '6–8 yrs experience',
    salary: '₹12–16 LPA',
    responsibilities: [
      'Develop and implement comprehensive quality control plans and procedures.',
      'Lead internal and external quality audits, ensuring compliance with ISO 9001.',
      'Investigate root causes of defects and implement corrective and preventive actions (CAPA).',
      'Manage supplier quality and conduct regular vendor assessments.',
      'Train plant staff on quality standards and foster a culture of zero defects.'
    ],
    requirements: [
      '6-8 years of experience in Quality Assurance within a manufacturing setup.',
      'In-depth knowledge of ISO standards, QMS, and auditing procedures.',
      'Strong background in root cause analysis tools (Fishbone, 5 Why).',
      'Experience managing a team of quality engineers and inspectors.',
      'Excellent communication and documentation skills.'
    ]
  },
  {
    id: 7,
    slug: 'supply-chain-analyst',
    title: 'Supply Chain Analyst',
    industry: 'Manufacturing',
    location: 'Chennai',
    type: 'Full-time',
    description: 'Manage demand forecasting, vendor coordination, and inventory optimisation. Use ERP tools to streamline procurement, reduce lead times, and improve logistics efficiency.',
    experience: '3–5 yrs experience',
    salary: '₹7–10 LPA',
    responsibilities: [
      'Analyze supply chain data to identify bottlenecks and optimize inventory levels.',
      'Develop demand forecasts and collaborate with procurement for timely raw material availability.',
      'Monitor vendor performance and negotiate better terms to reduce costs.',
      'Work closely with logistics partners to ensure timely and cost-effective deliveries.',
      'Utilize ERP systems (SAP/Oracle) for tracking and reporting supply chain metrics.'
    ],
    requirements: [
      '3-5 years of experience in supply chain, logistics, or procurement analysis.',
      'Proficiency in data analysis and advanced Excel.',
      'Experience working with ERP systems (SAP preferred).',
      'Strong understanding of inventory management and forecasting techniques.',
      'Good negotiation and vendor management skills.'
    ]
  },

  // ── Pharma ────────────────────────────────────────────────────────────────
  {
    id: 8,
    slug: 'regulatory-affairs-associate',
    title: 'Regulatory Affairs Associate',
    industry: 'Pharma',
    location: 'Mumbai',
    type: 'Full-time',
    description: 'Prepare and submit regulatory dossiers for new drug applications and product renewals. Liaise with CDSCO and international regulatory bodies to secure timely approvals.',
    experience: '2–4 yrs experience',
    salary: '₹6–9 LPA',
    responsibilities: [
      'Compile, review, and submit regulatory dossiers (CTD/eCTD format) to global health authorities.',
      'Ensure all regulatory submissions are accurate, complete, and meet compliance standards.',
      'Liaise with regulatory agencies (e.g., CDSCO, USFDA, EMA) regarding product registrations.',
      'Review labeling and promotional materials for regulatory compliance.',
      'Stay updated on changing regulations and advise internal teams on impact.'
    ],
    requirements: [
      '2-4 years of experience in Regulatory Affairs within the pharmaceutical industry.',
      'Degree in Pharmacy (B.Pharm/M.Pharm) or Life Sciences.',
      'Solid understanding of national and international regulatory guidelines.',
      'Experience with eCTD preparation and submission processes.',
      'Strong organizational skills and attention to detail.'
    ]
  },
  {
    id: 9,
    slug: 'medical-sales-representative',
    title: 'Medical Sales Representative',
    industry: 'Pharma',
    location: 'Hyderabad',
    type: 'Full-time',
    description: 'Drive prescription sales across assigned territories by engaging with healthcare professionals. Meet monthly targets and build lasting relationships with key opinion leaders.',
    experience: '1–3 yrs experience',
    salary: '₹4–6 LPA',
    responsibilities: [
      'Promote pharmaceutical products to doctors, pharmacists, and healthcare professionals.',
      'Achieve and exceed monthly/quarterly sales targets for the assigned territory.',
      'Build and maintain strong relationships with Key Opinion Leaders (KOLs).',
      'Organize and conduct CMEs (Continuing Medical Education) and scientific presentations.',
      'Provide regular field feedback and market intelligence to management.'
    ],
    requirements: [
      '1-3 years of proven experience in pharmaceutical sales.',
      'Bachelor’s degree, preferably in Science or Pharmacy.',
      'Excellent communication, negotiation, and interpersonal skills.',
      'Strong understanding of pharmacology and medical terminology.',
      'Willingness to travel extensively within the assigned territory.'
    ]
  },
  {
    id: 10,
    slug: 'clinical-research-coordinator',
    title: 'Clinical Research Coordinator',
    industry: 'Pharma',
    location: 'Bengaluru',
    type: 'Full-time',
    description: 'Coordinate clinical trial activities and maintain study documentation in accordance with GCP guidelines. Work closely with investigators, sponsors, and ethics committees.',
    experience: '2–5 yrs experience',
    salary: '₹5–8 LPA',
    responsibilities: [
      'Coordinate daily activities for clinical trials in compliance with study protocols and GCP.',
      'Recruit, screen, and enroll eligible subjects for ongoing studies.',
      'Ensure accurate and timely data collection and CRF completion.',
      'Maintain essential trial documents and investigator site files (ISF).',
      'Assist with ethics committee submissions and facilitate monitoring visits.'
    ],
    requirements: [
      '2-5 years of experience coordinating clinical trials.',
      'Degree in Life Sciences, Nursing, or related field; Clinical Research certification preferred.',
      'In-depth knowledge of Good Clinical Practice (GCP) and regulatory guidelines.',
      'Experience with EDC (Electronic Data Capture) systems.',
      'Strong organizational skills and ability to manage multiple trials simultaneously.'
    ]
  }
];

export function getJobBySlug(slug: string): JobPosting | undefined {
  return jobPostings.find(job => job.slug === slug);
}
