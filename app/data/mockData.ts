import { 
  TeamMember, 
  Assignment, 
  Project, 
  Milestone, 
  ExpenseItem, 
  Risk, 
  ResourceWarning,
  WeeklyUpdate
} from '../types';

// Mock team members
export const teamMembers: TeamMember[] = [
  {
    id: "tm1",
    name: "Javier Rodriguez",
    role: "Project Manager",
    skills: ["Leadership", "Revenue Cycle", "Stakeholder Management", "Risk Analysis"],
    certifications: ["PMP", "CAPM", "CHTS-IM"],
    availability: 15,
    imageUrl: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100"
  },
  {
    id: "tm2",
    name: "Sarah Kim",
    role: "Technical Lead",
    skills: ["System Architecture", "Database Design", "API Integration", "Healthcare IT"],
    certifications: ["CISSP", "CHTS-TS", "AWS Solution Architect"],
    availability: 10,
    imageUrl: "https://images.pexels.com/photos/3671083/pexels-photo-3671083.jpeg?auto=compress&cs=tinysrgb&w=100"
  },
  {
    id: "tm3",
    name: "David Chen",
    role: "Frontend Developer",
    skills: ["React", "TypeScript", "UI/UX", "Accessibility"],
    certifications: ["UXPA", "React Certification"],
    availability: 30,
    imageUrl: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=100"
  },
  {
    id: "tm4",
    name: "Lakshmi Patel",
    role: "Backend Developer",
    skills: ["Node.js", "Database", "API Design", "Healthcare Integrations"],
    certifications: ["CHTS-IM", "MongoDB Certified Professional"],
    availability: 20,
    imageUrl: "https://images.pexels.com/photos/3775131/pexels-photo-3775131.jpeg?auto=compress&cs=tinysrgb&w=100"
  },
  {
    id: "tm5",
    name: "Marcus Johnson",
    role: "Business Analyst",
    skills: ["Requirements Gathering", "Process Mapping", "User Stories", "Revenue Cycle"],
    certifications: ["CBAP", "CHTS-PW"],
    availability: 25,
    imageUrl: "https://images.pexels.com/photos/6801642/pexels-photo-6801642.jpeg?auto=compress&cs=tinysrgb&w=100"
  },
  {
    id: "tm6",
    name: "Elena Petrov",
    role: "Quality Assurance",
    skills: ["Test Automation", "Performance Testing", "HIPAA Compliance", "Security Testing"],
    certifications: ["CSTE", "ISTQB-CTFL", "HIPAA Compliance"],
    availability: 40,
    imageUrl: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100"
  },
  {
    id: "tm7",
    name: "Andre Williams",
    role: "Database Administrator",
    skills: ["SQL", "Database Optimization", "Data Security", "HIPAA Compliance"],
    certifications: ["Oracle DBA", "MCTS SQL Server", "HIPAA Security"],
    availability: 30,
    imageUrl: "https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg?auto=compress&cs=tinysrgb&w=100"
  }
];

// Mock projects
export const projects: Project[] = [
  {
    id: "p1",
    name: "Claims Processing Portal",
    description: "Implementation of new claims processing portal for medical billing department",
    startDate: "2025-01-15",
    endDate: "2025-06-30",
    status: "in-progress",
    priority: "critical",
    budget: 450000,
    actualCost: 220000
  },
  {
    id: "p2",
    name: "Insurance Verification System",
    description: "Automated system for real-time insurance eligibility verification",
    startDate: "2025-02-01",
    endDate: "2025-05-15",
    status: "in-progress",
    priority: "high",
    budget: 280000,
    actualCost: 155000
  },
  {
    id: "p3",
    name: "Patient Billing Portal",
    description: "Self-service portal for patients to view and pay medical bills",
    startDate: "2025-03-10",
    endDate: "2025-07-20",
    status: "planning",
    priority: "medium",
    budget: 320000,
    actualCost: 45000
  },
  {
    id: "p4",
    name: "Revenue Cycle Analytics Dashboard",
    description: "Interactive dashboard for monitoring key revenue cycle metrics",
    startDate: "2025-04-01",
    endDate: "2025-08-15",
    status: "planning",
    priority: "high",
    budget: 180000,
    actualCost: 15000
  }
];

