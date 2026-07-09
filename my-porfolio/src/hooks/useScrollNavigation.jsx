import { useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const useScrollNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isNavigatingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);
  const lastScrollPositionRef = useRef(0);
  const animationFrameRef = useRef(null);
  const isThrottledRef = useRef(false);

  const routes = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/skills', label: 'Skills' },
    { path: '/contact', label: 'Contact' }
  ];

  const getCurrentIndex = useCallback(() => {
    return routes.findIndex(route => route.path === location.pathname);
  }, [location.pathname]);

  const navigateToPage = useCallback((direction) => {
    if (isNavigatingRef.current) return;

    const currentIndex = getCurrentIndex();
    
    if (direction === 'down' && currentIndex < routes.length - 1) {
      isNavigatingRef.current = true;
      const nextPath = routes[currentIndex + 1].path;
      navigate(nextPath);
      
      // Reset navigation lock after transition
      setTimeout(() => {
        isNavigatingRef.current = false;
      }, 800);
    }
    
    if (direction === 'up' && currentIndex > 0) {
      isNavigatingRef.current = true;
      const prevPath = routes[currentIndex - 1].path;
      navigate(prevPath);
      
      setTimeout(() => {
        isNavigatingRef.current = false;
      }, 800);
    }
  }, [navigate, getCurrentIndex, routes]);

  useEffect(() => {
    let scrollDirection = 'idle';
    let scrollAccumulator = 0;
    const SCROLL_THRESHOLD = 150; // Minimum scroll distance to trigger navigation
    const NAVIGATION_COOLDOWN = 1000; // Cooldown between navigations

    const handleScroll = () => {
      // Cancel any pending animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Throttle scroll events to every 50ms
      if (isThrottledRef.current) return;
      isThrottledRef.current = true;
      setTimeout(() => { isThrottledRef.current = false; }, 50);

      animationFrameRef.current = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Determine scroll direction
        const isScrollingDown = currentScrollY > lastScrollPositionRef.current;
        const isScrollingUp = currentScrollY < lastScrollPositionRef.current;
        
        // Calculate how far from top/bottom
        const distanceFromTop = currentScrollY;
        const distanceFromBottom = documentHeight - (currentScrollY + windowHeight);
        
        // Check if at extreme positions
        const isAtTop = distanceFromTop < 50;
        const isAtBottom = distanceFromBottom < 50;

        // Update scroll accumulator based on direction
        if (isScrollingDown) {
          scrollAccumulator += Math.abs(currentScrollY - lastScrollPositionRef.current);
        } else if (isScrollingUp) {
          scrollAccumulator -= Math.abs(currentScrollY - lastScrollPositionRef.current);
        }

        // Reset accumulator if direction changes
        if ((isScrollingDown && scrollDirection === 'up') || 
            (isScrollingUp && scrollDirection === 'down')) {
          scrollAccumulator = 0;
        }

        scrollDirection = isScrollingDown ? 'down' : isScrollingUp ? 'up' : 'idle';

        // Check if we should navigate
        const currentIndex = getCurrentIndex();
        
        // Navigate down when reaching bottom with enough accumulated scroll
        if (isScrollingDown && isAtBottom && currentIndex < routes.length - 1) {
          if (scrollAccumulator > SCROLL_THRESHOLD) {
            navigateToPage('down');
            scrollAccumulator = 0;
            // Reset scroll position to top of next page
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: 'instant' });
            }, 50);
          }
        }
        
        // Navigate up when reaching top with enough accumulated scroll
        if (isScrollingUp && isAtTop && currentIndex > 0) {
          if (scrollAccumulator < -SCROLL_THRESHOLD) {
            navigateToPage('up');
            scrollAccumulator = 0;
            // Reset scroll position to top of previous page (it will be at bottom)
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: 'instant' });
            }, 50);
          }
        }

        lastScrollPositionRef.current = currentScrollY;
      });
    };

    // Reset navigation lock on route change
    const handleRouteChange = () => {
      isNavigatingRef.current = false;
      scrollAccumulator = 0;
      // When navigating up, scroll to bottom of page
      // When navigating down, scroll to top of page
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handleRouteChange);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [navigateToPage, getCurrentIndex, routes.length]);

  return null;
};

export default useScrollNavigation;