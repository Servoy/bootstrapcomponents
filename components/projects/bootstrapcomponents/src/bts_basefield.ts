import { ServoyBootstrapBaseComponent } from './bts_basecomp';
import { Directive, Input, Output, EventEmitter, SimpleChanges, SimpleChange, Renderer2, ChangeDetectorRef, Inject, DOCUMENT } from '@angular/core';
import { PropertyUtils } from '@servoy/public';


@Directive()
// eslint-disable-next-line
export class ServoyBootstrapBasefield<T extends HTMLElement> extends ServoyBootstrapBaseComponent<T> {

    @Input() onActionMethodID: (e: Event, data?: any) => void;
    @Input() onRightClickMethodID: (e: Event, data?: any) => void;

    @Input() onDataChangeMethodID: (e: Event) => void;
    @Input() onFocusGainedMethodID: (e: Event) => void;
    @Input() onFocusLostMethodID: (e: Event) => void;

    @Output() dataProviderIDChange = new EventEmitter();
    @Input() dataProviderID: any;
    @Input() readOnly: boolean;
    @Input() findmode: boolean;
    @Input() editable: boolean;
    @Input() placeholderText: string;
    @Input() selectOnEnter: boolean;

    mustExecuteOnFocus = true;

    storedTooltip: any;

    constructor(renderer: Renderer2, protected cdRef: ChangeDetectorRef, @Inject(DOCUMENT) protected doc: Document) {
        super(renderer, cdRef);
    }

    svyOnInit() {
        super.svyOnInit();
        this.attachFocusListeners(this.getFocusElement());
        if (this.dataProviderID === undefined) {
            this.dataProviderID = null;
        }
        if (this.onActionMethodID) {
            this.renderer.listen(this.getFocusElement(), 'keydown', e => {
                if (e.keyCode === 13) {
                    setTimeout(() => this.onActionMethodID(e, this.getDataTarget(e)), 100);
                }
            });
        }
        if (this.onRightClickMethodID) {
            this.renderer.listen(this.getFocusElement(), 'contextmenu', e => {
                this.onRightClickMethodID(e); return false;
            });
        }
    }

    svyOnChanges(changes: SimpleChanges) {
        if (changes) {
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
                const realFindmode = this.findmode === undefined? false: this.findmode; // default for find is false
                const realReadonly = this.readOnly === undefined? false: this.readOnly; // default for readonly is false
                const realEditable = this.editable === undefined? true: this.editable; // default for editable is true
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
        if (this.onFocusGainedMethodID)
            this.renderer.listen(nativeElement, 'focus', (e) => {
                if (this.mustExecuteOnFocus !== false) {
                    this.onFocusGainedMethodID(e);
                }
                this.mustExecuteOnFocus = true;
            });
        if (this.onFocusLostMethodID)
            this.renderer.listen(nativeElement, 'blur', (e) => {
                this.onFocusLostMethodID(e);
            });
    }

    onDataChangeCallback(event, returnval) {
        const stringValue = (typeof returnval === 'string' || returnval instanceof String);
        if (returnval === false || stringValue) {
            this.renderer.removeClass(this.getFocusElement(), 'ng-valid');
            this.renderer.addClass(this.getFocusElement(), 'ng-invalid');
            if (stringValue) {
                if (this.storedTooltip === false) {
                    this.storedTooltip = this.toolTipText;
                }
                this.toolTipText = returnval.toString();
            }
        } else {
            this.renderer.removeClass(this.getFocusElement(), 'ng-invalid');
            this.renderer.addClass(this.getFocusElement(), 'ng-valid');
            if (this.storedTooltip !== false) this.toolTipText = this.storedTooltip;
            this.storedTooltip = false;
        }
    }

    pushUpdate() {
        this.dataProviderIDChange.emit(this.dataProviderID);
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
        if (this.dataProviderID) {
            return this.dataProviderID.replace(/<[^>]*>/g, '');
        }
        return this.dataProviderID;
    }

    public getDataTarget(event): any {
        return null;
    }
}
