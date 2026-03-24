# ClipMaker – Design System & Architecture

## 🎨 Filosofia de Design

**Referências:** Apple, Stripe, Linear

### Princípios Fundamentais

#### 1. **Atomic Design + Layering Strategy**
```
Fundação (Layout & Grid) → Estética (Cores, Sombras, Glassmorphism) → Vida (Interações & GSAP)
```

#### 2. **Space & Rhythm**
- Escala rigorosa de **8pt** em todos os espaçamentos
- Respiros generosos entre seções (py-24 a py-32)
- Nunca espaçamentos apertados; preferir espaço negativo

#### 3. **Modern Aesthetics**

##### Glassmorphism
- `backdrop-blur-md` com transparência sutil
- `bg-white/5` ou `bg-slate-900/70` para base
- `border-white/10` para bordas
- Soft shadows em camadas: não usar preto puro, variações de slate

##### Bento Grids
- Grids assimétricos equilibrados
- Cards com hover:shadow-xl
- Cada card é um componente autocontido

##### Soft Shadows
```css
/* Gradient de sombras */
shadow-sm → shadow-md → shadow-lg → hover:shadow-xl
/* Cores suaves, não preto puro */
rgba(15, 23, 42, 0.05) até rgba(15, 23, 42, 0.1)
```

#### 4. **Typography**
- Hierarquia visual rigorosa
- Títulos: `tracking-tight` + `font-bold`
- Descrições: `text-slate-500` para profundidade
- API: `text-slate-900` para títulos, `text-slate-500` para subtítulos

#### 5. **Micro-interações**
- Transições suaves: `duration-300` e `ease-out`
- Hover states: `hover:scale-[1.02]` com `duration-500`
- Active states: `active:scale-95`
- Focus states: `outline-2 outline-offset-2 outline-cyan-500`

---

## 🛠️ Stack Técnico

### Frontend Stack
| Tecnologia | Propósito |
|---|---|
| **HTML5 Semântico** | Estrutura com elementos `<section>`, `<header>`, `<footer>` |
| **Tailwind CSS** | Utility-first via CDN (v4) |
| **Vanilla JavaScript** | Zero dependencies para lógica |
| **GSAP 3.12** | Animações fluidas e scroll-trigger |
| **Lucide Icons** | Iconografia moderna via CDN |
| **Cloudinary** | Upload e processamento de vídeos |

### Backend Stack
| Tecnologia | Propósito |
|---|---|
| **Express.js** | Server Node.js |
| **Google Generative AI** | Integração com Gemini para análise de vídeos |
| **CORS** | Habilitação de requisições cross-origin |

---

## 🎯 User Flow & States

### Estados da Interface

#### 1. **Initial State** (Repouso)
- Campo de entrada da API Key visível
- Upload widget pronto
- Hero section com animações de entrada

#### 2. **Loading State** (Processamento)
- Spinner animado
- Status messages dinâmicas
- Disable interações do upload

#### 3. **Success State** (Resultado)
- Vídeo exibido com player controls
- Botões: Baixar + Novo Upload
- Scroll suave para o resultado

#### 4. **Error State** (Falha)
- Mensagem de erro clara
- Opção de tentar novamente
- Volta ao estado inicial

---

## 🎬 Animações GSAP

### Entrada da Página
```javascript
// Header descendo suavemente
gsap.from('header', { duration: 0.6, opacity: 0, y: -30, ease: "power2.out" })

// Cards em cascata
gsap.from('cards', { 
    delay: 0.4, 
    duration: 0.6, 
    opacity: 0, 
    y: 40, 
    stagger: 0.1, 
    ease: "power2.out" 
})
```

### Interações
```javascript
// Hover no upload
gsap.to('[data-lucide="video"]', { duration: 0.3, scale: 1.2 })

// Erro (validação)
gsap.to('input', { 
    duration: 0.1, 
    x: -10, 
    repeat: 5, 
    yoyo: true 
})

// Resultado (scroll suave + fade-in)
gsap.to(window, { 
    scrollTo: { y: '#video-section' }, 
    ease: "power2.inOut" 
})
```

### Blobs Animados (Fundo)
```css
@keyframes blob {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(20px, -50px) scale(1.1); }
    /* ... */
}
.animate-blob { animation: blob 7s infinite; }
```

---

## 📐 Grid System & Spacing

