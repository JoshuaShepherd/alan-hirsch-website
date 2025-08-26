'use client'

import { useState } from 'react'
import { 
  Search, TrendingUp, Link, Eye, Target, BarChart3,
  Globe, ExternalLink, CheckCircle, AlertTriangle,
  Lightbulb, ArrowUpRight, RefreshCw, Download,
  BookOpen, Users, Clock, Zap, Filter, Settings,
  Copy, Edit3, Plus, Trash2, MoreVertical, Star,
  ChevronRight, ChevronDown, Activity, Award
} from 'lucide-react'

interface KeywordData {
  keyword: string
  searchVolume: number
  difficulty: 'easy' | 'medium' | 'hard'
  cpc: number
  trend: 'rising' | 'stable' | 'declining'
  relevanceScore: number
  intent: 'informational' | 'navigational' | 'transactional' | 'commercial'
}

interface SEOSuggestion {
  id: string
  type: 'title' | 'meta_description' | 'heading' | 'internal_link' | 'keyword_optimization'
  priority: 'high' | 'medium' | 'low'
  current?: string
  suggested: string
  impact: string
  reasoning: string
  keywords?: string[]
}

interface ContentAnalysis {
  id: string
  title: string
  url: string
  currentScore: number
  potentialScore: number
  keywords: KeywordData[]
  suggestions: SEOSuggestion[]
  competitors: {
    url: string
    title: string
    position: number
    score: number
  }[]
  internalLinks: {
    current: number
    suggested: number
    opportunities: string[]
  }
  analyzedAt: Date
  status: 'analyzing' | 'completed' | 'error'
}

interface SEOAgentProps {
  onAnalyzeContent?: (url: string) => void
  onApplySuggestion?: (suggestionId: string) => void
  onResearchKeywords?: (topic: string) => void
}

const DifficultyBadge = ({ difficulty }: { difficulty: KeywordData['difficulty'] }) => {
  const styles = {
    easy: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
    hard: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
  }

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${styles[difficulty]}`}>
      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
    </span>
  )
}

const PriorityBadge = ({ priority }: { priority: SEOSuggestion['priority'] }) => {
  const styles = {
    high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
    low: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
  }

  const icons = {
    high: AlertTriangle,
    medium: Clock,
    low: Lightbulb
  }

  const Icon = icons[priority]

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${styles[priority]}`}>
      <Icon className="h-3 w-3" />
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  )
}

const TrendIcon = ({ trend }: { trend: KeywordData['trend'] }) => {
  const icons = {
    rising: <TrendingUp className="h-4 w-4 text-green-600" />,
    stable: <Activity className="h-4 w-4 text-blue-600" />,
    declining: <ArrowUpRight className="h-4 w-4 text-red-600 rotate-180" />
  }

  return icons[trend]
}

const ScoreCircle = ({ current, potential }: { current: number; potential: number }) => {
  const radius = 20
  const circumference = 2 * Math.PI * radius
  const currentStroke = (current / 100) * circumference
  const potentialStroke = (potential / 100) * circumference

  return (
    <div className="relative w-12 h-12">
      <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
        {/* Background circle */}
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          className=" opacity-20"
        />
        {/* Current score */}
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - currentStroke}
          className="text-blue-600"
        />
        {/* Potential score (dashed) */}
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeDasharray={`2 4`}
          strokeDashoffset={circumference - potentialStroke}
          className="text-green-600 opacity-60"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold">{current}</span>
      </div>
    </div>
  )
}

