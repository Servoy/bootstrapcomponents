import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { ServoyBootstrapButton } from './button';

describe('ServoyBootstrapButton', () => {
    let fixture: ComponentFixture<ServoyBootstrapButton>;
    let component: ServoyBootstrapButton;

    async function createComponent(overrides: Record<string, any> = {}) {
        fixture = TestBed.createComponent(ServoyBootstrapButton);
        component = fixture.componentInstance;

        const defaults: Record<string, any> = {
            servoyApi: new ServoyApiTesting(),
            enabled: true,
            text: 'MyButton',
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
            declarations: [ServoyBootstrapButton],
            imports: [ServoyPublicTestingModule],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        await createComponent();
    });

    it('should create and show text', async () => {
        const btn = fixture.nativeElement.querySelector('button');
        expect(btn).not.toBeNull();
        expect(btn.textContent).toContain('MyButton');
    });

    it('should update text', async () => {
        fixture.componentRef.setInput('text', 'Button2');
        fixture.detectChanges();
        await fixture.whenStable();
        const btn = fixture.nativeElement.querySelector('button');
        expect(btn.textContent).toContain('Button2');
    });

    it('should handle enabled state', async () => {
        const btn = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
        expect(btn.disabled).toBe(false);
        fixture.componentRef.setInput('enabled', false);
        fixture.detectChanges();
        await fixture.whenStable();
        expect(btn.disabled).toBe(true);
    });

    it('should handle click event', async () => {
        const onActionMethodID = vi.fn();
        await createComponent({ onActionMethodID });
        const btn = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
        btn.click();
        fixture.detectChanges();
        await fixture.whenStable();
        expect(onActionMethodID).toHaveBeenCalled();
    });

    it('should handle double click event', async () => {
        const onDoubleClickMethodID = vi.fn();
        await createComponent({ onDoubleClickMethodID });
        const btn = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
        btn.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
        fixture.detectChanges();
        await fixture.whenStable();
        expect(onDoubleClickMethodID).toHaveBeenCalled();
    });

    it('should handle right click event', async () => {
        const onRightClickMethodID = vi.fn();
        await createComponent({ onRightClickMethodID });
        const btn = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
        btn.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true }));
        fixture.detectChanges();
        await fixture.whenStable();
        expect(onRightClickMethodID).toHaveBeenCalled();
    });

    it('show a style class', async () => {
        const btn = fixture.nativeElement.querySelector('button') as HTMLElement;
        expect(btn.classList.contains('mystyleclass')).toBe(false);
        fixture.componentRef.setInput('styleClass', 'mystyleclass');
        fixture.detectChanges();
        await fixture.whenStable();
        expect(btn.classList.contains('mystyleclass')).toBe(true);
    });

    it('show more than 1 style class', async () => {
        fixture.componentRef.setInput('styleClass', 'classA classB');
        fixture.detectChanges();
        await fixture.whenStable();
        const btn = fixture.nativeElement.querySelector('button') as HTMLElement;
        expect(btn.classList.contains('classA')).toBe(true);
        expect(btn.classList.contains('classB')).toBe(true);
    });

    it('show more variant classes', async () => {
        fixture.componentRef.setInput('variant', ['variantA', 'variantB']);
        fixture.detectChanges();
        await fixture.whenStable();
        const btn = fixture.nativeElement.querySelector('button') as HTMLElement;
        expect(btn.classList.contains('variantA')).toBe(true);
        expect(btn.classList.contains('variantB')).toBe(true);
    });

    it('should escape HTML when showAs is text', async () => {
        await createComponent({ text: '<b>Bold</b>', showAs: 'text' });
        const btn = fixture.nativeElement.querySelector('button') as HTMLElement;
        expect(btn.textContent).toContain('<b>Bold</b>');
        expect(btn.querySelector('b')).toBeNull();
    });
});
