'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { 
  Download, 
  FileText, 
  Video, 
  Headphones,
  Image,
  Link2,
  Eye,
  Upload,
  Trash2,
  Edit,
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  Folder,
  FolderOpen,
  File,
  Play,
  Pause,
  Volume2
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface WorkshopMaterial {
  id: string;
  title: string;
  description?: string;
  type: 'pdf' | 'doc' | 'docx' | 'ppt' | 'pptx' | 'video' | 'audio' | 'image' | 'link' | 'zip';
  url: string;
  thumbnailUrl?: string;
  size: number; // in bytes
  uploadedAt: Date;
  uploadedBy: string;
  availableAt: 'before' | 'during' | 'after' | 'always';
  downloadable: boolean;
  viewable: boolean;
  category: string;
  tags: string[];
  downloadCount: number;
  viewCount: number;
  version: number;
  isRequired: boolean;
  duration?: number; // for video/audio in seconds
}

export interface MaterialCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  materials: WorkshopMaterial[];
}

export interface WorkshopMaterialsProps {
  workshopId: string;
  materials: WorkshopMaterial[];
  categories: MaterialCategory[];
  onDownload: (materialId: string) => void;
  onView: (materialId: string) => void;
  onUpload?: (material: Omit<WorkshopMaterial, 'id' | 'uploadedAt' | 'downloadCount' | 'viewCount'>) => void;
  onDelete?: (materialId: string) => void;
  onUpdate?: (materialId: string, updates: Partial<WorkshopMaterial>) => void;
  userRole?: 'participant' | 'facilitator' | 'host';
  eventPhase?: 'before' | 'during' | 'after';
}

