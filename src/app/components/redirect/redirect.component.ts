import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UrlConvert } from 'src/app/model/Url.mode';
import { ConvertUrlCrudService } from 'src/app/services/convert-url-crud.service';
import { tap } from "rxjs/operators";
@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {

  public href: string = "";
    //@ts-ignore
  convertedUrl$ : Observable<UrlConvert[]>;
  constructor(private route: ActivatedRoute,
    private convertUrl : ConvertUrlCrudService) {}

  ngOnInit(): void {
    this.reloadDirect()
  }

  
  reloadDirect(){
     //@ts-ignore
    var hrefID = this.route.snapshot.paramMap.get('id');
    this.convertedUrl$ =  this.convertUrl
          //@ts-ignore
          .get(hrefID)
          .pipe(tap((e) => ( 
                window.location.href = `${e[0].redirect_url}`
            )));
  }

}
