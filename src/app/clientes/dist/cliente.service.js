"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClienteService = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var rxjs_1 = require("rxjs");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var sweetalert2_1 = require("sweetalert2");
var ClienteService = /** @class */ (function () {
    function ClienteService(http, router) {
        this.http = http;
        this.router = router;
        this.urlEndPoint = 'http://localhost:8080/api/clientes';
        this.httpHeader = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
    }
    ClienteService.prototype.noAutorizado = function (e) {
        if (e.status == 401 || e.status == 403) {
            this.router.navigate(['/login']);
            return true;
        }
        else {
            return false;
        }
    };
    ClienteService.prototype.getRegiones = function () {
        var _this = this;
        return this.http.get(this.urlEndPoint + '/regiones').pipe(operators_1.catchError(function (e) {
            _this.noAutorizado(e);
            return rxjs_1.throwError(e);
        }));
    };
    ClienteService.prototype.getClientes = function (page) {
        return this.http.get(this.urlEndPoint + '/page/' + page).pipe(operators_1.tap(function (response) {
            //console.log('ClienteService: Transmitiendo flujo TAP 1');
            response.content.forEach(function (cliente) {
            });
        }), operators_1.map(function (response) {
            response.content.map(function (cliente) {
                cliente.nombre = cliente.nombre.toUpperCase();
                var datePipe = new common_1.DatePipe('es');
                cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy'); //formatDate(cliente.createAt, 'dd-MM-yyyy', 'en-US');
                return cliente;
            });
            return response;
        }), operators_1.tap(function (response) {
            //  console.log('ClienteService: Transmitiendo flujo tap 2');
            response.content.forEach(function (cliente) {
            });
        }));
    };
    ClienteService.prototype.create = function (cliente) {
        var _this = this;
        return this.http.post(this.urlEndPoint, cliente, { headers: this.httpHeader }).pipe(operators_1.catchError(function (e) {
            if (_this.noAutorizado) {
                return rxjs_1.throwError(e);
            }
            if (e.status == 400) {
                return rxjs_1.throwError(e);
            }
            console.error(e.error.mensaje);
            sweetalert2_1["default"].fire(e.error.mensaje, e.error.error, 'error');
            return rxjs_1.throwError(e);
        }));
    };
    ClienteService.prototype.getCliente = function (id) {
        var _this = this;
        return this.http.get(this.urlEndPoint + "/" + id).pipe(operators_1.map(function (response) { return response.cliente; }), operators_1.catchError(function (e) {
            if (_this.noAutorizado) {
                return rxjs_1.throwError(e);
            }
            _this.router.navigate(['/clientes']);
            console.error(e.error.mensaje);
            sweetalert2_1["default"].fire(e.error.error, e.error.mensaje, 'error');
            return rxjs_1.throwError(e);
        }));
    };
    ClienteService.prototype.update = function (cliente) {
        var _this = this;
        return this.http.put(this.urlEndPoint + "/" + cliente.id, cliente, { headers: this.httpHeader }).pipe(operators_1.map(function (response) { return response.cliente; }), operators_1.catchError(function (e) {
            if (_this.noAutorizado) {
                return rxjs_1.throwError(e);
            }
            //Aca enviamos el error, para ser capturado en el metodo
            //En el componente del formulario. 
            if (e.status == 400) {
                return rxjs_1.throwError(e);
            }
            console.error(e.error.mensaje);
            sweetalert2_1["default"].fire(e.error.mensaje, e.error.error, 'error');
            return rxjs_1.throwError(e);
        }));
    };
    ClienteService.prototype["delete"] = function (id) {
        var _this = this;
        return this.http["delete"](this.urlEndPoint + "/" + id, { headers: this.httpHeader }).pipe(operators_1.catchError(function (e) {
            if (_this.noAutorizado) {
                _this.router.navigate(['/login']);
                return rxjs_1.throwError(e);
            }
            console.error(e.error.mensaje);
            sweetalert2_1["default"].fire(e.error.error, e.error.mensaje, 'error');
            return rxjs_1.throwError(e);
        }));
    };
    ClienteService.prototype.subirFoto = function (archivo, id) {
        var _this = this;
        var formData = new FormData();
        formData.append("archivo", archivo);
        formData.append("id", id);
        var req = new http_1.HttpRequest('POST', this.urlEndPoint + "/upload", formData, {
            reportProgress: true
        });
        return this.http.request(req).pipe(operators_1.catchError(function (e) {
            _this.noAutorizado(e);
            return rxjs_1.throwError(e);
        }));
        ;
    };
    ;
    ClienteService = __decorate([
        core_1.Injectable()
    ], ClienteService);
    return ClienteService;
}());
exports.ClienteService = ClienteService;
