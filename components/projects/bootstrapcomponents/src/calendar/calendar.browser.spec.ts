import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { ServoyBootstrapCalendar } from './calendar';

// These tests drive the real tempus-dominus picker, which needs a rendered DOM
// (layout, positioning, getComputedStyle). They are skipped in jsdom and only
// run under the browser runner (npm run test:browser). The branch-heavy
// decision logic is covered in calendar.spec.ts with a mocked picker; this file
// covers only what genuinely needs a live widget: opening the picker and
// navigating day cells with the arrow keys.
const isBrowser = typeof window !== 'undefined' && typeof window.getComputedStyle === 'function'
    && typeof (window as any).__vitest_browser__ !== 'undefined';

describe.runIf(isBrowser)('ServoyBootstrapCalendar (browser)', () => {
    let fixture: ComponentFixture<ServoyBootstrapCalendar>;
    let component: ServoyBootstrapCalendar;

    async function createComponent(overrides: Record<string, any> = {}) {
        fixture = TestBed.createComponent(ServoyBootstrapCalendar);
        component = fixture.componentInstance;

        const defaults: Record<string, any> = {
            servoyApi: new ServoyApiTesting(),
            enabled: true,
            readOnly: false,
            findmode: false,
            editable: true,
            format: { type: 'DATETIME', display: 'dd-MM-yyyy' },
            selectOnEnter: false,
            dataProviderID: new Date(2025, 10, 11),
            theme: 'light',
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

    // Give the picker a moment to render its widget into the DOM.
    async function openPicker() {
        component.onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        await new Promise(resolve => setTimeout(resolve, 300));
        fixture.detectChanges();
        await fixture.whenStable();
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ServoyPublicTestingModule, FormsModule, ServoyBootstrapCalendar],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        await createComponent();
    });

    it('should open the picker widget on ArrowDown', async () => {
        await openPicker();
        const widget = document.querySelector('.tempus-dominus-widget.show');
        expect(widget).not.toBeNull();
    });

    it('should move the active day forward on ArrowRight', async () => {
        await openPicker();
        const before = component._dataProviderID() as Date;

        component.onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
        await new Promise(resolve => setTimeout(resolve, 200));
        fixture.detectChanges();
        await fixture.whenStable();

        const after = component._dataProviderID() as Date;
        expect(after.getTime()).not.toBe(before.getTime());
    });

    it('should move the active day back a week on ArrowUp', async () => {
        await openPicker();
        const before = component._dataProviderID() as Date;

        component.onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
        await new Promise(resolve => setTimeout(resolve, 200));
        fixture.detectChanges();
        await fixture.whenStable();

        const after = component._dataProviderID() as Date;
        expect(after.getTime()).not.toBe(before.getTime());
    });

    it('should hide the widget on Escape', async () => {
        await openPicker();
        expect(document.querySelector('.tempus-dominus-widget.show')).not.toBeNull();

        component.onKeyDown(new KeyboardEvent('keydown', { key: 'Escape' }));
        await new Promise(resolve => setTimeout(resolve, 200));
        fixture.detectChanges();
        await fixture.whenStable();

        expect(document.querySelector('.tempus-dominus-widget.show')).toBeNull();
    });

    it('should emit dataProviderIDChange when a day cell is clicked', async () => {
        await openPicker();
        const changeSpy = vi.fn();
        component.dataProviderIDChange.subscribe(changeSpy);

        const widget = document.querySelector('.tempus-dominus-widget.show')!;
        const dayCell = widget.querySelector('[data-action="selectDay"]:not(.old):not(.new)') as HTMLElement;
        expect(dayCell).not.toBeNull();
        dayCell.click();
        await new Promise(resolve => setTimeout(resolve, 200));
        fixture.detectChanges();
        await fixture.whenStable();

        expect(changeSpy).toHaveBeenCalled();
    });
});
