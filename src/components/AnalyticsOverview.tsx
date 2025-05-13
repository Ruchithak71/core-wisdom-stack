
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { AnalyticData } from '@/types';

interface AnalyticsOverviewProps {
  data: AnalyticData;
}

const AnalyticsOverview: React.FC<AnalyticsOverviewProps> = ({ data }) => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Activity Over Time</CardTitle>
          <CardDescription>Document and comment activity by month</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.activityOverTime}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="documents" name="Documents" fill="#0284c7" />
              <Bar dataKey="comments" name="Comments" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Most Viewed Documents</CardTitle>
          <CardDescription>Top documents by view count</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {data.mostViewedDocs.map((doc, index) => (
              <li key={index} className="flex justify-between items-center">
                <span className="text-sm truncate max-w-[200px]">{doc.title}</span>
                <span className="text-sm text-muted-foreground">{doc.views} views</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Contributors</CardTitle>
          <CardDescription>Users with most contributions</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {data.topContributors.map((contributor, index) => (
              <li key={index} className="flex justify-between items-center">
                <span className="text-sm">{contributor.name}</span>
                <span className="text-sm text-muted-foreground">{contributor.contributions} docs</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsOverview;
