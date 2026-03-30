import type { Notification } from '../types';

export const MOCK_NOTIFICATIONS = [
  { id: 'n1', message: 'New lab results available', type: 'info' as const, read: false },
  { id: 'n2', message: 'Appointment starts in 15 mins', type: 'urgent'as const, read: false }
];