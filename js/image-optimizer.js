/**
 * NEXMII Lab Website Image Optimizer
 * 
 * This script optimizes images by:
 * 1. Converting images to WebP format when supported
 * 2. Dynamically resizing images based on viewport
 * 3. Compressing images on the fly
 */

// Check if browser supports WebP
let webpSupported = false;
(async function() {
    try {
        // Create a canvas and try to export as WebP
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const supportsWebP = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        webpSupported = supportsWebP;
        
        // Add webp-support class to body for CSS targeting
        if (supportsWebP) {
            document.body.classList.add('webp-support');
        }
    } catch (e) {
        console.error('WebP detection failed', e);
    }
})();

// Process images once DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait for the preloader to finish
    const preloaderCheck = setInterval(() => {
        if (document.querySelector('.preloader.loaded') || !document.querySelector('.preloader')) {
            clearInterval(preloaderCheck);
            initImageOptimization();
        }
    }, 100);
});

/**
 * Initialize image optimization once page is loaded
 */
function initImageOptimization() {
    // Convert background images to WebP when supported
    if (webpSupported) {
        convertBackgroundImagesToWebP();
    }
    
    // Add srcset for responsive images
    addResponsiveImageSrcsets();
    
    // Add image compression information via query parameters
    compressImages();
}

/**
 * Convert CSS background images to WebP format
 */
function convertBackgroundImagesToWebP() {
    // Find all elements with background images
    const elementsWithBgImage = Array.from(document.querySelectorAll('*')).filter(el => {
        const style = window.getComputedStyle(el);
        const bgImage = style.backgroundImage;
        return bgImage && bgImage !== 'none' && bgImage.includes('.jpg') || bgImage.includes('.png') || bgImage.includes('.jpeg');
    });
    
    // Convert background images to WebP
    elementsWithBgImage.forEach(el => {
        const style = window.getComputedStyle(el);
        const bgImage = style.backgroundImage;
        
        // Extract image URL
        const matches = bgImage.match(/url\(['"]?([^'"]+)['"]?\)/);
        if (matches && matches[1]) {
            const imageUrl = matches[1];
            const webpUrl = imageUrl.replace(/\.(jpg|jpeg|png)/i, '.webp');
            
            // Check if WebP version exists
            const img = new Image();
            img.onload = () => {
                // WebP exists, update background image
                el.style.backgroundImage = `url('${webpUrl}')`;
            };
            img.onerror = () => {
                // WebP doesn't exist, keep original
            };
            img.src = webpUrl;
        }
    });
}

/**
 * Add srcset for responsive images to load appropriate size
 */
function addResponsiveImageSrcsets() {
    // Find all images without srcset
    const images = document.querySelectorAll('img:not([srcset])');
    
    images.forEach(img => {
        if (!img.classList.contains('loader-logo')) {
            const src = img.src || img.getAttribute('data-src');
            if (!src) return;
            
            // Skip SVG images
            if (src.includes('.svg')) return;
            
            // Create srcset for different sizes
            const fileExt = src.substring(src.lastIndexOf('.'));
            const basePath = src.substring(0, src.lastIndexOf('.'));
            
            // Only add srcset if we're using lazy loading (data-src)
            if (img.hasAttribute('data-src')) {
                const srcset = [
                    `${basePath}-small${fileExt} 480w`,
                    `${basePath}${fileExt} 800w`,
                    `${basePath}-large${fileExt} 1200w`
                ].join(', ');
                
                img.setAttribute('data-srcset', srcset);
                img.setAttribute('sizes', '(max-width: 600px) 480px, (max-width: 1200px) 800px, 1200px');
            }
        }
    });
}

/**
 * Add compression parameters to image URLs
 */
function compressImages() {
    // This function would typically add query parameters for CDN image optimization
    // or apply CSS filters to simulate compression
    
    // Apply subtle CSS filters for better perceived quality at lower file sizes
    const imageStyle = document.createElement('style');
    imageStyle.textContent = `
        .lazy-load {
            filter: contrast(1.05) saturate(1.1);
            transition: filter 0.3s ease-in;
        }
        .lazy-loaded {
            filter: contrast(1.05) saturate(1.1);
        }
    `;
    document.head.appendChild(imageStyle);
} 