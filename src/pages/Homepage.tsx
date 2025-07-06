import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { 
  Star, 
  Award, 
  TrendingUp, 
  Users, 
  Mail, 
  Settings,
  Edit,
  LogOut,
  User,
  ArrowLeft
} from 'lucide-react';

const Homepage = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const pointsData = {
    total: 1250,
    activities: [
      { type: 'Review', points: 50, date: '2024-01-15', description: 'Product feedback submitted' },
      { type: 'Purchase', points: 100, date: '2024-01-10', description: 'Order #12345 completed' },
      { type: 'Referral', points: 200, date: '2024-01-05', description: 'Friend joined through your link' },
    ]
  };

  const featuredReviews = [
    { name: 'Maria G.', rating: 5, text: 'Amazing quality and fast delivery!', date: '2024-01-14' },
    { name: 'Carlos R.', rating: 5, text: 'Best customer service I\'ve experienced.', date: '2024-01-13' },
    { name: 'Ana L.', rating: 4, text: 'Great products, will definitely return.', date: '2024-01-12' },
  ];

  const topUsers = [
    { name: 'Isabella M.', points: 2850, rank: 1 },
    { name: 'Roberto S.', points: 2340, rank: 2 },
    { name: 'Carmen P.', points: 2100, rank: 3 },
    { name: 'You', points: 1250, rank: 8 },
  ];

  return (
    <div className="mobile-container">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => window.history.back()}
                className="flex items-center space-x-1 text-muted-foreground hover:text-foreground min-h-[44px] px-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-3 absolute left-1/2 transform -translate-x-1/2">
              <img 
                src="/lovable-uploads/pauz-logo.png" 
                alt="PAUZ" 
                className="h-8 w-8 object-contain cursor-pointer"
                onClick={() => navigate('/')}
              />
              <h1 
                className="text-xl font-bold text-foreground cursor-pointer" 
                onClick={() => navigate('/')}
              >
                PAUZ
              </h1>
            </div>
            
            <div className="flex items-center space-x-2">
              {user ? (
                <>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => navigate('/profile')}
                    className="flex items-center space-x-2 min-h-[44px] px-4"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden sm:block">Profile</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 text-muted-foreground hover:text-foreground min-h-[44px] px-4"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:block">Sign out</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/auth')}
                    className="min-h-[44px]"
                  >
                    Sign In
                  </Button>
              <Button 
                className="w-full max-w-xs text-lg min-h-[56px] bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => navigate('/auth')}
              >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">
            Earn Points
            <br />
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Get Rewards
            </span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Share your experience, write reviews, and earn points that you can redeem for exclusive discounts and promotions.
          </p>
          
          <div className="flex flex-col gap-4 items-center">
            <Button 
              className="w-full max-w-xs text-lg min-h-[56px] bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Edit className="mr-2 h-5 w-5" />
              Leave a Review
            </Button>
            <Button 
              variant="outline" 
              className="w-full max-w-xs text-lg border-border hover:bg-secondary min-h-[44px]"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg">Simple steps to start earning points</p>
        </div>
        
        <div className="space-y-6">
          <Card className="feature-card text-center">
            <CardContent className="pt-8">
              <div className="w-16 h-16 bg-red-subtle rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Edit className="h-8 w-8 text-red-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Share Experience</h3>
              <p className="text-muted-foreground leading-relaxed">Write honest reviews about products and services you've used.</p>
            </CardContent>
          </Card>
          
          <Card className="feature-card text-center">
            <CardContent className="pt-8">
              <div className="w-16 h-16 bg-blue-subtle rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-blue-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Earn Points</h3>
              <p className="text-muted-foreground leading-relaxed">Get points for reviews, purchases, and referring friends.</p>
            </CardContent>
          </Card>
          
          <Card className="feature-card text-center">
            <CardContent className="pt-8">
              <div className="w-16 h-16 bg-gradient-to-br from-red-subtle to-blue-subtle rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Get Rewards</h3>
              <p className="text-muted-foreground leading-relaxed">Redeem points for discounts, promotions, and exclusive offers.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* User Points Section */}
      {user && (
        <section className="section-container">
          <div className="space-y-6">
            {/* Points Panel */}
            <Card className="stats-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-accent" />
                    <span>Your Points</span>
                  </span>
                  <Badge className="bg-accent text-accent-foreground">
                    {pointsData.total.toLocaleString()}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Recent Activity</h4>
                  {pointsData.activities.map((activity, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b border-border last:border-b-0">
                      <div>
                        <p className="font-medium text-foreground">{activity.type}</p>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                      </div>
                      <Badge variant="outline" className="bg-accent/10 text-accent border-accent">
                        +{activity.points}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Featured Reviews */}
      <section className="section-container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-4">What Our Users Say</h2>
          <p className="text-muted-foreground text-lg">Real reviews from real customers</p>
        </div>
        
        <div className="space-y-6">
          {featuredReviews.map((review, index) => (
            <Card key={index} className="feature-card">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-foreground mb-4 text-lg leading-relaxed">"{review.text}"</p>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span className="font-medium">{review.name}</span>
                  <span>{review.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Top Users Ranking */}
      <section className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Top Contributors</h2>
          <p className="text-muted-foreground text-lg">See how you rank among our community</p>
        </div>
        
        <Card className="max-w-md mx-auto feature-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-accent" />
              <span>Leaderboard</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topUsers.map((user, index) => (
                <div 
                  key={index} 
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    user.name === 'You' ? 'bg-blue-subtle border border-blue-accent' : 'bg-secondary'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      user.rank === 1 ? 'bg-yellow-500 text-black' :
                      user.rank === 2 ? 'bg-gray-400 text-black' :
                      user.rank === 3 ? 'bg-orange-500 text-black' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {user.rank}
                    </div>
                    <span className="font-medium text-foreground">{user.name}</span>
                  </div>
                  <span className="text-blue-accent font-semibold">{user.points.toLocaleString()} pts</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FAQ Section */}
      <section className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
        </div>
        
        <div className="max-w-3xl mx-auto grid gap-6">
          <Card className="feature-card">
            <CardHeader>
              <CardTitle className="text-lg">How do I earn points?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                You can earn points by writing product reviews (50pts), making purchases (100pts), 
                and referring friends to join the platform (200pts each).
              </p>
            </CardContent>
          </Card>
          
          <Card className="feature-card">
            <CardHeader>
              <CardTitle className="text-lg">How do I redeem my points?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Points can be redeemed for discount codes, exclusive promotions, and special offers. 
                Check your profile for available redemption options.
              </p>
            </CardContent>
          </Card>
          
          <Card className="feature-card">
            <CardHeader>
              <CardTitle className="text-lg">Do points expire?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Points are valid for 12 months from the date they were earned. We'll send you reminders 
                before your points are about to expire.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-container text-center">
          <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-8 border border-accent/20">
            <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Start Earning?</h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Join thousands of users who are already earning points and getting rewards.
            </p>
            <div className="flex flex-col gap-4">
              <Button className="w-full text-lg min-h-[56px] bg-accent hover:bg-accent/90 text-accent-foreground">
                <Edit className="mr-2 h-5 w-5" />
                Write Your First Review
              </Button>
              <Button 
                variant="outline" 
                className="w-full text-lg min-h-[56px] border-border hover:bg-secondary"
              >
                <Mail className="mr-2 h-5 w-5" />
                Contact Support
              </Button>
            </div>
          </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary border-t border-border mt-12">
        <div className="px-6 py-12">
          <div className="space-y-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <img 
                  src="/lovable-uploads/pauz-logo-new.png" 
                  alt="PAUZ" 
                  className="h-8 w-8 rounded-lg object-cover"
                />
                <span className="font-bold text-foreground text-xl">PAUZ</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
                Your trusted platform for earning rewards through authentic reviews and feedback.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 text-center">
              <div>
                <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground transition-colors">How it Works</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Write Review</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Leaderboard</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Rewards</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-4">Support</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Terms & Conditions</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-border pt-8 text-center">
              <p className="text-muted-foreground text-sm">
                © 2024 PAUZ. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;