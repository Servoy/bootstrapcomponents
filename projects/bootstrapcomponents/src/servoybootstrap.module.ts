
import { NgModule } from '@angular/core';
import { ServoyPublicModule, SpecTypesService } from '@servoy/public';
import { ServoyBootstrapButton } from './button/button';
import { ServoyBootstrapLabel } from './label/label';
import { CommonModule } from '@angular/common';
import { ServoyBootstrapTextarea } from './textarea/textarea';
import { FormsModule } from '@angular/forms';
import { ChoiceElementDirective } from './choicegroup/choicegroup';
import { ServoyBootstrapChoicegroup } from './choicegroup/choicegroup';
import { ServoyBootstrapCheckbox } from './checkbox/checkbox';
import { ServoyBootstrapTextbox } from './textbox/textbox';
import { ServoyFloatLabelBootstrapTextbox } from './floatlabeltextbox/floatlabeltextbox';
import { ServoyFloatLabelBootstrapTypeahead } from './floatlabeltypeahead/floatlabeltypeahead';
import { ServoyFloatLabelBootstrapTextarea } from './floatlabeltextarea/floatlabeltextarea';
import { ServoyFloatLabelBootstrapCombobox } from './floatlabelcombobox/floatlabelcombobox';
import { ServoyFloatLabelBootstrapCalendar } from './floatlabelcalendar/floatlabelcalendar';
import { ServoyBootstrapDatalabel, DesignTextPipe } from './datalabel/datalabel';
import { ServoyBootstrapList } from './list/list';
import { ServoyBootstrapSelect } from './select/select';
import { ServoyBootstrapAccordion } from './accordion/accordion';
import { ServoyBootstrapTypeahead } from './typeahead/typeahead';
import { SvyNgbHighlight } from './typeahead/highlight';
import { BsTabpanelActiveTabVisibilityListener, ServoyBootstrapTabpanel } from './tabpanel/tabpanel';
import { ServoyBootstrapTablesspanel } from './tablesspanel/tablesspanel';
import { ServoyBootstrapCombobox } from './combobox/combobox';
import { ServoyBootstrapCalendar } from './calendar/calendar';
import { ServoyBootstrapCalendarinline } from './calendarinline/calendarinline';
import { ShowDisplayValuePipe } from './lib/showDisplayValue.pipe';
import { ServoyBootstrapImageMedia } from './imagemedia/imagemedia';
import { NgbModule }  from '@ng-bootstrap/ng-bootstrap';
import { Tab } from './bts_basetabpanel';

@NgModule({
    declarations: [
      ServoyBootstrapImageMedia,
      ServoyBootstrapButton,
      ServoyBootstrapLabel,
      ServoyBootstrapTextarea,
      ServoyBootstrapChoicegroup,
      ChoiceElementDirective,
      ServoyBootstrapCheckbox,
      ServoyBootstrapTextbox,
      ServoyFloatLabelBootstrapTextbox,
      ServoyFloatLabelBootstrapTypeahead,
      ServoyFloatLabelBootstrapTextarea,
      ServoyFloatLabelBootstrapCombobox,
      ServoyFloatLabelBootstrapCalendar,
      ServoyBootstrapDatalabel,
      ServoyBootstrapList,
      ServoyBootstrapSelect,
      ServoyBootstrapAccordion,
      ServoyBootstrapTypeahead,
      SvyNgbHighlight,
      ServoyBootstrapTabpanel,
      ServoyBootstrapTablesspanel,
      ServoyBootstrapCombobox,
      ServoyBootstrapCalendar,
      ServoyBootstrapCalendarinline,
      ShowDisplayValuePipe,
      DesignTextPipe,
      BsTabpanelActiveTabVisibilityListener
    ],
    providers: [],
    imports: [
      ServoyPublicModule,
      CommonModule,
      FormsModule,
      NgbModule
    ],
    exports: [
      ServoyBootstrapImageMedia,
      ServoyBootstrapButton,
      ServoyBootstrapLabel,
      ServoyBootstrapTextarea,
      ServoyBootstrapChoicegroup,
      ServoyBootstrapCheckbox,
      ServoyBootstrapTextbox,
      ServoyFloatLabelBootstrapTextbox,
      ServoyFloatLabelBootstrapTypeahead,
      ServoyFloatLabelBootstrapTextarea,
      ServoyFloatLabelBootstrapCombobox,
      ServoyFloatLabelBootstrapCalendar,
      ServoyBootstrapDatalabel,
      ServoyBootstrapList,
      ServoyBootstrapSelect,
      ServoyBootstrapAccordion,
      ServoyBootstrapTypeahead,
      ServoyBootstrapTabpanel,
      ServoyBootstrapTablesspanel,
      ServoyBootstrapCombobox,
      ServoyBootstrapCalendar,
      ServoyBootstrapCalendarinline]
})
export class ServoyBootstrapComponentsModule {
     constructor( specTypesService: SpecTypesService ) {
        specTypesService.registerType('bootstrapcomponents-tabpanel.tab', Tab);
        specTypesService.registerType('bootstrapcomponents-tablesspanel.tab', Tab);
        specTypesService.registerType('bootstrapcomponents-accordion.tab', Tab);
    }
}
