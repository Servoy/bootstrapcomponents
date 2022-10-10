import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Inject, Input, Renderer2, SimpleChanges, ViewChild, Directive } from '@angular/core';
import { NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { merge, Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, take } from 'rxjs/operators';
import { Format, FormattingService, IValuelist, WindowRefService, IPopupSupportComponent } from '@servoy/public';
import { ServoyBootstrapBasefield } from '../bts_basefield';

@Component({
    selector: 'bootstrapcomponents-typeahead',
    templateUrl: './typeahead.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServoyBootstrapTypeahead extends ServoyBootstrapBasefield<HTMLInputElement> implements IPopupSupportComponent{

    @ViewChild('instance') instance: NgbTypeahead;

    @Input() showAs: string;
    @Input() format: Format;
    @Input() valuelistID: IValuelist;
    @Input() appendToBody: boolean;
    @Input() filteringDebounce: number;
    autocomplete: string;

    focus$ = new Subject<string>();
    click$ = new Subject<string>();

    constructor(renderer: Renderer2, cdRef: ChangeDetectorRef, @Inject(DOCUMENT) doc: Document, protected formatService: FormattingService,
        windowService: WindowRefService) {
        super(renderer, cdRef, doc);
        this.autocomplete = windowService.nativeWindow.navigator.userAgent.match(/chrome/i) ? 'chrome-off' : 'off';
    }

    svyOnInit() {
        super.svyOnInit();
        this.renderer.listen(this.getFocusElement(), 'focus', () => {
            setTimeout(this.onFocus);
        });
        // add custom class to the popup, needed by ng-grids (ag-grid) so it can be used in form editors (popups)
        this.instance.popupClass = 'ag-custom-component-popup';
    }

    onFocus = () => {
        const popup = this.doc.getElementById(this.instance.popupId);
        if (popup) {
            popup.style.width = this.getFocusElement().clientWidth + 'px';
        }
    };

    scroll() {
        if (!this.instance.isPopupOpen()) {
            return;
        }

        setTimeout(() => {
            const popup = this.doc.getElementById(this.instance.popupId);
            const activeElements = popup.getElementsByClassName('active');
            if (activeElements.length === 1) {
                const elem = activeElements[0] as HTMLElement;
                elem.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
    }

    svyOnChanges(changes: SimpleChanges) {
        super.svyOnChanges(changes);
        if (changes.readOnly || changes.enabled) {
            this.instance.setDisabledState(this.readOnly || !this.enabled);
        }
        if (changes.format && this.valuelistID) {
            this.instance.writeValue(this.dataProviderID);
        }
    }

    lastFilteringPromise: Observable<any> = null;
    valueToApply: { displayValue: string; realValue: any } = null;

    filterValues = ( text$: Observable<string> ) => {
        const debouncedText$ = text$.pipe( debounceTime( this.filteringDebounce ), distinctUntilChanged() );
        const clicksWithClosedPopup$ = this.click$.pipe( filter(() => !this.instance.isPopupOpen() ) );
        const inputFocus$ = this.focus$;

        return merge( debouncedText$, inputFocus$, clicksWithClosedPopup$ ).pipe( switchMap( term => {
            if ( this.editable === true ) {
                const promise = this.valuelistID.filterList( term )
                this.lastFilteringPromise = promise;
                promise.toPromise().finally(() => {
                    if ( this.lastFilteringPromise == promise ) {
                        this.lastFilteringPromise = null;
                        if ( this.valueToApply ) {
                            const tempValue = this.valueToApply;
                            this.valueToApply = null;
                            promise.pipe( take( 1 ) ).subscribe( items => {
                                let value = items.find(( item ) => item.realValue == tempValue.realValue );
                                // is the item still in valuelist after filter? apply that one, if not select the first one
                                if ( !value ) {
                                    value = items[0];
                                }
                                if ( value ) {
                                    this.dataProviderID = value.realValue;
                                    this.dataProviderIDChange.emit( this.dataProviderID );
                                }
                            } );
                        }
                    }
                } );
                return promise;
            }
            return Promise.resolve( [] );
        } ) );
    };

    isEditable() {
        return this.valuelistID && !this.valuelistID.hasRealValues();
    }

    resultFormatter = (result: { displayValue: string; realValue: any }) => {
        // eslint-disable-next-line eqeqeq
        if (result.displayValue === null || result.displayValue == '') return '\u00A0';
        return this.formatService.format(result.displayValue, this.format, false);
    };

    private realToDisplay: Map<any, string> = new Map();
    inputFormatter = (result: any) => {
        if (result === null) return '';
        if (result.displayValue !== undefined) result = result.displayValue;
        else if (this.valuelistID.hasRealValues()) {
            // on purpose test with == so that "2" equals to 2
            // eslint-disable-next-line eqeqeq
            const value = this.valuelistID.find((item) => item.realValue == result);
            if (value) {
                result = value.displayValue;
            } else {
                const display = this.realToDisplay.get(result);
                if ( display === null || display === undefined ) {
                    this.valuelistID.getDisplayValue( result ).subscribe( val => {
                        if ( val ) {
                            this.realToDisplay.set( result, val );
                            this.instance.writeValue( result );
                        }
                    } );
                    return '';
                } else {
                    result = display;
                }
            }
        }
        return this.formatService.format(result, this.format, false);
    };

    valueChanged(event: NgbTypeaheadSelectItemEvent) {
        const value: { displayValue: string; realValue: any } = event.item;
        if (this.lastFilteringPromise && value && value.realValue !== undefined) {
            event.preventDefault();
            this.valueToApply = value;
            return;
        }
        if (value && value.realValue !== undefined) this.dataProviderID = value.realValue;
        else if (value) this.dataProviderID = value;
        else this.dataProviderID = null;
        this.dataProviderIDChange.emit(this.dataProviderID);
    }
    
    closePopup(){
        this.instance.dismissPopup();
    }
}
