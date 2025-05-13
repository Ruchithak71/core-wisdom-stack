
import React from 'react';
import { documents, categories, users, tags, comments, analyticsData } from '@/data/mockData';
import QuickStats from '@/components/QuickStats';
import CategoryCard from '@/components/CategoryCard';
import RecentDocuments from '@/components/RecentDocuments';
import AnalyticsOverview from '@/components/AnalyticsOverview';

const Dashboard = () => {
  // Get document counts per category
  const categoryDocumentCounts = categories.map(category => {
    const count = documents.filter(doc => doc.category.id === category.id).length;
    return { category, count };
  });

  // Get recent documents (sorted by updated date)
  const recentDocuments = [...documents]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      
      <QuickStats 
        totalDocuments={documents.length}
        totalUsers={users.length}
        totalTags={tags.length}
        totalComments={comments.length}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Knowledge Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categoryDocumentCounts.slice(0, 4).map(({ category, count }) => (
              <CategoryCard 
                key={category.id} 
                category={category} 
                documentCount={count} 
              />
            ))}
          </div>
        </div>
        
        <div className="md:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Recent Updates</h2>
          <RecentDocuments documents={recentDocuments} />
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Analytics Overview</h2>
        <AnalyticsOverview data={analyticsData} />
      </div>
    </div>
  );
};

export default Dashboard;
