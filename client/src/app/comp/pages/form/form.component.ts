import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';

import { EmployeeService } from '@services/employee/employee.service';
import { SymptomService } from '@services/symptom/symptom.service';
import { VehicleService } from '@services/vehicle/vehicle.service';
import { FormService, FormData } from '@services/form/form.service';

import * as CustomValidat from '@tool/validators';
import { Rut } from '@tool/other/rut';
import { Employee } from '@models/employee';
import { Symptom } from '@models/symptom';
import { Vehicle } from '@models/vehicle';
import { ModalGenService } from '@comp/shared/modal-gen';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuService } from '@services/menu/menu.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
  private routerSubs: Subscription;

  formEmployee: FormGroup;
  formQuestion: FormGroup;
  formSymptoms: FormGroup;

  employee: Employee;
  symptoms: Symptom[];
  vehicles: Vehicle[];
  loading = false;

  @ViewChild('stepper')
  stepper: MatStepper;

  constructor(
    private router: Router,
    private menuServ: MenuService,
    private activeRoute: ActivatedRoute,
    private formServ: FormService,
    private formBuilder: FormBuilder,
    private symptomServ: SymptomService,
    private vehicleServ: VehicleService,
    private snackbarServ: MatSnackBar,
    private employeeServ: EmployeeService,
    private modalGenServ: ModalGenService,
  ) { }

  ngOnInit(): void {
    // Crear formularios
    this.formEmployee = this.formBuilder.group({
      rut:      [ '', CustomValidat.Employee.rut(this) ],
      name:     [ '' ],
      position: [ '' ],
    });

    this.formQuestion = this.formBuilder.group({
      question01: [ null, Validators.required ],
      question02: [ null, Validators.required ],
      question03: [ null, Validators.required ],
      question04: [ null, Validators.required ],
      question05: [ null, Validators.required ],
      vehicle:    [ null, Validators.required ]
    });
    this.formSymptoms = new FormGroup({});

    this.routerSubs = this.activeRoute
      .paramMap
      .subscribe(this.load.bind(this));
  }

  ngOnDestroy(): void {
    this.routerSubs.unsubscribe();
  }

  async load(): Promise<void> {
    try {
      await this.menuServ.check();
      await this.makeQuestionForm();
      await this.makeSymptomsForm();

    } catch (err) {
      this.onError(err);
      this.router.navigate([ '' ]);
    }
  }

  async makeQuestionForm(): Promise<void> {
    const resp = await this.vehicleServ.get();
    this.vehicles = resp.data;
  }

  async makeSymptomsForm(): Promise<void> {
    // Listar síntomas
    const resp = await this.symptomServ.get();

    // Armar objeto de formulario
    const obj: { [key: string]: any[] } = {};
    for (const item of resp.data) {
      obj[item.id.toString()] = [ false ];
    }

    // Instanciar formulario
    this.formSymptoms = this.formBuilder.group(obj);
    this.symptoms = resp.data;
  }

  async onRutInput(): Promise<void> {
    const ctrls = this.formEmployee.controls;
    let value = ctrls.rut.value as string;
    value = Rut.format(value);

    try {
      // Buscar data del usuario
      if (value.length > 0) {
        const resp = await this.employeeServ.searchByRut(value);
        this.employee = resp.data;
      } else {
        this.employee = undefined;
      }

    } catch (err) {
      // Levantar formulario de Error
      this.onError(err);

    } finally {
      // Revalidar
      ctrls.rut.setValue(value);

      // Escribir valores en el formulario
      if (!this.employee) {
        ctrls.name.setValue('');
        ctrls.position.setValue('');
      } else {
        ctrls.name.setValue(this.employee.name);
        ctrls.position.setValue(this.employee.position);
      }
    }
  }

  async onSubmit(): Promise<void> {
    try {
      this.loading = true;
      const ctrlsForm01 = this.formEmployee.controls;
      const ctrlsForm02 = this.formQuestion.controls;

      // Responder pregunta 1
      let question01: boolean;
      switch (ctrlsForm02.question01.value) {
        case 1:
          question01 = true;
          break;
        case 2:
          question01 = false;
          break;
        default:
          question01 = null;
      }

      // Preguntas restantes
      const question02 = ctrlsForm02.question02.value as boolean;
      const question03 = ctrlsForm02.question03.value as boolean;
      const question04 = ctrlsForm02.question04.value as boolean;
      const question05 = ctrlsForm02.question05.value as boolean;
      const vehicleId = ctrlsForm02.vehicle.value as number;

      // Agrupar síntomas
      const symptomsIds: number[] = [];
      const symptomsKeys = Object.keys(this.formSymptoms.value);
      const symptomsData: { [key: number]: boolean } = this.formSymptoms.value;
      for (const key of symptomsKeys) {
        if (symptomsData[key]) {
          symptomsIds.push(parseInt(key, 10));
        }
      }

      // Armar respuesta
      const data: FormData = {
        rut: ctrlsForm01.rut.value as string,
        question01,
        question02,
        question03,
        question04,
        question05,
        symptomsIds,
        vehicleId
      };

      // Enviar Respuesta
      await this.formServ.add(data);
      this.snackbarServ.open('El cuestionario se ha guardado existosamente!', 'Ok', {
        duration: 3000
      });
    } catch (err) {
      this.onError(err);
    } finally {
      this.loading = false;
      this.stepper.reset();
    }
  }

  onError(err: any): void {
    const modal = this.modalGenServ.create('md');
    modal.title = 'Error!';
    modal.body = (err.details) ? err.details : err.message;
    modal.open();
  }
}
