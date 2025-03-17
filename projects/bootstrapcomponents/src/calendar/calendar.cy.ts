/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, ViewChild } from '@angular/core';
import { Format, ServoyApi, ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { ServoyBootstrapCalendar } from './calendar';
import { MountConfig } from 'cypress/angular';
import { FormsModule } from '@angular/forms';
import { Options } from '@eonasdan/tempus-dominus';
import '@eonasdan/tempus-dominus/dist/css/tempus-dominus.css';

@Component({
    template: `<bootstrapcomponents-calendar
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
                [selectOnEnter]="selectOnEnter" 
                [dataProviderID]="dataProviderID"
                (dataProviderIDChange)="dataProviderIDChange($event)"
                [styleClass]="styleClass"
                [toolTipText]="toolTipText"
                [placeholderText]="placeholderText"
                [tabSeq]="tabSeq"
                [pickerOnly]="pickerOnly"
                [calendarWeeks]="calendarWeeks"
                [theme]="theme"
                [options]="options"
                #element>
                </bootstrapcomponents-calendar>`,
    standalone: false
})
class WrapperComponent {
    servoyApi: ServoyApi;
    
    options: Options;
    theme: string;
    pickerOnly: boolean;
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
    placeholderText: string;
    selectOnEnter: boolean;

    dataProviderID: unknown;
    dataProviderIDChange = (newData: unknown) => {
    };

    @ViewChild('element') element: ServoyBootstrapCalendar;
}

describe('ServoyBootstrapCalendar', () => {
    const servoyApiSpy = new ServoyApiTesting(); 

    const config: MountConfig<WrapperComponent>= {
        declarations: [ServoyBootstrapCalendar],
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
            selectOnEnter: false,
            dataProviderID: new Date(2025, 10, 11),
            theme: 'dark',
            pickerOnly: false,
            calendarWeeks: false,
        }
    });

    it('should mount and register the component', () => {
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('input').should('exist').then(() => {
                cy.wrap(registerComponent).should('be.called');
            });
        });
    });

    it('should show the dataprovider value', () => {
        config.componentProperties.dataProviderID = new Date(1995, 11, 17);
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('input').should('have.value', '17-12-1995');
        });
    });

    it('show a style class', () => {
        cy.mount(WrapperComponent, config).then(wrapper => {
            cy.get('input').should('not.have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass = 'mystyleclass';
                wrapper.fixture.detectChanges();
                cy.get('input').should('have.class', 'mystyleclass')
            });
        });
    });

    it('show more then 1 style class', () => {
        config.componentProperties.styleClass = 'mystyleclass';
        cy.mount(WrapperComponent, config).then(wrapper => {
            cy.get('input').should('have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass = 'classA classB';
                wrapper.fixture.detectChanges();
                cy.get('input').should('have.class', 'classA').should('have.class', 'classB');
            });
        });
    });

    it('should be read-only', () => {
        config.componentProperties.readOnly = true;
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('input').should('have.attr', 'readonly');
        });
    });

    it('should be editable', () => {
        config.componentProperties.editable = true;
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('input').should('not.have.attr', 'readonly');
        });
    });

    it('should handle select on enter', () => {
        config.componentProperties.selectOnEnter = true;
        config.componentProperties.dataProviderID = new Date(2023, 10, 10);
        cy.mount(WrapperComponent, config).then(() => {
            // you need to test if the value is there for the component to be fully initialized
            // just getting the input (of the textbox) can result in that it is not fully mounted yet (svnOnchanges not called yet)
            // and focus() will bomb out because the Format property is not yet set
            cy.get('input').should('have.value', '10-11-2023').click().then(() => {
                // see the commands.ts file in the cypress/support folder for the have.selection example
                cy.get('input').should('have.selection', '10-11-2023');
            });
        });
    });

    it('should handle onaction  event', () => {
        const onActionMethodID = cy.stub();
        config.componentProperties.onActionMethodID = onActionMethodID;
        cy.mount(WrapperComponent, config).then(() => {
            cy.wrap(onActionMethodID).should('be.not.called');
            cy.get('input').should('have.value', '11-11-2025').focus().type('{enter}').then(() => {
                cy.wrap(onActionMethodID).should('be.called');
            });
        });
    });

    it('should handle focus gained event', () => {
        const onFocusGainedMethodID = cy.stub();
        config.componentProperties.onFocusGainedMethodID = onFocusGainedMethodID;
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('input').should('have.value', '11-11-2025').focus().then(() => {
                cy.wrap(onFocusGainedMethodID).should('be.called');
            });
        });
    });

    it('should handle focus lost event', () => {
        const onFocusLostMethodID = cy.stub();
        config.componentProperties.onFocusLostMethodID = onFocusLostMethodID;
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('input').should('have.value', '11-11-2025').focus().blur().then(() => {
                cy.wrap(onFocusLostMethodID).should('be.called');
            });
        });
    });

    it('should emit dataProviderIDChange event on input change', () => {
        const dataProviderIDChange = cy.stub();
        config.componentProperties.dataProviderIDChange = dataProviderIDChange;
        config.componentProperties.dataProviderID = '';
        cy.mount(WrapperComponent, config);
        cy.get('input').type('10-02-2024').blur();
        cy.wrap(dataProviderIDChange).should('have.been.called');
    });

    it('should not emit dataProviderIDChange event dataprovder change', () => {
        const dataProviderIDChange = cy.stub();
        config.componentProperties.dataProviderIDChange = dataProviderIDChange;
        cy.mount(WrapperComponent, config).then(wrapper => {
            cy.get('input').should('have.value', '11-11-2025').then(() => {
                wrapper.component.dataProviderID = new Date(2025, 10, 14);
                wrapper.fixture.detectChanges();
                expect(dataProviderIDChange).not.to.have.been.called;
                cy.get('input').should('have.value', '14-11-2025');
            });
        });
    });

    it('should select text and return it', () => {
        const focusGainedSpy = cy.stub();
        config.componentProperties.onFocusGainedMethodID = focusGainedSpy;
        cy.mount(WrapperComponent, config).then(wrapper => {
            cy.get('input').should('have.value', '11-11-2025').should('not.have.focus').then(() => {
               wrapper.component.element.requestFocus(true);
               cy.get('input').should('have.focus');
               cy.wrap(focusGainedSpy).should('be.called');
            });
        });
    });
});