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

  changeLanguage(locale: string): void {
    localStorage.setItem('locale', locale);
    window.location.reload();
  }

}
