export function formatDate(date: string | Date, format: 'short' | 'long' = 'short'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const options: Intl.DateTimeFormatOptions =
    format === 'long'
      ? { year: 'numeric', month: 'long', day: 'numeric' }
      : { year: 'numeric', month: '2-digit', day: '2-digit' };

  return new Intl.DateTimeFormat('en-US', options).format(dateObj);
}

export function formatDateTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(dateObj);
}

export function getDateRangePreset(preset: 'today' | 'week' | 'month' | 'year'): {
  from: string;
  to: string;
} {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const ranges = {
    today: {
      from: today.toISOString().split('T')[0],
      to: today.toISOString().split('T')[0],
    },
    week: {
      from: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      to: today.toISOString().split('T')[0],
    },
    month: {
      from: new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
        .toISOString()
        .split('T')[0],
      to: today.toISOString().split('T')[0],
    },
    year: {
      from: new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())
        .toISOString()
        .split('T')[0],
      to: today.toISOString().split('T')[0],
    },
  };

  return ranges[preset];
}
