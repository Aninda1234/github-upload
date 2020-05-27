import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { GitSearchService } from '../Services/git-search.service';
import { GitSearch } from '../Interfaces/git-search';
import { AdvancedSearchModel } from '../Models/advanced-search-model';
import { UnifiedSearchService } from '../Services/unified-search.service';

@Component({
  selector: 'app-git-search',
  templateUrl: './git-search.component.html',
  styleUrls: ['./git-search.component.css']
})
export class GitSearchComponent implements OnInit { 
  searchResults: GitSearch;
  searchQuery: string;
  displayQuery: string;
  title: string;
  favorites: Array<number> = [];

  // form variables (both template & reactive)            
  model = new AdvancedSearchModel('', '', '', null, null, '');
  modelKeys = Object.keys(this.model);

  // Reactive form variables
  form: FormGroup;
  formControls = {};

  // Reactive form validators
  noSpecialChars(c: FormControl) {
    let REGEXP = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);
  
      return REGEXP.test(c.value) ? {
        validateEmail: {
        valid: false
      }
    } : null;
  }
  
  checkType = (key) => {
    return typeof key === 'string' ? 'text' : typeof key;
  }
  
  handleFavorite = (id) => {
    return this.favorites.push(id);
  }
  
  // Reactive form constructor
  constructor(
    private UnifiedSearchService: UnifiedSearchService, // Unified Service
    private GitSearchService: GitSearchService, // Single Service 
    private route: ActivatedRoute, 
    private router: Router ) 
    {
      // with validators
      this.modelKeys.forEach( (key) => {
        let validators = [];
        if (key === 'q') {
            validators.push(Validators.required);
        }
        if (key === 'stars') {
            validators.push(Validators.maxLength(4))
        }
        validators.push(this.noSpecialChars);
        this.formControls[key] = new FormControl(this.model[key], validators);
      })    
      // // without validators
      // this.modelKeys.forEach( (key) => {
      //     this.formControls[key] = new FormControl();
      // })
    this.form = new FormGroup(this.formControls);
  }

  // // Template form constructor
  // constructor(private GitSearchService: GitSearchService, 
  //             private route: ActivatedRoute, 
  //             private router: Router ) { }

  ngOnInit() {
    this.route.paramMap.subscribe( (params: ParamMap) => {
      this.searchQuery = params.get('query');
      this.displayQuery = params.get('query');
      this.gitSearch();  
    })
    this.route.data.subscribe( (result) => {
      this.title = result.title
    });
  }

  gitSearch = () => {
      // // using Observables with Unified Service
      // this.UnifiedSearchService.unifiedSearch(this.searchQuery).subscribe( (response) => {
      //   console.log(response); // To Check Unified Search Service
      //     this.searchResults = response;
      //     // this.searchResults = response.repositories; // Old
      //   }, (error) => {
      //     alert("Error: " + error.statusText)
      //   })
      // }

      // using Observables with Single Service
      this.GitSearchService.gitSearch(this.searchQuery).subscribe( (response) => {        
        this.searchResults = response;
        }, (error) => {
          alert("Error: " + error.statusText)
        })
      }

      // // using Promises
      // this.GitSearchService.gitSearch(this.searchQuery).then( (response) => {
      // this.searchResults = response;
      //   }, (error) => {
      //     alert("Error: " + error.statusText)
      //   })
      // }

  // Reactive form query
  sendQuery = () => {
    this.searchResults = null;
    let search : string = this.form.value['q'];
    let params : string = "";
    this.modelKeys.forEach(  (elem) => {
        if (elem === 'q') {
            return false;
        }
        if (this.form.value[elem]) {
            params += '+' + elem + ':' + this.form.value[elem];
        }
    })
    this.searchQuery = search;
    if (params !== '') {
        this.searchQuery = search + params;
    }
    this.displayQuery = this.searchQuery;
    this.gitSearch();
  }

  // // Template form Query
  // sendQuery = () => {
  //   this.searchResults = null;
  //   let search : string = this.model.q;
  //   let params : string = "";
  //   this.modelKeys.forEach(  (elem) => {
  //       if (elem === 'q') {
  //           return false;
  //       }
  //       if (this.model[elem]) {
  //           params += '+' + elem + ':' + this.model[elem];
  //       }
  //   })
  //   this.searchQuery = search;
  //   if (params !== '') {
  //       this.searchQuery = search + '+' + params;
  //   }
  //   this.displayQuery = this.searchQuery;
  //   this.gitSearch();
  // }
  
  // // Old form Query
  // sendQuery = () => {
  //   this.searchResults = null;
  //   this.router.navigate(['/search/' + this.searchQuery])
  // }

}
