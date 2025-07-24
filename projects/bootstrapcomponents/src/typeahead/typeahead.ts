import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Inject, Input, Renderer2, SimpleChanges, ViewChild, Directive } from '@angular/core';
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

	@ViewChild('instance') instance: NgbTypeahead;

	@Input() showAs: string;
	@Input() format: Format;
	@Input() valuelistID: IValuelist;
	@Input() appendToBody: boolean;
	@Input() filteringDebounce: number;
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
		this.instance.popupClass = 'ag-custom-component-popup svy-typeahead-zindex';
		this.showPopupOnFocusGain = this.servoyApi.getClientProperty('TypeAhead.showPopupOnFocusGain');
		if (this.showPopupOnFocusGain === null || this.showPopupOnFocusGain === undefined) {
			this.showPopupOnFocusGain = this.servoyService.getUIProperty('TypeAhead.showPopupOnFocusGain');
		}
	}

	onFocus = () => {
		const popup = this.doc.getElementById(this.instance.popupId);
		if (popup) {
			popup.style.width = this.getFocusElement().clientWidth + 'px';
		}
	};
	
	focusGained() {
		if (((this.showPopupOnFocusGain || this.showPopupOnFocusGain === null || this.showPopupOnFocusGain === undefined) && this.editable && !this.readOnly) || this.findmode) {
			this.focus$.next('');
		}
	}
	onClick() {
		if (((this.showPopupOnFocusGain || this.showPopupOnFocusGain === null || this.showPopupOnFocusGain === undefined) && this.editable && !this.readOnly) || this.findmode) {
			this.click$.next('');
		}
	}

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

	get dataProvider() {
		if (this.dataProviderID === null) return this.NULL_VALUE;
		return this.dataProviderID;
	}

	set dataProvider(value) {
		if (value === this.NULL_VALUE) this.dataProviderID = null;
		else this.dataProviderID = value;

	}

	svyOnChanges(changes: SimpleChanges) {
		super.svyOnChanges(changes);
		if (changes.enabled || changes.findmode) {
			this.instance.setDisabledState(!this.enabled && !this.findmode);
		}
		if (changes.format && this.valuelistID) {
			this.instance.writeValue(this.dataProviderID);
		}
		if (changes.format) {
			if (this.format && this.format.maxLength) {
				this.renderer.setAttribute(this.elementRef.nativeElement, 'maxlength', this.format.maxLength + '');
			} else {
				this.renderer.removeAttribute(this.elementRef.nativeElement, 'maxlength');
			}
			if (this.valuelistID) this.instance.writeValue(this.dataProviderID);
		}
		if (changes.dataProviderID) {
			this.currentValue = changes.dataProviderID.currentValue;
		}
	}

	filterValues = (text$: Observable<string>) => {
		const debouncedText$ = text$.pipe(debounceTime(this.filteringDebounce), distinctUntilChanged());
		const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
		const inputFocus$ = this.focus$;

		return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(switchMap(term => {
			if ((this.findmode || (!this.readOnly && this.editable)) && this.valuelistID) {
				const promise = this.valuelistID.filterList(term)
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
									this.dataProviderID = value.realValue;
									this.dataProviderIDChange.emit(this.dataProviderID);
								}
							});
						}
					}
					const popup = this.doc.getElementById(this.instance.popupId);
					if (popup) {
						popup.style.width = this.getFocusElement().clientWidth + 'px';
						if (term == "" && this.dataProviderID) {
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
		if (!this.dataProviderID && (!this.isEditable() || this.findmode)) {
			// need to restore value from UI
			if (this.findmode || !this.valuelistID) {
				this.dataProviderID = this.elementRef.nativeElement.value;
			} else {
				if (this.elementRef.nativeElement.value === this.valuelistID[0]?.displayValue) {
					this.dataProviderID = this.valuelistID[0]?.realValue;
					this.currentValue = this.dataProviderID;
					super.pushUpdate();
				} else {
					this.dataProviderID = this.currentValue;
				}
				return;
			}
		}
		this.currentValue = this.dataProviderID;
		super.pushUpdate();
	}

	isEditable() {
		if (this.servoyApi.isInDesigner()) {
			return true;
		}
		return this.valuelistID && !this.valuelistID.hasRealValues();
	}

	resultFormatter = (result: { displayValue: string; realValue: any }) => {
		// eslint-disable-next-line eqeqeq
		if (result.displayValue === null || result.displayValue == '') return '\u00A0';
		return this.formatService.format(result.displayValue, this.format, false);
	};

	inputFormatter = (result: any) => {
		if (result === this.NULL_VALUE) {
			result = null;
		}
		if (result?.displayValue !== undefined) result = result.displayValue;
		else if (!this.findmode && this.valuelistID?.hasRealValues()) {
			// on purpose test with == so that "2" equals to 2
			const value = this.valuelistID.find((item) => {
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
					this.valuelistID.getDisplayValue(result).subscribe(val => {
						if (val) {
							this.realToDisplay.set(result, val);
							// if dpid is changed do not write the old value
							if (result == this.dataProviderID) this.instance.writeValue(result);
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
		this.currentValue = this.dataProviderID;
	}

	closePopup() {
        this.popupStateService.deactivatePopup(this.getNativeElement().id);
		this.instance.dismissPopup();
	}
}