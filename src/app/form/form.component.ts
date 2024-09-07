import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

  @Input() title!: string;

  formBuilder = inject(FormBuilder);

  formData: { name: string, price: number } | null = {
    name: 'Test',
    price: 8.45,
  };

  form: FormGroup = this.formBuilder.group({
    name: [this.formData?.name, [Validators.required]],
    price: [this.formData?.price || 0, [Validators.required]],
  });

  save(): void {
    if (this.form.valid) {
      this.formData = this.form.value;
    } else {
      this.formData = null;
    }
  }

}