export function WorkshopMaterials({ 
  workshopId,
  materials, 
  categories,
  onDownload, 
  onView,
  onUpload,
  onDelete,
  onUpdate,
  userRole = 'participant',
  eventPhase = 'before'
}: WorkshopMaterialsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<Record<string, number>>({});

  // Filter materials based on availability and current event phase
  const availableMaterials = materials.filter(material => 
    material.availableAt === 'always' || material.availableAt === eventPhase
  );

  // Filter materials based on search and filters
  const filteredMaterials = availableMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || material.category === selectedCategory;
    const matchesType = selectedType === 'all' || material.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const handleDownload = async (material: WorkshopMaterial) => {
    if (!material.downloadable) return;
    
    // Simulate download progress
    setDownloadProgress(prev => ({ ...prev, [material.id]: 0 }));
    
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        const currentProgress = prev[material.id] || 0;
        if (currentProgress >= 100) {
          clearInterval(interval);
          // Remove progress after completion
          setTimeout(() => {
            setDownloadProgress(prev => {
              const { [material.id]: removed, ...rest } = prev;
              return rest;
            });
          }, 2000);
          return prev;
        }
        return { ...prev, [material.id]: currentProgress + 10 };
      });
    }, 200);

    onDownload(material.id);
  };

  const handleView = (material: WorkshopMaterial) => {
    if (!material.viewable) return;
    onView(material.id);
  };

  const getFileIcon = (type: WorkshopMaterial['type']) => {
    switch (type) {
      case 'pdf':
      case 'doc':
      case 'docx':
        return <FileText className="h-5 w-5" />;
      case 'ppt':
      case 'pptx':
        return <FileText className="h-5 w-5" />;
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'audio':
        return <Headphones className="h-5 w-5" />;
      case 'image':
        return <Image className="h-5 w-5" />;
      case 'link':
        return <Link2 className="h-5 w-5" />;
      case 'zip':
        return <Folder className="h-5 w-5" />;
      default:
        return <File className="h-5 w-5" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getAvailabilityBadge = (availableAt: WorkshopMaterial['availableAt']) => {
    const badges = {
      before: { label: 'Pre-Workshop', color: 'bg-blue-100 text-blue-800' },
      during: { label: 'During Workshop', color: 'bg-green-100 text-green-800' },
      after: { label: 'Post-Workshop', color: 'bg-purple-100 text-purple-800' },
      always: { label: 'Always Available', color: 'bg-gray-100 text-gray-800' }
    };
    
    const badge = badges[availableAt];
    return <Badge className={badge.color}>{badge.label}</Badge>;
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Workshop Materials</h2>
          <p className="text-muted-foreground">
            {filteredMaterials.length} of {availableMaterials.length} materials available
          </p>
        </div>
        
        {(userRole === 'host' || userRole === 'facilitator') && onUpload && (
          <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Material
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Upload Workshop Material</DialogTitle>
              </DialogHeader>
              <MaterialUploadForm 
                onSubmit={(material) => {
                  onUpload(material);
                  setShowUploadDialog(false);
                }}
                onCancel={() => setShowUploadDialog(false)}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search materials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="doc">Documents</SelectItem>
              <SelectItem value="ppt">Presentations</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
              <SelectItem value="audio">Audio</SelectItem>
              <SelectItem value="image">Images</SelectItem>
              <SelectItem value="link">Links</SelectItem>
            </SelectContent>
          </Select>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            {viewMode === 'grid' ? 'List' : 'Grid'}
          </Button>
        </div>
      </div>

      {/* Categories Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map(category => {
          const categoryMaterials = availableMaterials.filter(m => m.category === category.id);
          return (
            <Card 
              key={category.id} 
              className={`cursor-pointer transition-colors ${
                selectedCategory === category.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedCategory(selectedCategory === category.id ? 'all' : category.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${category.color}`}>
                    <span className="text-lg">{category.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-medium">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {categoryMaterials.length} materials
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Materials Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map(material => (
            <MaterialCard
              key={material.id}
              material={material}
              onDownload={() => handleDownload(material)}
              onView={() => handleView(material)}
              onDelete={onDelete ? () => onDelete(material.id) : undefined}
              downloadProgress={downloadProgress[material.id]}
              userRole={userRole}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredMaterials.map(material => (
            <MaterialListItem
              key={material.id}
              material={material}
              onDownload={() => handleDownload(material)}
              onView={() => handleView(material)}
              onDelete={onDelete ? () => onDelete(material.id) : undefined}
              downloadProgress={downloadProgress[material.id]}
              userRole={userRole}
            />
          ))}
        </div>
      )}

      {filteredMaterials.length === 0 && (
        <div className="text-center py-12">
          <Folder className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No materials found</h3>
          <p className="text-muted-foreground">
            {searchTerm || selectedCategory !== 'all' || selectedType !== 'all'
              ? 'Try adjusting your filters or search terms.'
              : 'No materials have been uploaded yet.'}
          </p>
        </div>
      )}
    </div>
  );
}

// Material Card Component
function MaterialCard({ 
  material, 
  onDownload, 
  onView, 
  onDelete,
  downloadProgress,
  userRole 
}: {
  material: WorkshopMaterial;
  onDownload: () => void;
  onView: () => void;
  onDelete?: () => void;
  downloadProgress?: number;
  userRole: string;
}) {
  const getFileIcon = (type: WorkshopMaterial['type']) => {
    switch (type) {
      case 'pdf':
      case 'doc':
      case 'docx':
        return <FileText className="h-8 w-8" />;
      case 'video':
        return <Video className="h-8 w-8" />;
      case 'audio':
        return <Headphones className="h-8 w-8" />;
      case 'image':
        return <Image className="h-8 w-8" />;
      case 'link':
        return <Link2 className="h-8 w-8" />;
      default:
        return <File className="h-8 w-8" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 text-primary">
            {material.thumbnailUrl ? (
              <img 
                src={material.thumbnailUrl} 
                alt={material.title}
                className="w-12 h-12 object-cover rounded"
              />
            ) : (
              getFileIcon(material.type)
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <h3 className="font-medium text-sm truncate pr-2">{material.title}</h3>
              {material.isRequired && (
                <Badge variant="destructive" className="text-xs">Required</Badge>
              )}
            </div>
            
            {material.description && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {material.description}
              </p>
            )}
            
            <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-2">
              <span>{formatFileSize(material.size)}</span>
              {material.duration && (
                <span>{Math.floor(material.duration / 60)}:{(material.duration % 60).toString().padStart(2, '0')}</span>
              )}
              <span className="capitalize">{material.type}</span>
            </div>
            
            <div className="flex items-center space-x-1 mt-2">
              {material.tags.slice(0, 2).map(tag => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {material.tags.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{material.tags.length - 2}
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        {downloadProgress !== undefined && (
          <div className="mt-3">
            <Progress value={downloadProgress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Downloading... {downloadProgress}%
            </p>
          </div>
        )}
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            {material.viewable && (
              <Button variant="outline" size="sm" onClick={onView}>
                <Eye className="h-3 w-3" />
              </Button>
            )}
            {material.downloadable && (
              <Button variant="outline" size="sm" onClick={onDownload}>
                <Download className="h-3 w-3" />
              </Button>
            )}
          </div>
          
          {(userRole === 'host' || userRole === 'facilitator') && onDelete && (
            <Button variant="outline" size="sm" onClick={onDelete}>
              <Trash2 className="h-3 w-3" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Material List Item Component
function MaterialListItem({ 
  material, 
  onDownload, 
  onView, 
  onDelete,
  downloadProgress,
  userRole 
}: {
  material: WorkshopMaterial;
  onDownload: () => void;
  onView: () => void;
  onDelete?: () => void;
  downloadProgress?: number;
  userRole: string;
}) {
  const getFileIcon = (type: WorkshopMaterial['type']) => {
    switch (type) {
      case 'pdf':
      case 'doc':
      case 'docx':
        return <FileText className="h-5 w-5" />;
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'audio':
        return <Headphones className="h-5 w-5" />;
      case 'image':
        return <Image className="h-5 w-5" />;
      case 'link':
        return <Link2 className="h-5 w-5" />;
      default:
        return <File className="h-5 w-5" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0 text-primary">
            {getFileIcon(material.type)}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="font-medium truncate">{material.title}</h3>
              {material.isRequired && (
                <Badge variant="destructive" className="text-xs">Required</Badge>
              )}
            </div>
            {material.description && (
              <p className="text-sm text-muted-foreground truncate">{material.description}</p>
            )}
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>{formatFileSize(material.size)}</span>
            <span className="capitalize">{material.type}</span>
            <span>{material.downloadCount} downloads</span>
          </div>
          
          <div className="flex items-center space-x-2">
            {material.viewable && (
              <Button variant="outline" size="sm" onClick={onView}>
                <Eye className="h-4 w-4" />
              </Button>
            )}
            {material.downloadable && (
              <Button variant="outline" size="sm" onClick={onDownload}>
                <Download className="h-4 w-4" />
              </Button>
            )}
            {(userRole === 'host' || userRole === 'facilitator') && onDelete && (
              <Button variant="outline" size="sm" onClick={onDelete}>
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        
        {downloadProgress !== undefined && (
          <div className="mt-3">
            <Progress value={downloadProgress} className="h-2" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Material Upload Form Component
function MaterialUploadForm({ 
  onSubmit, 
  onCancel 
}: { 
  onSubmit: (material: Omit<WorkshopMaterial, 'id' | 'uploadedAt' | 'downloadCount' | 'viewCount'>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'pdf' as WorkshopMaterial['type'],
    url: '',
    size: 0,
    uploadedBy: 'Current User', // This would come from auth context
    availableAt: 'always' as WorkshopMaterial['availableAt'],
    downloadable: true,
    viewable: true,
    category: '',
    tags: '',
    version: 1,
    isRequired: false,
    duration: undefined as number | undefined
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const material: Omit<WorkshopMaterial, 'id' | 'uploadedAt' | 'downloadCount' | 'viewCount'> = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
    };
    
    onSubmit(material);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="type">Type *</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as WorkshopMaterial['type'] }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="doc">Document</SelectItem>
              <SelectItem value="ppt">Presentation</SelectItem>
              <SelectItem value="video">Video</SelectItem>
              <SelectItem value="audio">Audio</SelectItem>
              <SelectItem value="image">Image</SelectItem>
              <SelectItem value="link">Link</SelectItem>
              <SelectItem value="zip">Archive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="availableAt">Available</Label>
          <Select value={formData.availableAt} onValueChange={(value) => setFormData(prev => ({ ...prev, availableAt: value as WorkshopMaterial['availableAt'] }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="before">Before Workshop</SelectItem>
              <SelectItem value="during">During Workshop</SelectItem>
              <SelectItem value="after">After Workshop</SelectItem>
              <SelectItem value="always">Always</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <Label htmlFor="url">File URL *</Label>
        <Input
          id="url"
          type="url"
          value={formData.url}
          onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          value={formData.tags}
          onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
          placeholder="workshop, handout, reference"
        />
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="downloadable"
            checked={formData.downloadable}
            onChange={(e) => setFormData(prev => ({ ...prev, downloadable: e.target.checked }))}
          />
          <Label htmlFor="downloadable">Downloadable</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="viewable"
            checked={formData.viewable}
            onChange={(e) => setFormData(prev => ({ ...prev, viewable: e.target.checked }))}
          />
          <Label htmlFor="viewable">Viewable</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isRequired"
            checked={formData.isRequired}
            onChange={(e) => setFormData(prev => ({ ...prev, isRequired: e.target.checked }))}
          />
          <Label htmlFor="isRequired">Required</Label>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Upload Material
        </Button>
      </div>
    </form>
  );
}
