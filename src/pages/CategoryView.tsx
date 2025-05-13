
import React from 'react';
import { useParams } from 'react-router-dom';
import { documents, categories } from '@/data/mockData';
import DocumentCard from '@/components/DocumentCard';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Lightbulb, Code, Server, Users, Folder } from 'lucide-react';

const CategoryView = () => {
  const { id } = useParams<{ id: string }>();
  
  const category = categories.find(cat => cat.id === id);
  const categoryDocuments = documents.filter(doc => doc.category.id === id);
  
  if (!category) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h1 className="text-2xl font-bold mb-4">Category not found</h1>
        <p className="text-muted-foreground">The category you're looking for doesn't exist.</p>
      </div>
    );
  }
  
  const renderIcon = () => {
    switch (category.icon) {
      case 'FileText':
        return <FileText className="h-8 w-8 text-primary" />;
      case 'Lightbulb':
        return <Lightbulb className="h-8 w-8 text-primary" />;
      case 'Code':
        return <Code className="h-8 w-8 text-primary" />;
      case 'Server':
        return <Server className="h-8 w-8 text-primary" />;
      case 'Users':
        return <Users className="h-8 w-8 text-primary" />;
      default:
        return <Folder className="h-8 w-8 text-primary" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        {renderIcon()}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{category.name}</h1>
          <p className="text-muted-foreground">{category.description}</p>
        </div>
      </div>
      
      <Badge variant="outline" className="text-sm font-medium">
        {categoryDocuments.length} {categoryDocuments.length === 1 ? 'document' : 'documents'} in this category
      </Badge>
      
      {categoryDocuments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryDocuments.map((document) => (
            <DocumentCard key={document.id} document={document} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-primary/10 p-4 mb-4">
              {renderIcon()}
            </div>
            <h3 className="text-xl font-medium mb-2">No documents yet</h3>
            <p className="text-muted-foreground text-center max-w-md mb-4">
              There are no documents in this category yet. Be the first to contribute!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CategoryView;
