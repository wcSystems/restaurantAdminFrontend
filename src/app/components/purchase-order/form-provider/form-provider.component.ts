import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ProviderService } from '../../../services/provider.service';
import { FormGroup, FormBuilder, FormControl, Validators  } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'smart-form-provider',
  templateUrl: './form-provider.component.html',
  styleUrls: ['./form-provider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormProviderComponent implements OnInit {

  form: FormGroup;
  providers: any;

  constructor(
    private providerService: ProviderService,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
   }

  ngOnInit() {
    this.rifField.valueChanges
      .pipe(
        debounceTime(350)
      )
      .subscribe(value => {
        if ( value !== '' ) {
          this.providerService.providersFilter(value).subscribe((res: any) => {
            if (res.provider) {
              this.providers = res.provider;
              if (this.providers[0]) {
                this.form.patchValue({
                  name: this.providers[0].name,
                  email: this.providers[0].email,
                  phone: this.providers[0].phone,
                  address: this.providers[0].address,
                });
              } else {
                  this.form.valueChanges
                    .subscribe( values => {
                      console.log(values);
                    });
                  // console.log(this.form.value);
                  console.log(this.form.valid);
              }
            }
            this.cdr.detectChanges();
          });
        }
      });

  }

  private buildForm() {
    this.form = this.formBuilder.group({
      rif: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.maxLength(80)]]
    });
  }

  get rifField() {
    return this.form.get('rif');
  }
  get nameField() {
    return this.form.get('name');
  }
  get emailField() {
    return this.form.get('email');
  }
  get phoneField() {
    return this.form.get('phone');
  }
  get addressField() {
    return this.form.get('address');
  }


}
