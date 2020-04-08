import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idKey'
})
export class IdKeyPipe implements PipeTransform {

  transform(req: any): any {
    if (req.obj.find((i: { id: any; }) => i.id === (req.id))) {
      return req.obj.find((i: { id: any; }) => i.id === (req.id))[req.key];
    } else {
      return 0;
    }
  }

}
