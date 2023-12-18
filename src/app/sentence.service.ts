import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Type } from './models/type.model';
import { Word } from './models/word.model';

@Injectable({
  providedIn: 'root',
})
export class SentenceService {
  private apiUrl = 'http://localhost:8082/api/v1/word';

  constructor(private http: HttpClient) {}

  getWordTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(`${this.apiUrl}/types/all`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching word types:', error);
        return throwError('Something went wrong while fetching word types.');
      })
    );
  }
  getWordsByType(type:Type): Observable<Word[]> {
    return this.http.get<Word[]>(`${this.apiUrl}/${type.id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching words:', error);
        return throwError('Something went wrong while fetching words.');
      })
    );
  }

}
