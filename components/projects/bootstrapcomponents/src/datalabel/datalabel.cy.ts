/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, ViewChild, signal, output } from '@angular/core';
import { Format, ServoyApi, ServoyApiTesting, ServoyPublicTestingModule, IValuelist } from '@servoy/public';
import { ServoyBootstrapDatalabel, DesignTextPipe } from './datalabel';
import { MountConfig } from 'cypress/angular';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

@Component({
    template: `<bootstrapcomponents-datalabel
                [servoyApi]="servoyApi"
                [enabled]="enabled()"
                [onActionMethodID]="onActionMethodID"
                [onDoubleClickMethodID]="onDoubleClickMethodID"
                [onRightClickMethodID]="onRightClickMethodID"
                [dataProviderID]="dataProviderID()"
                (dataProviderIDChange)="dataProviderIDChange.emit($event)"
                [styleClass]="styleClass()"
                [toolTipText]="toolTipText()"
                [tabSeq]="tabSeq()"
                [valuelistID]="valuelistID()"
                [format]="format()"
                [showAs]="showAs()"
                [imageStyleClass]="imageStyleClass()"
                #element>
                </bootstrapcomponents-datalabel>`,
    standalone: false
})
class WrapperComponent {
    servoyApi: ServoyApi;

    enabled = signal<boolean>(undefined);
    styleClass = signal<string>(undefined);
    tabSeq = signal<number>(undefined);
    toolTipText = signal<string>(undefined);

    onActionMethodID: (e: Event, data?: unknown) => void;
    onDoubleClickMethodID: (e: Event, data?: unknown) => void;
    onRightClickMethodID: (e: Event, data?: unknown) => void;

    placeholderText = signal<string>(undefined);
    format = signal<Format>(undefined);
    showAs = signal<string>(undefined);
    valuelistID = signal<IValuelist>(undefined);
    imageStyleClass = signal<string>(undefined);

    dataProviderID = signal<unknown>(undefined);
    dataProviderIDChange = output<unknown>();

    @ViewChild('element') element: ServoyBootstrapDatalabel;
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
    dataProviderID: 'one',
    showAs: 'text',
    valuelistID: createMockValuelist(),
    styleClass: undefined,
    tabSeq: undefined,
    toolTipText: undefined,
    placeholderText: undefined,
    format: undefined,
    imageStyleClass: undefined,
    onActionMethodID: undefined,
    onDoubleClickMethodID: undefined,
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

describe('ServoyBootstrapDatalabel', () => {
    const configWrapper: MountConfig<WrapperComponent> = {
        declarations: [ServoyBootstrapDatalabel, DesignTextPipe],
        imports: [ServoyPublicTestingModule, FormsModule]
    };

    beforeEach(() => {
        defaultValues.valuelistID = createMockValuelist();
    });

    it('should mount and register the component', () => {
        const servoyApiSpy = defaultValues.servoyApi;
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('.bts-label').should('exist').then(() => {
                cy.wrap(registerComponent).should('be.called');
            });
        });
    });

    it('should show the text value', () => {
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('.bts-label span').should('have.text', 'one');
        });
    });

    it('show a style class', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('.bts-label').should('not.have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass.set('mystyleclass');
                cy.get('.bts-label').should('have.class', 'mystyleclass')
            });
        });
    });

    it('show more then 1 style class', () => {
        defaultValues.styleClass = 'mystyleclass';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('.bts-label').should('have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass.set('classA classB');
                cy.get('.bts-label').should('have.class', 'classA').should('have.class', 'classB');
            });
        });
    });

    it('should be disabled', () => {
        defaultValues.enabled = false;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('.bts-label').should('have.attr', 'disabled');
        });
    });

    it('should handle onaction event', () => {
        const onActionMethodID = cy.stub();
        defaultValues.onActionMethodID = onActionMethodID;
        defaultValues.enabled = true;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            expect(defaultValues.onActionMethodID).to.not.be.called;
            cy.get('.bts-label').should('exist').click().then(() => {
                expect(defaultValues.onActionMethodID).to.be.called;
            });
        });
    });
});
