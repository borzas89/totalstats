import { Component } from '@angular/core';

@Component({
  selector: 'app-deep-link-test',
  templateUrl: './deep-link-test.component.html',
  styleUrls: ['./deep-link-test.component.css']
})
export class DeepLinkTestComponent {
  // Deep link base URLs
  customSchemeBase = 'authapp://auth.example.com';
  httpsBase = 'https://auth.example.com';

  // Deep link paths
  deepLinks = [
    {
      title: 'Login Screen',
      path: '/login',
      icon: '🔐',
      description: 'Opens the login screen in the auth app'
    },
    {
      title: 'Register Screen',
      path: '/register',
      icon: '📝',
      description: 'Opens the registration screen in the auth app'
    },
    {
      title: 'Forgot Password Screen',
      path: '/forgot-password',
      icon: '🔑',
      description: 'Opens the forgot password screen in the auth app'
    }
  ];

  constructor() { }

  /**
   * Opens a deep link with custom scheme (authapp://)
   */
  openCustomSchemeLink(path: string): void {
    const url = `${this.customSchemeBase}${path}`;
    window.location.href = url;
  }

  /**
   * Opens a deep link with HTTPS scheme
   */
  openHttpsLink(path: string): void {
    const url = `${this.httpsBase}${path}`;
    window.location.href = url;
  }

  /**
   * Copies the link to clipboard
   */
  copyToClipboard(url: string): void {
    navigator.clipboard.writeText(url).then(() => {
      alert(`Copied to clipboard: ${url}`);
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  }
}
