'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Download, 
  Star, 
  Filter,
  Grid,
  List,
  BookOpen,
  FileText,
  CheckSquare,
  Users
} from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  sampleLeadMagnets, 
  sampleToolkits, 
  sampleTemplates, 
  sampleReadingLists,
  resourceCategories,
  getFeaturedResources,
  searchResources,
  getResourcesByCategory
} from '@/lib/resource-library-data';
import { LeadMagnet, Toolkit, Template, ReadingList } from '@/types/resource-library';

import LeadMagnetCard from '@/components/resource-library/LeadMagnetCard';
import ToolkitCard from '@/components/resource-library/ToolkitCard';
import TemplateCard from '@/components/resource-library/TemplateCard';
import ReadingListCard from '@/components/resource-library/ReadingListCard';

const ResourceLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState('all');

  // Filter resources by search and category
  const filterLeadMagnets = () => {
    let filtered = sampleLeadMagnets;
    
    if (searchTerm) {
      filtered = searchResources(filtered, searchTerm);
    }
    
    if (selectedCategory !== 'all') {
      filtered = getResourcesByCategory(filtered, selectedCategory);
    }
    
    return filtered;
  };

  const filterToolkits = () => {
    let filtered = sampleToolkits;
    
    if (searchTerm) {
      filtered = searchResources(filtered, searchTerm);
    }
    
    if (selectedCategory !== 'all') {
      filtered = getResourcesByCategory(filtered, selectedCategory);
    }
    
    return filtered;
  };

  const filterTemplates = () => {
    let filtered = sampleTemplates;
    
    if (searchTerm) {
      filtered = searchResources(filtered, searchTerm);
    }
    
    if (selectedCategory !== 'all') {
      filtered = getResourcesByCategory(filtered, selectedCategory);
    }
    
    return filtered;
  };

  const filterReadingLists = () => {
    let filtered = sampleReadingLists;
    
    if (searchTerm) {
      filtered = searchResources(filtered, searchTerm);
    }
    
    if (selectedCategory !== 'all') {
      filtered = getResourcesByCategory(filtered, selectedCategory);
    }
    
    return filtered;
  };

  const filteredLeadMagnets = filterLeadMagnets();
  const filteredToolkits = filterToolkits();
  const filteredTemplates = filterTemplates();
  const filteredReadingLists = filterReadingLists();

  const featuredLeadMagnets = getFeaturedResources(sampleLeadMagnets);
  const featuredToolkits = getFeaturedResources(sampleToolkits);

  const totalResults = filteredLeadMagnets.length + filteredToolkits.length + filteredTemplates.length + filteredReadingLists.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-display font-bold text-ink mb-4">
            Resource Library
          </h1>
          <p className="text-lg text-graphite max-w-2xl mx-auto mb-8">
            Practical tools, guides, and resources to support your missional journey. 
            Download free lead magnets, premium toolkits, customizable templates, and curated reading lists.
          </p>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 max-w-4xl mx-auto mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-graphite h-5 w-5" />
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap justify-center">
              <Button
                variant={selectedCategory === 'all' ? "default" : "outline"}
                onClick={() => setSelectedCategory('all')}
                className="h-12"
              >
                All Categories
              </Button>
              {resourceCategories.slice(0, 4).map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="h-12"
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </Button>
              ))}
            </div>

            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="h-12 w-12"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode('list')}
                className="h-12 w-12"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Results Count */}
          {(searchTerm || selectedCategory !== 'all') && (
            <p className="text-sm text-graphite mb-6">
              {totalResults} results found
              {searchTerm && ` for "${searchTerm}"`}
              {selectedCategory !== 'all' && ` in ${resourceCategories.find(c => c.id === selectedCategory)?.name}`}
            </p>
          )}
        </motion.div>

        {/* Featured Resources Section */}
        {!searchTerm && selectedCategory === 'all' && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-display font-semibold text-ink mb-6 text-center">
              Featured Resources
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {featuredLeadMagnets.slice(0, 2).map((magnet) => (
                <LeadMagnetCard key={magnet.id} leadMagnet={magnet} />
              ))}
              {featuredToolkits.slice(0, 1).map((toolkit) => (
                <ToolkitCard key={toolkit.id} toolkit={toolkit} />
              ))}
            </div>
          </motion.section>
        )}

        {/* Resource Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              All Resources
            </TabsTrigger>
            <TabsTrigger value="lead-magnets" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Lead Magnets
            </TabsTrigger>
            <TabsTrigger value="toolkits" className="flex items-center gap-2">
              <CheckSquare className="h-4 w-4" />
              Toolkits
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Templates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            {/* All Resources Mixed View */}
            <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              <AnimatePresence>
                {filteredLeadMagnets.map((magnet) => (
                  <motion.div
                    key={`magnet-${magnet.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <LeadMagnetCard leadMagnet={magnet} />
                  </motion.div>
                ))}
                {filteredToolkits.map((toolkit) => (
                  <motion.div
                    key={`toolkit-${toolkit.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <ToolkitCard toolkit={toolkit} />
                  </motion.div>
                ))}
                {filteredTemplates.map((template) => (
                  <motion.div
                    key={`template-${template.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <TemplateCard template={template} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>

          <TabsContent value="lead-magnets" className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-ink mb-2">Free Lead Magnets</h3>
              <p className="text-graphite">
                Download these free resources in exchange for your email. Perfect for getting started with missional principles.
              </p>
            </div>
            <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              <AnimatePresence>
                {filteredLeadMagnets.map((magnet) => (
                  <motion.div
                    key={magnet.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <LeadMagnetCard leadMagnet={magnet} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>

          <TabsContent value="toolkits" className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-ink mb-2">Comprehensive Toolkits</h3>
              <p className="text-graphite">
                Complete resource packages with everything you need for specific ministry areas.
              </p>
            </div>
            <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              <AnimatePresence>
                {filteredToolkits.map((toolkit) => (
                  <motion.div
                    key={toolkit.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <ToolkitCard toolkit={toolkit} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-ink mb-2">Customizable Templates</h3>
              <p className="text-graphite">
                Ready-to-use templates that you can customize for your specific context and needs.
              </p>
            </div>
            <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              <AnimatePresence>
                {filteredTemplates.map((template) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <TemplateCard template={template} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>
        </Tabs>

        {/* Reading Lists Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-display font-semibold text-ink mb-2">
              Curated Reading Lists
            </h2>
            <p className="text-graphite">
              Carefully curated book collections to deepen your understanding of key missional topics.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReadingLists.map((readingList) => (
              <ReadingListCard key={readingList.id} readingList={readingList} />
            ))}
          </div>
        </motion.section>

        {/* Categories Overview */}
        {!searchTerm && selectedCategory === 'all' && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 bg-white rounded-lg p-8"
          >
            <h2 className="text-2xl font-display font-semibold text-ink mb-6 text-center">
              Browse by Category
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resourceCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow text-left group"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl"
                      style={{ backgroundColor: category.color }}
                    >
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-ink group-hover:text-indigo-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-graphite">{category.count} resources</p>
                    </div>
                  </div>
                  <p className="text-sm text-graphite">{category.description}</p>
                </button>
              ))}
            </div>
          </motion.section>
        )}

        {/* Empty State */}
        {totalResults === 0 && (searchTerm || selectedCategory !== 'all') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-graphite mb-4">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No resources found</h3>
              <p>Try adjusting your search terms or filters</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ResourceLibrary;
