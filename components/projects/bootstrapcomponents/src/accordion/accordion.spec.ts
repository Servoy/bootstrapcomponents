import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { ServoyBootstrapAccordion } from './accordion';
import { Tab } from '../bts_basetabpanel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('ServoyBootstrapAccordion', () => {
    let fixture: ComponentFixture<ServoyBootstrapAccordion>;
    let component: ServoyBootstrapAccordion;

    function createDefaultTabs(): Tab[] {
        const tabs: Tab[] = [];
        let tab = new Tab();
        tab.name = 'tab1';
        tab.containedForm = 'form1';
        tab.text = 'tab1';
        tab.disabled = false;
        tabs.push(tab);
        tab = new Tab();
        tab.name = 'tab2';
        tab.containedForm = 'form2';
        tab.text = 'tab2';
        tab.disabled = false;
        tabs.push(tab);
        tab = new Tab();
        tab.name = 'tab3';
        tab.containedForm = 'form3';
        tab.text = 'tab3';
        tab.disabled = false;
        tabs.push(tab);
        return tabs;
    }

    async function createComponent(overrides: Record<string, any> = {}) {
        fixture = TestBed.createComponent(ServoyBootstrapAccordion);
        component = fixture.componentInstance;

        const defaults: Record<string, any> = {
            servoyApi: new ServoyApiTesting(),
            enabled: true,
            height: 100,
            tabs: createDefaultTabs(),
            ...overrides
        };

        for (const [key, value] of Object.entries(defaults)) {
            if (value !== undefined) {
                fixture.componentRef.setInput(key, value);
            }
        }

        fixture.detectChanges();
        await fixture.whenStable();
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ServoyPublicTestingModule, NgbModule, ServoyBootstrapAccordion],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        await createComponent();
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
        const el = fixture.nativeElement.querySelector('.bts-accordion');
        expect(el).not.toBeNull();
    });

    it('should show tabs', async () => {
        const buttons = fixture.nativeElement.querySelectorAll('button');
        expect(buttons.length).toBe(3);
        expect(buttons[0].textContent).toContain('tab1');
        expect(buttons[1].textContent).toContain('tab2');
        expect(buttons[2].textContent).toContain('tab3');
    });

    it('should handle tab click', async () => {
        const servoyApi = new ServoyApiTesting();
        const callServerSideApiSpy = vi.spyOn(servoyApi, 'callServerSideApi');
        await createComponent({ servoyApi });
        const buttons = fixture.nativeElement.querySelectorAll('button');
        buttons[1].click();
        fixture.detectChanges();
        await fixture.whenStable();
        expect(callServerSideApiSpy).toHaveBeenCalledWith('setTabIndexInternal', [2]);
    });

    it('should handle tabs edit - add tab', async () => {
        fixture.componentRef.setInput('tabIndex', 2);
        fixture.detectChanges();
        await fixture.whenStable();

        const tab = new Tab();
        tab.name = 'tab4';
        tab.containedForm = 'form4';
        tab.text = 'tab4';
        tab.disabled = false;
        const tabs = [...createDefaultTabs(), tab];
        fixture.componentRef.setInput('tabs', tabs);
        fixture.detectChanges();
        await fixture.whenStable();

        const buttons = fixture.nativeElement.querySelectorAll('button');
        expect(buttons.length).toBe(4);
        expect(buttons[3].textContent).toContain('tab4');
    });
});
