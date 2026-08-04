import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ServoyApiTesting, ServoyPublicTestingModule, IValuelist } from '@servoy/public';
import { ServoyFloatLabelBootstrapCombobox } from './floatlabelcombobox';
import { NgbDropdown, NgbDropdownItem, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

describe('ServoyFloatLabelBootstrapCombobox', () => {
    let fixture: ComponentFixture<ServoyFloatLabelBootstrapCombobox>;
    let component: ServoyFloatLabelBootstrapCombobox;

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
        fixture = TestBed.createComponent(ServoyFloatLabelBootstrapCombobox);
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
            declarations: [ServoyFloatLabelBootstrapCombobox],
            imports: [ServoyPublicTestingModule, FormsModule, NgbDropdown, NgbDropdownItem, NgbTooltip],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        await createComponent();
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
        const btn = fixture.nativeElement.querySelector('button');
        expect(btn).not.toBeNull();
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

    it('should show floatLabelText in the label element', async () => {
        fixture.componentRef.setInput('floatLabelText', 'Pick one');
        fixture.detectChanges();
        await fixture.whenStable();
        const label = fixture.nativeElement.querySelector('label');
        if (label) {
            expect(label.textContent).toBe('Pick one');
        }
    });
});
