import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { NotificationService, Notification } from '@/lib/api';
import { toast } from 'sonner';

export const useNotifications = () => {
  const queryClient = useQueryClient();

  const {
    data: notifications = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['notifications'],
    queryFn: NotificationService.getNotifications,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const markAsReadMutation = useMutation({
    mutationFn: NotificationService.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
    onError: (error: any) => {
      toast.error('Failed to mark notification as read');
    }
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: NotificationService.markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast.success('All notifications marked as read');
    },
    onError: (error: any) => {
      toast.error('Failed to mark all notifications as read');
    }
  });

  const deleteNotificationMutation = useMutation({
    mutationFn: NotificationService.deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast.success('Notification deleted');
    },
    onError: (error: any) => {
      toast.error('Failed to delete notification');
    }
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    markAsReadMutation.mutate(id);
  };

  const markAllAsRead = () => {
    markAllAsReadMutation.mutate();
  };

  const deleteNotification = (id: string) => {
    deleteNotificationMutation.mutate(id);
  };

  return {
    notifications,
    unreadCount,
    isLoading,
    error,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    isMarkingAsRead: markAsReadMutation.isPending,
    isMarkingAllAsRead: markAllAsReadMutation.isPending,
    isDeleting: deleteNotificationMutation.isPending
  };
};

// Hook for real-time notifications
export const useRealtimeNotifications = () => {
  const [newNotifications, setNewNotifications] = useState<Notification[]>([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    // In a real app, this would connect to WebSocket or Server-Sent Events
    // For now, we'll simulate with polling
    const interval = setInterval(() => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [queryClient]);

  const showNotificationToast = (notification: Notification) => {
    const toastOptions = {
      duration: 5000,
      action: {
        label: 'View',
        onClick: () => {
          // Handle notification click
        }
      }
    };

    switch (notification.type) {
      case 'success':
        toast.success(notification.title, toastOptions);
        break;
      case 'warning':
        toast.warning(notification.title, toastOptions);
        break;
      case 'error':
        toast.error(notification.title, toastOptions);
        break;
      default:
        toast.info(notification.title, toastOptions);
    }
  };

  return {
    newNotifications,
    showNotificationToast
  };
};