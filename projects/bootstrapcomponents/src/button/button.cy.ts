import { ServoyBootstrapButton } from "./button"
import { MountConfig } from "cypress/angular"
import { ServoyApi, ServoyApiTesting, ServoyBaseComponent, ServoyPublicTestingModule } from "@servoy/public"
import { Component, Input, SimpleChange } from "@angular/core";

@Component({
    template: `<bootstrapcomponents-button [servoyApi]="servoyApi" [enabled]="enabled" [text]="text" [onActionMethodID]="onActionMethodID" [onDoubleClickMethodID]="onDoubleClickMethodID" [onRightClickMethodID]="onRightClickMethodID" [showAs]="showAs" [imageStyleClass]="imageStyleClass" [trailingImageStyleClass]="trailingImageStyleClass"></bootstrapcomponents-button>`
})
class WrapperComponent {
    @Input() enabled = true;
    @Input() text = 'MyButton';
    @Input() onActionMethodID: (e: Event, data?: any) => void;
    @Input() onDoubleClickMethodID: (e: Event, data?: any) => void;
    @Input() onRightClickMethodID: (e: Event, data?: any) => void;
    @Input() showAs: string;
    @Input() imageStyleClass: string;
    @Input() trailingImageStyleClass: string;
    @Input() servoyApi: ServoyApi;
}

describe('ButtonComponent', () => {
    const servoyApiSpy = new ServoyApiTesting();

    const config: MountConfig<ServoyBootstrapButton> = {
        imports: [ ServoyPublicTestingModule],
    } 

    beforeEach(() => {
        config.componentProperties = {
            servoyApi: servoyApiSpy,
            enabled: true,
            text: 'MyButton'
        }
    });

    it('when button is mounted and registered and text is changed  through wrapper', () => {
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, {
            declarations: [ServoyBootstrapButton],
            imports: [ ServoyPublicTestingModule],
            componentProperties: config.componentProperties
        }).then((wrapper) => {
            cy.get('button').should('have.text', ' MyButton ').then(_ => {
                expect(registerComponent).to.been.called;

                wrapper.component.text = 'MyButton2';
                wrapper.fixture.detectChanges();
                cy.get('button').should('have.text', ' MyButton2 ')
            });
        });
    })

    it('when button enabled state is changed through wrapper', () => {
        cy.mount(WrapperComponent, {
            declarations: [ServoyBootstrapButton],
            imports: [ ServoyPublicTestingModule],
            componentProperties: config.componentProperties
        }).then((wrapper) => {
            cy.get('button').should('be.enabled').then(_ => {
                wrapper.component.enabled = false
                wrapper.fixture.detectChanges();
                cy.get('button').should('be.disabled')
            });
        });
    })
    
    it('can mount and has text set', () => {
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(ServoyBootstrapButton, config);
        cy.get('button').should('have.text', ' MyButton ').then(_ => {
            expect(registerComponent).to.been.called;
        });
    })

    it('when button is clicked', () => {
        expect(config.componentProperties.onActionMethodID).to.be.undefined;
        config.componentProperties.onActionMethodID = cy.spy().as('onActionMethodID');
        cy.mount(ServoyBootstrapButton, config).then(wrapper => {
            cy.get('button').click().then(_ => {
                expect(config.componentProperties.onActionMethodID).to.be.calledOnce;
                wrapper.component.enabled = false;
                // now detect changes will not work, we need to call ngOnChanges our self to update the button state
                // see wrapper component above how that can work a bit nicer with just detectChanges
                const changes = { enabled: new SimpleChange(true, false, false) };
                wrapper.component.ngOnChanges(changes);
                cy.get('button').should('be.disabled');
            });
        })
    })

    it('when button is double clicked', () => {
        expect(config.componentProperties.onDoubleClickMethodID).to.be.undefined;
        config.componentProperties.onDoubleClickMethodID = cy.spy().as('onDoubleClickMethodID');
        cy.mount(ServoyBootstrapButton, config);
        cy.get('button').dblclick().then(_ => {
            expect(config.componentProperties.onDoubleClickMethodID).to.be.called;
        });
    })

    it('when button is right clicked', () => {
        expect(config.componentProperties.onRightClickMethodID).to.be.undefined;
        expect(config.componentProperties.onDoubleClickMethodID).to.be.undefined;
        expect(config.componentProperties.onActionMethodID).to.be.undefined;
        config.componentProperties.onRightClickMethodID = cy.spy().as('onRightClickMethodID');
        cy.mount(ServoyBootstrapButton, config);
        cy.get('button').rightclick().then(_ => {
            expect(config.componentProperties.onRightClickMethodID).to.be.called;
        });
    })

    it('when datatarget is clicked', () => {
        cy.stub(servoyApiSpy, 'trustAsHtml').returns(true);
        config.componentProperties = {
                servoyApi: servoyApiSpy,
                onActionMethodID: cy.spy().as('onActionMethodID'),
                text: 'MyButton <label data-target="test">Click me</label>',
                showAs: 'trusted_html'
        }
        cy.mount(ServoyBootstrapButton, config);
        cy.get('button label').click().then(_ => {
            expect(config.componentProperties.onActionMethodID).to.be.called.calledWith(Cypress.sinon.match.any,'test');
        });
        cy.get('button').click().then(_ => {
            expect(config.componentProperties.onActionMethodID).to.be.called.calledWith(Cypress.sinon.match.any,null);
        });
    })

    it('when datatarget is clicked not trusted html', () => {
        cy.stub(servoyApiSpy, 'trustAsHtml').returns(false);
        config.componentProperties = {
                servoyApi: servoyApiSpy,
                onActionMethodID: cy.spy().as('onActionMethodID'),
                text: 'MyButton <label data-target="test">Click me2</label>',
                showAs: 'html'
        }
        cy.mount(ServoyBootstrapButton, config);
        cy.get('button label').click().then(_ => {
            expect(config.componentProperties.onActionMethodID).to.be.called.calledWith(Cypress.sinon.match.any,null);
        });
        cy.get('button').click().then(_ => {
            expect(config.componentProperties.onActionMethodID).to.be.called.calledWith(Cypress.sinon.match.any,null);
        });
    });

    it('show a image style class', () => {
        config.componentProperties.imageStyleClass = 'imageStyleClass';
        config.componentProperties.trailingImageStyleClass = 'trailingImageStyleClass';
        cy.mount(ServoyBootstrapButton, config).then(wrapper => {
            cy.get('button span').should('have.class', 'imageStyleClass');
            cy.get('button span').should('have.class', 'trailingImageStyleClass').then(_ => {
                wrapper.component.trailingImageStyleClass = null;
                wrapper.component.imageStyleClass = null;
                wrapper.component.detectChanges();
                cy.get('button span').should('not.exist');
            });
        });
    });

    it('show a image style class with trusted html', () => {
        config.componentProperties.imageStyleClass = 'imageStyleClass';
//        config.componentProperties.trailingImageStyleClass = 'trailingImageStyleClass';
        config.componentProperties.showAs = 'trusted_html';
        cy.mount(ServoyBootstrapButton, config).then(wrapper => {
            cy.get('button span').should('have.class', 'imageStyleClass');
            // cy.get('button span').should('have.class', 'trailingImageStyleClass').then(_ => {
            //     config.componentProperties.trailingImageStyleClass = null;
            //     wrapper.component.trailingImageStyleClass = null;
            //     wrapper.component.imageStyleClass = null;
            //     wrapper.component.detectChanges();
            //     cy.get('button span').should('not.exist');
            // });
        });
    });

})