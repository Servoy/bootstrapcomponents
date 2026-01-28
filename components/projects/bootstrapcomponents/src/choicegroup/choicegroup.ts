
import { Component, OnInit, Renderer2, ElementRef, Directive, SimpleChanges, ChangeDetectorRef, ChangeDetectionStrategy, Inject, DOCUMENT, input, viewChild, signal } from '@angular/core';
import { IValuelist } from '@servoy/public';
import { ServoyBootstrapBasefield } from '../bts_basefield';

@Component({
    selector: 'bootstrapcomponents-choicegroup',
    templateUrl: './choicegroup.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ServoyBootstrapChoicegroup extends ServoyBootstrapBasefield<HTMLDivElement> {

    readonly inputType = input<string>(undefined);
    readonly findmode = input<boolean>(undefined);
    readonly valuelistID = input<IValuelist>(undefined);
    readonly showAs = input<string>(undefined);
    readonly alignment = input<string>(undefined);

    readonly input = viewChild<ElementRef<HTMLInputElement>>('input');
    
    protected _valueProviderID = signal<IValuelist>(undefined);

    selection: any[] = [];
    allowNullinc = 0;
    allowMultiselect = true;

    constructor(renderer: Renderer2, protected cdRef: ChangeDetectorRef, @Inject(DOCUMENT) doc: Document) {
        super(renderer, cdRef, doc);
    }

    svyOnInit() {
        this._valueProviderID.set(this.valuelistID());
        super.svyOnInit();
    }

    svyOnChanges(changes: SimpleChanges) {
		super.svyOnChanges(changes);
        const valuelistID = this._valueProviderID();
        if (this.servoyApi.isInDesigner() && !valuelistID) {
            // this should only happen in preview
            this._valueProviderID.set([{ realValue: 1, displayValue: 'Item1' }, { realValue: 2, displayValue: 'Item2' }, { realValue: 3, displayValue: 'Item3' }] as IValuelist);
        }
        for (const property of Object.keys(changes)) {
			const change = changes[property];
            switch (property) {
                case 'dataProviderID':
                    this.setSelectionFromDataprovider();
                    if (change.firstChange){
						this.allowMultiselect = Array.isArray(this._dataProviderID());
					}
                    break;
                case 'valuelistID':
                    if (valuelistID && valuelistID.length > 0 && this.isValueListNull(valuelistID[0]))
                        this.allowNullinc = 1;
                    else this.allowNullinc = 0;
                    this.setSelectionFromDataprovider();
                    break;
                case 'alignment':
                    this.elementRef.nativeElement.classList.remove('horizontaldirection');
                    if (this.alignment() === "horizontal") {
                        this.elementRef.nativeElement.classList.add('horizontaldirection');
                    }
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

    requestFocus(mustExecuteOnFocusGainedMethod: boolean) {
        this.mustExecuteOnFocus = mustExecuteOnFocusGainedMethod;
        (this.getFocusElement() as HTMLElement).focus();
    }

    getFocusElement(): HTMLElement {
        const inputValue = this.input();
        if (!inputValue) {
            // just a fallback for not getting NPEs
            return this.elementRef.nativeElement;
        }
        return inputValue.nativeElement;
    }

    getDataproviderFromSelection() {
        let returnValue = [];
        this.selection.forEach((element, index) => {
            if (element === true)
                returnValue.push(this.valuelistID()[index + this.allowNullinc].realValue +'');
        });
        if (!returnValue.length) returnValue = null;
		else if (!this.allowMultiselect) returnValue = returnValue[0];
        return returnValue;
    }

    setSelectionFromDataprovider() {
        this.selection = [];
        const dataProviderID = this._dataProviderID();
        if (dataProviderID === null || dataProviderID === undefined || (Array.isArray(dataProviderID) && dataProviderID.length == 1 && dataProviderID[0] == null)) return;
        const arr = (Array.isArray(dataProviderID)) ? dataProviderID : [dataProviderID];
        if (this.inputType() === 'radio' && arr.length > 1) return;
        for (let i = 0; i < this.valuelistID().length; i++) {
            const item = this.valuelistID()[i];
            if (!this.isValueListNull(item)) {
                this.selection[i - this.allowNullinc] = arr.find(value => item.realValue + '' === value + '') !== undefined;
            }
        }
    }

    isValueListNull = (item) => (item.realValue === null || item.realValue === '') && item.displayValue === '';

    itemClicked(event, index) {
        let changed = true;
        if (this.inputType() === 'radio') {
            this._dataProviderID.set(this.valuelistID()[index + this.allowNullinc].realValue);
        } else {
            const prevValue = this.selection[index];
            const findmode = this.findmode();
            if (this.allowMultiselect || findmode) {
                this.selection[index] = event.target.checked;
                if (!findmode && this.allowNullinc === 0 && this.selection.filter(a => a === true).length === 0) {
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
            this._dataProviderID.set(this.getDataproviderFromSelection());
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
                if (!this.readOnly() && this.enabled()) {
                    this.itemClicked(event, index);
                    if (this.onActionMethodID()) setTimeout(() => this.onActionMethodID()(event));
                }
            });
            this.attachFocusListeners(element);
        }
    }
}

@Directive({
    selector: '[bootstrapBaseChoiceElement]',
    standalone: false
})
export class ChoiceElementDirective implements OnInit {

    readonly bootstrapBaseChoiceElement = input<ServoyBootstrapChoicegroup>(undefined);
    readonly index = input<number>(undefined);

    constructor(private el: ElementRef) {
    }

    ngOnInit(): void {
        this.bootstrapBaseChoiceElement().attachEventHandlers(this.el.nativeElement, this.index());
    }
}
