
import { NgModule, inject } from '@angular/core';
import { SpecTypesService } from '@servoy/public';
import { ServoyBootstrapButton } from './button/button';
import { ServoyBootstrapLabel } from './label/label';
import { ServoyBootstrapTextarea } from './textarea/textarea';
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
import { Tab } from './bts_basetabpanel';

@NgModule({
    imports: [
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
      DesignTextPipe,
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
      BsTabpanelActiveTabVisibilityListener
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
      ServoyBootstrapCalendarinline
    ]
})
export class ServoyBootstrapComponentsModule {
    private readonly specTypesService = inject(SpecTypesService);

    constructor() {
        this.specTypesService.registerType('bootstrapcomponents-tabpanel.tab', Tab);
        this.specTypesService.registerType('bootstrapcomponents-tablesspanel.tab', Tab);
        this.specTypesService.registerType('bootstrapcomponents-accordion.tab', Tab);
    }
}
