import { Component } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';

@Component({
  selector: 'app-circular-menu',
  templateUrl: './circular-menu.component.html',
  styleUrls: ['./circular-menu.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)',
          style({ opacity: 1, transform: 'scale(1)' })
        ),
      ]),
      transition(':leave', [
        animate('200ms ease-in',
          style({ opacity: 0, transform: 'scale(0.8)' })
        ),
      ]),
    ]),
  ],
})
export class CircularMenuComponent {
  menuOpen = false;

  menuItems = [
    { icon: 'home', label: 'Home' },
    { icon: 'group', label: 'Staff List' },
    { icon: 'person_add', label: 'Add Staff' },
    { icon: 'school', label: 'Student List' },
    { icon: 'person_add_alt', label: 'Add Student' },
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
}
