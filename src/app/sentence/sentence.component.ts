import { Component } from '@angular/core';
import { Type } from '../models/type.model';
import { Word } from '../models/word.model';
import { SentenceService } from '../sentence.service';
import { Sentence } from '../models/sentence.model';

@Component({
  selector: 'app-sentence',
  templateUrl: './sentence.component.html',
  styleUrl: './sentence.component.scss',
})
export class SentenceComponent {
  wordTypes: Type[] = [];
  selectedType: number | null = null;
  selectedWord: string | null = null;
  sentence: string = '';
  words: Word[] = [];
  sentences: Sentence[] = [];

  constructor(private sentenceService: SentenceService) {}

  ngOnInit(): void {
    this.selectedType = 0;
    this.selectedWord = null;
    this.getWordTypes();
    this.getSentences();
  }
  getSentences() {
    this.sentences = [];
    this.sentenceService.getSentences().subscribe((sentence: Sentence[]) => {
      this.sentences = sentence;
      console.log(this.sentences);
    });
  }

  getWordTypes() {
    this.sentenceService.getWordTypes().subscribe((types) => {
      this.wordTypes = types;
    });
    console.log(this.wordTypes);
  }

  getWordsByType(type: number | null) {
    console.log('Get words by type : ' + type);
    if (type) {
      this.sentenceService.getWordsByType(type).subscribe((words) => {
        this.words = words.map(
          (word) => new Word(word.id, word.name, word.type)
        );
      });
    }
  }

  addToSentence() {
    console.log('Selected Word: ' + this.selectedWord);
    if (this.selectedWord) {
      this.sentence += ' ' + this.selectedWord;
      this.selectedWord = null;
      this.selectedType = null;
    }
  }

  submitSentence() {
    if (this.sentence) {
      this.sentenceService
        .createSentence(new Sentence(this.sentence))
        .subscribe(
          (response) => {
            console.log('Response from backend:', response);
            this.sentence = '';
            this.selectedWord = null;
            this.selectedType = null;
            this.getSentences();
          },
          (error) => {
            console.error('Error posting sentence:', error);
          }
        );
    }
  }

  deleteAllSentences() {
    console.log('delete in component');
    this.sentenceService.deleteAllSentences().subscribe(
      (response) => {
        console.log('Response from backend:', response);
        this.getSentences();
      },
      (error) => {
        console.error('Error posting sentence:', error);
      }
    );
  }
}
