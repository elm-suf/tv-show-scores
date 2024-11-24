import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideIcons } from '@ng-icons/core';
import { lucideCalendar, lucideSearch } from '@ng-icons/lucide';
import { HlmAvatarImports } from '@spartan-ng/ui-avatar-helm';
import { HlmCardImports } from '@spartan-ng/ui-card-helm';
import { HlmCommandImports } from '@spartan-ng/ui-command-helm';
import { HlmIconModule } from '@spartan-ng/ui-icon-helm';
import { TV } from '../../../libs/tmdb/types';

const CORE_IMPORTS = [CommonModule, ReactiveFormsModule, FormsModule];
const UI_IMPORTS = [
  HlmCardImports,
  HlmCommandImports,
  HlmIconModule,
  HlmAvatarImports,
];

@Component({
  imports: [CORE_IMPORTS, UI_IMPORTS],
  providers: [provideIcons({ lucideSearch, lucideCalendar })],

  selector: 'tss-tv-command',
  styles: [``],
  template: `
    <brn-cmd hlm class="sm:w-96">
      <hlm-cmd-input-wrapper>
        <hlm-icon name="lucideSearch" />
        <input
          placeholder="Search tv shows..."
          brnCmdInput
          hlm
          [formControl]="searchFormControl"
        />
      </hlm-cmd-input-wrapper>

      @if(data && searchFormControl.value){ @if(data.length === 0 ){
      <div hlmCmdEmpty>No results found.</div>
      } @else {
      <brn-cmd-list hlm>
        <brn-cmd-group hlm>
          @for (_ of data; track $index) {
          <button
            class="w-full cursor-pointer"
            brnCmdItem
            hlm
            (click)="itemClick.emit(_)"
          >
            <hlm-avatar variant="large">
              <img
                [src]="'https://image.tmdb.org/t/p/w500' + _.poster_path"
                [alt]="_.name"
                hlmAvatarImage
              />
              <span class="bg-[#FD005B] text-white" hlmAvatarFallback>{{
                _.name
              }}</span>
            </hlm-avatar>
            {{ _.name }}
          </button>
          }
        </brn-cmd-group>
      </brn-cmd-list>
      } }
    </brn-cmd>
  `,
})
export class TvCommandComponent {
  @Input() searchFormControl!: FormControl;
  @Input() data!: TV[] | null;

  @Output() itemClick = new EventEmitter<TV>();
}
