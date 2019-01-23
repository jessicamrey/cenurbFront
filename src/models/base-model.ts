import {Injectable} from '@angular/core';

@Injectable()
export class BaseModel {

  initialize(data: any) {
    let key: any;
    for (key in data) {
      // console.log(data[key]);
      if (this.hasOwnProperty(key) && typeof this[key] !== 'function') {
        this[key] = data[key];
      }
    }
  }

  serialize() {
    var toRet = [];
    let key: any;
    for (key in this) {
      if (typeof this[key] !== 'function') {
        toRet[key] = this[key];
      }
    }
    return toRet;
  }

  toString() {
    var toRet = '';
    let key: any;
    for (key in this) {
      if (typeof this[key] !== 'function') {
        toRet += key + " => " + this[key] + "\n";
      }
    }
    return toRet;
  }

  clear() {
    for (let key in this) {
      //set all properties to null
      if (this.hasOwnProperty(key) && typeof this[key] !== 'function') {
        if (key != 'http' && key != 'api' && key != 'helper') {
          //                    console.log("removing ", key, typeof this[key]);
          this[key] = null;
        }
      }
    }
  }
}