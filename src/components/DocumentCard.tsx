
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Eye, Heart, Clock } from 'lucide-react';
import { Document } from '@/types';

interface DocumentCardProps {
  document: Document;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className="bg-primary/10 text-primary">
            {document.category.name}
          </Badge>
          <div className="flex items-center text-xs text-muted-foreground">
            <Eye className="h-3 w-3 mr-1" />
            <span>{document.views}</span>
            <Heart className="h-3 w-3 ml-2 mr-1" />
            <span>{document.likes}</span>
          </div>
        </div>
        <CardTitle className="text-lg mt-2 hover:text-primary transition-colors">
          <Link to={`/document/${document.id}`}>{document.title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-muted-foreground text-sm line-clamp-2">
          {document.content}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 text-xs text-muted-foreground">
        <div className="flex items-center">
          <Avatar className="h-5 w-5 mr-1">
            <AvatarFallback className="text-[10px]">
              {document.author.name[0]}
            </AvatarFallback>
          </Avatar>
          <span>{document.author.name}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          <span>{formatDate(document.updatedAt)}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DocumentCard;
