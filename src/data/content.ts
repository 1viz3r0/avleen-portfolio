import netozeLogo from '@/assets/netoze.png'
import oneGoLogo from '@/assets/one-go.png'

/* ------------------------------------------------------------------ *
 * Single source of truth for everything public-facing on this site.  *
 * Copy is deliberately factual — no invented achievements, stats or  *
 * capabilities beyond what is stated here.                           *
 * ------------------------------------------------------------------ */

export const identity = {
  name: 'Avleen Singh',
  title: 'Cybersecurity Specialist | Security Researcher',
  tagline: 'Understanding systems. Finding weaknesses. Building better security.',
  location: 'Dehradun, India',
  availabilityLine: 'Available for Remote Work | Open to Interesting Technical Projects',
  email: 'singhiodine@gmail.com',
} as const

export const hero = {
  title: identity.title,
  tagline: identity.tagline,
  paragraphs: [
    "I'm a cybersecurity professional working across offensive and defensive security, network security, threat detection and security operations. I focus on understanding how systems behave, identifying vulnerabilities and exploring practical ways to strengthen security.",
    "I'm currently expanding my knowledge in malware analysis, studying how malicious software works, how it behaves and how it can be detected and investigated.",
    "Alongside my security work, I build tools and software to support security-focused ideas and experiments.",
  ],
  availability: identity.availabilityLine,
} as const

export const links = {
  linkedin: {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/1vi-z3r0',
    external: true,
  },
  github: {
    label: 'GitHub',
    href: 'https://github.com/1viz3r0',
    external: true,
  },
  tryhackme: {
    label: 'TryHackMe',
    href: 'https://tryhackme.com/p/1viz3r0',
    external: true,
  },
  email: {
    label: 'Email',
    href: 'mailto:singhiodine@gmail.com',
    external: false,
  },
  resume: {
    label: 'Résumé',
    href: 'https://drive.google.com/file/d/1czSBv4n7oMEUPRJ2nBnQq7sbzV2Ti5r9/view?usp=sharing',
    external: true,
  },
} as const

export const snapshot = [
  {
    index: '01',
    label: 'Cybersecurity focus',
    body: 'Offensive and defensive security, security operations, threat detection, incident response, network security and VAPT.',
  },
  {
    index: '02',
    label: 'Professional experience',
    body: 'Instructor for hands-on Linux, networking and security training; SecOps internship covering traffic analysis, firewall and VPN administration, and SOC-style dashboards in Splunk and ELK.',
  },
  {
    index: '03',
    label: 'Current learning interests',
    body: 'Studying malware analysis — how malicious software works, behaves, and how it can be detected and investigated.',
  },
  {
    index: '04',
    label: 'Selected projects',
    body: 'NEToze, a security monitoring and threat-detection platform in development, and One-Go, a URL validation and malicious activity detection engine in testing.',
  },
] as const

export const about = {
  blocks: [
    {
      heading: 'Professional journey',
      body: "My path into cybersecurity started with a curiosity about how systems actually behave under pressure. I studied BCA with a specialisation in cybersecurity and networking, and along the way moved into teaching and hands-on security practice — first as a cybersecurity instructor, then through a SecOps internship focused on networking. Working across a classroom and a security-operations context has shaped how I look at problems: understand the fundamentals, reproduce the behaviour, then explain it clearly to someone else.",
    },
    {
      heading: 'Cybersecurity interests',
      body: "I'm interested in both sides of the discipline — offensive security, where you study systems to find their weaknesses, and defensive security, where you build monitoring and response around those findings. Security operations ties it together: threat detection, incident response, log analysis, network security, and vulnerability assessment and penetration testing (VAPT).",
    },
    {
      heading: 'Approach to security research',
      body: 'I keep the research loop tight. Start by learning how a system is supposed to behave, then find out how it actually behaves. Take notes, reproduce findings in a controlled way, and use what I learn to suggest practical hardening. I prefer asking precise questions over guessing loudly, and measuring results over collecting tool noise.',
    },
    {
      heading: 'Engineering and software interests',
      body: 'Cybersecurity is my primary professional identity; software development is secondary and reinforces it. I build tools that support security-focused ideas and experiments — scripting, automation, small engines that answer one question well. Working code keeps research honest: it either runs or it does not.',
    },
  ],
  currentlyExploring: {
    label: 'Currently exploring',
    items: [
      'Malware analysis — studying how malicious software works, behaves, and how it can be detected and investigated',
      'Detection engineering with SIEM dashboards and alerting',
      'Rust for security tooling',
    ],
  },
  beyond: {
    label: 'Beyond cybersecurity',
    body: 'I help run workshops, technical sessions and CTFs through my work with an ACM student chapter, and I enjoy teaching concepts that people can use immediately. Outside formal study I keep sketching small tools and taking structured security practice apart to understand it better.',
  },
} as const

export const experience = [
  {
    role: 'Cybersecurity Instructor',
    company: 'Hackademic Private Limited',
    location: 'Dehradun, India',
    period: '2026',
    lede: 'Teaching security fundamentals the practical way.',
    points: [
      'Delivered hands-on training in Linux, networking and security tools.',
      'Designed practical exercises, demonstrations and assessments.',
    ],
  },
  {
    role: 'Networking Intern — SecOps',
    company: 'Code Virus Cybersecurity',
    location: 'Lucknow, India',
    period: '2025',
    lede: 'Working where the packets are.',
    points: [
      'Analyzed network traffic and packets using Wireshark.',
      'Configured firewall policies, network segmentation and VPN controls.',
      'Built SOC-style detection dashboards in Splunk and ELK.',
    ],
  },
] as const

