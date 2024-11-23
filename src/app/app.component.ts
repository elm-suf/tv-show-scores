import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { query } from 'express';

@Component({
  selector: 'tss-root',
  imports: [RouterOutlet],
  template: ` <router-outlet />`,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'tv-show-scores';
}
