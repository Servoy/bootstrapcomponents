import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { ServoyBootstrapTextbox } from './textbox';

describe('ServoyBootstrapTextbox', () => {
    let fixture: ComponentFixture<ServoyBootstrapTextbox>;
    let component: ServoyBootstrapTextbox;

    async function createComponent(overrides: Record<string, any> = {}) {
        fixture = TestBed.createComponent(ServoyBootstrapTextbox);
        component = fixture.componentInstance;

        const defaults: Record<string, any> = {
            servoyApi: new ServoyApiTesting(),
            enabled: true,
            readOnly: false,
            findmode: false,
            editable: true,
            format: { type: 'TEXT' },
            placeholderText: 'Enter text',
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
            imports: [ServoyPublicTestingModule, FormsModule, ServoyBootstrapTextbox],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        await createComponent();
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
        const input = fixture.nativeElement.querySelector('input');
        expect(input).not.toBeNull();
    });

    it('should show the dataprovider value', async () => {
        fixture.componentRef.setInput('dataProviderID', 'myvalue');
        fixture.detectChanges();
        await fixture.whenStable();
        const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
        expect(input.value).toBe('myvalue');
    });

    it('should set the placeholder text', async () => {
        fixture.componentRef.setInput('placeholderText', 'Enter your name');
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

    it('show more than 1 style class', async () => {
        fixture.componentRef.setInput('styleClass', 'classA classB');
        fixture.detectChanges();
        await fixture.whenStable();
        const input = fixture.nativeElement.querySelector('input') as HTMLElement;
        expect(input.classList.contains('classA')).toBe(true);
        expect(input.classList.contains('classB')).toBe(true);
    });

    it('show more variant classes', async () => {
        const input = fixture.nativeElement.querySelector('input') as HTMLElement;
        expect(input.classList.contains('variantA')).toBe(false);
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

    it('should be editable', async () => {
        fixture.componentRef.setInput('editable', true);
        fixture.componentRef.setInput('readOnly', false);
        fixture.detectChanges();
        await fixture.whenStable();
        const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
        expect(input.hasAttribute('readonly')).toBe(false);
    });

    it('should have the correct input type', async () => {
        fixture.componentRef.setInput('inputType', 'password');
        fixture.detectChanges();
        await fixture.whenStable();
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

    it('should not be readonly when findmode overrides editable=false', async () => {
        fixture.componentRef.setInput('editable', false);
        fixture.componentRef.setInput('readOnly', false);
        fixture.componentRef.setInput('findmode', false);
        fixture.detectChanges();
        await fixture.whenStable();
        const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
        expect(input.hasAttribute('readonly')).toBe(true);
        fixture.componentRef.setInput('findmode', true);
        fixture.detectChanges();
        await fixture.whenStable();
        expect(input.hasAttribute('readonly')).toBe(false);
    });

    it('should toggle password visibility when eye button is clicked', async () => {
        await createComponent({ inputType: 'password-with-eye' });
        const eyeDiv = fixture.nativeElement.querySelector('div[id="svy-textbox-eyeDiv"]') as HTMLElement;
        expect(eyeDiv).not.toBeNull();
        eyeDiv.click();
        fixture.detectChanges();
        await fixture.whenStable();
        const updatedEyeDiv = fixture.nativeElement.querySelector('div[id="svy-textbox-eyeDiv"]') as HTMLElement;
        expect(updatedEyeDiv.classList.contains('fa-eye')).toBe(true);
    });

    it('should show password input as text when showPass is toggled', async () => {
        await createComponent({ inputType: 'password-with-eye' });
        const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
        expect(input.type).toBe('password');
        const eyeDiv = fixture.nativeElement.querySelector('div[id="svy-textbox-eyeDiv"]') as HTMLElement;
        eyeDiv.click();
        fixture.detectChanges();
        await fixture.whenStable();
        expect(input.type).toBe('text');
    });

    it('should toggle classForEye between eye and eye-slash on click', async () => {
        await createComponent({ inputType: 'password-with-eye' });
        const eyeDiv = fixture.nativeElement.querySelector('div[id="svy-textbox-eyeDiv"]') as HTMLElement;
        eyeDiv.click();
        fixture.detectChanges();
        await fixture.whenStable();
        expect(eyeDiv.classList.contains('fa-eye')).toBe(true);
        expect(eyeDiv.classList.contains('fa-eye-slash')).toBe(false);
        eyeDiv.click();
        fixture.detectChanges();
        await fixture.whenStable();
        expect(eyeDiv.classList.contains('fa-eye-slash')).toBe(true);
        expect(eyeDiv.classList.contains('fa-eye')).toBe(false);
    });
});
