import { Component, OnInit, Injectable, PipeTransform } from '@angular/core';
import { HttpClientService } from '../GenericService/Http.service';
import { Observable, of} from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  city:any = "MUMBAI";
  banksList:any;
  p = 1;
  filter:any = '';
  filteredBanks: any =[];
  itemsPerPage = 10;
  favouriteBanks = [];
  listBanks: any;
  btnText = 'View Favourites'
  observable: any;

  constructor(public httpService:HttpClientService, public ngxService: NgxUiLoaderService, public http:HttpClient) { 
    
  }

  ngOnInit() {
    this.change(this.city)
    this.favouriteBanks = localStorage.getItem('favourites') == null ? [] : JSON.parse(localStorage.getItem('favourites'))
  }

  change(value){
    this.loadBankList()
  }

  async loadBankList() {

    
    this.ngxService.start()
    this.banksList = await this.http.get("https://vast-shore-74260.herokuapp.com/banks?city=" + this.city).toPromise();
    
    
      this.listBanks = this.banksList
      this.filteredBanks = this.banksList 
      this.ngxService.stop()
    
  }

  filterList(){
    if(this.filter == ''){
      this.filteredBanks = this.listBanks
    }
    else{
      this.filteredBanks=this.listBanks.filter((item) => {
        return (item.bank_name.toLowerCase().indexOf(this.filter.toLowerCase()) > -1 || 
                item.branch.toLowerCase().indexOf(this.filter.toLowerCase()) > -1 ||
                item.city.toLowerCase().indexOf(this.filter.toLowerCase()) > -1 ||
                item.state.toLowerCase().indexOf(this.filter.toLowerCase()) > -1 ||
                item.address.toLowerCase().indexOf(this.filter.toLowerCase()) > -1 ||
                item.district.toLowerCase().indexOf(this.filter.toLowerCase()) > -1 ||
                item.ifsc.toLowerCase().indexOf(this.filter.toLowerCase()) > -1)
      });
    }    

  }

  changePageSize(value){
    this.itemsPerPage = value
  }
  

  addToFav(item,i){
    this.filteredBanks[i].isFavourite = true
    item.isFavourite = true;
    
    this.favouriteBanks.push(item)
    localStorage.setItem('favourites', JSON.stringify(this.favouriteBanks))
  }

  showFav(){
    if(this.btnText == 'View Favourites'){
      this.listBanks = this.favouriteBanks
    }

    else{
      this.listBanks = this.banksList
    }

    if(this.btnText == 'View Favourites'){
      this.btnText = 'Show All'
    }

    else{
      this.btnText = 'View Favourites'
    }

    this.filteredBanks = this.listBanks
  }

  isFav(ifsc){
    if(this.favouriteBanks.find(x => x.ifsc === ifsc)){
      return true;
    }
    else{
      return false
    }
  }
}


