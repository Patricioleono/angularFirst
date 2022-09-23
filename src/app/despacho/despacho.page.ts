import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-despacho',
  templateUrl: './despacho.page.html',
  styleUrls: ['./despacho.page.scss'],
})
export class DespachoPage implements OnInit {
public user:string;
public seguimiento:string;
public datosForm:any = [];
public itemBusqueda:string;
//formulario manual
public patente:string;
public rampla:string;
public rChofer:string;
public nChofer:string;
public comentario:string;

  constructor(
    private http:HttpClient,
    private router:Router,
    public loadCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.user = localStorage.getItem('user');
    this.seguimiento = localStorage.getItem('centroSeguimiento');
   
  }
  public localManual(patente, rampla, rChofer, nChofer, comentario){
    localStorage.setItem('patente', this.patente);
    localStorage.setItem('rampla', this.rampla);
    localStorage.setItem('nChofer', this.nChofer);
    localStorage.setItem('rChofer', this.rChofer);
    localStorage.setItem('comentario', this.comentario);
    this.router.navigate(['/picking']);
  }
  async buscarPedido(itemBusqueda){
   const loading = await this.loadCtrl.create({ message: 'Cargando Datos Espere..' });
   loading.present();
    this.searchPedido(itemBusqueda).subscribe( (sped:any = []) => {
      this.datosForm =  Object.values(sped.data.ZSD_10010.TABLES.ET_PEDIDOS);
      console.log(this.datosForm);
      loading.dismiss();
     });
  }
  searchPedido(itemBusqueda){
    localStorage.setItem('itemPedido', itemBusqueda);
    const callRfcUrl = localStorage.getItem('callRfcUrl');
    const headers = new HttpHeaders().append(
      'Authorization', localStorage.getItem('token')
    );
    const body = {
      "INPUT":{
         "IR_VBELN":[
            {
               "SIGN":"I",
               "OPTION":"EQ",
               "LOW":itemBusqueda,
               "HIGH":""
            }
         ],
         "IR_WERKS":[
            {
               "SIGN":"I",
               "OPTION":"EQ",
               "LOW":"FC01",
               "HIGH":""
            }
         ],
         "IR_ERDAT":[
            {
               "SIGN":"I",
               "OPTION":"EQ",
               "LOW":"2022-09-09",
               "HIGH":""
            }
         ],
         "IR_AUART":[
            {
               "SIGN":"I",
               "OPTION":"EQ",
               "LOW":"B001",
               "HIGH":""
            },
            {
               "SIGN":"I",
               "OPTION":"EQ",
               "LOW":"B004",
               "HIGH":""
            },
            {
               "SIGN":"I",
               "OPTION":"EQ",
               "LOW":"S101",
               "HIGH":""
            },
            {
               "SIGN":"I",
               "OPTION":"EQ",
               "LOW":"S103",
               "HIGH":""
            }
         ]
      },
      "RFC":"ZSD_10010"
   }     
     return this.http.post<any>(callRfcUrl, body, 
      {headers: headers}).pipe(map((pedido:any) => {
      return pedido;
     }));
  }

}
