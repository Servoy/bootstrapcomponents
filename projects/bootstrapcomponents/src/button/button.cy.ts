import { ServoyBootstrapButton } from "./button"
import { MountConfig } from "cypress/angular"
import { ServoyApi, ServoyBaseComponent, ServoyPublicTestingModule } from "@servoy/public"


describe('ButtonComponent', () => {
    const servoyApiSpy:ServoyApi = {
        formWillShow: function (formname: string, relationname?: string, formIndex?: number): Promise<boolean> {
            console.log('formWillShow  ' + formname + ',' + relationname);
            return Promise.resolve(true);
        },
        hideForm: function (formname: string, relationname?: string, formIndex?: number, formNameThatWillShow?: string, relationnameThatWillBeShown?: string, formIndexThatWillBeShown?: number): Promise<boolean> {
            return Promise.resolve(true);
        },
        startEdit: function (propertyName: string) {
            
        },
        apply: function (propertyName: string, value: unknown) {
            
        },
        callServerSideApi: function (methodName: string, args: Array<unknown>) {
           return Promise.resolve(null);
        },
        isInDesigner: function (): boolean {
            return false;
        },
        trustAsHtml: function (): boolean {
            return false;
        },
        isInAbsoluteLayout: function (): boolean {
            return true;
        },
        getMarkupId: function (): string {
            return "testid";
        },
        getFormName: function (): string {
            return 'testform';
        },
        registerComponent: function (component: ServoyBaseComponent<HTMLElement>) {
        },
        unRegisterComponent: function (component: ServoyBaseComponent<HTMLElement>) {
        },
        getClientProperty: function (key: string) {
            return key;
        }
    }
    const config: MountConfig<ServoyBootstrapButton> = {
        imports: [ ServoyPublicTestingModule],
        componentProperties: {
            servoyApi: servoyApiSpy,
            text: 'MyButton'
        }
    } 
    
    it('can mount and has text set', () => {
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(ServoyBootstrapButton, config);
        cy.get('button').should('have.text', ' MyButton ').then(_ => {
            console.log('button test');
            expect(registerComponent).to.been.called;
        });
    })

    it('when button is clicked', () => {
        config.componentProperties.onActionMethodID = cy.spy().as('onActionMethodID');
        cy.mount(ServoyBootstrapButton, config);
        cy.get('button').click().then(_ => {
            expect(config.componentProperties.onActionMethodID).to.be.called;
            config.componentProperties.onActionMethodID = null;
        });
    })

    it('when button is double clicked', () => {
        config.componentProperties.onDoubleClickMethodID = cy.spy().as('onDoubleClickMethodID');
        cy.mount(ServoyBootstrapButton, config);
        cy.get('button').dblclick().then(_ => {
            expect(config.componentProperties.onDoubleClickMethodID).to.be.called;
            config.componentProperties.onDoubleClickMethodID = null;
        });
    })

    it('when button is right clicked', () => {
        config.componentProperties.onRightClickMethodID = cy.spy().as('onRightClickMethodID');
        cy.mount(ServoyBootstrapButton, config);
        cy.get('button').rightclick().then(_ => {
            expect(config.componentProperties.onRightClickMethodID).to.be.called;
            config.componentProperties.onRightClickMethodID = null;
        });
    })

    it('when datatarget is clicked', () => {
        const config: MountConfig<ServoyBootstrapButton> = {
            imports: [ ServoyPublicTestingModule],
            componentProperties: {
                servoyApi: servoyApiSpy,
                onActionMethodID: cy.spy().as('onActionMethodID'),
                text: 'MyButton <label data-target="test">Click me</label>',
                showAs: 'trusted_html'
            }
        } 
        cy.stub(servoyApiSpy, 'trustAsHtml').returns(true);
        cy.mount(ServoyBootstrapButton, config);
        cy.get('button label').click().then(_ => {
            expect(config.componentProperties.onActionMethodID).to.be.called.calledWith(Cypress.sinon.match.any,'test');
        });
        cy.get('button').click().then(_ => {
            expect(config.componentProperties.onActionMethodID).to.be.called.calledWith(Cypress.sinon.match.any,null);
        });
    })

    it('when datatarget is clicked not trusted html', () => {
        const config: MountConfig<ServoyBootstrapButton> = {
            imports: [ ServoyPublicTestingModule],
            componentProperties: {
                servoyApi: servoyApiSpy,
                onActionMethodID: cy.spy().as('onActionMethodID'),
                text: 'MyButton <label data-target="test">Click me2</label>',
                showAs: 'html'
            }
        } 
        cy.stub(servoyApiSpy, 'trustAsHtml').returns(false);
        cy.mount(ServoyBootstrapButton, config);
        cy.get('button label').click().then(_ => {
            expect(config.componentProperties.onActionMethodID).to.be.called.calledWith(Cypress.sinon.match.any,null);
        });
        cy.get('button').click().then(_ => {
            expect(config.componentProperties.onActionMethodID).to.be.called.calledWith(Cypress.sinon.match.any,null);
        });
    })
})