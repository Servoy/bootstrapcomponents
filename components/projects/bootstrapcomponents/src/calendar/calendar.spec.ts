import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { ServoyBootstrapCalendar } from './calendar';

describe('ServoyBootstrapCalendar', () => {
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
            theme: 'dark',
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

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ServoyPublicTestingModule, FormsModule, ServoyBootstrapCalendar],
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

    it('show a style class', async () => {
        const input = fixture.nativeElement.querySelector('input') as HTMLElement;
        expect(input.classList.contains('mystyleclass')).toBe(false);
        fixture.componentRef.setInput('styleClass', 'mystyleclass');
        fixture.detectChanges();
        await fixture.whenStable();
        expect(input.classList.contains('mystyleclass')).toBe(true);
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

    // The following exercise the shared ServoyBootstrapBaseCalendar logic
    // through the concrete calendar component. basecalendar is an abstract
    // @Directive() with no template, so it is tested here rather than
    // standalone. Picker-rendering behaviour is left to the browser suite.
    describe('base calendar config (updateConfig)', () => {
        it('should enable only the date components for a date-only format', () => {
            component.updateConfig('dd-MM-yyyy');
            const c = component.config.display!.components!;
            expect(c.calendar).toBe(true);
            expect(c.date).toBe(true);
            expect(c.month).toBe(true);
            expect(c.year).toBe(true);
            expect(c.clock).toBe(false);
            expect(c.hours).toBe(false);
            expect(c.minutes).toBe(false);
            expect(c.seconds).toBe(false);
        });

        it('should enable only the clock components for a time-only format', () => {
            component.updateConfig('HH:mm:ss');
            const c = component.config.display!.components!;
            expect(c.calendar).toBe(false);
            expect(c.date).toBe(false);
            expect(c.clock).toBe(true);
            expect(c.hours).toBe(true);
            expect(c.minutes).toBe(true);
            expect(c.seconds).toBe(true);
        });

        it('should use a 24-hour cycle for an uppercase H format', () => {
            component.updateConfig('HH:mm');
            expect(component.config.localization!.hourCycle).toBe('h23');
        });

        it('should use a 12-hour cycle for a lowercase h format', () => {
            component.updateConfig('hh:mm');
            expect(component.config.localization!.hourCycle).toBe('h12');
        });

        it('should use a 12-hour cycle when an AM/PM marker is present', () => {
            component.updateConfig('hh:mm a');
            expect(component.config.localization!.hourCycle).toBe('h12');
        });
    });

    describe('base calendar restrictions (svyOnChanges)', () => {
        it('should set the minimum date restriction', async () => {
            const min = new Date(2025, 0, 1);
            await createComponent({ minDate: min });
            expect(component.config.restrictions!.minDate).toBeDefined();
        });

        it('should set the maximum date restriction', async () => {
            const max = new Date(2025, 11, 31);
            await createComponent({ maxDate: max });
            expect(component.config.restrictions!.maxDate).toBeDefined();
        });

        it('should set disabled days of week', async () => {
            await createComponent({ disabledDays: [0, 6] });
            expect(component.config.restrictions!.daysOfWeekDisabled).toEqual([0, 6]);
        });

        it('should clear disabled days when they are removed', async () => {
            await createComponent({ disabledDays: [0, 6] });
            fixture.componentRef.setInput('disabledDays', undefined);
            fixture.detectChanges();
            await fixture.whenStable();
            expect(component.config.restrictions!.daysOfWeekDisabled).toEqual([]);
        });

        it('should convert disabled dates into the picker format', async () => {
            await createComponent({ disabledDates: [new Date(2025, 5, 1), new Date(2025, 5, 2)] });
            expect(component.config.restrictions!.disabledDates!.length).toBe(2);
        });

        it('should apply the calendarWeeks flag to the display config', async () => {
            await createComponent({ calendarWeeks: true });
            expect(component.config.display!.calendarWeeks).toBe(true);
        });
    });

    describe('base calendar date push (dateChanged)', () => {
        it('should push a new date value through to the data provider', () => {
            const spy = vi.fn();
            component.dataProviderIDChange.subscribe(spy);
            const date = new Date(2026, 2, 15);
            component.dateChanged({ type: 'change.td', date });
            expect(component._dataProviderID()).toEqual(date);
        });

        it('should not push when the new date equals the current value', () => {
            const current = component._dataProviderID();
            const spy = vi.fn();
            component.dataProviderIDChange.subscribe(spy);
            component.dateChanged({ type: 'change.td', date: new Date(current.getTime()) });
            expect(spy).not.toHaveBeenCalled();
        });

        it('should clear the value for a non-change event type', () => {
            component.dateChanged({ type: 'other' });
            expect(component._dataProviderID()).toBeNull();
        });
    });

    // Keyboard handling (onKeyDown) drives the tempus-dominus picker. We do not
    // test tempus-dominus itself; we replace component.picker with a thin fake
    // and assert that the right picker calls are made for each key. This keeps
    // the branch-heavy onKeyDown logic covered in jsdom without a real browser.
    describe('keyboard handling (onKeyDown) with a mocked picker', () => {
        let picker: {
            show: ReturnType<typeof vi.fn>;
            hide: ReturnType<typeof vi.fn>;
            clear: ReturnType<typeof vi.fn>;
            dispose: ReturnType<typeof vi.fn>;
            display: { isVisible: boolean };
            dates: { lastPicked: Date | undefined; setValue: ReturnType<typeof vi.fn> };
        };

        function key(init: KeyboardEventInit) {
            return new KeyboardEvent('keydown', init);
        }

        beforeEach(() => {
            picker = {
                show: vi.fn(),
                hide: vi.fn(),
                clear: vi.fn(),
                // dispose is called by ngOnDestroy during fixture teardown
                dispose: vi.fn(),
                display: { isVisible: false },
                dates: { lastPicked: undefined, setValue: vi.fn() }
            };
            // swap the real picker for our fake
            (component as any).picker = picker;
        });

        it('should open the picker on ArrowDown when it is hidden', () => {
            picker.display.isVisible = false;
            component.onKeyDown(key({ key: 'ArrowDown' }));
            expect(picker.show).toHaveBeenCalled();
        });

        it('should not act on keys while read-only', async () => {
            await createComponent({ readOnly: true });
            (component as any).picker = picker;
            component.onKeyDown(key({ key: 'ArrowDown' }));
            expect(picker.show).not.toHaveBeenCalled();
        });

        it('should clear the picker on Delete when visible', () => {
            picker.display.isVisible = true;
            component.onKeyDown(key({ key: 'Delete' }));
            expect(picker.clear).toHaveBeenCalled();
        });

        it('should hide the picker on Escape when visible', () => {
            picker.display.isVisible = true;
            component.onKeyDown(key({ key: 'Escape' }));
            expect(picker.hide).toHaveBeenCalled();
        });

        it('should hide the picker on Enter when visible', () => {
            picker.display.isVisible = true;
            component.onKeyDown(key({ key: 'Enter' }));
            expect(picker.hide).toHaveBeenCalled();
        });

        it('should move one day back on NumpadSubtract from the last picked date', () => {
            picker.dates.lastPicked = new Date(2025, 5, 10);
            component.onKeyDown(key({ key: '-', code: 'NumpadSubtract' }));
            const arg = picker.dates.setValue.mock.calls[0][0];
            // DateTime extends Date, so the day is readable directly
            expect(new Date(arg).getDate()).toBe(9);
        });

        it('should move one day forward on NumpadAdd from the last picked date', () => {
            picker.dates.lastPicked = new Date(2025, 5, 10);
            component.onKeyDown(key({ key: '+', code: 'NumpadAdd' }));
            const arg = picker.dates.setValue.mock.calls[0][0];
            expect(new Date(arg).getDate()).toBe(11);
        });

        it('should not change the date on NumpadAdd when nothing was picked yet', () => {
            picker.dates.lastPicked = undefined;
            component.onKeyDown(key({ key: '+', code: 'NumpadAdd' }));
            expect(picker.dates.setValue).not.toHaveBeenCalled();
        });

        it('should jump to the first day of the month on KeyB', () => {
            component.onKeyDown(key({ key: 'b', code: 'KeyB' }));
            const arg = picker.dates.setValue.mock.calls[0][0];
            expect(new Date(arg).getDate()).toBe(1);
        });

        it('should jump to the last day of the month on KeyE', () => {
            component.onKeyDown(key({ key: 'e', code: 'KeyE' }));
            const arg = picker.dates.setValue.mock.calls[0][0];
            const d = new Date(arg);
            const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
            expect(d.getDate()).toBe(lastDay);
        });

        it('should move to yesterday on KeyY', () => {
            const today = new Date();
            component.onKeyDown(key({ key: 'y', code: 'KeyY' }));
            const arg = picker.dates.setValue.mock.calls[0][0];
            const expected = new Date();
            expected.setDate(today.getDate() - 1);
            expect(new Date(arg).getDate()).toBe(expected.getDate());
        });

        it('should trigger day navigation (not show) on ArrowDown when already visible', () => {
            picker.display.isVisible = true;
            // dateChange queries the live widget; there is none in jsdom, so it
            // simply returns without throwing. We only assert show is not called.
            component.onKeyDown(key({ key: 'ArrowDown' }));
            expect(picker.show).not.toHaveBeenCalled();
        });

        it('should ignore shortcut keys when there is no picker', () => {
            (component as any).picker = null;
            expect(() => component.onKeyDown(key({ key: 'b', code: 'KeyB' }))).not.toThrow();
        });
    });

    describe('onClick with a mocked picker', () => {
        it('should not throw when the picker is hidden', () => {
            (component as any).picker = { display: { isVisible: false }, dispose: vi.fn() };
            expect(() => component.onClick(new MouseEvent('click'))).not.toThrow();
        });

        it('should attach a widget click listener when the picker is visible', () => {
            const widget = document.createElement('div');
            const addSpy = vi.spyOn(widget, 'addEventListener');
            (component as any).picker = { display: { isVisible: true, widget }, dispose: vi.fn() };
            component.onClick(new MouseEvent('click'));
            expect(addSpy).toHaveBeenCalledWith('click', expect.any(Function));
        });
    });

    describe('isValidDate', () => {
        it('should accept a real date', () => {
            expect(component.isValidDate(new Date(2025, 0, 1))).toBe(true);
        });

        it('should reject an invalid date', () => {
            expect(component.isValidDate(new Date('not a date'))).toBe(false);
        });

        it('should reject a non-date value', () => {
            expect(component.isValidDate('2025-01-01' as any)).toBe(false);
        });
    });

    describe('modelChange revert logic', () => {
        it('should revert a value below the minimum date', async () => {
            const min = new Date(2025, 5, 1);
            await createComponent({ minDate: min, dataProviderID: new Date(2025, 5, 15) });
            const revertSpy = vi.spyOn(component.svyFormat()!, 'writeValue');
            component.modelChange(new Date(2025, 4, 1)); // before min
            expect(revertSpy).toHaveBeenCalledWith(component._dataProviderID());
        });

        it('should revert a value above the maximum date', async () => {
            const max = new Date(2025, 5, 30);
            await createComponent({ maxDate: max, dataProviderID: new Date(2025, 5, 15) });
            const revertSpy = vi.spyOn(component.svyFormat()!, 'writeValue');
            component.modelChange(new Date(2025, 6, 1)); // after max
            expect(revertSpy).toHaveBeenCalled();
        });

        it('should not revert a value within range', async () => {
            await createComponent({ minDate: new Date(2025, 0, 1), maxDate: new Date(2025, 11, 31), dataProviderID: new Date(2025, 5, 15) });
            const revertSpy = vi.spyOn(component.svyFormat()!, 'writeValue');
            component.modelChange(new Date(2025, 5, 20));
            expect(revertSpy).not.toHaveBeenCalled();
        });

        it('should push the new value through when in find mode', async () => {
            await createComponent({ findmode: true });
            component.modelChange(new Date(2025, 5, 20));
            // in find mode the value is set directly, no revert
            expect(component._dataProviderID()).toEqual(new Date(2025, 5, 20));
        });
    });

    describe('svyOnChanges format handling', () => {
        it('should ignore a non-DATETIME format and leave the picker config unchanged', async () => {
            const before = JSON.stringify(component.config.display!.components);
            // a format without type DATETIME should not call updateConfig
            fixture.componentRef.setInput('format', { type: 'TEXT', display: 'xxx' });
            fixture.detectChanges();
            await fixture.whenStable();
            expect(JSON.stringify(component.config.display!.components)).toBe(before);
        });

        it('should dispose the picker when entering find mode', async () => {
            const disposeSpy = vi.spyOn(component.picker, 'dispose');
            fixture.componentRef.setInput('findmode', true);
            fixture.detectChanges();
            await fixture.whenStable();
            expect(disposeSpy).toHaveBeenCalled();
            expect(component.picker).toBeNull();
        });
    });
});
