
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Document } from '@/types';
import { Link } from 'react-router-dom';
import { Clock, FileText } from 'lucide-react';

interface SearchResultsProps {
  results: Document[];
  query: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, query }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, i) => 
      regex.test(part) ? <mark key={i} className="bg-yellow-200 dark:bg-yellow-800">{part}</mark> : part
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Search Results for "{query}"</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {results.length > 0 ? (
          results.map((doc) => (
            <Card key={doc.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    {doc.category.name}
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <FileText className="h-3 w-3 mr-1" />
                    <span>Document</span>
                  </div>
                </div>
                
                <Link to={`/document/${doc.id}`}>
                  <h3 className="text-lg font-medium hover:text-primary transition-colors">
                    {highlightMatch(doc.title, query)}
                  </h3>
                </Link>
                
                <p className="text-sm text-muted-foreground mt-1 mb-3 line-clamp-2">
                  {highlightMatch(doc.content, query)}
                </p>
                
                <div className="flex justify-between items-center pt-2 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Avatar className="h-5 w-5 mr-1">
                      <AvatarFallback className="text-[10px]">
                        {doc.author.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span>{doc.author.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{formatDate(doc.updatedAt)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No results found for "{query}"</p>
            <p className="text-sm mt-2">Try using different keywords or check your spelling</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SearchResults;
