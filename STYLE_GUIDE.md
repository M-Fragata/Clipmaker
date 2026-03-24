# ClipMaker – Style Guide & Best Practices

## 🎨 Design Philosophy

This guide ensures ClipMaker maintains its premium, modern aesthetic while remaining performant and maintainable.

---

## 📐 Core Principles

### 1. **Atomic Design (8pt Rhythm)**
```
- Base: 8pt
- Spacings: 8, 16, 24, 32, 40, 48, 64... (multiples of 8)
- Never use arbitrary spacing like 5px, 7px, 13px
- Use: px-1, px-2, px-3, px-4, px-6, px-8, py-12, etc.
```

### 2. **Glassmorphism Layer System**
```html
<!-- Fundação: Background -->
<div class="bg-gradient-to-br from-slate-950 to-slate-900">
    
    <!-- Estética: Glass Effect -->
    <div class="bg-white/5 backdrop-blur-xl border border-white/10">
        
        <!-- Vida: Interactive Elements -->
        <button class="hover:bg-white/10 transition-colors duration-300">
            Click me
        </button>
    </div>
</div>
```

### 3. **Typography Hierarchy**
```
Hero Title:     text-4xl md:text-5xl font-bold tracking-tight leading-tight
Section Title:  text-2xl md:text-3xl font-bold tracking-tight
Card Title:     text-lg font-semibold text-white
Body Text:      text-base text-slate-400 leading-relaxed
Caption:        text-xs text-slate-500 tracking-wider uppercase
```

### 4. **Shadow Depth (No Pure Black)**
```css
/* Near surface */
shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.05)

/* Mid elevation */
shadow-lg: + cyan-500/20 on hover

/* Glow accent */
hover:shadow-cyan-500/50
```

---

## 🎬 Animation Standards

### Duration
```javascript
--duration-fast: 200ms    // Quick feedback
--duration-normal: 300ms  // Standard interaction
--duration-slow: 500ms    // Entrance animations
```

### Easing
```
Entrance:  ease-out (power2.out)      → Feels premium
Exit:      ease-in (power2.in)        → Responsive
Entrance:  ease-out, ease-back.out    → Playful elements
Interaction: ease-out                 → Button clicks
```

### Animation Patterns

#### Button Hover
```javascript
gsap.to(button, {
    duration: 0.3,
    scale: 1.05,
    ease: "back.out"
})
```

#### Card Entrance
```javascript
gsap.from(card, {
    duration: 0.6,
    opacity: 0,
    y: 40,
    ease: "power2.out"
})
```

#### Cascade (Multiple items)
```javascript
gsap.from(items, {
    duration: 0.6,
    opacity: 0,
    y: 40,
    stagger: 0.1,      // 100ms between each
    ease: "power2.out"
})
```

---

## 🛠️ Component Patterns

### Card Component
```html
<div class="card-primary">
    <!-- Header -->
    <div class="space-y-2 mb-6">
        <h3 class="text-lg font-semibold text-white">Title</h3>
        <p class="text-sm text-slate-400">Description</p>
    </div>
    
    <!-- Content -->
    <div>Content here</div>
    
    <!-- Footer (optional) -->
    <div class="mt-6 pt-6 border-t border-white/10 flex gap-3">
        <button class="btn-secondary">Action</button>
    </div>
</div>
```

### Button Component
```html
<!-- Primary -->
<button class="btn-primary">
    <i data-lucide="icon-name" class="w-4 h-4"></i>
    Label
</button>

<!-- Secondary -->
<button class="btn-secondary">
    <i data-lucide="icon-name" class="w-4 h-4"></i>
    Label
</button>

<!-- Icon Only -->
<button class="btn-icon" title="Tooltip">
    <i data-lucide="icon-name"></i>
</button>
```

### Input Component
```html
<div class="input-group">
    <label class="block text-sm font-semibold text-slate-300 mb-2">
        <i data-lucide="icon-name" class="w-4 h-4 inline mr-1"></i>
        Label
    </label>
    <input 
        class="input-primary" 
        type="text" 
        placeholder="Placeholder text"
    />
    <p class="text-xs text-slate-500 mt-1">Helper text</p>
</div>
```

### Badge Component
```html
<span class="badge-primary">
    <i data-lucide="icon-name" class="w-3 h-3"></i>
    Badge text
</span>
```

---

## 📱 Responsive Design

### Breakpoint Usage
```html
<!-- Hide on mobile, show on desktop -->
<div class="hidden md:block">Desktop only</div>

<!-- Show on mobile, hide on desktop -->
<div class="block md:hidden">Mobile only</div>

<!-- Responsive font size -->
<h1 class="text-2xl md:text-3xl lg:text-4xl">Title</h1>

<!-- Responsive spacing -->
<div class="py-8 md:py-12 lg:py-16">Content</div>

<!-- Responsive grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div>Card 1</div>
    <div>Card 2</div>
    <div>Card 3</div>
</div>
```

### Mobile-First Principle
```
Start with mobile styles default
Add breakpoints as needed: md:, lg:, xl:
Never use: sm: unnecessarily, use default for mobile
```

---

## 🎨 Color Usage

