import { ServiceItem, MarketItem, ClientTier, Differentiator, TeamDepartment, ProcessStep } from './types';

export const services: ServiceItem[] = [
  {
    id: 'web-development',
    number: '01',
    title: 'Web Application Development',
    tagline: 'High-performance web architecture & enterprise digital platforms',
    description: 'Bespoke web applications, modern architectures, responsive enterprise platforms, and digital experiences engineered for speed, security, and scalability.',
    fullDescription: 'We build ultra-fast, resilient web applications leveraging React, Next.js, TypeScript, Node.js, and cloud-native serverless infrastructure. Every build is optimized for peak Google Core Web Vitals, enterprise security, and seamless international conversion.',
    deliverable: 'Production-ready cloud deployment with 99.9% uptime SLA, automated CI/CD pipelines, and high-conversion UX.',
    icon: 'Globe',
    keywords: ['React / Next.js', 'Full-Stack Engineering', 'API Architecture', 'Cloud Infrastructure', 'Web Vitals Optimization'],
    features: [
      'Custom full-stack web application development',
      'Ultra-fast load times & SEO-ready structure',
      'Scalable backend API integration & cloud deployment',
      'Interactive, high-conversion user interfaces'
    ]
  },
  {
    id: 'mobile-apps',
    number: '02',
    title: 'Mobile App Engineering',
    tagline: 'Native and cross-platform iOS & Android flagship experiences',
    description: 'Intuitive, fluid mobile applications tailored for customer retention, seamless checkout flows, offline resilience, and frictionless hardware integrations.',
    fullDescription: 'From high-transaction e-commerce and fintech apps to enterprise field utilities, we engineer fluid mobile applications with native device capabilities, biometric security, push engagement, and offline sync.',
    deliverable: 'Native iOS & Android builds deployed to App Store & Google Play with analytics and crash monitoring configured.',
    icon: 'Smartphone',
    keywords: ['iOS & Android', 'Cross-Platform', 'Mobile UX', 'App Store Optimization', 'Real-Time Sync'],
    features: [
      'Native & hybrid mobile frameworks (React Native & Swift/Kotlin)',
      'Seamless biometric auth & secure payment transactions',
      'High-performance native gestures, haptics, and animations',
      'Push notification & automated customer lifecycle workflows'
    ]
  },
  {
    id: 'ai-integration',
    number: '03',
    title: 'Applied AI & Solutions',
    tagline: 'Custom LLM workflows, intelligent agents & predictive intelligence',
    description: 'Bespoke AI model integration, intelligent conversational agents, predictive analysis, and enterprise workflow automation crafted for unfair market advantages.',
    fullDescription: 'We transform traditional business processes into self-optimizing pipelines. Harness multimodal AI, custom LLM fine-tuning, automated document analysis, and conversational copilots securely connected to your proprietary data.',
    deliverable: 'Autonomous AI pipelines and custom copilots integrated directly with your ERP, CRM, and databases.',
    icon: 'Bot',
    keywords: ['Custom LLM Pipelines', 'Intelligent Agents', 'Automated Decisioning', 'Data Intelligence', 'Enterprise AI'],
    features: [
      'Bespoke AI system integration & model fine-tuning',
      'Autonomous customer support & lead qualification agents',
      'Predictive analytics & intelligent dashboarding',
      'Enterprise security, SOC2 compliance & data privacy safeguards'
    ]
  },
  {
    id: 'ui-ux-design',
    number: '04',
    title: 'UI/UX Design Systems',
    tagline: 'Human-centric aesthetics, design systems & conversion architecture',
    description: 'Human-centric user interface and experience systems that turn complex user flows into effortless digital journeys, backed by rigorous research and pristine craftsmanship.',
    fullDescription: 'Our design philosophy merges mathematical spatial precision with editorial luxury. We build unified Figma design systems, interactive prototypes, and conversion funnels validated with user testing.',
    deliverable: 'Complete scalable Figma component design system, interaction specs, and design tokens ready for development.',
    icon: 'Palette',
    keywords: ['Design Systems', 'Interactive Prototyping', 'User Research', 'Conversion Architecture', 'Micro-Interactions'],
    features: [
      'Scalable design systems and tokenized component libraries',
      'High-fidelity interactive prototyping & micro-animations',
      'User journey mapping, heatmaps, and usability audits',
      'Mobile-first and dense desktop architectural layouts'
    ]
  },
  {
    id: 'digital-marketing',
    number: '05',
    title: 'Digital Marketing & Growth',
    tagline: 'Performance advertising & omnichannel acquisition campaigns',
    description: 'Full-funnel digital marketing strategies spanning performance advertising, search engine dominance, targeted social media acquisition, and ROI-driven optimization across Gulf and international markets.',
    fullDescription: 'We build high-leverage paid acquisition campaigns across Meta, Google Ads, TikTok, and LinkedIn, tailored specifically for GCC high-net-worth audiences, localized bilingual creatives, and automated attribution.',
    deliverable: 'End-to-end paid media campaigns, automated reporting dashboards, and weekly ROAS optimization cycles.',
    icon: 'Share2',
    keywords: ['Performance Ads', 'Search Dominance', 'Omnichannel Strategy', 'CAC/LTV Optimization', 'Gulf & GCC Targeting'],
    features: [
      'Multi-channel ad campaign management (Meta, Google, TikTok, LinkedIn)',
      'Precision geo-targeting and audience modeling for UAE, GCC & Canada',
      'Data-driven A/B creative testing & ROAS scaling routines',
      'Comprehensive conversion tracking & attribution modeling'
    ]
  },
  {
    id: 'automation',
    number: '06',
    title: 'Workflow Automation & APIs',
    tagline: 'Zero-friction operations pipelines & systems integration',
    description: 'Eliminate manual bottlenecks. We build automated data pipelines, CRM synchronization, customer onboarding triggers, and enterprise integration workflows.',
    fullDescription: 'Connect fragmented software ecosystems into harmonious real-time networks. We build custom webhook routers, asynchronous job queues, and API integrations that save hundreds of operational hours monthly.',
    deliverable: 'Automated workflow infrastructure with real-time audit logging, error-handling fallbacks, and monitoring.',
    icon: 'Cpu',
    keywords: ['Workflow Automation', 'CRM Integration', 'Webhook Pipelines', 'Operational Efficiency', 'Process Optimization'],
    features: [
      'End-to-end operational pipeline orchestration',
      'Cross-platform CRM, ERP, and payment gateway synchronization',
      'Automated client onboarding, contract generation, and invoicing',
      'Continuous uptime monitoring and instant error alerting'
    ]
  },
  {
    id: 'graphic-designing',
    number: '07',
    title: 'Brand Identity & Visuals',
    tagline: 'Distinctive brand identities, typography & luxury collateral',
    description: 'Sophisticated visual identity systems, luxury brand guidelines, digital collaterals, and high-impact marketing materials that elevate your brand prestige in competitive markets.',
    fullDescription: 'We create iconic brand assets that communicate authority and trust. From logo marks and bespoke typographic hierarchies to digital pitch decks, stationary, and packaging systems.',
    deliverable: 'Comprehensive brand style guide, vector logo suite, typography hierarchy, and branded digital asset library.',
    icon: 'Layers',
    keywords: ['Brand Identity', 'Visual Guidelines', 'Editorial Layouts', 'Marketing Collaterals', 'Luxury Aesthetics'],
    features: [
      'Comprehensive brand identity systems & vector logos',
      'Premium typography, color systems, and corporate brand books',
      'Digital campaign creative assets and investor presentation decks',
      'Print and packaging design for physical & retail presence'
    ]
  },
  {
    id: 'seo',
    number: '08',
    title: 'Search Optimization & SEO',
    tagline: 'Organic search visibility, authority building & technical SEO',
    description: 'Dominant search visibility across Google, AI search engines (ChatGPT, Perplexity, Gemini), and local business queries in the UAE, GCC, and North America.',
    fullDescription: 'We engineer technical SEO architectures, structured data schemas, programmatic landing pages, and content authority strategies that win high-intent commercial keywords.',
    deliverable: 'Complete technical audit, bilingual keyword hierarchy, ongoing content roadmaps, and rank tracking dashboards.',
    icon: 'Search',
    keywords: ['Technical SEO', 'AI Search Optimization', 'Gulf Keyword Strategy', 'Structured Data', 'Authority Building'],
    features: [
      'Technical SEO audits & core web vitals speed optimization',
      'Arabic & English bilingual keyword optimization',
      'Generative engine optimization (GEO) for AI search engines',
      'Structured data schemas, local citations & backlink strategy'
    ]
  },
  {
    id: 'maintenance',
    number: '09',
    title: '24/7 Support & Governance',
    tagline: 'Continuous software maintenance, security & proactive scaling',
    description: 'Dedicated post-launch governance, SLA guarantees, security patching, cloud optimization, and ongoing feature iterations to ensure compounding reliability.',
    fullDescription: 'Software is a living asset. Our dedicated support pods provide 24/7 uptime monitoring, zero-day security patching, database optimization, and agile feature iterations on a predictable retainer.',
    deliverable: 'Dedicated Slack/Teams channel, monthly performance reports, guaranteed response times, and feature development sprints.',
    icon: 'Wrench',
    keywords: ['24/7 SLA', 'Security Hardening', 'Cloud Optimization', 'Agile Sprints', 'DevOps Support'],
    features: [
      'Continuous 24/7 uptime monitoring & automated incident alerts',
      'Regular security audits, package updates & dependency patches',
      'Database optimization, backup verifications & disaster recovery',
      'Dedicated engineering sprint allocation for new feature updates'
    ]
  }
];

