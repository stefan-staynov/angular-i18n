import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormComponent } from "../form/form.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  today = new Date();
  message = $localize`:@@customMessage:This is a message coming from the component itself!`;
  itemCount = 0;

  changeLanguage(locale: string): void {
    localStorage.setItem('locale', locale);
    window.location.reload();
  }

  clearItemCount(): void {
    this.itemCount = 0;
  }

  incrementItemCount(): void {
    this.itemCount++;
  }

}
