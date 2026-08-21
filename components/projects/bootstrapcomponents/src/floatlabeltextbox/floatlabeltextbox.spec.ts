import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { ServoyFloatLabelBootstrapTextbox } from './floatlabeltextbox';

describe('ServoyFloatLabelBootstrapTextbox', () => {
    let fixture: ComponentFixture<ServoyFloatLabelBootstrapTextbox>;
    let component: ServoyFloatLabelBootstrapTextbox;

    async function createComponent(overrides: Record<string, any> = {}) {
        fixture = TestBed.createComponent(ServoyFloatLabelBootstrapTextbox);
        component = fixture.componentInstance;

        const defaults: Record<string, any> = {
            servoyApi: new ServoyApiTesting(),
            enabled: true,
            readOnly: false,
            findmode: false,
            editable: true,
            format: { type: 'TEXT' },
            floatLabelText: 'Enter text',
            selectOnEnter: false,
            inputType: 'text',
            dataProviderID: 'initialValue',
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
            imports: [ServoyPublicTestingModule, FormsModule, ServoyFloatLabelBootstrapTextbox],
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

    it('should show the dataprovider value', async () => {
        const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
        expect(input.value).toBe('initialValue');
    });

    it('should set the placeholder text', async () => {
        fixture.componentRef.setInput('floatLabelText', 'Enter your name');
        fixture.detectChanges();
        await fixture.whenStable();
        const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
        expect(input.getAttribute('placeholder')).toBe('Enter your name');
    });

    it('show a style class', async () => {
        const input = fixture.nativeElement.querySelector('input') as HTMLElement;
        expect(input.classList.contains('mystyleclass')).toBe(false);
        fixture.componentRef.setInput('styleClass', 'mystyleclass');
        fixture.detectChanges();
        await fixture.whenStable();
        expect(input.classList.contains('mystyleclass')).toBe(true);
    });

    it('show more variant classes', async () => {
        const input = fixture.nativeElement.querySelector('input') as HTMLElement;
        fixture.componentRef.setInput('variant', ['variantA', 'variantB']);
        fixture.detectChanges();
        await fixture.whenStable();
        expect(input.classList.contains('variantA')).toBe(true);
        expect(input.classList.contains('variantB')).toBe(true);
    });

    it('should be read-only', async () => {
        fixture.componentRef.setInput('readOnly', true);
        fixture.detectChanges();
        await fixture.whenStable();
        const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
        expect(input.hasAttribute('readonly')).toBe(true);
    });

    it('should have the correct input type', async () => {
        await createComponent({ inputType: 'password' });
        const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
        expect(input.getAttribute('type')).toBe('password');
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

    it('should handle right click event', async () => {
        const onRightClickMethodID = vi.fn();
        await createComponent({ onRightClickMethodID });
        const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
        input.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true }));
        fixture.detectChanges();
        await fixture.whenStable();
        expect(onRightClickMethodID).toHaveBeenCalled();
    });

    it('should show floatLabelText in the label element', async () => {
        fixture.componentRef.setInput('floatLabelText', 'Your name');
        fixture.detectChanges();
        await fixture.whenStable();
        const label = fixture.nativeElement.querySelector('label');
        if (label) {
            expect(label.textContent).toBe('Your name');
        }
    });
});
