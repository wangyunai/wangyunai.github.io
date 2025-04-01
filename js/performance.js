/**
 * NEXMII Lab Website Performance Optimization Script
 * Handles preloading, lazy image loading, and performance improvements
 */

// Global loading status tracker
let resourcesLoaded = 0;
let totalResources = 0;
const criticalResources = ['css/style.css', 'css/preloader.css', 'js/main.js', 'images/nexmii_logo.png'];
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

// DOM elements (will be set after DOM is loaded)
let preloader;
let preloaderProgressBar;
let loadingText;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Setup preloader elements
    preloader = document.querySelector('.preloader');
    preloaderProgressBar = document.querySelector('.loader-progress-bar');
    loadingText = document.querySelector('.loading-text');
    
    // Start tracking resource loading
    trackResourceLoading();
    
    // Setup lazy loading for images
    setupLazyLoading();
    
    // Add page transition effects
    setupPageTransitions();
});

/**
 * Track loading of resources (scripts, styles, images)
 */
function trackResourceLoading() {
    // First count all resources that need to be loaded
    const allResources = [
        ...Array.from(document.querySelectorAll('script[src]')).map(script => script.src),
        ...Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(link => link.href),
        ...Array.from(document.querySelectorAll('img[src]')).map(img => img.src)
    ];
    
    // Remove duplicates
    const uniqueResources = [...new Set(allResources)];
    totalResources = uniqueResources.length;
    
    // Create a list of images to preload
    const imagesToPreload = [];
    document.querySelectorAll('img').forEach(img => {
        if (img.src && !img.classList.contains('lazy-load')) {
            imagesToPreload.push(img.src);
        }
    });
    
    // Preload critical resources first
    preloadCriticalResources();
    
    // Listen for all resources to complete loading
    window.addEventListener('load', function() {
        hidePreloader();
    });
    
    // Update progress every 100ms to simulate progress even if resources aren't reporting correctly
    let simulatedProgress = 0;
    const progressInterval = setInterval(() => {
        simulatedProgress += 2;
        
        // Cap at 90% for simulated progress
        if (simulatedProgress > 90) {
            clearInterval(progressInterval);
            return;
        }
        
        const currentProgress = Math.max(Math.round((resourcesLoaded / totalResources) * 100), simulatedProgress);
        updatePreloaderProgress(currentProgress);
    }, 100);
}

/**
 * Preload critical resources first
 */
function preloadCriticalResources() {
    criticalResources.forEach(resource => {
        const extension = resource.substring(resource.lastIndexOf('.'));
        
        if (imageExtensions.includes(extension)) {
            const img = new Image();
            img.onload = () => resourceLoaded();
            img.onerror = () => resourceLoaded();
            img.src = resource;
        } else {
            // For CSS and JS files
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = extension === '.css' ? 'style' : 'script';
            link.onload = () => resourceLoaded();
            link.onerror = () => resourceLoaded();
            document.head.appendChild(link);
        }
    });
}

/**
 * Called when a resource has been loaded
 */
function resourceLoaded() {
    resourcesLoaded++;
    const progress = Math.round((resourcesLoaded / totalResources) * 100);
    updatePreloaderProgress(progress);
    
    // If all critical resources are loaded, show content but keep preloader
    if (resourcesLoaded >= criticalResources.length) {
        document.body.classList.add('critical-resources-loaded');
    }
}

/**
 * Update the preloader progress bar and text
 */
function updatePreloaderProgress(progress) {
    if (!preloaderProgressBar) return;
    
    // Cap progress at 100%
    progress = Math.min(progress, 100);
    
    // Update the progress bar width
    preloaderProgressBar.style.width = `${progress}%`;
    
    // Update loading text
    if (loadingText) {
        if (progress < 33) {
            loadingText.textContent = 'Loading resources...';
        } else if (progress < 66) {
            loadingText.textContent = 'Preparing content...';
        } else if (progress < 100) {
            loadingText.textContent = 'Almost ready...';
        } else {
            loadingText.textContent = 'Welcome to NEXMII Lab!';
        }
    }
}

