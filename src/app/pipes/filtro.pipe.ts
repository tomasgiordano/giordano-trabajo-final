import { UpperCasePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Turnos } from '../models/models.module';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(value: any[], arg: string,arg2:string,arg3?:string ): unknown {
    
    if(arg2== undefined)
    {
      arg2 = "";
      
    }
    console.info(value);
    const result = [];
        value.forEach(item =>{
              if(arg == "Profesional")
              {   
                
                if(item.profesional.apellido.toLowerCase().indexOf(arg2.toLowerCase()) > -1)
                {
                  result.push(item);
                }
              }
              else{
                if(arg == "Especialidad"){
                  if(item.especialidad.toLowerCase().indexOf(arg2.toLowerCase()) > -1)
                  {
                    result.push(item);
                  }
                }
                else
                {
                  if(arg == "Dia")
                  {
                    switch(arg2)
                    {
                      case "Lunes":
                        if(new Date(item.fecha).getDay() == 0)
                        {
                          result.push(item);
                        }
                        break;
                        case "Martes":
                          if(new Date(item.fecha).getDay() == 1)
                          {
                            result.push(item);
                          }
                        break;

                        case "Miércoles":
                          if(new Date(item.fecha).getDay() == 2)
                          {
                            result.push(item);
                          }
                        break;

                        case "Jueves":
                          if(new Date(item.fecha).getDay() == 3)
                          {
                            result.push(item);
                          }
                        break;

                        case "Viernes":
                          if(new Date(item.fecha).getDay() == 4)
                          {
                            result.push(item);
                          }
                        break;

                        case "Sábado":
                          if(new Date(item.fecha).getDay() == 5)
                          {
                            result.push(item);
                          }
                        break;
                    }
                  }
                  else
                  {
                    if(arg == "Paciente")
                    {
                      if(item.paciente.apellido.toLowerCase().indexOf(arg2.toLowerCase()) > -1)
                      {
                        result.push(item);
                      }       
                    }
                    else
                    {
                      if(arg == "Temperatura")
                      {
                        if(item.temperatura != undefined)
                        {
                          if(item.temperatura == arg2)
                          {
                            result.push(item);
                          }
                        }
                      }
                      else
                      { 
                        if(arg == "Adicionales")
                        {
                          if(item.datosAdicionales != undefined)
                          {
                            item.datosAdicionales.forEach(element => {
                              if(element.propiedad == arg3)
                              {
                                if(element.valor.toLowerCase().indexOf(arg2.toLowerCase()) > -1)
                                {
                                  result.push(item);
                                }
                              }});
                          }
                        }
                        else
                        {
                          result.push(item);

                        }
                      }
                    }     
                  }
                }  
              }
        })
  return result;
  }
}
