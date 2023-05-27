import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-customer-saved-item',
  templateUrl: './customer-saved-item.component.html',
  styleUrls: ['./customer-saved-item.component.scss']
})
export class CustomerSavedItemComponent implements OnInit {
  view = "list"
  public SavedProduct =[];
  public user$:Observable<User | null> = this.authService.user$.asObservable();
  public user:User ;

  products;
  constructor(private productService:ProductsService,private authService:AuthService) {
    this.user$.subscribe((response)=>this.user = response);
    
    
    this.productService.getSavedProductsForUserId(this.user._id).subscribe(
      (reponse)=> {this.SavedProduct = reponse; console.log(this.SavedProduct);
      }
     )
  }

  ngOnInit(): void {
    
  
     
  }

}
