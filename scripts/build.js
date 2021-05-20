var AdmZip = require('adm-zip');

// creating archives
var zip = new AdmZip();

zip.addLocalFolder("./META-INF/", "/META-INF/");
zip.addLocalFolder("./dist/servoy/bootstrapcomponents/", "/dist/servoy/bootstrapcomponents/");
zip.addLocalFolder("./accordion/", "/accordion/");
zip.addLocalFolder("./button/", "/button/");
zip.addLocalFolder("./calendar/", "/calendar/");
zip.addLocalFolder("./calendarinline/", "/calendarinline/");
zip.addLocalFolder("./checkbox/", "/checkbox/");
zip.addLocalFolder("./choicegroup/", "/choicegroup/");
zip.addLocalFolder("./combobox/", "/combobox/");
zip.addLocalFolder("./datalabel/", "/datalabel/");
zip.addLocalFolder("./formcomponent/", "/formcomponent/");
zip.addLocalFolder("./imagemedia/", "/imagemedia/");
zip.addLocalFolder("./label/", "/label/");
zip.addLocalFolder("./list/", "/list/");
zip.addLocalFolder("./progressbar/", "/progressbar/");
zip.addLocalFolder("./select/", "/select/");
zip.addLocalFolder("./table/", "/table/");
zip.addLocalFolder("./tablesspanel/", "/tablesspanel/");
zip.addLocalFolder("./tabpanel/", "/tabpanel/");
zip.addLocalFolder("./textarea/", "/textarea/");
zip.addLocalFolder("./textbox/", "/textbox/");
zip.addLocalFolder("./typeahead/", "/typeahead/");
zip.addLocalFolder("./lib/", "/lib/");

zip.writeZip("bootstrapcomponents.zip");