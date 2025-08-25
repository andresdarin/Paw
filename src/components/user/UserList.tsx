import { useState, useEffect } from 'react';
import { UserCard } from './UserCard';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { authService, User } from '@/services/auth.service';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Users } from 'lucide-react';

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState('');

  const { toast } = useToast();

  const loadUsers = async (page: number = 1, append: boolean = false) => {
    try {
      if (page === 1) setIsLoading(true);
      else setIsLoadingMore(true);

      const response = await authService.getUserList(page);
      
      if (append) {
        setUsers(prev => [...prev, ...response.users]);
      } else {
        setUsers(response.users);
      }
      
      setCurrentPage(response.page);
      setTotalPages(response.pages);
      setError('');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Error al cargar usuarios';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const loadMore = () => {
    if (currentPage < totalPages && !isLoadingMore) {
      loadUsers(currentPage + 1, true);
    }
  };

  const handleFollowChange = (userId: string, isFollowing: boolean) => {
    // This could be used to update UI state if needed
    console.log(`User ${userId} follow status changed to: ${isFollowing}`);
  };

  if (isLoading && users.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error && users.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button onClick={() => loadUsers()} className="mt-4 w-full">
          Intentar de nuevo
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex items-center space-x-2 mb-6">
        <Users className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Descubrir usuarios</h1>
      </div>

      <div className="space-y-4">
        {users.length > 0 ? (
          users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              onFollowChange={handleFollowChange}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No se encontraron usuarios.
            </p>
          </div>
        )}
      </div>

      {/* Load More Button */}
      {currentPage < totalPages && (
        <div className="flex justify-center pt-6">
          <Button 
            onClick={loadMore} 
            variant="outline"
            disabled={isLoadingMore}
          >
            {isLoadingMore ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cargando...
              </>
            ) : (
              'Cargar más usuarios'
            )}
          </Button>
        </div>
      )}
    </div>
  );
};