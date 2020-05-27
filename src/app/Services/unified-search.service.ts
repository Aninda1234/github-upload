import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { Observable } from 'rxjs/Rx'; // Old
import { Observable, forkJoin } from 'rxjs'
// import { map, filter, catchError, mergeMap } from 'rxjs/operators';
// import 'rxjs/add/operator/forkJoin';
// import 'rxjs/add/operator/map';

import { GitSearchService } from './git-search.service';
import { GitCodeSearchService } from './git-code-search.service';
import { UnifiedSearch } from '../Interfaces/unified-search';
import { GitSearch } from '../Interfaces/git-search';
import { GitCodeSearch } from '../Interfaces/git-code-search';

@Injectable({
  providedIn: 'root'
})
export class UnifiedSearchService {

  joinSearchValue: any;
  joinSearchValueMap: any;

  constructor(private searchService : GitSearchService, private codeSearchService : GitCodeSearchService) { }

  unifiedSearch : Function = (query: string) : Observable<UnifiedSearch> => {
    this.joinSearchValue = forkJoin(this.searchService.gitSearch(query), this.codeSearchService.codeSearch(query));
    this.joinSearchValueMap = this.joinSearchValue.map( (response : [GitSearch, GitCodeSearch]) => {
      return {
        'repositories' : response[0],
        'code': response[1]
      }
    })

    return this.joinSearchValueMap;
  }

  // // Correct code not working
  // unifiedSearch : Function = (query: string) : Observable<UnifiedSearch> => {
  //   return Observable.forkJoin(this.searchService.gitSearch(query), this.codeSearchService.codeSearch(query))
  //     .map( (response : [GitSearch, GitCodeSearch]) => {
  //       return {
  //         'repositories' : response[0],
  //         'code': response[1]
  //       }
  //     })
  //   } 
  // }
}
