import { Component, Input, Renderer2, SimpleChanges, ChangeDetectorRef, ChangeDetectionStrategy, Inject } from '@angular/core';
import { ServoyBootstrapBasefield } from '../bts_basefield';
import { ShowDisplayValuePipe } from '../lib/showDisplayValue.pipe';
import { DOCUMENT } from '@angular/common';
import { IValuelist } from '@servoy/public';

@Component({
    selector: 'bootstrapcomponents-select',
    templateUrl: './select.html',
    styleUrls: ['./select.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ShowDisplayValuePipe],
    standalone: false
})
export class ServoyBootstrapSelect extends ServoyBootstrapBasefield<HTMLSelectElement> {

    @Input() valuelistID: IValuelist;
    @Input() multiselect: boolean;
    @Input() selectSize: number;
    selectedValues: any[];

    constructor(renderer: Renderer2, cdRef: ChangeDetectorRef, private showDisplayValuePipe: ShowDisplayValuePipe, @Inject(DOCUMENT) doc: Document) {
        super(renderer, cdRef, doc);
    }

    svyOnChanges(changes: SimpleChanges) {
        if (changes && this.elementRef) {
            for (const property of Object.keys(changes)) {
                const change = changes[property];
                switch (property) {
                    case 'dataProviderID':
                        if (this.multiselect && this.dataProviderID) {
                            this.selectedValues = ('' + this.dataProviderID).split('\n');
                        }
                        break;
                    case 'placeholder':
                        if (change.currentValue) this.renderer.setAttribute(this.getNativeElement(), 'placeholder', change.currentValue);
                        else this.renderer.removeAttribute(this.getNativeElement(), 'placeholder');
                        break;
                }
            }
            super.svyOnChanges(changes);
            if (changes.readOnly || changes.enabled) {
                if (this.readOnly || !this.enabled) {
                    this.renderer.setAttribute(this.getFocusElement(), 'disabled', 'disabled');
                } else {
                    this.renderer.removeAttribute(this.getFocusElement(), 'disabled');
                }
            }
        }
    }

    showPlaceholder() {
        if (!this.placeholderText || this.placeholderText.length === 0) {
            return false;
        }
        return this.dataProviderID === null;
    }

    isDPinValuelist() {
        let isDPinValuelist = false;
        if (this.valuelistID) {
            for (let i = 0; i < this.valuelistID.length; i++) {
                if (this.dataProviderID == this.valuelistID[i].realValue) {
                    isDPinValuelist = true;
                    break;
                }
            }
        }
        return isDPinValuelist;
    }

    onChange(event, value) {
        this.renderer.removeAttribute(this.getNativeElement(), 'placeholder');
        if (!this.multiselect) {
            //in this case the event is the value
            this.dataProviderID = (value && value != "null") ? value : null;
        }
        this.updateDataprovider();
        if (this.onActionMethodID) {
            this.onActionMethodID(event);
        }
    }

    updateDataprovider() {
        if (this.valuelistID) {
            let value = null;
            if (this.multiselect) {
                for (let i = 0; i < this.valuelistID.length; i++) {
                    if (this.selectedValues.indexOf(this.valuelistID[i].displayValue) != -1) {
                        if (value == null) value = [];
                        value.push(this.valuelistID[i].realValue);
                    }
                }
            }
            else {
                // already binded by ngmodel, just push it
                value = this.dataProviderID;
            }
            if (this.multiselect && value) {
                value = value.join('\n');
            }
            this.updateValue(value);
        }
    }

    updateValue(val: string) {
        this.dataProviderID = val;
        super.pushUpdate();
    }

}
