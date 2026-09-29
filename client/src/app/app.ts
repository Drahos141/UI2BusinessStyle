import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { SVGIconModule } from '@progress/kendo-angular-icons';
import { CardModule, DrawerModule, DrawerSelectEvent } from '@progress/kendo-angular-layout';
import {
  arrowRightIcon,
  arrowUpIcon,
  bellIcon,
  calendarIcon,
  chartLineIcon,
  chevronDownIcon,
  folderIcon,
  gearIcon,
  homeIcon,
  menuIcon,
  plusIcon,
  searchIcon,
  sparklesIcon,
  userIcon,
  usersIcon,
} from '@progress/kendo-svg-icons';

@Component({
  imports: [FormsModule, ButtonModule, SVGIconModule, CardModule, DrawerModule],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly drawerAnimation = { type: 'slide' as const, duration: 240 };
  protected readonly navigationItems = [
    { text: 'Overview', icon: homeIcon, section: 'overview' },
    { text: 'Performance', icon: chartLineIcon, section: 'performance' },
    { text: 'Projects', icon: folderIcon, section: 'projects', badge: '3' },
    { text: 'Team', icon: usersIcon, section: 'team' },
    { text: 'Insights', icon: sparklesIcon, section: 'insights' },
    { text: 'Settings', icon: gearIcon, section: 'overview' },
  ];

  protected readonly menuIcon = menuIcon;
  protected readonly chevronDownIcon = chevronDownIcon;
  protected readonly searchIcon = searchIcon;
  protected readonly bellIcon = bellIcon;
  protected readonly arrowUpIcon = arrowUpIcon;
  protected readonly arrowRightIcon = arrowRightIcon;
  protected readonly usersIcon = usersIcon;
  protected readonly briefcaseIcon = folderIcon;
  protected readonly sparklesIcon = sparklesIcon;
  protected readonly plusIcon = plusIcon;
  protected readonly calendarIcon = calendarIcon;
  protected readonly userIcon = userIcon;

  protected drawerExpanded = false;
  protected activeSection = 'Overview';
  protected dateRange = 'Last 30 days';
  protected searchOpen = false;
  protected searchQuery = '';
  protected userMenuOpen = false;
  protected loginOpen = false;
  protected loginError = false;
  protected loginEmail = '';
  protected loginPassword = '';
  protected toastMessage = '';

  private toastTimer?: ReturnType<typeof setTimeout>;

  protected toggleDrawer(): void {
    this.drawerExpanded = !this.drawerExpanded;
  }

  protected selectNavigation(event: DrawerSelectEvent): void {
    const item = event.item as { text: string; section: string };
    this.activeSection = item.text;
    this.drawerExpanded = true;
    this.userMenuOpen = false;
    this.goToSection(item.section);
  }

  protected navigateTo(section: string): void {
    this.activeSection = section;
    this.goToSection(section.toLowerCase());
  }

  protected goToSection(section: string): void {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  protected toggleDateRange(): void {
    this.dateRange = this.dateRange === 'Last 30 days' ? 'Last 7 days' : 'Last 30 days';
  }

  protected toggleUserMenu(): void {
    this.userMenuOpen = !this.userMenuOpen;
  }

  protected openLogin(): void {
    this.userMenuOpen = false;
    this.loginError = false;
    this.loginOpen = true;
  }

  protected closeLogin(): void {
    this.loginOpen = false;
  }

  protected submitLogin(): void {
    if (!this.loginEmail.trim() || !this.loginPassword.trim()) {
      this.loginError = true;
      return;
    }

    this.loginOpen = false;
    this.loginPassword = '';
    this.showToast('Welcome back to your workspace');
  }

  protected showToast(message: string): void {
    this.toastMessage = message;
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => (this.toastMessage = ''), 3200);
  }
}
