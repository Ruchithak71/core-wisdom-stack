
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, Tags, MessageCircle } from 'lucide-react';

interface QuickStatsProps {
  totalDocuments: number;
  totalUsers: number;
  totalTags: number;
  totalComments: number;
}

const QuickStats: React.FC<QuickStatsProps> = ({ 
  totalDocuments, 
  totalUsers, 
  totalTags, 
  totalComments 
}) => {
  const stats = [
    {
      title: 'Total Documents',
      value: totalDocuments,
      icon: <FileText className="h-4 w-4 text-primary" />,
      description: 'Documents in knowledge base'
    },
    {
      title: 'Users',
      value: totalUsers,
      icon: <Users className="h-4 w-4 text-primary" />,
      description: 'Active users'
    },
    {
      title: 'Tags',
      value: totalTags,
      icon: <Tags className="h-4 w-4 text-primary" />,
      description: 'Document tags'
    },
    {
      title: 'Comments',
      value: totalComments,
      icon: <MessageCircle className="h-4 w-4 text-primary" />,
      description: 'Document feedback'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuickStats;
