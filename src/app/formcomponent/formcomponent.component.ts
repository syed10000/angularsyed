




import { Component,OnInit } from '@angular/core';
import { AppModule } from '../app.module';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs';
import {product} from '../model/products';
import { compileDeclareNgModuleFromMetadata } from '@angular/compiler';
import { ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { productservice } from '../service/products.service';
@Component({
  selector: 'app-formcomponent',
  templateUrl: './formcomponent.component.html',
  styleUrls: ['./formcomponent.component.css']
})
export class FormcomponentComponent implements OnInit{
  allproducts:product[]=[];
  isfetching:boolean=false;
  @ViewChild('productform')form:NgForm;
  editmode:boolean=false;
  currentproductid:string;
  constructor(private http:HttpClient,private productservice:productservice){

  }
ngOnInit(){
this.getproducts();
}
onproductfetch(){
  this.getproducts();
}
  
  onProductCreate(products:{name:string,price:number,quant:number,id:string}){
    if(!this.editmode)
this.productservice.createproduct(products);
else
this.productservice.updateproduct(this.currentproductid,products);
  }
  private getproducts(){
    this.isfetching=true;
 this.productservice.fetchproduct().subscribe((products)=>{
 this.allproducts=products;
this.isfetching=false})
  }
  ondeleteproduct(id:string){
      this.productservice.deleteproduct(id);
  }
  deleteallproduct(){
    this.productservice.deleteallproduct();
  }

oneditclicked(id:string){
  this.currentproductid=id;
  let currentproduct=this.allproducts.find((p)=>{return p.id === id});
  this.form.setValue({
    name:currentproduct.name,
    price:currentproduct.price,
    quant:currentproduct.quant
  })
  this.editmode=true;
}
  
}
