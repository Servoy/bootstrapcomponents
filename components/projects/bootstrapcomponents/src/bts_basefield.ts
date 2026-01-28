import { ServoyBootstrapBaseComponent } from './bts_basecomp';
import { Directive, SimpleChanges, SimpleChange, Renderer2, ChangeDetectorRef, Inject, DOCUMENT, input, output, signal } from '@angular/core';
import { PropertyUtils } from '@servoy/public';


@Directive()
// eslint-disable-next-line
export class ServoyBootstrapBasefield<T extends HTMLElement> extends ServoyBootstrapBaseComponent<T> {

    readonly onActionMethodID = input<(e: Event, data?: any) => void>(undefined);
    readonly onRightClickMethodID = input<(e: Event, data?: any) => void>(undefined);

    readonly onDataChangeMethodID = input<(e: Event) => void>(undefined);
    readonly onFocusGainedMethodID = input<(e: Event) => void>(undefined);
    readonly onFocusLostMethodID = input<(e: Event) => void>(undefined);

    readonly dataProviderIDChange = output();
    readonly dataProviderID = input<any>(undefined);
    readonly readOnly = input<boolean>(undefined);
    readonly findmode = input<boolean>(undefined);
    readonly editable = input<boolean>(undefined);
    readonly placeholderText = input<string>(undefined);
    readonly selectOnEnter = input<boolean>(undefined);
    
    protected _dataProviderID = signal<any>(undefined);
    protected _editable = signal<boolean>(undefined);

    mustExecuteOnFocus = true;

    storedTooltip: any;

    constructor(renderer: Renderer2, protected cdRef: ChangeDetectorRef, @Inject(DOCUMENT) protected doc: Document) {
        super(renderer, cdRef);
    }

    svyOnInit() {
        super.svyOnInit();
        this._dataProviderID.set(this.dataProviderID());
        this._editable.set(this.editable());
        this.attachFocusListeners(this.getFocusElement());
        if (this._dataProviderID() === undefined) {
            this._dataProviderID.set(null);
        }
        if (this.onActionMethodID()) {
            this.renderer.listen(this.getFocusElement(), 'keydown', e => {
                if (e.keyCode === 13) {
                    setTimeout(() => this.onActionMethodID()(e, this.getDataTarget(e)), 100);
                }
            });
        }
        if (this.onRightClickMethodID()) {
            this.renderer.listen(this.getFocusElement(), 'contextmenu', e => {
                this.onRightClickMethodID()(e); return false;
            });
        }
    }

    svyOnChanges(changes: SimpleChanges) {
        if (changes) {
            /*if (changes.dataProviderID) {
                this._dataProviderID.set(this.dataProviderID());
            }
            
            if (changes.editable) {
                this._editable.set(this.editable());
            }*/
            
            for (const property of Object.keys(changes)) {
                const change = changes[property];
                switch (property) {
                    case 'placeholderText':
                       this.setPlaceHolderText(change);
                        break;
                    case 'selectOnEnter':
                        if (change.currentValue) PropertyUtils.addSelectOnEnter(this.getFocusElement(), this.renderer, this.doc);
                        break;
                }
            }
            if (changes.editable || changes.readOnly || changes.findmode) {
                const findmode = this.findmode();
                const realFindmode = findmode === undefined? false: findmode; // default for find is false
                const readOnly = this.readOnly();
                const realReadonly = readOnly === undefined? false: readOnly; // default for readonly is false
                const editable = this._editable();
                const realEditable = editable === undefined? true: editable; // default for editable is true
				if (realFindmode || (!realReadonly && realEditable)) {
					this.renderer.removeAttribute(this.getFocusElement(), 'readonly');
				} else {
					this.renderer.setAttribute(this.getFocusElement(), 'readonly', 'readonly');
				}
			}
            super.svyOnChanges(changes);
        }
    }

    requestFocus(mustExecuteOnFocusGainedMethod: boolean) {
        this.mustExecuteOnFocus = mustExecuteOnFocusGainedMethod;
        this.getFocusElement().focus();
    }

    attachFocusListeners(nativeElement: HTMLElement) {
        if (this.onFocusGainedMethodID())
            this.renderer.listen(nativeElement, 'focus', (e) => {
                if (this.mustExecuteOnFocus !== false) {
                    this.onFocusGainedMethodID()(e);
                }
                this.mustExecuteOnFocus = true;
            });
        if (this.onFocusLostMethodID())
            this.renderer.listen(nativeElement, 'blur', (e) => {
                this.onFocusLostMethodID()(e);
            });
    }

    onDataChangeCallback(event, returnval) {
        const stringValue = (typeof returnval === 'string' || returnval instanceof String);
        if (returnval === false || stringValue) {
            this.renderer.removeClass(this.getFocusElement(), 'ng-valid');
            this.renderer.addClass(this.getFocusElement(), 'ng-invalid');
            if (stringValue) {
                if (this.storedTooltip === false) {
                    this.storedTooltip = this._toolTipText();
                }
                this._toolTipText.set(returnval.toString());
            }
        } else {
            this.renderer.removeClass(this.getFocusElement(), 'ng-invalid');
            this.renderer.addClass(this.getFocusElement(), 'ng-valid');
            if (this.storedTooltip !== false) this._toolTipText.set(this.storedTooltip);
            this.storedTooltip = false;
        }
    }

    pushUpdate() {
        this.dataProviderIDChange.emit(this._dataProviderID());
    }
    
    protected setPlaceHolderText(change : SimpleChange ){
        if (change.currentValue) this.renderer.setAttribute(this.getFocusElement(), 'placeholder', change.currentValue);
        else this.renderer.removeAttribute(this.getFocusElement(), 'placeholder'); 
    }
    
    public selectAll() {
        (this.getFocusElement() as HTMLInputElement).select();
    }

    public getSelectedText(): string {
        return window.getSelection().toString();
    }

    public replaceSelectedText(text: string) {
        const elem = this.getFocusElement() as HTMLInputElement;
        const startPos = elem.selectionStart;
        const endPos = elem.selectionEnd;

        const beginning = elem.value.substring(0, startPos);
        const end = elem.value.substring(endPos);
        elem.value = beginning + text + end;
        elem.selectionStart = startPos;
        elem.selectionEnd = startPos + text.length;

        const evt = this.doc.createEvent('HTMLEvents');
        evt.initEvent('change', false, true);
        elem.dispatchEvent(evt);
    }

    public getAsPlainText(): string {
        const dataProviderID = this._dataProviderID();
        if (dataProviderID) {
            return dataProviderID.replace(/<[^>]*>/g, '');
        }
        return dataProviderID;
    }

    public getDataTarget(event): any {
        return null;
    }
}
