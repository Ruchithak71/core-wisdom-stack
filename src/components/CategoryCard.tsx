
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Lightbulb, Code, Server, Users, Folder } from 'lucide-react';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
  documentCount: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, documentCount }) => {
  const renderIcon = () => {
    switch (category.icon) {
      case 'FileText':
        return <FileText className="h-6 w-6 text-primary" />;
      case 'Lightbulb':
        return <Lightbulb className="h-6 w-6 text-primary" />;
      case 'Code':
        return <Code className="h-6 w-6 text-primary" />;
      case 'Server':
        return <Server className="h-6 w-6 text-primary" />;
      case 'Users':
        return <Users className="h-6 w-6 text-primary" />;
      default:
        return <Folder className="h-6 w-6 text-primary" />;
    }
  };

  return (
    <Link to={`/category/${category.id}`}>
      <Card className="h-full hover:shadow-md transition-shadow border-primary/10 hover:border-primary/30">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          {renderIcon()}
          <div>
            <CardTitle className="text-lg">{category.name}</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              {documentCount} {documentCount === 1 ? 'document' : 'documents'}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {category.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
