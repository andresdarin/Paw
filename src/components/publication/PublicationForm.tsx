import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { publicationService } from '@/services/publication.service';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { ImagePlus, X, Send } from 'lucide-react';

interface PublicationFormProps {
  onPublicationCreated?: () => void;
}

export const PublicationForm = ({ onPublicationCreated }: PublicationFormProps) => {
  const [text, setText] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { user } = useAuth();
  const { toast } = useToast();

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      toast({
        title: 'Error',
        description: 'Debes escribir algo para publicar.',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);

    try {
      // Create publication with text
      const response = await publicationService.createPublication({ text });
      
      if (response.status === 'success' && response.publication) {
        // Upload image if selected
        if (selectedImage && response.publication._id) {
          await publicationService.uploadPublicationImage(response.publication._id, selectedImage);
        }

        toast({
          title: 'Publicación creada',
          description: 'Tu publicación ha sido compartida exitosamente.'
        });

        // Reset form
        setText('');
        setSelectedImage(null);
        setImagePreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        if (onPublicationCreated) {
          onPublicationCreated();
        }
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Error al crear la publicación',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const characterCount = text.length;
  const maxCharacters = 280;

  return (
    <Card className="social-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">¿Qué está pasando?</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-3">
            <Avatar className="h-10 w-10 flex-shrink-0">
              <AvatarImage src={user?.image} alt={user?.name} />
              <AvatarFallback>
                {user?.name?.[0]?.toUpperCase()}{user?.surname?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-3">
              <Textarea
                placeholder="¿Qué quieres compartir?"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[100px] resize-none border-0 p-0 text-lg placeholder:text-muted-foreground focus-visible:ring-0"
                maxLength={maxCharacters}
              />

              {imagePreview && (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full rounded-lg border border-border max-h-64 object-cover"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={removeImage}
                    className="absolute top-2 right-2 h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div className="flex items-center space-x-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="text-primary hover:text-primary-hover hover:bg-primary-light"
              >
                <ImagePlus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-3">
              <span 
                className={`text-sm ${
                  characterCount > maxCharacters ? 'text-destructive' : 
                  characterCount > maxCharacters * 0.8 ? 'text-orange-500' : 
                  'text-muted-foreground'
                }`}
              >
                {characterCount}/{maxCharacters}
              </span>
              
              <Button
                type="submit"
                disabled={!text.trim() || characterCount > maxCharacters || isLoading}
                className="btn-primary"
              >
                {isLoading ? (
                  'Publicando...'
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Publicar
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};