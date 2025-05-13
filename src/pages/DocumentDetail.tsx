
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { documents, comments as allComments } from '@/data/mockData';
import { currentUser } from '@/data/mockData';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CalendarDays, Heart, HeartOff, Eye, MessageSquare, ArrowLeft, BookmarkPlus, Share2, Printer } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Comment } from '@/types';
import { toast } from 'sonner';

const DocumentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const document = documents.find(doc => doc.id === id);
  const documentComments = allComments.filter(comment => comment.documentId === id);
  
  const [liked, setLiked] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const [localComments, setLocalComments] = useState<Comment[]>(documentComments);
  
  if (!document) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h1 className="text-2xl font-bold mb-4">Document not found</h1>
        <p className="text-muted-foreground mb-6">The document you're looking for doesn't exist or has been deleted.</p>
        <Button asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };
  
  const handleLikeToggle = () => {
    setLiked(!liked);
    toast.success(liked ? 'Removed from favorites' : 'Added to favorites');
  };
  
  const handleAddComment = () => {
    if (!commentContent.trim()) {
      return;
    }
    
    const newComment: Comment = {
      id: `local-${Date.now()}`,
      content: commentContent,
      author: currentUser,
      createdAt: new Date().toISOString(),
      documentId: document.id,
    };
    
    setLocalComments([newComment, ...localComments]);
    setCommentContent('');
    toast.success('Comment added successfully');
  };
  
  const handleShare = () => {
    toast.success('Document link copied to clipboard!');
  };
  
  const handlePrint = () => {
    toast.success('Preparing document for printing...');
  };
  
  const handleBookmark = () => {
    toast.success('Document added to bookmarks');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        
        <div className="flex space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleBookmark}>
                  <BookmarkPlus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Bookmark</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handlePrint}>
                  <Printer className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Print</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-4">
          <div className="flex justify-between">
            <Badge variant="outline" className="bg-primary/10 text-primary mb-2">
              {document.category.name}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className={liked ? "text-red-500" : "text-muted-foreground"}
              onClick={handleLikeToggle}
            >
              {liked ? <Heart className="h-5 w-5 fill-current" /> : <Heart className="h-5 w-5" />}
            </Button>
          </div>
          <CardTitle className="text-2xl">{document.title}</CardTitle>
          <CardDescription className="flex items-center mt-2 text-sm">
            <Avatar className="h-6 w-6 mr-2">
              <AvatarFallback>
                {document.author.name[0]}
              </AvatarFallback>
            </Avatar>
            <span>{document.author.name}</span>
            <Separator orientation="vertical" className="mx-2 h-4" />
            <CalendarDays className="h-4 w-4 mr-1" />
            <span>{formatDate(document.updatedAt)}</span>
            <Separator orientation="vertical" className="mx-2 h-4" />
            <Eye className="h-4 w-4 mr-1" />
            <span>{document.views} views</span>
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            <p className="whitespace-pre-line">{document.content}</p>
            
            {/* For demo purposes - detailed formatted content would go here */}
            <p className="mt-4">
              This is a detailed knowledge document that would typically contain much more content,
              including sections, images, code blocks, tables, and other formatted elements that provide 
              comprehensive information about the topic.
            </p>
            <p className="mt-4">
              In a real implementation, this would be rendered using a rich text editor or markdown renderer
              that supports all the formatting needs of a knowledge management system.
            </p>
          </div>
          
          {document.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-8">
              {document.tags.map((tag) => (
                <Badge key={tag.id} variant="secondary">
                  {tag.name}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Comments ({localComments.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Avatar className="h-10 w-10">
              <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea 
                placeholder="Add a comment..."
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                className="resize-none"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <Button onClick={handleAddComment}>
                  Comment
                </Button>
              </div>
            </div>
          </div>
          
          {localComments.length > 0 ? (
            <div className="space-y-4 mt-6">
              {localComments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {comment.author.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{comment.author.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              <p>No comments yet</p>
              <p className="text-sm">Be the first to share your thoughts</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentDetail;
