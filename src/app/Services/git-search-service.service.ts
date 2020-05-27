import { Injectable, Inject } from '@angular/core';
import { GitSearch } from '../Interfaces/git-search';
//import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GitUsers } from '../Interfaces/git-users';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';

@Injectable({
    providedIn: 'root'
  })
export class GitSearchService {
  cachedValues: Array<{
      [query: string]: GitSearch
  }> = [];
    cachedSearches: Array<{
      [query: string]: GitSearch
  }> = [];
  cachedUsers: Array<{
      [query: string]: GitUsers
  }> = [];
  cachedValue: string;
  search: Observable<GitSearch>;

  constructor(@Inject(HttpClient) private http: HttpClient) {
  }

      // for Observables
      gitSearch : Function = (query: string) : Observable<GitSearch> => {
        if (!this.search) {
            this.search = this.http.get<GitSearch>('https://api.github.com/search/repositories?q=' + query)
            // correct code not working
            // .publishReplay(1)
            // .refCount();
            this.cachedValue = query;
        }
        else if (this.cachedValue !== query) {
            this.search = null;
            this.gitSearch(query);
        }
        return this.search;
    }

//   gitSearch : Function = (query: string) : Promise<GitSearch> => {
//     let promise = new Promise((resolve, reject) => {
//         if (this.cachedValues[query]) {
//             resolve(this.cachedValues[query])
//         }
//         else {
//             this.http.get('https://api.github.com/search/repositories?q=' + query)
//             .toPromise()
//             .then( (response) => {
//                 resolve(response.json())
//             })
//         }
//     })
//     return promise;
//   }
}