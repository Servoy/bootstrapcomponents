import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { ServoyFloatLabelBootstrapCalendar } from './floatlabelcalendar';

describe('ServoyFloatLabelBootstrapCalendar', () => {
    let fixture: ComponentFixture<ServoyFloatLabelBootstrapCalendar>;
    let component: ServoyFloatLabelBootstrapCalendar;

    async function createComponent(overrides: Record<string, any> = {}) {
        fixture = TestBed.createComponent(ServoyFloatLabelBootstrapCalendar);
        component = fixture.componentInstance;

        const defaults: Record<string, any> = {
            servoyApi: new ServoyApiTesting(),
            enabled: true,
            readOnly: false,
            format: { type: 'DATETIME', display: 'dd-MM-yyyy' },
            selectOnEnter: false,
            dataProviderID: new Date(2025, 10, 11),
            theme: 'dark',
            pickerOnly: false,
            calendarWeeks: false,
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
            imports: [ServoyPublicTestingModule, FormsModule, ServoyFloatLabelBootstrapCalendar],
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

    it('show a style class', async () => {
        const input = fixture.nativeElement.querySelector('input') as HTMLElement;
        expect(input.classList.contains('mystyleclass')).toBe(false);
        fixture.componentRef.setInput('styleClass', 'mystyleclass');
        fixture.detectChanges();
        await fixture.whenStable();
        expect(input.classList.contains('mystyleclass')).toBe(true);
    });

    it('should be read-only', async () => {
        fixture.componentRef.setInput('readOnly', true);
        fixture.detectChanges();
        await fixture.whenStable();
        const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
        expect(input.hasAttribute('readonly')).toBe(true);
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

    describe('errorShow two-way binding', () => {
        it('should reflect a server-set errorShow value in the rendered error text', async () => {
            await createComponent({ errorMessage: 'invalid date' });
            expect(fixture.nativeElement.querySelector('.bts-floatlabelcalendar-error-text')).toBeNull();

            fixture.componentRef.setInput('errorShow', true);
            fixture.detectChanges();
            await fixture.whenStable();

            const errorEl = fixture.nativeElement.querySelector('.bts-floatlabelcalendar-error-text');
            expect(errorEl).not.toBeNull();
            expect(errorEl.textContent).toContain('invalid date');
        });

        it('should hide the error text when a server-set errorShow becomes false', async () => {
            await createComponent({ errorMessage: 'invalid date', errorShow: true });
            expect(fixture.nativeElement.querySelector('.bts-floatlabelcalendar-error-text')).not.toBeNull();

            fixture.componentRef.setInput('errorShow', false);
            fixture.detectChanges();
            await fixture.whenStable();

            expect(fixture.nativeElement.querySelector('.bts-floatlabelcalendar-error-text')).toBeNull();
        });

        it('should update the model and emit errorShowChange when the client toggles the error on', async () => {
            await createComponent({ errorMessage: 'invalid date' });
            const spy = vi.fn();
            component.errorShow.subscribe(spy);

            component.toggleErrorMessage(true);
            fixture.detectChanges();
            await fixture.whenStable();

            expect(component.errorShow()).toBe(true);
            expect(spy).toHaveBeenCalledWith(true);
        });

        it('should update the model and emit errorShowChange when the client toggles the error off', async () => {
            await createComponent({ errorMessage: 'invalid date', errorShow: true });
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
