import {Component, OnInit} from '@angular/core';
import {COMMA, ENTER, ESCAPE} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

export interface IntElements {
  nbr: number;
}

@Component({
  selector: 'app-mobile-average',
  templateUrl: './mobile-average.component.html',
  styleUrls: ['./mobile-average.component.scss']
})
export class MobileAverageComponent implements OnInit {
  progressValue = 0;
  selectable = true;
  removable = true;
  addOnBlur = true;
  inputFormGroup: FormGroup;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, ESCAPE];
  elements: IntElements[] = [];
  biggerNbr: boolean = false;
  averageRslt = null;

  constructor(private formBuilder: FormBuilder, public http: HttpClient) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.inputFormGroup = this.formBuilder.group({
      inputList: [[], Validators.required],
      averageNbr: [null, Validators.required]
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if (this.elements !== []) {
      this.progressValue = 50;
    }

    // Add our fruit
    if ((value || '').trim()) {
      const valueNbr = parseFloat(value);
      // @ts-ignore
      this.elements.push(valueNbr);
      this.inputFormGroup.get('inputList').setValue(this.elements);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(element: IntElements): void {
    const index = this.elements.indexOf(element);

    if (index >= 0) {
      this.elements.splice(index, 1);
    }
  }

  reset(): void {
    this.initForm();
    this.elements = [];
    this.progressValue = 0;
    this.averageRslt = null;
    this.biggerNbr = false;
  }

  calculate() {
    if (this.inputFormGroup.get('inputList').value.length < this.inputFormGroup.get('averageNbr').value) {
      this.biggerNbr = true;
      this.averageRslt = null;
      console.log('too long');
    } else if (this.inputFormGroup.valid) {
      this.biggerNbr = false;
      this.calculateAPI(this.inputFormGroup.value).subscribe(res => {
        this.progressValue = 100;
        this.averageRslt = res['result'];
        console.log(res);
      }, error => {
        console.log(error);
      });
    }
  }

  calculateAPI(data) {
    console.log(data);
    return this.http.post(environment.baseURL + 'calculateAverage/', data);
  }

}
