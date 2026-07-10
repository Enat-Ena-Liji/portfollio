import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/common/ProjectCard';
import {FaCode,FaSearch,FaStar,FaFire,FaCalendarAlt,FaLayerGroup,FaServer,FaMobileAlt,FaDatabase} from 'react-icons/fa';
import {SiReact,SiNodedotjs} from 'react-icons/si';
import styles from './Projects.module.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [isGridView, setIsGridView] = useState(true);
  const projectsPerPage = 9;

  const categories = [
    { id: 'all', label: 'All Projects', icon: <FaLayerGroup /> },
    { id: 'fullstack', label: 'Full Stack', icon: <FaServer /> },
    { id: 'frontend', label: 'Frontend', icon: <SiReact /> },
    { id: 'backend', label: 'Backend', icon: <SiNodedotjs /> },
    { id: 'mobile', label: 'Mobile', icon: <FaMobileAlt /> },
    { id: 'database', label: 'Database', icon: <FaDatabase /> },
  ];

 // Mock projects data
  const mockProjects = useMemo(() => [
        {
    id: 1,
    title: 'University Department Allocation System',
    type: 'fullstack',
    featured: true,
    date: '2024-02-15',
    duration: '3 months',
    teamSize: 1,
    status: 'completed',
    progress: 100,
    shortDescription: 'A comprehensive system for allocating freshman students to departments based on GPA, entrance scores, and affirmative action criteria.',
    fullDescription: `A full-stack web application that automates the university department allocation process with:
    
    • Complex scoring algorithm: 50% GPA + 20% Entrance Exam + 30% COC Exam
    • Affirmative action bonuses (+5 each for female, region, handicap)
    • 20% female quota enforcement
    • Multi-role workflow (Admin, Registrar, Dean, Dept Head, Teacher, Student)
    • Grade approval pipeline with audit trail
    • Real-time countdown timer synchronized with server
    • Preference ranking system with validation
    • Complete audit logging for all actions
    
    The system handles 70+ functional requirements and includes comprehensive database design with 15+ tables and complete audit trails.`,
    technologies: ['React', 'Node.js', 'Express', 'PostgreSQL', 'JWT', 'Redis'],
    features: [
      'Complex allocation algorithm with 50% GPA + 20% Entrance + 30% COC',
      'Multi-role workflow with 6 distinct user roles',
      'Grade approval pipeline with audit trail',
      'Real-time countdown timer synchronized with server',
      'Affirmative action bonuses (+5 each for female, region, handicap)',
      '20% female quota enforcement',
      'Preference ranking system with validation',
      'Complete audit logging for all actions',
      '70+ functional requirements implemented',
      '15+ database tables with complex relationships'
    ],
    images: ['https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop'],
    video: null,
    links: {
      github: 'https://github.com/Enat-Ena-Liji/newselection',
      demo: 'https://udas-demo.herokuapp.com',
      docs: 'https://github.com/Enat-Ena-Liji/newselection#readme'
    },
    stats: {
      stars: 0,
      forks: 0,
      views: 0,
      linesOfCode: 25000,
      commits: 0,
      branches: 0
    },
    challenges: [
      {
        title: 'Complex allocation algorithm with multiple criteria',
        solution: 'Implemented a scoring system that combines GPA (50%), Entrance Exam (20%), and COC Exam (30%) with affirmative action bonuses, using a preference chaining algorithm that tries each choice sequentially.'
      },
      {
        title: 'Multi-role workflow with strict permissions',
        solution: 'Implemented JWT-based authentication with role-based access control (RBAC) and impersonation capabilities for higher roles.'
      },
      {
        title: 'Real-time deadline enforcement',
        solution: 'Server-synchronized countdown timer with WebSocket connections to prevent local tampering.'
      }
    ],
    complexity: 'high'
  },
//   {
//       id: 1,
//       title: 'E-Commerce Platform',
//       type: 'fullstack',
//       featured: true,
//       date: '2024-01-15',
//       duration: '3 months',
//       teamSize: 3,
//       status: 'completed',
//       progress: 100,
//       shortDescription: 'A full-featured e-commerce platform with real-time inventory management and payment integration.',
//       fullDescription: 'This project involved building a complete e-commerce solution from scratch. Features include user authentication, product catalog, shopping cart, payment processing with Stripe, order management, and admin dashboard.',
//       technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux', 'Stripe'],
//       features: [
//         'User authentication with JWT',
//         'Real-time inventory management',
//         'Payment processing with Stripe',
//         'Admin dashboard with analytics',
//         'Responsive design for all devices'
//       ],
//       images: ['https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop'],
//       video: null,
//       links: {
//         github: 'https://github.com',
//         demo: 'https://weather-condition-one.vercel.app',
//         docs: null
//       },
//       stats: {
//         stars: 45,
//         forks: 12,
//         views: 1200,
//         linesOfCode: 15000,
//         commits: 156,
//         branches: 8
//       },
//       challenges: [
//         {
//           title: 'Real-time inventory sync',
//           solution: 'Implemented WebSocket connections and database transactions'
//         }
//       ],
//       complexity: 'high'
//  },

{
  "id": 2,
  "title": "Global Banking & Transaction Settlement System",
  "type": "distributed-systems",
  "featured": true,
  "date": "2024-06-15",
  "duration": "5 weeks",
  "teamSize": 1,
  "status": "in-progress",
  "progress": 75,
  "shortDescription": "A distributed banking system with RMI remote objects, atomic RPC transactions, multi-currency support, clearing house settlement, and role-based security for 4 actors.",
  "fullDescription": "A comprehensive distributed banking platform implementing core financial infrastructure with:\n\n• RMI-based remote Account objects with thread-safe balance operations and daily compound interest accrual\n• Atomic RPC fund transfers with SERIALIZABLE database isolation, idempotency protection, and automatic rollback\n• Multi-currency support with real-time exchange rates, 2% margin, and 5-minute rate caching\n• Fee calculation engine: $1 domestic, 2% international (min $5, max $100), waived for internal transfers\n• Clearing House batch settlement with multilateral netting: NPᵢ = Σ(PaymentsIn) - Σ(PaymentsOut)\n• Hash-chained immutable audit logs with SHA-256 integrity verification\n• Anomaly detection: $10K threshold, velocity checks, geographic analysis, device fingerprinting\n• 4-role RBAC: Customer (transfers up to $10K), Teller (KYC, freeze, $50K approval), Admin (config, reconciliation), Auditor (logs, SAR reports)\n• Nightly three-way reconciliation verifying database = RMI objects = bank reserves\n• MFA authentication with TOTP codes, JWT tokens (15min expiry), and session-based RMI binding\n\nThe system implements 25 functional requirements across 9 database tables with complete audit trails and supports 60+ actor activities through JavaFX desktop interfaces.",
  "technologies": [
    "Java 17",
    "RMI (Remote Method Invocation)",
    "RPC (Remote Procedure Call)",
    "JavaFX 21",
    "PostgreSQL 16",
    "Maven Multi-Module",
    "HikariCP",
    "JWT",
    "TOTP (MFA)",
    "Docker",
    "Redis",
    "SLF4J/Logback"
  ],
  "features": [
    "RMI remote Account objects with ReentrantReadWriteLock thread safety",
    "Atomic fund transfers with SELECT FOR UPDATE pessimistic locking",
    "Idempotency protection preventing double-spending (24hr key cache)",
    "Compound interest accrual: A = P(1 + r/365)^(365t) daily at 00:00 UTC",
    "Multi-currency conversion with real-time rates and 2% margin",
    "Fee engine: $1 domestic, 2% international, internal transfers free",
    "Clearing House multilateral netting: NP = ΣIn - ΣOut",
    "Hash-chained immutable audit logs (SHA-256 blockchain-style)",
    "Anomaly detection: threshold, velocity, geographic, time-based rules",
    "4-role RBAC with 25-permission matrix",
    "MFA authentication with TOTP 6-digit codes (30-second refresh)",
    "High-value transaction approval workflow (>$50K)",
    "Account freeze/unfreeze with audit trail and reason codes",
    "Nightly three-way reconciliation (DB = RMI = Reserves)",
    "Dynamic configuration hot-reload without server restart",
    "Session-based RMI object binding with 15-minute timeout",
    "KYC verification workflow with 5 status states",
    "Suspicious Activity Report (SAR) generation",
    "Real-time system health monitoring dashboard",
    "25 functional requirements across 9 database tables",
    "60+ actor activities mapped to RPC/RMI protocols",
    "JavaFX desktop GUI with role-based sidebar navigation",
    "4 Maven modules: Contracts, Persistence, Engine, Client"
  ],
  "images": [
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop"
  ],
  "video": null,
  "links": {
    "github": "https://github.com/yourusername/global-banking-system",
    "demo": null,
    "docs": "https://github.com/yourusername/global-banking-system#readme"
  },
  "stats": {
    "stars": 0,
    "forks": 0,
    "views": 0,
    "linesOfCode": 15000,
    "commits": 0,
    "branches": 0
  },
  "challenges": [
    {
      "title": "Atomic transaction integrity across distributed accounts",
      "solution": "Implemented SERIALIZABLE isolation with SELECT FOR UPDATE row-level locking in PostgreSQL, wrapped in Java transaction management with automatic rollback. Combined with Redis distributed locks for cross-node operations to guarantee zero money loss or duplication."
    },
    {
      "title": "Preventing double-spending from network retries",
      "solution": "Designed idempotency management system using UUID-based keys cached for 24 hours. Duplicate requests return the original cached response without re-executing the transfer. Implemented both in-memory ConcurrentHashMap and Redis-backed cache for production readiness."
    },
    {
      "title": "Thread-safe RMI remote object management",
      "solution": "Used ReentrantReadWriteLock on all Account remote objects, allowing concurrent reads (balance checks) while serializing writes (transfers). Combined with database-level pessimistic locking to prevent race conditions across multiple server nodes."
    },
    {
      "title": "Building hash-chained immutable audit logs",
      "solution": "Implemented SHA-256 hash chaining where each audit log entry contains hash(current_data + previous_hash). This creates a blockchain-style tamper-evident audit trail. PostgreSQL triggers automatically calculate and store the hash on every INSERT."
    },
    {
      "title": "Designing a clean 4-module Maven architecture",
      "solution": "Separated into bank-shared-contracts (interfaces, DTOs, exceptions), bank-persistence-postgres (repositories, connection pooling), bank-server-engine (RMI/RPC implementations, business logic, security), and bank-client-javafx (GUI). This enforces dependency inversion and allows independent testing of each layer."
    }
  ],
  "architecture": {
    "layers": [
      {
        "name": "Shared Contracts Layer",
        "description": "Interfaces (IAccountRemote), DTOs (TransactionRequest, AccountStatement), Exceptions (40 error codes), Enums (ActorRole, TransactionStatus) - No business logic, pure contracts",
        "technology": "Java Interfaces, Serializable DTOs"
      },
      {
        "name": "Persistence Layer",
        "description": "PostgreSQL with HikariCP connection pooling (20 connections), Flyway migrations, Repository pattern with SELECT FOR UPDATE locking, hash-chained audit triggers",
        "technology": "PostgreSQL 16, HikariCP 5.1, JDBC"
      },
      {
        "name": "Business Logic Layer",
        "description": "RMI Remote Objects (thread-safe accounts), RPC Services (atomic transfers, idempotency), Security (MFA, RBAC, JWT), Background Jobs (interest accrual, reconciliation, anomaly detection)",
        "technology": "Java RMI, Java RPC, JWT, TOTP"
      },
      {
        "name": "Presentation Layer",
        "description": "JavaFX desktop application with FXML layouts, role-based sidebar navigation, 5 distinct dashboards (Login, Customer, Teller, Admin, Auditor), CSS styling with dark/light themes",
        "technology": "JavaFX 21, FXML, CSS"
      }
    ],
    "database": {
      "tables": 9,
      "tablesList": [
        "users (authentication, profiles, KYC status)",
        "accounts (balances, interest rates, limits, freeze status)",
        "transactions (immutable ledger, idempotency, hash chain)",
        "audit_logs (append-only, hash-chained, JSONB details)",
        "sessions (JWT tokens, RMI bindings, activity tracking)",
        "system_config (hot-reload parameters, audit trail)",
        "reconciliation_logs (daily balance verification)",
        "notification_queue (async email/SMS/push queue)",
        "exchange_rates (cached currency rates, 5-min refresh)"
      ]
    }
  },
  "functionalRequirements": 25,
  "actorActivities": 40,
  "systemProcesses": 8,
  "roles": [
    {
      "name": "Customer",
      "activities": 12,
      "permissions": ["View Balance", "Transfer ≤$10K", "View Statement", "Preview Interest", "Verify Recipient", "Update Profile"]
    },
    {
      "name": "Bank Teller",
      "activities": 12,
      "permissions": ["Search Customer", "Verify KYC", "Process Cash", "Freeze/Unfreeze Account", "Approve ≤$50K", "Resolve Exceptions"]
    },
    {
      "name": "System Admin",
      "activities": 8,
      "permissions": ["Monitor Health", "Update Config", "Manage RMI", "Run Reconciliation", "View Logs", "Manage Backups"]
    },
    {
      "name": "Security Auditor",
      "activities": 8,
      "permissions": ["View Audit Logs", "Review Anomalies", "Verify Integrity", "Generate SAR", "Issue Reports", "Investigate Accounts"]
    }
  ],
  "complexity": "high",
  "goldenRule": "Σ(All Account Balances) + Σ(Pending Transactions) = Total Bank Reserves",
  "keyFormulas": [
    "Compound Interest: A = P(1 + r/365)^(365t)",
    "Netting Position: NPᵢ = Σ(PaymentsInᵢⱼ) - Σ(PaymentsOutⱼᵢ)",
    "Fee: International = max($5, min($100, amount × 2%))",
    "Audit Hash: Hₙ = SHA256(Hₙ₋₁ + dataₙ)",
    "Balance: B_available = B_current - Pending_debits"
  ]
},
    {
    id: 3,
    title: 'Evangadi Forum - Programming Q&A Platform',
    type: 'fullstack',
    featured: true,
    date: '2024-01-20',
    duration: '2 weeks',
    teamSize: 1,
    status: 'completed',
    progress: 100,
    shortDescription: 'A community-driven Q&A platform where programming students can ask questions, provide answers, and collaborate on solving coding problems.',
    fullDescription: `A fully-functional Q&A platform built for Evangadi Networks, enabling programming students to ask questions and get answers from the community.

Key Features:
• Secure user authentication with signup/login
• Password validation (minimum 8 characters)
• Unique email and username enforcement
• Questions listing with newest first
• Question titles displayed with author usernames
• Detailed question view with full description
• Answer posting system with author tracking
• Ask question page with guided instructions
• Persistent user sessions across pages
• Responsive design for all devices

The platform follows Stack Overflow-style conventions and provides an intuitive interface for students to collaborate on programming problems. Users can only post questions and answers when logged in, ensuring accountability and quality content.`,
    technologies: ['React', 'Node.js', 'Express', 'MySQL', 'JWT', 'Bcrypt'],
    features: [
      'Complete user authentication system',
      'Password validation (8+ characters)',
      'Unique email/username enforcement',
      'Questions listed by title with author info',
      'Newest questions appear first',
      'Detailed question view with all answers',
      'Answer posting with author tracking',
      'Ask question page with guided instructions',
      'Protected routes for authenticated users',
      'Responsive mobile-friendly design'
    ],
    images: ['https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop'],
    video: null,
    links: {
      github: 'https://github.com/yourusername/evangadi-forum',
      demo: 'https://evangadi-forum-tau-one.vercel.app/',
      docs: 'https://github.com/yourusername/evangadi-forum#readme'
    },
    stats: {
      stars: 0,
      forks: 0,
      views: 0,
      linesOfCode: 8500,
      commits: 0,
      branches: 0
    },
    challenges: [
      {
        title: 'Implementing secure authentication with JWT',
        solution: 'Used HTTP-only cookies for JWT storage to prevent XSS attacks, with bcrypt for password hashing and proper validation middleware.'
      },
      {
        title: 'Maintaining user sessions across pages',
        solution: 'Implemented persistent login state using React Context API with token verification on each protected route.'
      },
      {
        title: 'Real-time question ordering',
        solution: 'Questions are fetched from MySQL with ORDER BY created_at DESC to ensure newest questions appear first, with proper indexing for performance.'
      }
    ],
    complexity: 'medium'
  },
  
     {
    id: 4,
    title: 'Abe\'s Garage - Complete Garage Management System',
    type: 'fullstack',
    featured: true,
    date: '2024-03-01',
    duration: '3 months',
    teamSize: 1,
    status: 'completed',
    progress: 100,
    shortDescription: 'A comprehensive business management system that streamlines garage operations, customer management, order tracking, and service delivery with real business value ROI calculation.',
    fullDescription: `A complete business management system for Abe's Garage that demonstrates the full software development lifecycle from business analysis to deployment.

**Business Analysis & Value Proposition:**
• Identified 7 major business problems through workflow observation
• Calculated $445,750 total value added over 5 years
• $260,000 from customer retention (10% return rate)
• $120,000 from new customer acquisition (5 additional customers/month)
• $40,625 from customer time savings (15 mins per visit)
• $16,250 from manager time savings (30 mins/day)
• $7,800 from reduced phone calls (8 calls/day)
• $1,075 from automated receipt generation
• Fair project price: $18,000 (20% of net profit)

**System Architecture:**
• Microservices architecture with 6 core services
• RESTful API design with JWT authentication
• AWS EC2 hosting with CloudWatch monitoring
• MySQL database with 7+ tables and relationships
• Bootstrap 5 template with custom modifications

**Core Features:**
• Public-facing pages (Home, About, Services, Contact)
• Employee management with role-based access
• Customer management with vehicle history
• Order management with task assignment
• Service catalog with pricing and estimates
• Order tracking with unique hash (no login required)
• Responsive design for all devices

**Technical Implementation:**
• 50+ RESTful API endpoints
• 15+ database tables with foreign key constraints
• JWT authentication with HTTP-only cookies
• Bcrypt password hashing
• Comprehensive error handling and logging
• Git version control with feature branching
• AWS deployment with automated backups`,
    technologies: ['React', 'Node.js', 'Express', 'MySQL', 'JWT', 'AWS', 'Bootstrap'],
    features: [
      'Complete business analysis with $445,750 value calculation',
      'Full system design with microservices architecture',
      'Customer management with vehicle history tracking',
      'Order management with task assignment',
      'Employee management with role-based access',
      'Public pages (Home, About, Services, Contact)',
      'Order tracking without login (unique hash)',
      'Service history and customer retention',
      'AWS deployment with CloudWatch monitoring',
      'Responsive Bootstrap template'
    ],
    images: ['https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=800&auto=format&fit=crop'],
    video: null,
    links: {
      github: 'https://github.com/yourusername/abe-garage',
      demo: 'https://abe-garage.herokuapp.com',
      docs: 'https://github.com/yourusername/abe-garage#readme'
    },
    stats: {
      stars: 0,
      forks: 0,
      views: 0,
      linesOfCode: 35000,
      commits: 0,
      branches: 0
    },
    challenges: [
      {
        title: 'Quantifying business value and ROI',
        solution: 'Conducted thorough workflow analysis, interviewed stakeholders, calculated time savings and revenue increases based on realistic assumptions, resulting in a $445,750 value proposition.'
      },
      {
        title: 'Designing microservices architecture for small scale',
        solution: 'Created loosely coupled services (Auth, Employees, Customers, Orders, Services, Vehicles) that can run on a single server but are structured for easy separation as the business grows.'
      },
      {
        title: 'Implementing secure order tracking without login',
        solution: 'Generated unique order hashes using UUID v4, stored in database with expiration, and created public route /order/:hash for customers to check status without authentication.'
      },
      {
        title: 'Role-based access control with JWT',
        solution: 'Implemented JWT tokens with role claims, middleware to check permissions for each route, and different dashboard views based on user role (Admin, Manager, Staff).'
      }
    ],
    complexity: 'high'
  },
 
    // {
    //   id: 3,
    //   title: 'AI-Powered Analytics Dashboard',
    //   type: 'frontend',
    //   featured: false,
    //   date: '2024-02-01',
    //   duration: '1.5 months',
    //   teamSize: 1,
    //   status: 'in-progress',
    //   progress: 75,
    //   shortDescription: 'Dashboard for visualizing AI model predictions with interactive charts and real-time data.',
    //   fullDescription: 'An advanced analytics dashboard built with React and TypeScript for visualizing machine learning model predictions and real-time data streams.',
    //   technologies: ['React', 'TypeScript', 'D3.js', 'Chart.js', 'Tailwind'],
    //   features: [
    //     'Interactive data visualizations',
    //     'Real-time data updates',
    //     'Custom chart configurations',
    //     'Export functionality',
    //     'Responsive design'
    //   ],
    //   images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop'],
    //   stats: {
    //     stars: 18,
    //     forks: 5,
    //     views: 560,
    //     linesOfCode: 6500,
    //     commits: 67,
    //     branches: 4
    //   },
    //   challenges: [
    //     {
    //       title: 'Real-time data synchronization',
    //       solution: 'Implemented WebSocket connections with automatic reconnection'
    //     }
    //   ],
    //   complexity: 'high'
    // },
    {
  "id": 5,
  "title": "AI Personal Agent - Full Stack SaaS Application",
  "type": "fullstack",
  "featured": true,
  "date": "2024-01-15",
  "duration": "6 months",
  "teamSize": 1,
  "status": "completed",
  "progress": 100,
  "shortDescription": "A comprehensive AI-powered personal assistant SaaS that connects Gmail, WhatsApp, Calendar, and Slack to provide intelligent briefings, alerts, AI email drafting, smart replies, and real-time notifications.",
  "fullDescription": `A full-stack AI-powered personal assistant SaaS application that revolutionizes personal productivity and communication management with:

    • AI-Powered Email Management: Intelligent priority inbox with Gemini AI classification, smart replies, and automated email drafting with multiple tones
    • Multi-Platform Integration: Seamless connection to Gmail, WhatsApp, Google Calendar, and Slack with real-time synchronization
    • Real-Time Notifications: WebSocket-based live notifications, typing indicators, and online/offline presence
    • Advanced Analytics Dashboard: Comprehensive metrics including productivity scores, communication patterns, streaks, and AI-generated recommendations
    • Email Templates System: AI-generated templates with variable support, categories, and usage tracking
    • Meeting Intelligence: Auto-scheduling, AI-generated meeting agendas, and automated follow-up emails
    • Priority Inbox: AI-powered email classification with priority and category detection (work/personal/social/promotional)
    • Automated Daily Briefings: AI-generated summaries of emails, messages, and calendar events with actionable items
    • Real-Time Activity Feed: Live updates of all user activities across platforms
    • Complete Authentication: Clerk-powered authentication with JWT and role-based access control

The system handles complex integrations with multiple external APIs and includes comprehensive analytics with visual dashboards and AI-powered insights.`,
  "technologies": [
    "Next.js 16.2.9",
    "React 19.2.4",
    "TypeScript",
    "Tailwind CSS",
    "Clerk Authentication",
    "Convex (Backend)",
    "Google Gemini AI",
    "Gmail API",
    "WhatsApp (Baileys)",
    "Google Calendar API",
    "Socket.IO",
    "Slack API",
    "Date-fns",
    "Lucide Icons"
  ],
  "features": [
    "AI-Powered Email Management with priority inbox and Gemini classification",
    "Multi-Platform Integration (Gmail, WhatsApp, Calendar, Slack)",
    "Real-Time Notifications with WebSocket live updates",
    "Advanced Analytics Dashboard with productivity scores and streaks",
    "AI-Generated Email Templates with variable support and categories",
    "Meeting Intelligence (Auto-scheduling, agendas, follow-ups)",
    "Priority Inbox with AI classification and category detection",
    "Automated Daily Briefings with actionable items",
    "Real-Time Activity Feed with live updates",
    "Smart Email Drafting with multiple tones and AI generation",
    "WhatsApp Integration with QR code scanning and real-time messaging",
    "Calendar Integration with event management and smart scheduling",
    "Email Templates System with usage tracking and favorites",
    "Analytics Dashboard with communication patterns and insights",
    "Complete Authentication with Clerk and JWT",
    "Real-Time Typing Indicators and Online/Offline Presence",
    "Advanced Security with encrypted tokens and secure OAuth",
    "Responsive Dashboard with modern UI/UX",
    "Dark/Light Mode Support"
  ],
  "images": [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop"
  ],
  "video": null,
  "links": {
    "github": "https://github.com/Enat-Ena-Liji/personal-ai-agent",
    "demo": "https://personal-ai-agent.vercel.app",
    "docs": "https://github.com/Enat-Ena-Liji/personal-ai-agent#readme"
  },
  "stats": {
    "stars": 0,
    "forks": 0,
    "views": 0,
    "linesOfCode": 45000,
    "commits": 0,
    "branches": 0
  },
  "challenges": [
    {
      "title": "Complex Multi-Platform Integration",
      "solution": "Implemented unified platform services with standardized interfaces for Gmail, WhatsApp, Calendar, and Slack. Used OAuth 2.0 for Google services and Baileys library for WhatsApp, with real-time synchronization and error handling."
    },
    {
      "title": "Real-Time Communication",
      "solution": "Built WebSocket server using Socket.IO for real-time messaging, typing indicators, and presence detection. Implemented automatic reconnection and offline message queuing."
    },
    {
      "title": "AI-Powered Email Classification",
      "solution": "Integrated Google Gemini AI for priority and category classification with custom prompts for accurate detection of work, personal, social, and promotional emails."
    },
    {
      "title": "Multi-Platform Authentication",
      "solution": "Used Clerk for unified authentication across all platforms with OAuth providers and JWT token management for secure API access."
    },
    {
      "title": "Real-Time Data Synchronization",
      "solution": "Leveraged Convex as backend with real-time subscriptions for instant updates across all connected clients, ensuring consistent data states."
    }
  ],
  "complexity": "high"
},
    // {
    //   id: 4,
    //   title: 'Task Management System',
    //   type: 'fullstack',
    //   featured: false,
    //   date: '2023-09-10',
    //   duration: '1 month',
    //   teamSize: 1,
    //   status: 'completed',
    //   progress: 100,
    //   shortDescription: 'Collaborative task management system with drag-and-drop interface.',
    //   fullDescription: 'A collaborative task management system with drag-and-drop functionality, team collaboration features, and real-time updates.',
    //   technologies: ['React', 'Node.js', 'PostgreSQL', 'Express'],
    //   features: [
    //     'Drag-and-drop interface',
    //     'Team collaboration',
    //     'Real-time updates',
    //     'File attachments',
    //     'Progress tracking'
    //   ],
    //   images: ['https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&auto=format&fit=crop'],
    //   stats: {
    //     stars: 25,
    //     forks: 6,
    //     views: 720,
    //     linesOfCode: 5000,
    //     commits: 82,
    //     branches: 3
    //   },
    //   challenges: [
    //     {
    //       title: 'Drag-and-drop performance',
    //       solution: 'Optimized with React DnD and virtual scrolling'
    //     }
    //   ],
    //   complexity: 'medium'
    // },
    {
      id: 6,
      title: 'Weather Forecast App',
      type: 'mobile',
      featured: false,
      date: '2023-07-15',
      duration: '3 weeks',
      teamSize: 1,
      status: 'completed',
      progress: 100,
      shortDescription: 'Mobile weather application with location-based forecasts and alerts.',
      fullDescription: 'A mobile weather application built with React Native that provides location-based forecasts, severe weather alerts, and beautiful UI.',
      technologies: ['React Native', 'Expo', 'OpenWeather API'],
      features: [
        'Location-based forecasts',
        'Severe weather alerts',
        'Beautiful UI/UX',
        'Offline functionality',
        'Push notifications'
      ],
      images: ['https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&auto=format&fit=crop'],
       links: {
        github: 'https://github.com',
        demo: 'https://weather-condition-one.vercel.app',
        docs: null
      },
      stats: {
        stars: 15,
        forks: 4,
        views: 430,
        linesOfCode: 3500,
        commits: 45,
        branches: 2
      },
      challenges: [
        {
          title: 'Offline data synchronization',
          solution: 'Implemented local storage with periodic sync'
        }
      ],
      complexity: 'low'
    },
    {
      id: 7,
      title: 'Blog Platform API',
      type: 'backend',
      featured: false,
      date: '2023-05-20',
      duration: '2 weeks',
      teamSize: 1,
      status: 'completed',
      progress: 100,
      shortDescription: 'RESTful API for a blog platform with authentication and CRUD operations.',
      fullDescription: 'A comprehensive RESTful API for a blog platform with authentication, CRUD operations, comment system, and admin panel.',
      technologies: ['Node.js', 'Express', 'MongoDB', 'JWT'],
      features: [
        'User authentication',
        'CRUD operations',
        'Comment system',
        'Admin panel',
        'Search functionality'
      ],
      images: ['https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop'],
      stats: {
        stars: 20,
        forks: 3,
        views: 380,
        linesOfCode: 2800,
        commits: 32,
        branches: 2
      },
      challenges: [
        {
          title: 'Authentication security',
          solution: 'Implemented JWT with refresh tokens and rate limiting'
        }
      ],
      complexity: 'medium'
    },
      {
      id: 8,
      title: 'Real-Time Chat Application',
      type: 'fullstack',
      featured: true,
      date: '2023-11-20',
      duration: '2 months',
      teamSize: 2,
      status: 'completed',
      progress: 100,
      shortDescription: 'Real-time messaging application with WebSocket implementation and media sharing.',
      fullDescription: 'A real-time chat application built with React, Node.js, and Socket.io. Features include instant messaging, file sharing, user presence indicators, and message history.',
      technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'JWT'],
      features: [
        'Real-time messaging',
        'File and image sharing',
        'User presence indicators',
        'Message history',
        'Private and group chats'
      ],
      images: ['https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop'],
      video: null,
      links: {
        github: 'https://github.com',
        demo: 'https://text-to-speech-converter-ivory.vercel.app/',
        docs: null
      },
      stats: {
        stars: 32,
        forks: 8,
        views: 890,
        linesOfCode: 8000,
        commits: 98,
        branches: 5
      },
      challenges: [
        {
          title: 'Scalability for concurrent users',
          solution: 'Implemented Redis for session management and message queuing'
        }
      ],
      complexity: 'medium'
    },


    // {
    //   id: 7,
    //   title: 'Portfolio Website',
    //   type: 'frontend',
    //   featured: false,
    //   date: '2023-03-01',
    //   duration: '2 weeks',
    //   teamSize: 1,
    //   status: 'completed',
    //   progress: 100,
    //   shortDescription: 'Personal portfolio website with interactive animations and responsive design.',
    //   fullDescription: 'A modern portfolio website with interactive animations, responsive design, and performance optimizations.',
    //   technologies: ['React', 'Framer Motion', 'CSS3', 'Vite'],
    //   features: [
    //     'Interactive animations',
    //     'Responsive design',
    //     'Performance optimized',
    //     'SEO friendly',
    //     'Accessibility compliant'
    //   ],
    //   images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop'],
    //   stats: {
    //     stars: 30,
    //     forks: 7,
    //     views: 950,
    //     linesOfCode: 4200,
    //     commits: 54,
    //     branches: 3
    //   },
    //   challenges: [
    //     {
    //       title: 'Animation performance',
    //       solution: 'Used Framer Motion with optimized rendering'
    //     }
    //   ],
    //   complexity: 'low'
    // },

    // {
    //   id: 8,
    //   title: 'E-Learning Platform',
    //   type: 'fullstack',
    //   featured: true,
    //   date: '2023-12-10',
    //   duration: '4 months',
    //   teamSize: 4,
    //   status: 'completed',
    //   progress: 100,
    //   shortDescription: 'Comprehensive e-learning platform with video courses and progress tracking.',
    //   fullDescription: 'A comprehensive e-learning platform with video courses, progress tracking, quizzes, certificates, and instructor dashboards.',
    //   technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Stripe'],
    //   features: [
    //     'Video course hosting',
    //     'Progress tracking',
    //     'Interactive quizzes',
    //     'Certificate generation',
    //     'Instructor dashboards'
    //   ],
    //   images: ['https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop'],
    //   stats: {
    //     stars: 55,
    //     forks: 15,
    //     views: 1800,
    //     linesOfCode: 22000,
    //     commits: 210,
    //     branches: 12
    //   },
    //   challenges: [
    //     {
    //       title: 'Video streaming at scale',
    //       solution: 'Implemented AWS CloudFront with adaptive bitrate streaming'
    //     }
    //   ],
    //   complexity: 'high'
    // },
  
  
  

 

    // {
    //   id: 9,
    //   title: 'Fitness Tracker App',
    //   type: 'mobile',
    //   featured: false,
    //   date: '2024-01-05',
    //   duration: '2 months',
    //   teamSize: 2,
    //   status: 'completed',
    //   progress: 100,
    //   shortDescription: 'Mobile fitness application with workout tracking and progress analytics.',
    //   fullDescription: 'A mobile fitness application with workout tracking, progress analytics, social features, and health integration.',
    //   technologies: ['React Native', 'Firebase', 'Redux'],
    //   features: [
    //     'Workout tracking',
    //     'Progress analytics',
    //     'Social features',
    //     'Health integration',
    //     'Personalized plans'
    //   ],
    //   images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop'],
    //   stats: {
    //     stars: 28,
    //     forks: 9,
    //     views: 810,
    //     linesOfCode: 9200,
    //     commits: 112,
    //     branches: 6
    //   },
    //   challenges: [
    //     {
    //       title: 'Real-time synchronization',
    //       solution: 'Used Firebase Realtime Database with offline support'
    //     }
    //   ],
    //   complexity: 'medium'
    // },
    
 

  ], []);

  useEffect(() => {
    setProjects(mockProjects);
    setFilteredProjects(mockProjects);
    
    // Calculate category counts
    const categoryCounts = categories.reduce((acc, cat) => ({ ...acc, [cat.id]: 0 }), {});
    mockProjects.forEach(project => {
      if (categoryCounts[project.type] !== undefined) {
        categoryCounts[project.type]++;
      }
      categoryCounts.all++;
    });
  }, [mockProjects, categories]);

  useEffect(() => {
    let filtered = [...projects]; 

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.type === selectedCategory);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(query) ||
        project.shortDescription.toLowerCase().includes(query) ||
        project.technologies.some(tech => tech.toLowerCase().includes(query))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case 'stars':
          aValue = a.stats.stars;
          bValue = b.stats.stars;
          break;
        case 'complexity':
          const complexityOrder = { low: 1, medium: 2, high: 3 };
          aValue = complexityOrder[a.complexity] || 0;
          bValue = complexityOrder[b.complexity] || 0;
          break;
        case 'name':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredProjects(filtered);
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, sortBy, sortOrder, projects]);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={styles.heroContent}
          >
            <div className="hero-badge">
              <FaCode />
              <span>Project Gallery</span>
            </div>
            
            <h1 className={styles.heroTitle}>
              Showcase of <span className="highlight">Innovation</span>
            </h1>
            
            <p className={styles.heroSubtitle}>
              Explore my collection of projects that demonstrate technical expertise, 
              problem-solving skills, and passion for software development.
            </p>
          </motion.div>
        </div>
      </section>
 
      {/* Projects Display */}
      <section className={styles.display}>
        <div className="container">
          <div className={styles.displayHeader}>
            <h2 className={styles.displayTitle}>
              Showing {filteredProjects.length} of {projects.length} Projects
            </h2>
          </div>

          <AnimatePresence mode="wait">
            {filteredProjects.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={styles.noProjects}
              >
                <div className={styles.noProjectsIcon}>
                  <FaSearch />
                </div>
                <h3>No projects found</h3>
                <p>Try adjusting your filters or search terms</p>
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                >
                  Clear All Filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={isGridView ? 'grid' : 'list'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`${styles.projectsContainer} ${isGridView ? styles.gridView : styles.listView}`}
              >
                {currentProjects.map(project => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isGridView ? (
                      <ProjectCard project={project} />
                    ) : (
                      <div className={styles.projectListItem}>
                        <div className={styles.listItemHeader}>
                          <div className={styles.itemBadges}>
                            <span className={`${styles.badgeType} ${styles[project.type]}`}>
                              {project.type}
                            </span>
                            {project.featured && (
                              <span className={styles.badgeFeatured}>
                                <FaStar /> Featured
                              </span>
                            )}
                          </div>
                          <div className={styles.itemStats}>
                            <span className={styles.stat}>
                              <FaStar /> {project.stats.stars}
                            </span>
                          </div>
                        </div>
                        
                        <div className={styles.listItemContent}>
                          <h3 className={styles.itemTitle}>{project.title}</h3>
                          <p className={styles.itemDescription}>{project.shortDescription}</p>
                          
                          <div className={styles.itemTech}>
                            {project.technologies.slice(0, 5).map(tech => (
                              <span key={tech} className={styles.techTag}>
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 5 && (
                              <span className={styles.techMore}>
                                +{project.technologies.length - 5}
                              </span>
                            )}
                          </div>
                          
                          <div className={styles.itemMeta}>
                            <span className={styles.metaItem}>
                              <FaCalendarAlt /> {new Date(project.date).toLocaleDateString()}
                            </span>
                            <span className={styles.metaItem}>
                              Duration: {project.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination */}
          {filteredProjects.length > projectsPerPage && (
            <div className={styles.pagination}>
              <button
                className={styles.paginationBtn}
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              
              <div className={styles.paginationNumbers}>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page => 
                    page === 1 || 
                    page === totalPages || 
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  )
                  .map((page, index, array) => {
                    if (index > 0 && page - array[index - 1] > 1) {
                      return (
                        <React.Fragment key={`ellipsis-${page}`}>
                          <span className={styles.paginationEllipsis}>...</span>
                          <button
                            className={`${styles.paginationNumber} ${currentPage === page ? styles.active : ''}`}
                            onClick={() => paginate(page)}
                          >
                            {page}
                          </button>
                        </React.Fragment>
                      );
                    }
                    
                    return (
                      <button
                        key={page}
                        className={`${styles.paginationNumber} ${currentPage === page ? styles.active : ''}`}
                        onClick={() => paginate(page)}
                      >
                        {page}
                      </button>
                    );
                  })}
              </div>
              
              <button
                className={styles.paginationBtn}
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.ctaContent}
          >
            <h2 className={styles.ctaTitle}>Have a Project in Mind?</h2>
            <p className={styles.ctaDescription}>
              I'm always open to discussing new opportunities and interesting projects.
              Let's bring your ideas to life!
            </p>
            <div className={styles.ctaActions}>
              <a href="/contact" className="btn btn-primary">
                Start a Conversation
              </a>
              <a href="/skills" className="btn btn-outline">
                View My Skills
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
