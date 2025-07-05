import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.1c92334a51f54a27b84806e237569b08',
  appName: 'noche-roja-feedback',
  webDir: 'dist',
  server: {
    url: 'https://1c92334a-51f5-4a27-b848-06e237569b08.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  }
};

export default config;