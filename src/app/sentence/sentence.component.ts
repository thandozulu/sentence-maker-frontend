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
  selectedType: Type = new Type(0, 'Select A Type');
  selectedWord: Word | null = null;
  sentence: Word[] = [];
  words: Word[] = [];

  constructor(private sentenceService: SentenceService) {}

  ngOnInit(): void {
    this.getWordTypes();
  }

  getWordTypes() {
    this.sentenceService.getWordTypes().subscribe((types) => {
      this.wordTypes = types;
    });
  }

  getWordsByType(type: Type | null) {
    console.log("Selected type : " + this.selectedType.name);
    console.log("Get words by type : " + type?.name);
    if (type) {
      this.sentenceService.getWordsByType(type).subscribe((words) => {
        this.selectedType = type;
        this.words = words.map((word) => new Word(word.id, word.name));
      });
    }
  }

  addToSentence() {
    if (this.selectedWord) {
      this.sentence.push(this.selectedWord);
      this.selectedWord = null;
    }
  }

  submitSentence() {
    // Send the sentence to the backend or perform any other actions
    const sentenceString = this.sentence.map((word) => word.name).join(' ');
    console.log('Submitted Sentence:', sentenceString);
  }
}
