// professional data with details
export const professionals = [
  {
    id: '1',
    name: 'TechNova Solutions',
    slug: 'technova-solutions',
    role: 'Software Developer',
    logo: 'https://ui-avatars.com/api/?name=TechNova&size=200&background=14b8a6&color=fff&bold=true',
    rating: 4.9,
    reviewCount: 127,
    services: ['Frontend Development', 'Backend Development', 'Fullstack Projects', 'Mobile Apps', 'API Integration', 'Code Review'],
    verified: true,
    status: 'verified',
    category: 'Software Developer',
    location: 'San Francisco, CA',
    yearsExperience: 8,
    tagline: 'Building scalable web applications for modern businesses',
    about: `TechNova Solutions is a team of expert software developers specializing in modern web technologies. We build scalable, performant applications using React, Node.js, and cloud infrastructure.

Our approach combines technical excellence with business understanding. We work closely with clients to deliver solutions that not only meet technical requirements but also drive business value. From MVPs to enterprise applications, we've helped over 100+ companies bring their ideas to life.`,
    expertise: ['React & Vue.js', 'Node.js & Python', 'AWS & Azure', 'Mobile Development'],
    reviews: [
      {
        id: 1,
        author: 'Sarah Mitchell',
        role: 'CEO, StartupHub',
        rating: 5,
        date: 'January 2025',
        comment: 'TechNova built our entire platform from scratch. Their expertise in React and Node.js is exceptional. They delivered on time and exceeded our expectations!'
      },
      {
        id: 2,
        author: 'James Rodriguez',
        role: 'CTO, FinanceApp',
        rating: 5,
        date: 'December 2024',
        comment: 'Outstanding developers. They helped us scale our application to handle 10x traffic. Highly professional and knowledgeable team.'
      },
      {
        id: 3,
        author: 'Emily Chen',
        role: 'Product Manager',
        rating: 4,
        date: 'November 2024',
        comment: 'Great communication and technical skills. They were able to solve complex problems quickly and efficiently.'
      }
    ]
  },
  {
    id: '2',
    name: 'Creative Minds Agency',
    slug: 'creative-minds-agency',
    role: 'Designer',
    logo: 'https://ui-avatars.com/api/?name=Creative+Minds&size=200&background=0ea5e9&color=fff&bold=true',
    rating: 4.8,
    reviewCount: 95,
    services: ['UI Design', 'UX Research', 'Branding', 'Web Design', 'Mobile Design', 'Design Systems'],
    verified: true,
    status: 'verified',
    category: 'Designer',
    location: 'New York, NY',
    yearsExperience: 10,
    tagline: 'Creating beautiful, user-centered designs that convert',
    about: `Creative Minds Agency is a full-service design studio that creates compelling digital experiences. Our team of designers, researchers, and strategists work together to craft solutions that are both beautiful and functional.

We believe great design goes beyond aesthetics—it solves real problems and drives business results. From startups to Fortune 500 companies, we've helped brands create memorable experiences that users love and businesses profit from.`,
    expertise: ['Product Design', 'Brand Strategy', 'User Research', 'Design Systems'],
    reviews: [
      {
        id: 1,
        author: 'Michael Chen',
        role: 'Founder, EcomBrand',
        rating: 5,
        date: 'January 2025',
        comment: 'Creative Minds completely transformed our brand. The new design increased our conversion rate by 45%. Amazing work!'
      },
      {
        id: 2,
        author: 'Jennifer Williams',
        role: 'Marketing Director',
        rating: 5,
        date: 'December 2024',
        comment: 'Professional team with incredible attention to detail. They understood our vision and brought it to life perfectly.'
      }
    ]
  },
  {
    id: '3',
    name: 'MarketBoost Co.',
    slug: 'marketboost-co',
    role: 'Marketer',
    logo: 'https://ui-avatars.com/api/?name=MarketBoost&size=200&background=8b5cf6&color=fff&bold=true',
    rating: 4.7,
    reviewCount: 203,
    services: ['Social Media Marketing', 'SEO', 'Email Campaigns', 'Content Marketing', 'PPC Advertising', 'Analytics'],
    verified: true,
    status: 'verified',
    category: 'Marketer',
    location: 'Austin, TX',
    yearsExperience: 7,
    tagline: 'Data-driven marketing strategies that deliver results',
    about: `MarketBoost Co. is a digital marketing agency focused on delivering measurable ROI. We combine creative storytelling with data analytics to create campaigns that resonate with your audience and drive business growth.

Our team specializes in multi-channel marketing strategies, from SEO and content marketing to paid advertising and social media. We've helped businesses of all sizes increase their online visibility and convert more customers.`,
    expertise: ['E-commerce Marketing', 'B2B Marketing', 'Local SEO', 'Growth Hacking'],
    reviews: [
      {
        id: 1,
        author: 'Lisa Martinez',
        role: 'E-commerce Owner',
        rating: 5,
        date: 'January 2025',
        comment: 'MarketBoost tripled our online sales in 6 months. Their SEO and social media strategies are incredibly effective!'
      },
      {
        id: 2,
        author: 'Tom Anderson',
        role: 'Business Owner',
        rating: 5,
        date: 'December 2024',
        comment: 'Best marketing agency we\'ve worked with. They understand our industry and deliver consistent results.'
      },
      {
        id: 3,
        author: 'Rachel Green',
        role: 'Startup Founder',
        rating: 4,
        date: 'November 2024',
        comment: 'Great team with solid expertise in digital marketing. Helped us build our brand from scratch.'
      }
    ]
  },
  {
    id: '4',
    name: 'Visionary Project Management',
    slug: 'visionary-pm',
    role: 'Project Manager',
    logo: 'https://ui-avatars.com/api/?name=Visionary+PM&size=200&background=f59e0b&color=fff&bold=true',
    rating: 4.9,
    reviewCount: 156,
    services: ['Agile Management', 'Scrum Facilitation', 'Team Coordination', 'Project Planning', 'Risk Management', 'Stakeholder Communication'],
    verified: true,
    status: 'verified',
    category: 'Project Manager',
    location: 'Boston, MA',
    yearsExperience: 12,
    tagline: 'Delivering complex projects on time and on budget',
    about: `Visionary Project Management brings enterprise-level project management expertise to teams of all sizes. With over a decade of experience managing software development, product launches, and organizational transformations, we ensure your projects succeed.

We specialize in Agile methodologies and have led teams through successful digital transformations. Our approach emphasizes clear communication, risk mitigation, and continuous improvement to keep projects on track and stakeholders aligned.`,
    expertise: ['Software Projects', 'Digital Transformation', 'Remote Teams', 'Enterprise PM'],
    reviews: [
      {
        id: 1,
        author: 'Robert Johnson',
        role: 'VP of Engineering',
        rating: 5,
        date: 'January 2025',
        comment: 'Exceptional project management skills. They kept our complex migration project on track and delivered ahead of schedule.'
      },
      {
        id: 2,
        author: 'Amanda White',
        role: 'Product Owner',
        rating: 5,
        date: 'December 2024',
        comment: 'Best PM I\'ve worked with. Great at coordinating remote teams and keeping everyone aligned on goals.'
      }
    ]
  },
  {
    id: '5',
    name: 'DataWorks Analytics',
    slug: 'dataworks-analytics',
    role: 'Data Analyst',
    logo: 'https://ui-avatars.com/api/?name=DataWorks&size=200&background=ef4444&color=fff&bold=true',
    rating: 4.6,
    reviewCount: 89,
    services: ['Data Visualization', 'SQL & Python Analysis', 'Reporting', 'Business Intelligence', 'Predictive Analytics', 'Dashboard Creation'],
    verified: false,
    category: 'Data Analyst',
    location: 'Seattle, WA',
    yearsExperience: 6,
    tagline: 'Turning data into actionable business insights',
    about: `DataWorks Analytics helps businesses make better decisions through data. We transform raw data into clear insights and actionable recommendations that drive growth and efficiency.

Our team is skilled in modern data tools including SQL, Python, Tableau, and Power BI. We work with companies to build dashboards, create reports, and develop predictive models that answer critical business questions.`,
    expertise: ['Business Intelligence', 'E-commerce Analytics', 'Marketing Analytics', 'Financial Analysis'],
    reviews: [
      {
        id: 1,
        author: 'Sarah Kim',
        role: 'Operations Manager',
        rating: 5,
        date: 'December 2024',
        comment: 'DataWorks helped us understand our customer behavior much better. Their dashboards are incredibly useful!'
      },
      {
        id: 2,
        author: 'Carlos Rivera',
        role: 'Marketing Director',
        rating: 4,
        date: 'November 2024',
        comment: 'Good analytics work. They provided valuable insights that improved our marketing ROI.'
      }
    ]
  },
  {
    id: '6',
    name: 'NextGen Tech Labs',
    slug: 'nextgen-tech-labs',
    role: 'Software Engineer',
    logo: 'https://ui-avatars.com/api/?name=NextGen+Tech&size=200&background=06b6d4&color=fff&bold=true',
    rating: 5.0,
    reviewCount: 74,
    services: ['Fullstack Development', 'Cloud Deployment', 'API Integration', 'DevOps', 'Microservices', 'Performance Optimization'],
    verified: true,
    status: 'verified',
    category: 'Software Developer',
    location: 'Los Angeles, CA',
    yearsExperience: 9,
    tagline: 'Engineering excellence for high-growth startups',
    about: `NextGen Tech Labs is a team of senior software engineers who specialize in building and scaling applications for fast-growing startups. We focus on creating robust, maintainable code that can evolve with your business.

Our expertise spans the entire stack, from React and Vue.js on the frontend to Node.js, Python, and Go on the backend. We're passionate about clean code, automated testing, and modern DevOps practices that enable rapid, reliable deployments.`,
    expertise: ['SaaS Applications', 'Cloud Architecture', 'API Development', 'System Design'],
    reviews: [
      {
        id: 1,
        author: 'Jessica Brown',
        role: 'CTO, HealthTech',
        rating: 5,
        date: 'January 2025',
        comment: 'NextGen rebuilt our entire backend infrastructure. The system is now 10x faster and much more reliable. Outstanding work!'
      },
      {
        id: 2,
        author: 'Kevin Zhang',
        role: 'Founder, AIStartup',
        rating: 5,
        date: 'December 2024',
        comment: 'These engineers are top-notch. They designed a scalable architecture that handled our viral growth seamlessly.'
      }
    ]
  },
  {
    id: '7',
    name: 'Elite Content Writers',
    slug: 'elite-content-writers',
    role: 'Content Writer',
    logo: 'https://ui-avatars.com/api/?name=Elite+Content&size=200&background=14b8a6&color=fff&bold=true',
    rating: 4.8,
    reviewCount: 112,
    services: ['Blog Writing', 'Technical Writing', 'Copywriting', 'SEO Content', 'Social Media Content', 'Email Newsletters'],
    verified: true,
    status: 'verified',
    category: 'Content Writer',
    location: 'Remote',
    yearsExperience: 8,
    tagline: 'Compelling content that engages and converts',
    about: `Elite Content Writers delivers high-quality content across all formats and industries. Our team of experienced writers creates content that not only ranks well in search engines but also resonates with your target audience.

We specialize in B2B and technical content, helping SaaS companies, tech startups, and professional services firms establish thought leadership and generate leads through strategic content marketing.`,
    expertise: ['SaaS Content', 'Technical Documentation', 'B2B Marketing', 'Thought Leadership'],
    reviews: [
      {
        id: 1,
        author: 'Nina Patel',
        role: 'Marketing Manager',
        rating: 5,
        date: 'January 2025',
        comment: 'Best content writers we\'ve worked with. Their blog posts consistently rank on page 1 and drive quality leads.'
      }
    ]
  },
  {
    id: '8',
    name: 'CloudScale Solutions',
    slug: 'cloudscale-solutions',
    role: 'DevOps Engineer',
    logo: 'https://ui-avatars.com/api/?name=CloudScale&size=200&background=0ea5e9&color=fff&bold=true',
    rating: 4.7,
    reviewCount: 68,
    services: ['CI/CD Pipeline', 'Cloud Infrastructure', 'Container Orchestration', 'Monitoring & Logging', 'Security', 'Cost Optimization'],
    verified: true,
    status: 'verified',
    category: 'DevOps Engineer',
    location: 'Denver, CO',
    yearsExperience: 10,
    tagline: 'Building reliable, scalable cloud infrastructure',
    about: `CloudScale Solutions provides DevOps expertise to help companies build and maintain robust cloud infrastructure. We specialize in AWS, Azure, and GCP, creating automated, scalable systems that reduce costs and improve reliability.

Our team has helped companies migrate to the cloud, implement CI/CD pipelines, and establish DevOps best practices. We focus on automation, security, and observability to ensure your infrastructure supports your business goals.`,
    expertise: ['AWS & Azure', 'Kubernetes', 'Terraform', 'Site Reliability'],
    reviews: [
      {
        id: 1,
        author: 'Robert Chang',
        role: 'Engineering Lead',
        rating: 5,
        date: 'December 2024',
        comment: 'CloudScale migrated our entire infrastructure to AWS and set up amazing CI/CD pipelines. Deployments are now seamless!'
      }
    ]
  },
  {
    id: '9',
    name: 'Mobile First Studios',
    slug: 'mobile-first-studios',
    role: 'Mobile Developer',
    logo: 'https://ui-avatars.com/api/?name=Mobile+First&size=200&background=8b5cf6&color=fff&bold=true',
    rating: 4.9,
    reviewCount: 103,
    services: ['iOS Development', 'Android Development', 'React Native', 'Flutter', 'App Store Optimization', 'Mobile UI/UX'],
    verified: true,
    status: 'verified',
    category: 'Mobile Developer',
    location: 'Miami, FL',
    yearsExperience: 7,
    tagline: 'Crafting beautiful mobile experiences users love',
    about: `Mobile First Studios specializes in building native and cross-platform mobile applications. We've launched over 50 apps on the App Store and Google Play, many of which have achieved top rankings in their categories.

Our team excels at creating intuitive, performant mobile experiences using React Native and Flutter. We handle everything from initial design to app store submission and ongoing maintenance.`,
    expertise: ['Consumer Apps', 'Enterprise Mobile', 'Cross-Platform', 'App Monetization'],
    reviews: [
      {
        id: 1,
        author: 'Dr. Sarah Lee',
        role: 'Healthcare Entrepreneur',
        rating: 5,
        date: 'January 2025',
        comment: 'They built our healthcare app from scratch. Beautiful design, smooth performance, and excellent support throughout!'
      }
    ]
  },
  {
    id: '10',
    name: 'QA Masters',
    slug: 'qa-masters',
    role: 'QA Engineer',
    logo: 'https://ui-avatars.com/api/?name=QA+Masters&size=200&background=f59e0b&color=fff&bold=true',
    rating: 4.6,
    reviewCount: 55,
    services: ['Manual Testing', 'Automation Testing', 'Performance Testing', 'Security Testing', 'Test Strategy', 'Bug Tracking'],
    verified: false,
    category: 'QA Engineer',
    location: 'Chicago, IL',
    yearsExperience: 9,
    tagline: 'Ensuring quality through comprehensive testing',
    about: `QA Masters provides professional testing services to ensure your software meets the highest quality standards. Our experienced QA engineers catch bugs before they reach production, saving time and protecting your reputation.

We offer both manual and automated testing services, creating comprehensive test suites that cover functionality, performance, and security. Our team integrates seamlessly with your development workflow.`,
    expertise: ['Web Testing', 'API Testing', 'Mobile Testing', 'Test Automation'],
    reviews: [
      {
        id: 1,
        author: 'Tom Bradley',
        role: 'Product Manager',
        rating: 5,
        date: 'December 2024',
        comment: 'QA Masters significantly improved our software quality. They caught critical bugs we would have missed.'
      }
    ]
  }
];

export const mainCategories = [
  'Software Developer',
  'Designer',
  'Project Manager',
  'Data Analyst',
  'DevOps Engineer',
  'Mobile Developer',
  'QA Engineer'
];

// export const serviceCategories = [
//   'Frontend Development',
//   'Backend Development',
//   'Fullstack Projects',
//   'UI Design',
//   'UX Research',
//   'Social Media Marketing',
//   'Agile Management',
//   'Data Analysis',
//   'Content Writing',
//   'DevOps',
//   'Mobile Apps',
//   'QA Testing'
// ];