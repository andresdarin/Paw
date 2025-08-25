import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { User } from '@/services/auth.service';
import { followService } from '@/services/follow.service';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, UserMinus } from 'lucide-react';

interface UserCardProps {
  user: User;
  isFollowing?: boolean;
  onFollowChange?: (userId: string, isFollowing: boolean) => void;
}

export const UserCard = ({ user, isFollowing = false, onFollowChange }: UserCardProps) => {
  const [following, setFollowing] = useState(isFollowing);
  const [isLoading, setIsLoading] = useState(false);
  const { user: currentUser } = useAuth();
  const { toast } = useToast();

  const isOwnProfile = currentUser?._id === user._id;

  const handleFollowToggle = async () => {
    if (isOwnProfile) return;

    setIsLoading(true);
    try {
      if (following) {
        await followService.unfollowUser(user._id);
        setFollowing(false);
        toast({
          title: 'Usuario no seguido',
          description: `Dejaste de seguir a ${user.name} ${user.surname}`
        });
      } else {
        await followService.followUser(user._id);
        setFollowing(true);
        toast({
          title: 'Usuario seguido',
          description: `Ahora sigues a ${user.name} ${user.surname}`
        });
      }

      if (onFollowChange) {
        onFollowChange(user._id, !following);
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Error al procesar la acción',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="social-card card-hover">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <Link 
            to={`/profile/${user._id}`}
            className="flex items-center space-x-4 hover:opacity-80 transition-opacity flex-1"
          >
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.image} alt={`${user.name} ${user.surname}`} />
              <AvatarFallback className="bg-gradient-primary text-white">
                {user.name[0]?.toUpperCase()}{user.surname[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-foreground truncate">
                {user.name} {user.surname}
              </h3>
              <p className="text-sm text-muted-foreground truncate">
                @{user.nick}
              </p>
              {user.bio && (
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {user.bio}
                </p>
              )}
            </div>
          </Link>

          {!isOwnProfile && (
            <Button
              onClick={handleFollowToggle}
              disabled={isLoading}
              size="sm"
              variant={following ? "outline" : "default"}
              className={following ? "hover:bg-destructive hover:text-destructive-foreground hover:border-destructive" : "btn-primary"}
            >
              {isLoading ? (
                'Procesando...'
              ) : following ? (
                <>
                  <UserMinus className="h-4 w-4 mr-2" />
                  Siguiendo
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Seguir
                </>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};