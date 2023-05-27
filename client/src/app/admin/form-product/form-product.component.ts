import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, Router } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';
import { ProductsService } from '../services/products.service';
import { colors, sizes } from 'src/app/core/models/arrays';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  product : Product;
  edit : boolean = false;
  submitButton = "Add new product";
  selectedFiles : any[];
  displayImages : string[] = [];
  colors : string[];
  size : string[];
  listColors = colors;
  listSizes = sizes;
  constructor(private activatedRoute: ActivatedRoute, private router: Router,private productService:ProductsService) { }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params["id"];
    this.product = new Product();
    if (id) {
      this.productService.getOneProduct(id).subscribe(result => {
        this.product = result;
        this.submitButton = "Edit";
        this.edit = true;
      })
    }else{
      this.product.color = [];
      this.product.size = [];
    }
  }

  submitForm(){
    if (this.edit) {
      this.productService.updateProduct(this.productToFormData(), this.product._id)
        .subscribe(res => this.router.navigateByUrl("/admin/products"));
    }else{
      this.productService.postNewProduct(this.productToFormData())
      .subscribe(res => this.router.navigateByUrl("/admin/products"));
    }
  }

  
  handleFileInput(files: FileList): void {
    this.selectedFiles = [];
    for (let i = 0; i < files.length; i++) {
      this.selectedFiles.push(files.item(i));
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.displayImages.push(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  }


  productToFormData() : FormData {
    const formData = new FormData();
    if (this.edit) {
      formData.append("_id",this.product._id);
      this.product.reviews.forEach(review => formData.append("review",review));
      this.product.image.forEach(file => formData.append('image',file));
    }
    formData.append('name', this.product.name.toString());
    formData.append('description', this.product.description.toString());
    formData.append('price',this.product.price.toString());
    formData.append('category',this.product.category.toString());
    formData.append('material',this.product.material.toString());
    formData.append('quantity',this.product.quantity.toString());
    this.product.color.forEach(color => formData.append('color',color));
    this.product.size.forEach(size => formData.append('size',size));
    this.selectedFiles?.forEach(file => formData.append('image',file));
    console.log(formData.getAll("review"));
    
    return formData;
  }

  handleSizes(size :string[]) : void{
    this.size = size;

  }

  removeImage(image : string){
    this.product.image.splice(this.product.image.indexOf(image),1);
  }

  handleColors(colors : string[] ) : void {
    this.colors = colors;
  }

  cancelImage(image : string){
    let index = this.displayImages.indexOf(image);
    this.displayImages.splice(index,1);
    this.selectedFiles.splice(index,1);
  }

}
