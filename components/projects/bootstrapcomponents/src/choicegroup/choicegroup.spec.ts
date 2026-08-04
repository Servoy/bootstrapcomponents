import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ServoyApiTesting, ServoyPublicTestingModule, IValuelist } from '@servoy/public';
import { ServoyBootstrapChoicegroup, ChoiceElementDirective } from './choicegroup';

describe('ServoyBootstrapChoicegroup', () => {
    let fixture: ComponentFixture<ServoyBootstrapChoicegroup>;
    let component: ServoyBootstrapChoicegroup;

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
        fixture = TestBed.createComponent(ServoyBootstrapChoicegroup);
        component = fixture.componentInstance;

        const defaults: Record<string, any> = {
            servoyApi: new ServoyApiTesting(),
            enabled: true,
            readOnly: false,
            findmode: false,
            editable: true,
            dataProviderID: 0,
            inputType: 'checkbox',
            valuelistID: createMockValuelist(),
            alignment: 'vertical',
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
            declarations: [ServoyBootstrapChoicegroup, ChoiceElementDirective],
            imports: [ServoyPublicTestingModule, FormsModule],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        await createComponent();
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
        const el = fixture.nativeElement.querySelector('.bts-radiogroup');
        expect(el).not.toBeNull();
    });

    it('should show the text value', async () => {
        const span = fixture.nativeElement.querySelector('.bts-radiogroup label span');
        expect(span.textContent).toBe('one');
    });

    it('show a style class', async () => {
        const el = fixture.nativeElement.querySelector('.bts-radiogroup') as HTMLElement;
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
        await fixture.whenStable();
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
