/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, ViewChild } from '@angular/core';
import { ServoyApi, ServoyApiTesting, ServoyPublicTestingModule, IValuelist } from '@servoy/public';
import { ServoyBootstrapChoicegroup, ChoiceElementDirective } from './choicegroup';
import { MountConfig } from 'cypress/angular';
import { FormsModule } from '@angular/forms';

@Component({
    template: `<bootstrapcomponents-choicegroup
                [servoyApi]="servoyApi"
                [enabled]="enabled"
                [readOnly]="readOnly"
                [findmode]="findmode"
                [editable]="editable"
                [onActionMethodID]="onActionMethodID"
                [onFocusGainedMethodID]="onFocusGainedMethodID"
                [onFocusLostMethodID]="onFocusLostMethodID" 
                [onDataChangeMethodID]="onDataChangeMethodID"
                [dataProviderID]="dataProviderID"
                (dataProviderIDChange)="dataProviderIDChange($event)"
                [styleClass]="styleClass"
                [toolTipText]="toolTipText"
                [tabSeq]="tabSeq"
                [valuelistID] = "valuelistID"
                [inputType]="inputType"
                [alignment]="alignment"
                #element>
                </bootstrapcomponents-choicegroup>`,
    standalone: false
})
class WrapperComponent {
    servoyApi: ServoyApi;

    enabled: boolean;
    styleClass: string;
    tabSeq: number;
    toolTipText: string;

    onActionMethodID: (e: Event, data?: unknown) => void;
    onFocusGainedMethodID: (e: Event, data?: unknown) => void;
    onFocusLostMethodID: (e: Event, data?: unknown) => void;
    onDataChangeMethodID: (e: Event, data?: unknown) => void;

    readOnly: boolean;
    findmode: boolean;
    editable: boolean;
    placeholderText: string;
    
    alignment: string;
    valuelistID: IValuelist;

    inputType: string;
    inputTypeChange = (newData: unknown) => {
    };

    dataProviderID: unknown;
    dataProviderIDChange = (newData: unknown) => {
    };

    @ViewChild('element') element: ServoyBootstrapChoicegroup;
}

describe('ServoyBootstrapChoicegroup', () => {
    const servoyApiSpy = new ServoyApiTesting();

    const config: MountConfig<WrapperComponent> = {
        declarations: [ServoyBootstrapChoicegroup, ChoiceElementDirective],
        imports: [ServoyPublicTestingModule, FormsModule]
    }

    beforeEach(() => {
        const mockData = [{
            "displayValue": "one",
            "realValue": 1
        },
        {
            "displayValue": "two",
            "realValue": 2
        },
        {
            "displayValue": "three",
            "realValue": 3
        },
        {
            "displayValue": "four",
            "realValue": 4
        }] as IValuelist;
        config.componentProperties = {
            servoyApi: servoyApiSpy,
            enabled: true,
            readOnly: false,
            findmode: false,
            editable: true,
            dataProviderID: 0,
            inputType: 'checkbox',
            valuelistID: mockData,
            alignment: 'vertical',
        }
    });

    it('should mount and register the component', () => {
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('.bts-radiogroup').should('exist').then(() => {
                cy.wrap(registerComponent).should('be.called');
            });
        });
    });

    it('should show the text value', () => {
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('.bts-radiogroup label span').first().should('have.text', 'one');
        });
    });

    it('show a style class', () => {
        cy.mount(WrapperComponent, config).then(wrapper => {
            cy.get('.bts-radiogroup').should('not.have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass = 'mystyleclass';
                wrapper.fixture.detectChanges();
                cy.get('.bts-radiogroup').should('have.class', 'mystyleclass')
            });
        });
    });

    it('show more then 1 style class', () => {
        config.componentProperties.styleClass = 'mystyleclass';
        cy.mount(WrapperComponent, config).then(wrapper => {
            cy.get('.bts-radiogroup').should('have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass = 'classA classB';
                wrapper.fixture.detectChanges();
                cy.get('.bts-radiogroup').should('have.class', 'classA').should('have.class', 'classB');
            });
        });
    });

    it('should be disabled', () => {
        config.componentProperties.enabled = false;
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('input').should('have.attr', 'disabled');
        });
    });

    it('should handle onaction  event', () => {
        const onActionMethodID = cy.stub();
        config.componentProperties.onActionMethodID = onActionMethodID;
        cy.mount(WrapperComponent, config).then(() => {
            cy.wrap(onActionMethodID).should('be.not.called');
            cy.get('input').should('have.not.checked').first().then(() => {
                cy.get('input').first().focus().click({force: true}).then(() => {
                    cy.wrap(onActionMethodID).should('be.called');
                });
            });
        });
    });

    it('should handle focus gained event', () => {
        const onFocusGainedMethodID = cy.stub();
        config.componentProperties.onFocusGainedMethodID = onFocusGainedMethodID;
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('input').should('have.not.checked').first().focus().then(() => {
                cy.wrap(onFocusGainedMethodID).should('be.called');
            });
        });
    });

    it('should handle focus lost event', () => {
        const onFocusLostMethodID = cy.stub();
        config.componentProperties.onFocusLostMethodID = onFocusLostMethodID;
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('input').should('have.not.checked').first().focus().blur().then(() => {
                cy.wrap(onFocusLostMethodID).should('be.called');
            });
        });
    });

    it('should emit dataProviderIDChange event on input change', () => {
        const dataProviderIDChange = cy.stub();
        config.componentProperties.dataProviderIDChange = dataProviderIDChange;
        cy.mount(WrapperComponent, config);
        cy.get('input').first().should('have.not.checked').then(() => {
            cy.get('input').first().click();
            cy.wrap(dataProviderIDChange).should('have.been.called');
        });
    });

    it('should not emit dataProviderIDChange event dataprovder change', () => {
        const dataProviderIDChange = cy.stub();
        config.componentProperties.dataProviderIDChange = dataProviderIDChange;
        cy.mount(WrapperComponent, config).then(wrapper => {
            cy.get('input').should('have.not.checked').then(() => {
                wrapper.component.dataProviderID = 1;
                wrapper.fixture.detectChanges();
                expect(dataProviderIDChange).not.to.have.been.called;
                cy.get('input').should('have.checked');
            });
        });
    });
});