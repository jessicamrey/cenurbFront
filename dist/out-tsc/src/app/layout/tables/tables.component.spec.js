"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/router/testing");
var tables_component_1 = require("./tables.component");
var tables_module_1 = require("./tables.module");
describe('TablesComponent', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [tables_module_1.TablesModule, testing_2.RouterTestingModule],
        })
            .compileComponents();
    }));
    it('should create', function () {
        var fixture = testing_1.TestBed.createComponent(tables_component_1.TablesComponent);
        var component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=tables.component.spec.js.map