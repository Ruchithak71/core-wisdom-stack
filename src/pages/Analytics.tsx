
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Bar, 
  BarChart, 
  Line, 
  LineChart, 
  Pie, 
  PieChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend,
  Cell
} from 'recharts';
import { analyticsData, documents, categories } from '@/data/mockData';

const COLORS = ['#0284c7', '#0ea5e9', '#38bdf8', '#7dd3fc', '#bae6fd'];

const AnalyticsPage = () => {
  // Create category distribution data
  const categoryData = categories.map((category, index) => {
    const count = documents.filter(doc => doc.category.id === category.id).length;
    return {
      name: category.name,
      value: count,
      color: COLORS[index % COLORS.length]
    };
  });
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Most Viewed Documents */}
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Most Viewed Documents</CardTitle>
            <CardDescription>Documents with the highest view counts</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.mostViewedDocs}>
                <XAxis dataKey="title" angle={-45} textAnchor="end" height={70} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="#0ea5e9" name="Views" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Activity Over Time */}
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Activity Over Time</CardTitle>
            <CardDescription>Document and comment activity by month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData.activityOverTime}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="documents" stroke="#0284c7" name="Documents" />
                <Line type="monotone" dataKey="comments" stroke="#38bdf8" name="Comments" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Top Contributors */}
        <Card>
          <CardHeader>
            <CardTitle>Top Contributors</CardTitle>
            <CardDescription>Users with the most contributions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={analyticsData.topContributors} layout="vertical">
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="contributions" fill="#0ea5e9" name="Contributions">
                  {analyticsData.topContributors.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
            <CardDescription>Document distribution across categories</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <div className="w-full h-[250px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
          <CardDescription>Important trends and patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-medium text-lg">Content Growth</h3>
              <p className="text-sm text-muted-foreground">
                The knowledge base has shown consistent growth with an average of 1 new document per month.
                Most active categories are Product & Technology and Product Documentation.
              </p>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-medium text-lg">User Engagement</h3>
              <p className="text-sm text-muted-foreground">
                API Documentation has received the highest engagement with 210 views.
                Comment activity has been steady, with at least one new comment per month.
              </p>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-medium text-lg">Top Contributors</h3>
              <p className="text-sm text-muted-foreground">
                Ruchitha has been the most active contributor with 4 documents,
                followed by Adithi with 3 documents.
              </p>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-medium text-lg">Knowledge Distribution</h3>
              <p className="text-sm text-muted-foreground">
                There's an opportunity to expand content in the Research & Innovation category,
                which currently has the fewest documents.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;
