import { FilterChallenge } from './../../../../models/filter-challenge.model';
import { Component, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {StarterService} from "../../../../services/starter.service";
import {DataChallenge} from "../../../../models/data-challenge.model";
import {Challenge} from "../../../../models/challenge.model";
import { environment } from '../../../../../environments/environment';
import { FiltersModalComponent } from 'src/app/modules/modals/filters-modal/filters-modal.component';


@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss']
})
export class StarterComponent {
  @ViewChild('modal') private modalContent!: FiltersModalComponent;

  dataChallenge!: DataChallenge;
  challenges: Challenge[] = [];
  params$!: Subscription;
  challengesSubs$!: Subscription;
  filters!: FilterChallenge;
  sortBy: string = "popularity";
  challenge = Challenge;

  page: number = 1;
  totalPages!: number;
  numChallenges!: number;
  listChallenges: any;
  pageSize = environment.pageSize;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private starterService: StarterService
              ) {

    this.params$ = this.activatedRoute.params.subscribe(params => {

    });

  }

  ngOnInit(): void {
    this.getChallengesByPage(this.page);
  }

  ngOnDestroy() {
    if (this.params$ != undefined) this.params$.unsubscribe();
    if (this.challengesSubs$ != undefined) this.challengesSubs$.unsubscribe();
  }

  getChallengesByPage(page: number) {
    this.challengesSubs$ = this.starterService.getAllChallenges(page, this.pageSize).subscribe(resp => {


      // this.dataChallenge = new DataChallenge(resp);
      // this.challenges = this.dataChallenge.challenges;
      // this.numChallenges = this.challenges.length;
      // this.totalPages = Math.ceil(this.numChallenges / this.pageSize);

      // const startIndex = (page -1) * this.pageSize;
      // const endIndex = startIndex + this.pageSize;
      // this.listChallenges = this.challenges.slice(startIndex, endIndex);
      
      this.listChallenges = resp;
    });
  }

  goToPage(page: number){
    this.page = page;
    this.getChallengesByPage(page);
  }

  openModal() {
  this.modalContent.open();
  }

  getChallengeFilters(filters: FilterChallenge){
    this.filters = filters;
    //TODO: llamar al endpoint
  }
  changeSort(newSort: string){
    if(newSort != this.sortBy){
      this.sortBy = newSort;
      //TODO: llamar al endpoint
    }
  }
  
}
