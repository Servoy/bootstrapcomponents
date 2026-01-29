/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, ViewChild, signal, output } from '@angular/core';
import { Format, ServoyApi, ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { ServoyFloatLabelBootstrapCalendar } from './floatlabelcalendar';
import { MountConfig } from 'cypress/angular';
import { FormsModule } from '@angular/forms';
import { Options } from '@eonasdan/tempus-dominus';

@Component({
    template: `<bootstrapcomponents-floatlabelcalendar
                [servoyApi]="servoyApi"
                [enabled]="enabled()"
                [readOnly]="readOnly()"
                [editable]="editable()"
                [onActionMethodID]="onActionMethodID"
                [onFocusGainedMethodID]="onFocusGainedMethodID"
                [onFocusLostMethodID]="onFocusLostMethodID" 
                [onDataChangeMethodID]="onDataChangeMethodID"
                [format]="format()"
                [selectOnEnter]="selectOnEnter()" 
                [dataProviderID]="dataProviderID()"
                (dataProviderIDChange)="dataProviderIDChange.emit($event)"
                [styleClass]="styleClass()"
                [variant]="variant()"
                [toolTipText]="toolTipText()"
                [floatLabelText]="floatLabelText()"
                [tabSeq]="tabSeq()"
                [pickerOnly]="pickerOnly()"
                [calendarWeeks]="calendarWeeks()"
                [theme]="theme()"
                [options]="options()"
                [errorMessage]="errorMessage()"
                #element>
                </bootstrapcomponents-floatlabelcalendar>`,
    standalone: false
})
class WrapperComponent {
    servoyApi: ServoyApi;

    options = signal<Options>(undefined);
    theme = signal<string>(undefined);
    pickerOnly = signal<boolean>(undefined);
    calendarWeeks = signal<boolean>(undefined);
    enabled = signal<boolean>(undefined);
    readOnly = signal<boolean>(undefined);
    editable = signal<boolean>(undefined);
    styleClass = signal<string>(undefined);
    variant = signal<string[]>(undefined);
    tabSeq = signal<number>(undefined);
    toolTipText = signal<string>(undefined);

    onActionMethodID: (e: Event, data?: unknown) => void;
    onFocusGainedMethodID: (e: Event, data?: unknown) => void;
    onFocusLostMethodID: (e: Event, data?: unknown) => void;
    onDataChangeMethodID: (e: Event, data?: unknown) => void;

    format = signal<Format>(undefined);
    floatLabelText = signal<string>(undefined);
    selectOnEnter = signal<boolean>(undefined);
    errorMessage = signal<string>(undefined);

    dataProviderID = signal<unknown>(undefined);
    dataProviderIDChange = output<unknown>();

    @ViewChild('element') element: ServoyFloatLabelBootstrapCalendar;
}

const defaultValues = {
    servoyApi: new ServoyApiTesting(),
    enabled: true,
    readOnly: false,
    format: { type: 'DATETIME', display: 'dd-MM-yyyy' } as Format,
    selectOnEnter: false,
    dataProviderID: new Date(2025, 10, 11),
    theme: 'dark',
    pickerOnly: false,
    calendarWeeks: false,
    editable: undefined,
    styleClass: undefined,
    variant: undefined,
    tabSeq: undefined,
    toolTipText: undefined,
    floatLabelText: undefined,
    errorMessage: undefined,
    options: undefined,
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

describe('ServoyFloatLabelBootstrapCalendar', () => {
    const configWrapper: MountConfig<WrapperComponent> = {
        declarations: [ServoyFloatLabelBootstrapCalendar],
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
        defaultValues.dataProviderID = new Date(1995, 11, 17);
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('input').should('have.value', '17-12-1995');
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

    it('should handle select on enter', () => {
        defaultValues.selectOnEnter = true;
        defaultValues.dataProviderID = new Date(2023, 10, 10);
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            // you need to test if the value is there for the component to be fully initialized
            // just getting the input (of the textbox) can result in that it is not fully mounted yet (svnOnchanges not called yet)
            // and focus() will bomb out because the Format property is not yet set
            cy.get('input').should('have.value', '10-11-2023').click().then(() => {
                // see the commands.ts file in the cypress/support folder for the have.selection example
                cy.get('input').should('have.selection', '10-11-2023');
            });
        });
    });

    it('should handle onaction  event', () => {
        const onActionMethodID = cy.stub();
        defaultValues.onActionMethodID = onActionMethodID;
        defaultValues.dataProviderID = new Date(2025, 10, 11);
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.wrap(onActionMethodID).should('be.not.called');
            cy.get('input').should('have.value', '11-11-2025').focus().type('{enter}').then(() => {
                cy.wrap(onActionMethodID).should('be.called');
            });
        });
    });

    it('should handle focus gained event', () => {
        const onFocusGainedMethodID = cy.stub();
        defaultValues.onFocusGainedMethodID = onFocusGainedMethodID;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('input').should('have.value', '11-11-2025').focus().then(() => {
                cy.wrap(onFocusGainedMethodID).should('be.called');
            });
        });
    });

    it('should handle focus lost event', () => {
        const onFocusLostMethodID = cy.stub();
        defaultValues.onFocusLostMethodID = onFocusLostMethodID;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('input').should('have.value', '11-11-2025').focus().blur().then(() => {
                cy.wrap(onFocusLostMethodID).should('be.called');
            });
        });
    });

    it('should emit dataProviderIDChange event on input change', () => {
        defaultValues.dataProviderID = null;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            const dataProviderIDChange = cy.spy();
            wrapper.component.dataProviderIDChange.subscribe(dataProviderIDChange);
            cy.get('input').type('10-02-2024').blur();
            cy.wrap(dataProviderIDChange).should('have.been.called');
        });
    });

    it('should not emit dataProviderIDChange event dataprovder change', () => {
        defaultValues.dataProviderID = new Date(2025, 10, 11);
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            const dataProviderIDChange = cy.spy();
            wrapper.component.dataProviderIDChange.subscribe(dataProviderIDChange);
            cy.get('input').should('have.value', '11-11-2025').then(() => {
                wrapper.component.dataProviderID.set(new Date(2025, 10, 14));
                cy.get('input').should('have.value', '14-11-2025');
                expect(dataProviderIDChange).not.to.have.been.called;
            });
        });
    });

    it('should select text and return it', () => {
        const focusGainedSpy = cy.stub();
        defaultValues.onFocusGainedMethodID = focusGainedSpy;
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('input').should('have.value', '11-11-2025').should('not.have.focus').then(() => {
                wrapper.component.element.requestFocus(true);
                cy.get('input').should('have.focus');
                cy.wrap(focusGainedSpy).should('be.called');
            });
        });
    });
});
