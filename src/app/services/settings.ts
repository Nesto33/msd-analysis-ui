import { Injectable } from '@angular/core';

export interface AppSettings {
  darkMode: boolean;
  defaultThreshold: number;
  defaultLloq: number;
}

const STORAGE_KEY = 'msd-settings';
const DEFAULTS: AppSettings = { darkMode: false, defaultThreshold: 25, defaultLloq: 0 };

@Injectable({ providedIn: 'root' })
export class SettingsService {
  settings: AppSettings = this.load();

  constructor() {
    this.applyTheme();
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings));
    } catch {
      // Stockage indisponible (navigation privée, etc.) : les réglages ne persistent pas
      // au-delà de cette session, mais l'appli continue de fonctionner normalement.
    }
    this.applyTheme();
  }

  private load(): AppSettings {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : { ...DEFAULTS };
    } catch {
      return { ...DEFAULTS };
    }
  }

  private applyTheme() {
    document.documentElement.setAttribute('data-theme', this.settings.darkMode ? 'dark' : 'light');
  }
}
