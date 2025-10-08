/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, ViewChild } from '@angular/core';
import { Format, ServoyApi, ServoyApiTesting, ServoyPublicTestingModule, IValuelist } from '@servoy/public';
import { ServoyBootstrapSelect } from './select';
import { MountConfig } from 'cypress/angular';
import { FormsModule } from '@angular/forms';
import { ShowDisplayValuePipe } from '../lib/showDisplayValue.pipe';

@Component({
    template: `<bootstrapcomponents-select
                [servoyApi]="servoyApi"
                [onActionMethodID]="onActionMethodID"
                [onDataChangeMethodID]="onDataChangeMethodID"
                [onFocusGainedMethodID]="onFocusGainedMethodID"
                [onFocusLostMethodID]="onFocusLostMethodID"
                [dataProviderID]="dataProviderID"
                (dataProviderIDChange)="dataProviderIDChange($event)"
                [enabled]="enabled"
                [multiselect]="multiselect"
                [placeholderText]="placeholderText"
                [selectSize]="selectSize"
                [styleClass]="styleClass"
                [tabSeq]="tabSeq"
                [toolTipText]="toolTipText"
                [valuelistID]="valuelistID"
                #element>
                </bootstrapcomponents-select>`,
    standalone: false
})
class WrapperComponent {
    servoyApi: ServoyApi;

    onActionMethodID: (e: Event, data?: unknown) => void;
    onDataChangeMethodID: (e: Event, data?: unknown) => void;
    onFocusGainedMethodID: (e: Event, data?: unknown) => void;
    onFocusLostMethodID: (e: Event, data?: unknown) => void;

    dataProviderID: unknown;
    dataProviderIDChange = (newData: unknown) => {};
    
    enabled = true;
    multiselect: boolean;
    placeholderText: string;
    selectSize: number;
    styleClass: string;
    tabSeq: number;
    toolTipText: string;
    valuelistID: IValuelist;

    @ViewChild('element') element: ServoyBootstrapSelect;
}

describe('ServoyBootstrapSelect', () => {
    let servoyApiSpy;
    let mockData;

    const config: MountConfig<WrapperComponent>= {
        declarations: [ServoyBootstrapSelect, ShowDisplayValuePipe],
        imports: [ ServoyPublicTestingModule, FormsModule]
    }

    beforeEach(() => {
        servoyApiSpy = new ServoyApiTesting();

        mockData = [{
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
            dataProviderID: '1',
            multiselect: false,
            valuelistID: mockData
        }
    });

    it('should mount and register the component', () => {
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('select').should('exist').then(() => {
                cy.wrap(registerComponent).should('be.called');
            });
        });
    });

    it('should set the placeholder text', () => {
        config.componentProperties.placeholderText = 'Enter your name';
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('select').should('have.attr', 'placeholder', 'Enter your name');
        });
    });

    it('show a style class', () => {
        cy.mount(WrapperComponent, config).then(wrapper => {
            cy.get('select').should('not.have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass = 'mystyleclass';
                wrapper.fixture.detectChanges();
                cy.get('select').should('have.class', 'mystyleclass')
            });
        });
    });

    it('show more then 1 style class', () => {
        config.componentProperties.styleClass = 'mystyleclass';
        cy.mount(WrapperComponent, config).then(wrapper => {
            cy.get('select').should('have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass = 'classA classB';
                wrapper.fixture.detectChanges();
                cy.get('select').should('have.class', 'classA').should('have.class', 'classB');
            });
        });
    });

    it('should not allow multiselect', () => {
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('select').should('not.have.attr', 'multiple');
        });
    });
    
    it('should allow multiselect', () => {
        config.componentProperties.multiselect = true;
        cy.mount(WrapperComponent, config).then(wrapper => {
			wrapper.component.dataProviderID = ['1'];
			wrapper.fixture.detectChanges();
            cy.get('select').should('have.attr', 'multiple');
            cy.get('select').invoke('val').should('deep.equal', ["0: '1'"]).then(() => {
                cy.get('select').select(["0: '1'", "1: '2'"]).then(() => {
                    cy.get('select').invoke('val').should('deep.equal', ["0: '1'", "1: '2'"]);
                });
            });
        });
    });
    
    it('should handle enabled state', () => {
        cy.mount(WrapperComponent, config).then(wrapper => {
            cy.get('select').should('not.have.attr', 'disabled').then(() => {
                wrapper.component.enabled = false;
                wrapper.fixture.detectChanges();
                cy.get('select').should('have.attr', 'disabled');
            });
        });
    });

    it('should handle onaction  event', () => {
        const onActionMethodID = cy.stub();
        config.componentProperties.onActionMethodID = onActionMethodID;
        cy.mount(WrapperComponent, config).then(() => {
            cy.wrap(onActionMethodID).should('be.not.called');
            cy.get('select').should('have.value', '1').select('2').then(() => {
                cy.wrap(onActionMethodID).should('be.called');
            });
        });
    });

    it('should handle focus gained event', () => {
        const onFocusGainedMethodID = cy.stub();
        config.componentProperties.onFocusGainedMethodID = onFocusGainedMethodID;
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('select').should('have.value', '1').focus().then(() => {
                cy.wrap(onFocusGainedMethodID).should('be.called');
            });
        });
    });

    it('should handle focus lost event', () => {
        const onFocusLostMethodID = cy.stub();
        config.componentProperties.onFocusLostMethodID = onFocusLostMethodID;
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('select').should('have.value', '1').focus().blur().then(() => {
                cy.wrap(onFocusLostMethodID).should('be.called');
            });
        });
    });

    it('should emit dataProviderIDChange event on input change', () => {
        const dataProviderIDChange = cy.stub();
        config.componentProperties.dataProviderIDChange = dataProviderIDChange;
        cy.mount(WrapperComponent, config);
        cy.get('select').select('2').blur();
        cy.wrap(dataProviderIDChange).should('have.been.calledWith', '2');
    });

    it('should not emit dataProviderIDChange event dataprovder change', () => {
        const dataProviderIDChange = cy.stub();
        config.componentProperties.dataProviderIDChange = dataProviderIDChange;
        cy.mount(WrapperComponent, config).then(wrapper => {
            cy.get('select').should('have.value', '1').then(() => {
                wrapper.component.dataProviderID = '2';
                wrapper.fixture.detectChanges();
                expect(dataProviderIDChange).not.to.have.been.called;
                cy.get('select').should('have.value', '2')
            });
        });
    });
    
    it('should update the tooltip dynamically', () => {
        cy.mount(WrapperComponent, config).then((wrapper) => {
            wrapper.component.toolTipText = 'Updated tooltip';
            wrapper.fixture.detectChanges();
            cy.get('select').trigger('pointerenter').then(() => {
                cy.get('div[id="mktipmsg"]').should('have.text', 'Updated tooltip');
            });
        });
    });
});