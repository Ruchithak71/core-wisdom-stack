
// A simple utility to store and retrieve files using localStorage
// This is a temporary solution until we integrate with a real backend

import { v4 as uuidv4 } from 'uuid';

export interface StoredFile {
  id: string;
  name: string;
  type: string;
  size: number;
  content: string; // Base64 encoded content
  uploadDate: string;
  title: string;
  description?: string;
  category?: string;
}

// Convert file to base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

// Store a file in localStorage
export const storeFile = async (
  file: File, 
  title: string, 
  description: string = '', 
  category: string = ''
): Promise<StoredFile> => {
  try {
    const base64Content = await fileToBase64(file);
    
    const storedFile: StoredFile = {
      id: uuidv4(),
      name: file.name,
      type: file.type,
      size: file.size,
      content: base64Content,
      uploadDate: new Date().toISOString(),
      title,
      description,
      category
    };
    
    // Get existing files
    const existingFilesString = localStorage.getItem('uploadedFiles');
    const existingFiles: StoredFile[] = existingFilesString ? JSON.parse(existingFilesString) : [];
    
    // Add new file
    const updatedFiles = [...existingFiles, storedFile];
    
    // Save to localStorage (without the content to save space)
    const filesForStorage = updatedFiles.map(({ content, ...rest }) => ({
      ...rest,
      hasContent: true,
    }));
    
    localStorage.setItem('uploadedFiles', JSON.stringify(filesForStorage));
    
    // Store content separately with its ID as the key
    localStorage.setItem(`file_${storedFile.id}`, base64Content);
    
    return storedFile;
  } catch (error) {
    console.error('Error storing file:', error);
    throw new Error('Failed to store file');
  }
};

// Get all stored files (without content)
export const getAllFiles = (): Omit<StoredFile, 'content'>[] => {
  const filesString = localStorage.getItem('uploadedFiles');
  if (!filesString) return [];
  
  return JSON.parse(filesString);
};

// Get a specific file with its content
export const getFileById = (id: string): StoredFile | null => {
  const filesString = localStorage.getItem('uploadedFiles');
  if (!filesString) return null;
  
  const files: Omit<StoredFile, 'content'>[] = JSON.parse(filesString);
  const fileMetadata = files.find(file => file.id === id);
  
  if (!fileMetadata) return null;
  
  const content = localStorage.getItem(`file_${id}`);
  if (!content) return null;
  
  return {
    ...fileMetadata,
    content
  } as StoredFile;
};

// Delete a file
export const deleteFile = (id: string): boolean => {
  try {
    const filesString = localStorage.getItem('uploadedFiles');
    if (!filesString) return false;
    
    const files: Omit<StoredFile, 'content'>[] = JSON.parse(filesString);
    const updatedFiles = files.filter(file => file.id !== id);
    
    localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
    localStorage.removeItem(`file_${id}`);
    
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
};
