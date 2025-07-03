import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// API client instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Types
export interface Property {
  id: string;
  name: string;
  address: string;
  units: number;
  occupied: number;
  revenue: number;
  ownerId: string;
}

export interface Unit {
  id: string;
  unit: string;
  tenant?: {
    id: string;
    name: string;
    email: string;
  };
  rent: number;
  status: 'Paid' | 'Overdue' | 'Pending' | 'Vacant';
  dueDate: string;
  propertyId: string;
}

export interface MaintenanceRequest {
  id: string;
  unit: string;
  issue: string;
  description?: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
  cost?: number;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  tenantId: string;
  propertyId: string;
}

export interface Payment {
  id: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Failed';
  dueDate: string;
  paidDate?: string;
  method: string;
  tenantId: string;
  unitId: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
  createdAt: string;
  userId: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'maintenance' | 'event' | 'billing' | 'general';
  priority: 'High' | 'Medium' | 'Low';
  createdAt: string;
  propertyId: string;
}

// API Services
export class PropertyService {
  static async getProperties(): Promise<Property[]> {
    const response = await apiClient.get('/properties');
    return response.data;
  }

  static async getProperty(id: string): Promise<Property> {
    const response = await apiClient.get(`/properties/${id}`);
    return response.data;
  }

  static async getUnits(propertyId: string): Promise<Unit[]> {
    const response = await apiClient.get(`/properties/${propertyId}/units`);
    return response.data;
  }
}

export class MaintenanceService {
  static async getRequests(filters?: { status?: string; priority?: string }): Promise<MaintenanceRequest[]> {
    const response = await apiClient.get('/maintenance', { params: filters });
    return response.data;
  }

  static async createRequest(data: Partial<MaintenanceRequest>): Promise<MaintenanceRequest> {
    const response = await apiClient.post('/maintenance', data);
    return response.data;
  }

  static async updateRequest(id: string, data: Partial<MaintenanceRequest>): Promise<MaintenanceRequest> {
    const response = await apiClient.put(`/maintenance/${id}`, data);
    return response.data;
  }

  static async deleteRequest(id: string): Promise<void> {
    await apiClient.delete(`/maintenance/${id}`);
  }
}

export class PaymentService {
  static async getPayments(): Promise<Payment[]> {
    const response = await apiClient.get('/payments');
    return response.data;
  }

  static async processPayment(data: { amount: number; method: string; unitId: string }): Promise<Payment> {
    const response = await apiClient.post('/payments', data);
    return response.data;
  }

  static async getPaymentHistory(): Promise<Payment[]> {
    const response = await apiClient.get('/payments/history');
    return response.data;
  }
}

export class NotificationService {
  static async getNotifications(): Promise<Notification[]> {
    const response = await apiClient.get('/notifications');
    return response.data;
  }

  static async markAsRead(id: string): Promise<void> {
    await apiClient.put(`/notifications/${id}/read`);
  }

  static async markAllAsRead(): Promise<void> {
    await apiClient.put('/notifications/read-all');
  }

  static async deleteNotification(id: string): Promise<void> {
    await apiClient.delete(`/notifications/${id}`);
  }
}

export class AnnouncementService {
  static async getAnnouncements(): Promise<Announcement[]> {
    const response = await apiClient.get('/announcements');
    return response.data;
  }

  static async createAnnouncement(data: Partial<Announcement>): Promise<Announcement> {
    const response = await apiClient.post('/announcements', data);
    return response.data;
  }
}

// Mock API for development (remove when backend is ready)
export const mockApi = {
  properties: [
    { id: '1', name: 'Oak View Apartments', address: '123 Oak St', units: 12, occupied: 11, revenue: 14400, ownerId: 'owner1' },
    { id: '2', name: 'Pine Street Complex', address: '456 Pine St', units: 8, occupied: 7, revenue: 10800, ownerId: 'owner1' },
    { id: '3', name: 'Maple Gardens', address: '789 Maple Ave', units: 16, occupied: 15, revenue: 19200, ownerId: 'owner1' }
  ],
  units: [
    { id: '1', unit: '1A', tenant: { id: 't1', name: 'John Smith', email: 'john@email.com' }, rent: 1200, status: 'Paid' as const, dueDate: '2024-02-01', propertyId: '1' },
    { id: '2', unit: '1B', tenant: { id: 't2', name: 'Sarah Johnson', email: 'sarah@email.com' }, rent: 1200, status: 'Overdue' as const, dueDate: '2024-01-15', propertyId: '1' },
    { id: '3', unit: '2A', tenant: { id: 't3', name: 'Mike Chen', email: 'mike@email.com' }, rent: 1300, status: 'Paid' as const, dueDate: '2024-02-01', propertyId: '1' },
    { id: '4', unit: '2B', rent: 1250, status: 'Vacant' as const, dueDate: '-', propertyId: '1' },
    { id: '5', unit: '3A', tenant: { id: 't4', name: 'Lisa Rodriguez', email: 'lisa@email.com' }, rent: 1400, status: 'Pending' as const, dueDate: '2024-01-28', propertyId: '1' }
  ],
  maintenanceRequests: [
    { id: '1', unit: '1A', issue: 'Leaky faucet in kitchen', priority: 'Medium' as const, status: 'In Progress' as const, cost: 150, createdAt: '2024-01-15', updatedAt: '2024-01-16', tenantId: 't1', propertyId: '1' },
    { id: '2', unit: '2B', issue: 'Heating not working', priority: 'High' as const, status: 'Completed' as const, cost: 200, createdAt: '2024-01-10', updatedAt: '2024-01-12', tenantId: 't2', propertyId: '1' },
    { id: '3', unit: '3A', issue: 'Light bulb replacement', priority: 'Low' as const, status: 'Pending' as const, cost: 75, createdAt: '2024-01-18', updatedAt: '2024-01-18', tenantId: 't4', propertyId: '1' }
  ],
  notifications: [
    { id: '1', title: 'Rent Payment Due', message: 'Your rent payment is due in 3 days', type: 'warning' as const, read: false, createdAt: '2024-01-20', userId: 't1' },
    { id: '2', title: 'Maintenance Complete', message: 'Your heating repair has been completed', type: 'success' as const, read: false, createdAt: '2024-01-19', userId: 't2' },
    { id: '3', title: 'Community Event', message: 'BBQ event this weekend in the courtyard', type: 'info' as const, read: true, createdAt: '2024-01-18', userId: 't1' }
  ]
};