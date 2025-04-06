import { useEffect, useRef } from 'react';

// Hook for interactive mouse effects
export const useMouseTrail = () => {
  const dotsRef = useRef([]);
  const mouseTrailRef = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const requestRef = useRef();
  const previousTimeRef = useRef();
  
  useEffect(() => {
    // Create mouse trail container
    const trailContainer = document.createElement('div');
    trailContainer.className = 'mouse-trail';
    document.body.appendChild(trailContainer);
    mouseTrailRef.current = trailContainer;
    
    // Create trail dots
    for (let i = 0; i < 20; i++) {
      const dot = document.createElement('div');
      dot.className = 'trail-dot';
      trailContainer.appendChild(dot);
      dotsRef.current.push(dot);
    }
    
    // Mouse move event handler
    const handleMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      trailContainer.classList.add('active');
    };
    
    // Animation loop
    const animate = (time) => {
      if (previousTimeRef.current !== undefined) {
        dotsRef.current.forEach((dot, index) => {
          const delay = index * 50;
          setTimeout(() => {
            dot.style.left = `${mousePosRef.current.x}px`;
            dot.style.top = `${mousePosRef.current.y}px`;
            dot.style.opacity = 1 - index * 0.05;
            dot.style.width = `${5 - index * 0.2}px`;
            dot.style.height = `${5 - index * 0.2}px`;
          }, delay);
        });
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation and add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    requestRef.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(requestRef.current);
      if (mouseTrailRef.current) {
        document.body.removeChild(mouseTrailRef.current);
      }
    };
  }, []);
};

// Hook for parallax effects
export const useParallax = () => {
  useEffect(() => {
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    
    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const posX = e.clientX - centerX;
      const posY = e.clientY - centerY;
      
      parallaxLayers.forEach((layer) => {
        const speedX = layer.getAttribute('data-speed-x') || 0.1;
        const speedY = layer.getAttribute('data-speed-y') || 0.1;
        
        const translateX = posX * speedX;
        const translateY = posY * speedY;
        
        layer.style.transform = `translate(${translateX}px, ${translateY}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
};

// Hook for scroll effects
export const useScrollAnimation = () => {
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('animated');
        }
      });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Check on initial load
    
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);
};

// Hook for technical specs animation
export const useTechnicalSpecsAnimation = () => {
  useEffect(() => {
    const specIndicators = document.querySelectorAll('.specs-indicator-fill');
    
    const animateSpecsOnScroll = () => {
      specIndicators.forEach((indicator) => {
        const indicatorTop = indicator.getBoundingClientRect().top;
        
        if (indicatorTop < window.innerHeight - 100) {
          const valuePercent = indicator.getAttribute('data-value') || 50;
          indicator.style.width = `${valuePercent}%`;
        }
      });
    };
    
    window.addEventListener('scroll', animateSpecsOnScroll);
    animateSpecsOnScroll(); // Check on initial load
    
    return () => {
      window.removeEventListener('scroll', animateSpecsOnScroll);
    };
  }, []);
};

const interactiveHooks = { useMouseTrail, useParallax, useScrollAnimation, useTechnicalSpecsAnimation };
export default interactiveHooks;