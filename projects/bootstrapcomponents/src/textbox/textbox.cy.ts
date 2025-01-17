/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, ViewChild } from '@angular/core';
import { Format, ServoyApi, ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { ServoyBootstrapTextbox } from './textbox';
import { MountConfig } from 'cypress/angular';
import { FormsModule } from '@angular/forms';
import { wrap } from 'cypress/types/lodash';

@Component({
    template: `<bootstrapcomponents-textbox [servoyApi]="servoyApi" [enabled]="enabled" [readOnly]="readOnly" [findmode]="findmode" [editable]="editable"
                [onActionMethodID]="onActionMethodID" [onFocusGainedMethodID]="onFocusGainedMethodID" [onFocusLostMethodID]="onFocusLostMethodID" 
                [onRightClickMethodID]="onRightClickMethodID" [format]="format" [autocomplete]="autocomplete" [styleClassForEye]="styleClassForEye" 
                [placeholderText]="placeholderText" [selectOnEnter]="selectOnEnter" [inputType]="inputType" (inputTypeChange)="inputTypeChange($event)" 
                [dataProviderID]="dataProviderID" (dataProviderIDChange)="dataProviderIDChange($event)" [styleClassForEye]="styleClassForEye"
                [styleClass]="styleClass" [variant]="variant" [toolTipText]="toolTipText" [tabSeq]="tabSeq" #element>
                </bootstrapcomponents-textbox>`,
    standalone: false
})
class WrapperComponent {
    servoyApi: ServoyApi;
    
    enabled = true;
    styleClass: string;
    variant: string[];
    tabSeq: number;
    toolTipText: string;
    
    onActionMethodID: (e: Event, data?: unknown) => void;
    onFocusGainedMethodID: (e: Event, data?: unknown) => void;
    onFocusLostMethodID: (e: Event, data?: unknown) => void;
    onRightClickMethodID: (e: Event, data?: unknown) => void;

    format: Format = {type: 'TEXT'} as Format
    autocomplete: string;
    styleClassForEye: string;
    readOnly: boolean;
    findmode: boolean;
    editable: boolean;
    placeholderText: string;
    selectOnEnter: boolean;
    
    inputType: string;
    inputTypeChange = (newData: unknown) => {
    };

    dataProviderID: unknown;
    dataProviderIDChange = (newData: unknown) => {
    };

    @ViewChild('element') element: ServoyBootstrapTextbox;
}

describe('ServoyBootstrapTextbox', () => {
    const servoyApiSpy = new ServoyApiTesting(); 

    const config: MountConfig<WrapperComponent>= {
        declarations: [ServoyBootstrapTextbox],
        imports: [ ServoyPublicTestingModule, FormsModule]
    }

    beforeEach(() => {
        config.componentProperties = {
            servoyApi: servoyApiSpy,
            enabled: true,
            readOnly: false,
            findmode: false,
            format: {type: 'TEXT'} as Format,
            editable: true,
            placeholderText: 'Enter text',
            selectOnEnter: false,
            inputType: 'text',
            dataProviderID: 'initialValue'
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
        config.componentProperties.dataProviderID = 'myvalue';
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('input').should('have.value', 'myvalue');
        });
    });

    it('should set the placeholder text', () => {
        config.componentProperties.placeholderText = 'Enter your name';
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('input').should('have.attr', 'placeholder', 'Enter your name');
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

    it('show more variant classes', () => {
        cy.mount(WrapperComponent, config).then(wrapper => {
            cy.get('input').should('not.have.class', 'varianta').then(() => {
                wrapper.component.variant = ['variantA', 'variantB'];
                wrapper.fixture.detectChanges();
                cy.get('input').should('have.class', 'variantA').should('have.class', 'variantB');
            });
        });
    });

    it('show a class for eye style class', () => {
        cy.mount(WrapperComponent, config).then(wrapper => {
            cy.get('div[id="svy-textbox-eyeDiv"]').should('not.exist').then(() => {
                wrapper.component.styleClassForEye = 'glyphicon glyphicon-eye-open glyphicon-eye-close';
                wrapper.fixture.detectChanges();
                cy.get('div[id="svy-textbox-eyeDiv"]').should('not.exist').then(() => {
                    wrapper.component.inputType = 'password-with-eye';
                    wrapper.fixture.detectChanges();
                    cy.get('div[id="svy-textbox-eyeDiv"]').should('exist').should('have.class', 'glyphicon');
                });
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

    it('should have the correct input type', () => {
        config.componentProperties.inputType = 'password';
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('input').should('have.attr', 'type', 'password');
        });
    });

    it('should handle select on enter', () => {
        config.componentProperties.selectOnEnter = true;
        config.componentProperties.dataProviderID = 'myvalue';
        cy.mount(WrapperComponent, config).then(() => {
            // you need to test if the value is there for the component to be fully initialized
            // just getting the input (of the textbox) can result in that it is not fully mounted yet (svnOnchanges not called yet)
            // and focus() will bomb out because the Format property is not yet set
            cy.get('input').should('have.value', 'myvalue').focus().then(() => {
                // see the commands.ts file in the cypress/support folder for the have.selection example
                cy.get('input').should('have.selection', 'myvalue');
            });
        });
    });

    it('should handle onaction  event', () => {
        const onActionMethodID = cy.stub();
        config.componentProperties.onActionMethodID = onActionMethodID;
        cy.mount(WrapperComponent, config).then(() => {
            cy.wrap(onActionMethodID).should('be.not.called');
            cy.get('input').should('have.value', 'initialValue').focus().type('{enter}').then(() => {
                cy.wrap(onActionMethodID).should('be.called');
            });
        });
    });

    it('should handle focus gained event', () => {
        const onFocusGainedMethodID = cy.stub();
        config.componentProperties.onFocusGainedMethodID = onFocusGainedMethodID;
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('input').should('have.value', 'initialValue').focus().then(() => {
                cy.wrap(onFocusGainedMethodID).should('be.called');
            });
        });
    });

    it('should handle focus lost event', () => {
        const onFocusLostMethodID = cy.stub();
        config.componentProperties.onFocusLostMethodID = onFocusLostMethodID;
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('input').should('have.value', 'initialValue').focus().blur().then(() => {
                cy.wrap(onFocusLostMethodID).should('be.called');
            });
        });
    });

    it('should handle right click event', () => {
        const onRightClickMethodID = cy.stub();
        config.componentProperties.onRightClickMethodID = onRightClickMethodID;
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('input').rightclick().then(() => {
                expect(onRightClickMethodID).to.have.been.called;
            });
        });
    });

    it('should emit dataProviderIDChange event on input change', () => {
        const dataProviderIDChange = cy.stub();
        config.componentProperties.dataProviderIDChange = dataProviderIDChange;
        config.componentProperties.dataProviderID = '';
        cy.mount(WrapperComponent, config);
        cy.get('input').type('New Value').blur();
        cy.wrap(dataProviderIDChange).should('have.been.calledWith', 'New Value');
    });

    it('should not emit dataProviderIDChange event dataprovder change', () => {
        const dataProviderIDChange = cy.stub();
        config.componentProperties.dataProviderIDChange = dataProviderIDChange;
        cy.mount(WrapperComponent, config).then(wrapper => {

            cy.get('input').should('have.value', 'initialValue').then(() => {
                wrapper.component.dataProviderID = 'new value';
                wrapper.fixture.detectChanges();
                expect(dataProviderIDChange).not.to.have.been.called;
                cy.get('input').should('have.value', 'new value')
            });
        });
    });

    it('should emit inputchange event setInputApi call', () => {
        const inputTypeChange = cy.stub();
        config.componentProperties.inputTypeChange = inputTypeChange;
        cy.mount(WrapperComponent, config).then(wrapper => {
            cy.get('input').should('have.attr', 'type', 'text').then(() => {
                wrapper.component.element.setInputType('password');
                expect(inputTypeChange).to.have.been.calledWith('password');
                wrapper.component.element.setInputType('password');
                expect(inputTypeChange).to.have.been.called.calledOnce;
                wrapper.fixture.detectChanges();
                cy.get('input').should('have.attr', 'type', 'password')
            });
        });
    });


    it('should select text and return it', () => {
        const focusGainedSpy = cy.stub();
        config.componentProperties.onFocusGainedMethodID = focusGainedSpy;
        cy.mount(WrapperComponent, config).then(wrapper => {
            cy.get('input').should('have.value', 'initialValue').should('not.have.focus').then(() => {
               wrapper.component.element.requestFocus(true);
               cy.get('input').should('have.focus');
               cy.wrap(focusGainedSpy).should('be.called');
            });
        });
    });
});