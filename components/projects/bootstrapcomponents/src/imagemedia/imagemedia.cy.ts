/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, ViewChild } from '@angular/core';
import { ServoyApi, ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { ServoyBootstrapImageMedia } from './imagemedia';
import { MountConfig } from 'cypress/angular';
import { FormsModule } from '@angular/forms';

@Component({
    template: `<bootstrapcomponents-imagemedia
                [servoyApi]="servoyApi"
                [enabled]="enabled"
                [onActionMethodID]="onActionMethodID"
                [onDataChangeMethodID]="onDataChangeMethodID"
                [dataProviderID]="dataProviderID"
                (dataProviderIDChange)="dataProviderIDChange($event)"
                [styleClass]="styleClass"
                [toolTipText]="toolTipText"
                [tabSeq]="tabSeq"
                [media]="media"
                [alternate]="alternate"
                #element>
                </bootstrapcomponents-imagemedia>`,
    standalone: false
})
class WrapperComponent {
    servoyApi: ServoyApi;

    enabled: boolean;
    styleClass: string;
    tabSeq: number;
    toolTipText: string;

    onActionMethodID: (e: Event, data?: unknown) => void;
    onDataChangeMethodID: (e: Event, data?: unknown) => void;

    placeholderText: string;
    media: string;
    alternate: string;

    dataProviderID: unknown;
    dataProviderIDChange = (newData: unknown) => {
    };

    @ViewChild('element') element: ServoyBootstrapImageMedia;
}

describe('ServoyBootstrapImageMedia', () => {
    const servoyApiSpy = new ServoyApiTesting();

    const config: MountConfig<WrapperComponent> = {
        declarations: [ServoyBootstrapImageMedia],
        imports: [ServoyPublicTestingModule, FormsModule]
    }

    beforeEach(() => {
        config.componentProperties = {
            servoyApi: servoyApiSpy,
            enabled: true,
            dataProviderID: 0,
        }
    });

    it('should mount and register the component', () => {
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('.svy-mediafield').should('exist').then(() => {
                cy.wrap(registerComponent).should('be.called');
            });
        });
    });

    it('should show the empty gif', () => {
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('.svy-mediafield .bts-media').should('have.attr', 'src', 'bootstrapcomponents/imagemedia/images/empty.gif');
        });
    });
    
    it('should show the media img', () => {
        config.componentProperties.media = 'image.png';
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('.svy-mediafield .bts-media').should('have.attr', 'src', 'image.png');
        });
    });

    it('show a style class', () => {
        cy.mount(WrapperComponent, config).then(wrapper => {
            cy.get('.svy-mediafield').should('not.have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass = 'mystyleclass';
                wrapper.fixture.detectChanges();
                cy.get('.svy-mediafield').should('have.class', 'mystyleclass')
            });
        });
    });

    it('show more then 1 style class', () => {
        config.componentProperties.styleClass = 'mystyleclass';
        cy.mount(WrapperComponent, config).then(wrapper => {
            cy.get('.svy-mediafield').should('have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass = 'classA classB';
                wrapper.fixture.detectChanges();
                cy.get('.svy-mediafield').should('have.class', 'classA').should('have.class', 'classB');
            });
        });
    });

    it('should be disabled', () => {
        config.componentProperties.enabled = false;
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('.svy-mediafield').should('have.attr', 'disabled');
        });
    });
    
    it('should handle onaction  event', () => {
        const onActionMethodID = cy.stub();
        config.componentProperties.onActionMethodID = onActionMethodID;
        cy.mount(WrapperComponent, config).then(() => {
            cy.wrap(onActionMethodID).should('be.not.called');
            cy.get('.svy-mediafield').should('exist').click({ force: true }).then(() => {
                cy.wrap(onActionMethodID).should('be.called');
            });
        });
    });
});