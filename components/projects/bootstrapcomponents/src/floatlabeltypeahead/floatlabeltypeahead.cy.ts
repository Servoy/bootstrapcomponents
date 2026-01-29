/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, ViewChild, signal, output } from '@angular/core';
import { Format, ServoyApi, ServoyApiTesting, ServoyPublicTestingModule, IValuelist } from '@servoy/public';
import { ServoyFloatLabelBootstrapTypeahead } from './floatlabeltypeahead';
import { MountConfig } from 'cypress/angular';
import { FormsModule } from '@angular/forms';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

@Component({
    template: `<bootstrapcomponents-floatlabeltypeahead
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
                    [appendToBody]="appendToBody()"
                    [format]="format()"
                    [filteringDebounce]="filteringDebounce()"
                    [selectOnEnter]="selectOnEnter()"
                    [showAs]="showAs()"
                    [floatLabelText]="floatLabelText()"
                    #element>
                </bootstrapcomponents-floatlabeltypeahead>`,
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
    format = signal<Format>(undefined);

    valuelistID = signal<IValuelist>(undefined);
    appendToBody = signal<boolean>(undefined);
    filteringDebounce = signal<number>(undefined);
    selectOnEnter = signal<boolean>(undefined);
    showAs = signal<string>(undefined);
    floatLabelText = signal<string>(undefined);

    dataProviderID = signal<unknown>(undefined);
    dataProviderIDChange = output<unknown>();

    @ViewChild('element') element: ServoyFloatLabelBootstrapTypeahead;
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
    mockData.filterList = (value) => { return of(mockData.filter(item => item.displayValue.includes(value))) };
    mockData.getDisplayValue = (value) => { return of(mockData.filter(item => item.realValue === value)) };
    return mockData;
}

const defaultValues = {
    servoyApi: new ServoyApiTesting(),
    enabled: true,
    readOnly: false,
    findmode: false,
    editable: true,
    dataProviderID: 1,
    valuelistID: createMockValuelist(),
    format: { "type": "TEXT" } as Format,
    styleClass: undefined,
    tabSeq: undefined,
    toolTipText: undefined,
    placeholderText: undefined,
    appendToBody: undefined,
    filteringDebounce: undefined,
    selectOnEnter: true,
    showAs: 'text',
    floatLabelText: undefined,
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

describe('ServoyFloatLabelBootstrapTypeahead', () => {
    const configWrapper: MountConfig<WrapperComponent> = {
        declarations: [ServoyFloatLabelBootstrapTypeahead],
        imports: [ServoyPublicTestingModule, FormsModule, NgbTypeahead]
    };

    beforeEach(() => {
        defaultValues.valuelistID = createMockValuelist();
    });

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

    it('should show the text value', () => {
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('input').should('have.value', 'one');
        });
    });

    it('show a style class', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('input').should('not.have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass.set('mystyleclass');
                cy.get('input').should('have.class', 'mystyleclass');
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

    it('should be disabled', () => {
        defaultValues.enabled = false;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('input').should('have.attr', 'disabled');
        });
    });

    it('should handle onaction  event', () => {
        const onActionMethodID = cy.stub();
        defaultValues.onActionMethodID = onActionMethodID;
        defaultValues.enabled = true;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.wrap(onActionMethodID).should('be.not.called');
            cy.get('input').should('have.value', 'one').focus().type('{enter}').then(() => {
                cy.wrap(onActionMethodID).should('be.called');
            });
        });
    });

    it('should handle focus gained event', () => {
        const onFocusGainedMethodID = cy.stub();
        defaultValues.onFocusGainedMethodID = onFocusGainedMethodID;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('input').should('have.value', 'one').focus().then(() => {
                cy.wrap(onFocusGainedMethodID).should('be.called');
            });
        });
    });

    it('should handle focus lost event', () => {
        const onFocusLostMethodID = cy.stub();
        defaultValues.onFocusLostMethodID = onFocusLostMethodID;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('input').should('have.value', 'one').focus().blur().then(() => {
                cy.wrap(onFocusLostMethodID).should('be.called');
            });
        });
    });

    it('should not emit dataProviderIDChange event dataprovder change', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            const dataProviderIDChange = cy.spy();
            wrapper.component.dataProviderIDChange.subscribe(dataProviderIDChange);
            cy.get('input').should('have.value', 'one').then(() => {
                wrapper.component.dataProviderID.set(2);
                wrapper.component.element._dataProviderID.set(2);
                expect(dataProviderIDChange).not.to.have.been.called;
                cy.get('input').should('have.value', 'two');
            });
        });
    });
});
