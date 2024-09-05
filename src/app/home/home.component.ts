import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
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
