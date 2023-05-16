import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  darkMode: boolean = false;
  color: ThemePalette = 'primary';

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    // Subscribe to the dark mode value from the theme service
    this.themeService.isDarkMode.subscribe((darkMode: boolean) => {
      this.darkMode = darkMode;
      this.color = darkMode ? 'accent' : 'primary';
    });
  }

  toggleDarkMode(): void {
    // Toggle the dark mode value in the theme service
    this.themeService.toggleDarkMode();
  }
}
