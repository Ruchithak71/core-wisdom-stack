
import { User, Category, Tag, Document, Comment, AnalyticData } from '../types';
import { FileText, Code, Server, Lightbulb, Users, Headphones } from 'lucide-react';

// Users
export const users: User[] = [
  { id: '1', name: 'Ruchitha', email: 'ruchitha@example.com', role: 'admin' },
  { id: '2', name: 'Adithi', email: 'adithi@example.com', role: 'editor' },
  { id: '3', name: 'Nithya', email: 'nithya@example.com', role: 'editor' },
  { id: '4', name: 'Harini', email: 'harini@example.com', role: 'viewer' },
  { id: '5', name: 'Guest User', email: 'guest@example.com', role: 'viewer' },
];

// Categories
export const categories: Category[] = [
  { 
    id: '1', 
    name: 'Product & Technology', 
    description: 'Technical documentation, product roadmaps, and specifications',
    icon: 'FileText'
  },
  { 
    id: '2', 
    name: 'Research & Innovation', 
    description: 'Research findings, exploratory projects, and innovation initiatives',
    icon: 'Lightbulb'
  },
  { 
    id: '3', 
    name: 'Product Documentation', 
    description: 'User guides, product manuals, and feature documentation',
    icon: 'Code'
  },
  { 
    id: '4', 
    name: 'DevOps & Infrastructure', 
    description: 'Infrastructure details, deployment guides, and IT processes',
    icon: 'Server'
  },
  { 
    id: '5', 
    name: 'Sales, Marketing & Customer Support', 
    description: 'Marketing materials, sales playbooks, and support processes',
    icon: 'Users'
  },
];

// Tags
export const tags: Tag[] = [
  { id: '1', name: 'Architecture' },
  { id: '2', name: 'API' },
  { id: '3', name: 'Frontend' },
  { id: '4', name: 'Backend' },
  { id: '5', name: 'Database' },
  { id: '6', name: 'DevOps' },
  { id: '7', name: 'Security' },
  { id: '8', name: 'UX' },
  { id: '9', name: 'Performance' },
  { id: '10', name: 'Testing' },
];

// Documents
export const documents: Document[] = [
  {
    id: '1',
    title: 'System Architecture Overview',
    content: 'This document provides a comprehensive overview of our system architecture, including the tech stack, data flow, and integration points.',
    author: users[0],
    createdAt: '2023-08-10T08:00:00Z',
    updatedAt: '2023-08-15T09:30:00Z',
    category: categories[0],
    tags: [tags[0], tags[1], tags[4]],
    views: 145,
    likes: 32
  },
  {
    id: '2',
    title: 'Frontend Development Guidelines',
    content: 'Best practices, coding standards, and guidelines for frontend development across our organization.',
    author: users[1],
    createdAt: '2023-07-22T11:20:00Z',
    updatedAt: '2023-07-28T14:15:00Z',
    category: categories[0],
    tags: [tags[2], tags[7], tags[9]],
    views: 98,
    likes: 24
  },
  {
    id: '3',
    title: 'API Documentation',
    content: 'Complete reference for all API endpoints, request/response formats, authentication, and error handling.',
    author: users[2],
    createdAt: '2023-09-05T13:45:00Z',
    updatedAt: '2023-09-12T16:20:00Z',
    category: categories[2],
    tags: [tags[1], tags[3], tags[6]],
    views: 210,
    likes: 45
  },
  {
    id: '4',
    title: 'Database Schema Documentation',
    content: 'Detailed documentation of our database schema, including tables, relationships, constraints, and indexing strategy.',
    author: users[0],
    createdAt: '2023-06-18T09:10:00Z',
    updatedAt: '2023-06-20T11:05:00Z',
    category: categories[0],
    tags: [tags[4], tags[8]],
    views: 87,
    likes: 19
  },
  {
    id: '5',
    title: 'Product Roadmap 2023-2024',
    content: 'Strategic roadmap for product development, including upcoming features, enhancements, and timeline.',
    author: users[1],
    createdAt: '2023-05-30T15:30:00Z',
    updatedAt: '2023-06-02T17:20:00Z',
    category: categories[2],
    tags: [tags[2], tags[7]],
    views: 176,
    likes: 38
  },
  {
    id: '6',
    title: 'Security Best Practices',
    content: 'Security guidelines, protocols, and best practices for development, deployment, and operations.',
    author: users[3],
    createdAt: '2023-04-15T10:25:00Z',
    updatedAt: '2023-04-22T14:40:00Z',
    category: categories[3],
    tags: [tags[6], tags[5]],
    views: 122,
    likes: 41
  },
  {
    id: '7',
    title: 'CI/CD Pipeline Setup',
    content: 'Step-by-step guide for setting up and configuring our continuous integration and deployment pipeline.',
    author: users[2],
    createdAt: '2023-03-08T12:15:00Z',
    updatedAt: '2023-03-15T16:10:00Z',
    category: categories[3],
    tags: [tags[5], tags[9]],
    views: 95,
    likes: 27
  },
  {
    id: '8',
    title: 'Customer Onboarding Process',
    content: 'Detailed workflow and guidelines for customer onboarding, including documentation, training, and support.',
    author: users[3],
    createdAt: '2023-02-20T09:50:00Z',
    updatedAt: '2023-02-28T13:25:00Z',
    category: categories[4],
    tags: [tags[7]],
    views: 110,
    likes: 22
  },
  {
    id: '9',
    title: 'AI Feature Research Findings',
    content: 'Summary of research findings for implementing AI-driven features in our product, including POCs and recommendations.',
    author: users[0],
    createdAt: '2023-01-12T11:40:00Z',
    updatedAt: '2023-01-18T15:35:00Z',
    category: categories[1],
    tags: [tags[0], tags[8]],
    views: 154,
    likes: 36
  },
  {
    id: '10',
    title: 'Marketing Campaign Strategy',
    content: 'Comprehensive strategy for upcoming marketing campaigns, including target audience, channels, and metrics.',
    author: users[1],
    createdAt: '2022-12-05T14:20:00Z',
    updatedAt: '2022-12-12T17:15:00Z',
    category: categories[4],
    tags: [],
    views: 89,
    likes: 17
  }
];

