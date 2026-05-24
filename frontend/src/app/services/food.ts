import { Injectable } from '@angular/core';
import { sample_foods, sample_tags } from '../../data';
import {Food} from "../shared/models/Food"
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FOOD_By_ID_URL, FOOD_BY_SEARCH_URL, FOOD_BY_TAG_URL, FOOD_TAGS_URL, FOOD_URL } from '../shared/constant/urls';
import { Tag } from '../shared/models/tag';


@Injectable({
  providedIn: 'root',
})


export class FoodService {

constructor(private http:HttpClient)
{



}

getAll():Observable<Food[]>
{
return this.http.get<Food[]>(FOOD_URL) ;

}


getAllFoodBySearchTerm(food:string){

return this.http.get<Food[]>(FOOD_BY_SEARCH_URL+food)

}
getFoodById(id:string):Observable<Food>
{

return  this.http.get<Food>(FOOD_By_ID_URL+id)
}

getAlltags()
{
  return this.http.get<Tag[]>(FOOD_TAGS_URL);
}
getAllFoodsByTag(tagName:string){
  return tagName =="All"?this.http.get<Food[]>(FOOD_URL):
this.http.get<Food[]>(FOOD_BY_TAG_URL+tagName);
}

}
