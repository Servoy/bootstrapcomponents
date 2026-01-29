/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, ViewChild, ViewChildren, QueryList, ElementRef, signal, output } from '@angular/core';
import { Format, ServoyApi, ServoyApiTesting, ServoyPublicTestingModule, IValuelist } from '@servoy/public';
import { ServoyFloatLabelBootstrapCombobox } from './floatlabelcombobox';
import { MountConfig } from 'cypress/angular';
import { FormsModule } from '@angular/forms';
import { NgbDropdownItem, NgbTooltip, NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

import 'bootstrap/dist/css/bootstrap.min.css';


@Component({
    template: `<bootstrapcomponents-floatlabelcombobox
                [servoyApi]="servoyApi"
                [enabled]="enabled()"
                [onActionMethodID]="onActionMethodID"
                [onFocusGainedMethodID]="onFocusGainedMethodID"
                [onFocusLostMethodID]="onFocusLostMethodID" 
                [onDataChangeMethodID]="onDataChangeMethodID"
                [onRightClickMethodID]="onRightClickMethodID"
                [dataProviderID]="dataProviderID()"
                (dataProviderIDChange)="dataProviderIDChange.emit($event)"
                [styleClass]="styleClass()"
                [toolTipText]="toolTipText()"
                [tabSeq]="tabSeq()"
                [valuelistID]="valuelistID()"
                [appendToBody]="appendToBody()"
                [format]="format()"
                [showAs]="showAs()"
                [floatLabelText]="floatLabelText()"
                [errorMessage]="errorMessage()"
                #element>
                </bootstrapcomponents-floatlabelcombobox>`,
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
    onRightClickMethodID: (e: Event, data?: unknown) => void;

    floatLabelText = signal<string>(undefined);
    format = signal<Format>(undefined);

    valuelistID = signal<IValuelist>(undefined);
    appendToBody = signal<boolean>(undefined);
    showAs = signal<string>(undefined);
    errorMessage = signal<string>(undefined);

    dataProviderID = signal<unknown>(undefined);
    dataProviderIDChange = output<unknown>();

    @ViewChild('element') element: ServoyFloatLabelBootstrapCombobox;
    @ViewChildren(NgbDropdownItem) menuItems: QueryList<NgbDropdownItem>;
    @ViewChild('button') button: ElementRef<HTMLButtonElement>;
    @ViewChild('dropdown') dropdownElement: ElementRef<HTMLElement>;
    @ViewChild(NgbDropdown) comboboxDropdown: NgbDropdown;
    @ViewChild('tooltip') tooltip: NgbTooltip;
}

function createMockValuelist(): IValuelist {
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
    return mockData;
}

const defaultValues = {
    servoyApi: new ServoyApiTesting(),
    enabled: true,
    dataProviderID: 1,
    valuelistID: createMockValuelist(),
    format: { "type": "TEXT" } as Format,
    styleClass: undefined,
    tabSeq: undefined,
    toolTipText: undefined,
    floatLabelText: undefined,
    appendToBody: undefined,
    showAs: undefined,
    errorMessage: undefined,
    onActionMethodID: undefined,
    onFocusGainedMethodID: undefined,
    onFocusLostMethodID: undefined,
    onDataChangeMethodID: undefined,
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

describe('ServoyFloatLabelBootstrapCombobox', () => {
    const configWrapper: MountConfig<WrapperComponent> = {
        declarations: [ServoyFloatLabelBootstrapCombobox],
        imports: [ServoyPublicTestingModule, FormsModule, NgbDropdownItem, NgbDropdown, NgbTooltip]
    };

    beforeEach(() => {
        defaultValues.valuelistID = createMockValuelist();
    });

    it('should mount and register the component', () => {
        const servoyApiSpy = defaultValues.servoyApi;
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('button').should('exist').then(() => {
                cy.wrap(registerComponent).should('be.called');
            });
        });
    });

    it('should show the text value', () => {
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('button span').should('have.text', 'one');
        });
    });

    it('show a style class', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('.bts-combobox-container').should('not.have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass.set('mystyleclass');
                cy.get('.bts-combobox-container').should('have.class', 'mystyleclass')
            });
        });
    });

    it('show more then 1 style class', () => {
        defaultValues.styleClass = 'mystyleclass';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('.bts-combobox-container').should('have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass.set('classA classB');
                cy.get('.bts-combobox-container').should('have.class', 'classA').should('have.class', 'classB');
            });
        });
    });

    it('should be disabled', () => {
        defaultValues.enabled = false;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('button').should('have.attr', 'disabled');
        });
    });

    it('should handle focus gained event', () => {
        const onFocusGainedMethodID = cy.stub();
        defaultValues.onFocusGainedMethodID = onFocusGainedMethodID;
        defaultValues.enabled = true;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('button').click().then(() => {
                cy.wrap(onFocusGainedMethodID).should('be.called');
            });
        });
    });

    it('should handle focus lost event', () => {
        const onFocusLostMethodID = cy.stub();
        defaultValues.onFocusLostMethodID = onFocusLostMethodID;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('button').click().then(() => {
                cy.get('body').click(0, 0).then(() => {
                    cy.wrap(onFocusLostMethodID).should('be.called');
                });

            });
        });
    });

    it('should emit dataProviderIDChange event on button change', () => {
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            const dataProviderIDChange = cy.spy();
            wrapper.component.dataProviderIDChange.subscribe(dataProviderIDChange);
            cy.get('button span').should('have.text', 'one').then(() => {
                cy.get('button').focus().then(() => {
                    cy.get('button').last().click(0, 0).then(() => {
                        cy.wrap(dataProviderIDChange).should('have.been.called');
                    });
                });
            });
        });
    });

    it('should not emit dataProviderIDChange event dataprovder change', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            const dataProviderIDChange = cy.spy();
            wrapper.component.dataProviderIDChange.subscribe(dataProviderIDChange);
            cy.get('button span').should('have.text', 'one').then(() => {
                wrapper.component.dataProviderID.set(2);
                cy.get('button span').should('have.text', 'two').then(() => {
                    expect(dataProviderIDChange).not.to.have.been.called;
                });
            });
        });
    });

    it('should handle onaction  event', () => {
        const onActionMethodID = cy.stub();
        defaultValues.onActionMethodID = onActionMethodID;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
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
