/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, ViewChild, signal, output } from '@angular/core';
import { Format, ServoyApi, ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { ServoyFloatLabelBootstrapTextbox } from './floatlabeltextbox';
import { MountConfig } from 'cypress/angular';
import { FormsModule } from '@angular/forms';

@Component({
    template: `<bootstrapcomponents-floatlabeltextbox [servoyApi]="servoyApi" [enabled]="enabled()" [readOnly]="readOnly()" [findmode]="findmode()" [editable]="editable()"
                [onActionMethodID]="onActionMethodID" [onFocusGainedMethodID]="onFocusGainedMethodID" [onFocusLostMethodID]="onFocusLostMethodID" 
                [onRightClickMethodID]="onRightClickMethodID" [format]="format()" [autocomplete]="autocomplete()" [styleClassForEye]="styleClassForEye()" 
                [floatLabelText]="floatLabelText()" [selectOnEnter]="selectOnEnter()" [inputType]="inputType()" (inputTypeChange)="inputTypeChange.emit($event)" 
                [dataProviderID]="dataProviderID()" (dataProviderIDChange)="dataProviderIDChange.emit($event)"
                [styleClass]="styleClass()" [variant]="variant()" [toolTipText]="toolTipText()" [tabSeq]="tabSeq()" #element>
                </bootstrapcomponents-floatlabeltextbox>`,
    standalone: false
})
class WrapperComponent {
    servoyApi: ServoyApi;

    enabled = signal<boolean>(undefined);
    styleClass = signal<string>(undefined);
    variant = signal<string[]>(undefined);
    tabSeq = signal<number>(undefined);
    toolTipText = signal<string>(undefined);

    onActionMethodID: (e: Event, data?: unknown) => void;
    onFocusGainedMethodID: (e: Event, data?: unknown) => void;
    onFocusLostMethodID: (e: Event, data?: unknown) => void;
    onRightClickMethodID: (e: Event, data?: unknown) => void;

    format = signal<Format>(undefined);
    autocomplete = signal<string>(undefined);
    styleClassForEye = signal<string>(undefined);
    readOnly = signal<boolean>(undefined);
    findmode = signal<boolean>(undefined);
    editable = signal<boolean>(undefined);
    floatLabelText = signal<string>(undefined);
    selectOnEnter = signal<boolean>(undefined);

    inputType = signal<string>(undefined);
    inputTypeChange = output<string>();

    dataProviderID = signal<unknown>(undefined);
    dataProviderIDChange = output<unknown>();

    @ViewChild('element') element: ServoyFloatLabelBootstrapTextbox;
}

const defaultValues = {
    servoyApi: new ServoyApiTesting(),
    enabled: true,
    readOnly: false,
    findmode: false,
    format: { type: 'TEXT' } as Format,
    editable: true,
    floatLabelText: 'Enter text',
    selectOnEnter: false,
    inputType: 'text',
    dataProviderID: 'initialValue',
    styleClass: undefined,
    variant: undefined,
    tabSeq: undefined,
    toolTipText: undefined,
    autocomplete: undefined,
    styleClassForEye: undefined,
    onActionMethodID: undefined,
    onFocusGainedMethodID: undefined,
    onFocusLostMethodID: undefined,
    onRightClickMethodID: undefined
};

function applyDefaultProps(wrapper) {
    for (const key in defaultValues) {
        if (wrapper.component.hasOwnProperty(key) && typeof wrapper.component[key] === 'function') {
            // If the property is a signal, update it using .set()
            wrapper.component[key].set(defaultValues[key]);
        }
        else {
            // Otherwise assign it as a normal property
            wrapper.component[key] = defaultValues[key];
        }
    }
}

describe('ServoyFloatLabelBootstrapTextbox', () => {
    const configWrapper: MountConfig<WrapperComponent> = {
        declarations: [ServoyFloatLabelBootstrapTextbox],
        imports: [ServoyPublicTestingModule, FormsModule]
    };

    it('should mount and register the component', () => {
        const servoyApiSpy = defaultValues.servoyApi;
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('input').should('exist').then(() => {
                cy.wrap(registerComponent).should('be.called');
            });
        });
    });

    it('should show the dataprovider value', () => {
        defaultValues.dataProviderID = 'myvalue';
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('input').should('have.value', 'myvalue');
        });
    });

    it('should set the placeholder text', () => {
        defaultValues.floatLabelText = 'Enter your name';
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('input').should('have.attr', 'placeholder', 'Enter your name');
        });
    });

    it('show a style class', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('input').should('not.have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass.set('mystyleclass');
                cy.get('input').should('have.class', 'mystyleclass')
            });
        });
    });

    it('show more then 1 style class', () => {
        defaultValues.styleClass = 'mystyleclass';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('input').should('have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass.set('classA classB');
                cy.get('input').should('have.class', 'classA').should('have.class', 'classB');
            });
        });
    });

    it('show more variant classes', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('input').should('not.have.class', 'varianta').then(() => {
                wrapper.component.variant.set(['variantA', 'variantB']);
                cy.get('input').should('have.class', 'variantA').should('have.class', 'variantB');
            });
        });
    });

    it('show a class for eye style class', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('div[id="svy-textbox-eyeDiv"]').should('not.exist').then(() => {
                wrapper.component.styleClassForEye.set('glyphicon glyphicon-eye-open glyphicon-eye-close');
                cy.get('div[id="svy-textbox-eyeDiv"]').should('not.exist').then(() => {
                    wrapper.component.inputType.set('password-with-eye');
                    cy.get('div[id="svy-textbox-eyeDiv"]').should('exist').should('have.class', 'glyphicon');
                });
            });
        });
    });

    it('should be read-only', () => {
        defaultValues.readOnly = true;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('input').should('have.attr', 'readonly');
        });
    });

    it('should be editable', () => {
        defaultValues.editable = true;
        defaultValues.readOnly = false;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('input').should('not.have.attr', 'readonly');
        });
    });

    it('should have the correct input type', () => {
        defaultValues.inputType = 'password';
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('input').should('have.attr', 'type', 'password');
        });
    });

    it('should handle select on enter', () => {
        defaultValues.selectOnEnter = true;
        defaultValues.dataProviderID = 'myvalue';
        defaultValues.inputType = 'text';
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            // you need to test if the value is there for the component to be fully initialized
            // just getting the input (of the textbox) can result in that it is not fully mounted yet (svnOnchanges not called yet)
            // and focus() will bomb out because the Format property is not yet set
            cy.get('input').should('have.value', 'myvalue').click().then(() => {
                // see the commands.ts file in the cypress/support folder for the have.selection example
                cy.get('input').should('have.selection', 'myvalue');
            });
        });
    });

    it('should handle onaction  event', () => {
        const onActionMethodID = cy.stub();
        defaultValues.onActionMethodID = onActionMethodID;
        defaultValues.dataProviderID = 'initialValue';
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.wrap(onActionMethodID).should('be.not.called');
            cy.get('input').should('have.value', 'initialValue').focus().type('{enter}').then(() => {
                cy.wrap(onActionMethodID).should('be.called');
            });
        });
    });

    it('should handle focus gained event', () => {
        const onFocusGainedMethodID = cy.stub();
        defaultValues.onFocusGainedMethodID = onFocusGainedMethodID;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('input').should('have.value', 'initialValue').focus().then(() => {
                cy.wrap(onFocusGainedMethodID).should('be.called');
            });
        });
    });

    it('should handle focus lost event', () => {
        const onFocusLostMethodID = cy.stub();
        defaultValues.onFocusLostMethodID = onFocusLostMethodID;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('input').should('have.value', 'initialValue').focus().blur().then(() => {
                cy.wrap(onFocusLostMethodID).should('be.called');
            });
        });
    });

    it('should handle right click event', () => {
        const onRightClickMethodID = cy.stub();
        defaultValues.onRightClickMethodID = onRightClickMethodID;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('input').rightclick().then(() => {
                expect(onRightClickMethodID).to.have.been.called;
            });
        });
    });

    it('should emit dataProviderIDChange event on input change', () => {
        defaultValues.dataProviderID = '';
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            const dataProviderIDChange = cy.spy();
            wrapper.component.dataProviderIDChange.subscribe(dataProviderIDChange);
            cy.get('input').type('New Value').blur().then(() => {
                cy.wrap(dataProviderIDChange).should('have.been.calledWith', 'New Value');
            });
        });
    });

    it('should not emit dataProviderIDChange event dataprovder change', () => {
        defaultValues.dataProviderID = 'initialValue';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            const dataProviderIDChange = cy.spy();
            wrapper.component.dataProviderIDChange.subscribe(dataProviderIDChange);
            cy.get('input').should('have.value', 'initialValue').then(() => {
                wrapper.component.dataProviderID.set('new value');
                cy.get('input').should('have.value', 'new value').then(() => {
                    expect(dataProviderIDChange).not.to.have.been.called;
                });
            });
        });
    });

    it('should emit inputchange event setInputApi call', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            const inputTypeChange = cy.spy();
            wrapper.component.inputTypeChange.subscribe(inputTypeChange);
            cy.get('input').should('have.attr', 'type', 'text').then(() => {
                wrapper.component.element.setInputType('password');
                expect(inputTypeChange).to.have.been.calledWith('password');
                cy.get('input').should('have.attr', 'type', 'password');
            });
        });
    });

    it('should select text and return it', () => {
        const focusGainedSpy = cy.stub();
        defaultValues.onFocusGainedMethodID = focusGainedSpy;
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('input').should('have.value', 'initialValue').should('not.have.focus').then(() => {
                wrapper.component.element.requestFocus(true);
                cy.get('input').should('have.focus');
                cy.wrap(focusGainedSpy).should('be.called');
            });
        });
    });
});
