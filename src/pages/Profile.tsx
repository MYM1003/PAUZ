import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, User, Gift, Star, LogOut } from 'lucide-react';

interface UserProfile {
  id: string;
  full_name: string;
  username: string | null;
  points: number;
  created_at: string;
}

const Profile = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/');
    } else if (user) {
      fetchProfile();
    }
  }, [user, authLoading]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  const pointsLevel = profile.points >= 1000 ? 'Oro' : profile.points >= 500 ? 'Plata' : 'Bronce';

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <img 
              src="/lovable-uploads/pauz-logo.png" 
              alt="PAUZ" 
              className="h-10 object-contain"
            />
            <h1 className="text-2xl font-bold text-foreground">Mi Perfil</h1>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Profile Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Información Personal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Nombre</label>
                <p className="text-foreground">{profile.full_name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="text-foreground">{user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Usuario desde</label>
                <p className="text-foreground">
                  {new Date(profile.created_at).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="pt-4">
                <Button variant="outline" className="w-full">
                  Editar Perfil
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Points & Level */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Puntos y Nivel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  {profile.points}
                </div>
                <p className="text-muted-foreground mb-4">Puntos acumulados</p>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  Nivel {pointsLevel}
                </Badge>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Gana puntos con cada compra</p>
                <p>• Canjéalos por descuentos</p>
                <p>• Accede a promociones exclusivas</p>
              </div>
            </CardContent>
          </Card>

          {/* Available Promotions */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5" />
                Promociones Disponibles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Descuento 10%</h3>
                  <p className="text-sm text-muted-foreground mb-2">En tu próxima compra</p>
                  <p className="text-sm font-medium">100 puntos</p>
                  <Button 
                    size="sm" 
                    className="w-full mt-2"
                    disabled={profile.points < 100}
                  >
                    Canjear
                  </Button>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Envío Gratis</h3>
                  <p className="text-sm text-muted-foreground mb-2">En cualquier pedido</p>
                  <p className="text-sm font-medium">250 puntos</p>
                  <Button 
                    size="sm" 
                    className="w-full mt-2"
                    disabled={profile.points < 250}
                  >
                    Canjear
                  </Button>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Descuento 25%</h3>
                  <p className="text-sm text-muted-foreground mb-2">Oferta especial</p>
                  <p className="text-sm font-medium">500 puntos</p>
                  <Button 
                    size="sm" 
                    className="w-full mt-2"
                    disabled={profile.points < 500}
                  >
                    Canjear
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;