/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, ViewChild } from '@angular/core';
import { Format, ServoyApi, ServoyApiTesting, ServoyPublicTestingModule, IValuelist } from '@servoy/public';
import { ServoyBootstrapDatalabel, DesignTextPipe } from './datalabel';
import { MountConfig } from 'cypress/angular';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

@Component({
    template: `<bootstrapcomponents-datalabel
                [servoyApi]="servoyApi"
                [enabled]="enabled"
                [onActionMethodID]="onActionMethodID"
                [onDoubleClickMethodID]="onDoubleClickMethodID"
                [onRightClickMethodID]="onRightClickMethodID"
                [dataProviderID]="dataProviderID"
                (dataProviderIDChange)="dataProviderIDChange($event)"
                [styleClass]="styleClass"
                [toolTipText]="toolTipText"
                [tabSeq]="tabSeq"
                [valuelistID] = "valuelistID"
                [format]="format"
                [showAs]="showAs"
                [imageStyleClass]="imageStyleClass"
                #element>
                </bootstrapcomponents-datalabel>`,
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
    format: Format;
    showAs: string;
    valuelistID: IValuelist;
    imageStyleClass: string;

    dataProviderID: unknown;
    dataProviderIDChange = (newData: unknown) => {
    };

    @ViewChild('element') element: ServoyBootstrapDatalabel;
}

describe('ServoyBootstrapDatalabel', () => {
    const servoyApiSpy = new ServoyApiTesting();

    const config: MountConfig<WrapperComponent> = {
        declarations: [ServoyBootstrapDatalabel, DesignTextPipe],
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
        mockData.hasRealValues = () => { return true; };
        mockData.isRealValueDate = () => { return false; };
        mockData.filterList = (value) => { return of(mockData.filter(item => item.displayValue.includes(value))) };
        mockData.getDisplayValue = (value) => { return of(mockData.filter(item => item.realValue === value)) };
        
        config.componentProperties = {
            servoyApi: servoyApiSpy,
            enabled: true,
            dataProviderID: 'one',
            showAs: 'text',
            valuelistID: mockData,
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
            cy.get('.bts-label span').should('have.text', 'one');
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
            cy.get('.bts-label').should('exist').focus().click({ force: true }).then(() => {
                cy.wrap(onActionMethodID).should('be.called');
            });
        });
    });
});