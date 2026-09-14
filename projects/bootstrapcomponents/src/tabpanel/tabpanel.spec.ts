import { ComponentFixture, TestBed, waitForAsync, tick, fakeAsync } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';

import { ServoyBootstrapTabpanel } from './tabpanel';
import { Tab } from '../bts_basetabpanel';
import { ServoyPublicTestingModule, WindowRefService, ServoyPublicService } from '@servoy/public';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServoyApi } from '@servoy/public';
import { By } from '@angular/platform-browser';
import { runOnPushChangeDetection } from '../testingutils';

describe('TabpanelComponent', () => {
    let component: ServoyBootstrapTabpanel;
    let fixture: ComponentFixture<ServoyBootstrapTabpanel>;
    const servoyApi: jasmine.SpyObj<ServoyApi> = jasmine.createSpyObj<ServoyApi>('ServoyApi', ['getMarkupId', 'formWillShow', 'hideForm', 'trustAsHtml', 'registerComponent', 'unRegisterComponent']);

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ServoyBootstrapTabpanel],
            imports: [NgbModule, ServoyPublicTestingModule],
            providers: [WindowRefService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ServoyBootstrapTabpanel);
        component = fixture.componentInstance;
        component.servoyApi = servoyApi;
        servoyApi.formWillShow.and.returnValue(Promise.resolve(true));
        servoyApi.hideForm.and.returnValue(Promise.resolve(true));
        const tabs = [];
        let tab = new Tab();
        tab.name = 'tab1';
        tab.containedForm = 'form1';
        tab.text = 'tab1';
        tabs[0] = tab;
        tab = new Tab();
        tab.name = 'tab2';
        tab.containedForm = 'form2';
        tab.text = 'tab2';
        tabs[1] = tab;

        component.tabs = tabs;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });

    it('should handle tabs', fakeAsync(() => {
        let clickSpy = jasmine.createSpy('onTabClickedMethodID');
        clickSpy.and.returnValue(Promise.resolve(true));
        component.onTabClickedMethodID = clickSpy;
        component.onChangeMethodID = jasmine.createSpy('onChangeMethodID');
        let tabs = fixture.debugElement.queryAll((By.css('.nav-link')));
        expect(tabs.length).toBe(2);
        expect(tabs[0].nativeElement.textContent).toBe('tab1');
        expect(tabs[1].nativeElement.textContent).toBe('tab2');
        tabs[1].children[0].triggerEventHandler('click', { target: tabs[1].children[0].nativeElement });
        tick();
        expect(component.onTabClickedMethodID).toHaveBeenCalled();
        expect(component.onChangeMethodID).toHaveBeenCalled();
        expect(component.tabIndex).toBe(2);

        component.tabIndex = 1;
        component.svyOnChanges({ 'tabIndex': new SimpleChange(2, 1, false) });
        tick();
        expect(component.onChangeMethodID).toHaveBeenCalledTimes(2);
    }));

    it('should handle tabs edit', async () => {
        component.svyOnChanges({ 'tabs': new SimpleChange(null, component.tabs, true) });
        await runOnPushChangeDetection(fixture);
        expect(component.tabIndex).toBe(1);
        component.selectTabAt(1);
        await runOnPushChangeDetection(fixture);
        expect(component.tabIndex).toBe(2);

        let tab = new Tab();
        tab.name = 'tab3';
        tab.containedForm = 'form3';
        tab.text = 'tab3';
        component.tabs.push(tab);
        component.svyOnChanges({ 'tabs': new SimpleChange(null, component.tabs, false) });
        await runOnPushChangeDetection(fixture);

        let tabs = fixture.debugElement.queryAll((By.css('.nav-link')));
        expect(tabs.length).toBe(3);
        expect(tabs[0].nativeElement.textContent).toBe('tab1');
        expect(tabs[1].nativeElement.textContent).toBe('tab2');
        expect(tabs[2].nativeElement.textContent).toBe('tab3');
        expect(component.tabIndex).toBe(2);

        component.tabs.splice(1, 1);
        component.svyOnChanges({ 'tabs': new SimpleChange(null, component.tabs, false) });
        await runOnPushChangeDetection(fixture);
        tabs = fixture.debugElement.queryAll((By.css('.nav-link')));
        expect(tabs.length).toBe(2);
        expect(tabs[0].nativeElement.textContent).toBe('tab1');
        expect(tabs[1].nativeElement.textContent).toBe('tab3');
        expect(component.tabIndex).toBe(2);
        
        component.tabs.splice(0, 1);
        component.svyOnChanges({ 'tabs': new SimpleChange(null, component.tabs, false) });
        await runOnPushChangeDetection(fixture);
        tabs = fixture.debugElement.queryAll((By.css('.nav-link')));
        expect(tabs.length).toBe(1);
        expect(tabs[0].nativeElement.textContent).toBe('tab3');
    });

    describe('overflow from contained form (SVY-20449)', () => {
        let publicService: ServoyPublicService;

        const mockFormCache = (layout: { [property: string]: string }) => ({
            absolute: true,
            size: { width: 100, height: 100 },
            getComponent: () => null,
            getBodyPartLayout: () => layout
        });

        const selectTabAsVisible = (tab: Tab) => {
            component.selectedTab = tab;
            component.onVisibleTab(tab);
        };

        beforeEach(() => {
            publicService = TestBed.inject(ServoyPublicService);
            selectTabAsVisible(component.tabs[0]);
        });

        it('AC1: hides overflow when contained form has scrollbars=NEVER', () => {
            spyOn(publicService, 'getFormCacheByName').and.returnValue(
                mockFormCache({ 'overflow-x': 'hidden', 'overflow-y': 'hidden' }) as any);

            const style = component.getContainerStyle(fixture.nativeElement);

            expect(style['overflowX']).toBe('hidden');
            expect(style['overflowY']).toBe('hidden');
            expect(style['overflow']).toBeUndefined();
        });

        it('AC3: keeps overflow auto when form allows scrollbars', () => {
            spyOn(publicService, 'getFormCacheByName').and.returnValue(mockFormCache(null) as any);

            const style = component.getContainerStyle(fixture.nativeElement);

            expect(style['overflow']).toBe('auto');
            expect(style['overflowX']).toBeUndefined();
            expect(style['overflowY']).toBeUndefined();
        });

        it('AC5: applies overflow per-axis when only overflow-x is constrained', () => {
            spyOn(publicService, 'getFormCacheByName').and.returnValue(
                mockFormCache({ 'overflow-x': 'hidden' }) as any);

            const style = component.getContainerStyle(fixture.nativeElement);

            expect(style['overflowX']).toBe('hidden');
            expect(style['overflowY']).toBeUndefined();
            expect(style['overflow']).toBeUndefined();
        });

        it('AC6: is a graceful no-op when the runtime lacks getBodyPartLayout', () => {
            spyOn(publicService, 'getFormCacheByName').and.returnValue({
                absolute: true,
                size: { width: 100, height: 100 },
                getComponent: () => null
            } as any);

            const style = component.getContainerStyle(fixture.nativeElement);

            expect(style['overflow']).toBe('auto');
            expect(style['overflowX']).toBeUndefined();
            expect(style['overflowY']).toBeUndefined();
        });

        it('AC4: re-derives overflow from the newly selected tab form', () => {
            const cacheSpy = spyOn(publicService, 'getFormCacheByName').and.callFake((formName: string) =>
                (formName === 'form1'
                    ? mockFormCache({ 'overflow-x': 'hidden', 'overflow-y': 'hidden' })
                    : mockFormCache(null)) as any);

            let style = component.getContainerStyle(fixture.nativeElement);
            expect(style['overflowX']).toBe('hidden');
            expect(style['overflowY']).toBe('hidden');
            expect(style['overflow']).toBeUndefined();

            selectTabAsVisible(component.tabs[1]);

            style = component.getContainerStyle(fixture.nativeElement);
            expect(style['overflow']).toBe('auto');
            expect(style['overflowX']).toBeUndefined();
            expect(style['overflowY']).toBeUndefined();
            expect(cacheSpy).toHaveBeenCalledWith('form2');
        });

        it('does not throw and keeps overflow auto when no tab is selected yet', () => {
            component.selectedTab = undefined;

            let style: { [property: string]: any };
            expect(() => style = component.getContainerStyle(fixture.nativeElement)).not.toThrow();
            expect(style['overflow']).toBe('auto');
            expect(style['overflowX']).toBeUndefined();
            expect(style['overflowY']).toBeUndefined();
        });
    });

});
