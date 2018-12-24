import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { ProductsComponent } from './components/products/products.component';
import { MycartComponent } from './components/mycart/mycart.component';
import { ItemsComponent } from './components/items/items.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import { OrderplacedComponent } from './components/orderplaced/orderplaced.component';
import { UseraccountComponent } from './components/useraccount/useraccount.component';
import { MysavedlistComponent } from './components/mysavedlist/mysavedlist.component';
import { PromocodesComponent } from './components/promocodes/promocodes.component';




export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		HeaderComponent,
		FooterComponent,
		AboutusComponent,
		LoginComponent,
		RegistrationComponent,
		ProductdetailsComponent,
		MycartComponent,
		ProductsComponent,
		ItemsComponent,
		OrderplacedComponent,
		UseraccountComponent,
		MysavedlistComponent,
		PromocodesComponent

	],
	imports: [
		BrowserModule,
		HttpClientModule,
		MatDialogModule,
		BrowserAnimationsModule,
		MDBBootstrapModule.forRoot(),
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		}),
		RouterModule.forRoot([

			{ path: '', component: HomeComponent },
			{ path: 'aboutUs', component: AboutusComponent },
			{ path: 'productdetails', component: ProductdetailsComponent, data: { some_data: 'some value' } },
			{
				path: 'products',
				component: ProductsComponent,
			},
			{
				path: 'Mycart',
				component: MycartComponent,
			},
			{
				path: 'Orderplaced',
				component: OrderplacedComponent,
			},
			{
				path: 'Products',
				component: ProductsComponent,
			},
			{ path: 'myaccount', component: UseraccountComponent, data: [{ page: 'profile' }] },
			{ path: 'wishlistAccount', component: UseraccountComponent, data: [{ page: 'wishlist' }] },
			{ path: 'myorders', component: UseraccountComponent, data: [{ page: 'orders' }] },
			{ path: 'notifications', component: UseraccountComponent, data: [{ page: 'notifications' }] },
			{ path: 'mysavedlist', component: MysavedlistComponent, data: [{ page: 'Mysavedlist' }] },
			{ path: 'aboutus', component: AboutusComponent, data: [{ page: 'Aboutus' }] }
		], { useHash: true })
	],
	schemas: [NO_ERRORS_SCHEMA],
	providers: [],
	bootstrap: [AppComponent],
	entryComponents: [LoginComponent, RegistrationComponent, ItemsComponent, PromocodesComponent],
	exports: [BrowserModule, TranslateModule]
})
export class AppModule {

}
