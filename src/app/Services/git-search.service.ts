import { Injectable, Inject } from '@angular/core';
import { GitSearch } from '../Interfaces/git-search';
import { GitUsers } from '../Interfaces/git-users';
import { HttpClient } from '@angular/common/http';
//import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/publishReplay';

@Injectable({
  providedIn: 'root'
})
export class GitSearchService {
  cachedSearches: Array<{
      [query: string]: GitSearch
  }> = [];
  cachedUsers: Array<{
      [query: string]: GitUsers
  }> = [];
  cachedValue: string;
  search: Observable<GitSearch>;

  constructor(@Inject(HttpClient) private http: HttpClient) { }

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

  // // for Promises
  // gitSearch = (query: string) : Promise<GitSearch> => {
  //     let promise = new Promise<GitSearch>((resolve, reject) => {
  //         if (this.cachedSearches[query]) {
  //             resolve(this.cachedSearches[query])
  //         }
  //         else {
  //             this.http.get('https://api.github.com/search/repositories?q=' + query)
  //             .toPromise()
  //             .then( (response) => {
  //                 resolve(response as GitSearch)
  //             }, (error) => {
  //                 reject(error);
  //             })
  //         }
  //     })
  //     return promise;
  // }
  // gitUsers = (query: string) : Promise<GitUsers> => {
  //     let promise = new Promise<GitUsers>((resolve, reject) => {
  //         if (this.cachedUsers[query]) {
  //             resolve(this.cachedUsers[query])
  //         }
  //         else {
  //             this.http.get('https://api.github.com/search/users?q=' + query)
  //             .toPromise()
  //             .then( (response) => {
  //                 resolve(response as GitUsers)
  //             }, (error) => {
  //                 reject(error);
  //             })
  //         }
  //     })
  //     return promise;
  // }
}
