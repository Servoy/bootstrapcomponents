import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { ServoyBootstrapCheckbox } from './checkbox';

describe('ServoyBootstrapCheckbox', () => {
    let fixture: ComponentFixture<ServoyBootstrapCheckbox>;
    let component: ServoyBootstrapCheckbox;

    async function createComponent(overrides: Record<string, any> = {}) {
        fixture = TestBed.createComponent(ServoyBootstrapCheckbox);
        component = fixture.componentInstance;

        const defaults: Record<string, any> = {
            servoyApi: new ServoyApiTesting(),
            enabled: true,
            readOnly: false,
            findmode: false,
            editable: true,
            dataProviderID: 0,
            text: 'Test Checkbox',
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
            imports: [ServoyPublicTestingModule, FormsModule, ServoyBootstrapCheckbox],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        await createComponent();
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
        const el = fixture.nativeElement.querySelector('.bts-check');
        expect(el).not.toBeNull();
    });

    it('should return a valid native element from getNativeElement()', () => {
        expect(component.getNativeElement()).not.toBeNull();
        expect(component.getNativeElement()).toBeInstanceOf(HTMLElement);
    });

    it('should show the text value', async () => {
        const span = fixture.nativeElement.querySelector('.bts-check label span');
        expect(span.textContent).toBe('Test Checkbox');
    });

    it('show a style class', async () => {
        const el = fixture.nativeElement.querySelector('.bts-check') as HTMLElement;
        expect(el.classList.contains('mystyleclass')).toBe(false);
        fixture.componentRef.setInput('styleClass', 'mystyleclass');
        fixture.detectChanges();
        await fixture.whenStable();
        expect(el.classList.contains('mystyleclass')).toBe(true);
    });

    it('should be disabled', async () => {
        fixture.componentRef.setInput('enabled', false);
        fixture.detectChanges();
        await fixture.whenStable();
        const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
        expect(input.hasAttribute('disabled')).toBe(true);
    });

    it('should handle onaction event', async () => {
        const onActionMethodID = vi.fn();
        await createComponent({ onActionMethodID });
        const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
        input.click();
        fixture.detectChanges();
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(onActionMethodID).toHaveBeenCalled();
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

    it('should emit dataProviderIDChange event on input change', async () => {
        const spy = vi.fn();
        await createComponent();
        component.dataProviderIDChange.subscribe(spy);
        const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
        input.click();
        fixture.detectChanges();
        await fixture.whenStable();
        expect(spy).toHaveBeenCalled();
    });
});
