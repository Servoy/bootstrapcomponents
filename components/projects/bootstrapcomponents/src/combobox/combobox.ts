import { Component, Renderer2, Input, SimpleChanges, ChangeDetectorRef, ViewChild, ViewChildren, QueryList, ElementRef, HostListener, ChangeDetectionStrategy, Inject, DOCUMENT } from '@angular/core';
import { ServoyBootstrapBasefield } from '../bts_basefield';
import { Format, FormattingService, IValuelist, ServoyPublicService, PopupStateService } from '@servoy/public';
import { NgbDropdownItem, NgbTooltip, NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

import { Subscription } from 'rxjs';

@Component({
    selector: 'bootstrapcomponents-combobox',
    templateUrl: './combobox.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ServoyBootstrapCombobox extends ServoyBootstrapBasefield<HTMLDivElement> {

    @Input() format: Format;
    @Input() showAs: string;
    @Input() valuelistID: IValuelist;
    @Input() appendToBody: boolean;

    @ViewChildren(NgbDropdownItem) menuItems: QueryList<NgbDropdownItem>;
    @ViewChild('input') input: ElementRef<HTMLButtonElement>;
    @ViewChild('dropdown') dropdownElement: ElementRef<HTMLElement>;
    @ViewChild(NgbDropdown) comboboxDropdown: NgbDropdown;
    @ViewChild('tooltip') tooltip: NgbTooltip;

    formattedValue: any;
    valueComparator: (value: { displayValue: any; realValue: any }) => boolean;
    openState = false;
    keyboardSelectValue: string = null;
    lastSelectValue: string = null;
    firstItemFound = false;
    placeholderClass = null;
    private skipFocus = false;
    private valuelistDisplayValueSubscription: Subscription = null;
    private showPopupOnFocusGain = false;

    constructor(renderer: Renderer2, protected cdRef: ChangeDetectorRef, protected formatService: FormattingService, 
        @Inject(DOCUMENT) doc: Document, protected servoyService: ServoyPublicService, protected popupStateService: PopupStateService) {
        super(renderer, cdRef, doc);
    }

    @HostListener('keydown', ['$event'])
    handleKeyDown(event: KeyboardEvent) {
        event.stopPropagation();
        this.lastSelectValue = null;
        this.firstItemFound = false;
        if (this.isPrintableChar(event.key)) {
            if (this.doc.activeElement === this.getFocusElement() && !this.comboboxDropdown.isOpen()) {
                this.comboboxDropdown.open();
                this.popupStateService.activatePopup(this.getNativeElement().id);
            }
            if (event.key !== 'Backspace') this.keyboardSelectValue = (this.keyboardSelectValue ? this.keyboardSelectValue : '') + event.key;
            else this.keyboardSelectValue = this.keyboardSelectValue ? this.keyboardSelectValue.slice(0, -1) : '';
            this.lastSelectValue = this.keyboardSelectValue.slice();
            if (!this.lastSelectValue) this.closeTooltip();
            else this.refreshTooltip();

            this.cdRef.detectChanges();
            this.scrollToFirstMatchingItem();
        } else {
            if (this.keyboardSelectValue) this.lastSelectValue = this.keyboardSelectValue.slice();
            if (!this.lastSelectValue) this.closeTooltip();
            else this.refreshTooltip();

            this.cdRef.detectChanges();
            this.scrollToFirstMatchingItem();
        }
        
        if (event.key === 'Escape') {
            this.openChange(false);
        }
    }

    svyOnInit() {
        let showPopup = this.servoyApi.getClientProperty('Combobox.showPopupOnFocusGain');
        if (showPopup === null || showPopup === undefined) {
            showPopup = this.servoyService.getUIProperty('Combobox.showPopupOnFocusGain');
        }
        if (showPopup !== null && showPopup !== undefined) {
            this.showPopupOnFocusGain = showPopup;
        }
        super.svyOnInit();
        this.tooltip.autoClose = false;
    }

    showAsHtml() {
        return (this.showAs === 'html' || this.showAs === 'trusted_html');
    }

    isTrustedHTML() {
        if (this.showAs === 'trusted_html') {
            return true;
        }
        return false;
    }

    refreshTooltip() {
        if (!this.tooltip.isOpen()) {
            this.tooltip.open();
        }
    }

    handleTooltip(event: KeyboardEvent) {
        this.tooltip.autoClose = false;
        this.tooltip.ngbTooltip = 'This is the CHANGED text';
        if (this.tooltip.isOpen()) {
            this.tooltip.close();
        } else {
            this.tooltip.open();
        }
    }

    isPrintableChar(key: string): boolean {
        const nonPrintableValue = [
            'Alt', 'AltGraph', 'CapsLock', 'Fn', 'Meta', 'NumLock', 'ScrollLock', 'Command', 'Shift',
            'Enter', 'Tab', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'End', 'Home',
            'PageUp', 'PageDown', 'Delete', 'Control', 'Insert', 'Del', 'Escape',
            'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'Dead',
            'AudioVolumeMute', 'AudioVolumeDown', 'AudioVolumeUp', 'LaunchApplication2', 'Unidentified', 'ContextMenu'
        ];
        if (nonPrintableValue.includes(key)) {
            const keysThatCloseTooltip = [
                'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'End', 'Home',
                'PageUp', 'PageDown', 'Delete', 'Del', 'Tab'
            ];
            if (keysThatCloseTooltip.includes(key)) this.closeTooltip();
            return false;
        }
        return !(key.match(/[\p{Cc}\p{Cn}\p{Cs}]+/gu));
    }

    getDropDownWidth() {
        return this.input?.nativeElement?.clientWidth;
    }

    getFocusElement() {
        return this.input.nativeElement;
    }

    requestFocus(mustExecuteOnFocusGainedMethod: boolean): void {
        super.requestFocus(mustExecuteOnFocusGainedMethod);
        if (this.showPopupOnFocusGain) {
            this.comboboxDropdown.open();
            this.popupStateService.activatePopup(this.getNativeElement().id);
        }
    }

    attachFocusListeners(nativeElement: HTMLElement) {
        let skipPopupOpen = false;
        if (this.onFocusGainedMethodID || this.showPopupOnFocusGain)
            this.renderer.listen(nativeElement, 'focus', (e) => {
                if (this.onFocusGainedMethodID && !this.skipFocus && this.mustExecuteOnFocus) this.onFocusGainedMethodID(e);
                if (!skipPopupOpen && this.showPopupOnFocusGain && !this.comboboxDropdown.isOpen()) {
                    this.comboboxDropdown.open();
                    this.popupStateService.activatePopup(this.getNativeElement().id);
                }
                this.skipFocus = false;
                skipPopupOpen = false;
                this.mustExecuteOnFocus = true;
            });
        if (this.showPopupOnFocusGain) {
            this.renderer.listen(nativeElement, 'mousedown', (e) => {
                if (this.doc.activeElement !== nativeElement && !this.comboboxDropdown.isOpen()) {
                    // ngbDropdownToggle on mouse click will open the dropdown, so ignore the next focus
                    skipPopupOpen = true;
                }
            });
        }
        if (this.onFocusLostMethodID)
            this.renderer.listen(nativeElement, 'blur', (e) => {
                if (!this.openState) this.onFocusLostMethodID(e);
            });
    }

    openChange(state: boolean) {
        this.openState = state;
        this.skipFocus = true;
        if (state) {
            this.popupStateService.activatePopup(this.getNativeElement().id);
            setTimeout(() => {
                const item = this.menuItems.find((element) => element.nativeElement.classList.contains('active'));
                if (item) {
                    item.nativeElement.focus();
                }
            });
        } else {
            this.popupStateService.deactivatePopup(this.getNativeElement().id);
            this.closeTooltip();
            const nativeElementBtn = this.elementRef.nativeElement.firstElementChild;
            if (this.doc.activeElement !== nativeElementBtn) {
                const event = new Event('blur');
                nativeElementBtn.dispatchEvent(event);
            }
            if (this.comboboxDropdown.isOpen()) {
                this.comboboxDropdown.close();
            }
            this.skipFocus = false;
        }
    }

    svyOnChanges(changes: SimpleChanges) {
        this.valueComparator = this.valuelistID && this.valuelistID.isRealValueDate() ? this.dateValueCompare : this.valueCompare;
        if (changes['dataProviderID'] && this.findmode) {
            this.formattedValue = this.dataProviderID;
        } else if ((changes['dataProviderID'] || changes['valuelistID']) && this.valuelistID) {
            if (this.valuelistDisplayValueSubscription !== null) {
                this.valuelistDisplayValueSubscription.unsubscribe();
                this.valuelistDisplayValueSubscription = null;
            }
            // eslint-disable-next-line eqeqeq
            const valueListElem = this.valuelistID.find(this.valueComparator);
            if (valueListElem) this.formattedValue = this.formatService.format(valueListElem.displayValue, this.format, false);
            else {
                if (!this.valuelistID.hasRealValues())
                    this.formattedValue = this.formatService.format(this.dataProviderID, this.format, false);
                else {
                    this.formattedValue = null;
                    this.valuelistDisplayValueSubscription = this.valuelistID.getDisplayValue(this.dataProviderID).subscribe(val => {
                        this.valuelistDisplayValueSubscription = null;
                        this.formattedValue = val;
                        this.cdRef.detectChanges();
                    });
                }
            }
        }
        if (this.formattedValue === '' || this.formattedValue === null || this.formattedValue === undefined) {
            if (this.placeholderText) {
                this.formattedValue = this.placeholderText;
                this.placeholderClass = 'bts-combobox-placeholder';
            }
        }
        if (changes['styleClass']) {
            const change = changes['styleClass'];
            if (change.previousValue) {
                const array = change.previousValue.trim().split(' ');
                array.filter((element: string) => element !== '').forEach((element: string) => this.renderer.removeClass(this.dropdownElement.nativeElement, element));
            }
            if (change.currentValue) {
                const array = change.currentValue.trim().split(' ');
                array.filter((element: string) => element !== '').forEach((element: string) => this.renderer.addClass(this.dropdownElement.nativeElement, element));
            }
        }

        super.svyOnChanges(changes);

        if (changes.readOnly || changes.enabled) {
            if (this.readOnly || !this.enabled) {
                this.renderer.setAttribute(this.getFocusElement(), 'disabled', 'disabled');
            } else {
                this.renderer.removeAttribute(this.getFocusElement(), 'disabled');
            }
        }
    }

    updateValue(realValue: any, event: Event) {
        this.dataProviderID = realValue;
        this.dataProviderIDChange.emit(this.dataProviderID);
        this.placeholderClass = null;
        if (this.onActionMethodID) {
            this.onActionMethodID(event, this.getDataTarget(event));
        }
    }

    getRemainingValueBefore(value: any): any {
        let retValue = '';
        const valIndex = this.lastSelectValue ? value.toLowerCase().indexOf(this.lastSelectValue.toLowerCase()) : -1;
        if (this.openState && value && valIndex >= 0) {
            retValue = value.substring(0, valIndex);
        }
        return retValue;
    }

    getStrongValue(value: any): any {
        let retValue = '';
        const valIndex = this.lastSelectValue ? value.toLowerCase().indexOf(this.lastSelectValue.toLowerCase()) : -1;
        if (this.openState && value && valIndex >= 0) {
            retValue = value.substring(valIndex, (valIndex + this.lastSelectValue.length));
        }
        return retValue;
    }

    getRemainingValueAfter(value: any): any {
        let retValue = value;
        const valIndex = this.lastSelectValue ? value.toLowerCase().indexOf(this.lastSelectValue.toLowerCase()) : -1;
        if (this.openState && value && valIndex >= 0) {
            retValue = value.substring(valIndex + this.lastSelectValue.length);
        }
        return retValue;
    }
    scrollToFirstMatchingItem() {
        if (this.openState && this.lastSelectValue) {
            for (const item of this.menuItems) {
                if (item.nativeElement.innerText.toLowerCase().indexOf(this.lastSelectValue.toLowerCase()) >= 0 && !this.firstItemFound) {
                    this.firstItemFound = true;
                    item.nativeElement.focus();
                }
            }
        }
    }

    private closeTooltip() {
        this.keyboardSelectValue = null;
        this.lastSelectValue = null;
        this.tooltip.close();
    }

    // eslint-disable-next-line eqeqeq
    private valueCompare = (valueListValue: { displayValue: any; realValue: any }): boolean => valueListValue.realValue == this.dataProviderID;

    private dateValueCompare = (valueListValue: { displayValue: any; realValue: Date }): boolean => {
        if (this.dataProviderID && valueListValue.realValue) {
            return valueListValue.realValue.getTime() === this.dataProviderID.getTime();
        }
        return false;
    };
}
