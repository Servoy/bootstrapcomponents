
import { Component, OnInit, Renderer2, SimpleChanges, ElementRef, AfterViewInit, Input, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy, Inject, DOCUMENT } from '@angular/core';
import { ServoyBootstrapBasefield } from '../bts_basefield';

@Component({
    selector: 'bootstrapcomponents-checkbox',
    templateUrl: './checkbox.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ServoyBootstrapCheckbox extends ServoyBootstrapBasefield<HTMLDivElement> {

    @Input() showAs: string;
    @Input() selectedValue: string;

    @ViewChild('input') input: ElementRef;

    selected = false;

    constructor(renderer: Renderer2, protected cdRef: ChangeDetectorRef, @Inject(DOCUMENT) doc: Document) {
        super(renderer, cdRef, doc);
    }

    svyOnInit() {
        super.svyOnInit();
        this.renderer.listen(this.getFocusElement(), 'click', (e) => {
            if (!this.readOnly && this.enabled) {
                this.itemClicked(e);
                if (this.onActionMethodID) setTimeout(() => this.onActionMethodID(e, this.getDataTarget(e)));
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
                    if (change.currentValue && !this.readOnly)
                    	this.renderer.removeAttribute(this.getFocusElement(), 'disabled');
                    else
                    	this.renderer.setAttribute(this.getFocusElement(), 'disabled', 'disabled');
                    break;
            }
        }
    }

    getFocusElement(): HTMLElement {
        return this.input.nativeElement;
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
        if (this.selectedValue) {
            this.dataProviderID = this.dataProviderID == this.selectedValue ? null : this.selectedValue;
        }
        else
            if (typeof this.dataProviderID === 'string') {
                this.dataProviderID = this.dataProviderID === '1' ? '0' : '1';
            } else {
                this.dataProviderID = this.dataProviderID > 0 ? 0 : 1;
            }
        this.pushUpdate();
    }

    setSelectionFromDataprovider() {
        this.selected = this.getSelectionFromDataprovider();
    }

    getSelectionFromDataprovider() {
        if (!this.dataProviderID) {
            return false;
        }
        if (this.selectedValue) {
            return this.dataProviderID == this.selectedValue;
        }
        if (typeof this.dataProviderID === 'string') {
            return this.dataProviderID === '1';
        } else {
            return this.dataProviderID > 0;
        }
    }

    isTrustedHTML(): boolean {
        if (this.servoyApi.trustAsHtml() || this.showAs === 'trusted_html') {
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
