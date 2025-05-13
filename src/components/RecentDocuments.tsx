
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DocumentCard from './DocumentCard';
import { Document } from '@/types';

interface RecentDocumentsProps {
  documents: Document[];
  title?: string;
  description?: string;
}

const RecentDocuments: React.FC<RecentDocumentsProps> = ({ 
  documents, 
  title = "Recent Documents", 
  description = "Recently added or updated documents" 
}) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {documents.length > 0 ? (
          documents.map((document) => (
            <DocumentCard key={document.id} document={document} />
          ))
        ) : (
          <p className="text-center text-muted-foreground">No documents found</p>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentDocuments;
