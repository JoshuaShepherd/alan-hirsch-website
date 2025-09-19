'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Vortex } from '@/components/ui/vortex'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Dna, 
  Code, 
  Palette, 
  Settings, 
  Lightbulb, 
  ArrowRight,
  Play,
  BookOpen,
  Microscope,
  Atom,
  Sparkles,
  Github,
  Copy,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

// DNA-themed Vortex component
const DNAVortex = ({ children, ...props }: any) => {
  return (
    <Vortex
      backgroundColor="#0a0a0a"
      particleCount={400}
      baseHue={200}
      rangeSpeed={0.8}
      baseRadius={1.5}
      rangeRadius={2}
      baseSpeed={0.1}
      {...props}
    >
      {children}
    </Vortex>
  )
}

// Code snippet component
const CodeSnippet = ({ 
  title, 
  language = "tsx", 
  code, 
  description 
}: {
  title: string
  language?: string
  code: string
  description?: string
}) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="mt-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="ml-2"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </CardContent>
    </Card>
  )
}

// Collapsible section component
const CollapsibleSection = ({ 
  title, 
  children, 
  defaultOpen = false 
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <Card className="mt-6">
      <CardHeader 
        className="cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </CardHeader>
      {isOpen && (
        <CardContent className="pt-0">
          {children}
        </CardContent>
      )}
    </Card>
  )
}

