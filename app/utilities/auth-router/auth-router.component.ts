import {Directive, Attribute, ElementRef, DynamicComponentLoader} from "angular2/core";
import {Router, RouterOutlet, ComponentInstruction} from "angular2/router";
import {hasValidToken, isAdministrator} from "../Jwt";
import {Route, Routes} from "../../app.component";

@Directive({
    selector: "auth-router-outlet"
})
export class AuthRouterOutlet extends RouterOutlet {
    private parentRouter: Router;

    constructor(_elementRef: ElementRef, _loader: DynamicComponentLoader, _parentRouter: Router, @Attribute("name") nameAttr: string) {
        super(_elementRef, _loader, _parentRouter, nameAttr);

        this.parentRouter = _parentRouter;
    }

    activate(instruction: ComponentInstruction): Promise<any> {
        var route = this.findRoute("/" + instruction.urlPath);
        if (!route) {
            this.parentRouter.navigate(["Home"]);
            return;
        }

        if (!route.role) {
            return super.activate(instruction);
        }

        if (route.role === "TachographCentre" && hasValidToken()) {
            return super.activate(instruction);
        }

        if (route.role === "Administrator" && hasValidToken(["Administrator"])) {
            return super.activate(instruction);
        }

        this.parentRouter.navigate(["Login"]);
        return;
    }

    findRoute(url: string): Route {
        if (url === "/") {
            return Routes[0];
        }

        for (var index = 1; index < Routes.length; index++) {
            var element = Routes[index];
            if (url.indexOf(element.path) > -1) {
                return element;
            }
        }

        return null;
    }
}
