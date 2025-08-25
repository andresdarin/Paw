import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-social-bg p-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Página no encontrada
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button asChild className="btn-primary">
            <a href="/">Volver al inicio</a>
          </Button>
          <div className="text-sm text-muted-foreground">
            <p>¿Necesitas ayuda? Contacta con soporte</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
