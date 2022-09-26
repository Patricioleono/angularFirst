import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-picking',
  templateUrl: './picking.page.html',
  styleUrls: ['./picking.page.scss'],
})
export class PickingPage implements OnInit {
  public seguimiento: string;
  public user: string;
  public jwtUrl: string = localStorage.getItem('jwtLoginUrl');
  public busquedaFolios: string;
  public urlRfc: string = localStorage.getItem('callRfcUrl');
  public dataFolios: any = [];
  public itemFolio: any = [];
  public fRequest:any = [];
  public openModal: boolean;
    


  constructor(
    private route: Router,
    private http: HttpClient,
    public loadCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.user = localStorage.getItem('user');
    this.seguimiento = localStorage.getItem('centroSeguimiento');
    
  }
  public async bFolios(folios) {
    const loading = await this.loadCtrl.create({message: 'Cargando Datos Espere..'});
    loading.present();
    if(folios)  {
      this.valdidarFolios(folios).subscribe((vFolios: any = []) => {
        this.dataFolios = Object.values(vFolios);
        let data = this.dataFolios[0].ZMOV_10002.TABLES.STOCKLOTES.item;
        this.itemFolio = data;
        loading.dismiss();
        console.log(vFolios);
        console.log(data);
      });
    } else {
      let newfoliosArray:any = [];
      newfoliosArray.push(folios.replace(","));
       console.log(newfoliosArray);
    }
    
    
  }
  public construccionBody(data){
    let newData = data.split('\n');
    let allData:any = [];
    for(let i = 0; i < newData.length; i++){
      let arrayQuery:any = []; 
      arrayQuery =
        {
          "SIGN": "I",
          "OPTION": "EQ",
          "LOW": newData[i], //input busqueda
          "HIGH": ""
        },
      
      allData.push(arrayQuery);
    }
    return allData;
    
  }
  public valdidarFolios(data) {
    const headers = new HttpHeaders().append(
      'Authorization', localStorage.getItem('token')
    );
    let cBody = this.construccionBody(data);
    console.log(cBody);
    const body = {
        "INPUT": {
          "IV_SPRAS": "S",
          "IV_LIB_UTIL": "L",
          "I_CLASE": "",
          "IR_WERKS": [
            {
              "SIGN": "I",
              "OPTION": "EQ",
              "LOW": "FC01",
              "HIGH": ""
            }
          ],
          "IR_LGORT": [
            {
              "SIGN": "I",
              "OPTION": "EQ",
              "STLOC_LOW": "A050",
              "STLOC_HIGH": ""
            }
          ],
          "IR_CHARG":
            cBody,
        },
        "RFC": "ZMOV_10002"
      }
      
    return this.http.post<any>(this.urlRfc, body, {
      headers: headers
    }).pipe(map((folios: any = []) => {
      console.log(folios);
      return folios;
    }));
  }
  public enviarDatos(modal) {
    this.openModal = modal;

   this.finalRequest().subscribe( fiRequest => {
    let pData = Object.values(fiRequest);
    let fData = pData[0];
    this.fRequest = fData;
    console.log(this.fRequest);
   });
      
  }

  private fRequestBody(){
    let data = this.itemFolio;
    let newBody:any = [];
    for(let i = 0; i < data.length; i++){
      let arrayDataBody:any = [];
       arrayDataBody =
      {
        "LOTE":data[i].CHARG,
        "MATERIAL_HU":data[i].MATNR,
        "ALMACEN":data[i].LGORT,
        "CENTRO":data[i].WERKS,
        "CANTIDAD_LOTE":data[i].CLABS
     };
     newBody.push(arrayDataBody);
    }
    return newBody;
  }

  private finalRequest(){
    let almacen = this.itemFolio[0].LGORT;

    let ZPATENTE = localStorage.getItem('patente');
    let ZNOTRACTOR = localStorage.getItem('rampla');
    let ZRUT = localStorage.getItem('rChofer');
    let ZCHOFER = localStorage.getItem('nChofer');
    let TDLINE = localStorage.getItem('comentario');
    let pedidoVentas = localStorage.getItem('itemPedido');
    let centros = localStorage.getItem('centroSeguimiento');
    const newBody = this.fRequestBody();

    const headers = new HttpHeaders().append(
      'Authorization', localStorage.getItem('token')
    );

    const body = {
      "RFC":"ZSD_10011",
      "INPUT":{
         "PEDIDO_VENTAS":pedidoVentas,
         "CENTRO":centros,
         "ALMACEN":almacen,
         "GV_LOTNO":"YGDE",
         "GV_BOKNO":"1",
         "CONTABILIZAR":"X",
         "GV_GUIA":"",
         "CUSTOMER_DATA":{
            "ZPATENTE":ZPATENTE,
            "ZNOTRACTOR":ZNOTRACTOR,
            "ZRUT":ZRUT,
            "ZCHOFER":ZCHOFER
         }
      },
      "TABLES":{
         "GT_PARTICION":
           newBody,
         
         "GT_UNID_MANIPULACION":[
            
         ],
         "IT_COMENTARIOS":[
            {
               "TDFORMAT":"",
               "TDLINE":TDLINE
            }
         ]
      }
   }
   return this.http.post<any>(this.urlRfc, body, {headers: headers})
   .pipe(map( (result:any = []) => {
    return result;
   }));  
  }

  public closeModal(modal){
    this.openModal = modal;
    this.route.navigate(['home']);
    //limpiar localStorage menos el token y el user
  }

}
