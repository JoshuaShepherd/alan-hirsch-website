# DNA Helix Vortex Modification Guide

## Overview
Transform the current swirling particle vortex into a DNA double helix structure while maintaining the artistic visual appeal and performance.

## Key Modifications Required

### 1. Particle Initialization Changes
**Current**: Particles are randomly distributed across the canvas width
**DNA Version**: Initialize particles along two helical paths

```typescript
// Replace the initParticle function to create helical positioning
const initParticle = (i: number) => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  let x, y, vx, vy, life, ttl, speed, radius, hue;
  
  // Create DNA helix structure
  const helixIndex = Math.floor(i / particlePropCount);
  const isStrand1 = helixIndex % 2 === 0;
  const helixProgress = (helixIndex / (particleCount / 2)) * Math.PI * 4; // 4 full rotations
  const helixRadius = 100; // Distance from center
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  
  if (isStrand1) {
    // First DNA strand
    x = centerX + Math.cos(helixProgress) * helixRadius;
    y = centerY + (helixProgress / (Math.PI * 4)) * canvas.height * 0.6 - canvas.height * 0.3;
    hue = 200; // Blue for first strand
  } else {
    // Second DNA strand (offset by π)
    x = centerX + Math.cos(helixProgress + Math.PI) * helixRadius;
    y = centerY + (helixProgress / (Math.PI * 4)) * canvas.height * 0.6 - canvas.height * 0.3;
    hue = 300; // Purple for second strand
  }
  
  // Rest remains similar...
};
```

### 2. Movement Pattern Modifications
**Current**: Noise-based organic movement
**DNA Version**: Constrained helical movement with slight wobble

```typescript
const updateParticle = (i: number, ctx: CanvasRenderingContext2D) => {
  // ... existing code ...
  
  // Instead of pure noise movement, use helical constraints
  const helixIndex = Math.floor(i / particlePropCount);
  const isStrand1 = helixIndex % 2 === 0;
  const helixProgress = (tick * 0.01 + helixIndex * 0.1) % (Math.PI * 4);
  
  // Add slight wobble with noise but maintain helix structure
  const wobble = noise3D(x * xOff, y * yOff, tick * zOff) * 0.2;
  const targetX = center[0] + Math.cos(helixProgress + wobble) * (isStrand1 ? 100 : 100);
  const targetY = /* calculate helical Y position */;
  
  // Smooth movement towards helix position
  vx = lerp(vx, (targetX - x) * 0.1, 0.3);
  vy = lerp(vy, (targetY - y) * 0.1, 0.3);
  
  // ... rest of update logic ...
};
```

### 3. Visual Enhancements for DNA
**Base Pairs**: Add connecting lines between strands occasionally
**Color Coding**: Use distinct colors for each strand
**Glow Effects**: Enhance the existing glow to emphasize the helix structure

```typescript
// Add this after drawParticles in the draw function
const drawBasePairs = (ctx: CanvasRenderingContext2D) => {
  // Occasionally draw connecting lines between strands
  for (let i = 0; i < particlePropsLength; i += particlePropCount * 10) {
    const x1 = particleProps[i];
    const y1 = particleProps[i + 1];
    const oppositeIndex = i + (particlePropCount * (particleCount / 2));
    
    if (oppositeIndex < particlePropsLength) {
      const x2 = particleProps[oppositeIndex];
      const y2 = particleProps[oppositeIndex + 1];
      
      // Draw subtle connecting line
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.restore();
    }
  }
};
```

### 4. Animation Timing
**Current**: Continuous swirling
**DNA Version**: Slow rotation with periodic "unwinding" effects

```typescript
// Modify the tick-based animations to include DNA-specific timing
const dnaRotationSpeed = 0.005; // Much slower than current
const unwindingCycle = Math.sin(tick * 0.001) * 0.5 + 0.5; // 0 to 1 cycle
```

### 5. Performance Considerations
- Reduce particle count to ~300-400 for DNA version
- Use fewer noise calculations since movement is more predictable
- Cache helix calculations where possible

## Implementation Steps
1. **Start Small**: Modify just the initParticle function first
2. **Test Movement**: Update particle movement to follow helix paths
3. **Add Visual Details**: Implement base pair connections and color coding
4. **Fine-tune**: Adjust timing, colors, and particle counts for best visual effect
5. **Optimize**: Profile performance and optimize calculations

## Color Scheme Suggestions
- **Strand 1**: Blue-cyan range (hue: 180-220)
- **Strand 2**: Purple-magenta range (hue: 280-320)
- **Base Pairs**: Subtle white/yellow (rgba values)
- **Background**: Keep black or very dark blue

This approach maintains the artistic flow while creating a recognizable DNA double helix structure that would be perfect for Alan Hirsch's biological/organic movement themes.
