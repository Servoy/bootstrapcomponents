/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, ViewChild, signal, output } from '@angular/core';
import { Format, ServoyApi, ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { ServoyBootstrapCalendarinline } from './calendarinline';
import { MountConfig } from 'cypress/angular';
import { FormsModule } from '@angular/forms';
import { Options } from '@eonasdan/tempus-dominus';
import '@eonasdan/tempus-dominus/dist/css/tempus-dominus.css';

@Component({
    template: `<bootstrapcomponents-calendarinline
                [servoyApi]="servoyApi"
                [enabled]="enabled()"
                [readOnly]="readOnly()"
                [findmode]="findmode()"
                [editable]="editable()"
                [onActionMethodID]="onActionMethodID"
                [onFocusGainedMethodID]="onFocusGainedMethodID"
                [onFocusLostMethodID]="onFocusLostMethodID" 
                [onDataChangeMethodID]="onDataChangeMethodID"
                [format]="format()"
                [dataProviderID]="dataProviderID()"
                (dataProviderIDChange)="dataProviderIDChange.emit($event)"
                [styleClass]="styleClass()"
                [toolTipText]="toolTipText()"
                [tabSeq]="tabSeq()"
                [calendarWeeks]="calendarWeeks()"
                [theme]="theme()"
                [options]="options()"
                #element>
                </bootstrapcomponents-calendarinline>`,
    standalone: false
})
class WrapperComponent {
    servoyApi: ServoyApi;

    options = signal<Options>(undefined);
    theme = signal<string>(undefined);
    calendarWeeks = signal<boolean>(undefined);
    enabled = signal<boolean>(undefined);
    styleClass = signal<string>(undefined);
    tabSeq = signal<number>(undefined);
    toolTipText = signal<string>(undefined);

    onActionMethodID: (e: Event, data?: unknown) => void;
    onFocusGainedMethodID: (e: Event, data?: unknown) => void;
    onFocusLostMethodID: (e: Event, data?: unknown) => void;
    onDataChangeMethodID: (e: Event, data?: unknown) => void;

    format = signal<Format>(undefined);
    readOnly = signal<boolean>(undefined);
    findmode = signal<boolean>(undefined);
    editable = signal<boolean>(undefined);

    dataProviderID = signal<unknown>(undefined);
    dataProviderIDChange = output<unknown>();

    @ViewChild('element') element: ServoyBootstrapCalendarinline;
}

const defaultValues = {
    servoyApi: new ServoyApiTesting(),
    enabled: true,
    readOnly: false,
    findmode: false,
    format: { type: 'DATETIME', display: 'dd-MM-yyyy' } as Format,
    editable: true,
    dataProviderID: new Date(2025, 10, 11),
    theme: 'light',
    calendarWeeks: false,
    options: undefined,
    styleClass: undefined,
    tabSeq: undefined,
    toolTipText: undefined,
    onActionMethodID: undefined,
    onFocusGainedMethodID: undefined,
    onFocusLostMethodID: undefined,
    onDataChangeMethodID: undefined
};

function applyDefaultProps(wrapper) {
    for (const key in defaultValues) {
        if (wrapper.component.hasOwnProperty(key) && typeof wrapper.component[key] === 'function') {
            // If the property is a signal, update it using .set()
            wrapper.component[key].set(defaultValues[key]);
        }
        else {
            // Otherwise assign it as a normal property
            wrapper.component[key] = defaultValues[key];
        }
    }
}

describe('ServoyBootstrapCalendarinline', () => {
    const configWrapper: MountConfig<WrapperComponent> = {
        declarations: [ServoyBootstrapCalendarinline],
        imports: [ServoyPublicTestingModule, FormsModule]
    };

    it('should mount and register the component', () => {
        const servoyApiSpy = defaultValues.servoyApi;
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('.tempus-dominus-widget').should('exist').then(() => {
                cy.wrap(registerComponent).should('be.called');
            });
        });
    });

    it('should show the dataprovider value', () => {
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('.day.active').should('have.attr', 'data-value', '2025-10-11');
        });
    });

    it('show a style class', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('.bts-calendar-inline').should('not.have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass.set('mystyleclass');
                cy.get('.bts-calendar-inline').should('have.class', 'mystyleclass')
            });
        });
    });

    it('show more then 1 style class', () => {
        defaultValues.styleClass = 'mystyleclass';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('.bts-calendar-inline').should('have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass.set('classA classB');
                cy.get('.bts-calendar-inline').should('have.class', 'classA').should('have.class', 'classB');
            });
        });
    });

    it('should be disabled', () => {
        defaultValues.enabled = false;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('.bts-calendar-inline').should('have.attr', 'disabled');
        });
    });

    it('should emit dataProviderIDChange event on input change', () => {
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            const dataProviderIDChange = cy.spy();
            wrapper.component.dataProviderIDChange.subscribe(dataProviderIDChange);
            cy.get('.tempus-dominus-widget')
                .invoke('css', 'display', 'block')
                .should('be.visible');
            cy.get('.day.active').should('have.attr', 'data-value', '2025-10-11').then(() => {
                cy.get('.day.weekend[data-value="2025-10-01"][data-day="1"]').click();
                cy.wrap(dataProviderIDChange).should('have.been.called');
            });
        });
    });

    it('should not emit dataProviderIDChange event dataprovder change', () => {
        defaultValues.dataProviderID = new Date(2025, 10, 11);
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            const dataProviderIDChange = cy.spy();
            wrapper.component.dataProviderIDChange.subscribe(dataProviderIDChange);
            cy.get('.day.active').should('have.attr', 'data-value', '2025-10-11').then(() => {
                const newDate = new Date(2025, 10, 14);
                wrapper.component.dataProviderID.set(newDate);
                wrapper.component.element._dataProviderID.set(newDate);
                expect(dataProviderIDChange).not.to.have.been.called;
                cy.get('.day.active').should('have.attr', 'data-value', '2025-10-14');
            });
        });
    });
});
