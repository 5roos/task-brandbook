import { Component } from '@angular/core';

@Component({
  selector: 'app-circular-menu',
  templateUrl: './circular-menu.component.html',
  styleUrls: ['./circular-menu.component.scss']
})
export class CircularMenuComponent {

 menuOpen = false;

  menuItems = [
    { icon: 'home' },
    { icon: 'settings' },
    { icon: 'person' },
    { icon: 'notifications' },
    { icon: 'info' }
  ];
toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  getItemTransform(index: number): string {
    const radius = 120; // px
    const angle = (Math.PI / (this.menuItems.length - 1)) * index; // semi-circle
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return this.menuOpen
      ? `translate(-${x}px, -${y}px)`
      : `translate(0, 0)`;
  }

}
