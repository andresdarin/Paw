import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Publication } from '@/services/publication.service';
import { useAuth } from '@/hooks/useAuth';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { Heart, MessageCircle, Share, MoreVertical, Trash2 } from 'lucide-react';

interface PublicationCardProps {
  publication: Publication;
  onDelete?: (id: string) => void;
}

export const PublicationCard = ({ publication, onDelete }: PublicationCardProps) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const isOwner = user?._id === publication.user._id;
  
  const timeAgo = formatDistanceToNow(new Date(publication.created_at), {
    addSuffix: true,
    locale: es
  });

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(publication._id);
    }
  };

  return (
    <Card className="social-card feed-enter">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Link 
            to={`/profile/${publication.user._id}`}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage 
                src={publication.user.image} 
                alt={`${publication.user.name} ${publication.user.surname}`} 
              />
              <AvatarFallback>
                {publication.user.name[0]?.toUpperCase()}{publication.user.surname[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-foreground">
                {publication.user.name} {publication.user.surname}
              </p>
              <p className="text-xs text-muted-foreground">
                @{publication.user.nick} · {timeAgo}
              </p>
            </div>
          </Link>

          {isOwner && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Publication Text */}
        <div className="mb-3">
          <p className="text-sm text-foreground whitespace-pre-wrap">
            {publication.text}
          </p>
        </div>

        {/* Publication Image */}
        {publication.file && (
          <div className="mb-4">
            <img
              src={publication.file}
              alt="Imagen de la publicación"
              className="w-full rounded-lg border border-border max-h-96 object-cover"
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex items-center space-x-2 text-muted-foreground hover:text-red-500 transition-colors ${
                isLiked ? 'text-red-500' : ''
              }`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-xs">{likesCount}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs">0</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};