/**
 * NEXMII Lab Website CSS Loader
 * 
 * This script optimizes CSS loading by:
 * 1. Loading critical CSS first
 * 2. Deferring non-critical CSS
 * 3. Inline critical CSS for faster initial paint
 */

// Critical CSS rules that should be loaded immediately for first paint
const criticalCSSRules = `
body {
    font-family: "Crimson Text", "Times New Roman", serif;
    line-height: 1.6;
    color: #2c3e50;
    background-color: #fcfcfc;
    margin: 0;
    padding: 0;
}

header {
    background-color: #fff;
    border-bottom: 1px solid #eee;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 5%;
    max-width: 1200px;
    margin: 0 auto;
}

.logo {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.logo img {
    height: 45px;
    width: auto;
    margin-right: 1rem;
}

.logo span {
    font-size: 1.5rem;
    font-weight: bold;
    color: #000;
}

/* Critical navigation styles */
nav ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
}

nav ul li {
    margin-left: 2rem;
}

nav ul li a {
    text-decoration: none;
    color: #2c3e50;
    font-weight: 500;
    transition: color 0.3s;
}

nav ul li a:hover {
    color: #3498db;
}

/* Hero section and research domains */
.hero {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: #f8f9fa;
    padding-top: 70px;
}

.hero h1 {
    font-size: 3.5rem;
    margin-bottom: 0.5rem;
    color: #000;
}

.hero h2.lab-full-name {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: #666;
    font-weight: normal;
}

.hero p {
    font-size: 1.4rem;
    color: #444;
    max-width: 800px;
    margin: 0 auto 2rem auto;
    line-height: 1.8;
}

.research-domains {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;
}

.domain-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 110px;
}

.domain-icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #3c5a99;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
}

.domain-icon i {
    font-size: 2.2rem;
    color: white;
}

.domain-item span {
    font-size: 1rem;
    color: #444;
    text-align: center;
}

/* Make sure sections are visible */
section {
    padding: 5rem 5%;
    max-width: 1200px;
    margin: 0 auto;
}

.section-header h2 {
    text-align: center;
    margin-bottom: 1rem;
}
`;

// List of non-critical stylesheets to load after page load
const nonCriticalStylesheets = [
    // Add any stylesheets here that aren't needed for initial render
    // Example: 'css/animations.css'
];

// Load critical CSS immediately
document.addEventListener('DOMContentLoaded', function() {
    // Insert critical CSS inline
    const criticalStyle = document.createElement('style');
    criticalStyle.textContent = criticalCSSRules;
    document.head.appendChild(criticalStyle);
    
    // Load non-critical CSS after initial page load
    window.addEventListener('load', function() {
        setTimeout(loadNonCriticalCSS, 500);
    });
    
    // Apply critical rendering path optimizations
    optimizeCriticalRenderingPath();
});

/**
 * Load non-critical CSS with low priority
 */
function loadNonCriticalCSS() {
    nonCriticalStylesheets.forEach(stylesheet => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = stylesheet;
        link.setAttribute('media', 'print');
        document.head.appendChild(link);
        
        // After the stylesheet is loaded, change media to all
        link.onload = function() {
            link.media = 'all';
        };
    });
}

/**
 * Apply critical rendering path optimizations
 */
function optimizeCriticalRenderingPath() {
    // Preload fonts
    preloadFonts();
    
    // Optimize animation frames
    requestAnimationFrame(() => {
        // Defer offscreen images
        deferOffscreenImages();
        
        // Optimize paint operations
        optimizePaint();
    });
}

/**
 * Preload important fonts
 */
function preloadFonts() {
    const fonts = [
        'https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&display=swap'
    ];
    
    fonts.forEach(font => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = font;
        link.as = 'style';
        document.head.appendChild(link);
        
        // After a slight delay, convert to stylesheet
        setTimeout(() => {
            link.rel = 'stylesheet';
        }, 300);
    });
}

/**
 * Defer loading of offscreen images
 */
function deferOffscreenImages() {
    // This is now handled by the IntersectionObserver in performance.js
}

/**
 * Optimize paint operations
 */
function optimizePaint() {
    // Add will-change to elements that need hardware acceleration
    document.querySelectorAll('.research-icon, .news-item, .innovation-item').forEach(el => {
        el.style.willChange = 'transform';
    });
    
    // Force GPU rendering on animated elements
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .research-icon, .news-item, .innovation-item {
            transform: translateZ(0);
        }
    `;
    document.head.appendChild(animationStyle);
} 