/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, ViewChild, signal, output } from '@angular/core';
import { ServoyApi, ServoyApiTesting, ServoyPublicTestingModule, IValuelist } from '@servoy/public';
import { ServoyBootstrapChoicegroup, ChoiceElementDirective } from './choicegroup';
import { MountConfig } from 'cypress/angular';
import { FormsModule } from '@angular/forms';

@Component({
    template: `<bootstrapcomponents-choicegroup
                [servoyApi]="servoyApi"
                [enabled]="enabled()"
                [readOnly]="readOnly()"
                [findmode]="findmode()"
                [editable]="editable()"
                [onActionMethodID]="onActionMethodID"
                [onFocusGainedMethodID]="onFocusGainedMethodID"
                [onFocusLostMethodID]="onFocusLostMethodID" 
                [onDataChangeMethodID]="onDataChangeMethodID"
                [dataProviderID]="dataProviderID()"
                (dataProviderIDChange)="dataProviderIDChange.emit($event)"
                [styleClass]="styleClass()"
                [toolTipText]="toolTipText()"
                [tabSeq]="tabSeq()"
                [valuelistID]="valuelistID()"
                [inputType]="inputType()"
                [alignment]="alignment()"
                #element>
                </bootstrapcomponents-choicegroup>`,
    standalone: false
})
class WrapperComponent {
    servoyApi: ServoyApi;

    enabled = signal<boolean>(undefined);
    styleClass = signal<string>(undefined);
    tabSeq = signal<number>(undefined);
    toolTipText = signal<string>(undefined);

    onActionMethodID: (e: Event, data?: unknown) => void;
    onFocusGainedMethodID: (e: Event, data?: unknown) => void;
    onFocusLostMethodID: (e: Event, data?: unknown) => void;
    onDataChangeMethodID: (e: Event, data?: unknown) => void;

    readOnly = signal<boolean>(undefined);
    findmode = signal<boolean>(undefined);
    editable = signal<boolean>(undefined);
    placeholderText = signal<string>(undefined);

    alignment = signal<string>(undefined);
    valuelistID = signal<IValuelist>(undefined);

    inputType = signal<string>(undefined);
    inputTypeChange = output<unknown>();

    dataProviderID = signal<unknown>(undefined);
    dataProviderIDChange = output<unknown>();

    @ViewChild('element') element: ServoyBootstrapChoicegroup;
}

const defaultValues = {
    servoyApi: new ServoyApiTesting(),
    enabled: true,
    readOnly: false,
    findmode: false,
    editable: true,
    dataProviderID: 0,
    inputType: 'checkbox',
    valuelistID: [{
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
    }] as IValuelist,
    alignment: 'vertical',
    styleClass: undefined,
    tabSeq: undefined,
    toolTipText: undefined,
    placeholderText: undefined,
    onActionMethodID: undefined,
    onFocusGainedMethodID: undefined,
    onFocusLostMethodID: undefined,
    onDataChangeMethodID: undefined
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

describe('ServoyBootstrapChoicegroup', () => {
    const configWrapper: MountConfig<WrapperComponent> = {
        declarations: [ServoyBootstrapChoicegroup, ChoiceElementDirective],
        imports: [ServoyPublicTestingModule, FormsModule]
    };

    it('should mount and register the component', () => {
        const servoyApiSpy = defaultValues.servoyApi;
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('.bts-radiogroup').should('exist').then(() => {
                cy.wrap(registerComponent).should('be.called');
            });
        });
    });

    it('should show the text value', () => {
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('.bts-radiogroup label span').first().should('have.text', 'one');
        });
    });

    it('show a style class', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('.bts-radiogroup').should('not.have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass.set('mystyleclass');
                cy.get('.bts-radiogroup').should('have.class', 'mystyleclass')
            });
        });
    });

    it('show more then 1 style class', () => {
        defaultValues.styleClass = 'mystyleclass';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('.bts-radiogroup').should('have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass.set('classA classB');
                cy.get('.bts-radiogroup').should('have.class', 'classA').should('have.class', 'classB');
            });
        });
    });

    it('should be disabled', () => {
        defaultValues.enabled = false;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('input').should('have.attr', 'disabled');
        });
    });

    it('should handle onaction event', () => {
        const onActionMethodID = cy.stub();
        defaultValues.onActionMethodID = onActionMethodID;
        defaultValues.enabled = true;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.wrap(onActionMethodID).should('be.not.called');
            cy.get('input').should('have.not.checked').first().then(() => {
                cy.get('input').first().focus().click({ force: true }).then(() => {
                    cy.wrap(onActionMethodID).should('be.called');
                });
            });
        });
    });

    it('should handle focus gained event', () => {
        const onFocusGainedMethodID = cy.stub();
        defaultValues.onFocusGainedMethodID = onFocusGainedMethodID;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('input').should('have.not.checked').first().focus().then(() => {
                cy.wrap(onFocusGainedMethodID).should('be.called');
            });
        });
    });

    it('should handle focus lost event', () => {
        const onFocusLostMethodID = cy.stub();
        defaultValues.onFocusLostMethodID = onFocusLostMethodID;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('input').should('have.not.checked').first().focus().blur().then(() => {
                cy.wrap(onFocusLostMethodID).should('be.called');
            });
        });
    });

    it('should emit dataProviderIDChange event on input change', () => {
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            const dataProviderIDChange = cy.spy();
            wrapper.component.dataProviderIDChange.subscribe(dataProviderIDChange);
            cy.get('input').first().should('have.not.checked').then(() => {
                cy.get('input').first().click();
                cy.wrap(dataProviderIDChange).should('have.been.called');
            });
        });
    });

    it('should not emit dataProviderIDChange event dataprovder change', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            const dataProviderIDChange = cy.spy();
            wrapper.component.dataProviderIDChange.subscribe(dataProviderIDChange);
            cy.get('input').should('have.not.checked').then(() => {
                wrapper.component.dataProviderID.set(1);
                wrapper.component.element._dataProviderID.set(1);
                cy.get('input').should('have.checked').then(() => {
                    expect(dataProviderIDChange).not.to.have.been.called;
                });
            });
        });
    });
});
