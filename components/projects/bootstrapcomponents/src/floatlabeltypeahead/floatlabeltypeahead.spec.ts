import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ServoyApiTesting, ServoyPublicTestingModule, IValuelist } from '@servoy/public';
import { ServoyFloatLabelBootstrapTypeahead } from './floatlabeltypeahead';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

describe('ServoyFloatLabelBootstrapTypeahead', () => {
    let fixture: ComponentFixture<ServoyFloatLabelBootstrapTypeahead>;
    let component: ServoyFloatLabelBootstrapTypeahead;

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
        fixture = TestBed.createComponent(ServoyFloatLabelBootstrapTypeahead);
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
            imports: [ServoyPublicTestingModule, FormsModule, NgbTypeahead, ServoyFloatLabelBootstrapTypeahead],
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

    describe('errorShow two-way binding', () => {
        it('should reflect a server-set errorShow value in the rendered error text', async () => {
            await createComponent({ errorMessage: 'invalid value' });
            expect(fixture.nativeElement.querySelector('.bts-floatlabeltypeahead-error-text')).toBeNull();

            fixture.componentRef.setInput('errorShow', true);
            fixture.detectChanges();
            await fixture.whenStable();

            const errorEl = fixture.nativeElement.querySelector('.bts-floatlabeltypeahead-error-text');
            expect(errorEl).not.toBeNull();
            expect(errorEl.textContent).toContain('invalid value');
        });

        it('should hide the error text when a server-set errorShow becomes false', async () => {
            await createComponent({ errorMessage: 'invalid value', errorShow: true });
            expect(fixture.nativeElement.querySelector('.bts-floatlabeltypeahead-error-text')).not.toBeNull();

            fixture.componentRef.setInput('errorShow', false);
            fixture.detectChanges();
            await fixture.whenStable();

            expect(fixture.nativeElement.querySelector('.bts-floatlabeltypeahead-error-text')).toBeNull();
        });

        it('should update the model and emit errorShowChange when the client toggles the error on', async () => {
            await createComponent({ errorMessage: 'invalid value' });
            const spy = vi.fn();
            component.errorShow.subscribe(spy);

            component.toggleErrorMessage(true);
            fixture.detectChanges();
            await fixture.whenStable();

            expect(component.errorShow()).toBe(true);
            expect(spy).toHaveBeenCalledWith(true);
        });

        it('should update the model and emit errorShowChange when the client toggles the error off', async () => {
            await createComponent({ errorMessage: 'invalid value', errorShow: true });
            const spy = vi.fn();
            component.errorShow.subscribe(spy);

            component.toggleErrorMessage(false);
            fixture.detectChanges();
            await fixture.whenStable();

            expect(component.errorShow()).toBe(false);
            expect(spy).toHaveBeenCalledWith(false);
        });
    });
});
