import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { ServoyBootstrapLabel } from './label';

describe('ServoyBootstrapLabel', () => {
    let fixture: ComponentFixture<ServoyBootstrapLabel>;
    let component: ServoyBootstrapLabel;

    async function createComponent(overrides: Record<string, any> = {}) {
        fixture = TestBed.createComponent(ServoyBootstrapLabel);
        component = fixture.componentInstance;

        const defaults: Record<string, any> = {
            servoyApi: new ServoyApiTesting(),
            enabled: true,
            showAs: 'text',
            text: 'Label',
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
            declarations: [ServoyBootstrapLabel],
            imports: [ServoyPublicTestingModule, FormsModule],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        await createComponent();
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
        const el = fixture.nativeElement.querySelector('.bts-label');
        expect(el).not.toBeNull();
    });

    it('should show the text value', async () => {
        const span = fixture.nativeElement.querySelector('.bts-label span');
        expect(span.textContent).toBe('Label');
    });

    it('should show as HTML the value', async () => {
        fixture.componentRef.setInput('text', '<b>Label</b>');
        fixture.componentRef.setInput('showAs', 'html');
        fixture.detectChanges();
        await fixture.whenStable();
        const span = fixture.nativeElement.querySelector('.bts-label span');
        expect(span.innerHTML).toContain('<b>Label</b>');
    });

    it('show a style class', async () => {
        const el = fixture.nativeElement.querySelector('.bts-label') as HTMLElement;
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
        const el = fixture.nativeElement.querySelector('.bts-label') as HTMLElement;
        expect(el.classList.contains('classA')).toBe(true);
        expect(el.classList.contains('classB')).toBe(true);
    });

    it('should be disabled', async () => {
        fixture.componentRef.setInput('enabled', false);
        fixture.detectChanges();
        await fixture.whenStable();
        const el = fixture.nativeElement.querySelector('.bts-label') as HTMLElement;
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    it('should handle onaction event', async () => {
        const onActionMethodID = vi.fn();
        await createComponent({ onActionMethodID });
        const el = fixture.nativeElement.querySelector('.bts-label') as HTMLElement;
        el.click();
        fixture.detectChanges();
        await fixture.whenStable();
        expect(onActionMethodID).toHaveBeenCalled();
    });

    it('should not fire onAction when disabled', async () => {
        const onActionMethodID = vi.fn();
        await createComponent({ onActionMethodID, enabled: false });
        const el = fixture.nativeElement.querySelector('.bts-label') as HTMLElement;
        el.click();
        fixture.detectChanges();
        await fixture.whenStable();
        expect(onActionMethodID).not.toHaveBeenCalled();
    });
});
