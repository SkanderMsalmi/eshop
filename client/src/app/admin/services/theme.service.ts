import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkModeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isDarkMode = this.darkModeSubject.asObservable();

  constructor() {
    // Check the saved preference or browser preference for dark mode
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';

    // Set the initial dark mode value based on saved preference or browser preference
    this.darkModeSubject.next(savedDarkMode || prefersDarkMode);
  }

  toggleDarkMode(): void {
    // Toggle the dark mode value
    const currentDarkMode = this.darkModeSubject.getValue();
    const newDarkMode = !currentDarkMode;
    this.darkModeSubject.next(newDarkMode);

    // Save the dark mode preference to local storage
    localStorage.setItem('darkMode', newDarkMode.toString());
  }
}
