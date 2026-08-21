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
});
