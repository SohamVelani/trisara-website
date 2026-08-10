/**
 * One-time seed script — migrates the 10 hardcoded jobs from src/lib/data/jobs.ts
 * into MongoDB with status: "Active".
 *
 * Run with: npx tsx scripts/seed-jobs.ts
 * Requires MONGODB_URI in your .env.local (loaded automatically by dotenv below).
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

// Load .env.local from project root
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  dotenv.config();
}

import mongoose from 'mongoose';

// ── Inline Job model (avoids Next.js import issues in scripts) ────────────────
const JobSchema = new mongoose.Schema(
  {
    title: String,
    department: String,
    location: String,
    jobType: String,
    experienceLevel: String,
    salaryRange: String,
    showSalary: { type: Boolean, default: true },
    shortSummary: String,
    status: { type: String, default: 'Active' },
    postedDate: { type: Date, default: Date.now },
    slug: { type: String, unique: true },
    fullDescription: String,
    responsibilities: [String],
    requiredSkills: [String],
    niceToHaveSkills: [String],
    aboutClient: String,
    numberOfOpenings: { type: Number, default: 1 },
    applicationDeadline: Date,
  },
  { timestamps: true }
);

// ── Seed data (mapped from src/lib/data/jobs.ts) ───────────────────────────────
const seedJobs = [
  {
    title: 'Full Stack Developer',
    department: 'IT & Technology',
    location: 'Bengaluru',
    jobType: 'Full-time',
    experienceLevel: '3–5 yrs experience',
    salaryRange: '₹12–18 LPA',
    showSalary: true,
    shortSummary:
      'Build and maintain scalable web applications using modern JavaScript frameworks. Collaborate with cross-functional teams to ship robust, user-centric digital products.',
    slug: 'full-stack-developer',
    fullDescription:
      'We are looking for a talented Full Stack Developer to join a growing product team. You will work on building and maintaining high-performance web applications across the full stack, from database design to front-end implementation.\n\nThis is a collaborative role that requires strong communication skills, as you will be working closely with product managers, designers, and other engineers to deliver features that delight users.',
    responsibilities: [
      'Architect, develop, and maintain high-performance web applications using React/Next.js and Node.js.',
      'Collaborate with product managers and designers to translate requirements into technical specifications.',
      'Implement secure and efficient RESTful APIs or GraphQL endpoints.',
      'Optimise applications for maximum speed and scalability.',
      'Write clean, testable, and reusable code, and participate in code reviews.',
    ],
    requiredSkills: [
      '3-5 years of professional experience as a Full Stack Developer.',
      'Strong proficiency in JavaScript/TypeScript, React, and Node.js.',
      'Experience with relational (PostgreSQL) and NoSQL (MongoDB) databases.',
      'Familiarity with cloud platforms (AWS/GCP) and CI/CD pipelines.',
      'Excellent problem-solving skills and ability to work independently.',
    ],
    niceToHaveSkills: ['Experience with Next.js App Router', 'Knowledge of Docker and Kubernetes'],
    numberOfOpenings: 2,
  },
  {
    title: 'Data Analyst',
    department: 'IT & Technology',
    location: 'Pune',
    jobType: 'Full-time',
    experienceLevel: '2–4 yrs experience',
    salaryRange: '₹8–12 LPA',
    showSalary: true,
    shortSummary:
      'Analyse large datasets and build executive dashboards using Python, SQL, and Power BI. Translate data into clear, actionable insights for business stakeholders.',
    slug: 'data-analyst',
    fullDescription:
      'We are seeking a detail-oriented Data Analyst to help our client transform raw data into strategic business insights. You will be the go-to person for understanding trends, tracking KPIs, and building the dashboards that leadership relies on.\n\nThis is an excellent opportunity to work with a mature data infrastructure and influence key business decisions directly.',
    responsibilities: [
      'Extract, clean, and analyse complex datasets from multiple sources.',
      'Develop interactive and visually appealing dashboards in Power BI or Tableau.',
      'Identify trends, patterns, and anomalies in data to support strategic decision-making.',
      'Automate regular reporting processes using Python and SQL.',
      'Work closely with marketing and sales teams to define KPIs and track performance.',
    ],
    requiredSkills: [
      '2-4 years of experience in data analysis or business intelligence.',
      'Advanced SQL skills for complex querying and data manipulation.',
      'Proficiency in Python (Pandas, NumPy) and data visualisation tools.',
      'Strong analytical mindset with attention to detail.',
      'Excellent communication skills to present findings to non-technical stakeholders.',
    ],
    niceToHaveSkills: ['Experience with dbt or Airflow', 'Exposure to cloud data warehouses like BigQuery or Snowflake'],
    numberOfOpenings: 1,
  },
  {
    title: 'DevOps Engineer',
    department: 'IT & Technology',
    location: 'Gurgaon',
    jobType: 'Full-time',
    experienceLevel: '4–6 yrs experience',
    salaryRange: '₹15–22 LPA',
    showSalary: true,
    shortSummary:
      'Own CI/CD pipelines, infrastructure-as-code, and cloud operations on AWS or GCP. Partner with development teams to improve deployment velocity and system reliability.',
    slug: 'devops-engineer',
    fullDescription:
      'We are looking for an experienced DevOps Engineer to own the cloud infrastructure and delivery pipelines for a fast-growing SaaS product. You will work closely with engineering teams to automate, monitor, and optimise the entire delivery lifecycle.\n\nThis role is critical to the company\'s ability to ship quickly and reliably at scale.',
    responsibilities: [
      'Design, build, and maintain highly available and scalable cloud infrastructure.',
      'Implement and manage continuous integration and deployment (CI/CD) pipelines.',
      'Monitor system performance, troubleshoot issues, and ensure high uptime.',
      'Automate infrastructure provisioning using Terraform or CloudFormation.',
      'Enforce security best practices across all cloud environments.',
    ],
    requiredSkills: [
      '4-6 years of experience in DevOps, Cloud Engineering, or related roles.',
      'Deep knowledge of AWS or GCP services and architecture.',
      'Strong scripting skills (Bash, Python) and experience with Docker/Kubernetes.',
      'Experience with CI/CD tools like Jenkins, GitLab CI, or GitHub Actions.',
      'Understanding of networking, DNS, and security protocols.',
    ],
    niceToHaveSkills: ['Certified Kubernetes Administrator (CKA)', 'Experience with GitOps workflows'],
    numberOfOpenings: 1,
  },
  {
    title: 'UI/UX Designer',
    department: 'IT & Technology',
    location: 'Mumbai',
    jobType: 'Contract',
    experienceLevel: '2–3 yrs experience',
    salaryRange: '₹6–10 LPA equivalent',
    showSalary: true,
    shortSummary:
      'Design intuitive digital experiences from wireframe to final delivery. Conduct user research, prototype flows, and collaborate closely with product and engineering teams.',
    slug: 'ui-ux-designer',
    fullDescription:
      'We are seeking a talented UI/UX Designer for an initial 6-month contract with a strong possibility of extension. You will own the end-to-end design process for a consumer-facing mobile application, from early research to pixel-perfect handoff.\n\nThe ideal candidate is comfortable both in low-fidelity wireframing and high-fidelity prototyping, and understands how to advocate for the user within a product-engineering team.',
    responsibilities: [
      'Create user-centred designs by understanding business requirements and user feedback.',
      'Develop wireframes, storyboards, user flows, and interactive prototypes.',
      'Design high-fidelity UI elements, keeping brand guidelines and design systems in mind.',
      'Conduct usability testing and iterate based on insights.',
      'Collaborate with developers to ensure accurate implementation of designs.',
    ],
    requiredSkills: [
      '2-3 years of proven UI/UX design experience with a strong portfolio.',
      'Proficiency in design tools like Figma, Sketch, or Adobe XD.',
      'Solid understanding of user-centred design principles and methodologies.',
      'Experience in designing for both web and mobile platforms.',
      'Ability to communicate design concepts clearly and effectively.',
    ],
    niceToHaveSkills: ['Motion design skills', 'Basic understanding of HTML/CSS'],
    numberOfOpenings: 1,
  },
  {
    title: 'Senior Production Engineer',
    department: 'Manufacturing',
    location: 'Pune',
    jobType: 'Full-time',
    experienceLevel: '5–7 yrs experience',
    salaryRange: '₹10–15 LPA',
    showSalary: true,
    shortSummary:
      'Lead production line optimisation and OEE improvement initiatives. Manage cross-functional teams to consistently meet quality, safety, and throughput targets.',
    slug: 'senior-production-engineer',
    fullDescription:
      'We are looking for a Senior Production Engineer to lead continuous improvement efforts on a high-volume manufacturing line for a market-leading consumer goods company. You will drive OEE improvements, manage a team of supervisors, and act as the primary interface between production and management.\n\nThis is a hands-on leadership role that requires both technical depth and people management experience.',
    responsibilities: [
      'Oversee daily production operations and ensure production targets are met.',
      'Implement Lean Manufacturing and Six Sigma principles to optimise processes.',
      'Monitor and improve Overall Equipment Effectiveness (OEE).',
      'Manage and train a team of production supervisors and operators.',
      'Ensure strict adherence to safety and quality protocols on the shop floor.',
    ],
    requiredSkills: [
      '5-7 years of experience in manufacturing or production engineering.',
      "Bachelor's degree in Mechanical or Industrial Engineering.",
      'Strong knowledge of Lean manufacturing, 5S, and continuous improvement.',
      'Proven leadership skills and ability to manage cross-functional teams.',
      'Excellent problem-solving and analytical abilities.',
    ],
    niceToHaveSkills: ['Six Sigma Green or Black Belt certification', 'Experience with SAP PP module'],
    numberOfOpenings: 1,
  },
  {
    title: 'Quality Assurance Manager',
    department: 'Manufacturing',
    location: 'Ahmedabad',
    jobType: 'Full-time',
    experienceLevel: '6–8 yrs experience',
    salaryRange: '₹12–16 LPA',
    showSalary: true,
    shortSummary:
      'Drive quality systems, ISO compliance, and supplier audits. Lead a team of QA engineers and partner with production to maintain zero-defect standards across the plant.',
    slug: 'quality-assurance-manager',
    fullDescription:
      'We are seeking an experienced Quality Assurance Manager to establish and own the quality management function at a mid-sized precision components manufacturer. You will report directly to the plant head and be responsible for building a culture of zero defects across all production lines.\n\nThis role offers significant autonomy and the opportunity to build a QA function from the ground up.',
    responsibilities: [
      'Develop and implement comprehensive quality control plans and procedures.',
      'Lead internal and external quality audits, ensuring compliance with ISO 9001.',
      'Investigate root causes of defects and implement corrective and preventive actions (CAPA).',
      'Manage supplier quality and conduct regular vendor assessments.',
      'Train plant staff on quality standards and foster a culture of zero defects.',
    ],
    requiredSkills: [
      '6-8 years of experience in Quality Assurance within a manufacturing setup.',
      'In-depth knowledge of ISO standards, QMS, and auditing procedures.',
      'Strong background in root cause analysis tools (Fishbone, 5 Why).',
      'Experience managing a team of quality engineers and inspectors.',
      'Excellent communication and documentation skills.',
    ],
    niceToHaveSkills: ['IATF 16949 experience', 'Familiarity with PPAP and FMEA'],
    numberOfOpenings: 1,
  },
  {
    title: 'Supply Chain Analyst',
    department: 'Manufacturing',
    location: 'Chennai',
    jobType: 'Full-time',
    experienceLevel: '3–5 yrs experience',
    salaryRange: '₹7–10 LPA',
    showSalary: true,
    shortSummary:
      'Manage demand forecasting, vendor coordination, and inventory optimisation. Use ERP tools to streamline procurement, reduce lead times, and improve logistics efficiency.',
    slug: 'supply-chain-analyst',
    fullDescription:
      'We are looking for a Supply Chain Analyst to support the procurement and logistics operations of a large manufacturing group. You will use data and ERP systems to identify inefficiencies, optimise inventory levels, and improve vendor performance.\n\nThis is a high-visibility role with direct access to senior procurement leadership.',
    responsibilities: [
      'Analyse supply chain data to identify bottlenecks and optimise inventory levels.',
      'Develop demand forecasts and collaborate with procurement for timely raw material availability.',
      'Monitor vendor performance and negotiate better terms to reduce costs.',
      'Work closely with logistics partners to ensure timely and cost-effective deliveries.',
      'Utilise ERP systems (SAP/Oracle) for tracking and reporting supply chain metrics.',
    ],
    requiredSkills: [
      '3-5 years of experience in supply chain, logistics, or procurement analysis.',
      'Proficiency in data analysis and advanced Excel.',
      'Experience working with ERP systems (SAP preferred).',
      'Strong understanding of inventory management and forecasting techniques.',
      'Good negotiation and vendor management skills.',
    ],
    niceToHaveSkills: ['APICS CPIM certification', 'Experience with Power BI for supply chain dashboards'],
    numberOfOpenings: 2,
  },
  {
    title: 'Regulatory Affairs Associate',
    department: 'Pharma',
    location: 'Mumbai',
    jobType: 'Full-time',
    experienceLevel: '2–4 yrs experience',
    salaryRange: '₹6–9 LPA',
    showSalary: true,
    shortSummary:
      'Prepare and submit regulatory dossiers for new drug applications and product renewals. Liaise with CDSCO and international regulatory bodies to secure timely approvals.',
    slug: 'regulatory-affairs-associate',
    fullDescription:
      'We are seeking a Regulatory Affairs Associate to support the submission and lifecycle management of pharmaceutical products for a mid-sized speciality pharma company. You will work closely with R&D, manufacturing, and legal teams to prepare and submit accurate regulatory dossiers.\n\nThis role is ideal for a detail-oriented professional who is passionate about ensuring that safe, effective medicines reach patients.',
    responsibilities: [
      'Compile, review, and submit regulatory dossiers (CTD/eCTD format) to global health authorities.',
      'Ensure all regulatory submissions are accurate, complete, and meet compliance standards.',
      'Liaise with regulatory agencies (e.g., CDSCO, USFDA, EMA) regarding product registrations.',
      'Review labelling and promotional materials for regulatory compliance.',
      'Stay updated on changing regulations and advise internal teams on impact.',
    ],
    requiredSkills: [
      '2-4 years of experience in Regulatory Affairs within the pharmaceutical industry.',
      'Degree in Pharmacy (B.Pharm/M.Pharm) or Life Sciences.',
      'Solid understanding of national and international regulatory guidelines.',
      'Experience with eCTD preparation and submission processes.',
      'Strong organisational skills and attention to detail.',
    ],
    niceToHaveSkills: ['RAC (Regulatory Affairs Certification)', 'Experience with Veeva Vault'],
    numberOfOpenings: 1,
  },
  {
    title: 'Medical Sales Representative',
    department: 'Pharma',
    location: 'Hyderabad',
    jobType: 'Full-time',
    experienceLevel: '1–3 yrs experience',
    salaryRange: '₹4–6 LPA',
    showSalary: true,
    shortSummary:
      'Drive prescription sales across assigned territories by engaging with healthcare professionals. Meet monthly targets and build lasting relationships with key opinion leaders.',
    slug: 'medical-sales-representative',
    fullDescription:
      'We are looking for a motivated Medical Sales Representative to promote a portfolio of ethical pharmaceutical products across the Hyderabad territory. You will build strong relationships with doctors, pharmacists, and healthcare institutions to grow prescription volume and market share.\n\nThis is an excellent entry point into pharmaceutical sales with strong mentorship, product training, and a clear path for promotion.',
    responsibilities: [
      'Promote pharmaceutical products to doctors, pharmacists, and healthcare professionals.',
      'Achieve and exceed monthly/quarterly sales targets for the assigned territory.',
      'Build and maintain strong relationships with Key Opinion Leaders (KOLs).',
      'Organise and conduct CMEs (Continuing Medical Education) and scientific presentations.',
      'Provide regular field feedback and market intelligence to management.',
    ],
    requiredSkills: [
      '1-3 years of proven experience in pharmaceutical sales.',
      "Bachelor's degree, preferably in Science or Pharmacy.",
      'Excellent communication, negotiation, and interpersonal skills.',
      'Strong understanding of pharmacology and medical terminology.',
      'Willingness to travel extensively within the assigned territory.',
    ],
    niceToHaveSkills: ['Existing relationships with KOLs in the Hyderabad market', 'Experience in the CNS or Cardiology therapeutic area'],
    numberOfOpenings: 3,
  },
  {
    title: 'Clinical Research Coordinator',
    department: 'Pharma',
    location: 'Bengaluru',
    jobType: 'Full-time',
    experienceLevel: '2–5 yrs experience',
    salaryRange: '₹5–8 LPA',
    showSalary: true,
    shortSummary:
      'Coordinate clinical trial activities and maintain study documentation in accordance with GCP guidelines. Work closely with investigators, sponsors, and ethics committees.',
    slug: 'clinical-research-coordinator',
    fullDescription:
      'We are seeking a Clinical Research Coordinator to support the conduct of Phase II and III clinical trials at a NABH-accredited research site in Bengaluru. You will be responsible for ensuring that trials are executed in compliance with GCP, ICH guidelines, and the study protocol.\n\nThis is a critical role that directly supports the timely delivery of clinical data and, ultimately, the approval of new therapies.',
    responsibilities: [
      'Coordinate daily activities for clinical trials in compliance with study protocols and GCP.',
      'Recruit, screen, and enrol eligible subjects for ongoing studies.',
      'Ensure accurate and timely data collection and CRF completion.',
      'Maintain essential trial documents and investigator site files (ISF).',
      'Assist with ethics committee submissions and facilitate monitoring visits.',
    ],
    requiredSkills: [
      '2-5 years of experience coordinating clinical trials.',
      'Degree in Life Sciences, Nursing, or related field; Clinical Research certification preferred.',
      'In-depth knowledge of Good Clinical Practice (GCP) and regulatory guidelines.',
      'Experience with EDC (Electronic Data Capture) systems.',
      'Strong organisational skills and ability to manage multiple trials simultaneously.',
    ],
    niceToHaveSkills: ['IATA certification for shipping biological samples', 'Experience with Medidata Rave or Oracle Clinical'],
    numberOfOpenings: 1,
  },
];

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌  MONGODB_URI is not set in .env.local');
    process.exit(1);
  }

  console.log('🔌  Connecting to MongoDB…');
  await mongoose.connect(uri);

  const Job = mongoose.models.Job || mongoose.model('Job', JobSchema);

  let inserted = 0;
  let skipped = 0;

  for (const jobData of seedJobs) {
    const existing = await Job.findOne({ slug: jobData.slug });
    if (existing) {
      console.log(`  ⏭  Skipped (already exists): ${jobData.title}`);
      skipped++;
      continue;
    }
    await Job.create({ ...jobData, status: 'Active', postedDate: new Date() });
    console.log(`  ✅  Inserted: ${jobData.title}`);
    inserted++;
  }

  console.log(`\n🎉  Seed complete — ${inserted} inserted, ${skipped} skipped.`);
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
