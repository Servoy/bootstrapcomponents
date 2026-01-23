import { Component, Renderer2, SimpleChanges, ChangeDetectorRef, ChangeDetectionStrategy, Inject, DOCUMENT, input } from '@angular/core';
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

	readonly valuelistID = input<IValuelist>(undefined);
	readonly multiselect = input<boolean>(undefined);
	readonly selectSize = input<number>(undefined);
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
						if (this.multiselect()) {
							this.selectedValues = this.dataProviderID();
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
				if (this.readOnly() || !this.enabled()) {
					this.renderer.setAttribute(this.getFocusElement(), 'disabled', 'disabled');
				} else {
					this.renderer.removeAttribute(this.getFocusElement(), 'disabled');
				}
			}
		}
	}

	showPlaceholder() {
		const placeholderText = this.placeholderText();
        if (!placeholderText || placeholderText.length === 0) {
            return false;
        }
		return this.dataProviderID() === null;
	}

    isDPinValuelist() {
        let isDPinValuelist = false;
        const dataProviderID = this.dataProviderID();
        const valuelistID = this.valuelistID();
        if (valuelistID && dataProviderID) {
            if (this.multiselect()) {
                const vlValues = valuelistID.map(item => typeof item.realValue === 'string' ? item.realValue : String(item.realValue));
                isDPinValuelist = dataProviderID.every(dpValue => vlValues.includes(dpValue));
            } else {
                for (let i = 0;i < valuelistID.length;i++) {
                    if (dataProviderID == valuelistID[i].realValue) {
                        isDPinValuelist = true;
                        break;
                    }
                }
            }
        }
        return isDPinValuelist;
    }

    disabledDP(): string[] {
        const vlValues = this.valuelistID().map(item => typeof item.realValue === 'string' ? item.realValue : String(item.realValue));
        const dataProviderID = this.dataProviderID();
        const dpValues = dataProviderID ? dataProviderID.split('\n') : [];
        return dpValues.filter(dpValue => !vlValues.includes(dpValue));
    }

    onChange(event, value) {
        this.renderer.removeAttribute(this.getNativeElement(), 'placeholder');
        if (!this.multiselect()) {
            //in this case the event is the value
            this.dataProviderID.set((value && value != "null") ? value : null);
        }
        this.updateDataprovider();
        const onActionMethodID = this.onActionMethodID();
        if (onActionMethodID) {
            onActionMethodID(event);
        }
    }

	updateDataprovider() {
		const valuelistID = this.valuelistID();
        if (valuelistID) {
            let value = null;

            if (this.multiselect()) {
                value = [];
                if (this.selectedValues && this.selectedValues.length > 0) {
                    // Convert selected values to real values AS STRINGS
                    for (const selectedValue of this.selectedValues) {
                        // Find the corresponding real value from the valuelist
                        for (const vlItem of valuelistID) {
                            if (String(vlItem.realValue) === String(selectedValue)) {
                                value.push(String(vlItem.realValue));  // Push as STRING, not real value
                                break;
                            }
                        }
                    }
                }
                if (value.length === 0) value = null;
            }
			else {
				// already binded by ngmodel, just push it
				value = this.dataProviderID();
			}
			this.updateValue(value);
		}
	}

	updateValue(val: string) {
		this.dataProviderID.set(val);
		super.pushUpdate();
	}

	toString(value: any): string {
		return String(value);
	}

}