### Breakpoints (Mobile-First)
```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Spacing Scale (8pt)
```
8pt = 1 = px-1
16pt = 2 = px-2
24pt = 6 = px-6 (generoso)
32pt = 8 = px-8
40pt = 10 = py-10
48pt = 12 = py-12
64pt = 16 = py-16 (respiro de seção)
```

### Max Width
- Container padrão: `max-w-4xl`
- Full width: `max-w-7xl`
- Padding responsivo: `px-4 sm:px-6 lg:px-8`

---

## 🎨 Paleta de Cores

### Dark Theme (Padrão)
| Uso | Cor |
|---|---|
| Background | `slate-950` / `slate-900` |
| Cards | `white/5` com backdrop-blur |
| Text Primário | `white` |
| Text Secundário | `slate-400` |
| Text Tertiary | `slate-500` |
| Accent | `cyan-400` / `blue-400` |
| Gradient | `from-blue-400 to-cyan-500` |

### Sombras
- Hover suave: `shadow-lg hover:shadow-cyan-500/20`
- Focus: `outline-cyan-500`
- Ghost: `shadow-sm` em cards

---

## 🧩 Componentes (Autocontidos)

### Card
```html
<div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:shadow-xl transition-shadow duration-300">
    <!-- Conteúdo -->
</div>
```

### Button Primary
```html
<button class="bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105 active:scale-95">
    <!-- Label + Icon -->
</button>
```

### Button Secondary
```html
<button class="border border-slate-600 hover:border-slate-500 hover:bg-white/5 transition-all">
    <!-- Label -->
</button>
```

### Input
```html
<input class="bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all" />
```

---

## 📱 Responsividade

### Princípios
1. **Mobile First**: Design começa em 320px (iPhone SE)
2. **Fluid**: Escalável até 4K sem media queries excessivas
3. **Touch Friendly**: Botões com min-height: 48px (6rem)
4. **Readable**: Font sizes responsivas com `text-sm md:text-base`

### Breakpoints Comuns
```tailwind
md: Grid 1 col → 2 cols
lg: Padding aumenta, containers expandem
```

---

## ♿ Acessibilidade

### Padrões
- `outline-2 outline-offset-2` para focus visível
- `prefers-reduced-motion` respeito (via CSS)
- Contrast mínimo: WCAG AA
- Semântica HTML5: `<header>`, `<section>`, `<footer>`
- ARIA labels em ícones dinamicamente renderizados

---

## 🔄 Decisões de Arquitetura

### Por que GSAP?
- Animações complexas suaves
- ScrollTrigger para animations on scroll
- Melhor performance que CSS puro em cascatas

### Por que Vanilla JS?
- Sem overhead de frameworks
- Controle total sobre o DOM
- Integração perfeita com Cloudinary Widget
- Deploy mais leve (sem build step necessário)

### Por que Tailwind via CDN?
- Desenvolvimento rápido
- Customização via `tailwind.config.js` facilita
- Gzip comprime bem

### Por que Lucide Icons?
- 400+ ícones modernos
- SVG renderizado, customizável via CSS
- Licença aberta
- Biblioteca leve (~30KB)

---

## 📦 Estrutura de Arquivos

```
frontend/
├── src/
│   ├── index.html           # Layout semântico + Tailwind
│   ├── styles/
│   │   └── index.css        # Design system customizado
│   ├── scripts/
│   │   ├── index.js         # Controller principal + GSAP
│   │   ├── sendGemini.js    # Integração com Gemini
│   │   └── waitForTranscription.js  # Aguardar processamento
│   └── draw.excalidraw      # Wireframes/Design
└── [Cloudinary assets]

backend/
├── src/
│   ├── server.js            # Express server
│   ├── routes/
│   │   ├── index.js         # Router principal
│   │   └── GeminiWidgetRoute.js
│   └── controller/
│       └── GeminiWidgetController.js
└── package.json
```

---

## 🚀 Performance

### Otimizações
- **Lazy Loading**: Videos e imagens carregam sob demanda
- **Code Splitting**: Scripts modularizados
- **Async/Await**: Promessas não bloqueiam UI
- **GSAP Config**: Null target handling evita erros
- **MutationObserver**: Lucide icons atualizados após DOM updates

### Métricas Alvo
- FCP < 1.5s
- LCP < 2.5s
- CLS < 0.1
- Lighthouse Performance: 90+

---

## 🎓 Referências de Design

### Inspirações
1. **Apple**: Espaço negativo, hierarquia clara, animações suaves
2. **Stripe**: Glassmorphism, Bento grids, micro-interações elegantes
3. **Linear**: Dark theme premium, tipografia impecável, UI refinada

### Recursos
- [Tailwind CSS Docs](https://tailwindcss.com)
- [GSAP Docs](https://greensock.com/gsap/)
- [Lucide Icons](https://lucide.dev)
- [Web.dev Performance](https://web.dev)

---

**Versão:** 1.0  
**Atualizado:** Março 2024  
**Design Lead:** Lead Product Designer Approach  
**Status:** ✅ Implementado
