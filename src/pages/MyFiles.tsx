
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogDescription, 
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { getAllFiles, getFileById, deleteFile, StoredFile } from '@/utils/fileStorage';
import { FileText, Eye, Download, Trash, X } from 'lucide-react';
import { categories } from '@/data/mockData';
import { toast } from 'sonner';

type FileListItem = Omit<StoredFile, 'content'> & { hasContent?: boolean };

const MyFiles = () => {
  const [files, setFiles] = useState<FileListItem[]>([]);
  const [selectedFile, setSelectedFile] = useState<StoredFile | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Load files on component mount
  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = () => {
    const storedFiles = getAllFiles();
    setFiles(storedFiles);
  };

  const handlePreview = (id: string) => {
    const fileWithContent = getFileById(id);
    if (fileWithContent) {
      setSelectedFile(fileWithContent);
      setIsPreviewOpen(true);
    } else {
      toast.error('Could not load file preview');
    }
  };

  const handleDownload = (id: string) => {
    const fileWithContent = getFileById(id);
    if (fileWithContent) {
      // Create an anchor element and trigger download
      const link = document.createElement('a');
      link.href = fileWithContent.content;
      link.download = fileWithContent.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      toast.error('Could not download file');
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this file?')) {
      const success = deleteFile(id);
      if (success) {
        toast.success('File deleted successfully');
        loadFiles();
      } else {
        toast.error('Failed to delete file');
      }
    }
  };

  const getCategoryName = (categoryId: string | undefined) => {
    if (!categoryId) return 'Uncategorized';
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    const kb = bytes / 1024;
    if (kb < 1024) return kb.toFixed(1) + ' KB';
    const mb = kb / 1024;
    return mb.toFixed(1) + ' MB';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">My Files</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Uploaded Documents</CardTitle>
          <CardDescription>
            View and manage files you've uploaded to the knowledge base
          </CardDescription>
        </CardHeader>
        <CardContent>
          {files.length === 0 ? (
            <div className="text-center py-10">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <h3 className="text-lg font-medium">No files uploaded yet</h3>
              <p className="text-muted-foreground mt-2 mb-4">
                Start building your knowledge base by uploading documents
              </p>
              <Button asChild>
                <a href="/upload">Upload Documents</a>
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>File Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Uploaded</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {files.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell className="font-medium">{file.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{getCategoryName(file.category)}</Badge>
                    </TableCell>
                    <TableCell>{file.type.split('/')[1]?.toUpperCase() || 'Unknown'}</TableCell>
                    <TableCell>{formatFileSize(file.size)}</TableCell>
                    <TableCell>{formatDate(file.uploadDate)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handlePreview(file.id)}
                          title="Preview"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDownload(file.id)}
                          title="Download"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(file.id)}
                          title="Delete"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-screen overflow-auto">
          <DialogHeader>
            <DialogTitle className="pr-10">{selectedFile?.title}</DialogTitle>
            <DialogDescription>
              {selectedFile?.name} ({formatFileSize(selectedFile?.size || 0)})
            </DialogDescription>
            <Button 
              className="absolute right-4 top-4" 
              variant="ghost" 
              size="icon"
              onClick={() => setIsPreviewOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          <div className="mt-4">
            {selectedFile && (
              selectedFile.type.startsWith('image/') ? (
                <div className="flex justify-center">
                  <img 
                    src={selectedFile.content} 
                    alt={selectedFile.name} 
                    className="max-w-full max-h-[600px] object-contain"
                  />
                </div>
              ) : selectedFile.type === 'application/pdf' ? (
                <div className="h-[600px]">
                  <iframe 
                    src={selectedFile.content} 
                    className="w-full h-full" 
                    title={selectedFile.name}
                  />
                </div>
              ) : selectedFile.type.startsWith('text/') ? (
                <div className="whitespace-pre-wrap bg-muted p-4 rounded-md">
                  {/* This is a simplified view. For actual text content, we would need to parse the base64 */}
                  <p>Text preview is limited. Please download the file for full access.</p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <p>This file type cannot be previewed. Please download the file to view it.</p>
                  <Button 
                    className="mt-4" 
                    onClick={() => selectedFile && handleDownload(selectedFile.id)}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              )
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyFiles;
