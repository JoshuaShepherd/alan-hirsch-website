'use client'

import { useState, useRef } from 'react'
import { 
  Upload, Search, Filter, Grid3X3, List, Image as ImageIcon, 
  Video, FileText, Music, Archive, Trash2, Edit3, Download,
  Eye, Copy, Share2, MoreVertical, X, Plus, Calendar,
  Folder, FolderPlus, ChevronRight, ChevronDown
} from 'lucide-react'

interface MediaFile {
  id: string
  name: string
  type: 'image' | 'video' | 'document' | 'audio' | 'other'
  size: number
  url: string
  thumbnailUrl?: string
  uploadDate: Date
  folder?: string
  tags: string[]
  alt?: string
  description?: string
  dimensions?: { width: number; height: number }
}

interface MediaFolder {
  id: string
  name: string
  parentId?: string
  fileCount: number
  subfolders: MediaFolder[]
}

interface MediaLibraryProps {
  onSelectFile?: (file: MediaFile) => void
  onSelectMultiple?: (files: MediaFile[]) => void
  allowMultiple?: boolean
  fileTypes?: MediaFile['type'][]
  maxFileSize?: number
}

const ViewToggleButton = ({ 
  isActive, 
  onClick, 
  children, 
  title 
}: {
  isActive: boolean
  onClick: () => void
  children: React.ReactNode
  title: string
}) => (
  <button
    onClick={onClick}
    title={title}
    className={`p-2 rounded-md transition-colors ${
      isActive 
        ? 'bg-primary text-primary-foreground' 
        : 'text-foreground hover:bg-muted'
    }`}
  >
    {children}
  </button>
)

const FileIcon = ({ type }: { type: MediaFile['type'] }) => {
  const iconProps = { className: "h-4 w-4" }
  
  switch (type) {
    case 'image':
      return <ImageIcon {...iconProps} />
    case 'video':
      return <Video {...iconProps} />
    case 'document':
      return <FileText {...iconProps} />
    case 'audio':
      return <Music {...iconProps} />
    default:
      return <Archive {...iconProps} />
  }
}

const formatFileSize = (bytes: number): string => {
  const units = ['B', 'KB', 'MB', 'GB']
  let size = bytes
  let unitIndex = 0
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }
  
  return `${Math.round(size * 100) / 100} ${units[unitIndex]}`
}

