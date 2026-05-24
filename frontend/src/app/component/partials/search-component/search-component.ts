import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-component',
  imports: [],
  templateUrl: './search-component.html',
  styleUrl: './search-component.css',
})
export class SearchComponent {

searchTerm ="";


constructor(activatedRoute:ActivatedRoute,private router:Router){
    activatedRoute.params.subscribe((params)=>{

                  if(params["searchTerm"]){

                     if(params["searchTerm"].length==0)
                     {
                           this.searchTerm = params["searchTerm"]
                     }else{ this.searchTerm = params["searchTerm"]}

                     
                  }   
                  

    })




}



search(term:string)
{

if(term)
  this.router.navigateByUrl(`search/${term}`)

}


}
