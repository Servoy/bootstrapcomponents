
import { Component, OnInit, Renderer2, SimpleChanges, ElementRef, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy, Inject, DOCUMENT, input, viewChild } from '@angular/core';
import { ServoyBootstrapBasefield } from '../bts_basefield';

@Component({
    selector: 'bootstrapcomponents-checkbox',
    templateUrl: './checkbox.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ServoyBootstrapCheckbox extends ServoyBootstrapBasefield<HTMLDivElement> {

    readonly showAs = input<string>(undefined);
    readonly selectedValue = input<string>(undefined);

    readonly input = viewChild<ElementRef>('input');

    selected = false;

    constructor(renderer: Renderer2, protected cdRef: ChangeDetectorRef, @Inject(DOCUMENT) doc: Document) {
        super(renderer, cdRef, doc);
    }

    svyOnInit() {
        super.svyOnInit();
        this.renderer.listen(this.getFocusElement(), 'click', (e) => {
            if (!this.readOnly() && this.enabled()) {
                this.itemClicked(e);
                if (this.onActionMethodID()) setTimeout(() => this.onActionMethodID()(e, this.getDataTarget(e)));
            }
        });
    }

    svyOnChanges(changes: SimpleChanges) {
		super.svyOnChanges(changes);
        for (const property in changes) {
			const change = changes[property];
            switch (property) {
                case 'dataProviderID':
                    this.setSelectionFromDataprovider();
                    break;
                case 'enabled':
                    if (change.currentValue && !this.readOnly())
                    	this.renderer.removeAttribute(this.getFocusElement(), 'disabled');
                    else
                    	this.renderer.setAttribute(this.getFocusElement(), 'disabled', 'disabled');
                    break;
            }
        }
    }

    getFocusElement(): HTMLElement {
        return this.input().nativeElement;
    }

    requestFocus(mustExecuteOnFocusGainedMethod: boolean) {
        this.mustExecuteOnFocus = mustExecuteOnFocusGainedMethod;
        (this.getFocusElement() as HTMLElement).focus();
    }

    itemClicked(event) {
        // reverse the selected value (data provider too)
        if (event.target.localName === 'span' || event.target.localName === 'label'
            || event.target.localName === 'div') {
            this.selected = !this.selected;
            event.preventDefault();
        }
        const dataProviderID = this._dataProviderID();
        const selectedValue = this.selectedValue();
        if (selectedValue) {
            this._dataProviderID.set(this._dataProviderID() == selectedValue ? null : selectedValue);
        }
        else
            if (typeof dataProviderID === 'string') {
                this._dataProviderID.set(dataProviderID === '1' ? '0' : '1');
            } else {
                this._dataProviderID.set(dataProviderID > 0 ? 0 : 1);
            }
        this.pushUpdate();
    }

    setSelectionFromDataprovider() {
        this.selected = this.getSelectionFromDataprovider();
    }

    getSelectionFromDataprovider() {
        const dataProviderID = this._dataProviderID();
        if (!dataProviderID) {
            return false;
        }
        const selectedValue = this.selectedValue();
        if (selectedValue) {
            return dataProviderID == selectedValue;
        }
        if (typeof dataProviderID === 'string') {
            return dataProviderID === '1';
        } else {
            return dataProviderID > 0;
        }
    }

    isTrustedHTML(): boolean {
        if (this.servoyApi.trustAsHtml() || this.showAs() === 'trusted_html') {
            return true;
        }
        return false;
    }
    
    
    public override getDataTarget(event): any {
		const dataTarget = event.target.closest('label').querySelector('[data-target]');
        if (dataTarget) {
            return dataTarget.getAttribute('data-target');
        }
        return null;
	}
}
