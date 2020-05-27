import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, publishReplay, refCount } from "rxjs/operators";
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/publishReplay';

//import { GitSearch } from './git-search';
import { GitCodeSearch } from '../Interfaces/git-code-search';

@Injectable({
  providedIn: 'root'
})
export class GitCodeSearchService {

  cachedValue: string;    
  search: Observable<GitCodeSearch>;
  publishReplayVar: any;
  refCountVar: any;
  // search: Observable<GitSearch>; // wrong
  
  constructor(private http: HttpClient) { }

  codeSearch : Function = (query: string) : Observable<GitCodeSearch> => {
    if (query.indexOf('user') <= -1) {
      query = query + '+user:angular';
    }
    if (!this.search) {
        this.search = this.http.get<GitCodeSearch>('https://api.github.com/search/code?q=' + query)
        //.pipe(publishReplay(1), refCount());

        // this.publishReplayVar = this.search.publishReplay(1);
        // this.refCountVar = this.publishReplayVar.refCount();
        
        // correct code not working
        // .publishReplay(1)
        // .refCount();
        this.cachedValue = query;
    }
    else if (this.cachedValue !== query) {
        this.search = null;
        this.codeSearch(query);
    }
    return this.search;
  }
}