export function SEOAgent({ onAnalyzeContent, onApplySuggestion, onResearchKeywords }: SEOAgentProps) {
  const [activeTab, setActiveTab] = useState<'analyze' | 'keywords' | 'suggestions' | 'performance'>('analyze')
  const [analyzing, setAnalyzing] = useState(false)
  const [urlToAnalyze, setUrlToAnalyze] = useState('')
  const [keywordQuery, setKeywordQuery] = useState('')
  const [expandedAnalysis, setExpandedAnalysis] = useState<Set<string>>(new Set())
  const [filterDifficulty, setFilterDifficulty] = useState<'all' | KeywordData['difficulty']>('all')
  const [filterPriority, setFilterPriority] = useState<'all' | SEOSuggestion['priority']>('all')

  // Mock data - replace with actual SEO API calls
  const [analyses, setAnalyses] = useState<ContentAnalysis[]>([
    {
      id: '1',
      title: 'Digital Discipleship in the Modern Church',
      url: 'https://alanhirsch.com/digital-discipleship',
      currentScore: 67,
      potentialScore: 89,
      keywords: [
        {
          keyword: 'digital discipleship',
          searchVolume: 1200,
          difficulty: 'medium',
          cpc: 1.85,
          trend: 'rising',
          relevanceScore: 95,
          intent: 'informational'
        },
        {
          keyword: 'church technology',
          searchVolume: 3400,
          difficulty: 'hard',
          cpc: 2.45,
          trend: 'stable',
          relevanceScore: 78,
          intent: 'commercial'
        },
        {
          keyword: 'online discipleship',
          searchVolume: 890,
          difficulty: 'easy',
          cpc: 1.20,
          trend: 'rising',
          relevanceScore: 92,
          intent: 'informational'
        }
      ],
      suggestions: [
        {
          id: '1-1',
          type: 'title',
          priority: 'high',
          current: 'Digital Discipleship in the Modern Church',
          suggested: 'Digital Discipleship: A Complete Guide for Modern Churches (2025)',
          impact: '+15% click-through rate',
          reasoning: 'Adding year and "Complete Guide" increases search intent matching and urgency',
          keywords: ['digital discipleship', 'modern churches', '2025']
        },
        {
          id: '1-2',
          type: 'meta_description',
          priority: 'high',
          current: 'Learn about digital discipleship strategies for churches.',
          suggested: 'Discover proven digital discipleship strategies that help churches build authentic relationships online. Includes practical tools, case studies, and implementation guides for 2025.',
          impact: '+12% organic CTR',
          reasoning: 'More descriptive, includes benefits and social proof, targets long-tail keywords',
          keywords: ['digital discipleship strategies', 'churches', 'online relationships']
        },
        {
          id: '1-3',
          type: 'internal_link',
          priority: 'medium',
          suggested: 'Link to "Church Leadership" and "Technology in Ministry" pages',
          impact: '+8% page authority',
          reasoning: 'Creates topical clusters and distributes link equity to related content',
          keywords: ['church leadership', 'technology ministry']
        }
      ],
      competitors: [
        {
          url: 'https://churchleaders.com/digital-discipleship',
          title: 'Digital Discipleship Strategies for Churches',
          position: 3,
          score: 78
        },
        {
          url: 'https://ministrytodaymag.com/church-tech',
          title: 'Church Technology and Digital Ministry',
          position: 7,
          score: 65
        }
      ],
      internalLinks: {
        current: 3,
        suggested: 8,
        opportunities: [
          'Link to "Church Leadership Development" series',
          'Reference "Technology in Ministry" resources',
          'Connect to "Future of Church" content',
          'Link missional church principles',
          'Reference community building strategies'
        ]
      },
      analyzedAt: new Date('2025-08-24'),
      status: 'completed'
    }
  ])

  const [keywordResearch, setKeywordResearch] = useState<KeywordData[]>([
    {
      keyword: 'missional church leadership',
      searchVolume: 2100,
      difficulty: 'medium',
      cpc: 1.95,
      trend: 'rising',
      relevanceScore: 98,
      intent: 'informational'
    },
    {
      keyword: 'church planting strategies',
      searchVolume: 1800,
      difficulty: 'hard',
      cpc: 2.75,
      trend: 'stable',
      relevanceScore: 95,
      intent: 'commercial'
    },
    {
      keyword: 'church leadership training',
      searchVolume: 4500,
      difficulty: 'hard',
      cpc: 3.20,
      trend: 'rising',
      relevanceScore: 88,
      intent: 'commercial'
    },
    {
      keyword: 'digital ministry tools',
      searchVolume: 1600,
      difficulty: 'easy',
      cpc: 1.60,
      trend: 'rising',
      relevanceScore: 82,
      intent: 'transactional'
    }
  ])

  const handleAnalyzeContent = async () => {
    if (!urlToAnalyze) return
    
    setAnalyzing(true)
    onAnalyzeContent?.(urlToAnalyze)
    
    // Mock analysis - replace with actual SEO API
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const newAnalysis: ContentAnalysis = {
      id: Date.now().toString(),
      title: 'New Content Analysis',
      url: urlToAnalyze,
      currentScore: Math.floor(Math.random() * 40) + 40,
      potentialScore: Math.floor(Math.random() * 20) + 80,
      keywords: [],
      suggestions: [],
      competitors: [],
      internalLinks: { current: 0, suggested: 0, opportunities: [] },
      analyzedAt: new Date(),
      status: 'completed'
    }
    
    setAnalyses(prev => [newAnalysis, ...prev])
    setAnalyzing(false)
    setUrlToAnalyze('')
  }

  const handleKeywordResearch = async () => {
    if (!keywordQuery) return
    
    onResearchKeywords?.(keywordQuery)
    
    // Mock keyword research - replace with actual keyword API
    const mockKeywords: KeywordData[] = [
      {
        keyword: keywordQuery,
        searchVolume: Math.floor(Math.random() * 5000) + 500,
        difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)] as KeywordData['difficulty'],
        cpc: Math.round((Math.random() * 3 + 1) * 100) / 100,
        trend: ['rising', 'stable', 'declining'][Math.floor(Math.random() * 3)] as KeywordData['trend'],
        relevanceScore: Math.floor(Math.random() * 30) + 70,
        intent: ['informational', 'commercial', 'transactional', 'navigational'][Math.floor(Math.random() * 4)] as KeywordData['intent']
      }
    ]
    
    setKeywordResearch(prev => [...mockKeywords, ...prev])
    setKeywordQuery('')
  }

  const toggleAnalysis = (analysisId: string) => {
    setExpandedAnalysis(prev => {
      const newSet = new Set(prev)
      if (newSet.has(analysisId)) {
        newSet.delete(analysisId)
      } else {
        newSet.add(analysisId)
      }
      return newSet
    })
  }

  const filteredKeywords = keywordResearch.filter(keyword =>
    filterDifficulty === 'all' || keyword.difficulty === filterDifficulty
  )

  const filteredSuggestions = analyses.flatMap(analysis => 
    analysis.suggestions.filter(suggestion =>
      filterPriority === 'all' || suggestion.priority === filterPriority
    )
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">SEO Agent</h2>
          <p className="-foreground">Research keywords, analyze content, and get optimization suggestions</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-outline flex items-center gap-2">
            <Settings className="h-4 w-4" />
            SEO Settings
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          {[
            { id: 'analyze', label: 'Content Analysis', icon: Search },
            { id: 'keywords', label: 'Keyword Research', icon: Target },
            { id: 'suggestions', label: 'Suggestions', icon: Lightbulb },
            { id: 'performance', label: 'Performance', icon: BarChart3 }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent hover:text-foreground hover:border-muted-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
                {tab.id === 'suggestions' && filteredSuggestions.filter(s => s.priority === 'high').length > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 ml-1">
                    {filteredSuggestions.filter(s => s.priority === 'high').length}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'analyze' && (
          <div className="space-y-6">
            {/* Analysis Input */}
            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">Analyze Content for SEO</h3>
              <div className="flex gap-3">
                <input
                  type="url"
                  value={urlToAnalyze}
                  onChange={(e) => setUrlToAnalyze(e.target.value)}
                  placeholder="https://alanhirsch.com/article-url"
                  className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  onClick={handleAnalyzeContent}
                  disabled={!urlToAnalyze || analyzing}
                  className="btn-primary flex items-center gap-2"
                >
                  {analyzing ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                  {analyzing ? 'Analyzing...' : 'Analyze'}
                </button>
              </div>
            </div>

            {/* Analysis Results */}
            <div className="space-y-4">
              {analyses.map(analysis => (
                <div key={analysis.id} className="bg-background border border-border rounded-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <button
                            onClick={() => toggleAnalysis(analysis.id)}
                            className="p-1 hover:bg-muted rounded"
                          >
                            {expandedAnalysis.has(analysis.id) ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </button>
                          <h3 className="text-lg font-semibold text-foreground">{analysis.title}</h3>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm mb-4">
                          <span className="flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            {analysis.url}
                          </span>
                          <span>Analyzed {analysis.analyzedAt.toLocaleDateString()}</span>
                          <span>{analysis.suggestions.filter(s => s.priority === 'high').length} high priority issues</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="flex items-center gap-3">
                            <ScoreCircle current={analysis.currentScore} potential={analysis.potentialScore} />
                            <div>
                              <p className="text-sm font-medium">SEO Score</p>
                              <p className="text-xs">
                                Current: {analysis.currentScore} → Potential: {analysis.potentialScore}
                              </p>
                            </div>
                          </div>
                          
                          <div className="text-center p-3 bg-muted/30 rounded-lg">
                            <p className="text-2xl font-bold text-primary">{analysis.keywords.length}</p>
                            <p className="text-sm">Keywords</p>
                          </div>
                          
                          <div className="text-center p-3 bg-muted/30 rounded-lg">
                            <p className="text-2xl font-bold text-orange-600">{analysis.suggestions.length}</p>
                            <p className="text-sm">Suggestions</p>
                          </div>
                          
                          <div className="text-center p-3 bg-muted/30 rounded-lg">
                            <p className="text-2xl font-bold text-green-600">{analysis.internalLinks.suggested}</p>
                            <p className="text-sm">Link Opportunities</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <button className="btn-outline text-sm flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          View Report
                        </button>
                        <button className="p-2 hover:text-foreground hover:bg-muted rounded-md transition-colors">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {expandedAnalysis.has(analysis.id) && (
                    <div className="border-t border-border bg-muted/30 p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Top Keywords */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">Top Keywords</h4>
                          <div className="space-y-3">
                            {analysis.keywords.slice(0, 5).map(keyword => (
                              <div key={keyword.keyword} className="flex items-center justify-between p-3 bg-background border border-border rounded-lg">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-sm">{keyword.keyword}</span>
                                    <TrendIcon trend={keyword.trend} />
                                  </div>
                                  <div className="flex items-center gap-3 text-xs">
                                    <span>{keyword.searchVolume.toLocaleString()} searches/mo</span>
                                    <span>${keyword.cpc} CPC</span>
                                    <span>{keyword.relevanceScore}% relevance</span>
                                  </div>
                                </div>
                                <DifficultyBadge difficulty={keyword.difficulty} />
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Top Suggestions */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">Priority Suggestions</h4>
                          <div className="space-y-3">
                            {analysis.suggestions.slice(0, 3).map(suggestion => (
                              <div key={suggestion.id} className="p-3 bg-background border border-border rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium text-sm capitalize">{suggestion.type.replace('_', ' ')}</span>
                                    <PriorityBadge priority={suggestion.priority} />
                                  </div>
                                  <button
                                    onClick={() => onApplySuggestion?.(suggestion.id)}
                                    className="btn-sm btn-primary"
                                  >
                                    Apply
                                  </button>
                                </div>
                                <p className="text-xs mb-2">{suggestion.reasoning}</p>
                                <div className="text-xs">
                                  <div className="flex items-center gap-2 text-green-600">
                                    <ArrowUpRight className="h-3 w-3" />
                                    <span>Impact: {suggestion.impact}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Internal Link Opportunities */}
                      {analysis.internalLinks.opportunities.length > 0 && (
                        <div className="mt-6">
                          <h4 className="font-semibold text-foreground mb-3">Internal Link Opportunities</h4>
                          <div className="bg-background border border-border rounded-lg p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                              {analysis.internalLinks.opportunities.map((opportunity, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm">
                                  <Link className="h-3 w-3 text-primary flex-shrink-0" />
                                  <span>{opportunity}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {analyses.length === 0 && (
              <div className="bg-background border border-border rounded-lg p-12 text-center">
                <Search className="h-12 w-12 mx-auto mb-4" />
                <p className="text-xl font-semibold mb-2">No content analyzed yet</p>
                <p className="-foreground mb-6">
                  Enter a URL above to get comprehensive SEO analysis with keyword insights and optimization suggestions
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'keywords' && (
          <div className="space-y-6">
            {/* Keyword Research Input */}
            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">Keyword Research</h3>
              <div className="flex gap-3 mb-4">
                <input
                  type="text"
                  value={keywordQuery}
                  onChange={(e) => setKeywordQuery(e.target.value)}
                  placeholder="e.g., church leadership, missional ministry"
                  className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  onClick={handleKeywordResearch}
                  disabled={!keywordQuery}
                  className="btn-primary flex items-center gap-2"
                >
                  <Target className="h-4 w-4" />
                  Research
                </button>
              </div>
              
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-foreground">Filter by difficulty:</label>
                <select
                  value={filterDifficulty}
                  onChange={(e) => setFilterDifficulty(e.target.value as typeof filterDifficulty)}
                  className="px-3 py-1 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">All Difficulties</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            {/* Keywords Table */}
            <div className="bg-background border border-border rounded-lg overflow-hidden">
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Keyword Opportunities</h3>
                  <span className="text-sm">{filteredKeywords.length} keywords</span>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/30">
                    <tr>
                      <th className="text-left p-4 text-sm font-medium">Keyword</th>
                      <th className="text-left p-4 text-sm font-medium">Volume</th>
                      <th className="text-left p-4 text-sm font-medium">Difficulty</th>
                      <th className="text-left p-4 text-sm font-medium">CPC</th>
                      <th className="text-left p-4 text-sm font-medium">Trend</th>
                      <th className="text-left p-4 text-sm font-medium">Intent</th>
                      <th className="text-left p-4 text-sm font-medium">Relevance</th>
                      <th className="text-right p-4 text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredKeywords.map(keyword => (
                      <tr key={keyword.keyword} className="hover:bg-muted/20 transition-colors">
                        <td className="p-4">
                          <div className="font-medium text-sm">{keyword.keyword}</div>
                        </td>
                        <td className="p-4 text-sm">
                          {keyword.searchVolume.toLocaleString()}/mo
                        </td>
                        <td className="p-4">
                          <DifficultyBadge difficulty={keyword.difficulty} />
                        </td>
                        <td className="p-4 text-sm">
                          ${keyword.cpc}
                        </td>
                        <td className="p-4">
                          <TrendIcon trend={keyword.trend} />
                        </td>
                        <td className="p-4">
                          <span className="text-xs px-2 py-1 bg-muted rounded-full capitalize">
                            {keyword.intent}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-muted rounded-full">
                              <div 
                                className="h-2 bg-green-500 rounded-full"
                                style={{ width: `${keyword.relevanceScore}%` }}
                              />
                            </div>
                            <span className="text-xs">{keyword.relevanceScore}%</span>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center gap-2 justify-end">
                            <button className="p-1 hover:text-foreground hover:bg-muted rounded transition-colors">
                              <Plus className="h-4 w-4" />
                            </button>
                            <button className="p-1 hover:text-foreground hover:bg-muted rounded transition-colors">
                              <Star className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'suggestions' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">SEO Suggestions</h3>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value as typeof filterPriority)}
                className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>

            <div className="space-y-4">
              {filteredSuggestions.map(suggestion => (
                <div key={suggestion.id} className="bg-background border border-border rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-foreground capitalize">
                          {suggestion.type.replace('_', ' ')} Optimization
                        </h4>
                        <PriorityBadge priority={suggestion.priority} />
                      </div>
                      <p className="text-sm">{suggestion.reasoning}</p>
                    </div>
                    
                    <button
                      onClick={() => onApplySuggestion?.(suggestion.id)}
                      className="btn-primary ml-4"
                    >
                      Apply Suggestion
                    </button>
                  </div>

                  {suggestion.current && (
                    <div className="mb-4">
                      <label className="block text-xs font-medium mb-2">Current:</label>
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                        <p className="text-sm text-red-800 dark:text-red-200">{suggestion.current}</p>
                      </div>
                    </div>
                  )}

                  <div className="mb-4">
                    <label className="block text-xs font-medium mb-2">Suggested:</label>
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                      <p className="text-sm text-green-800 dark:text-green-200">{suggestion.suggested}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-green-600">
                        <TrendingUp className="h-4 w-4" />
                        <span>Expected Impact: {suggestion.impact}</span>
                      </div>
                      {suggestion.keywords && (
                        <div className="flex items-center gap-1">
                          <Target className="h-4 w-4 text-blue-600" />
                          <span className="-foreground">Keywords:</span>
                          {suggestion.keywords.slice(0, 2).map(keyword => (
                            <span key={keyword} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:text-foreground hover:bg-muted rounded-md transition-colors">
                        <Copy className="h-4 w-4" />
                      </button>
                      <button className="p-2 hover:text-foreground hover:bg-muted rounded-md transition-colors">
                        <Edit3 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredSuggestions.length === 0 && (
                <div className="bg-background border border-border rounded-lg p-12 text-center">
                  <Lightbulb className="h-12 w-12 mx-auto mb-4" />
                  <p className="text-xl font-semibold mb-2">No suggestions available</p>
                  <p className="-foreground">
                    Analyze some content first to get personalized SEO optimization suggestions
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-6">
            {/* Performance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-background border border-border rounded-lg p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-2">47</div>
                <div className="text-sm">Avg. Position</div>
                <div className="text-xs text-green-600 mt-1">↑ 12 positions</div>
              </div>
              
              <div className="bg-background border border-border rounded-lg p-6 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">2.3K</div>
                <div className="text-sm">Monthly Clicks</div>
                <div className="text-xs text-green-600 mt-1">↑ 18%</div>
              </div>
              
              <div className="bg-background border border-border rounded-lg p-6 text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">1.8M</div>
                <div className="text-sm">Impressions</div>
                <div className="text-xs text-green-600 mt-1">↑ 25%</div>
              </div>
              
              <div className="bg-background border border-border rounded-lg p-6 text-center">
                <div className="text-2xl font-bold text-orange-600 mb-2">3.2%</div>
                <div className="text-sm">Avg. CTR</div>
                <div className="text-xs text-red-600 mt-1">↓ 0.2%</div>
              </div>
            </div>

            {/* Top Performing Content */}
            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">Top Performing Content</h3>
              <div className="space-y-4">
                {[
                  { title: 'Digital Discipleship Guide', clicks: 890, impressions: 12500, ctr: 7.1, position: 3 },
                  { title: 'Missional Church Leadership', clicks: 654, impressions: 9800, ctr: 6.7, position: 5 },
                  { title: 'Church Planting Strategies', clicks: 432, impressions: 8200, ctr: 5.3, position: 8 }
                ].map((content, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm mb-1">{content.title}</h4>
                      <div className="flex items-center gap-4 text-xs">
                        <span>{content.clicks} clicks</span>
                        <span>{content.impressions.toLocaleString()} impressions</span>
                        <span>{content.ctr}% CTR</span>
                        <span>Position {content.position}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm font-medium">#{index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
