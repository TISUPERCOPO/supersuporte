import { NgModule } from "@angular/core";
import { AccordionModule } from "primeng/accordion";
import { CardModule } from "primeng/card";
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';




@NgModule({
    exports: [
        AccordionModule,
        CardModule,
        SidebarModule,
        ButtonModule,
        InputMaskModule,
        FormsModule,
        CommonModule,
        FormsModule,
        InputTextModule,
        InputNumberModule,
        InputTextareaModule,
        ToastModule
    ]
})

export class PrimeNgModule { }