// Animation utilities and presets
export const animations = {
  // Fade animations
  fadeIn: 'animate-fade-in',
  fadeOut: 'animate-fade-out',
  fadeInUp: 'animate-fade-in-up',
  fadeInDown: 'animate-fade-in-down',
  fadeInLeft: 'animate-fade-in-left',
  fadeInRight: 'animate-fade-in-right',
  
  // Scale animations
  scaleIn: 'animate-scale-in',
  scaleOut: 'animate-scale-out',
  scaleInUp: 'animate-scale-in-up',
  scaleInDown: 'animate-scale-in-down',
  
  // Slide animations
  slideInUp: 'animate-slide-in-up',
  slideInDown: 'animate-slide-in-down',
  slideInLeft: 'animate-slide-in-left',
  slideInRight: 'animate-slide-in-right',
  
  // Bounce animations
  bounce: 'animate-bounce',
  bounceIn: 'animate-bounce-in',
  bounceInUp: 'animate-bounce-in-up',
  bounceInDown: 'animate-bounce-in-down',
  
  // Special animations
  pulse: 'animate-pulse',
  ping: 'animate-ping',
  spin: 'animate-spin',
  wiggle: 'animate-wiggle',
  glow: 'animate-glow',
  shimmer: 'animate-shimmer',
}

// Animation durations
export const durations = {
  fast: 'duration-150',
  normal: 'duration-300',
  slow: 'duration-500',
  slower: 'duration-700',
  slowest: 'duration-1000',
}

// Animation delays
export const delays = {
  none: 'delay-0',
  fast: 'delay-75',
  normal: 'delay-150',
  slow: 'delay-300',
  slower: 'delay-500',
}

// Easing functions
export const easings = {
  linear: 'ease-linear',
  in: 'ease-in',
  out: 'ease-out',
  inOut: 'ease-in-out',
  bounce: 'ease-bounce',
  elastic: 'ease-elastic',
}

// Animation presets for common use cases
export const presets = {
  // Page transitions
  pageEnter: `${animations.fadeInUp} ${durations.normal} ${easings.out}`,
  pageExit: `${animations.fadeOut} ${durations.fast} ${easings.in}`,
  
  // Modal animations
  modalEnter: `${animations.scaleIn} ${durations.normal} ${easings.out}`,
  modalExit: `${animations.scaleOut} ${durations.fast} ${easings.in}`,
  
  // Card hover effects
  cardHover: `${animations.scaleIn} ${durations.fast} ${easings.out}`,
  cardLeave: `${animations.scaleOut} ${durations.fast} ${easings.in}`,
  
  // Button interactions
  buttonPress: `${animations.scaleIn} ${durations.fast} ${easings.out}`,
  buttonRelease: `${animations.scaleOut} ${durations.fast} ${easings.in}`,
  
  // Loading states
  loading: `${animations.pulse} ${durations.slow} ${easings.inOut}`,
  spinner: `${animations.spin} ${durations.normal} ${easings.linear}`,
  
  // Success/Error states
  success: `${animations.bounceIn} ${durations.normal} ${easings.bounce}`,
  error: `${animations.wiggle} ${durations.normal} ${easings.elastic}`,
  
  // Navigation
  navSlide: `${animations.slideInUp} ${durations.normal} ${easings.out}`,
  tabSwitch: `${animations.fadeIn} ${durations.fast} ${easings.out}`,
}

// Utility function to combine animations
export function combineAnimations(...animations: string[]): string {
  return animations.join(' ')
}

// Utility function for staggered animations
export function staggerDelay(index: number, baseDelay: number = 100): string {
  return `delay-[${index * baseDelay}ms]`
}
