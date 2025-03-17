/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, ViewChild } from '@angular/core';
import { Format, ServoyApi, ServoyApiTesting, ServoyPublicTestingModule, IValuelist } from '@servoy/public';
import { ServoyBootstrapTypeahead } from './typeahead';
import { MountConfig } from 'cypress/angular';
import { FormsModule } from '@angular/forms';
import { NgbTypeahead, NgbHighlight } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

@Component({
    template: `<bootstrapcomponents-typeahead
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
                [appendToBody]="appendToBody"
                [format]="format"
                [filteringDebounce]="filteringDebounce"
                [selectOnEnter]="selectOnEnter"
                [showAs]="showAs"
                #element>
                </bootstrapcomponents-typeahead>`,
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
    format: Format;

    valuelistID: IValuelist;
    appendToBody: boolean;
    filteringDebounce: number;
    selectOnEnter: boolean = true;
    showAs: string = 'text';

    dataProviderID: unknown;
    dataProviderIDChange = (newData: unknown) => {
    };

    @ViewChild('element') element: ServoyBootstrapTypeahead;
}

describe('ServoyBootstrapTypeahead', () => {
    const servoyApiSpy = new ServoyApiTesting();

    const config: MountConfig<WrapperComponent> = {
        declarations: [ServoyBootstrapTypeahead],
        imports: [ServoyPublicTestingModule, FormsModule, NgbTypeahead, NgbHighlight]
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
            readOnly: false,
            findmode: false,
            editable: true,
            dataProviderID: 1,
            valuelistID: mockData,
            format: { "type": "TEXT" } as Format,
            filteringDebounce: 500,
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

    it('should show the text value', () => {
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('input').should('have.value', 'one');
        });
    });

    it('show a style class', () => {
        cy.mount(WrapperComponent, config).then(wrapper => {
            cy.get('input').should('not.have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass = 'mystyleclass';
                wrapper.fixture.detectChanges();
                cy.get('input').should('have.class', 'mystyleclass');
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
            cy.get('input').should('have.value', 'one').focus().type('{enter}').then(() => {
                cy.wrap(onActionMethodID).should('be.called');
            });
        });
    });

    it('should handle focus gained event', () => {
        const onFocusGainedMethodID = cy.stub();
        config.componentProperties.onFocusGainedMethodID = onFocusGainedMethodID;
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('input').should('have.value', 'one').focus().then(() => {
                cy.wrap(onFocusGainedMethodID).should('be.called');
            });
        });
    });

    it('should handle focus lost event', () => {
        const onFocusLostMethodID = cy.stub();
        config.componentProperties.onFocusLostMethodID = onFocusLostMethodID;
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('input').should('have.value', 'one').focus().blur().then(() => {
                cy.wrap(onFocusLostMethodID).should('be.called');
            });
        });
    });

    it('should not emit dataProviderIDChange event dataprovder change', () => {
        const dataProviderIDChange = cy.stub();
        config.componentProperties.dataProviderIDChange = dataProviderIDChange;
        cy.mount(WrapperComponent, config).then(wrapper => {
            cy.get('input').should('have.value', 'one').then(() => {
                wrapper.component.dataProviderID = 2;
                wrapper.fixture.detectChanges();
                expect(dataProviderIDChange).not.to.have.been.called;
                cy.get('input').should('have.value', 'two')
            });
        });
    });
});