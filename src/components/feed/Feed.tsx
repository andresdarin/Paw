import { useState, useEffect } from 'react';
import { PublicationCard } from '@/components/publication/PublicationCard';
import { PublicationForm } from '@/components/publication/PublicationForm';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { publicationService, Publication } from '@/services/publication.service';
import { useToast } from '@/hooks/use-toast';
import { Loader2, RefreshCw } from 'lucide-react';

export const Feed = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState('');

  const { toast } = useToast();

  const loadFeed = async (page: number = 1, append: boolean = false) => {
    try {
      if (page === 1) setIsLoading(true);
      else setIsLoadingMore(true);
      
      const response = await publicationService.getFeed(page);
      
      if (append) {
        setPublications(prev => [...prev, ...response.publications]);
      } else {
        setPublications(response.publications);
      }
      
      setCurrentPage(response.page);
      setTotalPages(response.pages);
      setError('');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Error al cargar el feed';
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
    loadFeed();
  }, []);

  const handlePublicationCreated = () => {
    loadFeed(); // Reload feed after creating a publication
  };

  const handleDeletePublication = async (id: string) => {
    try {
      await publicationService.deletePublication(id);
      setPublications(prev => prev.filter(pub => pub._id !== id));
      toast({
        title: 'Publicación eliminada',
        description: 'La publicación ha sido eliminada exitosamente.'
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Error al eliminar la publicación',
        variant: 'destructive'
      });
    }
  };

  const loadMore = () => {
    if (currentPage < totalPages && !isLoadingMore) {
      loadFeed(currentPage + 1, true);
    }
  };

  const refresh = () => {
    loadFeed();
  };

  if (error && publications.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button onClick={refresh} className="mt-4 w-full">
          <RefreshCw className="mr-2 h-4 w-4" />
          Intentar de nuevo
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* Publication Form */}
      <PublicationForm onPublicationCreated={handlePublicationCreated} />
      
      {/* Refresh Button */}
      <div className="flex justify-center">
        <Button 
          onClick={refresh} 
          variant="outline" 
          size="sm"
          disabled={isLoading}
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Actualizar feed
        </Button>
      </div>

      {/* Loading State */}
      {isLoading && publications.length === 0 ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          {/* Publications List */}
          <div className="space-y-6">
            {publications.length > 0 ? (
              publications.map((publication) => (
                <PublicationCard
                  key={publication._id}
                  publication={publication}
                  onDelete={handleDeletePublication}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No hay publicaciones en tu feed aún.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  ¡Sigue a otros usuarios para ver sus publicaciones!
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
                  'Cargar más publicaciones'
                )}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};