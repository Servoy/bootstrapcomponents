import { Component, Input, Renderer2, SimpleChanges, ChangeDetectorRef, ChangeDetectionStrategy, Inject, DOCUMENT } from '@angular/core';
import { ServoyBootstrapBasefield } from '../bts_basefield';
import { ShowDisplayValuePipe } from '../lib/showDisplayValue.pipe';

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
        if (this.valuelistID && this.dataProviderID) {
            if (this.multiselect) {
                const vlValues = this.valuelistID.map(item => typeof item.realValue === 'string' ? item.realValue : String(item.realValue));
                isDPinValuelist = this.dataProviderID.split('\n').every(dpValue => vlValues.includes(dpValue));
            } else {
                for (let i = 0; i < this.valuelistID.length; i++) {
                    if (this.dataProviderID == this.valuelistID[i].realValue ) {
                        isDPinValuelist = true;
                        break;
                    }
                }
            }
        }
        return isDPinValuelist;
    }
    
    disabledDP(): string[] {
        const vlValues = this.valuelistID.map(item => typeof item.realValue === 'string' ? item.realValue : String(item.realValue));
        const dpValues = this.dataProviderID ? this.dataProviderID.split('\n') : [];
        return dpValues.filter(dpValue => !vlValues.includes(dpValue));
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
                if (this.selectedValues.length > 1) { return; }
                for (let i = 0; i < this.valuelistID.length; i++) {
                    const realValue = typeof this.valuelistID[i].realValue === 'string' ? this.valuelistID[i].realValue : String(this.valuelistID[i].realValue);
                    const realSelectedValue = String(this.selectedValues[0]);
                    if (realSelectedValue.indexOf(realValue) != -1) {
                        if (value == null) value = this.dataProviderID ? this.dataProviderID.split('\n') : [];
                        if (value.indexOf(realValue) == -1) {
                            value.push(realValue);
                        } else {
                            // remove it if it was already there
                            value.splice(value.indexOf(realValue), 1);
                        }
                    }
                }
            }
            else {
                // already binded by ngmodel, just push it
                value = this.dataProviderID;
            }
            if (this.multiselect && value) {
                value = value.length > 1 ? value.join('\n') : value[0];
            }
            this.updateValue(value);
        }
    }

    updateValue(val: string) {
        this.dataProviderID = val;
        super.pushUpdate();
    }
    
    toString(value: any): string {
        return String(value);
    }

}
