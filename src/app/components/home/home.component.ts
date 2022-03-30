import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { UrlConvert } from 'src/app/model/Url.mode';
import { ConvertUrlCrudService } from 'src/app/services/convert-url-crud.service';
import { tap } from "rxjs/operators";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'convertUrl';
  value = "";
  set_url = 'Converted URL will display here!';
  validate = true;
  //@ts-ignore
  convertedUrl$ : Observable<UrlConvert[]>;

  checkoutForm = this.formBuilder.group({
    url_send: '',
  });

  constructor(
    private formBuilder: FormBuilder,
    private convertUrl : ConvertUrlCrudService
  ) {}

  ngOnInit(): void {
    this.convertedUrl$ = this.convertUrl.fetchAll();
  }

  fetchAll(): Observable<UrlConvert[]> {
    return this.convertUrl.fetchAll();
  }
  
  onSubmit(): void {
    var code = this.makeid(8);
    const data =  {
      redirect  : this.checkoutForm.value.url_send,
      alias     : location.origin+'/redirect/'+code,
      codex      : code
    };

    var url = this.checkoutForm.value.url_send;
    var regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (url != "") {
        if (!regexp.test(url)) {
            this.set_url = 'Please input invalid URL!';
            this.validate = false;
        } else {
          this.validate = true;
          this.convertedUrl$ = this.convertUrl
          //@ts-ignore
          .post(data)
          .pipe(tap((e) => ( 
            this.set_url = location.origin+'/redirect/'+code,
            console.log(this.convertedUrl$)
            )));
        }
    }
    else {
      this.set_url = 'Cannot convert an empty text.......';
      this.validate = false;
    }
    this.checkoutForm.reset();
    this.checkoutForm.value.url_send = '';
  }



  // @ts-ignore
  makeid(length){
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
    charactersLength));
      }
      return result;
  }
}
