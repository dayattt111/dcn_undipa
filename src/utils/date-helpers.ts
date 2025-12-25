/**
 * Helper function to calculate registration deadline
 * @param startDate - ISO date string of program start date
 * @param daysBeforeStart - Number of days before start date (default: 7)
 * @returns ISO date string for registration deadline
 */
export const calculateRegistrationDeadline = (
  startDate: string,
  daysBeforeStart: number = 7
): string => {
  const start = new Date(startDate)
  const deadline = new Date(start.getTime() - daysBeforeStart * 24 * 60 * 60 * 1000)
  return deadline.toISOString()
}

/**
 * Check if registration is still open
 * @param deadline - ISO date string of registration deadline
 * @returns boolean
 */
export const isRegistrationOpen = (deadline: string): boolean => {
  return new Date(deadline) > new Date()
}

/**
 * Format date to WIB timezone
 * @param date - Date object or ISO string
 * @returns Formatted date string in WIB
 */
export const formatDateWIB = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('id-ID', {
    timeZone: 'Asia/Jakarta',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }) + ' WIB'
}
