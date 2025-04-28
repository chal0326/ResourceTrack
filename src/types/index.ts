// Define types for our application

// Personnel types
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  skills: string[];
  certifications: string[];
  availability: number; // Percentage of time available
  imageUrl?: string;
}

export interface Assignment {
  id: string;
  memberId: string;
  projectId: string;
  allocation: number; // Percentage of time allocated
  startDate: string;
  endDate: string;
}

// Project types
export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'planning' | 'in-progress' | 'on-hold' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  budget: number;
  actualCost: number;
}

export interface Milestone {
  id: string;
  projectId: string;
  name: string;
  description: string;
  dueDate: string;
  completionDate?: string;
  status: 'pending' | 'in-progress' | 'completed' | 'delayed';
  dependencies: string[]; // IDs of milestones this depends on
  isCriticalPath: boolean;
}

// Budget types
export interface ExpenseItem {
  id: string;
  projectId: string;
  category: 'labor' | 'hardware' | 'software' | 'vendor' | 'other';
  description: string;
  budgetedAmount: number;
  actualAmount: number;
  date: string;
}

// Risk types
export interface Risk {
  id: string;
  projectId: string;
  category: 'resource' | 'skill' | 'schedule' | 'compliance' | 'budget';
  description: string;
  impact: 'low' | 'medium' | 'high' | 'critical';
  probability: 'low' | 'medium' | 'high';
  status: 'identified' | 'mitigated' | 'resolved' | 'escalated';
  mitigation?: string;
}

export interface ResourceWarning {
  id: string;
  type: 'shortage' | 'skill-gap' | 'overallocation' | 'compliance';
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  affectedProjects: string[]; // Project IDs
  affectedMembers?: string[]; // Member IDs if applicable
  recommendation: string;
}

// Dashboard types
export interface WeeklyUpdate {
  id: string;
  week: string;
  highlights: string[];
  issues: string[];
  recommendations: string[];
  date: string;
}