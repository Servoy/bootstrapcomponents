import { Component, OnInit, Renderer2, ViewChild, ElementRef, HostListener, SimpleChanges, ChangeDetectorRef, ChangeDetectionStrategy, Inject, DOCUMENT, input } from '@angular/core';
import { ServoyBootstrapBasefield } from '../bts_basefield';
import { ShowDisplayValuePipe } from '../lib/showDisplayValue.pipe';

import { IValuelist } from '@servoy/public';

@Component({
    selector: 'bootstrapcomponents-list',
    templateUrl: './list.html',
    styleUrls: ['./list.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ShowDisplayValuePipe],
    standalone: false
})
export class ServoyBootstrapList extends ServoyBootstrapBasefield<HTMLInputElement> {

  readonly valuelistID = input<IValuelist>(undefined);

  constructor(renderer: Renderer2, cdRef: ChangeDetectorRef,
     private showDisplayValuePipe: ShowDisplayValuePipe, @Inject(DOCUMENT) doc: Document) {
    super(renderer, cdRef, doc);
  }

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

  updateInput(listValue) {
    const valuelistID = this.valuelistID();
    if (valuelistID) {
      listValue = this.showDisplayValuePipe.transform(listValue, valuelistID);
    }
    if(listValue){
        listValue.subscribe( val => {
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
              let displayValue = valuelistID[i].displayValue;
              if (!displayValue || displayValue === '') {
                  displayValue = ' ';
              }
              if (listValue === displayValue) {
                  listValue = valuelistID[i].realValue;
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
