/**
 * Format a date to display time for today's messages or date for older messages
 * @param date The date to format
 * @returns Formatted string (e.g., "19:45" for today, "27.02" for earlier dates)
 */
export const formatMessageTime = (date: Date): string => {
  const now = new Date()
  const isToday =
    date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()

  if (isToday) {
    return date.toLocaleTimeString("default", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  } else {
    return date.toLocaleDateString("default", {
      day: "2-digit",
      month: "2-digit",
    })
  }
}
