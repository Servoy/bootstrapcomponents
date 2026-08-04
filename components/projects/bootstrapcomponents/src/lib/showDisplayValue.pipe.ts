import { Pipe, PipeTransform } from '@angular/core';
import { IValuelist } from '@servoy/public';
import { map, Observable, of } from 'rxjs';

@Pipe({
    name: 'showDisplayValue',
    standalone: false
})
export class ShowDisplayValuePipe implements PipeTransform {

    transform(input: any, ...args: any[]): Observable<any> {
        let realValue = input;
        const valuelist: IValuelist = args[0];
        const noEscape = args[1];
        const noParsedDisplayValue = args[2];

        if (valuelist) {
            if (input && Object.prototype.hasOwnProperty.call(input, 'realValue')) {
                realValue = input.realValue;
            }
            for (const item of valuelist) {
                if ((realValue + '') === (item.realValue + '')) {
                    return of(noParsedDisplayValue ? item.displayValue : this.getParsedDisplayValue(item.displayValue, noEscape));
                }
            }
            let hasRealValues = false;
            for (const item of valuelist) {
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
            if (valuelist.length === 0) return null as any;

            return of (input);
        }
        return null as any;
    }

    getParsedDisplayValue(value: string, noEscape: any) {
        if (!value || value === '') {
            return noEscape ? ' ' : '&nbsp';
        } else {
            return value;
        }
    }
}
