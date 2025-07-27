import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-circular-menu',
  templateUrl: './circular-menu.component.html',
  styleUrls: ['./circular-menu.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate('200ms ease-in')
      ]),
      transition('* => void', [
        animate('200ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CircularMenuComponent {
  menuOpen = false;

  menuItems = [
    { icon: 'star' },
    { icon: 'schedule' },
    { icon: 'group' },
  ];

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  getItemStyle(index: number): string {
    const totalItems = this.menuItems.length;
    const angle = (Math.PI / 2) / (totalItems - 1) * index;
    const radius = 100;

    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    return this.menuOpen
      ? `translate(-${x}px, -${y}px)`
      : 'translate(0, 0)';
  }
}
