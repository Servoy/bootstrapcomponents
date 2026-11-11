import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ServoyApiTesting, ServoyPublicTestingModule, IValuelist } from '@servoy/public';
import { ServoyBootstrapSelect } from './select';
import { ShowDisplayValuePipe } from '../lib/showDisplayValue.pipe';
import { of } from 'rxjs';

describe('ServoyBootstrapSelect', () => {
    let fixture: ComponentFixture<ServoyBootstrapSelect>;
    let component: ServoyBootstrapSelect;

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
            const item = mockData.filter((i: any) => String(i.realValue) === String(value))[0];
            return of(item?.displayValue);
        };
        return mockData;
    }

    async function createComponent(overrides: Record<string, any> = {}) {
        fixture = TestBed.createComponent(ServoyBootstrapSelect);
        component = fixture.componentInstance;

        const defaults: Record<string, any> = {
            servoyApi: new ServoyApiTesting(),
            enabled: true,
            dataProviderID: '1',
            multiselect: false,
            valuelistID: createMockValuelist(),
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
            imports: [ServoyPublicTestingModule, FormsModule, ServoyBootstrapSelect, ShowDisplayValuePipe],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        await createComponent();
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
        const select = fixture.nativeElement.querySelector('select');
        expect(select).not.toBeNull();
    });

    it('should return a valid native element from getNativeElement()', () => {
        expect(component.getNativeElement()).not.toBeNull();
        expect(component.getNativeElement()).toBeInstanceOf(HTMLElement);
    });

    it('show a style class', async () => {
        const select = fixture.nativeElement.querySelector('select') as HTMLElement;
        expect(select.classList.contains('mystyleclass')).toBe(false);
        fixture.componentRef.setInput('styleClass', 'mystyleclass');
        fixture.detectChanges();
        await fixture.whenStable();
        expect(select.classList.contains('mystyleclass')).toBe(true);
    });

    it('show more than 1 style class', async () => {
        fixture.componentRef.setInput('styleClass', 'classA classB');
        fixture.detectChanges();
        await fixture.whenStable();
        const select = fixture.nativeElement.querySelector('select') as HTMLElement;
        expect(select.classList.contains('classA')).toBe(true);
        expect(select.classList.contains('classB')).toBe(true);
    });

    it('should handle enabled state', async () => {
        const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
        expect(select.hasAttribute('disabled')).toBe(false);
        fixture.componentRef.setInput('enabled', false);
        fixture.detectChanges();
        await fixture.whenStable();
        expect(select.hasAttribute('disabled')).toBe(true);
    });

    it('should handle focus gained event', async () => {
        const onFocusGainedMethodID = vi.fn();
        await createComponent({ onFocusGainedMethodID });
        const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
        select.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
        fixture.detectChanges();
        await fixture.whenStable();
        expect(onFocusGainedMethodID).toHaveBeenCalled();
    });

    it('should handle focus lost event', async () => {
        const onFocusLostMethodID = vi.fn();
        await createComponent({ onFocusLostMethodID });
        const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
        select.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
        fixture.detectChanges();
        select.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
        fixture.detectChanges();
        await fixture.whenStable();
        expect(onFocusLostMethodID).toHaveBeenCalled();
    });

    it('should not allow multiselect by default', async () => {
        const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
        expect(select.hasAttribute('multiple')).toBe(false);
    });

    describe('showPlaceholder', () => {
        it('should not show a placeholder when there is no placeholder text', async () => {
            await createComponent({ dataProviderID: null, placeholderText: undefined });
            expect(component.showPlaceholder()).toBe(false);
        });

        it('should show the placeholder when text is set and the data provider is null', async () => {
            await createComponent({ dataProviderID: null, placeholderText: 'Pick one' });
            expect(component.showPlaceholder()).toBe(true);
        });

        it('should not show the placeholder when a value is selected', async () => {
            await createComponent({ dataProviderID: '1', placeholderText: 'Pick one' });
            expect(component.showPlaceholder()).toBe(false);
        });
    });

    describe('isDPinValuelist', () => {
        it('should return true when a single value is in the valuelist', async () => {
            await createComponent({ dataProviderID: 2 });
            expect(component.isDPinValuelist()).toBe(true);
        });

        it('should return false when a single value is not in the valuelist', async () => {
            await createComponent({ dataProviderID: 99 });
            expect(component.isDPinValuelist()).toBe(false);
        });

        it('should return true when every multiselect value is in the valuelist', async () => {
            await createComponent({ multiselect: true, dataProviderID: ['1', '2'] });
            expect(component.isDPinValuelist()).toBe(true);
        });

        it('should return false when a multiselect value is missing from the valuelist', async () => {
            // multiselect with a missing value; set the signal directly rather than
            // via detectChanges, because the template would then render disabledDP()
            // which expects a newline string in a different (single-select) shape.
            await createComponent({ multiselect: true, dataProviderID: ['1'] });
            component._dataProviderID.set(['1', '99']);
            expect(component.isDPinValuelist()).toBe(false);
        });

        it('should return false when there is no data provider', async () => {
            await createComponent({ dataProviderID: null });
            expect(component.isDPinValuelist()).toBe(false);
        });
    });

    describe('disabledDP', () => {
        it('should list the newline-separated values that are not in the valuelist', async () => {
            await createComponent({ dataProviderID: '1\n99\n2' });
            expect(component.disabledDP()).toEqual(['99']);
        });

        it('should return an empty array when all values are known', async () => {
            await createComponent({ dataProviderID: '1\n2' });
            expect(component.disabledDP()).toEqual([]);
        });
    });

    describe('onChange / updateDataprovider (single select)', () => {
        it('should set the data provider and push the update', async () => {
            component.onChange(new Event('change'), '3');
            expect(component._dataProviderID()).toBe('3');
        });

        it('should treat the string "null" as a cleared value', async () => {
            component.onChange(new Event('change'), 'null');
            expect(component._dataProviderID()).toBeNull();
        });

        it('should invoke the onAction handler when one is set', async () => {
            const onAction = vi.fn();
            await createComponent({ onActionMethodID: onAction });
            component.onChange(new Event('change'), '2');
            expect(onAction).toHaveBeenCalled();
        });
    });

    describe('updateDataprovider (multiselect)', () => {
        it('should map the selected display values to their real values as strings', async () => {
            await createComponent({ multiselect: true, dataProviderID: [] });
            component.selectedValues = ['1', '3'];
            component.updateDataprovider();
            expect(component._dataProviderID()).toEqual(['1', '3']);
        });

        it('should set the data provider to null when nothing is selected', async () => {
            await createComponent({ multiselect: true, dataProviderID: [] });
            component.selectedValues = [];
            component.updateDataprovider();
            expect(component._dataProviderID()).toBeNull();
        });

        it('should keep selectedValues in sync when the data provider changes', async () => {
            await createComponent({ multiselect: true, dataProviderID: ['1', '2'] });
            fixture.componentRef.setInput('dataProviderID', ['3']);
            fixture.detectChanges();
            await fixture.whenStable();
            expect(component.selectedValues).toEqual(['3']);
        });
    });

    describe('multiselect rendering', () => {
        it('should render a multiple select when multiselect is true', async () => {
            await createComponent({ multiselect: true, dataProviderID: ['1'] });
            const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
            expect(select.hasAttribute('multiple')).toBe(true);
        });
    });

    describe('toString', () => {
        it('should stringify any value', () => {
            expect(component.toString(5)).toBe('5');
            expect(component.toString(null)).toBe('null');
        });
    });
});
