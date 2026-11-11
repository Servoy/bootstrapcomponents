import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ServoyApiTesting, ServoyPublicTestingModule, IValuelist } from '@servoy/public';
import { ServoyBootstrapTypeahead } from './typeahead';
import { NgbTypeahead, NgbHighlight } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

describe('ServoyBootstrapTypeahead', () => {
    let fixture: ComponentFixture<ServoyBootstrapTypeahead>;
    let component: ServoyBootstrapTypeahead;

    function createMockValuelist(): IValuelist {
        const mockData = [
            { displayValue: 'one', realValue: 1 },
            { displayValue: 'two', realValue: 2 },
            { displayValue: 'three', realValue: 3 },
            { displayValue: 'four', realValue: 4 }
        ] as IValuelist;
        mockData.hasRealValues = () => true;
        mockData.isRealValueDate = () => false;
        mockData.filterList = (value: any) => of(mockData.filter((item: any) => item.displayValue.includes(value)));
        mockData.getDisplayValue = (value: any) => of(mockData.filter((item: any) => item.realValue === value));
        return mockData;
    }

    async function createComponent(overrides: Record<string, any> = {}) {
        fixture = TestBed.createComponent(ServoyBootstrapTypeahead);
        component = fixture.componentInstance;

        const defaults: Record<string, any> = {
            servoyApi: new ServoyApiTesting(),
            enabled: true,
            readOnly: false,
            findmode: false,
            editable: true,
            dataProviderID: 1,
            valuelistID: createMockValuelist(),
            format: { type: 'TEXT' },
            filteringDebounce: 500,
            selectOnEnter: true,
            showAs: 'text',
            ...overrides
        };

        for (const [key, value] of Object.entries(defaults)) {
            if (value !== undefined) {
                fixture.componentRef.setInput(key, value);
            }
        }

        fixture.detectChanges();
        await fixture.whenStable();
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ServoyPublicTestingModule, FormsModule, NgbTypeahead, NgbHighlight, ServoyBootstrapTypeahead],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        await createComponent();
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
        const input = fixture.nativeElement.querySelector('input');
        expect(input).not.toBeNull();
    });

    it('should return a valid native element from getNativeElement()', () => {
        expect(component.getNativeElement()).not.toBeNull();
        expect(component.getNativeElement()).toBeInstanceOf(HTMLElement);
    });

    it('should show the text value', async () => {
        const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
        expect(input.value).toBe('one');
    });

    it('show a style class', async () => {
        const input = fixture.nativeElement.querySelector('input') as HTMLElement;
        expect(input.classList.contains('mystyleclass')).toBe(false);
        fixture.componentRef.setInput('styleClass', 'mystyleclass');
        fixture.detectChanges();
        await fixture.whenStable();
        expect(input.classList.contains('mystyleclass')).toBe(true);
    });

    it('should be disabled', async () => {
        fixture.componentRef.setInput('enabled', false);
        fixture.detectChanges();
        await fixture.whenStable();
        const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
        expect(input.hasAttribute('disabled')).toBe(true);
    });

    it('should handle focus gained event', async () => {
        const onFocusGainedMethodID = vi.fn();
        await createComponent({ onFocusGainedMethodID });
        const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
        input.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
        fixture.detectChanges();
        await fixture.whenStable();
        expect(onFocusGainedMethodID).toHaveBeenCalled();
    });

    it('should handle focus lost event', async () => {
        const onFocusLostMethodID = vi.fn();
        await createComponent({ onFocusLostMethodID });
        const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
        input.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
        fixture.detectChanges();
        input.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
        fixture.detectChanges();
        await fixture.whenStable();
        expect(onFocusLostMethodID).toHaveBeenCalled();
    });

    it('should not emit dataProviderIDChange on programmatic change', async () => {
        const spy = vi.fn();
        component.dataProviderIDChange.subscribe(spy);
        fixture.componentRef.setInput('dataProviderID', 2);
        fixture.detectChanges();
        await fixture.whenStable();
        const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
        expect(input.value).toBe('two');
        expect(spy).not.toHaveBeenCalled();
    });

    describe('inputFormatter find mode value list resolution (SVY-21357)', () => {
        it('resolves to the display value via the synchronous valuelist lookup when in find mode and a match exists', async () => {
            await createComponent({ findmode: true, dataProviderID: 2 });
            const result = component.inputFormatter(2);
            expect(result).toBe('two');
        });

        it('returns empty string and does not call getDisplayValue when in find mode with no synchronous match', async () => {
            const valuelistID = createMockValuelist();
            const getDisplayValueSpy = vi.spyOn(valuelistID, 'getDisplayValue');
            await createComponent({ findmode: true, dataProviderID: 1, valuelistID });

            const result = component.inputFormatter(999);

            expect(result).toBe('');
            expect(getDisplayValueSpy).not.toHaveBeenCalled();
        });

        it('still calls getDisplayValue as an async fallback when not in find mode with no synchronous match', async () => {
            const valuelistID = createMockValuelist();
            const getDisplayValueSpy = vi.spyOn(valuelistID, 'getDisplayValue');
            await createComponent({ findmode: false, dataProviderID: 1, valuelistID });

            component.inputFormatter(999);

            expect(getDisplayValueSpy).toHaveBeenCalledWith(999);
        });
    });

    describe('onKeyDown', () => {
        it('should deactivate the popup on Escape', () => {
            const spy = vi.spyOn((component as any).popupStateService, 'deactivatePopup');
            component.onKeyDown(new KeyboardEvent('keydown', { key: 'Escape' }));
            expect(spy).toHaveBeenCalled();
        });

        it('should ignore other keys', () => {
            const spy = vi.spyOn((component as any).popupStateService, 'deactivatePopup');
            component.onKeyDown(new KeyboardEvent('keydown', { key: 'a' }));
            expect(spy).not.toHaveBeenCalled();
        });
    });

    describe('dataProvider get/set', () => {
        it('should read the current data provider', () => {
            component._dataProviderID.set(2);
            expect(component.dataProvider).toBe(2);
        });

        it('should unwrap an object value to its realValue', () => {
            component.dataProvider = { displayValue: 'three', realValue: 3 } as any;
            expect(component._dataProviderID()).toBe(3);
        });

        it('should set a plain value directly', () => {
            component.dataProvider = 4 as any;
            expect(component._dataProviderID()).toBe(4);
        });
    });

    describe('isTrustedHTML', () => {
        it('should be true for showAs "trusted_html"', async () => {
            await createComponent({ showAs: 'trusted_html' });
            expect(component.isTrustedHTML()).toBe(true);
        });

        it('should be false for plain text', async () => {
            await createComponent({ showAs: 'text' });
            expect(component.isTrustedHTML()).toBe(false);
        });
    });

    describe('isEditable', () => {
        it('should be false when the valuelist has real values', async () => {
            await createComponent({ dataProviderID: 1 });
            expect(component.isEditable()).toBe(false);
        });

        it('should be true when the valuelist has no real values', async () => {
            const valuelistID = createMockValuelist();
            valuelistID.hasRealValues = () => false;
            await createComponent({ valuelistID });
            expect(component.isEditable()).toBe(true);
        });
    });

    describe('resultFormatter', () => {
        it('should return a non-breaking space for an empty display value', () => {
            expect(component.resultFormatter({ displayValue: '', realValue: 1 })).toBe('\u00A0');
            expect(component.resultFormatter({ displayValue: null as any, realValue: 1 })).toBe('\u00A0');
        });

        it('should format a normal display value', () => {
            expect(component.resultFormatter({ displayValue: 'two', realValue: 2 })).toBe('two');
        });
    });

    describe('valueChanged', () => {
        it('should set the data provider from the selected item realValue and emit', () => {
            const spy = vi.fn();
            component.dataProviderIDChange.subscribe(spy);
            component.lastFilteringPromise = null;
            component.valueChanged({ item: { displayValue: 'three', realValue: 3 } } as any);
            expect(component._dataProviderID()).toBe(3);
            expect(spy).toHaveBeenCalledWith(3);
        });

        it('should defer the value while a filtering promise is pending', () => {
            component.lastFilteringPromise = of([]);
            const event: any = { item: { displayValue: 'three', realValue: 3 }, preventDefault: vi.fn() };
            component.valueChanged(event);
            expect(event.preventDefault).toHaveBeenCalled();
            expect(component.valueToApply).toEqual({ displayValue: 'three', realValue: 3 });
        });

        it('should clear the data provider when the item is empty', () => {
            component.lastFilteringPromise = null;
            component.valueChanged({ item: null } as any);
            expect(component._dataProviderID()).toBeNull();
        });
    });

    describe('closePopup / focusLost', () => {
        it('should dismiss the popup and deactivate it on closePopup', () => {
            const dismissSpy = vi.spyOn(component.instance()!, 'dismissPopup');
            const deactivateSpy = vi.spyOn((component as any).popupStateService, 'deactivatePopup');
            component.closePopup();
            expect(dismissSpy).toHaveBeenCalled();
            expect(deactivateSpy).toHaveBeenCalled();
        });

        it('should deactivate the popup on focusLost', () => {
            const spy = vi.spyOn((component as any).popupStateService, 'deactivatePopup');
            component.focusLost();
            expect(spy).toHaveBeenCalled();
        });
    });
});
