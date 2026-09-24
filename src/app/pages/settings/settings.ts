import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SettingsService } from '../../services/settings';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './settings.html',
})
export class SettingsComponent {
  constructor(public settingsService: SettingsService) {}
}