export default function MDNAHeroPage() {
  const [activeDemo, setActiveDemo] = useState('original')

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Vortex */}
      <section className="relative h-screen overflow-hidden">
        <DNAVortex
          className="flex items-center flex-col justify-center px-4 md:px-10 py-4 w-full h-full"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <Dna className="h-12 w-12 text-blue-400 mr-4" />
              <h1 className="text-white text-4xl md:text-7xl font-bold">
                mDNA Hero
              </h1>
            </div>
            
            <p className="text-blue-200 text-lg md:text-2xl max-w-3xl mx-auto mb-8">
              Discover your Missional DNA - the unique genetic code that defines your calling, 
              gifts, and purpose in God&apos;s mission to the world.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Play className="h-5 w-5 mr-2" />
                Take Assessment
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-black">
                <BookOpen className="h-5 w-5 mr-2" />
                Learn More
              </Button>
            </div>
          </motion.div>
        </DNAVortex>
      </section>

      {/* Educational Content Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Building the Vortex Effect
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Learn how to create and customize the Aceternity Vortex component, 
            and explore how to adapt it for DNA-themed visualizations.
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="setup">Setup</TabsTrigger>
            <TabsTrigger value="implementation">Implementation</TabsTrigger>
            <TabsTrigger value="customization">Customization</TabsTrigger>
            <TabsTrigger value="dna-theme">DNA Theme</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sparkles className="h-5 w-5 mr-2 text-purple-600" />
                    What is the Vortex Component?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    The Vortex component is a particle-based animation system that creates 
                    flowing, organic movement patterns using Simplex noise and HTML5 Canvas.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                    <li>700+ animated particles by default</li>
                    <li>Simplex noise for organic movement</li>
                    <li>Canvas-based rendering with glow effects</li>
                    <li>Fully customizable colors and behaviors</li>
                    <li>Motion/React integration for smooth animations</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Atom className="h-5 w-5 mr-2 text-blue-600" />
                    Key Technologies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Badge variant="secondary" className="mr-2">Canvas API</Badge>
                      <span className="text-sm text-gray-600">Hardware-accelerated rendering</span>
                    </div>
                    <div className="flex items-center">
                      <Badge variant="secondary" className="mr-2">Simplex Noise</Badge>
                      <span className="text-sm text-gray-600">Natural, organic movement patterns</span>
                    </div>
                    <div className="flex items-center">
                      <Badge variant="secondary" className="mr-2">Motion/React</Badge>
                      <span className="text-sm text-gray-600">Smooth component animations</span>
                    </div>
                    <div className="flex items-center">
                      <Badge variant="secondary" className="mr-2">TypeScript</Badge>
                      <span className="text-sm text-gray-600">Type-safe particle system</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="setup" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-green-600" />
                  Project Setup Requirements
                </CardTitle>
                <CardDescription>
                  Ensure your project has the necessary dependencies and structure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Required Dependencies</h3>
                    <CodeSnippet
                      title="Install Required Packages"
                      language="bash"
                      code={`npm install simplex-noise motion
npm install @types/node # if using TypeScript`}
                      description="Core dependencies for the Vortex component"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Project Structure Verification</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">
                        Ensure your project has this structure:
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        <li>✅ shadcn/ui project structure</li>
                        <li>✅ Tailwind CSS v4.0</li>
                        <li>✅ TypeScript configuration</li>
                        <li>✅ /components/ui folder exists</li>
                      </ul>
                    </div>
                  </div>

                  <CollapsibleSection title="Creating /components/ui folder (if missing)">
                    <p className="text-gray-600 mb-4">
                      The /components/ui folder is crucial for shadcn/ui components. If it doesn&apos;t exist:
                    </p>
                    <CodeSnippet
                      title="Create UI Components Folder"
                      language="bash"
                      code={`mkdir -p src/components/ui
# or if using app directory
mkdir -p components/ui`}
                    />
                  </CollapsibleSection>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="implementation" className="mt-8">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Code className="h-5 w-5 mr-2 text-blue-600" />
                    Core Vortex Component
                  </CardTitle>
                  <CardDescription>
                    The main particle animation system with Canvas rendering
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeSnippet
                    title="components/ui/vortex.tsx"
                    code={`interface VortexProps {
  children?: any;
  className?: string;
  containerClassName?: string;
  particleCount?: number;
  rangeY?: number;
  baseHue?: number;
  baseSpeed?: number;
  rangeSpeed?: number;
  baseRadius?: number;
  rangeRadius?: number;
  backgroundColor?: string;
}

export const Vortex = (props: VortexProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const noise3D = createNoise3D();
  
  // Particle system initialization
  const initParticles = () => {
    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
      initParticle(i);
    }
  };

  // Main animation loop
  const draw = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawParticles(ctx);
    renderGlow(canvas, ctx);
    
    animationFrameId.current = window.requestAnimationFrame(() =>
      draw(canvas, ctx)
    );
  };

  return (
    <div className={cn("relative h-full w-full", props.containerClassName)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 z-0"
      >
        <canvas ref={canvasRef}></canvas>
      </motion.div>
      <div className={cn("relative z-10", props.className)}>
        {props.children}
      </div>
    </div>
  );
};`}
                    description="Core component structure with particle system and canvas rendering"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Animation Concepts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Particle Properties</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Position (x, y)</li>
                        <li>• Velocity (vx, vy)</li>
                        <li>• Life cycle (life, ttl)</li>
                        <li>• Visual properties (speed, radius, hue)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Simplex Noise</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 3D noise field (x, y, time)</li>
                        <li>• Organic movement patterns</li>
                        <li>• Directional flow calculation</li>
                        <li>• Smooth particle transitions</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="customization" className="mt-8">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Palette className="h-5 w-5 mr-2 text-purple-600" />
                    Visual Customization Options
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Color System</h4>
                      <CodeSnippet
                        title="Custom Color Schemes"
                        code={`// Ocean theme
<Vortex
  backgroundColor="#001122"
  baseHue={200}  // Blue base
  rangeHue={60}  // Blue to cyan range
/>

// Fire theme
<Vortex
  backgroundColor="#110000"
  baseHue={0}    // Red base
  rangeHue={60}  // Red to orange range
/>

// Forest theme
<Vortex
  backgroundColor="#001100"
  baseHue={120}  // Green base
  rangeHue={40}  // Green variations
/>`}
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Movement Patterns</h4>
                      <CodeSnippet
                        title="Animation Behaviors"
                        code={`// Calm, gentle flow
<Vortex
  particleCount={300}
  baseSpeed={0.05}
  rangeSpeed={0.5}
/>

// Energetic, fast flow
<Vortex
  particleCount={800}
  baseSpeed={0.2}
  rangeSpeed={2.0}
/>

// Dense, slow swirl
<Vortex
  particleCount={1000}
  baseSpeed={0.01}
  rangeSpeed={0.3}
/>`}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <CollapsibleSection title="Advanced Customization Parameters">
                <div className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium mb-2">Particle Control</h5>
                      <ul className="space-y-1 text-gray-600">
                        <li><code>particleCount</code>: Number of particles</li>
                        <li><code>baseRadius</code>: Minimum particle size</li>
                        <li><code>rangeRadius</code>: Size variation</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Movement</h5>
                      <ul className="space-y-1 text-gray-600">
                        <li><code>baseSpeed</code>: Minimum velocity</li>
                        <li><code>rangeSpeed</code>: Speed variation</li>
                        <li><code>rangeY</code>: Vertical spawn range</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Visual</h5>
                      <ul className="space-y-1 text-gray-600">
                        <li><code>baseHue</code>: Primary color (0-360)</li>
                        <li><code>backgroundColor</code>: Canvas background</li>
                        <li><code>className</code>: Content styling</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CollapsibleSection>
            </div>
          </TabsContent>

          <TabsContent value="dna-theme" className="mt-8">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Dna className="h-5 w-5 mr-2 text-blue-600" />
                    Creating DNA-Themed Visualizations
                  </CardTitle>
                  <CardDescription>
                    Transform the Vortex into a biological, DNA-inspired animation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">DNA Double Helix Concept</h4>
                      <p className="text-gray-600 mb-4">
                        To create a DNA-like effect, we need to modify the particle behavior to follow 
                        helical paths and use appropriate colors representing nucleotide bases.
                      </p>
                      
                      <CodeSnippet
                        title="DNA-Inspired Vortex Configuration"
                        code={`const DNAVortex = ({ children, ...props }) => {
  return (
    <Vortex
      backgroundColor="#0a0a0a"
      particleCount={400}
      baseHue={200}        // Blue base (representing DNA backbone)
      rangeSpeed={0.8}     // Moderate flow speed
      baseRadius={1.5}     // Slightly larger particles
      rangeRadius={2}      // Some size variation
      baseSpeed={0.1}      // Slow, organic movement
      {...props}
    >
      {children}
    </Vortex>
  )
}`}
                      />
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Advanced DNA Customizations</h4>
                      <p className="text-gray-600 mb-4">
                        For a more authentic DNA representation, consider these modifications:
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-medium mb-2">Color Scheme</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• <span className="text-blue-500">Blue (200°)</span>: Phosphate backbone</li>
                            <li>• <span className="text-green-500">Green (120°)</span>: Guanine base</li>
                            <li>• <span className="text-red-500">Red (0°)</span>: Adenine base</li>
                            <li>• <span className="text-yellow-500">Yellow (60°)</span>: Thymine base</li>
                            <li>• <span className="text-purple-500">Purple (280°)</span>: Cytosine base</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium mb-2">Movement Patterns</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Slower, more deliberate motion</li>
                            <li>• Reduced randomness for structure</li>
                            <li>• Vertical flow emphasis</li>
                            <li>• Paired particle interactions</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <CollapsibleSection title="Custom DNA Particle System (Advanced)">
                      <p className="text-gray-600 mb-4">
                        For a true DNA helix, you would need to modify the core particle update logic:
                      </p>
                      <CodeSnippet
                        title="Helical Movement Pattern"
                        code={`// Modified updateParticle function for DNA helix
const updateParticle = (i: number, ctx: CanvasRenderingContext2D) => {
  // ... existing code ...
  
  // Add helical motion
  const helixRadius = 50;
  const helixSpeed = 0.02;
  const helixOffset = (i / particlePropCount) * 0.1;
  
  // Calculate helix positions
  const helixX = center[0] + Math.cos(tick * helixSpeed + helixOffset) * helixRadius;
  const helixY = y + Math.sin(tick * helixSpeed + helixOffset) * 10;
  
  // Blend with existing noise movement
  x2 = lerp(x2, helixX, 0.3);
  y2 = lerp(y2, helixY, 0.1);
  
  // Color coding for base pairs
  const isBasePair = (i % 8) === 0;
  if (isBasePair) {
    hue = [0, 60, 120, 280][Math.floor(Math.random() * 4)]; // A, T, G, C
  }
  
  // ... rest of particle update ...
};`}
                        description="Advanced modification for authentic DNA helix movement"
                      />
                    </CollapsibleSection>

                    <div>
                      <h4 className="font-semibold mb-3">Biological Accuracy vs. Artistic Effect</h4>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Design Philosophy:</strong> While true DNA visualization would require 
                          precise helical mathematics, the current Vortex component excels at creating 
                          an <em>impression</em> of biological flow and organic movement. This artistic 
                          interpretation maintains visual appeal while evoking the essence of genetic material.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Microscope className="h-5 w-5 mr-2 text-green-600" />
                    Implementation Example: mDNA Theme
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeSnippet
                    title="Complete mDNA Hero Component"
                    code={`const MDNAHero = () => {
  return (
    <section className="relative h-screen overflow-hidden">
      <Vortex
        backgroundColor="#0a0a0a"
        particleCount={400}
        baseHue={200}         // DNA backbone blue
        rangeSpeed={0.8}      // Organic flow speed
        baseRadius={1.5}      // Nucleotide size
        rangeRadius={2}       // Size variation
        baseSpeed={0.1}       // Slow, deliberate movement
        className="flex items-center flex-col justify-center px-4 py-4 w-full h-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="flex items-center justify-center mb-6">
            <Dna className="h-12 w-12 text-blue-400 mr-4" />
            <h1 className="text-white text-4xl md:text-7xl font-bold">
              mDNA Hero
            </h1>
          </div>
          
          <p className="text-blue-200 text-lg md:text-2xl max-w-3xl mx-auto mb-8">
            Discover your Missional DNA - the unique genetic code that 
            defines your calling and purpose.
          </p>
          
          <Button className="bg-blue-600 hover:bg-blue-700">
            Explore Your mDNA
          </Button>
        </motion.div>
      </Vortex>
    </section>
  )
}`}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Demo Variations */}
        <section className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">Interactive Demo Variations</h3>
          
          <div className="flex justify-center mb-6">
            <div className="flex space-x-2">
              <Button
                variant={activeDemo === 'original' ? 'default' : 'outline'}
                onClick={() => setActiveDemo('original')}
              >
                Original
              </Button>
              <Button
                variant={activeDemo === 'dna' ? 'default' : 'outline'}
                onClick={() => setActiveDemo('dna')}
              >
                DNA Theme
              </Button>
              <Button
                variant={activeDemo === 'ocean' ? 'default' : 'outline'}
                onClick={() => setActiveDemo('ocean')}
              >
                Ocean
              </Button>
              <Button
                variant={activeDemo === 'fire' ? 'default' : 'outline'}
                onClick={() => setActiveDemo('fire')}
              >
                Fire
              </Button>
            </div>
          </div>

          <Card className="h-96 overflow-hidden">
            {activeDemo === 'original' && (
              <Vortex
                backgroundColor="black"
                className="flex items-center justify-center w-full h-full"
              >
                <h3 className="text-white text-2xl font-bold">Original Vortex</h3>
              </Vortex>
            )}
            
            {activeDemo === 'dna' && (
              <DNAVortex className="flex items-center justify-center w-full h-full">
                <h3 className="text-blue-200 text-2xl font-bold">DNA Theme</h3>
              </DNAVortex>
            )}
            
            {activeDemo === 'ocean' && (
              <Vortex
                backgroundColor="#001122"
                baseHue={200}
                particleCount={500}
                baseSpeed={0.05}
                rangeSpeed={1.0}
                className="flex items-center justify-center w-full h-full"
              >
                <h3 className="text-cyan-200 text-2xl font-bold">Ocean Theme</h3>
              </Vortex>
            )}
            
            {activeDemo === 'fire' && (
              <Vortex
                backgroundColor="#220000"
                baseHue={0}
                particleCount={600}
                baseSpeed={0.15}
                rangeSpeed={1.5}
                className="flex items-center justify-center w-full h-full"
              >
                <h3 className="text-orange-200 text-2xl font-bold">Fire Theme</h3>
              </Vortex>
            )}
          </Card>
        </section>

        {/* Resource Links */}
        <section className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-6">Additional Resources</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" className="flex items-center">
              <Github className="h-4 w-4 mr-2" />
              View Source Code
            </Button>
            <Button variant="outline" className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Aceternity Docs
            </Button>
            <Button variant="outline" className="flex items-center">
              <Lightbulb className="h-4 w-4 mr-2" />
              More Examples
            </Button>
          </div>
        </section>
      </section>
    </div>
  )
}
