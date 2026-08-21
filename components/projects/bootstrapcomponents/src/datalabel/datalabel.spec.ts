import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { ServoyBootstrapDatalabel, DesignTextPipe } from './datalabel';

describe('ServoyBootstrapDatalabel', () => {
    let fixture: ComponentFixture<ServoyBootstrapDatalabel>;
    let component: ServoyBootstrapDatalabel;

    async function createComponent(overrides: Record<string, any> = {}) {
        fixture = TestBed.createComponent(ServoyBootstrapDatalabel);
        component = fixture.componentInstance;

        const defaults: Record<string, any> = {
            servoyApi: new ServoyApiTesting(),
            enabled: true,
            dataProviderID: 'test value',
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
            imports: [ServoyPublicTestingModule, FormsModule, ServoyBootstrapDatalabel, DesignTextPipe],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        await createComponent();
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
        const el = fixture.nativeElement.querySelector('.bts-label');
        expect(el).not.toBeNull();
    });

    it('should return a valid native element from getNativeElement()', () => {
        expect(component.getNativeElement()).not.toBeNull();
        expect(component.getNativeElement()).toBeInstanceOf(HTMLElement);
    });

    it('should show the text value', async () => {
        const span = fixture.nativeElement.querySelector('.bts-label span');
        expect(span).not.toBeNull();
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
});
