import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChoosePlainService {
  private headerPlain:string;

  public setHeaderPlain(data:string){
    this.headerPlain = data;
  }
  public getHeaderPlain(){
    return this.headerPlain;
  }
  constructor() { }
}
