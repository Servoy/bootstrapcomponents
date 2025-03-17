/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, ViewChild } from '@angular/core';
import { Format, ServoyApi, ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { ServoyBootstrapCalendarinline } from './calendarinline';
import { MountConfig } from 'cypress/angular';
import { FormsModule } from '@angular/forms';
import { Options } from '@eonasdan/tempus-dominus';
import '@eonasdan/tempus-dominus/dist/css/tempus-dominus.css';

@Component({
    template: `<bootstrapcomponents-calendarinline
                [servoyApi]="servoyApi"
                [enabled]="enabled"
                [readOnly]="readOnly"
                [findmode]="findmode"
                [editable]="editable"
                [onActionMethodID]="onActionMethodID"
                [onFocusGainedMethodID]="onFocusGainedMethodID"
                [onFocusLostMethodID]="onFocusLostMethodID" 
                [onDataChangeMethodID]="onDataChangeMethodID"
                [format]="format"
                [dataProviderID]="dataProviderID"
                (dataProviderIDChange)="dataProviderIDChange($event)"
                [styleClass]="styleClass"
                [toolTipText]="toolTipText"
                [tabSeq]="tabSeq"
                [calendarWeeks]="calendarWeeks"
                [theme]="theme"
                [options]="options"
                #element>
                </bootstrapcomponents-calendarinline>`,
    standalone: false
})
class WrapperComponent {
    servoyApi: ServoyApi;
    
    options: Options;
    theme: string;
    calendarWeeks: boolean;
    enabled: boolean;
    styleClass: string;
    tabSeq: number;
    toolTipText: string;
    
    onActionMethodID: (e: Event, data?: unknown) => void;
    onFocusGainedMethodID: (e: Event, data?: unknown) => void;
    onFocusLostMethodID: (e: Event, data?: unknown) => void;
    onDataChangeMethodID: (e: Event, data?: unknown) => void;

    format: Format;
    readOnly: boolean;
    findmode: boolean;
    editable: boolean;
    
    dataProviderID: unknown;
    dataProviderIDChange = (newData: unknown) => {
    };

    @ViewChild('element') element: ServoyBootstrapCalendarinline;
}

describe('ServoyBootstrapCalendarinline', () => {
    const servoyApiSpy = new ServoyApiTesting(); 

    const config: MountConfig<WrapperComponent>= {
        declarations: [ServoyBootstrapCalendarinline],
        imports: [ ServoyPublicTestingModule, FormsModule]
    }

    beforeEach(() => {
        config.componentProperties = {
            servoyApi: servoyApiSpy,
            enabled: true,
            readOnly: false,
            findmode: false,
            format: { type: 'DATETIME', display: 'dd-MM-yyyy' } as Format,
            editable: true,
            dataProviderID: new Date(2025, 10, 11),
            theme: 'light',
            calendarWeeks: false,
        }
    });

    it('should mount and register the component', () => {
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('.tempus-dominus-widget').should('exist').then(() => {
                cy.wrap(registerComponent).should('be.called');
            });
        });
    });

    it('should show the dataprovider value', () => {
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('.day.active').should('have.attr', 'data-value', '2025-10-11');
        });
    });

    it('show a style class', () => {
        cy.mount(WrapperComponent, config).then(wrapper => {
            cy.get('.bts-calendar-inline').should('not.have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass = 'mystyleclass';
                wrapper.fixture.detectChanges();
                cy.get('.bts-calendar-inline').should('have.class', 'mystyleclass')
            });
        });
    });

    it('show more then 1 style class', () => {
        config.componentProperties.styleClass = 'mystyleclass';
        cy.mount(WrapperComponent, config).then(wrapper => {
            cy.get('.bts-calendar-inline').should('have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass = 'classA classB';
                wrapper.fixture.detectChanges();
                cy.get('.bts-calendar-inline').should('have.class', 'classA').should('have.class', 'classB');
            });
        });
    });

    it('should be disabled', () => {
        config.componentProperties.enabled = false;
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('.bts-calendar-inline').should('have.attr', 'disabled');
        });
    });

    it('should emit dataProviderIDChange event on input change', () => {
        const dataProviderIDChange = cy.stub();
        config.componentProperties.dataProviderIDChange = dataProviderIDChange;
        cy.mount(WrapperComponent, config);
        // Force the calendar to be visible since it's an inline calendar
        cy.get('.tempus-dominus-widget')
            .invoke('css', 'display', 'block')
            .should('be.visible');
        cy.get('.day.active').should('have.attr', 'data-value', '2025-10-11').then(() => {
            cy.get('.day.weekend[data-value="2025-10-01"][data-day="1"]').click();
            cy.wrap(dataProviderIDChange).should('have.been.called');
        });
    });

    it('should not emit dataProviderIDChange event dataprovder change', () => {
        const dataProviderIDChange = cy.stub();
        config.componentProperties.dataProviderIDChange = dataProviderIDChange;
        cy.mount(WrapperComponent, config).then(wrapper => {
            cy.get('.day.active').should('have.attr', 'data-value', '2025-10-11').then(() => {
                wrapper.component.dataProviderID = new Date(2025, 10, 14);
                wrapper.fixture.detectChanges();
                expect(dataProviderIDChange).not.to.have.been.called;
                cy.get('.day.active').should('have.attr', 'data-value', '2025-10-14');
            });
        });
    });
});