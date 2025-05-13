
import React from 'react';
import DocumentUploader from '@/components/DocumentUploader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileUp, Link as LinkIcon, Globe } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const UploadPage = () => {
  const navigate = useNavigate();
  
  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('URL submitted for processing');
  };

  const handleUploadSuccess = () => {
    // Give a bit of time for the toast message to show
    setTimeout(() => {
      // Navigate to the My Files page after successful upload
      navigate('/my-files');
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Upload Knowledge</h1>
        <Button variant="outline" onClick={() => navigate('/my-files')}>
          View My Files
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="document">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="document" className="flex items-center gap-2">
                <FileUp className="h-4 w-4" />
                Document
              </TabsTrigger>
              <TabsTrigger value="url" className="flex items-center gap-2">
                <LinkIcon className="h-4 w-4" />
                URL / Link
              </TabsTrigger>
              <TabsTrigger value="webpage" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Web Page
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="document">
              <DocumentUploader onSuccess={handleUploadSuccess} />
            </TabsContent>
            
            <TabsContent value="url">
              <Card>
                <CardHeader>
                  <CardTitle>Import from URL</CardTitle>
                  <CardDescription>
                    Add a document by providing a URL to an existing resource
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUrlSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="url">URL</Label>
                      <Input id="url" type="url" placeholder="https://" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="url-title">Title (Optional)</Label>
                      <Input id="url-title" placeholder="Title for the imported document" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Import Options</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="extract-content"
                            className="h-4 w-4 rounded border-gray-300"
                          />
                          <Label htmlFor="extract-content" className="text-sm">Extract full content</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="include-images"
                            className="h-4 w-4 rounded border-gray-300"
                          />
                          <Label htmlFor="include-images" className="text-sm">Include images</Label>
                        </div>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Import URL
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="webpage">
              <Card>
                <CardHeader>
                  <CardTitle>Web Page Extraction</CardTitle>
                  <CardDescription>
                    Extract content from web pages and save it to your knowledge base
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Globe className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Web Page Extraction</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      This feature allows you to extract and save content from web pages.
                      Coming soon in a future update!
                    </p>
                    <Badge variant="outline" className="mx-auto">Coming Soon</Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Upload Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Supported File Types</h3>
                <p className="text-sm text-muted-foreground">
                  PDF, DOCX, XLSX, PPT, MD, TXT, CSV, JPG, PNG
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Maximum File Size</h3>
                <p className="text-sm text-muted-foreground">
                  20MB per file
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Best Practices</h3>
                <ul className="text-sm text-muted-foreground list-disc ml-5 space-y-1">
                  <li>Use descriptive titles for easy searching</li>
                  <li>Select the appropriate category</li>
                  <li>Add relevant tags to improve discoverability</li>
                  <li>Include a brief summary in the content field</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Need Help?</h3>
                <p className="text-sm text-muted-foreground">
                  Contact the admin team for assistance with file uploads or to request additional categories.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
