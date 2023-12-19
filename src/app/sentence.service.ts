import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Type } from './models/type.model';
import { Word } from './models/word.model';
import { Sentence } from './models/sentence.model';

@Injectable({
  providedIn: 'root',
})
export class SentenceService {
  private wordUrl = 'http://localhost:8080/api/v1/word';

  private sentenceUrl = 'http://localhost:8081/api/v1/sentence';

  constructor(private http: HttpClient) {}

  getWordTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(`${this.wordUrl}/types/all`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching word types:', error);
        return throwError('Something went wrong while fetching word types.');
      })
    );
  }

  getSentences(): Observable<Sentence[]> {
    return this.http.get<Sentence[]>(`${this.sentenceUrl}/`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching sentences:', error);
        return throwError('Something went wrong while fetching sentences.');
      })
    );
  }

  getWordsByType(type: number): Observable<Word[]> {
    return this.http.get<Word[]>(`${this.wordUrl}/${type}`).pipe(
      tap((response: Word[]) => {
        console.log('Response received:', response);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching words:', error);
        return throwError('Something went wrong while fetching words.');
      })
    );
  }

  createSentence(sentence: Sentence): Observable<any> {
    return this.http.post(`${this.sentenceUrl}/create`, sentence);
  }

  deleteAllSentences(): Observable<any> {
    console.log("delete in service");
    return this.http.delete(`${this.sentenceUrl}/delete/all`).pipe(
      tap((response: any) => {
        console.log('Response received:', response);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error deleting sentences:', error);
        return throwError('Something went wrong while deleting sentences.');
      })
    );
  }
}
