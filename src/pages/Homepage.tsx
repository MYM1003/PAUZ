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
  User
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/960f4cbc-b30e-4117-8856-b9a36b5d0fcd.png" 
                alt="PAUZ" 
                className="h-8"
              />
              <h1 className="text-xl font-bold text-foreground">PAUZ</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => navigate('/profile')}
                    className="flex items-center space-x-2"
                  >
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign out</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/auth')}
                  >
                    Sign In
                  </Button>
                  <Button 
                    className="btn-red"
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-8">
            Earn Points,
            <br />
            <span className="bg-gradient-to-r from-red-accent to-blue-accent bg-clip-text text-transparent">
              Get Rewards
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Share your experience, write reviews, and earn points that you can redeem for exclusive discounts and promotions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button className="btn-red px-8 py-4 text-lg">
              <Edit className="mr-2 h-5 w-5" />
              Leave a Review
            </Button>
            <Button variant="outline" className="px-8 py-4 text-lg border-border hover:bg-secondary">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg">Simple steps to start earning points</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="feature-card text-center">
            <CardContent className="pt-8">
              <div className="w-12 h-12 bg-red-subtle rounded-full flex items-center justify-center mx-auto mb-4">
                <Edit className="h-6 w-6 text-red-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Share Experience</h3>
              <p className="text-muted-foreground">Write honest reviews about products and services you've used.</p>
            </CardContent>
          </Card>
          
          <Card className="feature-card text-center">
            <CardContent className="pt-8">
              <div className="w-12 h-12 bg-blue-subtle rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-blue-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Earn Points</h3>
              <p className="text-muted-foreground">Get points for reviews, purchases, and referring friends.</p>
            </CardContent>
          </Card>
          
          <Card className="feature-card text-center">
            <CardContent className="pt-8">
              <div className="w-12 h-12 bg-gradient-to-br from-red-subtle to-blue-subtle rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Get Rewards</h3>
              <p className="text-muted-foreground">Redeem points for discounts, promotions, and exclusive offers.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* User Profile & Points Section */}
      {user && (
        <section className="section-container">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Profile Section */}
            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Your Profile</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-foreground">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="text-foreground">
                    {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/profile')}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Points Panel */}
            <Card className="stats-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-blue-accent" />
                    <span>Your Points</span>
                  </span>
                  <Badge className="bg-blue-accent text-blue-foreground">
                    {pointsData.total.toLocaleString()}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Recent Activity</h4>
                  {pointsData.activities.map((activity, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                      <div>
                        <p className="font-medium text-foreground">{activity.type}</p>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                      </div>
                      <Badge variant="outline" className="bg-green-subtle text-green-accent border-green-accent">
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
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">What Our Users Say</h2>
          <p className="text-muted-foreground text-lg">Real reviews from real customers</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {featuredReviews.map((review, index) => (
            <Card key={index} className="feature-card">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-foreground mb-4">"{review.text}"</p>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>{review.name}</span>
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
        <div className="bg-gradient-to-r from-red-subtle to-blue-subtle rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Start Earning?</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join thousands of users who are already earning points and getting rewards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-red px-8 py-4 text-lg">
              <Edit className="mr-2 h-5 w-5" />
              Write Your First Review
            </Button>
            <Button className="btn-blue px-8 py-4 text-lg">
              <Mail className="mr-2 h-5 w-5" />
              Contact Support
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary border-t border-border mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img 
                  src="/lovable-uploads/960f4cbc-b30e-4117-8856-b9a36b5d0fcd.png" 
                  alt="PAUZ" 
                  className="h-6"
                />
                <span className="font-bold text-foreground">PAUZ</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Your trusted platform for earning rewards through authentic reviews and feedback.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">How it Works</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Write Review</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Leaderboard</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Rewards</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Connect</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-muted-foreground text-sm">
              © 2024 PAUZ. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;