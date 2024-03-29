import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServoyFloatLabelBootstrapCombobox } from './floatlabelcombobox';
import { Format, FormattingService, TooltipService, ServoyPublicTestingModule } from '@servoy/public';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { By } from '@angular/platform-browser';

describe('ServoyFloatLabelBootstrapCombobox', () => {
    let component: ServoyFloatLabelBootstrapCombobox;
    let fixture: ComponentFixture<ServoyFloatLabelBootstrapCombobox>;
    let textField;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ServoyFloatLabelBootstrapCombobox],
            providers: [FormattingService, TooltipService],
            imports: [ServoyPublicTestingModule, NgbModule, FormsModule]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ServoyFloatLabelBootstrapCombobox);
        textField = fixture.debugElement.query(By.css('button'));
        component = fixture.componentInstance;
        component.servoyApi = jasmine.createSpyObj('ServoyApi', ['getMarkupId', 'trustAsHtml', 'startEdit', 'registerComponent', 'unRegisterComponent']);
        component.format = new Format();
        component.format.type = 'TEXT';
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });

    it('onaction and onrightclick handlers need to be called', () => {
        component.onActionMethodID = jasmine.createSpy('onActionMethodID');
        component.onRightClickMethodID = jasmine.createSpy('onRightClickMethodID');
        component.svyOnInit();
        textField.triggerEventHandler('contextmenu', null);
        expect(component.onRightClickMethodID).toHaveBeenCalled();
        textField.triggerEventHandler('keydown', { keyCode: 13 });
        expect(component.onActionMethodID).toHaveBeenCalled();
    });
    
    it('onfocusgained and lost handlers need to be called', () => {
        component.onFocusGainedMethodID = jasmine.createSpy('onFocusGainedMethodID');
        component.onFocusLostMethodID = jasmine.createSpy('onFocusLostMethodID');
        component.attachFocusListeners(component.getFocusElement());
        textField.triggerEventHandler('focus', null);
        expect(component.onFocusGainedMethodID).toHaveBeenCalled();
        expect(component.onFocusLostMethodID).toHaveBeenCalledTimes(0);
        textField.triggerEventHandler('blur', null);
        expect(component.onFocusLostMethodID).toHaveBeenCalledTimes(1);
    });
});
