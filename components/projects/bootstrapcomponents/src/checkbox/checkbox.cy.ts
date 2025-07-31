/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, ViewChild } from '@angular/core';
import { ServoyApi, ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { ServoyBootstrapCheckbox } from './checkbox';
import { MountConfig } from 'cypress/angular';
import { FormsModule } from '@angular/forms';

@Component({
    template: `<bootstrapcomponents-checkbox
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
                [text]="text"
                [tabSeq]="tabSeq"
                [showAs]="showAs"
                [selectedValue]="selectedValue"
                #element>
                </bootstrapcomponents-checkbox>`,
    standalone: false
})
class WrapperComponent {
    servoyApi: ServoyApi;
    
    enabled = true;
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
    
    text: any;
    showAs: string;
    selectedValue: any;

    dataProviderID: unknown;
    dataProviderIDChange = (newData: unknown) => {
    };

    @ViewChild('element') element: ServoyBootstrapCheckbox;
}

describe('ServoyBootstrapCheckbox', () => {
    const servoyApiSpy = new ServoyApiTesting(); 

    const config: MountConfig<WrapperComponent>= {
        declarations: [ServoyBootstrapCheckbox],
        imports: [ ServoyPublicTestingModule, FormsModule]
    }

    beforeEach(() => {
        config.componentProperties = {
            servoyApi: servoyApiSpy,
            enabled: true,
            readOnly: false,
            findmode: false,
            editable: true,
            dataProviderID: 0,
            text: 'Test Checkbox',
        }
    });

    it('should mount and register the component', () => {
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('.bts-check').should('exist').then(() => {
                cy.wrap(registerComponent).should('be.called');
            });
        });
    });

    it('should show the text value', () => {
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('.bts-check label span').should('have.text', 'Test Checkbox');
        });
    });

    it('show a style class', () => {
        cy.mount(WrapperComponent, config).then(wrapper => {
            cy.get('.bts-check').should('not.have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass = 'mystyleclass';
                wrapper.fixture.detectChanges();
                cy.get('.bts-check').should('have.class', 'mystyleclass')
            });
        });
    });

    it('show more then 1 style class', () => {
        config.componentProperties.styleClass = 'mystyleclass';
        cy.mount(WrapperComponent, config).then(wrapper => {
            cy.get('.bts-check').should('have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass = 'classA classB';
                wrapper.fixture.detectChanges();
                cy.get('.bts-check').should('have.class', 'classA').should('have.class', 'classB');
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
            cy.get('input').should('have.not.checked').focus().click().then(() => {
                cy.wrap(onActionMethodID).should('be.called');
            });
        });
    });

    it('should handle focus gained event', () => {
        const onFocusGainedMethodID = cy.stub();
        config.componentProperties.onFocusGainedMethodID = onFocusGainedMethodID;
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('input').should('have.not.checked').click().then(() => {
                cy.wrap(onFocusGainedMethodID).should('be.called');
            });
        });
    });

    it('should handle focus lost event', () => {
        const onFocusLostMethodID = cy.stub();
        config.componentProperties.onFocusLostMethodID = onFocusLostMethodID;
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('input').should('have.not.checked').click().blur().then(() => {
                cy.wrap(onFocusLostMethodID).should('be.called');
            });
        });
    });

    it('should emit dataProviderIDChange event on input change', () => {
        const dataProviderIDChange = cy.stub();
        config.componentProperties.dataProviderIDChange = dataProviderIDChange;
        cy.mount(WrapperComponent, config);
        cy.get('input').should('have.not.checked').then(() => {
            cy.get('input').click();
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