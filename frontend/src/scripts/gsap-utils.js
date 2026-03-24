// ============================================================
// GSAP ANIMATIONS LIBRARY - Advanced Patterns & Utilities
// ============================================================

/**
 * Initialize GSAP with best practices
 * Call once on page load
 */
export function initializeGSAP() {
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger)
    }
    gsap.config({ 
        nullTargetAction: "ignore",
        autoSleep: 60
    })
    
    // Disable animations on reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.globalTimeline.speed(0.01);
    }
}

// ========== ENTRANCE ANIMATIONS ==========

/**
 * Fade in with slight upward movement
 */
export function animateFadeInUp(element, delay = 0) {
    return gsap.from(element, {
        delay,
        duration: 0.6,
        opacity: 0,
        y: 30,
        ease: "power2.out"
    })
}

/**
 * Cascade animation for multiple elements
 */
export function animateCascade(elements, itemDelay = 0.1, startDelay = 0) {
    return gsap.from(elements, {
        delay: startDelay,
        duration: 0.6,
        opacity: 0,
        y: 40,
        stagger: itemDelay,
        ease: "power2.out"
    })
}

/**
 * Scale + fade entrance (for cards)
 */
export function animateScaleIn(element, delay = 0) {
    return gsap.from(element, {
        delay,
        duration: 0.5,
        opacity: 0,
        scale: 0.95,
        ease: "back.out"
    })
}

// ========== INTERACTIVE ANIMATIONS ==========

/**
 * Button scale on hover
 */
export function hoverScale(element, scale = 1.05) {
    const tl = gsap.timeline({ paused: true })
    
    tl.to(element, {
        duration: 0.3,
        scale,
        ease: "back.out"
    }, 0)
    
    element.addEventListener('mouseenter', () => tl.play())
    element.addEventListener('mouseleave', () => tl.reverse())
    
    return tl
}

/**
 * Shake animation (validation error)
 */
export function animateShake(element, intensity = 10, repeats = 5) {
    return gsap.to(element, {
        duration: 0.1,
        x: -intensity,
        repeat: repeats,
        yoyo: true,
        ease: "power2.inOut"
    })
}

/**
 * Pulse animation (attention)
 */
export function animatePulse(element, scale = 1.1, duration = 0.6) {
    return gsap.to(element, {
        duration,
        scale,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    })
}

/**
 * Bounce animation (celebração)
 */
export function animateBounce(element, bounceHeight = -20, duration = 0.6) {
    return gsap.to(element, {
        duration,
        y: bounceHeight,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    })
}

// ========== LOADING STATES ==========

/**
 * Spinner rotation
 */
export function spinElement(element, duration = 2, repeats = -1) {
    return gsap.to(element, {
        duration,
        rotation: 360,
        repeat: repeats,
        ease: "none"
    })
}

/**
 * Skeleton shimmer effect
 */
export function shimmer(element) {
    return gsap.fromTo(element, 
        {
            backgroundPosition: "-1000px 0"
        },
        {
            duration: 2,
            backgroundPosition: "1000px 0",
            repeat: -1,
            ease: "none"
        }
    )
}

// ========== SCROLL ANIMATIONS ==========

/**
 * Reveal on scroll
 */
export function revealOnScroll(element, options = {}) {
    const defaults = {
        trigger: element,
        start: "top 80%",
        end: "top 50%",
        markers: false
    }
    
    const config = { ...defaults, ...options }
    
    return gsap.fromTo(element,
        { opacity: 0, y: 50 },
        {
            duration: 0.8,
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: config
        }
    )
}

/**
 * Parallax on scroll
 */
export function parallax(element, speed = -0.5) {
    return gsap.to(element, {
        y: "+=500",
        scrollTrigger: {
            trigger: element,
            start: "top center",
            scrub: 1
        },
        ease: "none"
    })
}

/**
 * Sticky header animation
 */