export function MediaLibrary({
  onSelectFile,
  onSelectMultiple,
  allowMultiple = false,
  fileTypes,
  maxFileSize = 50 * 1024 * 1024 // 50MB default
}: MediaLibraryProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [currentFolder, setCurrentFolder] = useState<string>('')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showFolderModal, setShowFolderModal] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set())
  const [filterType, setFilterType] = useState<MediaFile['type'] | 'all'>('all')
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Mock data - replace with actual API calls
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([
    {
      id: '1',
      name: 'hero-image.jpg',
      type: 'image',
      size: 1024000,
      url: '/images/hero-image.jpg',
      thumbnailUrl: '/images/thumbnails/hero-image.jpg',
      uploadDate: new Date('2024-01-15'),
      tags: ['hero', 'banner', 'homepage'],
      alt: 'Hero banner image',
      dimensions: { width: 1920, height: 1080 }
    },
    {
      id: '2',
      name: 'presentation.mp4',
      type: 'video',
      size: 15000000,
      url: '/videos/presentation.mp4',
      uploadDate: new Date('2024-01-10'),
      folder: 'videos',
      tags: ['presentation', 'training']
    },
    {
      id: '3',
      name: 'whitepaper.pdf',
      type: 'document',
      size: 2048000,
      url: '/documents/whitepaper.pdf',
      uploadDate: new Date('2024-01-05'),
      folder: 'documents',
      tags: ['whitepaper', 'research']
    }
  ])

  const [folders, setFolders] = useState<MediaFolder[]>([
    {
      id: 'images',
      name: 'Images',
      fileCount: 15,
      subfolders: [
        { id: 'images/headers', name: 'Headers', fileCount: 5, subfolders: [] },
        { id: 'images/icons', name: 'Icons', fileCount: 10, subfolders: [] }
      ]
    },
    {
      id: 'videos',
      name: 'Videos',
      fileCount: 8,
      subfolders: []
    },
    {
      id: 'documents',
      name: 'Documents',
      fileCount: 12,
      subfolders: []
    }
  ])

  const filteredFiles = mediaFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesFolder = !currentFolder || file.folder === currentFolder
    const matchesType = filterType === 'all' || file.type === filterType
    const matchesAllowedTypes = !fileTypes || fileTypes.includes(file.type)
    
    return matchesSearch && matchesFolder && matchesType && matchesAllowedTypes
  })

  const handleFileSelect = (file: MediaFile) => {
    if (allowMultiple) {
      const newSelected = selectedFiles.includes(file.id) 
        ? selectedFiles.filter(id => id !== file.id)
        : [...selectedFiles, file.id]
      setSelectedFiles(newSelected)
      
      const selectedFileObjects = mediaFiles.filter(f => newSelected.includes(f.id))
      onSelectMultiple?.(selectedFileObjects)
    } else {
      onSelectFile?.(file)
    }
  }

  const handleUpload = (files: FileList | null) => {
    if (!files) return
    
    Array.from(files).forEach(file => {
      if (file.size > maxFileSize) {
        alert(`File ${file.name} is too large. Maximum size is ${formatFileSize(maxFileSize)}.`)
        return
      }
      
      // Mock upload - replace with actual upload logic
      const newFile: MediaFile = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type.startsWith('image/') ? 'image' :
              file.type.startsWith('video/') ? 'video' :
              file.type.startsWith('audio/') ? 'audio' :
              file.type === 'application/pdf' ? 'document' : 'other',
        size: file.size,
        url: URL.createObjectURL(file),
        uploadDate: new Date(),
        tags: [],
        folder: currentFolder
      }
      
      setMediaFiles(prev => [...prev, newFile])
    })
    
    setShowUploadModal(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleUpload(e.dataTransfer.files)
  }

  const createFolder = () => {
    if (!newFolderName.trim()) return
    
    const newFolder: MediaFolder = {
      id: currentFolder ? `${currentFolder}/${newFolderName}` : newFolderName,
      name: newFolderName,
      parentId: currentFolder || undefined,
      fileCount: 0,
      subfolders: []
    }
    
    setFolders(prev => [...prev, newFolder])
    setNewFolderName('')
    setShowFolderModal(false)
  }

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev)
      if (newSet.has(folderId)) {
        newSet.delete(folderId)
      } else {
        newSet.add(folderId)
      }
      return newSet
    })
  }

  const FolderTree = ({ folders, level = 0 }: { folders: MediaFolder[], level?: number }) => (
    <div>
      {folders.map(folder => (
        <div key={folder.id}>
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer hover:bg-muted ${
              currentFolder === folder.id ? 'bg-primary/10 text-primary' : ''
            }`}
            style={{ paddingLeft: `${12 + level * 16}px` }}
            onClick={() => setCurrentFolder(folder.id)}
          >
            {folder.subfolders.length > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleFolder(folder.id)
                }}
                className="p-0"
              >
                {expandedFolders.has(folder.id) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            )}
            <Folder className="h-4 w-4" />
            <span className="text-sm">{folder.name}</span>
            <span className="text-xs ml-auto">
              {folder.fileCount}
            </span>
          </div>
          {expandedFolders.has(folder.id) && (
            <FolderTree folders={folder.subfolders} level={level + 1} />
          )}
        </div>
      ))}
    </div>
  )

  return (
    <div className="flex h-[600px] border border-border rounded-lg overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 border-r border-border bg-muted/30">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">Folders</h3>
            <button
              onClick={() => setShowFolderModal(true)}
              className="p-1 hover:bg-muted rounded"
              title="New Folder"
            >
              <FolderPlus className="h-4 w-4" />
            </button>
          </div>
          
          <div
            className={`p-3 rounded cursor-pointer hover:bg-muted ${
              !currentFolder ? 'bg-primary/10 text-primary' : ''
            }`}
            onClick={() => setCurrentFolder('')}
          >
            <div className="flex items-center gap-2">
              <Folder className="h-4 w-4" />
              <span className="text-sm">All Files</span>
            </div>
          </div>
        </div>
        
        <div className="overflow-y-auto max-h-[400px]">
          <FolderTree folders={folders} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="border-b border-border bg-background p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowUploadModal(true)}
                className="btn-primary text-sm flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                Upload
              </button>
              
              <div className="flex items-center gap-1 border-l border-border pl-3">
                <ViewToggleButton
                  isActive={viewMode === 'grid'}
                  onClick={() => setViewMode('grid')}
                  title="Grid View"
                >
                  <Grid3X3 className="h-4 w-4" />
                </ViewToggleButton>
                <ViewToggleButton
                  isActive={viewMode === 'list'}
                  onClick={() => setViewMode('list')}
                  title="List View"
                >
                  <List className="h-4 w-4" />
                </ViewToggleButton>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as MediaFile['type'] | 'all')}
                className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="image">Images</option>
                <option value="video">Videos</option>
                <option value="document">Documents</option>
                <option value="audio">Audio</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* File Grid/List */}
        <div 
          className="flex-1 p-4 overflow-y-auto"
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
        >
          {isDragging && (
            <div className="fixed inset-0 bg-primary/10 border-2 border-dashed border-primary rounded-lg flex items-center justify-center z-10">
              <div className="text-center">
                <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-lg font-semibold text-primary">Drop files to upload</p>
              </div>
            </div>
          )}

          {filteredFiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Archive className="h-12 w-12 mb-4" />
              <p className="text-lg font-semibold">No files found</p>
              <p className="-foreground">Upload some files to get started</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredFiles.map(file => (
                <div
                  key={file.id}
                  className={`group border border-border rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-md ${
                    selectedFiles.includes(file.id) ? 'ring-2 ring-primary bg-primary/5' : ''
                  }`}
                  onClick={() => handleFileSelect(file)}
                >
                  <div className="aspect-square bg-muted flex items-center justify-center relative">
                    {file.type === 'image' && file.thumbnailUrl ? (
                      <img
                        src={file.thumbnailUrl}
                        alt={file.alt || file.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FileIcon type={file.type} />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Eye className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="font-medium text-sm truncate" title={file.name}>
                      {file.name}
                    </p>
                    <p className="text-xs">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              {filteredFiles.map(file => (
                <div
                  key={file.id}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted ${
                    selectedFiles.includes(file.id) ? 'bg-primary/5 border border-primary' : ''
                  }`}
                  onClick={() => handleFileSelect(file)}
                >
                  <FileIcon type={file.type} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{file.name}</p>
                    <div className="flex items-center gap-4 text-xs">
                      <span>{formatFileSize(file.size)}</span>
                      <span>{file.uploadDate.toLocaleDateString()}</span>
                      {file.dimensions && (
                        <span>{file.dimensions.width}×{file.dimensions.height}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="p-1 hover:bg-muted rounded"
                      title="Download"
                      onClick={(e) => {
                        e.stopPropagation()
                        // Download logic
                      }}
                    >
                      <Download className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 hover:bg-muted rounded"
                      title="More options"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background border border-border rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-semibold">Upload Files</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div
                className="border-2 border-dashed border-muted rounded-lg p-8 text-center cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                <Upload className="h-8 w-8 mx-auto mb-4" />
                <p className="text-sm font-medium mb-2">Click to upload or drag and drop</p>
                <p className="text-xs">
                  Max file size: {formatFileSize(maxFileSize)}
                </p>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                accept={fileTypes ? fileTypes.map(type => {
                  switch (type) {
                    case 'image': return 'image/*'
                    case 'video': return 'video/*'
                    case 'audio': return 'audio/*'
                    case 'document': return '.pdf,.doc,.docx,.txt'
                    default: return ''
                  }
                }).join(',') : undefined}
                onChange={(e) => handleUpload(e.target.files)}
              />
            </div>
          </div>
        </div>
      )}

      {/* New Folder Modal */}
      {showFolderModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background border border-border rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-semibold">Create New Folder</h3>
              <button
                onClick={() => setShowFolderModal(false)}
                className="-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Folder Name
                </label>
                <input
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="Enter folder name..."
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      createFolder()
                    }
                  }}
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowFolderModal(false)}
                  className="btn-outline flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={createFolder}
                  className="btn-primary flex-1"
                  disabled={!newFolderName.trim()}
                >
                  Create Folder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