### Semantic Colors
| Usage | Color | Hover |
|-------|-------|-------|
| Primary Action | `from-blue-500 to-cyan-500` | `from-blue-600 to-cyan-600` |
| Success | `green-400` | `green-300` |
| Warning | `yellow-400` | `yellow-300` |
| Error | `red-400` | `red-300` |
| Info | `cyan-400` | `cyan-300` |

### Text Colors
```
Titles:        text-white             (full contrast)
Primary:       text-slate-300         (good contrast)
Secondary:     text-slate-400         (reduced contrast)
Tertiary:      text-slate-500         (subtle)
Muted:         text-slate-600         (very subtle)
```

### Background Colors
```
Primary:       bg-slate-900           (base)
Secondary:     bg-white/5 + backdrop-blur
Elevated:      bg-white/10 + backdrop-blur
Hover:         bg-white/10
Focus:         outline-2 outline-cyan-500
```

---

## 🚫 Anti-Patterns (Never Do)

```javascript
// ❌ Hard-coded delays without variables
setTimeout(() => {}, 5000)

// ✅ Use consistent duration
const duration = parseFloat(getComputedStyle(document.documentElement)
    .getPropertyValue('--duration-normal'))
gsap.to(element, { duration, ... })

// ❌ Mixing CSS transitions with GSAP
/* CSS */
transition: all 300ms;
// JavaScript
gsap.to(element, { duration: 0.5, ... })

// ✅ Use GSAP or CSS, not both on same property

// ❌ Using arbitrary spacing
padding: 13px;
margin-top: 7px;

// ✅ Use 8pt scale
px-3 (12px) or px-4 (16px)
py-2 (8px) or py-3 (12px)

// ❌ Too many animations
gsap.from(elements, { duration: 1, ... }) // Too slow!

// ✅ Keep animations snappy (< 600ms)
gsap.from(elements, { duration: 0.4, ... })

// ❌ Black shadows
box-shadow: 0 0 10px rgba(0, 0, 0, 1)

// ✅ Slate shadows
box-shadow: 0 0 10px rgba(15, 23, 42, 0.1)
```

---

## 📝 Naming Conventions

### CSS Classes
```
.card-{type}              (e.g., .card-primary)
.btn-{type}               (e.g., .btn-primary)
.input-{type}             (e.g., .input-primary)
.text-{semantic}          (e.g., .text-gradient-blue)
.state-{status}           (e.g., .state-loading)
```

### JavaScript Variables
```
// Elements
const section = document.querySelector('#section-id')
const buttons = document.querySelectorAll('[data-action]')

// State
let isLoading = false
let currentState = 'idle'

// Timelines
const tlEnter = gsap.timeline()
const tlHover = gsap.timeline({ paused: true })
```

### Data Attributes
```html
<!-- Use for component behavior -->
<div data-component="video-player">...</div>
<button data-action="download">Download</button>
<form data-form="upload">...</form>
```

---

## ✅ Checklist Before Commit

### Design Review
- [ ] Spacing follows 8pt scale
- [ ] All cards use glassmorphism pattern
- [ ] Text hierarchy is clear and consistent
- [ ] No pure black in shadows
- [ ] Focus states are visible

### Animation Review
- [ ] No animations > 600ms (except scroll)
- [ ] Easing uses power2.out or back.out
- [ ] Loading states have spinner animation
- [ ] Micro-interactions feel responsive
- [ ] Respects prefers-reduced-motion

### Code Review
- [ ] No inline styles (use Tailwind)
- [ ] No hardcoded durations
- [ ] GSAP registered plugins are used
- [ ] ScrollTrigger cleanup on unmount
- [ ] Comments explain complex animations

### Performance Review
- [ ] No layout thrashing
- [ ] transform instead of top/left
- [ ] will-change used appropriately
- [ ] GPU acceleration enabled
- [ ] Lighthouse Perf > 90

### Accessibility Review
- [ ] ARIA labels on icons
- [ ] Focus outlines visible
- [ ] Color contrast >= 4.5:1
- [ ] Keyboard navigation works
- [ ] Touch targets >= 48px

---

## 🎬 Example: Complete Component

```html
<!-- Button with GSAP hover -->
<button 
    class="btn-primary"
    data-action="submit"
    aria-label="Submit form"
>
    <i data-lucide="send" class="w-4 h-4"></i>
    <span>Submit</span>
</button>

<script type="module">
import { hoverScale } from './gsap-utils.js'

const button = document.querySelector('[data-action="submit"]')

// Add hover animation
hoverScale(button, 1.05)

// Add click animation
button.addEventListener('click', () => {
    gsap.to(button, {
        duration: 0.2,
        scale: 0.95,
        ease: "power2.inOut"
    })
})
</script>
```

---

## 📚 Reference Files

- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) – Complete design system
- [index.css](./frontend/src/styles/index.css) – CSS variables & animations
- [components.css](./frontend/src/styles/components.css) – Component library
- [gsap-utils.js](./frontend/src/scripts/gsap-utils.js) – Animation utilities
- [index.js](./frontend/src/scripts/index.js) – Real-world examples

---

**Keep it premium. Keep it clean. Keep it performant.** ✨
