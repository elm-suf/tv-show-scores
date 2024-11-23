import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { debounceTime, map, shareReplay, switchMap } from 'rxjs';

import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TV } from '../../../libs/tmdb/types';
import { ThemeSwitcher } from '../components/theme-switcher';
import { TvCommandComponent } from '../components/tv-command.component';
import { SearchService } from '../services/search.service';

const CORE_IMPORTS = [CommonModule, ReactiveFormsModule, FormsModule];
const UI_IMPORTS = [ThemeSwitcher, TvCommandComponent];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CORE_IMPORTS, UI_IMPORTS],
  template: `
    <main>
      <div
        id="header"
        class="relative flex items-center justify-center w-full p-4"
      >
        <tss-tv-command
          class="mx-auto w-full sm:w-96"
          [data]="data$ | async"
          [focused]="focused"
          [searchFormControl]="searchFormControl"
          (itemClick)="itemClick($event)"
        ></tss-tv-command>

        <tss-theme-switcher
          class="absolute mt-1 top-4 right-4"
        ></tss-theme-switcher>
      </div>

      <h2>some content</h2>
    </main>
  `,
})
export class Home {
  searchFormControl = new FormControl('');
  #search = inject(SearchService);
  focused = false;

  data$ = this.searchFormControl.valueChanges.pipe(
    debounceTime(500),
    switchMap((query) => this.#search.search(query ?? '')),
    map((res) => res.results),
    shareReplay(1)
  );

  itemClick(item: TV) {
    console.debug(`itemclick`, item);
  }
}
