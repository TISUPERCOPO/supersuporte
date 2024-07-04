import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { PrimeNgModule } from "src/app/primeng.module";
import { HomeRouting } from "./home.routing";


@NgModule({
declarations: [
    HomeComponent
],
imports: [
    PrimeNgModule,
    HomeRouting
]
})

export class HomeModule {}