export const targetMarkets: MarketItem[] = [
  {
    region: 'Gulf Region (UAE & GCC)',
    description: 'Our primary operating and commercial hub. We provide localized bilingual systems, high-net-worth consumer targeting, and regulatory compliance across the GCC.',
    countries: ['UAE (Dubai & Abu Dhabi)', 'Saudi Arabia (Riyadh & Jeddah)', 'Qatar', 'Kuwait', 'Bahrain', 'Oman'],
    isPrimary: true
  },
  {
    region: 'Canada & North America',
    description: 'Strategic software engineering and cross-border digital expansion for Canadian enterprises and technology hubs.',
    countries: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'],
  },
  {
    region: 'Global & International',
    description: 'High-growth international ventures seeking scalable AI architectures, cross-border marketing, and seamless digital transformation.',
    countries: ['United Kingdom', 'Europe', 'Singapore', 'Australia', 'Global Remote'],
  }
];

export const targetClients: ClientTier[] = [
  {
    title: 'Startups & High-Growth Scaleups',
    description: 'Early and growth-stage companies needing fast, reliable MVPs, AI architecture, and agile product validation.',
    solution: 'Rapid MVP engineering, AI model integration, and high-velocity launch marketing.'
  },
  {
    title: 'Growing SMEs & Commercial Brands',
    description: 'Mid-sized businesses looking to modernize legacy tools, automate manual pipelines, and scale paid acquisition.',
    solution: 'Custom web/mobile platforms, automated CRM workflows, and ROAS-focused digital marketing.'
  },
  {
    title: 'Enterprise & Institutional Groups',
    description: 'Established corporations and conglomerates requiring scalable cloud architecture, SOC2 compliance, and dedicated engineering pods.',
    solution: 'Enterprise system architecture, custom internal AI copilots, and 24/7 governance SLAs.'
  },
  {
    title: 'E-Commerce & Retail Brands',
    description: 'High-volume merchants seeking lightning-fast checkout experiences, omni-channel campaigns, and automated fulfillment.',
    solution: 'High-speed headless e-commerce, localized GCC checkout, and automated retention flows.'
  }
];

