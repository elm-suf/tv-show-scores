import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Search, TV } from '../../../libs/tmdb/types';

@Injectable({ providedIn: 'root' })
export class SearchService {
  constructor(private http: HttpClient) {}

  search(query: string): Observable<Search<TV>> {
    console.debug(query);
    return this.http.get<Search<TV>>('/api/search', { params: { query } });
  }
}
