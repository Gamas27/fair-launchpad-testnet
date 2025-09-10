import {
  cn,
  formatCurrency,
  formatPercentage,
  getReputationLevel,
  calculateAllocationCap,
} from '@/lib/utils'

describe('Utils', () => {
  describe('cn', () => {
    it('merges class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2')
    })

    it('handles conditional classes', () => {
      expect(cn('base', true && 'conditional')).toBe('base conditional')
      expect(cn('base', false && 'conditional')).toBe('base')
    })

    it('handles undefined and null values', () => {
      expect(cn('base', undefined, null)).toBe('base')
    })

    it('merges conflicting Tailwind classes', () => {
      expect(cn('p-2 p-4')).toBe('p-4')
    })
  })

  describe('formatCurrency', () => {
    it('formats currency with default WLD', () => {
      expect(formatCurrency(1000)).toBe('1,000 WLD')
    })

    it('formats currency with custom currency', () => {
      expect(formatCurrency(1000, 'USD')).toBe('1,000 USD')
    })

    it('handles decimal values', () => {
      expect(formatCurrency(1234.56)).toBe('1,234.56 WLD')
    })

    it('handles zero', () => {
      expect(formatCurrency(0)).toBe('0 WLD')
    })

    it('handles large numbers', () => {
      expect(formatCurrency(1000000)).toBe('1,000,000 WLD')
    })
  })

  describe('formatPercentage', () => {
    it('formats percentage correctly', () => {
      expect(formatPercentage(0.5)).toBe('50.0%')
    })

    it('handles decimal percentages', () => {
      expect(formatPercentage(0.1234)).toBe('12.3%')
    })

    it('handles zero', () => {
      expect(formatPercentage(0)).toBe('0.0%')
    })

    it('handles one', () => {
      expect(formatPercentage(1)).toBe('100.0%')
    })
  })

  describe('getReputationLevel', () => {
    it('returns Bronze for low XP', () => {
      const result = getReputationLevel(500)
      expect(result.level).toBe('Bronze')
      expect(result.icon).toBe('🥉')
      expect(result.color).toBe('text-amber-600')
      expect(result.currentLevelXp).toBe(0)
      expect(result.nextLevelXp).toBe(1000)
      expect(result.progress).toBeGreaterThanOrEqual(0)
      expect(result.progress).toBeLessThanOrEqual(100)
    })

    it('returns Silver for medium XP', () => {
      const result = getReputationLevel(1500)
      expect(result.level).toBe('Silver')
      expect(result.icon).toBe('🥈')
      expect(result.color).toBe('text-gray-400')
      expect(result.currentLevelXp).toBe(1000)
      expect(result.nextLevelXp).toBe(2500)
      expect(result.progress).toBeGreaterThanOrEqual(0)
      expect(result.progress).toBeLessThanOrEqual(100)
    })

    it('returns Gold for high XP', () => {
      const result = getReputationLevel(3000)
      expect(result.level).toBe('Gold')
      expect(result.icon).toBe('🥇')
      expect(result.color).toBe('text-yellow-500')
      expect(result.currentLevelXp).toBe(2500)
      expect(result.nextLevelXp).toBe(5000)
      expect(result.progress).toBeGreaterThanOrEqual(0)
      expect(result.progress).toBeLessThanOrEqual(100)
    })

    it('returns Diamond for very high XP', () => {
      const result = getReputationLevel(6000)
      expect(result.level).toBe('Diamond')
      expect(result.icon).toBe('💎')
      expect(result.color).toBe('text-blue-400')
      expect(result.currentLevelXp).toBe(5000)
      expect(result.nextLevelXp).toBe(Infinity)
      expect(result.progress).toBe(100)
    })

    it('handles exact boundary values', () => {
      expect(getReputationLevel(999).level).toBe('Bronze')
      expect(getReputationLevel(1000).level).toBe('Silver')
      expect(getReputationLevel(2499).level).toBe('Silver')
      expect(getReputationLevel(2500).level).toBe('Gold')
      expect(getReputationLevel(4999).level).toBe('Gold')
      expect(getReputationLevel(5000).level).toBe('Diamond')
    })

    it('calculates progress correctly', () => {
      const result = getReputationLevel(1250) // Halfway between 1000 and 2500
      expect(result.level).toBe('Silver')
      expect(result.progress).toBeCloseTo(16.67, 1) // (250/1500) * 100
    })

    it('handles zero XP', () => {
      const result = getReputationLevel(0)
      expect(result.level).toBe('Bronze')
      expect(result.currentLevelXp).toBe(0)
      expect(result.nextLevelXp).toBe(1000)
      expect(result.progress).toBe(0)
    })
  })

  describe('calculateAllocationCap', () => {
    it('returns correct caps for each level', () => {
      expect(calculateAllocationCap('Bronze')).toBe(200)
      expect(calculateAllocationCap('Silver')).toBe(500)
      expect(calculateAllocationCap('Gold')).toBe(1000)
      expect(calculateAllocationCap('Diamond')).toBe(2500)
    })

    it('returns default cap for invalid level', () => {
      expect(calculateAllocationCap('Invalid' as never)).toBe(200)
    })

    it('handles undefined level', () => {
      expect(calculateAllocationCap(undefined as never)).toBe(200)
    })
  })
})
