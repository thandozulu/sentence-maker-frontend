import { Type } from "./type.model";

export class Word {
    id: number;
    name: string;
    type: Type;
  
    constructor(id: number, name: string, type: Type) {
      this.id = id;
      this.name = name;
      this.type = type;
    }
  }
  