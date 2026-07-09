import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
  // URL de ton API NestJS lancée localement
  private apiUrl = 'http://localhost:3000/analysis';

  constructor(private http: HttpClient) {}

  // Envoyer le fichier et les paramètres de configuration au Back-end
  uploadAndAnalyze(file: File, lloqs: any, thresholds: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    
    // On passe les objets sous forme de string JSON dans le FormData
    const params = { lloqs, thresholds };
    formData.append('params', JSON.stringify(params));

    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  // Récupérer l'historique de toutes les analyses stockées en BD
  getHistory(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }


  downloadExcel(analysisId: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${analysisId}/export`, { responseType: 'blob' });
  }
}