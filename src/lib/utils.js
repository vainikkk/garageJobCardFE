import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Function to get status color
export function getStatusColor(status) {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'in-progress':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'completed':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'awaiting-payment':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'cancelled':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

// Function to get status label
export function getStatusLabel(status) {
  switch (status) {
    case 'in-progress':
      return 'In Progress';
    case 'awaiting-payment':
      return 'Awaiting Payment';
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
}

// Format currency with locale support
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Get payment status color class
export function getPaymentStatusColor(status) {
  switch (status) {
    case 'paid':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'partially-paid':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'unpaid':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

// Get payment status label with proper formatting
export function getPaymentStatusLabel(status) {
  return status
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Format date to human-readable form
export function formatDate(date) {
  if (!date) return 'N/A';

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  // Today's date at midnight for comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Yesterday's date at midnight for comparison
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Check if the date is today
  if (dateObj.toDateString() === new Date().toDateString()) {
    return `Today, ${dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }

  // Check if the date is yesterday
  if (dateObj.toDateString() === yesterday.toDateString()) {
    return `Yesterday, ${dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }

  // For other dates, format as "MMM DD, YYYY"
  return dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