// Mock assignments
export const assignments: Assignment[] = [
  { id: "a1", memberId: "tm1", projectId: "p1", allocation: 50, startDate: "2025-01-15", endDate: "2025-06-30" },
  { id: "a2", memberId: "tm1", projectId: "p2", allocation: 35, startDate: "2025-02-01", endDate: "2025-05-15" },
  { id: "a3", memberId: "tm2", projectId: "p1", allocation: 60, startDate: "2025-01-15", endDate: "2025-06-30" },
  { id: "a4", memberId: "tm2", projectId: "p3", allocation: 30, startDate: "2025-03-10", endDate: "2025-07-20" },
  { id: "a5", memberId: "tm3", projectId: "p1", allocation: 30, startDate: "2025-01-15", endDate: "2025-06-30" },
  { id: "a6", memberId: "tm3", projectId: "p3", allocation: 40, startDate: "2025-03-10", endDate: "2025-07-20" },
  { id: "a7", memberId: "tm4", projectId: "p1", allocation: 40, startDate: "2025-01-15", endDate: "2025-06-30" },
  { id: "a8", memberId: "tm4", projectId: "p2", allocation: 40, startDate: "2025-02-01", endDate: "2025-05-15" },
  { id: "a9", memberId: "tm5", projectId: "p1", allocation: 25, startDate: "2025-01-15", endDate: "2025-06-30" },
  { id: "a10", memberId: "tm5", projectId: "p2", allocation: 25, startDate: "2025-02-01", endDate: "2025-05-15" },
  { id: "a11", memberId: "tm5", projectId: "p3", allocation: 25, startDate: "2025-03-10", endDate: "2025-07-20" },
  { id: "a12", memberId: "tm6", projectId: "p1", allocation: 30, startDate: "2025-01-15", endDate: "2025-06-30" },
  { id: "a13", memberId: "tm6", projectId: "p4", allocation: 30, startDate: "2025-04-01", endDate: "2025-08-15" },
  { id: "a14", memberId: "tm7", projectId: "p2", allocation: 40, startDate: "2025-02-01", endDate: "2025-05-15" },
  { id: "a15", memberId: "tm7", projectId: "p3", allocation: 30, startDate: "2025-03-10", endDate: "2025-07-20" }
];

