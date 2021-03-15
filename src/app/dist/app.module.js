"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_component_1 = require("./app.component");
var header_component_1 = require("./header/header.component");
var footer_component_1 = require("./footer/footer.component");
var clientes_component_1 = require("./clientes/clientes.component");
var form_component_1 = require("./clientes/form.component");
var paginador_component_1 = require("./paginador/paginador.component");
var uploads_component_1 = require("./clientes/uploads/uploads.component");
var login_component_1 = require("./usuarios/login.component");
var cliente_service_1 = require("./clientes/cliente.service");
var router_1 = require("@angular/router");
var http_1 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
var animations_1 = require("@angular/platform-browser/animations");
var datepicker_1 = require("@angular/material/datepicker");
var material_moment_adapter_1 = require("@angular/material-moment-adapter");
var es_1 = require("@angular/common/locales/es");
var common_1 = require("@angular/common");
common_1.registerLocaleData(es_1["default"], 'es');
var routes = [
    { path: '', redirectTo: '/clientes', pathMatch: 'full' },
    { path: 'clientes', component: clientes_component_1.ClientesComponent },
    { path: 'clientes/page/:page', component: clientes_component_1.ClientesComponent },
    { path: 'clientes/form', component: form_component_1.FormComponent },
    { path: 'clientes/form/:id', component: form_component_1.FormComponent },
    { path: 'login', component: login_component_1.LoginComponent }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                header_component_1.HeaderComponent,
                footer_component_1.FooterComponent,
                clientes_component_1.ClientesComponent,
                form_component_1.FormComponent,
                paginador_component_1.PaginadorComponent,
                uploads_component_1.UploadsComponent,
                login_component_1.LoginComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpClientModule,
                forms_1.FormsModule,
                router_1.RouterModule.forRoot(routes),
                animations_1.BrowserAnimationsModule,
                datepicker_1.MatDatepickerModule,
                material_moment_adapter_1.MatMomentDateModule,
            ],
            providers: [cliente_service_1.ClienteService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
