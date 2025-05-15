/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Format, ServoyApi, ServoyApiTesting, ServoyPublicTestingModule, IValuelist } from '@servoy/public';
import { ServoyBootstrapCombobox } from './combobox';
import { MountConfig } from 'cypress/angular';
import { FormsModule } from '@angular/forms';
import { NgbDropdownItem, NgbTooltip, NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

import 'bootstrap/dist/css/bootstrap.min.css';


@Component({
    template: `<bootstrapcomponents-combobox
                [servoyApi]="servoyApi"
                [enabled]="enabled"
                [onActionMethodID]="onActionMethodID"
                [onFocusGainedMethodID]="onFocusGainedMethodID"
                [onFocusLostMethodID]="onFocusLostMethodID" 
                [onDataChangeMethodID]="onDataChangeMethodID"
                [onRightClickMethodID]="onRightClickMethodID"
                [dataProviderID]="dataProviderID"
                (dataProviderIDChange)="dataProviderIDChange($event)"
                [styleClass]="styleClass"
                [toolTipText]="toolTipText"
                [tabSeq]="tabSeq"
                [valuelistID] = "valuelistID"
                [appendToBody]="appendToBody"
                [format]="format"
                [showAs]="showAs"
                #element>
                </bootstrapcomponents-combobox>`,
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
    onRightClickMethodID: (e: Event, data?: unknown) => void;

    placeholderText: string;
    format: Format;

    valuelistID: IValuelist;
    appendToBody: boolean;
    showAs: string;

    dataProviderID: unknown;
    dataProviderIDChange = (newData: unknown) => {
    };

    @ViewChild('element') element: ServoyBootstrapCombobox;
    @ViewChildren(NgbDropdownItem) menuItems: QueryList<NgbDropdownItem>;
    @ViewChild('button') button: ElementRef<HTMLButtonElement>;
    @ViewChild('dropdown') dropdownElement: ElementRef<HTMLElement>;
    @ViewChild(NgbDropdown) comboboxDropdown: NgbDropdown;
    @ViewChild('tooltip') tooltip: NgbTooltip;
}

describe('ServoyBootstrapCombobox', () => {
    const servoyApiSpy = new ServoyApiTesting();

    const config: MountConfig<WrapperComponent> = {
        declarations: [ServoyBootstrapCombobox],
        imports: [ServoyPublicTestingModule, FormsModule, NgbDropdownItem, NgbDropdown, NgbTooltip]
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
        mockData.getDisplayValue = (value) => {
            const item = mockData.filter(item => item.realValue === value)[0];
            return of(item?.displayValue);
        };
        config.componentProperties = {
            servoyApi: servoyApiSpy,
            enabled: true,
            dataProviderID: 1,
            valuelistID: mockData,
            format: { "type": "TEXT" } as Format,
        }
    });

    it('should mount and register the component', () => {
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('button').should('exist').then(() => {
                cy.wrap(registerComponent).should('be.called');
            });
        });
    });

    it('should show the text value', () => {
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('button span').should('have.text', 'one');
        });
    });

    it('show a style class', () => {
        cy.mount(WrapperComponent, config).then(wrapper => {
            cy.get('.bts-combobox-container').should('not.have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass = 'mystyleclass';
                wrapper.fixture.detectChanges();
                cy.get('.bts-combobox-container').should('have.class', 'mystyleclass')
            });
        });
    });

    it('show more then 1 style class', () => {
        config.componentProperties.styleClass = 'mystyleclass';
        cy.mount(WrapperComponent, config).then(wrapper => {
            cy.get('.bts-combobox-container').should('have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass = 'classA classB';
                wrapper.fixture.detectChanges();
                cy.get('.bts-combobox-container').should('have.class', 'classA').should('have.class', 'classB');
            });
        });
    });

    it('should be disabled', () => {
        config.componentProperties.enabled = false;
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('button').should('have.attr', 'disabled');
        });
    });

    it('should handle focus gained event', () => {
        const onFocusGainedMethodID = cy.stub();
        config.componentProperties.onFocusGainedMethodID = onFocusGainedMethodID;
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('button').click().then(() => {
                cy.wrap(onFocusGainedMethodID).should('be.called');
            });
        });
    });

    it('should handle focus lost event', () => {
        const onFocusLostMethodID = cy.stub();
        config.componentProperties.onFocusLostMethodID = onFocusLostMethodID;
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('button').click().then(() => {
                cy.get('body').click(0, 0).then(() => {
                    cy.wrap(onFocusLostMethodID).should('be.called');
                });

            });
        });
    });

    it('should emit dataProviderIDChange event on button change', () => {
        const dataProviderIDChange = cy.stub();
        config.componentProperties.dataProviderIDChange = dataProviderIDChange;
        cy.mount(WrapperComponent, config);
        cy.get('button span').should('have.text', 'one').then(() => {
            cy.get('button').focus().then(() => {
                cy.get('button').last().click(0, 0).then(() => {
                    cy.wrap(dataProviderIDChange).should('have.been.called');
                });
            });
        });
    });

    it('should not emit dataProviderIDChange event dataprovder change', () => {
        const dataProviderIDChange = cy.stub();
        config.componentProperties.dataProviderIDChange = dataProviderIDChange;
        cy.mount(WrapperComponent, config).then(wrapper => {
            cy.get('button span').should('have.text', 'one').then(() => {
                wrapper.component.dataProviderID = 2;
                wrapper.fixture.detectChanges();
                expect(dataProviderIDChange).not.to.have.been.called;
                cy.get('button span').should('have.text', 'two');
            });
        });
    });
    
    it('should handle onaction  event', () => {
        const onActionMethodID = cy.stub();
        config.componentProperties.onActionMethodID = onActionMethodID;
        cy.mount(WrapperComponent, config).then(() => {
            cy.wrap(onActionMethodID).should('be.not.called');
            cy.get('button span').should('have.text', 'one').then(() => {
                cy.get('button').focus().then(() => {
                    cy.get('button.dropdown-item').last().click(0, 0).then(() => {
                        cy.wrap(onActionMethodID).should('be.called');
                    });
                });
            });
        });
    });
});