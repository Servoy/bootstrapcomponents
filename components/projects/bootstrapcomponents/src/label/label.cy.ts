/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, ViewChild } from '@angular/core';
import { ServoyApi, ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { ServoyBootstrapLabel } from './label';
import { MountConfig } from 'cypress/angular';
import { FormsModule } from '@angular/forms';

@Component({
    template: `<bootstrapcomponents-label
                [servoyApi]="servoyApi"
                [enabled]="enabled"
                [onActionMethodID]="onActionMethodID"
                [onDoubleClickMethodID]="onDoubleClickMethodID"
                [onRightClickMethodID]="onRightClickMethodID"
                [styleClass]="styleClass"
                [toolTipText]="toolTipText"
                [tabSeq]="tabSeq"
                [showAs]="showAs"
                [text]="text"
                [variant]="variant"
                [trailingImageStyleClass]="trailingImageStyleClass"
                [labelFor]="labelFor"
                [imageStyleClass]="imageStyleClass"
                #element>
                </bootstrapcomponents-label>`,
    standalone: false
})
class WrapperComponent {
    servoyApi: ServoyApi;

    enabled: boolean;
    styleClass: string;
    tabSeq: number;
    toolTipText: string;

    onActionMethodID: (e: Event, data?: unknown) => void;
    onDoubleClickMethodID: (e: Event, data?: unknown) => void;
    onRightClickMethodID: (e: Event, data?: unknown) => void;

    placeholderText: string;
    showAs: string;
    text: string;
    variant: string[];
    trailingImageStyleClass: string;
    labelFor: string;
    imageStyleClass: string;

    @ViewChild('element') element: ServoyBootstrapLabel;
}

describe('ServoyBootstrapLabel', () => {
    const servoyApiSpy = new ServoyApiTesting();

    const config: MountConfig<WrapperComponent> = {
        declarations: [ServoyBootstrapLabel],
        imports: [ServoyPublicTestingModule, FormsModule]
    }

    beforeEach(() => {
        config.componentProperties = {
            servoyApi: servoyApiSpy,
            enabled: true,
            showAs: 'text',
            text: 'Label',
        }
    });

    it('should mount and register the component', () => {
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('.bts-label').should('exist').then(() => {
                cy.wrap(registerComponent).should('be.called');
            });
        });
    });

    it('should show the text value', () => {
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('.bts-label span').should('have.text', 'Label');
        });
    });
    
    it('should show as HTML the value', () => {
        config.componentProperties.text = '<b>Label</b>';
        config.componentProperties.showAs = 'html';
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('.bts-label span').should('have.html', '<b>Label</b>');
        });
    });

    it('show a style class', () => {
        cy.mount(WrapperComponent, config).then(wrapper => {
            cy.get('.bts-label').should('not.have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass = 'mystyleclass';
                wrapper.fixture.detectChanges();
                cy.get('.bts-label').should('have.class', 'mystyleclass')
            });
        });
    });

    it('show more then 1 style class', () => {
        config.componentProperties.styleClass = 'mystyleclass';
        cy.mount(WrapperComponent, config).then(wrapper => {
            cy.get('.bts-label').should('have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass = 'classA classB';
                wrapper.fixture.detectChanges();
                cy.get('.bts-label').should('have.class', 'classA').should('have.class', 'classB');
            });
        });
    });

    it('should be disabled', () => {
        config.componentProperties.enabled = false;
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('.bts-label').should('have.attr', 'disabled');
        });
    });
    
    it('should handle onaction  event', () => {
        const onActionMethodID = cy.stub();
        config.componentProperties.onActionMethodID = onActionMethodID;
        cy.mount(WrapperComponent, config).then(() => {
            cy.wrap(onActionMethodID).should('be.not.called');
            cy.get('.bts-label').should('exist').click({ force: true }).then(() => {
                cy.wrap(onActionMethodID).should('be.called');
            });
        });
    });
});