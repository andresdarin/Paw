import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Camera, Users, Sparkles, ArrowRight, Zap } from 'lucide-react';

const Welcome = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full flex items-center justify-center">
            <Heart className="w-4 h-4 text-white fill-current" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent">
            PawSocial
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="ghost" asChild className="text-gray-600 hover:text-gray-900">
            <Link to="/login">Entrar</Link>
          </Button>
          <Button asChild className="bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300">
            <Link to="/register">Registrarse</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="relative mb-8">
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
              La red social para
              <span className="block bg-gradient-to-r from-pink-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">
                amantes de mascotas
              </span>
            </h1>
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center rotate-12 hidden md:block">
              <Sparkles className="w-6 h-6 text-yellow-600" />
            </div>
          </div>

          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Comparte los momentos más adorables de tus mascotas, conecta con otros pet lovers
            y descubre contenido que te hará sonreír todos los días.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button asChild size="lg" className="bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 border-none">
              <Link to="/register" className="flex items-center">
                Comenzar gratis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg border-2 border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50">
              <Link to="/explore">Explorar</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto mb-20">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">10K+</div>
              <div className="text-sm text-gray-500">Usuarios activos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">50K+</div>
              <div className="text-sm text-gray-500">Fotos compartidas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">100K+</div>
              <div className="text-sm text-gray-500">Likes dados</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            Todo lo que necesitas en un solo lugar
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Comparte momentos
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Sube fotos y videos de tus mascotas con filtros especiales diseñados para realzar su belleza natural.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Conecta con la comunidad
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Sigue a otros pet lovers, intercambia consejos y encuentra amigos que compartan tu pasión por los animales.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Descubre contenido
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Explora un feed personalizado lleno de contenido adorable que se adapta a tus gustos y preferencias.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-pink-500 via-purple-600 to-orange-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            ¿Listo para compartir la magia?
          </h2>
          <p className="text-xl text-pink-100 mb-10 max-w-2xl mx-auto">
            Únete a miles de personas que ya están compartiendo los momentos más tiernos de sus mascotas.
          </p>
          <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-50 px-10 py-6 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 border-none">
            <Link to="/register" className="flex items-center">
              Crear cuenta gratis
              <Heart className="ml-2 w-5 h-5 fill-current" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full flex items-center justify-center">
              <Heart className="w-3 h-3 text-white fill-current" />
            </div>
            <span className="text-lg font-bold text-white">PawSocial</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2025 PawSocial. Hecho con ❤️ para los amantes de las mascotas.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;