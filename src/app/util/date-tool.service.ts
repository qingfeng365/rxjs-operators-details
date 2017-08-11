import { Injectable } from '@angular/core';
import * as moment from 'moment';
@Injectable()
export class DateToolService {

  constructor() { }

  getNowBymmsszz(): string {
   return moment().format('mm:ss.SS');
  }
}
