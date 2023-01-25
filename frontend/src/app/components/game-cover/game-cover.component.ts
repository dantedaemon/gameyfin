import {Component, Input, OnInit} from '@angular/core';
import {DetectedGameDto} from "../../models/dtos/DetectedGameDto";
import {LibraryOverviewComponent} from '../library-overview/library-overview.component';

@Component({
  selector: 'game-cover',
  templateUrl: './game-cover.component.html',
  styleUrls: ['./game-cover.component.scss']
})
export class GameCoverComponent implements OnInit {

  @Input() game!: DetectedGameDto;
  @Input() overview!: LibraryOverviewComponent;

  constructor() {
    console.log('overview');
  }

  ngOnInit(): void {
    console.log(this.overview);
  }

}
