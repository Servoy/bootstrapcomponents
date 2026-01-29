/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, ViewChild, signal, output } from '@angular/core';
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
                [dataProviderID]="dataProviderID()"
                (dataProviderIDChange)="dataProviderIDChange.emit($event)"
                [enabled]="enabled()"
                [multiselect]="multiselect()"
                [placeholderText]="placeholderText()"
                [selectSize]="selectSize()"
                [styleClass]="styleClass()"
                [tabSeq]="tabSeq()"
                [toolTipText]="toolTipText()"
                [valuelistID]="valuelistID()"
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

    dataProviderID = signal<unknown>(undefined);
    dataProviderIDChange = output<unknown>();

    enabled = signal<boolean>(undefined);
    multiselect = signal<boolean>(undefined);
    placeholderText = signal<string>(undefined);
    selectSize = signal<number>(undefined);
    styleClass = signal<string>(undefined);
    tabSeq = signal<number>(undefined);
    toolTipText = signal<string>(undefined);
    valuelistID = signal<IValuelist>(undefined);

    @ViewChild('element') element: ServoyBootstrapSelect;
}

const defaultValues = {
    servoyApi: new ServoyApiTesting(),
    enabled: true,
    dataProviderID: '1',
    multiselect: false,
    placeholderText: undefined,
    selectSize: undefined,
    styleClass: undefined,
    tabSeq: undefined,
    toolTipText: undefined,
    valuelistID: undefined,
    onActionMethodID: undefined,
    onDataChangeMethodID: undefined,
    onFocusGainedMethodID: undefined,
    onFocusLostMethodID: undefined
};

function applyDefaultProps(wrapper, mockData) {
    defaultValues.valuelistID = mockData;
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

describe('ServoyBootstrapSelect', () => {
    let mockData;

    const configWrapper: MountConfig<WrapperComponent> = {
        declarations: [ServoyBootstrapSelect, ShowDisplayValuePipe],
        imports: [ServoyPublicTestingModule, FormsModule]
    };

    beforeEach(() => {
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
    });

    it('should mount and register the component', () => {
        const servoyApiSpy = defaultValues.servoyApi;
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper, mockData);
            cy.get('select').should('exist').then(() => {
                cy.wrap(registerComponent).should('be.called');
            });
        });
    });

    it('should set the placeholder text', () => {
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper, mockData);
            wrapper.component.placeholderText.set('Enter your name');
            cy.get('select').should('have.attr', 'placeholder', 'Enter your name');
        });
    });

    it('show a style class', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper, mockData);
            cy.get('select').should('not.have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass.set('mystyleclass');
                cy.get('select').should('have.class', 'mystyleclass')
            });
        });
    });

    it('show more then 1 style class', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper, mockData);
            wrapper.component.styleClass.set('mystyleclass');
            cy.get('select').should('have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass.set('classA classB');
                cy.get('select').should('have.class', 'classA').should('have.class', 'classB');
            });
        });
    });

    it('should not allow multiselect', () => {
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper, mockData);
            cy.get('select').should('not.have.attr', 'multiple');
        });
    });

    it('should allow multiselect', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper, mockData);
            wrapper.component.multiselect.set(true);
            wrapper.component.dataProviderID.set(['1']);
            cy.get('select').should('have.attr', 'multiple');
            cy.get('select').invoke('val').should('deep.equal', ["0: '1'"]).then(() => {
                cy.get('select').select(["0: '1'", "1: '2'"]).then(() => {
                    cy.get('select').invoke('val').should('deep.equal', ["0: '1'", "1: '2'"]);
                });
            });
        });
    });

    it('should handle enabled state', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper, mockData);
            cy.get('select').should('not.have.attr', 'disabled').then(() => {
                wrapper.component.enabled.set(false);
                cy.get('select').should('have.attr', 'disabled');
            });
        });
    });

    it('should handle onaction  event', () => {
        const onActionMethodID = cy.stub();
        defaultValues.onActionMethodID = onActionMethodID;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper, mockData);
            cy.wrap(onActionMethodID).should('be.not.called');
            cy.get('select').should('have.value', '1').select('2').then(() => {
                cy.wrap(onActionMethodID).should('be.called');
            });
        });
    });

    it('should handle focus gained event', () => {
        const onFocusGainedMethodID = cy.stub();
        defaultValues.onFocusGainedMethodID = onFocusGainedMethodID;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper, mockData);
            cy.get('select').should('have.value', '1').focus().then(() => {
                cy.wrap(onFocusGainedMethodID).should('be.called');
            });
        });
    });

    it('should handle focus lost event', () => {
        const onFocusLostMethodID = cy.stub();
        defaultValues.onFocusLostMethodID = onFocusLostMethodID;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper, mockData);
            cy.get('select').should('have.value', '1').focus().blur().then(() => {
                cy.wrap(onFocusLostMethodID).should('be.called');
            });
        });
    });

    it('should emit dataProviderIDChange event on input change', () => {
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper, mockData);
            const dataProviderIDChange = cy.spy();
            wrapper.component.dataProviderIDChange.subscribe(dataProviderIDChange);
            cy.get('select').select('2').blur().then(() => {
                expect(dataProviderIDChange).to.have.been.calledWith('2');
            });
        });
    });

    it('should not emit dataProviderIDChange event dataprovder change', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper, mockData);
            const dataProviderIDChange = cy.spy();
            wrapper.component.dataProviderIDChange.subscribe(dataProviderIDChange);
            cy.get('select').should('have.value', '1').then(() => {
                wrapper.component.dataProviderID.set('2');
                expect(dataProviderIDChange).not.to.have.been.called;
                cy.get('select').should('have.value', '2')
            });
        });
    });

    it('should update the tooltip dynamically', () => {
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper, mockData);
            wrapper.component.toolTipText.set('Updated tooltip');
            cy.get('select').trigger('pointerenter').then(() => {
                cy.get('div[id="mktipmsg"]').should('have.text', 'Updated tooltip');
            });
        });
    });
});
