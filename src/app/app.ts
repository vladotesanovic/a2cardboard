import { Component, View, } from "angular2/core";
import { bootstrap } from "angular2/platform/browser";
import { Engine } from "./services/engine";

@Component({
    selector: "app"
})
@View({
    template: "<div id='container'></div>"
})

export class AppComponent {

    constructor() {
        new Engine(document.getElementById("container"));

        let audio = new Audio("audio/background.mp3");
        audio.loop = true;
        audio.volume = .7;
        audio.play();
    }
}

bootstrap(AppComponent);
