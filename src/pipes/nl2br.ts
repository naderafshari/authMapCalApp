import { Injectable, Pipe } from '@angular/core';

@Pipe({
  name: 'nl2br'
})
@Injectable()
export class Nl2br {
  transform(value, args?) {
    return value.replace(/(?:\r\n|\r|\n)/g, '<br />');
  }
}
