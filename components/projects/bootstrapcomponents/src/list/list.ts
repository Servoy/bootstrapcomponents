import { Component, SimpleChanges, ChangeDetectionStrategy, inject, input } from '@angular/core';
import { ServoyBootstrapBasefield } from '../bts_basefield';
import { ShowDisplayValuePipe } from '../lib/showDisplayValue.pipe';
import { AsyncPipe } from '@angular/common';
import { IValuelist, ServoyPublicModule } from '@servoy/public';

@Component({
    selector: 'bootstrapcomponents-list',
    templateUrl: './list.html',
    styleUrls: ['./list.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ShowDisplayValuePipe],
    standalone: true,
    imports: [ServoyPublicModule, AsyncPipe, ShowDisplayValuePipe]
})
export class ServoyBootstrapList extends ServoyBootstrapBasefield<HTMLInputElement> {

  readonly valuelistID = input<IValuelist | undefined>(undefined);

  private readonly showDisplayValuePipe = inject(ShowDisplayValuePipe);

  svyOnChanges( changes: SimpleChanges ) {
    if (changes) {
      for ( const property of Object.keys(changes) ) {
          const change = changes[property];
          switch ( property ) {
              case 'dataProviderID':
                  if ( change.currentValue ) this.updateInput(change.currentValue);
                  break;
            }
        }
        super.svyOnChanges(changes);
    }
  }

  updateInput(listValue: any) {
    const valuelistID = this.valuelistID();
    if (valuelistID) {
      listValue = this.showDisplayValuePipe.transform(listValue, valuelistID);
    }
    if(listValue){
        listValue.subscribe( (val: any) => {
            if ( val ) {
                this.renderer.setProperty(this.elementRef.nativeElement, 'value', val);
            }
        });
    }
  }

  updateDataprovider() {
      let listValue = (this.elementRef.nativeElement as HTMLInputElement).value;
      const valuelistID = this.valuelistID();
      if (valuelistID) {
          for (const i of Object.keys(valuelistID)) {
              let displayValue = (valuelistID as any)[i].displayValue;
              if (!displayValue || displayValue === '') {
                  displayValue = ' ';
              }
              if (listValue === displayValue) {
                  listValue = (valuelistID as any)[i].realValue;
                  break;
              }
          }
      }
      if (this._dataProviderID() !== listValue) {
          this.updateValue(listValue);
      }
  }

  updateValue(val: string) {
    this._dataProviderID.set(val);
    super.pushUpdate();
  }
}
