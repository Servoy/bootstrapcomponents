import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ServoyApiTesting, ServoyPublicTestingModule, IValuelist } from '@servoy/public';
import { ServoyBootstrapSelect } from './select';
import { ShowDisplayValuePipe } from '../lib/showDisplayValue.pipe';

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
            declarations: [ServoyBootstrapSelect, ShowDisplayValuePipe],
            imports: [ServoyPublicTestingModule, FormsModule],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        await createComponent();
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
        const select = fixture.nativeElement.querySelector('select');
        expect(select).not.toBeNull();
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
});
