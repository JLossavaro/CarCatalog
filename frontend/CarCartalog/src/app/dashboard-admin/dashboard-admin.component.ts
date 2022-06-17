import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Car } from '../models/Car';
import { MatDialog } from '@angular/material/dialog';

import { ApiService } from '../services/api.service';
import { DialogComponent } from '../dialog-add-car/dialog.component';


@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'year', 'brand', 'model', 'price', 'actions'];
  dataSource !: MatTableDataSource<Car>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllCars();
  }


  getAllCars() {
    this.api.getAllCar()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: () => {
          alert("Erro ao recuperar os dados :( ")
        }
      })

  }

  editCar(row: any) {
    this.dialog.open(DialogComponent, {
      width: '40%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val == 'updated') {
        this.getAllCars();
      }
    })
  }

  deleteCar(row: any) {
    this.api.deleteCar(row.id).subscribe({
      next: (res) => {
        alert("carro removido")
        this.getAllCars();
      },
      error: () => {
        alert("erro ao remover o carro")
      }
    })
  }

  addCar() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.getAllCars();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter)
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


