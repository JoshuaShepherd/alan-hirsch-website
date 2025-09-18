'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { StatusIndicator } from './animated-components';

interface WorkflowNodeProps {
  icon: ReactNode;
  title: string;
  status: 'connected' | 'waiting' | 'error';
  position: { x: number; y: number };
}

interface WorkflowConnectionProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  animated?: boolean;
}

function WorkflowNode({ icon, title, status, position }: WorkflowNodeProps) {
  const statusColors = {
    connected: 'border-green-500/50 bg-green-500/10',
    waiting: 'border-yellow-500/50 bg-yellow-500/10',
    error: 'border-red-500/50 bg-red-500/10'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="absolute"
      style={{ left: position.x, top: position.y }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={`w-16 h-16 rounded-xl border-2 ${statusColors[status]} backdrop-blur-sm flex items-center justify-center relative`}
      >
        <div className="text-white text-xl">{icon}</div>
        
        {status === 'connected' && (
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.div>
      
      <div className="mt-2 text-center">
        <p className="text-sm font-medium text-white">{title}</p>
        <StatusIndicator status={status} label={status} className="mt-1" />
      </div>
    </motion.div>
  );
}

function WorkflowConnection({ from, to, animated = true }: WorkflowConnectionProps) {
  const pathData = `M ${from.x + 32} ${from.y + 32} L ${to.x + 32} ${to.y + 32}`;
  
  return (
    <svg 
      className="absolute inset-0 pointer-events-none" 
      style={{ width: '100%', height: '100%' }}
    >
      <motion.path
        d={pathData}
        stroke="url(#connectionGradient)"
        strokeWidth="2"
        fill="none"
        strokeDasharray={animated ? "5,5" : "none"}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      
      {animated && (
        <motion.circle
          r="3"
          fill="#3b82f6"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <animateMotion dur="2s" repeatCount="indefinite">
            <mpath href="#connectionPath" />
          </animateMotion>
        </motion.circle>
      )}
      
      <defs>
        <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.5" />
        </linearGradient>
      </defs>
    </svg>
  );
}

interface WorkflowVisualizationProps {
  nodes: Array<{
    id: string;
    icon: ReactNode;
    title: string;
    status: 'connected' | 'waiting' | 'error';
    position: { x: number; y: number };
  }>;
  connections: Array<{
    from: string;
    to: string;
    animated?: boolean;
  }>;
  className?: string;
}

export function WorkflowVisualization({ nodes, connections, className = '' }: WorkflowVisualizationProps) {
  const nodeMap = new Map(nodes.map(node => [node.id, node]));
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative bg-gray-900/30 rounded-2xl p-8 backdrop-blur-sm border border-gray-800 overflow-hidden ${className}`}
      style={{ minHeight: '400px' }}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* Connections */}
      {connections.map((connection, index) => {
        const fromNode = nodeMap.get(connection.from);
        const toNode = nodeMap.get(connection.to);
        
        if (!fromNode || !toNode) return null;
        
        return (
          <WorkflowConnection
            key={index}
            from={fromNode.position}
            to={toNode.position}
            animated={connection.animated}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((node) => (
        <WorkflowNode
          key={node.id}
          icon={node.icon}
          title={node.title}
          status={node.status}
          position={node.position}
        />
      ))}

      {/* Floating Orbs */}
      <motion.div
        className="absolute top-4 right-4 w-8 h-8 bg-blue-500/20 rounded-full blur-sm"
        animate={{
          y: [-10, 10, -10],
          x: [-5, 5, -5]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-4 left-4 w-6 h-6 bg-purple-500/20 rounded-full blur-sm"
        animate={{
          y: [10, -10, 10],
          x: [5, -5, 5]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </motion.div>
  );
}

interface DashboardPreviewProps {
  title: string;
  metrics: Array<{
    label: string;
    value: string;
    trend?: 'up' | 'down' | 'neutral';
  }>;
  className?: string;
}

export function DashboardPreview({ title, metrics, className = '' }: DashboardPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`bg-gray-900/50 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="bg-gray-800/50 rounded-lg p-4"
          >
            <p className="text-xs text-gray-400 mb-1">{metric.label}</p>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-white">{metric.value}</span>
              {metric.trend && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className={`text-xs px-2 py-1 rounded-full ${
                    metric.trend === 'up' 
                      ? 'bg-green-500/20 text-green-400'
                      : metric.trend === 'down'
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}
                >
                  {metric.trend === 'up' ? '↗' : metric.trend === 'down' ? '↘' : '→'}
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>Progress</span>
          <span>78%</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '78%' }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