export function stickyHeaderAnimation(header, threshold = 100) {
    return gsap.to(header, {
        scrollTrigger: {
            trigger: "body",
            start: `top ${threshold}px`,
            end: `top ${threshold + 1}px`,
            onEnter: () => header.classList.add('shadow-lg'),
            onLeaveBack: () => header.classList.remove('shadow-lg')
        }
    })
}

// ========== TIMELINE SEQUENCES ==========

/**
 * Create a loading sequence (loading → success)
 */
export function loadingSequence(statusElement, onComplete = null) {
    const tl = gsap.timeline()
    
    // Fade in
    tl.from(statusElement, {
        duration: 0.3,
        opacity: 0,
        scale: 0.9,
        ease: "back.out"
    })
    
    // Can add more steps here
    
    if (onComplete) {
        tl.add(onComplete)
    }
    
    return tl
}

/**
 * Success animation sequence
 */
export function successSequence(element) {
    const tl = gsap.timeline()
    
    // Scale in
    tl.from(element, {
        duration: 0.5,
        scale: 0,
        opacity: 0,
        ease: "back.out"
    })
    
    // Light pulse
    .to(element, {
        duration: 0.4,
        scale: 1.05,
        ease: "sine.inOut"
    }, 0.3)
    
    .to(element, {
        duration: 0.4,
        scale: 1,
        ease: "sine.inOut"
    })
    
    return tl
}

// ========== SMOOTH SCROLL ==========

/**
 * Smooth scroll to element
 */
export function smoothScrollTo(target, duration = 0.8, offset = 80) {
    return gsap.to(window, {
        duration,
        scrollTo: {
            y: target,
            offsetY: offset,
            autoKill: true
        },
        ease: "power2.inOut"
    })
}

/**
 * Scroll to anchor
 */
export function setupSmoothScrollAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href')
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault()
                smoothScrollTo(href)
            }
        })
    })
}

// ========== MORPHING & TRANSFORMS ==========

/**
 * Gradient animation
 */
export function animateGradient(element, colors = [], duration = 4) {
    return gsap.to(element, {
        duration,
        repeat: -1,
        yoyo: true,
        ease: "none",
        backgroundPosition: "200% center"
    })
}

/**
 * Color transition
 */
export function colorTransition(element, colorFrom, colorTo, duration = 0.6) {
    return gsap.fromTo(element,
        { color: colorFrom },
        {
            duration,
            color: colorTo,
            ease: "power2.inOut"
        }
    )
}

/**
 * Rotate animation with scale
 */
export function rotateSpin(element, rotations = 1, scale = 1.1) {
    return gsap.to(element, {
        duration: 0.6,
        rotation: rotations * 360,
        scale,
        ease: "back.out"
    })
}

// ========== STATE MACHINES ==========

/**
 * Create a controlled animation state machine
 */
export function createAnimationState(element) {
    return {
        isAnimating: false,
        currentState: 'idle',
        
        animateTo(state, animation) {
            if (this.isAnimating) return
            
            this.isAnimating = true
            this.currentState = state
            
            return animation().then(() => {
                this.isAnimating = false
            })
        }
    }
}

// ========== PERFORMANCE UTILITIES ==========

/**
 * Kill all animations on element for cleanup
 */
export function killAnimations(element) {
    gsap.killTweensOf(element)
}

/**
 * Kill animations on multiple elements
 */
export function killAnimationsAll(elements) {
    gsap.killTweensOf(elements)
}

/**
 * Pause all animations
 */
export function pauseAll() {
    gsap.globalTimeline.pause()
}

/**
 * Resume all animations
 */
export function resumeAll() {
    gsap.globalTimeline.play()
}

// ========== DEBUGGING ==========

/**
 * Log animation timeline
 */
export function logTimeline(timeline) {
    console.log('Timeline:', {
        duration: timeline.duration(),
        progress: timeline.progress(),
        reversed: timeline.reversed(),
        paused: timeline.paused()
    })
}

/**
 * Slow motion for debugging animations
 */
export function slowMotion(speed = 0.25) {
    gsap.globalTimeline.speed(speed)
}

/**
 * Normal speed
 */
export function normalSpeed() {
    gsap.globalTimeline.speed(1)
}
