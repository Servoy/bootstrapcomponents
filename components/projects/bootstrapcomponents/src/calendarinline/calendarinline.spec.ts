import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { ServoyBootstrapCalendarinline } from './calendarinline';

const isBrowser = typeof window !== 'undefined' && typeof window.getComputedStyle === 'function'
    && typeof (window as any).__vitest_browser__ !== 'undefined';

describe.runIf(isBrowser)('ServoyBootstrapCalendarinline (browser)', () => {
    let fixture: ComponentFixture<ServoyBootstrapCalendarinline>;
    let component: ServoyBootstrapCalendarinline;

    async function createComponent(overrides: Record<string, any> = {}) {
        fixture = TestBed.createComponent(ServoyBootstrapCalendarinline);
        component = fixture.componentInstance;

        const defaults: Record<string, any> = {
            servoyApi: new ServoyApiTesting(),
            enabled: true,
            readOnly: false,
            findmode: false,
            editable: true,
            format: { type: 'DATETIME', display: 'dd-MM-yyyy' },
            dataProviderID: new Date(2025, 10, 11),
            theme: 'light',
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
            imports: [ServoyPublicTestingModule, FormsModule, ServoyBootstrapCalendarinline],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        await createComponent();
    });

    it('should create and render the calendar widget', async () => {
        expect(component).toBeTruthy();
        const el = fixture.nativeElement.querySelector('.bts-calendar-inline') as HTMLElement;
        expect(el).not.toBeNull();
        // tempus-dominus renders its widget inside the element
        // wait a tick for the picker to initialize
        await new Promise(resolve => setTimeout(resolve, 500));
        fixture.detectChanges();
        await fixture.whenStable();
        expect(el.children.length).toBeGreaterThan(0);
    });

    it('should return a valid native element from getNativeElement()', () => {
        expect(component.getNativeElement()).not.toBeNull();
        expect(component.getNativeElement()).toBeInstanceOf(HTMLElement);
    });

    it('should render day cells', async () => {
        const el = fixture.nativeElement.querySelector('.bts-calendar-inline') as HTMLElement;
        const dayCells = el.querySelectorAll('[data-action="selectDay"]');
        expect(dayCells.length).toBeGreaterThan(0);
    });

    it('should highlight the selected date', async () => {
        const el = fixture.nativeElement.querySelector('.bts-calendar-inline') as HTMLElement;
        const activeDay = el.querySelector('.active[data-action="selectDay"]');
        expect(activeDay).not.toBeNull();
        expect(activeDay!.getAttribute('data-day')).toBe('11');
    });

    it('should emit dataProviderIDChange when a day is clicked', async () => {
        const changeSpy = vi.fn();
        component.dataProviderIDChange.subscribe(changeSpy);

        const el = fixture.nativeElement.querySelector('.bts-calendar-inline') as HTMLElement;
        const dayCells = el.querySelectorAll('[data-action="selectDay"]');
        const targetDay = Array.from(dayCells).find(cell => cell.getAttribute('data-day') === '15');
        expect(targetDay).not.toBeNull();

        (targetDay as HTMLElement).click();
        fixture.detectChanges();
        await fixture.whenStable();

        expect(changeSpy).toHaveBeenCalled();
        const emittedDate = changeSpy.mock.calls[0][0] as Date;
        expect(emittedDate.getDate()).toBe(15);
    });

    it('should apply styleClass to the host div', async () => {
        const el = fixture.nativeElement.querySelector('.bts-calendar-inline') as HTMLElement;
        expect(el.classList.contains('mystyle')).toBe(false);
        fixture.componentRef.setInput('styleClass', 'mystyle');
        fixture.detectChanges();
        await fixture.whenStable();
        expect(el.classList.contains('mystyle')).toBe(true);
    });

    it('should update when dataProviderID changes', async () => {
        fixture.componentRef.setInput('dataProviderID', new Date(2025, 10, 20));
        fixture.detectChanges();
        await fixture.whenStable();

        const el = fixture.nativeElement.querySelector('.bts-calendar-inline') as HTMLElement;
        const activeDay = el.querySelector('.active[data-action="selectDay"]');
        expect(activeDay).not.toBeNull();
        expect(activeDay!.getAttribute('data-day')).toBe('20');
    });
});