// Mock milestones
export const milestones: Milestone[] = [
  {
    id: "m1",
    projectId: "p1",
    name: "Requirements Gathering",
    description: "Complete requirements gathering and documentation",
    dueDate: "2025-02-15",
    completionDate: "2025-02-18",
    status: "completed",
    dependencies: [],
    isCriticalPath: true
  },
  {
    id: "m2",
    projectId: "p1",
    name: "System Design",
    description: "Complete system architecture and design documentation",
    dueDate: "2025-03-15",
    completionDate: "2025-03-15",
    status: "completed",
    dependencies: ["m1"],
    isCriticalPath: true
  },
  {
    id: "m3",
    projectId: "p1",
    name: "Frontend Development",
    description: "Develop user interface components and screens",
    dueDate: "2025-04-30",
    status: "in-progress",
    dependencies: ["m2"],
    isCriticalPath: true
  },
  {
    id: "m4",
    projectId: "p1",
    name: "Backend Development",
    description: "Develop API and database components",
    dueDate: "2025-04-30",
    status: "in-progress",
    dependencies: ["m2"],
    isCriticalPath: true
  },
  {
    id: "m5",
    projectId: "p1",
    name: "Testing",
    description: "Complete system and user acceptance testing",
    dueDate: "2025-05-30",
    status: "pending",
    dependencies: ["m3", "m4"],
    isCriticalPath: true
  },
  {
    id: "m6",
    projectId: "p1",
    name: "Deployment",
    description: "Deploy to production environment",
    dueDate: "2025-06-15",
    status: "pending",
    dependencies: ["m5"],
    isCriticalPath: true
  },
  {
    id: "m7",
    projectId: "p2",
    name: "Requirements Gathering",
    description: "Complete requirements gathering and documentation",
    dueDate: "2025-02-20",
    completionDate: "2025-02-22",
    status: "completed",
    dependencies: [],
    isCriticalPath: true
  },
  {
    id: "m8",
    projectId: "p2",
    name: "System Design",
    description: "Complete system architecture and design documentation",
    dueDate: "2025-03-10",
    completionDate: "2025-03-15",
    status: "completed",
    dependencies: ["m7"],
    isCriticalPath: true
  },
  {
    id: "m9",
    projectId: "p2",
    name: "Integration Development",
    description: "Develop integration with insurance providers",
    dueDate: "2025-04-15",
    status: "in-progress",
    dependencies: ["m8"],
    isCriticalPath: true
  },
  {
    id: "m10",
    projectId: "p2",
    name: "Testing",
    description: "Complete system and user acceptance testing",
    dueDate: "2025-05-01",
    status: "pending",
    dependencies: ["m9"],
    isCriticalPath: true
  }
];

// Mock expense items
export const expenses: ExpenseItem[] = [
  {
    id: "e1",
    projectId: "p1",
    category: "labor",
    description: "Developer salaries - January",
    budgetedAmount: 75000,
    actualAmount: 72000,
    date: "2025-01-31"
  },
  {
    id: "e2",
    projectId: "p1",
    category: "labor",
    description: "Developer salaries - February",
    budgetedAmount: 75000,
    actualAmount: 76500,
    date: "2025-02-28"
  },
  {
    id: "e3",
    projectId: "p1",
    category: "labor",
    description: "Developer salaries - March",
    budgetedAmount: 75000,
    actualAmount: 75000,
    date: "2025-03-31"
  },
  {
    id: "e4",
    projectId: "p1",
    category: "software",
    description: "Development tools licenses",
    budgetedAmount: 15000,
    actualAmount: 16200,
    date: "2025-01-15"
  },
  {
    id: "e5",
    projectId: "p1",
    category: "vendor",
    description: "Third-party API integration services",
    budgetedAmount: 30000,
    actualAmount: 28000,
    date: "2025-02-15"
  },
  {
    id: "e6",
    projectId: "p2",
    category: "labor",
    description: "Developer salaries - February",
    budgetedAmount: 50000,
    actualAmount: 52000,
    date: "2025-02-28"
  },
  {
    id: "e7",
    projectId: "p2",
    category: "labor",
    description: "Developer salaries - March",
    budgetedAmount: 50000,
    actualAmount: 50000,
    date: "2025-03-31"
  },
  {
    id: "e8",
    projectId: "p2",
    category: "hardware",
    description: "Server infrastructure",
    budgetedAmount: 25000,
    actualAmount: 24500,
    date: "2025-02-10"
  },
  {
    id: "e9",
    projectId: "p2",
    category: "vendor",
    description: "Insurance API subscription",
    budgetedAmount: 35000,
    actualAmount: 35000,
    date: "2025-02-15"
  },
  {
    id: "e10",
    projectId: "p3",
    category: "labor",
    description: "Developer salaries - March",
    budgetedAmount: 45000,
    actualAmount: 45000,
    date: "2025-03-31"
  }
];

