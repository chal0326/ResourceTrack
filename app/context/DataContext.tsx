import React, { createContext, useContext, useState, ReactNode } from 'react';
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
import {
  teamMembers as initialTeamMembers,
  assignments as initialAssignments,
  projects as initialProjects,
  milestones as initialMilestones,
  expenses as initialExpenses,
  risks as initialRisks,
  resourceWarnings as initialResourceWarnings,
  weeklyUpdates as initialWeeklyUpdates
} from '../data/mockData';

interface DataContextType {
  teamMembers: TeamMember[];
  assignments: Assignment[];
  projects: Project[];
  milestones: Milestone[];
  expenses: ExpenseItem[];
  risks: Risk[];
  resourceWarnings: ResourceWarning[];
  weeklyUpdates: WeeklyUpdate[];
  activeSection: string;
  setActiveSection: (section: string) => void;
  activeProject: string | null;
  setActiveProject: (projectId: string | null) => void;
  getTeamMemberById: (id: string) => TeamMember | undefined;
  getProjectById: (id: string) => Project | undefined;
  getMemberAssignments: (memberId: string) => Assignment[];
  getProjectAssignments: (projectId: string) => Assignment[];
  getProjectMilestones: (projectId: string) => Milestone[];
  getProjectExpenses: (projectId: string) => ExpenseItem[];
  getProjectRisks: (projectId: string) => Risk[];
  calculateMemberUtilization: (memberId: string) => number;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [teamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [assignments] = useState<Assignment[]>(initialAssignments);
  const [projects] = useState<Project[]>(initialProjects);
  const [milestones] = useState<Milestone[]>(initialMilestones);
  const [expenses] = useState<ExpenseItem[]>(initialExpenses);
  const [risks] = useState<Risk[]>(initialRisks);
  const [resourceWarnings] = useState<ResourceWarning[]>(initialResourceWarnings);
  const [weeklyUpdates] = useState<WeeklyUpdate[]>(initialWeeklyUpdates);
  const [activeSection, setActiveSection] = useState<string>('dashboard');
  const [activeProject, setActiveProject] = useState<string | null>(null);

  const getTeamMemberById = (id: string) => {
    return teamMembers.find(member => member.id === id);
  };

  const getProjectById = (id: string) => {
    return projects.find(project => project.id === id);
  };

  const getMemberAssignments = (memberId: string) => {
    return assignments.filter(assignment => assignment.memberId === memberId);
  };

  const getProjectAssignments = (projectId: string) => {
    return assignments.filter(assignment => assignment.projectId === projectId);
  };

  const getProjectMilestones = (projectId: string) => {
    return milestones.filter(milestone => milestone.projectId === projectId);
  };

  const getProjectExpenses = (projectId: string) => {
    return expenses.filter(expense => expense.projectId === projectId);
  };

  const getProjectRisks = (projectId: string) => {
    return risks.filter(risk => risk.projectId === projectId);
  };

  const calculateMemberUtilization = (memberId: string) => {
    const memberAssignments = getMemberAssignments(memberId);
    return memberAssignments.reduce((total, assignment) => total + assignment.allocation, 0);
  };

  return (
    <DataContext.Provider
      value={{
        teamMembers,
        assignments,
        projects,
        milestones,
        expenses,
        risks,
        resourceWarnings,
        weeklyUpdates,
        activeSection,
        setActiveSection,
        activeProject,
        setActiveProject,
        getTeamMemberById,
        getProjectById,
        getMemberAssignments,
        getProjectAssignments,
        getProjectMilestones,
        getProjectExpenses,
        getProjectRisks,
        calculateMemberUtilization,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};