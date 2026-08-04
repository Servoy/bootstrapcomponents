import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { describe, it, expect, beforeEach } from 'vitest';
import { ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { ServoyBootstrapCalendarinline } from './calendarinline';

describe('ServoyBootstrapCalendarinline', () => {
    let fixture: ComponentFixture<ServoyBootstrapCalendarinline>;
    let component: ServoyBootstrapCalendarinline;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ServoyBootstrapCalendarinline],
            imports: [ServoyPublicTestingModule, FormsModule],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(ServoyBootstrapCalendarinline);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('servoyApi', new ServoyApiTesting());
        fixture.componentRef.setInput('enabled', true);
        fixture.componentRef.setInput('readOnly', false);
        fixture.componentRef.setInput('findmode', false);
        fixture.componentRef.setInput('editable', true);
        fixture.componentRef.setInput('format', { type: 'DATETIME', display: 'dd-MM-yyyy' });
        fixture.componentRef.setInput('dataProviderID', new Date(2025, 10, 11));
        fixture.componentRef.setInput('theme', 'light');
        fixture.componentRef.setInput('calendarWeeks', false);
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
    });
});
