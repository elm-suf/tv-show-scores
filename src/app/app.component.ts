import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'tss-root',
  imports: [RouterOutlet],
  template: ` <router-outlet /> `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'tv-show-scores';
}
