import { Component, Input, OnInit } from '@angular/core';
import { Car } from '../models/Car';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss']
})
export class CarCardComponent implements OnInit {

  @Input()
  car!: any;

  constructor() { }

  ngOnInit() {
  }

  carPictureExists() {
    if (this.car.picture == "") { return false }
    else return true
  }



}
