import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ServoyApiTesting, ServoyPublicTestingModule, IValuelist } from '@servoy/public';
import { ServoyBootstrapCombobox } from './combobox';
import { NgbDropdown, NgbDropdownItem, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

describe('ServoyBootstrapCombobox', () => {
    let fixture: ComponentFixture<ServoyBootstrapCombobox>;
    let component: ServoyBootstrapCombobox;

    function createMockValuelist(): IValuelist {
        const mockData = [
            { displayValue: 'one', realValue: 1 },
            { displayValue: 'two', realValue: 2 },
            { displayValue: 'three', realValue: 3 },
            { displayValue: 'four', realValue: 4 }
        ] as IValuelist;
        mockData.hasRealValues = () => true;
        mockData.isRealValueDate = () => false;
        mockData.getDisplayValue = (value: any) => {
            const item = mockData.filter((i: any) => i.realValue === value)[0];
            return of(item?.displayValue);
        };
        return mockData;
    }

    async function createComponent(overrides: Record<string, any> = {}) {
        fixture = TestBed.createComponent(ServoyBootstrapCombobox);
        component = fixture.componentInstance;

        const defaults: Record<string, any> = {
            servoyApi: new ServoyApiTesting(),
            enabled: true,
            dataProviderID: 1,
            valuelistID: createMockValuelist(),
            format: { type: 'TEXT' },
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
            imports: [ServoyPublicTestingModule, FormsModule, NgbDropdown, NgbDropdownItem, NgbTooltip, ServoyBootstrapCombobox],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        await createComponent();
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
        const btn = fixture.nativeElement.querySelector('button');
        expect(btn).not.toBeNull();
    });

    it('should return a valid native element from getNativeElement()', () => {
        expect(component.getNativeElement()).not.toBeNull();
        expect(component.getNativeElement()).toBeInstanceOf(HTMLElement);
    });

    it('should show the text value', async () => {
        const span = fixture.nativeElement.querySelector('button span');
        expect(span.textContent).toBe('one');
    });

    it('show a style class', async () => {
        const el = fixture.nativeElement.querySelector('.bts-combobox-container') as HTMLElement;
        expect(el.classList.contains('mystyleclass')).toBe(false);
        fixture.componentRef.setInput('styleClass', 'mystyleclass');
        fixture.detectChanges();
        await fixture.whenStable();
        expect(el.classList.contains('mystyleclass')).toBe(true);
    });

    it('show more than 1 style class', async () => {
        fixture.componentRef.setInput('styleClass', 'classA classB');
        fixture.detectChanges();
        await fixture.whenStable();
        const el = fixture.nativeElement.querySelector('.bts-combobox-container') as HTMLElement;
        expect(el.classList.contains('classA')).toBe(true);
        expect(el.classList.contains('classB')).toBe(true);
    });

    it('should be disabled', async () => {
        fixture.componentRef.setInput('enabled', false);
        fixture.detectChanges();
        await fixture.whenStable();
        const btn = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
        expect(btn.hasAttribute('disabled')).toBe(true);
    });

    it('should not emit dataProviderIDChange on programmatic change', async () => {
        const spy = vi.fn();
        component.dataProviderIDChange.subscribe(spy);
        fixture.componentRef.setInput('dataProviderID', 2);
        fixture.detectChanges();
        await fixture.whenStable();
        const span = fixture.nativeElement.querySelector('button span');
        expect(span.textContent).toBe('two');
        expect(spy).not.toHaveBeenCalled();
    });

    it('should update formattedValue when dataProviderID changes', async () => {
        fixture.componentRef.setInput('dataProviderID', 3);
        fixture.detectChanges();
        await fixture.whenStable();
        const span = fixture.nativeElement.querySelector('button span');
        expect(span.textContent).toBe('three');
    });

    it('should show placeholder when dataProviderID is null', async () => {
        await createComponent({ dataProviderID: null, placeholderText: 'Select...' });
        const span = fixture.nativeElement.querySelector('button span');
        expect(span.textContent).toBe('Select...');
        expect(span.classList.contains('bts-combobox-placeholder')).toBe(true);
    });

    it('should clear placeholderClass after selecting a value', async () => {
        await createComponent({ dataProviderID: null, placeholderText: 'Select...' });
        const span = fixture.nativeElement.querySelector('button span') as HTMLElement;
        expect(span.classList.contains('bts-combobox-placeholder')).toBe(true);
        component.updateValue(2, new Event('click'));
        fixture.detectChanges();
        await fixture.whenStable();
        expect(component.placeholderClass()).toBeNull();
    });

    describe('find mode value list resolution (SVY-21357)', () => {
        it('should resolve formattedValue via the valuelist display value when findmode is true', async () => {
            await createComponent({ findmode: true, dataProviderID: 2 });
            const span = fixture.nativeElement.querySelector('button span');
            expect(span.textContent).toBe('two');
        });

        it('should update formattedValue via the valuelist when dataProviderID changes while in find mode', async () => {
            await createComponent({ findmode: true, dataProviderID: 1 });
            const span = fixture.nativeElement.querySelector('button span');
            expect(span.textContent).toBe('one');
            fixture.componentRef.setInput('dataProviderID', 3);
            fixture.detectChanges();
            await fixture.whenStable();
            expect(span.textContent).toBe('three');
        });

        it('should still show placeholder text when there is no valuelist, even in find mode (third branch unaffected)', async () => {
            await createComponent({ findmode: true, valuelistID: undefined, dataProviderID: null, placeholderText: 'Select...' });
            const span = fixture.nativeElement.querySelector('button span');
            expect(span.textContent).toBe('Select...');
            expect(span.classList.contains('bts-combobox-placeholder')).toBe(true);
        });

        it('should resolve formattedValue via the valuelist when not in find mode (regression guard)', async () => {
            await createComponent({ findmode: false, dataProviderID: 2 });
            const span = fixture.nativeElement.querySelector('button span');
            expect(span.textContent).toBe('two');
        });
    });

    describe('dropdown width NG0100 fix (SVY-21485)', () => {
        function mockToggleWidth(width: number) {
            const toggle = component.input()!.nativeElement;
            const descriptor = Object.getOwnPropertyDescriptor(toggle, 'clientWidth');
            Object.defineProperty(toggle, 'clientWidth', { configurable: true, get: () => width });
            return () => {
                if (descriptor) Object.defineProperty(toggle, 'clientWidth', descriptor);
                else delete (toggle as any).clientWidth;
            };
        }

        it('should not populate dropDownWidth before the dropdown is opened', () => {
            expect(component.dropDownWidth()).toBeUndefined();
        });

        it('should populate dropDownWidth from the toggle width on openChange(true)', () => {
            const restore = mockToggleWidth(137);
            component.openChange(true);
            expect(component.dropDownWidth()).toBe(137);
            restore();
        });

        it('should bind the menu width to dropDownWidth() and not re-read live clientWidth during change detection', () => {
            const restore = mockToggleWidth(137);
            component.openChange(true);
            fixture.detectChanges();
            const menu = fixture.nativeElement.querySelector('[ngbDropdownMenu]') as HTMLElement;
            expect(menu.style.width).toBe('137px');

            const laterRestore = mockToggleWidth(200);
            fixture.detectChanges();
            expect(menu.style.width).toBe('137px');
            laterRestore();
            restore();
        });

        it('should not throw and should set openState false on openChange(false)', () => {
            component.openChange(true);
            expect(component.openState()).toBe(true);
            expect(() => component.openChange(false)).not.toThrow();
            expect(component.openState()).toBe(false);
        });

        it('should refresh dropDownWidth on a subsequent open', () => {
            const restore1 = mockToggleWidth(120);
            component.openChange(true);
            expect(component.dropDownWidth()).toBe(120);
            restore1();

            component.openChange(false);

            const restore2 = mockToggleWidth(160);
            component.openChange(true);
            expect(component.dropDownWidth()).toBe(160);
            restore2();
        });
    });

    describe('showAs / trusted html', () => {
        it('should report html rendering for showAs "html"', async () => {
            await createComponent({ showAs: 'html' });
            expect(component.showAsHtml()).toBe(true);
            expect(component.isTrustedHTML()).toBe(false);
        });

        it('should report html and trusted for showAs "trusted_html"', async () => {
            await createComponent({ showAs: 'trusted_html' });
            expect(component.showAsHtml()).toBe(true);
            expect(component.isTrustedHTML()).toBe(true);
        });

        it('should not report html for a plain text showAs', async () => {
            await createComponent({ showAs: 'text' });
            expect(component.showAsHtml()).toBe(false);
            expect(component.isTrustedHTML()).toBe(false);
        });
    });

    describe('isPrintableChar', () => {
        it('should treat a normal letter as printable', () => {
            expect(component.isPrintableChar('a')).toBe(true);
        });

        it('should treat navigation and modifier keys as non-printable', () => {
            for (const key of ['Shift', 'Enter', 'Tab', 'ArrowDown', 'Escape', 'F1', 'Meta']) {
                expect(component.isPrintableChar(key)).toBe(false);
            }
        });

        it('should close the tooltip for keys that dismiss it', () => {
            const spy = vi.spyOn(component.tooltip()!, 'close');
            expect(component.isPrintableChar('ArrowDown')).toBe(false);
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('handleKeyDown type-ahead', () => {
        it('should accumulate printable characters into the select value and open the dropdown', () => {
            vi.spyOn(component.comboboxDropdown()!, 'isOpen').mockReturnValue(false);
            const openSpy = vi.spyOn(component.comboboxDropdown()!, 'open');
            // activeElement must be the focus element for the open branch
            component.getFocusElement().focus();

            component.handleKeyDown(new KeyboardEvent('keydown', { key: 't' }));
            component.handleKeyDown(new KeyboardEvent('keydown', { key: 'w' }));

            expect(component.lastSelectValue()).toBe('tw');
            expect(openSpy).toHaveBeenCalled();
        });

        it('should remove the last character on Backspace', () => {
            component.getFocusElement().focus();
            component.handleKeyDown(new KeyboardEvent('keydown', { key: 'a' }));
            component.handleKeyDown(new KeyboardEvent('keydown', { key: 'b' }));
            expect(component.lastSelectValue()).toBe('ab');
            component.handleKeyDown(new KeyboardEvent('keydown', { key: 'Backspace' }));
            expect(component.lastSelectValue()).toBe('a');
        });

        it('should close the dropdown on Escape', () => {
            const spy = vi.spyOn(component, 'openChange');
            component.handleKeyDown(new KeyboardEvent('keydown', { key: 'Escape' }));
            expect(spy).toHaveBeenCalledWith(false);
        });
    });

    describe('highlight getters', () => {
        beforeEach(() => {
            component.openState.set(true);
            component.lastSelectValue.set('hr');
        });

        it('should split a matching value into before / strong / after parts', () => {
            expect(component.getRemainingValueBefore('three')).toBe('t');
            expect(component.getStrongValue('three')).toBe('hr');
            expect(component.getRemainingValueAfter('three')).toBe('ee');
        });

        it('should return empty highlight parts when there is no match', () => {
            expect(component.getRemainingValueBefore('one')).toBe('');
            expect(component.getStrongValue('one')).toBe('');
            expect(component.getRemainingValueAfter('one')).toBe('one');
        });

        it('should not highlight when the dropdown is closed', () => {
            component.openState.set(false);
            expect(component.getRemainingValueBefore('three')).toBe('');
            expect(component.getStrongValue('three')).toBe('');
            expect(component.getRemainingValueAfter('three')).toBe('three');
        });
    });

    describe('updateValue', () => {
        it('should set the data provider, emit the change and clear the placeholder', () => {
            const spy = vi.fn();
            component.dataProviderIDChange.subscribe(spy);
            component.placeholderClass.set('bts-combobox-placeholder');

            component.updateValue(3, new Event('click'));

            expect(component._dataProviderID()).toBe(3);
            expect(spy).toHaveBeenCalledWith(3);
            expect(component.placeholderClass()).toBeNull();
        });

        it('should invoke the onAction handler when one is set', async () => {
            const onAction = vi.fn();
            await createComponent({ onActionMethodID: onAction });
            const event = new Event('click');
            component.updateValue(2, event);
            expect(onAction).toHaveBeenCalled();
        });
    });
});
