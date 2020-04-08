import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totales'
})
export class TotalesPipe implements PipeTransform {
  res: any = 0;
  transform(req: any): any {
    if (req.obj) {
      const obj = req.obj;
      obj.forEach((element) => {
        this.res = this.res + (element[req.n1] * element[req.n2] );
      });
    }
    return this.res;
  }

}
