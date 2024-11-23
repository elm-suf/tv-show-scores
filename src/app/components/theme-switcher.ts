import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideMoon, lucideSunMedium } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { ThemeService } from '../core/theme.service';

@Component({
  selector: 'tss-theme-switcher',
  imports: [HlmIconComponent, HlmButtonDirective, AsyncPipe],
  providers: [provideIcons({ lucideSunMedium, lucideMoon })],
  template: ` <button
    hlmBtn
    size="icon"
    variant="outline"
    (click)="theme.toggleDarkMode()"
  >
    <hlm-icon
      [name]="
        (theme.theme$ | async) === 'dark' ? 'lucideSunMedium' : 'lucideMoon'
      "
    />
  </button>`,
})
export class ThemeSwitcher {
  protected theme = inject(ThemeService);
}
