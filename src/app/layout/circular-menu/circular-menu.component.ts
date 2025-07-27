import {Component,ElementRef,QueryList,ViewChild,ViewChildren,} from '@angular/core';
import { gsap } from 'gsap';
import {trigger,transition,style,animate,} from '@angular/animations';
import { Router } from '@angular/router';
@Component({
  selector: 'app-circular-menu',
  templateUrl: './circular-menu.component.html',
  styleUrls: ['./circular-menu.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.5)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ opacity: 0, transform: 'scale(0.5)' })
        ),
      ]),
    ]),
  ],
})
export class CircularMenuComponent {
  @ViewChild('menuButton', { static: true }) menuButton!: ElementRef;
  @ViewChildren('menuIcon') menuIcons!: QueryList<ElementRef>;
  menuOpen = false;
  constructor(private router: Router) {}

  menuItems = [
    { icon: 'home', label: 'Home', route: '/home' },
    { icon: 'api', label: 'API Posts', route: '/module/api-posts' },
    { icon: 'folder', label: 'Projects', route: '/module/projects' },
    { icon: 'group', label: 'Staff List', route: '/staff-list' },
    { icon: 'person_add', label: 'Add Staff', route: '/add-staff' },
  ];

  ngAfterViewInit() {
    this.menuIcons.changes.subscribe(() => {
      if (this.menuOpen) {
        gsap.fromTo(
          this.menuIcons.map((icon) => icon.nativeElement),
          { opacity: 0, rotationY: -90, scale: 0.5 },
          {
            opacity: 1,
            rotationY: 0,
            scale: 1,
            duration: 0.6,
            ease: 'back.out(1.7)',
            stagger: 0.1,
          }
        );
      }
    });
  }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    gsap.fromTo(
      this.menuButton.nativeElement,
      { rotationY: 0, scale: 1 },
      { rotationY: 360, scale: 1.2, duration: 0.6, ease: 'power2.out' }
    );

    if (this.menuOpen) {
      gsap.fromTo(
        this.menuIcons.map((icon) => icon.nativeElement),
        { opacity: 0, rotationY: -90, scale: 0.5 },
        {
          opacity: 1,
          rotationY: 0,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          stagger: 0.1,
        }
      );
    }
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
