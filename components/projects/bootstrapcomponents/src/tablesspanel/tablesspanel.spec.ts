import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServoyPublicTestingModule } from '@servoy/public';

import { ServoyBootstrapTablesspanel } from './tablesspanel';
import { runOnPushChangeDetection } from '../testingutils';
import { SimpleChange } from '@angular/core';

describe('TablesspanelComponent', () => {
    let component: ServoyBootstrapTablesspanel;
    let fixture: ComponentFixture<ServoyBootstrapTablesspanel>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ServoyBootstrapTablesspanel],
            imports: [NgbModule, ServoyPublicTestingModule],
            providers: []
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ServoyBootstrapTablesspanel);
        component = fixture.componentInstance;
        let servoyApi = jasmine.createSpyObj('ServoyApi', ['getMarkupId', 'formWillShow', 'hideForm','trustAsHtml', 'registerComponent', 'unRegisterComponent']);
        servoyApi.formWillShow.and.returnValue(Promise.resolve(true));
        servoyApi.hideForm.and.returnValue(Promise.resolve(true));
        component.servoyApi = servoyApi;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });
    
    it('should apply form', async () => {
        component.containedForm = 'mytest';
        const containedForm = component.containedForm();
        component.svyOnChanges({
            containedForm: new SimpleChange(null, containedForm, true)
        });
        await runOnPushChangeDetection(fixture);
        expect(component.getForm()).toBe( containedForm);
        
        component.containedForm = 'mytest2';
        component.svyOnChanges({
            containedForm: new SimpleChange('mytest', containedForm, false)
        });
        await runOnPushChangeDetection(fixture);
        expect(component.getForm()).toBe( containedForm);
    });
});
