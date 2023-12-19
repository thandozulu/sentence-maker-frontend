import { Component } from '@angular/core';
import { Type } from '../models/type.model';
import { Word } from '../models/word.model';
import { SentenceService } from '../sentence.service';

@Component({
  selector: 'app-sentence',
  templateUrl: './sentence.component.html',
  styleUrl: './sentence.component.scss',
})
export class SentenceComponent {
  wordTypes: Type[] = [];
  selectedType: number | null = null;
  selectedWord: string | null = null;
  sentence: string = "";
  words: Word[] = [];

  constructor(private sentenceService: SentenceService) {
  }
  ngOnInit(): void {
    this.selectedType = null;
    this.selectedWord = null;
    this.getWordTypes();
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
        this.words = words.map((word) => new Word(word.id, word.name, word.type));
      });
    }
  }

  addToSentence() {
    console.log("Selected Word: " + this.selectedWord);
    if (this.selectedWord) {
      this.sentence += (" " + this.selectedWord);
      this.selectedWord = null;
    }
  }

  submitSentence() {
    
  }
}
