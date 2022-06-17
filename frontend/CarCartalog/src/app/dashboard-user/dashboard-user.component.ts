import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss']
})
export class DashboardUserComponent implements OnInit {
  cars = [];
  filterString: string = '';
  constructor(private api: ApiService) { }


  ngOnInit(): void {
    this.getAllCars();
  }


  applyFilter() {

  }
  getAllCars() {
    this.api.getAllCar()
      .subscribe({
        next: (res) => {
          this.cars = res.sort((a: any, b: any) => b.price - a.price);
        },
        error: () => {
          alert("Erro ao recuperar os dados :( ")
        }
      })

  }

}
