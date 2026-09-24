import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnalysisService } from '../../services/analysis';
import { SettingsService } from '../../services/settings';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
})
export class HomeComponent {
  // Variables d'état (équivalentes aux variables d'instance PyQt5)
  selectedFile: File | null = null;
  assays: string[] = [];

  // Tableaux de configuration (liaison avec les inputs HTML)
  lloqs: Record<string, number> = {};
  thresholds: Record<string, number> = {};

  // Variables pour stocker la réponse de l'API (Résultats de la BD)
  analysisResult: any = null;
  history: any[] = [];

  loading = false;
  errorMessage = '';

  constructor(
    private analysisService: AnalysisService,
    private settingsService: SettingsService,
  ) {
    this.loadHistory();
  }

  // 1. Sélection du fichier et extraction des Assays (comme select_file en Python)
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.errorMessage = '';

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const rawData: any[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        // Extraire la liste unique des Assays
        const allAssays = rawData.map(row => row.Assay).filter(Boolean);
        this.assays = Array.from(new Set(allAssays));

        // Initialiser les seuils avec les valeurs par défaut configurées dans Paramètres
        this.assays.forEach(assay => {
          this.thresholds[assay] = this.settingsService.settings.defaultThreshold;
          this.lloqs[assay] = this.settingsService.settings.defaultLloq;
        });
      };
      reader.readAsArrayBuffer(file);
    }
  }

  // 2. Soumission au Back-end (Exécuter l'analyse + Sauvegarde BD)
  runAnalysis() {
    if (!this.selectedFile) return;

    this.loading = true;
    this.analysisService.uploadAndAnalyze(this.selectedFile, this.lloqs, this.thresholds).subscribe({
      next: (res) => {
        this.analysisResult = res;
        this.loading = false;
        this.loadHistory(); // Rafraîchir l'historique global
      },
      error: (err) => {
        this.errorMessage = "Une erreur est survenue lors de l'analyse.";
        this.loading = false;
        console.error(err);
      }
    });
  }

  // 3. Charger l'historique depuis la BD
  loadHistory() {
    this.analysisService.getHistory().subscribe({
      next: (data) => this.history = data,
      error: (err) => console.error('Impossible de charger l\'historique', err)
    });
  }

  downloadResult(analysisId: string, fileName: string) {
    this.analysisService.downloadExcel(analysisId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Analyse_Compilee_${fileName}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (err) => console.error('Erreur lors du téléchargement', err)
    });
  }

  // 4. "Nouveau Run" : revient à un formulaire d'import vierge
  resetForm() {
    this.selectedFile = null;
    this.assays = [];
    this.lloqs = {};
    this.thresholds = {};
    this.analysisResult = null;
    this.errorMessage = '';
  }
}
