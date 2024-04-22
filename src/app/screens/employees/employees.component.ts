import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiEmployeesService } from '../../services/api-employees.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

interface ItemData {
  id: string;
  name: string;
  hire_date: Date;
  position: string;
  salary: number;
  department_name: string;
}

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
  providers: [ApiEmployeesService]
})

export class EmployeesComponent implements OnInit ,OnDestroy {
  private subscriptions: Subscription = new Subscription();
  editId: string = '';
  listOfData: ItemData[] = [];
  listOfDepartments: any;
  employeeForm!: FormGroup;
  currentEmployee?: any;
  EditModal = false;
  CreateModal = false;

  constructor(
    private apiEmployees: ApiEmployeesService,
    private formBuilder: FormBuilder,
  ){}
  


    onSubmitCreate(){
      if (this.employeeForm.valid) {
        this.createEmployee(this.employeeForm.value);
        this.closeModal();
      } else {
        console.error('Form has validation errors!');
      }
    }

    onSubmitUpdate() {
      if (this.employeeForm.valid) {
        this.updateEmployee(this.employeeForm.value, this.editId);
        this.closeModal();
      } else {
        console.error('Form has validation errors!');
      }
    }

    showSuccessMessage() {
      alert('Successfully updated!');
    }
    showErrorMessage() {
      alert('Error updating employee. Please try again later.');
    }

  closeModal(){
    this.EditModal = false;
    this.CreateModal = false;
  }

  openCreateModal(){
    this.employeeForm.reset();
    this.getListDepartments();
    this.CreateModal = true;
  }

  openEditModal(id: string) {
    this.getListDepartments();
    this.EditModal = true;
    this.editId = id;
    this.currentEmployee = this.listOfData.filter((d) => d.id === id);

    this.employeeForm.patchValue({
      name:  this.currentEmployee[0].name,
      hire_date:  this.currentEmployee[0].hire_date,
      position:  this.currentEmployee[0].position,
      salary:  this.currentEmployee[0].salary,
      department_id:  this.currentEmployee[0].department_id
    });
  }
    
  createEmployee(data: any){
    return this.subscriptions.add(
      this.apiEmployees.createEmployee(data).subscribe(
      ()=>{
        this.showSuccessMessage();
      },
      error => {
        console.error('Error creating employee:', error);
        this.showErrorMessage();
      }));
  };

  updateEmployee(data: ItemData, id: string) {
    return this.subscriptions.add(
      this.apiEmployees.updateEmployee(data, id).subscribe(
      () => {
        this.showSuccessMessage();
      },
      error => {
        console.error('Error updating employee:', error);
        this.showErrorMessage();
      }
    ));
  };

  getListDepartments(){
    return this.subscriptions.add(
      this.apiEmployees.getAllDepartments().subscribe(
      data =>{
      this.listOfDepartments = data
    },
      error => {
        console.error('Error updating employee:', error);
    }));
  };

  getAllEmployees(){
    return this.subscriptions.add(
      this.apiEmployees.getAllEmployees().subscribe(
      response =>{
        this.listOfData = response;
      },
      error => {
        console.error('Error updating employee:', error);
    }));
  };

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  
  ngOnInit(): void {
    this.getAllEmployees()

    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      hire_date: ['', Validators.required],
      position: ['', Validators.required],
      salary: ['', Validators.required],
      department_id: ['', Validators.required]
    });
  }
}
