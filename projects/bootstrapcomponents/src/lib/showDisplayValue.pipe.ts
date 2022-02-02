import { Pipe, PipeTransform } from '@angular/core';
import { IValuelist } from '@servoy/public';
import { map, Observable, of } from 'rxjs';

@Pipe({name: 'showDisplayValue'})
export class ShowDisplayValuePipe implements PipeTransform {

    transform(input: any, ...args: any[]): Observable<any> {
        let realValue = input;
        const valuelist: IValuelist = args[0];
        const noEscape = args[1];
        const noParsedDisplayValue = args[2];

        if (valuelist) {
            if (input && input.hasOwnProperty('realValue')) {
                realValue = input.realValue;
            }
            for (let i = 0; i < valuelist.length; i++) {
                if ((realValue + '') === (valuelist[i].realValue + '')) {
                    return of(noParsedDisplayValue ? valuelist[i].displayValue : this.getParsedDisplayValue(valuelist[i].displayValue, noEscape));
                }
            }
            let hasRealValues = false;
            for (let i = 0; i < valuelist.length; i++) {
                const item = valuelist[i];
                if (item.realValue != item.displayValue) {
                    hasRealValues = true;
                    break;
                }
            }
            if (hasRealValues) {
                if ( noParsedDisplayValue)
                    return valuelist.getDisplayValue(realValue);
                else 
                    return valuelist.getDisplayValue(realValue).pipe(map(displayValue =>  this.getParsedDisplayValue(displayValue, noEscape)));
            }
            if (valuelist.length === 0) return null;

            return of (input);
        }
        return null;
    }

    getParsedDisplayValue(value: string, noEscape: any) {
        if (!value || value === '') {
            return noEscape ? ' ' : '&nbsp';
        } else {
            return value;
        }
    }
}
