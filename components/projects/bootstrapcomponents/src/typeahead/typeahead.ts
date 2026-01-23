
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Inject, Renderer2, SimpleChanges, Directive, DOCUMENT, input, viewChild } from '@angular/core';
import { NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { merge, Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, take } from 'rxjs/operators';
import { Format, FormattingService, IValuelist, ServoyPublicService, WindowRefService, IPopupSupportComponent, PopupStateService } from '@servoy/public';
import { ServoyBootstrapBasefield } from '../bts_basefield';

@Component({
	selector: 'bootstrapcomponents-typeahead',
	templateUrl: './typeahead.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: false
})
export class ServoyBootstrapTypeahead extends ServoyBootstrapBasefield<HTMLInputElement> implements IPopupSupportComponent {

	private readonly NULL_VALUE = 'SVY_TS_NULL_VALUE_';

	readonly instance = viewChild<NgbTypeahead>('instance');

	readonly showAs = input<string>(undefined);
	readonly format = input<Format>(undefined);
	readonly valuelistID = input<IValuelist>(undefined);
	readonly appendToBody = input<boolean>(undefined);
	readonly filteringDebounce = input<number>(undefined);
	autocomplete: string;
	container: string;

	currentValue: any;
	showPopupOnFocusGain: boolean;

	focus$ = new Subject<string>();
	click$ = new Subject<string>();

	lastFilteringPromise: Observable<any> = null;
	valueToApply: { displayValue: string; realValue: any } = null;

	private realToDisplay: Map<any, string> = new Map();

	constructor(renderer: Renderer2, cdRef: ChangeDetectorRef, @Inject(DOCUMENT) doc: Document, 
		protected formatService: FormattingService,
		protected servoyService: ServoyPublicService,
		windowService: WindowRefService,
        protected popupStateService: PopupStateService) {
		super(renderer, cdRef, doc);
		this.autocomplete = windowService.nativeWindow.navigator.userAgent.match(/chrome/i) ? 'chrome-off' : 'off';
	}
    
    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            this.popupStateService.deactivatePopup(this.getNativeElement().id);
        }
    }

	svyOnInit() {
		super.svyOnInit();
		this.renderer.listen(this.getFocusElement(), 'focus', () => {
			setTimeout(this.onFocus);
            this.popupStateService.activatePopup(this.getNativeElement().id);
		});
		// add custom class to the popup, needed by ng-grids (ag-grid) so it can be used in form editors (popups)
		this.instance().popupClass = 'ag-custom-component-popup svy-typeahead-zindex';
		this.showPopupOnFocusGain = this.servoyApi.getClientProperty('TypeAhead.showPopupOnFocusGain');
		if (this.showPopupOnFocusGain === null || this.showPopupOnFocusGain === undefined) {
			this.showPopupOnFocusGain = this.servoyService.getUIProperty('TypeAhead.showPopupOnFocusGain');
		}
	}

	onFocus = () => {
		const popup = this.doc.getElementById(this.instance().popupId);
		if (popup) {
			popup.style.width = this.getFocusElement().clientWidth + 'px';
		}
	};
	
	focusGained() {
		if (((this.showPopupOnFocusGain || this.showPopupOnFocusGain === null || this.showPopupOnFocusGain === undefined) && this.editable() && !this.readOnly()) || this.findmode()) {
			this.focus$.next('');
		}
	}
	onClick() {
		if (((this.showPopupOnFocusGain || this.showPopupOnFocusGain === null || this.showPopupOnFocusGain === undefined) && this.editable() && !this.readOnly()) || this.findmode()) {
			this.click$.next('');
		}
	}

	scroll() {
		if (!this.instance().isPopupOpen()) {
			return;
		}

		setTimeout(() => {
			const popup = this.doc.getElementById(this.instance().popupId);
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

	get dataProvider() {
//		if (this.dataProviderID === null) return this.NULL_VALUE;
		return this.dataProviderID();
	}

	set dataProvider(value) {
//		if (value === this.NULL_VALUE) this.dataProviderID = null;
//		else 
        if (value && typeof value === 'object' && value.realValue !== undefined) {
            this.dataProviderID.set(value.realValue);
        } else {
            this.dataProviderID.set(value);
        }

	}

    svyOnChanges(changes: SimpleChanges) {
        super.svyOnChanges(changes);
        if (changes.enabled || changes.findmode) {
            this.instance().setDisabledState(!this.enabled() && !this.findmode());
        }
        const dataProviderID = this.dataProviderID();
        const valuelistID = this.valuelistID();
        if (changes.format && valuelistID) {
            this.instance().writeValue(dataProviderID);
        }
        if (changes.format) {
            const format = this.format();
            if (format && format.maxLength) {
                this.renderer.setAttribute(this.elementRef.nativeElement, 'maxlength', format.maxLength + '');
            } else {
                this.renderer.removeAttribute(this.elementRef.nativeElement, 'maxlength');
            }
            if (valuelistID) this.instance().writeValue(dataProviderID);
        }
        if (changes.dataProviderID) {
            this.currentValue = changes.dataProviderID.currentValue;
            if (dataProviderID === null) {
                this.dataProviderID.set(this.NULL_VALUE);
            }
        }
    }

    filterValues = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(this.filteringDebounce()), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance().isPopupOpen()));
        const inputFocus$ = this.focus$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(switchMap(term => {
            const valuelistID = this.valuelistID();
            if ((this.findmode() || (!this.readOnly() && this.editable())) && valuelistID) {
                const promise = valuelistID.filterList(term)
                this.lastFilteringPromise = promise;
                promise.toPromise().finally(() => {
                    if (this.lastFilteringPromise == promise) {
                        this.lastFilteringPromise = null;
                        if (this.valueToApply) {
                            const tempValue = this.valueToApply;
                            this.valueToApply = null;
                            promise.pipe(take(1)).subscribe(items => {
                                let value = items.find((item) => item.realValue == tempValue.realValue);
                                // is the item still in valuelist after filter? apply that one, if not select the first one
                                if (!value) {
                                    value = items[0];
                                }
                                if (value) {
                                    this.dataProviderID.set(value.realValue);
                                    this.dataProviderIDChange.emit(this.dataProviderID());
                                }
                            });
                        }
                    }
                    const popup = this.doc.getElementById(this.instance().popupId);
                    if (popup) {
                        popup.style.width = this.getFocusElement().clientWidth + 'px';
                        if (term == "" && this.dataProviderID()) {
                            const highlightElements = popup.getElementsByClassName('ngb-highlight');
                            if (highlightElements.length === 1) {
                                // initial display , highlight the value element
                                highlightElements[0].parentNode.parentNode.dispatchEvent(new Event('mouseenter'));
                            }
                        }
                    }
                });
                return promise;
            }
            return Promise.resolve([]);
        }));
    };

    pushUpdate() {
        const dataProviderID = this.dataProviderID();
        const findmode = this.findmode();
        if (!dataProviderID && (!this.isEditable() || findmode)) {
            // need to restore value from UI
            const valuelistID = this.valuelistID();
            if (findmode || !valuelistID) {
                this.dataProviderID.set(this.elementRef.nativeElement.value);
            } else {
                if (this.elementRef.nativeElement.value === valuelistID[0]?.displayValue) {
                    this.dataProviderID.set(valuelistID[0]?.realValue);
                    this.currentValue = this.dataProviderID();
                    super.pushUpdate();
                } else {
                    this.dataProviderID.set(this.currentValue);
                }
                return;
            }
        }
        this.currentValue = dataProviderID;
        super.pushUpdate();
    }

    isEditable() {
        if (this.servoyApi.isInDesigner()) {
            return true;
        }
        const valuelistID = this.valuelistID();
        return valuelistID && !valuelistID.hasRealValues();
    }

	resultFormatter = (result: { displayValue: string; realValue: any }) => {
		// eslint-disable-next-line eqeqeq
		if (result.displayValue === null || result.displayValue == '') return '\u00A0';
		return this.formatService.format(result.displayValue, this.format(), false);
	};

    inputFormatter = (result: any) => {
        if (result === this.NULL_VALUE) {
            result = null;
        }
        const valuelistID = this.valuelistID();
        if (result?.displayValue !== undefined) result = result.displayValue;
        else if (!this.findmode() && valuelistID?.hasRealValues()) {
            // on purpose test with == so that "2" equals to 2
            const value = valuelistID.find((item) => {
                // eslint-disable-next-line eqeqeq
                if (item.realValue == result) {
                    return true;
                }
                if (item.realValue instanceof Date && result instanceof Date) {
                    return item.realValue.getTime() === result.getTime();
                }
                return false;
            });
            if (value) {
                result = value.displayValue;
            } else {
                let display = this.realToDisplay.get(result);
                if (display === null || display === undefined) {
                    valuelistID.getDisplayValue(result).subscribe(val => {
                        if (val) {
                            this.realToDisplay.set(result, val);
                            // if dpid is changed do not write the old value
                            if (result == this.dataProviderID()) this.instance().writeValue(result);
                        }
                    });
                    display = this.realToDisplay.get(result); // in case the getDisplayValue above runs sync, before this return happen (uses of() not from())
                    if (display === null || display === undefined) return '';
                    else result = display;
                } else {
                    result = display;
                }
            }
        }
        return this.formatService.format(result, this.format(), false);
    };

    valueChanged(event: NgbTypeaheadSelectItemEvent) {
        const value: { displayValue: string; realValue: any } = event.item;
        if (this.lastFilteringPromise && value && value.realValue !== undefined) {
            event.preventDefault();
            this.valueToApply = value;
            return;
        }
        if (value && value.realValue !== undefined) this.dataProviderID.set(value.realValue);
        else if (value) this.dataProviderID.set(value);
        else this.dataProviderID.set(null);
        const dataProviderID = this.dataProviderID();
        this.dataProviderIDChange.emit(dataProviderID);
        this.currentValue = dataProviderID;
    }

	closePopup() {
        this.popupStateService.deactivatePopup(this.getNativeElement().id);
		this.instance().dismissPopup();
	}
    
    focusLost() {
        this.popupStateService.deactivatePopup(this.getNativeElement().id);
    }
}