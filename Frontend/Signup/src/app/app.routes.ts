import { Routes } from '@angular/router';
// import { HomeComponent } from './home/home.component';
// import { AboutComponent } from './about/about.component';
// import { ContactComponent } from './contact/contact.component';
// import { ExampleComponent } from './example/example.component';
// import { FooterComponent } from './footer/footer.component';
// import { FormComponent } from './form/form.component';
// import { RxjsComponent } from './rxjs/rxjs.component';
// import { FilterComponent } from './filter/filter.component';
// import { ParentComponent } from './parent/parent.component';
// import { ChildComponent } from './child/child.component';
// import { Parent1Component } from './parent1/parent1.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    {path:'',component:SignupComponent},
    // {path:"home",component:HomeComponent},
    // {path:"about",component:AboutComponent},
    // {path:"contact",component:ContactComponent},
    // {path:"example",component:ExampleComponent},
    // {path:"footer",component:FooterComponent},
    // {path:"form",component:FormComponent},
    // {path:"rxjs",component:RxjsComponent},
    // {path:"filter",component:FilterComponent},
    // {path:"parent",component:ParentComponent},
    // {path:"parent1",component:Parent1Component},
    {path:"signup",component:SignupComponent},
    {path:"login",component:LoginComponent}
];
