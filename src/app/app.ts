import { Component, View, bootstrap } from "angular2/angular2";
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
        let audio = new Audio("audio/theme.mp3");
        audio.loop = true;
        audio.volume = 0.5;
        audio.play();
    }
}

bootstrap(AppComponent);