export const differentiators: Differentiator[] = [
  {
    title: 'Unified Technology & Marketing',
    description: 'No fragmented handoffs. We build the software that powers your business and the creative marketing engine that drives your revenue.'
  },
  {
    title: 'AI-First Engineering by Default',
    description: 'Artificial intelligence is not an afterthought; it is integrated directly into our codebases, data pipelines, and creative workflows.'
  },
  {
    title: 'Gulf Specialization & Global Standards',
    description: 'Deep native understanding of UAE and GCC business dynamics combined with North American and European technical benchmarks.'
  },
  {
    title: 'Pristine Clean Craftsmanship',
    description: 'Zero fluff, zero bloat. Every interface is designed with architectural discipline, high visual contrast, and intuitive human UX.'
  },
  {
    title: 'Dedicated 24/7 Long-Term Support',
    description: 'We do not abandon you post-launch. Our contracts include dedicated maintenance, proactive security monitoring, and SLA guarantees.'
  },
  {
    title: 'Measurable ROI & Revenue Focus',
    description: 'Every deliverable is tied to commercial performance—faster load speeds, higher conversion rates, and lower acquisition costs.'
  }
];

export const teamDepartments: TeamDepartment[] = [
  {
    name: 'Executive & Solutions Architecture',
    description: 'High-level technical scoping, commercial alignment, strategic roadmap definition, and GCC/global market entry strategy.',
    roles: ['Chief Solutions Architect', 'Commercial Director', 'Technical Engagement Lead']
  },
  {
    name: 'Software Engineering & AI Labs',
    description: 'Full-stack engineering, cloud infrastructure, AI model fine-tuning, mobile development, and API pipeline orchestration.',
    roles: ['Senior Full-Stack Engineers', 'AI / ML Engineers', 'Mobile Architects', 'DevOps & Cloud Engineers']
  },
  {
    name: 'Creative Direction & UI/UX',
    description: 'Bespoke design systems, interactive prototypes, luxury brand identities, motion graphics, and conversion architecture.',
    roles: ['Lead UI/UX Designer', 'Brand Identity Designer', 'Motion & Visual Designer']
  },
  {
    name: 'Growth & Performance Marketing',
    description: 'Multi-channel paid media execution, GCC regional targeting, conversion rate optimization, and technical SEO dominance.',
    roles: ['Paid Media Strategist', 'Growth Analyst', 'Technical SEO Specialist']
  },
  {
    name: 'QA & 24/7 Technical Governance',
    description: 'Continuous automated testing, zero-downtime deployments, cybersecurity monitoring, and post-launch maintenance.',
    roles: ['QA Automation Lead', 'Site Reliability Engineer', 'Client Support Manager']
  }
];

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Discovery & Strategic Scoping',
    description: 'Deep dive into your market landscape, technical requirements, business goals, and competitive positioning.',
    deliverable: 'Comprehensive Architecture & Strategy Blueprint'
  },
  {
    step: '02',
    title: 'Architecture & UI/UX Design',
    description: 'Crafting tokenized component systems, interactive Figma prototypes, and backend schema designs.',
    deliverable: 'Interactive Prototype & System Architecture Specs'
  },
  {
    step: '03',
    title: 'Sprint Engineering & AI Integration',
    description: 'Agile development cycles with continuous testing, clean modular code, and direct API/AI pipeline integration.',
    deliverable: 'Weekly Staging Deployments & Code Access'
  },
  {
    step: '04',
    title: 'QA Auditing & Production Launch',
    description: 'Rigorous performance auditing, security penetration checks, Core Web Vitals optimization, and live deployment.',
    deliverable: 'Production Rollout with Zero Downtime'
  },
  {
    step: '05',
    title: 'Growth Optimization & 24/7 SLA',
    description: 'Continuous performance marketing, conversion tuning, automated backups, and 24/7 dedicated engineering support.',
    deliverable: 'Monthly KPI Growth & SLA Governance Reports'
  }
];
