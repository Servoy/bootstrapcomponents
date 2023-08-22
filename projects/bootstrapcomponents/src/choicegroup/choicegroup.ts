import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Input, Renderer2, ElementRef, Directive, ViewChild, SimpleChanges, ChangeDetectorRef, ChangeDetectionStrategy, Inject } from '@angular/core';
import { IValuelist } from '@servoy/public';
import { ServoyBootstrapBasefield } from '../bts_basefield';

@Component({
    selector: 'bootstrapcomponents-choicegroup',
    templateUrl: './choicegroup.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServoyBootstrapChoicegroup extends ServoyBootstrapBasefield<HTMLDivElement> {

    @Input() inputType: string;
    @Input() findmode: boolean;
    @Input() valuelistID: IValuelist;
    @Input() showAs: string;
    @Input() alignment: string;

    @ViewChild('input') input: ElementRef<HTMLInputElement>;

    selection: any[] = [];
    allowNullinc = 0;
    allowMultiselect = true;

    constructor(renderer: Renderer2, protected cdRef: ChangeDetectorRef, @Inject(DOCUMENT) doc: Document) {
        super(renderer, cdRef, doc);
    }

    svyOnInit() {
        super.svyOnInit();
    }

    svyOnChanges(changes: SimpleChanges) {
		super.svyOnChanges(changes);
        if (this.servoyApi.isInDesigner() && !this.valuelistID) {
            // this should only happen in preview
            this.valuelistID = [{ realValue: 1, displayValue: 'Item1' }, { realValue: 2, displayValue: 'Item2' }, { realValue: 3, displayValue: 'Item3' }] as IValuelist;
        }
        for (const property of Object.keys(changes)) {
			const change = changes[property];
            switch (property) {
                case 'dataProviderID':
                    this.setSelectionFromDataprovider();
                    this.allowMultiselect = typeof this.dataProviderID === 'string';
                    break;
                case 'valuelistID':
                    if (this.valuelistID && this.valuelistID.length > 0 && this.isValueListNull(this.valuelistID[0]))
                        this.allowNullinc = 1;
                    else this.allowNullinc = 0;
                    this.setSelectionFromDataprovider();
                    break;
                case 'alignment':
                    this.elementRef.nativeElement.classList.remove('horizontaldirection');
                    if (this.alignment === "horizontal") {
                        this.elementRef.nativeElement.classList.add('horizontaldirection');
                    }
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

    requestFocus(mustExecuteOnFocusGainedMethod: boolean) {
        this.mustExecuteOnFocus = mustExecuteOnFocusGainedMethod;
        (this.getFocusElement() as HTMLElement).focus();
    }

    getFocusElement(): HTMLElement {
        if (!this.input) {
            // just a fallback for not getting NPEs
            return this.elementRef.nativeElement;
        }
        return this.input.nativeElement;
    }

    getDataproviderFromSelection() {
        let returnValue = '';
        this.selection.forEach((element, index) => {
            if (element === true)
                returnValue += this.valuelistID[index + this.allowNullinc].realValue + '\n';
        });
        returnValue = returnValue.replace(/\n$/, ''); // remove the last \n
        if (returnValue === '') returnValue = null;
        return returnValue;
    }

    setSelectionFromDataprovider() {
        this.selection = [];
        if (this.dataProviderID === null || this.dataProviderID === undefined) return;
        const arr = (typeof this.dataProviderID === 'string') ? this.dataProviderID.split('\n') : [this.dataProviderID];
        if (this.inputType === 'radio' && arr.length > 1) return;
        for (let i = 0; i < this.valuelistID.length; i++) {
            const item = this.valuelistID[i];
            if (!this.isValueListNull(item)) {
                this.selection[i - this.allowNullinc] = arr.find(value => item.realValue + '' === value + '') !== undefined;
            }
        }
    }

    isValueListNull = (item) => (item.realValue === null || item.realValue === '') && item.displayValue === '';

    itemClicked(event, index) {
        let changed = true;
        if (this.inputType === 'radio') {
            this.dataProviderID = this.valuelistID[index + this.allowNullinc].realValue;
        } else {
            const prevValue = this.selection[index];
            if (this.allowMultiselect || this.findmode) {
                this.selection[index] = event.target.checked;
                if (!this.findmode && this.allowNullinc === 0 && this.selection.filter(a => a === true).length === 0) {
                    this.selection[index] = true;
                    event.target.checked = true;
                }
            } else {
                this.selection.fill(false);
                this.selection[index] = event.target.checked;
                if (!this.selection[index] && this.allowNullinc === 0) {
                    this.selection[index] = true;
                    event.target.checked = true;
                }
            }
            changed = prevValue !== this.selection[index];
            this.dataProviderID = this.getDataproviderFromSelection();
        }
        if (changed) this.pushUpdate();
        event.target.blur();
    }

    attachHandlers() {
        // just ignore this.
    }

    attachEventHandlers(element: HTMLElement, index: number) {
        if (element) {
            this.renderer.listen(element, 'click', (event) => {
                if (!this.readOnly && this.enabled) {
                    this.itemClicked(event, index);
                    if (this.onActionMethodID) this.onActionMethodID(event);
                }
            });
            this.attachFocusListeners(element);
        }
    }
}

@Directive({
    selector: '[bootstrapBaseChoiceElement]'
})
export class ChoiceElementDirective implements OnInit {

    @Input() bootstrapBaseChoiceElement: ServoyBootstrapChoicegroup;
    @Input() index: number;

    constructor(private el: ElementRef) {
    }

    ngOnInit(): void {
        this.bootstrapBaseChoiceElement.attachEventHandlers(this.el.nativeElement, this.index);
    }
}
