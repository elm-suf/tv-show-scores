import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

const CORE_IMPORTS = [CommonModule];

@Component({
  imports: [CORE_IMPORTS],
  template: `
    <main>
      <h1 class="text-3xl font-bold underline">Hello world!</h1>
      <input
        type="text"
        name="search"
        id=""
        #input
        (change)="search(input.value)"
      />
      <pre>{{ data$ | async | json }}</pre>
    </main>
  `,
})
export class Home {
  http = inject(HttpClient);
  data$?: Observable<any>;

  search(query: string) {
    console.debug(query);
    this.data$ = this.http.get('/api/search', { params: { query } });
    //   .subscribe((res) => console.debug(res));
  }
}