// Comments
export const comments: Comment[] = [
  {
    id: '1',
    content: 'This is exactly what I was looking for. Thanks for the detailed documentation.',
    author: users[3],
    createdAt: '2023-08-16T10:15:00Z',
    documentId: '1'
  },
  {
    id: '2',
    content: 'Could you please clarify the section about database indexing strategy?',
    author: users[2],
    createdAt: '2023-06-21T14:30:00Z',
    documentId: '4'
  },
  {
    id: '3',
    content: 'Great overview. I would suggest adding more details about the error handling mechanism.',
    author: users[1],
    createdAt: '2023-09-13T11:45:00Z',
    documentId: '3'
  },
  {
    id: '4',
    content: 'The deployment pipeline configuration isn't working as described. I'm getting an error at the validation step.',
    author: users[3],
    createdAt: '2023-03-16T09:20:00Z',
    documentId: '7'
  },
  {
    id: '5',
    content: 'This has been incredibly helpful for our team's onboarding process. Thank you!',
    author: users[0],
    createdAt: '2023-03-01T15:50:00Z',
    documentId: '8'
  }
];

// Analytics Data
export const analyticsData: AnalyticData = {
  mostViewedDocs: [
    { title: 'API Documentation', views: 210 },
    { title: 'Product Roadmap 2023-2024', views: 176 },
    { title: 'AI Feature Research Findings', views: 154 },
    { title: 'System Architecture Overview', views: 145 },
    { title: 'Security Best Practices', views: 122 }
  ],
  categoryDistribution: [
    { name: 'Product & Technology', count: 3 },
    { name: 'Research & Innovation', count: 1 },
    { name: 'Product Documentation', count: 2 },
    { name: 'DevOps & Infrastructure', count: 2 },
    { name: 'Sales, Marketing & Customer Support', count: 2 }
  ],
  activityOverTime: [
    { date: '2022-12', documents: 1, comments: 0 },
    { date: '2023-01', documents: 1, comments: 0 },
    { date: '2023-02', documents: 1, comments: 1 },
    { date: '2023-03', documents: 1, comments: 1 },
    { date: '2023-04', documents: 1, comments: 0 },
    { date: '2023-05', documents: 1, comments: 0 },
    { date: '2023-06', documents: 1, comments: 1 },
    { date: '2023-07', documents: 1, comments: 0 },
    { date: '2023-08', documents: 1, comments: 1 },
    { date: '2023-09', documents: 1, comments: 1 }
  ],
  topContributors: [
    { name: 'Ruchitha', contributions: 4 },
    { name: 'Adithi', contributions: 3 },
    { name: 'Nithya', contributions: 2 },
    { name: 'Harini', contributions: 1 }
  ]
};

// Current user for demo purposes
export const currentUser: User = users[0];
