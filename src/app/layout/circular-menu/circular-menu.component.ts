import { Component } from '@angular/core';
import {trigger, transition, style, animate, state,} from '@angular/animations';
import { Router } from '@angular/router';
@Component({
  selector: 'app-circular-menu',
  templateUrl: './circular-menu.component.html',
  styleUrls: ['./circular-menu.component.scss'],
 animations: [
  trigger('fadeInOut', [
    transition(':enter', [
      style({ opacity: 0, transform: 'scale(0.5)' }),
      animate(
        '400ms ease-out',
        style({ opacity: 1, transform: 'scale(1)' })
      )
    ]),
    transition(':leave', [
      animate(
        '300ms ease-in',
        style({ opacity: 0, transform: 'scale(0.5)' })
      )
    ])
  ])
]
})
export class CircularMenuComponent {
  menuOpen = false;
  constructor(private router: Router) {}

  menuItems = [
    { icon: 'home', label: 'Home', route: '/home' },
    { icon: 'api', label: 'API Posts', route: '/module/api-posts' },
    { icon: 'folder', label: 'Projects', route: '/module/projects' },
    { icon: 'group', label: 'Staff List', route: '/staff-list' },
    { icon: 'person_add', label: 'Add Staff', route: '/add-staff' },
  ];
  public toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  public getItemStyle(index: number): string {
    if (!this.menuOpen) return 'scale(0)';
    let total = this.menuItems.length;
    let angle = Math.PI / 2 / (total - 1);
    let radius = 170;
    let x = -radius * Math.cos(angle * index);
    let y = -radius * Math.sin(angle * index);
    return `translate(${x}px, ${y}px)`;
  }

  trackByFn(index: number, item: any): number {
  return index;
 }

navigateTo(route: string) {
  this.menuOpen = false; 
  this.router.navigateByUrl(route);
}

}
