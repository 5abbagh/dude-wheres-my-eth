import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AddRuleComponent } from './components/add-rule/add-rule.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { ModifyRuleComponent } from './components/modify-rule/modify-rule.component';
import { GetRuleComponent } from './components/get-rule/get-rule.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { ToEtherPipe } from './pipes/to-ether.pipe';
import { ToWeiPipe } from './pipes/to-wei.pipe';

@NgModule({
    declarations: [AppComponent, AddRuleComponent, ModifyRuleComponent, GetRuleComponent, ToEtherPipe, ToWeiPipe],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatTabsModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatInputModule,
        MatTableModule,
        FormsModule,
        ReactiveFormsModule,
        MatDividerModule,
        MatGridListModule,
    ],
    providers: [ToEtherPipe, ToWeiPipe],
    bootstrap: [AppComponent],
})
export class AppModule {}
