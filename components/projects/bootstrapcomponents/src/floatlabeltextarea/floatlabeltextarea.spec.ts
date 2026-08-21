import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { ServoyFloatLabelBootstrapTextarea } from './floatlabeltextarea';

describe('ServoyFloatLabelBootstrapTextarea', () => {
    let fixture: ComponentFixture<ServoyFloatLabelBootstrapTextarea>;
    let component: ServoyFloatLabelBootstrapTextarea;

    async function createComponent(overrides: Record<string, any> = {}) {
        fixture = TestBed.createComponent(ServoyFloatLabelBootstrapTextarea);
        component = fixture.componentInstance;

        const defaults: Record<string, any> = {
            servoyApi: new ServoyApiTesting(),
            enabled: true,
            readOnly: false,
            findmode: false,
            editable: true,
            maxLength: 100,
            dataProviderID: 'initialValue',
            floatLabelText: 'Enter text',
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
            imports: [ServoyPublicTestingModule, FormsModule, ServoyFloatLabelBootstrapTextarea],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        await createComponent();
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
        const textarea = fixture.nativeElement.querySelector('textarea');
        expect(textarea).not.toBeNull();
    });

    it('should return a valid native element from getNativeElement()', () => {
        expect(component.getNativeElement()).not.toBeNull();
        expect(component.getNativeElement()).toBeInstanceOf(HTMLElement);
    });

    it('should show dataprovider value', async () => {
        const textarea = fixture.nativeElement.querySelector('textarea') as HTMLTextAreaElement;
        expect(textarea.value).toBe('initialValue');
    });

    it('should be read-only', async () => {
        fixture.componentRef.setInput('readOnly', true);
        fixture.detectChanges();
        await fixture.whenStable();
        const textarea = fixture.nativeElement.querySelector('textarea') as HTMLTextAreaElement;
        expect(textarea.hasAttribute('readonly')).toBe(true);
    });

    it('should be editable', async () => {
        fixture.componentRef.setInput('editable', true);
        fixture.componentRef.setInput('readOnly', false);
        fixture.detectChanges();
        await fixture.whenStable();
        const textarea = fixture.nativeElement.querySelector('textarea') as HTMLTextAreaElement;
        expect(textarea.hasAttribute('readonly')).toBe(false);
    });

    it('should handle focus gained event', async () => {
        const onFocusGainedMethodID = vi.fn();
        await createComponent({ onFocusGainedMethodID });
        const textarea = fixture.nativeElement.querySelector('textarea') as HTMLTextAreaElement;
        textarea.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
        fixture.detectChanges();
        await fixture.whenStable();
        expect(onFocusGainedMethodID).toHaveBeenCalled();
    });

    it('should handle focus lost event', async () => {
        const onFocusLostMethodID = vi.fn();
        await createComponent({ onFocusLostMethodID });
        const textarea = fixture.nativeElement.querySelector('textarea') as HTMLTextAreaElement;
        textarea.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
        fixture.detectChanges();
        textarea.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
        fixture.detectChanges();
        await fixture.whenStable();
        expect(onFocusLostMethodID).toHaveBeenCalled();
    });

    it('should handle right click event', async () => {
        const onRightClickMethodID = vi.fn();
        await createComponent({ onRightClickMethodID });
        const textarea = fixture.nativeElement.querySelector('textarea') as HTMLTextAreaElement;
        textarea.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true }));
        fixture.detectChanges();
        await fixture.whenStable();
        expect(onRightClickMethodID).toHaveBeenCalled();
    });
});
