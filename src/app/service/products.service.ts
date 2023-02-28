






import{HttpClient,HttpHeaders}from"@angular/common/http";
import {Injectable}from"@angular/core";
import {product} from '../model/products';
import { map } from 'rxjs';
@Injectable({providedIn:"root"})
export class productservice{
    constructor(private http:HttpClient){

    }
createproduct(products:{name:string,price:number,quant:number}){
    console.log(products);
const headers=new HttpHeaders({'myHeader':'seiyedheader'})
this.http.post<{name:string}>('https://angularbyseiyed-default-rtdb.firebaseio.com/products.json',products
,{headers:headers})
.subscribe((res)=>{
console.log(res);
});

}
fetchproduct(){
 return this.http.get('https://angularbyseiyed-default-rtdb.firebaseio.com/products.json')
    .pipe(map((res:{[key:string]:product})=>{
      const products=[];
    for(const key in res){
      if(res.hasOwnProperty(key)){
    products.push({...res[key],id:key})
      }
    }
    return products;
    }))
    
}
deleteproduct(id:string){
    this.http.delete('https://angularbyseiyed-default-rtdb.firebaseio.com/products/'+id+'.json')
    .subscribe();
}
deleteallproduct(){
    this.http.delete('https://angularbyseiyed-default-rtdb.firebaseio.com/products/.json')
    .subscribe();
}
updateproduct(id:string,value:product){
    this.http.put('https://angularbyseiyed-default-rtdb.firebaseio.com/products/'+id+'.json',value)
    .subscribe();
}
}