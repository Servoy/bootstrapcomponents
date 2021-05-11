import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServoyBootstrapCalendar } from './calendar';

import { ServoyPublicTestingModule } from '@servoy/public';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { OwlDateTimeIntl, OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { Renderer2 } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Format } from '@servoy/public';
import { runOnPushChangeDetection } from '../testingutils';

describe('CalendarComponent', () => {
    let component: ServoyBootstrapCalendar;
    let fixture: ComponentFixture<ServoyBootstrapCalendar>;
    let inputField;

    beforeEach(() => {
        const i18nProvider = jasmine.createSpyObj('I18NProvider', ['getI18NMessages']);
        const promise = Promise.resolve({});
        i18nProvider.getI18NMessages.and.returnValue(promise); 
        TestBed.configureTestingModule({
            declarations: [ServoyBootstrapCalendar],
            imports: [ BrowserModule, ServoyPublicTestingModule, OwlDateTimeModule, FormsModule, OwlNativeDateTimeModule],
            providers: [Renderer2, FormsModule,  OwlDateTimeIntl]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ServoyBootstrapCalendar);
        inputField = fixture.debugElement.query(By.css('input'));
        component = fixture.componentInstance;
        component.servoyApi = jasmine.createSpyObj('ServoyApi', ['getMarkupId', 'trustAsHtml', 'startEdit', 'registerComponent', 'unRegisterComponent']);
        component.format = new Format();
        component.format.type = 'DATETIME';
        component.format.display = 'dd-MM-yyyy';
        runOnPushChangeDetection(fixture);
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });

    it('should call update method', () => {
        spyOn(component, 'pushUpdate');
        inputField.nativeElement.dispatchEvent(new Event('change'));
        expect(component.pushUpdate).toHaveBeenCalled();
    });
    
    it('handlers need to be called', () => {
        component.onFocusGainedMethodID = jasmine.createSpy('onFocusGainedMethodID');
        component.onFocusLostMethodID = jasmine.createSpy('onFocusLostMethodID');
        component.onActionMethodID = jasmine.createSpy('onActionMethodID');
        component.svyOnInit();
        inputField.triggerEventHandler('focus', null);
        expect(component.onFocusGainedMethodID).toHaveBeenCalled();
        expect(component.onFocusLostMethodID).toHaveBeenCalledTimes(0);
        inputField.triggerEventHandler('blur', null);
        expect(component.onFocusLostMethodID).toHaveBeenCalledTimes(1);
        inputField.triggerEventHandler('keydown', { keyCode: 13 });
        expect(component.onActionMethodID).toHaveBeenCalled();
    });

    it('should be showing a formatted a date', async () => {
        component.dataProviderID = new Date(2020, 10, 10);
        await runOnPushChangeDetection(fixture);
        const el = inputField.nativeElement;
        expect(el.value).toBe('10-11-2020');
    });
});