/**
 * Hide the preloader when everything is loaded
 */
function hidePreloader() {
    if (!preloader) return;
    
    // First ensure the progress bar shows 100%
    updatePreloaderProgress(100);
    
    // Reduce delay to make content visible faster
    setTimeout(() => {
        preloader.classList.add('loaded');
        
        // Make body content visible immediately
        document.body.style.visibility = 'visible';
        
        // Remove preloader from DOM after animation completes
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300); // Reduced from 500ms
    }, 200); // Reduced from 500ms
}

/**
 * Setup lazy loading for images
 */
function setupLazyLoading() {
    // Don't lazy load logo and domain icons - critical for initial view
    const criticalImages = [
        'images/nexmii_logo.png',
        'images/yun_wang.png'
    ];
    
    // Mark all images to be lazy loaded except for critical ones
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        const src = img.src || '';
        const isCritical = criticalImages.some(criticalSrc => src.includes(criticalSrc)) || 
                          img.classList.contains('loader-logo');
        
        if (!isCritical) {
            // Save the original src
            const originalSrc = img.src;
            
            // Clear the src to prevent loading and add data-src
            img.setAttribute('data-src', originalSrc);
            img.removeAttribute('src');
            
            // Add lazy-load class
            img.classList.add('lazy-load');
        }
    });
    
    // Create IntersectionObserver to load images when they come into view
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                
                if (src) {
                    img.src = src;
                    img.addEventListener('load', () => {
                        img.classList.add('lazy-loaded');
                    });
                    observer.unobserve(img);
                }
            }
        });
    }, {
        rootMargin: '0px 0px 200px 0px' // Start loading when within 200px of viewport
    });
    
    // Observe all images with lazy-load class
    document.querySelectorAll('.lazy-load').forEach(img => {
        imageObserver.observe(img);
    });
}

/**
 * Setup smooth page transitions
 */
function setupPageTransitions() {
    // Create page transition element if it doesn't exist
    if (!document.querySelector('.page-transition')) {
        const pageTransition = document.createElement('div');
        pageTransition.classList.add('page-transition');
        document.body.appendChild(pageTransition);
    }
    
    // Add transition effect to navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Don't add effect to admin link
            if (this.id === 'admin-login') return;
            
            const transition = document.querySelector('.page-transition');
            
            // Show transition
            transition.classList.add('active');
            
            // Hide transition after delay
            setTimeout(() => {
                transition.classList.remove('active');
            }, 500);
        });
    });
}

/**
 * Optimize image delivery based on viewport size
 * This function resizes images for smaller screens
 */
function optimizeImageDelivery() {
    const viewportWidth = window.innerWidth;
    
    document.querySelectorAll('img.lazy-load').forEach(img => {
        // Only modify if the image hasn't loaded yet
        if (!img.src) {
            const originalSrc = img.getAttribute('data-src');
            
            // For smaller screens, use smaller images if available
            if (viewportWidth <= 768 && originalSrc) {
                // Try to use a smaller version if it exists
                // Example: change image.jpg to image-small.jpg
                const fileExt = originalSrc.substring(originalSrc.lastIndexOf('.'));
                const basePath = originalSrc.substring(0, originalSrc.lastIndexOf('.'));
                
                // Set data-src to the smaller image version
                img.setAttribute('data-src', `${basePath}-small${fileExt}`);
                
                // Create image object to check if smaller version exists
                const testImg = new Image();
                testImg.onload = () => {
                    // Smaller image exists, keep using it
                };
                testImg.onerror = () => {
                    // Smaller image doesn't exist, revert to original
                    img.setAttribute('data-src', originalSrc);
                };
                testImg.src = `${basePath}-small${fileExt}`;
            }
        }
    });
}

// Call optimization functions when appropriate
window.addEventListener('resize', debounce(optimizeImageDelivery, 200));
window.addEventListener('orientationchange', optimizeImageDelivery);

// Utility function to debounce function calls
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
} 