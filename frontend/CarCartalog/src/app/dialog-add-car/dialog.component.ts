import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ApiService } from '../services/api.service';
import { Car } from '../models/Car';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  carForm !: FormGroup;
  actionButton: string = "Save";

  isImageSaved: boolean = false;
  cardImageBase64: string = '';

  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) { }

  ngOnInit(): void {
    this.carForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Brand: ['', Validators.required],
      Model: ['', Validators.required],
      Year: ['', Validators.required],
      Price: ['', Validators.required],
      Picture: ['']
    });
    if (this.editData) {
      this.actionButton = "Update";
      this.carForm.controls['Name'].setValue(this.editData.name);
      this.carForm.controls['Brand'].setValue(this.editData.brand);
      this.carForm.controls['Model'].setValue(this.editData.model);
      this.carForm.controls['Year'].setValue(this.editData.year);
      this.carForm.controls['Price'].setValue(this.editData.price);
      this.carForm.addControl('Id', new FormControl(''));
      this.carForm.controls['Id'].setValue(this.editData.id);
      this.cardImageBase64 = this.editData.picture;
    }
  }

  addCar(car: Car) {
    if (!this.editData) {
      if (this.carForm.valid) {
        if (this.isImageSaved) {
          car.picture = this.cardImageBase64;
        }
        this.api.postCar(car).subscribe({
          next: (res) => {
            alert("Carro adicionado")
          },
          error: () => {
            alert("Erro ao adicionar o carro")
          }
        }
        )
        this.carForm.reset();
        this.dialogRef.close('save');
      }
    }
    else {
      this.updateCar();
    }
  }

  updateCar() {
    this.api.putCar(this.carForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert("Carro editado com sucesso")
          this.carForm.reset();
          this.dialogRef.close('updated');
        },
        error: () => {
          alert("Nao foi possivel alterar o carro :(")
        }
      });
  }

  carSubmit() {
    this.addCar(this.carForm.value);
  }


  createBase64String(fileInput: any) {
    if (fileInput.target.files[0]) {
      const reader = new FileReader;
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const cardImageBase64Path = e.target.result;
          this.cardImageBase64 = cardImageBase64Path;
          this.isImageSaved = true;
        }
      }
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
}