// Mock risks
export const risks: Risk[] = [
  {
    id: "r1",
    projectId: "p1",
    category: "resource",
    description: "Potential shortage of frontend developers",
    impact: "high",
    probability: "medium",
    status: "identified",
    mitigation: "Consider contract resources or re-prioritize assignments"
  },
  {
    id: "r2",
    projectId: "p1",
    category: "compliance",
    description: "HIPAA compliance requirements for data handling",
    impact: "critical",
    probability: "high",
    status: "mitigated",
    mitigation: "Engaged compliance officer for review; implemented recommended controls"
  },
  {
    id: "r3",
    projectId: "p1",
    category: "schedule",
    description: "API integration may take longer than estimated",
    impact: "medium",
    probability: "high",
    status: "identified",
    mitigation: "Early prototype to validate integration approach"
  },
  {
    id: "r4",
    projectId: "p2",
    category: "skill",
    description: "Team lacks experience with new insurance verification APIs",
    impact: "high",
    probability: "medium",
    status: "mitigated",
    mitigation: "Training scheduled; expert consultant engaged"
  },
  {
    id: "r5",
    projectId: "p2",
    category: "budget",
    description: "Third-party vendor costs may increase",
    impact: "medium",
    probability: "low",
    status: "identified",
    mitigation: "Lock in rates with contract; explore alternative vendors"
  },
  {
    id: "r6",
    projectId: "p3",
    category: "resource",
    description: "Database administrator overallocated across projects",
    impact: "medium",
    probability: "high",
    status: "escalated",
    mitigation: "Request additional DBA resources or adjust project timeline"
  }
];

// Mock resource warnings
export const resourceWarnings: ResourceWarning[] = [
  {
    id: "w1",
    type: "overallocation",
    description: "Javier Rodriguez is allocated at 85% across projects",
    severity: "medium",
    affectedProjects: ["p1", "p2"],
    affectedMembers: ["tm1"],
    recommendation: "Reduce allocation on Project P2 or delegate some responsibilities"
  },
  {
    id: "w2",
    type: "skill-gap",
    description: "Insufficient HIPAA compliance expertise for Patient Billing Portal",
    severity: "high",
    affectedProjects: ["p3"],
    recommendation: "Assign Elena Petrov to project P3 or provide HIPAA training to team members"
  },
  {
    id: "w3",
    type: "shortage",
    description: "Frontend development resources insufficient for upcoming milestones",
    severity: "high",
    affectedProjects: ["p1", "p3"],
    recommendation: "Prioritize Project P1 frontend tasks; consider hiring contractor for Project P3"
  },
  {
    id: "w4",
    type: "compliance",
    description: "Compliance audit required before Patient Billing Portal launch",
    severity: "critical",
    affectedProjects: ["p3"],
    recommendation: "Schedule compliance review by May 15; allocate Elena Petrov to lead audit preparation"
  }
];

// Mock weekly updates
export const weeklyUpdates: WeeklyUpdate[] = [
  {
    id: "wu1",
    week: "Week of April 10, 2025",
    highlights: [
      "Claims Processing Portal frontend development ahead of schedule",
      "Insurance Verification System integration testing started",
      "Patient Billing Portal requirements finalized"
    ],
    issues: [
      "Database administrator resource constraint affecting all projects",
      "HIPAA compliance expertise needed for Patient Billing Portal"
    ],
    recommendations: [
      "Hire contract database administrator for next 3 months",
      "Shift Elena Petrov to Patient Billing Portal for compliance work"
    ],
    date: "2025-04-10"
  },
  {
    id: "wu2",
    week: "Week of April 3, 2025",
    highlights: [
      "Claims Processing Portal system design completed on schedule",
      "Insurance Verification System development progressing as planned",
      "Revenue Cycle Analytics Dashboard kickoff meeting held"
    ],
    issues: [
      "Frontend development resources stretched across projects",
      "Project Manager overallocated across multiple projects"
    ],
    recommendations: [
      "Prioritize Claims Processing Portal for frontend resources",
      "Delegate Project P2 daily management to Technical Lead"
    ],
    date: "2025-04-03"
  }
];