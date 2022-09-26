import { Component, OnInit, PLATFORM_INITIALIZER } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public usuario: string;
  public password: string;
  isLoggedIn: boolean;
  public callRfc:string;
  public jwtLogin:string;

  constructor(
     private route: Router,
     private http: HttpClient,
     public loadCtrl: LoadingController,
     public loadAlert: AlertController

     ) { }

  ngOnInit() {
      localStorage.setItem('callRfcUrl', 'http://qas-tomcat8.expled.cl:8082/baika-movilidad/call-rfc');
      localStorage.setItem('jwtLoginUrl', 'http://qas-tomcat8.expled.cl:8082/baika-movilidad/jwt-login');
      localStorage.setItem('callSp', 'http://qas-tomcat8.expled.cl:8082/baika-movilidad/call-sp');
  }
  async logIn(user, pass){
    const alert = await this.loadAlert.create({
      header: 'Error al Iniciar Session',
      message: 'Verificar Credenciales',
      buttons: ['Volver']
    });
    const loading = await this.loadCtrl.create({
      message: 'Cargando Datos Espere..'
    });
    loading.present();
     this.crearToken(user, pass).subscribe( res => {
      //console.log(res.perfil);
      let vPerfil = res.perfil;
      if(Object.keys(vPerfil).length === 0){
        //message error alert
        alert.present();
        this.route.navigate(['login']);
      }else{
         //procesar token
      localStorage.setItem('user', user);
      localStorage.setItem('token', res.token);
      this.route.navigate(['home']);
      //let token = localStorage.getItem('token');
      }
     
    });
    loading.dismiss();
    
    
  }
  public crearToken(user, pass){   
    let jwtUrl = localStorage.getItem('jwtLoginUrl');
    return this.http
    .post(jwtUrl,{
      "JCO_USER": user,
      "JCO_PASSWD": pass
    }).pipe(map((res:any) => {
      //console.log(res);
      return res;
    }));
  }
 
}