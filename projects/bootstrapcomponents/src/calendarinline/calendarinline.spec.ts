import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ServoyBootstrapCalendarinline } from './calendarinline';

import { ServoyPublicTestingModule } from '@servoy/public';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { OwlDateTimeIntl, OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { Renderer2 } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { runOnPushChangeDetection } from '../testingutils';
import { By } from '@angular/platform-browser';

describe('CalendarinlineComponent', () => {
    let component: ServoyBootstrapCalendarinline;
    let fixture: ComponentFixture<ServoyBootstrapCalendarinline>;

    beforeEach(waitForAsync(() => {
        let i18nProvider = jasmine.createSpyObj('I18NProvider', ['getI18NMessages']);
        const promise = Promise.resolve({});
        i18nProvider.getI18NMessages.and.returnValue(promise);
        TestBed.configureTestingModule({
            declarations: [ServoyBootstrapCalendarinline],
            imports: [BrowserModule, ServoyPublicTestingModule, OwlDateTimeModule, FormsModule, OwlNativeDateTimeModule, NoopAnimationsModule],
            providers: [Renderer2, FormsModule, OwlDateTimeIntl]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ServoyBootstrapCalendarinline);
        component = fixture.componentInstance;
        component.servoyApi = jasmine.createSpyObj('ServoyApi', ['getMarkupId', 'trustAsHtml', 'startEdit', 'registerComponent', 'unRegisterComponent']);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });

    it('should be showing a date', async () => {
        let mydate = new Date(2020, 1, 2);
        component.dataProviderID = mydate;
        await runOnPushChangeDetection(fixture);
        await runOnPushChangeDetection(fixture);
        const el = fixture.debugElement.query(By.css('.owl-dt-calendar-cell-selected')).nativeElement;
        expect(el.innerHTML.trim()).toBe('2');
    });

});
