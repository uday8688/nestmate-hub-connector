import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
  requireAuth?: boolean;
}

export const ProtectedRoute = ({ 
  children, 
  allowedRoles = [], 
  requireAuth = true 
}: ProtectedRouteProps) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="space-y-4 w-full max-w-md">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-8 w-1/2" />
        </div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on user role
    return <Navigate to={`/${user.role}`} replace />;
  }

  return <>{children}</>;
};

// Higher-order component for role-based access
export const withRoleAccess = (allowedRoles: string[]) => {
  return (Component: React.ComponentType) => {
    return (props: any) => (
      <ProtectedRoute allowedRoles={allowedRoles}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
};

// Specific role guards
export const TenantRoute = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute allowedRoles={['tenant']}>{children}</ProtectedRoute>
);

export const OwnerRoute = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute allowedRoles={['owner']}>{children}</ProtectedRoute>
);

export const AdminRoute = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute allowedRoles={['admin']}>{children}</ProtectedRoute>
);

export const VendorRoute = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute allowedRoles={['vendor']}>{children}</ProtectedRoute>
);