export const expertise = [
  {
    group: 'Security & Operations',
    items: ['Red Teaming', 'Blue Teaming', 'Security Operations', 'Threat Detection', 'Incident Response', 'VAPT', 'Log Analysis'],
  },
  {
    group: 'SIEM & Monitoring',
    items: ['Splunk', 'ELK Stack', 'Dashboards', 'Alerting'],
  },
  {
    group: 'Tools',
    items: ['Wireshark', 'Nmap', 'Metasploit', 'Burp Suite', 'Nikto', 'Zenmap'],
  },
  {
    group: 'Networking',
    items: ['TCP/IP', 'DNS', 'VPN', 'Firewalls', 'Packet Analysis'],
  },
  {
    group: 'Systems & Scripting',
    items: ['Linux', 'Kali Linux', 'Windows', 'Python', 'Bash', 'SQL', 'Rust'],
  },
  {
    group: 'Web & AI',
    items: ['SEO', 'AI-Assisted Development', 'Prompt Engineering'],
  },
] as const

export const certifications = [
  {
    title: 'Certified Ethical Hacker (CEH Master) v13',
    issuer: 'EC-Council',
    year: '2025',
  },
  {
    title: 'TryHackMe Top 1% Global',
    issuer: 'TryHackMe',
    year: undefined,
  },
  {
    title: 'ACM Student Chapter Leader',
    issuer: 'ACM',
    year: undefined,
  },
  {
    title: 'Organized workshops, technical sessions and CTFs for 200+ participants',
    issuer: undefined,
    year: undefined,
  },
] as const

export const education = [
  {
    degree: 'BCA — Cybersecurity & Networking',
    institution: "Tula's Institute",
    period: '2023–2026',
  },
  {
    degree: 'Intermediate (10+2) — Commerce with Mathematics',
    institution: 'Kendriya Vidyalaya, Ambala Cantt',
    period: '2021–2023',
  },
] as const

/* ------------------------------------------------------------------ *
 * Projects                                                            *
 * ------------------------------------------------------------------ */

export type ProjectSlug = 'netoze' | 'one-go'

export interface Project {
  slug: ProjectSlug
  name: string
  legalName: string
  status: 'In Development' | 'In Testing'
  short: string
  logo: string
  detail: {
    purpose: string
    problem: string
    intendedUsers: string[]
    capabilities: string[]
    operation: string
    currentContext: string
  }
}

export const projects: Project[] = [
  {
    slug: 'netoze',
    name: 'NETOZE',
    legalName: 'NEToze',
    status: 'In Development',
    short:
      'A cybersecurity platform focused on security monitoring, threat detection, network intelligence, investigation and learning.',
    logo: netozeLogo,
    detail: {
      purpose:
        'NETOZE is being built as a single place to understand what is happening on a network from a security point of view: monitor activity, detect threats, inspect network intelligence, investigate what happened and support learning around those observations.',
      problem:
        'Monitoring, detection, investigation and learning usually live in separate tools, and beginners especially have to stitch them together by hand. That separation makes it harder to go from an alert to an explanation, and harder to learn from real network activity. NETOZE aims to keep those steps adjacent so each one reinforces the other.',
      intendedUsers: [
        'Students and newcomers building security monitoring and networking fundamentals.',
        'Practitioners who want a consolidated view of network activity for review and investigation.',
        'Educators and labs that need realistic, structured network security exercises.',
      ],
      capabilities: [
        'Security monitoring of network activity',
        'Threat detection and alerting',
        'Network intelligence and traffic context',
        'Investigation workflows',
        'Learning resources tied to real observations',
      ],
      operation:
        'At an overview level: activity data is collected from configured sources, organised into a common picture of the network, and reviewed against detection logic. Findings can be expanded into an investigation, and the observations link back to learning material. Details of the internal implementation are deliberately kept private while the platform is in development.',
      currentContext:
        'NETOZE is in active development. Scope, naming and capabilities may change as testing continues — nothing here is a promised feature list, and no general availability date is claimed.',
    },
  },
  {
    slug: 'one-go',
    name: 'One-Go',
    legalName: 'One-Go',
    status: 'In Testing',
    short: 'A security engine focused on URL validation and malicious activity detection.',
    logo: oneGoLogo,
    detail: {
      purpose:
        'One-Go is a focused security engine for URLs: validate that a link is syntactically sound and check it for signs of malicious behaviour before it is trusted.',
      problem:
        'Malicious links often look ordinary. Safe-looking URLs hide redirects, odd encodings and malformed structures that most people never notice, and many pipelines accept links without consistent checks. A small, dedicated validation pass catches the obvious failures before anything else depends on a URL.',
      intendedUsers: [
        'Developers who need a URL check inside their own tools and workflows.',
        'Learners studying how link-based attacks are structured and detected.',
        'Anyone who wants a quick, structured second look at a suspicious link.',
      ],
      capabilities: [
        'URL validation and structural checks',
        'Malicious activity detection on URLs',
        'Structured results suited to automation',
      ],
      operation:
        'At an overview level: a URL is parsed and validated for structural soundness, then evaluated for indicators commonly associated with malicious links. The result is returned as a structured outcome that a person or an automated workflow can act on. Implementation internals stay private while the engine is being validated.',
      currentContext:
        'One-Go is in testing. Behaviour may be refined as results are compared against real cases; use in production is not recommended or claimed at this stage.',
    },
  },
]

export function getProject(slug: string | undefined): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

/* ------------------------------------------------------------------ *
 * Navigation                                                          *
 * ------------------------------------------------------------------ */

export const nav = {
  primary: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/#about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Experience', href: '/#experience' },
    { label: 'Contact', href: '/#contact' },
  ],
  social: [links.github, links.linkedin, links.tryhackme],
} as const
