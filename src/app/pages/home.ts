import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { debounceTime, map, shareReplay, switchMap } from 'rxjs';

import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TV } from '../../../libs/tmdb/types';
import { SearchService } from '../services/search.service';

import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnDialogContentDirective } from '@spartan-ng/ui-dialog-brain';
import { HlmDialogImports } from '@spartan-ng/ui-dialog-helm';
import {
  HlmCodeDirective,
  hlmH1,
  hlmLead,
} from '@spartan-ng/ui-typography-helm';
import { ThemeSwitcher } from '../components/theme-switcher';
import { TvCommandComponent } from '../components/tv-command.component';

const CORE_IMPORTS = [CommonModule, ReactiveFormsModule, FormsModule];
const UI_IMPORTS = [
  HlmDialogImports,
  BrnDialogContentDirective,
  TvCommandComponent,
  ThemeSwitcher,
  HlmCodeDirective,
  HlmButtonDirective,
];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CORE_IMPORTS, UI_IMPORTS],
  template: `
    <hlm-dialog [state]="state()" (stateChanged)="stateChanged($event)">
      <hlm-dialog-content *brnDialogContent="let ctx">
        <tss-tv-command
          [data]="data$ | async"
          [searchFormControl]="searchFormControl"
          (itemClick)="itemClick($event)"
        ></tss-tv-command>
      </hlm-dialog-content>
    </hlm-dialog>

    <tss-theme-switcher
      class="absolute mt-1 top-4 right-4"
    ></tss-theme-switcher>

    <main
      class="h-full flex flex-col border-4 justify-center items-center text-center gap-4 p-4 "
    >
      <h1 class="${hlmH1}">Uncover the Best of TV, One Episode at a Time.</h1>

      <p class="${hlmLead}">
        Discover episode ratings at a glance and find your next binge-worthy
        series.
      </p>

      <div class="flex flex-col sm:flex-row gap-2 items-center">
        <p>
          press
          <code hlmCode>⌘ + f</code>
          to
        </p>
        <button (click)="stateChanged('open')" hlmBtn>Start Exploring</button>
      </div>
    </main>
  `,
})
export class Home {
  searchFormControl = new FormControl('');
  #search = inject(SearchService);

  data$ = this.searchFormControl.valueChanges.pipe(
    debounceTime(500),
    switchMap((query) => this.#search.search(query ?? '')),
    map((res) => res.results),
    shareReplay(1)
  );

  itemClick(item: TV) {
    console.debug(`itemclick`, item);
  }

  public state = signal<'closed' | 'open'>('closed');
  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    console.debug(`onKeyDown(`);
    if (
      (event.metaKey || event.ctrlKey) &&
      (event.key === 'f' || event.key === 'F')
    ) {
      console.debug(`setstate`);
      this.stateChanged('open');
      event.preventDefault();
    }
  }

  stateChanged(state: 'open' | 'closed') {
    this.state.set(state);
  }
}
