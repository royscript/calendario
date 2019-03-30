class Ajax{
	constructor(){
		
	}
	eliminarVentana(idPopup){
		$("#load_popup_"+idPopup).remove();
		console.log("Eliminando #load_popup_"+idPopup);
	}
	mostrarVentana(idPopup){
		var estilo = 'display: block; position: fixed; z-index: 99999999999999999999999999999999; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgb(0,0,0); background-color: rgba(0,0,0,0.4);';
		var estilo2 = 'margin: 15% auto; padding: 20px; width: 80%;';
		$("body").append('<div id="load_popup_'+idPopup+'" class="modal"  style="'+estilo+'">'
						  +'<div class="modal-content" style"'+estilo2+'">'
							+'<div class="windows8">'
								+'<div class="wBall" id="wBall_1">'
									+'<div class="wInnerBall"></div>'
								+'</div>'
								+'<div class="wBall" id="wBall_2">'
									+'<div class="wInnerBall"></div>'
								+'</div>'
								+'<div class="wBall" id="wBall_3">'
									+'<div class="wInnerBall"></div>'
								+'</div>'
								+'<div class="wBall" id="wBall_4">'
									+'<div class="wInnerBall"></div>'
								+'</div>'
								+'<div class="wBall" id="wBall_5">'
									+'<div class="wInnerBall"></div>'
								+'</div>'
							+'</div>'
						  +'</div>'
						+'</div>');
	}
	ocultarVentana(idPopup){
		//$("#load_popup_"+this.idPopup).css("display","none");
		this.eliminarVentana(idPopup);
	}
	enviar(parametros,url){
		var instanciaActual = this;
		var idPopup = parseInt(Math.round(Math.random() * (100 - 1) + 1));
		console.log("Ventana abierta id "+idPopup);
		var enviados = null;
		/*var a = $.confirm({
							title: 'Espere porfavor',
							content: '<div class="windows8" id="mensaje_error_ajax_calendario">'
										+'<div class="wBall" id="wBall_1">'
											+'<div class="wInnerBall"></div>'
										+'</div>'
										+'<div class="wBall" id="wBall_2">'
											+'<div class="wInnerBall"></div>'
										+'</div>'
										+'<div class="wBall" id="wBall_3">'
											+'<div class="wInnerBall"></div>'
										+'</div>'
										+'<div class="wBall" id="wBall_4">'
											+'<div class="wInnerBall"></div>'
										+'</div>'
										+'<div class="wBall" id="wBall_5">'
											+'<div class="wInnerBall"></div>'
										+'</div>'
									+'</div>',
							cancelButton: false, // hides the cancel button.
							confirmButton: false, // hides the confirm button.
							closeIcon: false, // hides the close icon.
							theme: 'black'
						}); */
		
		try{
			enviados = $.ajax({
							url: url,
							type:'POST',
							data:parametros,
							beforeSend: function(){/* mientras este sucediendo el evento sucederá lo siguiente*/
								//a.open();
								instanciaActual.mostrarVentana(idPopup);
							},
							error: function(XMLHttlRequest, textStatus, errorThrown){
								
								//a.close();
								//a.toggle(); // toggle open close.
								instanciaActual.ocultarVentana(idPopup);
								$.confirm({
									title: 'Espere porfavor',
									content: 'Error : '+errorThrown,
									theme: 'black'
								});
							}, /* Si sucede un error se llamará a la función callback_error*/
							complete: function(){
								//a.close();
								//a.toggle(); // toggle open close.
								instanciaActual.ocultarVentana(idPopup);
							}
						});
		}catch(ex){
			alert(ex);
		}
		return enviados;
	}
}
	
class calendario extends Ajax{
	constructor(){
		super();
		this.directorio = "controlador_calendario.php";
		this.fechaActual = "";
		this.esPrimeraVez = true;
		this.obtenerFechaActual();
		this.meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
		this.eventos;
		this.diaHoy = "";
		this.mesHoy = "";
		this.anoHoy = "";
	}
	mostrarDiaActual(){
		$("#dia_de_la_semana").val(this.diaHoy);
		$("#mes").val(this.mesHoy);
		$("#ano").val(this.anoHoy);
		this.mostrarCalendario();
	}
	siguienteDia(){
		var diaSeleccionado = parseInt($("#dia_de_la_semana").val());
		var mesSeleccionado = parseInt($("#mes").val());
		var anoSeleccionado = parseInt($("#ano").val());
		var cantidadDiaMesSeleccionado = $("#dia_de_la_semana")[0].length;
		var instanciaActual = this;
		if(diaSeleccionado<cantidadDiaMesSeleccionado){//Cambiar de día
			if(diaSeleccionado<9){
				$("#dia_de_la_semana").val("0"+(diaSeleccionado+1));
			}else{
				$("#dia_de_la_semana").val(diaSeleccionado+1);
			}
			instanciaActual.mostrarCalendario();
		}else{//Cambiar de mes
			if(mesSeleccionado<12){
				$("#mes").val(mesSeleccionado+1);
				var parametros = {
					'mes' : mesSeleccionado+1,
					'ano' : anoSeleccionado,
					'accion' : 'cantidadDiasDelMes'
				};
				var respuestaAjax = super.enviar(parametros,this.directorio);
				respuestaAjax.done(function( datos ) {	
					datos = JSON.parse(datos);
					var html = "";
					//--------Actualizaremos la cantidad de días del mes-----------------------
					for(var x=0;x<datos.length;x++){
						var numeroDia = "";
						if(datos[x].numero<10){
							numeroDia = "0"+datos[x].numero;
						}else{
							numeroDia = datos[x].numero;
						}
						if(numeroDia=="01"){
							html += '<option value="'+numeroDia+'" selected>'+datos[x].nombre+' '+numeroDia+' </option>';
						}else{
							html += '<option value="'+numeroDia+'">'+datos[x].nombre+' '+numeroDia+' </option>';
						}
					}
					$("#dia_de_la_semana").html(html);
					instanciaActual.mostrarCalendario();
				});
			}else{//Cambiar de año
				$("#dia_de_la_semana").val("01");
				$("#mes").val(1);
				$("#ano").val(anoSeleccionado+1);
				var parametros = {
					'mes' : "01",
					'ano' : anoSeleccionado+1,
					'accion' : 'cantidadDiasDelMes'
				};
				var respuestaAjax = super.enviar(parametros,this.directorio);
				respuestaAjax.done(function( datos ) {	
					datos = JSON.parse(datos);
					var html = "";
					//--------Actualizaremos la cantidad de días del mes-----------------------
					for(var x=0;x<datos.length;x++){
						var numeroDia = "";
						if(datos[x].numero<10){
							numeroDia = "0"+datos[x].numero;
						}else{
							numeroDia = datos[x].numero;
						}
						if(numeroDia=="01"){
							html += '<option value="'+numeroDia+'" selected>'+datos[x].nombre+' '+numeroDia+' </option>';
						}else{
							html += '<option value="'+numeroDia+'">'+datos[x].nombre+' '+numeroDia+' </option>';
						}
					}
					$("#dia_de_la_semana").html(html);
					instanciaActual.mostrarCalendario();
				});
			}
		}
	}
	anterior(){
		var diaSeleccionado = parseInt($("#dia_de_la_semana").val());
		var mesSeleccionado = parseInt($("#mes").val());
		var anoSeleccionado = parseInt($("#ano").val());
		var cantidadDiaMesSeleccionado = $("#dia_de_la_semana")[0].length;
		var instanciaActual = this;
		if(diaSeleccionado>1){//Cambiar de día
			if((diaSeleccionado-1)<10){
				$("#dia_de_la_semana").val("0"+(diaSeleccionado-1));
			}else{
				$("#dia_de_la_semana").val(diaSeleccionado-1);
			}
			instanciaActual.mostrarCalendario();
		}else{//Cambiar de mes
			if((mesSeleccionado-1)>=1){
				$("#mes").val(mesSeleccionado-1);
				var parametros = {
					'mes' : mesSeleccionado-1,
					'ano' : anoSeleccionado,
					'accion' : 'cantidadDiasDelMes'
				};
				var respuestaAjax = super.enviar(parametros,this.directorio);
				respuestaAjax.done(function( datos ) {	
					datos = JSON.parse(datos);
					var html = "";
					//--------Actualizaremos la cantidad de días del mes-----------------------
					for(var x=0;x<datos.length;x++){
						var numeroDia = "";
						if(datos[x].numero<10){
							numeroDia = "0"+datos[x].numero;
						}else{
							numeroDia = datos[x].numero;
						}
						if((x+1)==datos.length){
							html += '<option value="'+numeroDia+'" selected>'+datos[x].nombre+' '+numeroDia+' </option>';
						}else{
							html += '<option value="'+numeroDia+'">'+datos[x].nombre+' '+numeroDia+' </option>';
						}
					}
					$("#dia_de_la_semana").html(html);
					instanciaActual.mostrarCalendario();
				});
			}else{//Cambiar de año
				$("#mes").val(12);
				$("#ano").val(anoSeleccionado-1);
				var parametros = {
					'mes' : "12",
					'ano' : anoSeleccionado-1,
					'accion' : 'cantidadDiasDelMes'
				};
				var respuestaAjax = super.enviar(parametros,this.directorio);
				respuestaAjax.done(function( datos ) {	
					datos = JSON.parse(datos);
					var html = "";
					//--------Actualizaremos la cantidad de días del mes-----------------------
					for(var x=0;x<datos.length;x++){
						var numeroDia = "";
						if(datos[x].numero<10){
							numeroDia = "0"+datos[x].numero;
						}else{
							numeroDia = datos[x].numero;
						}
						if((x+1)==datos.length){
							html += '<option value="'+numeroDia+'" selected>'+datos[x].nombre+' '+numeroDia+' </option>';
						}else{
							html += '<option value="'+numeroDia+'">'+datos[x].nombre+' '+numeroDia+' </option>';
						}
					}
					$("#dia_de_la_semana").html(html);
					instanciaActual.mostrarCalendario();
				});
			}
		}
	}
	obtenerFechaActual(){
		var parametros = {
			'accion' : 'fecha_actual'
		};
		var instanciaActual = this;
		var respuestaAjax = super.enviar(parametros,this.directorio);
		respuestaAjax.done(function( datos ) {	
			datos = JSON.parse(datos);
			var html = "";
			html += '<select id="dia_de_la_semana" class="frm_dia comboboxCalendario" onchange="objetoCalendario.mostrarCalendario();">';
			for(var x=0;x<datos.nombreDiasDelMes.length;x++){
				var numeroDia = "";
				if(datos.nombreDiasDelMes[x].numero<10){
					numeroDia = "0"+datos.nombreDiasDelMes[x].numero;
				}else{
					numeroDia = datos.nombreDiasDelMes[x].numero;
				}
				if(numeroDia==datos.fecha_actual.dia){
					html += '<option value="'+numeroDia+'" selected>'+datos.nombreDiasDelMes[x].nombre+' '+numeroDia+' </option>';
				}else{
					html += '<option value="'+numeroDia+'">'+datos.nombreDiasDelMes[x].nombre+' '+numeroDia+' </option>';
				}
			}
			html += '</select>';
			
			html += '<select id="mes" onchange="objetoCalendario.mostrarCalendario();" class="frm_mes comboboxCalendario">';
			for(var x=0;x<instanciaActual.meses.length;x++){
				if((x+1)==datos.fecha_actual.mes){
					html += '<option value="'+(x+1)+'" selected>'+instanciaActual.meses[x]+'</option>';
				}else{
					html += '<option value="'+(x+1)+'">'+instanciaActual.meses[x]+'</option>';
				}
			}
			html += '</select>';
			
			
			html += '<select id="ano" onchange="objetoCalendario.mostrarCalendario();" class="frm_ano comboboxCalendario">';
			var anoActual = datos.fecha_actual.ano;
			for(var x=(parseInt(anoActual)-10);x<parseInt(anoActual);x++){
				html += '<option value="'+x+'">'+x+'</option>';
			}
			for(var x=anoActual;x<(parseInt(anoActual)+10);x++){
				if(x==anoActual){
					html += '<option value="'+x+'" selected>'+x+'</option>';
				}else{
					html += '<option value="'+x+'">'+x+'</option>';	
				}
			}
			if(instanciaActual.esPrimeraVez==true){
				instanciaActual.esPrimeraVez = false;
				instanciaActual.diaHoy = datos.fecha_actual.dia;
				instanciaActual.mesHoy = parseInt(datos.fecha_actual.mes);
				instanciaActual.anoHoy = datos.fecha_actual.ano;
			}
			html += '</select>';
			$("#formulario-calendario").html(""+html+"<br><button class='botonCalendario izquierda' onClick='objetoCalendario.anterior();'>Ant</button><button class='botonCalendario izquierda' onClick='objetoCalendario.siguienteDia();'>Sig</button><button class='botonCalendario izquierda' style='margin-left: 10px;' onClick='objetoCalendario.mostrarDiaActual();'>Hoy</button><button class='botonCalendario derecha' onClick='objetoCalendario.mostrarCalendario();'>Día</button><button class='botonCalendario derecha'>Semana</button><button class='botonCalendario derecha'>Mes</button><button class='botonCalendario derecha' style='margin-right: 10px;' id='boton_confirmar_servicios' onclick='objetoConfirmar.mantenedor();'>Confirmar <span class='badge badge-secondary badge-pill' id='indicador_pendientes_confirmar'>0</span></button><br>");
			instanciaActual.mostrarCalendario();
		});
	}
	
	
	mostrarCalendario(){
		objetoConfirmar.indicadorPendientes();
		var parametros = {
			'mes' : $("#mes").val(),
			'dia_de_la_semana' : $("#dia_de_la_semana").val(),
			'ano' : $("#ano").val(),
			'accion' : 'mostrar'
		};
		var instanciaActual = this;
		var respuestaAjax = super.enviar(parametros,this.directorio);
		respuestaAjax.done(function( datos ) {	
			datos = JSON.parse(datos);
			var html = "";
			//--------Actualizaremos la cantidad de días del mes-----------------------
			for(var x=0;x<datos.nombreDiasDelMes.length;x++){
				var numeroDia = "";
				if(datos.nombreDiasDelMes[x].numero<10){
					numeroDia = "0"+datos.nombreDiasDelMes[x].numero;
				}else{
					numeroDia = datos.nombreDiasDelMes[x].numero;
				}
				if(numeroDia==$("#dia_de_la_semana").val()){
					html += '<option value="'+numeroDia+'" selected>'+datos.nombreDiasDelMes[x].nombre+' '+numeroDia+' </option>';
				}else{
					html += '<option value="'+numeroDia+'">'+datos.nombreDiasDelMes[x].nombre+' '+numeroDia+' </option>';
				}
			}
			$("#dia_de_la_semana").html(html);
			
			html = "";
			//-------Dibujaremos el calendario-----------------------
			html += "<table id='tabla-calendario'>";
			html +=  "<thead>";
			html +=  	"<tr>";
			html += 	 "<th class='division' style='width:91px;'></th>";
			var porcentaje_ancho_columnas = "style='width: "+(95 / parseInt(datos.rutas.length))+"%;'";
			for(var x=0;x<datos.rutas.length;x++){
				html += 	"<th class='division' "+porcentaje_ancho_columnas+">";
				html += 		datos.rutas[x].nombre;
				html += 	"</th>";
			}
			html +=  	"</tr>";
			html +=  "</thead>";
			html += instanciaActual.mostrarTablaHorarios(datos.rutas,porcentaje_ancho_columnas);
			html += "</table>";
			$("#calendario").html(html);
			instanciaActual.colorearCuadroActividad(datos.rutas);
		});
	}
	mostrarTablaHorarios(Rutas,porcentaje_ancho_columnas){
		var html = "<tbody>";
		var hora = "";
		var minutos = "";
		var horario = "";
		
		var hora_numero = 0, minutos_numero = 0;
		for(var x=0;x<24;x++){
			hora_numero = x;
			if(x<10){
				hora = "0"+x;
			}else{
				hora = x;
			}
			for(var i=0;i<=59;i++){
				minutos_numero = i;
				if(i<10){
					horario = hora+':0'+i+':00';
					minutos = ':0'+i;
				}else{
					horario = hora+':'+i+':00';
					minutos = i;
				}
				
				if(i==0){
					html += "<tr class='pintar-fila'>";
					html += 	"<td style='width:90px;'>"+horario+"</td>";
				}else if(i==30){
					html += "<tr class='pintar-fila'>";
					html += 	"<td style='width:90px;'>"+horario+"</td>";
				}else{
					if(horario=="23:59:00"){
						html += "<tr class='no-pintar-fila'>";
						html += 	"<td style='width:90px;'>23:59:00</td>";
					}else{
						html += "<tr class='no-pintar-fila'>";
						html += 	"<td style='width:90px;'></td>";
					}
				}
				
				//rowspan=""
				
				for(var c=0;c<Rutas.length;c++){
					html += 	"<td class='"+horario.replace(/:/gi, "")+"-"+Rutas[c].id+"'  "+porcentaje_ancho_columnas+" ondblclick='objetoCalendario.mostrarHorarioDesocupado("+hora_numero+","+minutos_numero+","+Rutas[c].id+");'></td>";
				}
				html += "</tr>";
			}
			
		}
		return html += "</tbody>";
	}
	
	colorearCuadroActividad(Rutas){
		this.eventos = Rutas;
		for(var d=0;d<Rutas.length;d++){
			var rutaSeleccionada = Rutas[d].actividades;
			//console.log(rutaSeleccionada);
			if(rutaSeleccionada.length>0){
				for(var r=0;r<rutaSeleccionada.length;r++){
						var html = "";
					
						html += "<strong>"+rutaSeleccionada[r].hora_inicio+":"+rutaSeleccionada[r].minutos_inicio+":"+rutaSeleccionada[r].segundos_inicio+" - "+rutaSeleccionada[r].hora_termino+":"+rutaSeleccionada[r].minutos_termino+":"+rutaSeleccionada[r].segundos_termino+"</strong> ";
						html += " <strong style='float: right;'>#"+rutaSeleccionada[r].id+"</strong><br>"+rutaSeleccionada[r].cliente+", dirección "+rutaSeleccionada[r].direccion;
						html += "<br><button onclick='objetoCalendario.confirmar("+rutaSeleccionada[r].id+");' style='margin-bottom: 5px;'>Confirmar</button>";
						html += "  <button onclick='objetoCalendario.intercambioDeActividades("+rutaSeleccionada[r].id+");' style='margin-bottom: 5px;'>Intercambiar  actividades</button>";
						html += "  <button onclick='objetoCalendario.reAgendarActividad("+rutaSeleccionada[r].id+","+Rutas[d].id+","+'"'+rutaSeleccionada[r].fecha+'"'+");' style='margin-bottom: 5px;'>Re-Agendar</button>";
						html += "  <button onclick='objetoCalendario.reAgendarActividad("+rutaSeleccionada[r].id+","+Rutas[d].id+","+'"'+rutaSeleccionada[r].fecha+'"'+");' style='margin-bottom: 5px;'>Ajustar Tiempo</button>";
						var hora = "";
						var minutos = "";
						var horario = "";
						var detener_rowspan = rutaSeleccionada[r].total_minutos+1;
						var blagBorrar  = false;
					    var hora_termino = "";
					    var minutosTermino = "";
						var hora_comienzo = "";
						var minutos_comienzo = "";
						//console.log("if"+rutaSeleccionada[r].hora_falsa_de_termino+"==? && "+rutaSeleccionada[r].hora_falsa_comienzo+"==?");
						if(rutaSeleccionada[r].hora_falsa_de_termino==true && rutaSeleccionada[r].hora_falsa_comienzo==false){//Si es verdadero agregamos la hora maxima de termino del día
							hora_comienzo = rutaSeleccionada[r].hora_inicio;
							minutos_comienzo = rutaSeleccionada[r].minutos_inicio;
							hora_termino = 23;
							minutosTermino = 59;
							//console.log(hora_comienzo+":"+minutos_comienzo+" - "+hora_termino+":"+minutosTermino);
						}else if(rutaSeleccionada[r].hora_falsa_de_termino==false && rutaSeleccionada[r].hora_falsa_comienzo==true){
							hora_comienzo = "00";
							minutos_comienzo = "00";
							hora_termino = rutaSeleccionada[r].hora_termino;
							minutosTermino = rutaSeleccionada[r].minutos_termino;
							//console.log(hora_comienzo+":"+minutos_comienzo+" - "+hora_termino+":"+minutosTermino);
						}else{
							hora_comienzo = rutaSeleccionada[r].hora_inicio;
							minutos_comienzo = rutaSeleccionada[r].minutos_inicio;
							hora_termino = rutaSeleccionada[r].hora_termino;
							minutosTermino = rutaSeleccionada[r].minutos_termino;
							//console.log(hora_comienzo+":"+minutos_comienzo+" - "+hora_termino+":"+minutosTermino);
						}
						for(var x=hora_comienzo;x<=hora_termino;x++){
							//console.log("Contexto "+rutaSeleccionada[r].cliente);
							if(x<10){
								hora = "0"+x;
							}else{
								hora = x;
							}
							for(var i=0;i<=59;i++){
								if(i<10){
									horario = hora+'0'+i+'00';
									minutos = '0'+i;
								}else{
									horario = hora+''+i+'00';
									minutos = i;
								}
								if(
									(hora_comienzo==hora && minutos_comienzo==minutos)
								){
									
									$("."+horario+"-"+Rutas[d].id+"").attr("rowspan",detener_rowspan);
									$("."+horario+"-"+Rutas[d].id+"").attr("id",rutaSeleccionada[r].id);
									$("."+horario+"-"+Rutas[d].id+"").removeAttr("ondblclick");
									$("."+horario+"-"+Rutas[d].id+"").attr("class",rutaSeleccionada[r].estado);
									
									//console.log("Iniciando rowspan en "+horario+" "+Rutas[d].nombre);
									blagBorrar = true;
								}else if(
									(hora_termino==hora && minutosTermino==minutos)
								){
									$("."+horario+"-"+Rutas[d].id+"").remove();
									i = 60;
									//console.log("Eliminando "+horario+" "+Rutas[d].nombre);
									blagBorrar = false;
								}else if(blagBorrar == true){
									$("."+horario+"-"+Rutas[d].id+"").remove();
									//console.log("Eliminando "+horario+" "+Rutas[d].nombre);		
								}
							}
							
						}
					$("#"+rutaSeleccionada[r].id).html(html);
				}
			}
		}
	}
	obtenerDatosServicio(id){
		for(var x=0;x<this.eventos.length;x++){
			for(var i=0;i<this.eventos[x].actividades.length;i++){
				if(this.eventos[x].actividades[i].id==id){
					return this.eventos[x].actividades[i];
				}
			}
		}
	}
	
	verificarQueLaHoraEsteEnElRango(hora_rango_menor,minutos_rango_menor,hora_rango_mayor,minutos_rango_mayor,hora_a_probar,minutos_a_probar){
		var hora_inicio = parseInt((parseInt(hora_rango_menor) * 60) + parseInt(minutos_rango_menor));
		var hora_final = parseInt((parseInt(hora_rango_mayor) * 60) + parseInt(minutos_rango_mayor));
		var hora_probar = parseInt((parseInt(hora_a_probar) * 60) + parseInt(minutos_a_probar));
		if(hora_probar>=hora_inicio){
			if(hora_probar<=hora_final){
				return true;
			}else{
				return false;
			}
		}else{
			return false;
		}
	}
	
	esMayorEstaHoraQueLaOtra(hora_mayor,minutos_mayor,hora_menor,minutos_menor){
		var mayor = parseInt((parseInt(hora_mayor) * 60) + parseInt(minutos_mayor));
		var menor = parseInt((parseInt(hora_menor) * 60) + parseInt(minutos_menor));
		if(mayor>menor){
			return true;
		}else{
			return false;
		}
	}
	
	mostrarHorarioDesocupado(hora_desocupada,minutos_desocupados,id_ruta){
		var hora = "";
		var minutos = "";
		
		
		//Explorar hacia arriba
		var hora_limite_superior = "";
		var minutos_limite_superior = "";
		for(var x=parseInt(hora_desocupada);x>=0;x--){//Recorremos desde la hora seleccionada hasta las 00 horas de la noche
			for(var i=parseInt(minutos_desocupados);i>=0;i--){//Recorremos desde los minutos seleccionados hasta el minuto cero
				if(x<10){
					hora = "0"+x;
				}else{
					hora = x;
				}
				if(i<10){
					minutos = "0"+i;
				}else{
					minutos = i;
				}
				if ( $("."+hora+""+minutos+"00-"+id_ruta).length ) {//Preguntamos si existe el id de la hora
				  //Si existe lo almacenamos como limite superior
				  hora_limite_superior = hora;
				  minutos_limite_superior = minutos;
				}else{
				  //Si no existe es porque llegamos a un tope y debemos detener los ciclos
				  x = 0;
				  i = 0;
				}
			}
		}
		
		hora = "";
		minutos = "";
		//Explorar hacia abajo
		var hora_limite_inferior = "";
		var minutos_limite_inferior = "";
		for(var x=parseInt(hora_desocupada);x<=23;x++){//Recorremos desde la hora seleccionada hasta las 23:59;00 que se acaba el día
			for(var i=parseInt(minutos_desocupados);i<=59;i++){//Recorremos desde los minutos seleccionados hasta terminar los minutos
				if(x<10){
					hora = "0"+x;
				}else{
					hora = x;
				}
				if(i<10){
					minutos = "0"+i;
				}else{
					minutos = i;
				}
				if ( $("."+hora+""+minutos+"00-"+id_ruta).length ) {//Preguntamos si existe el id de la hora
				  //Si existe lo almacenamos como limite superior
				  hora_limite_inferior = hora;
				  minutos_limite_inferior = minutos;
				}else{
				  //Si no existe es porque llegamos a un tope y debemos detener los ciclos
				  x = 23;
				  i = 59;
				}
			}
		}
		var html = "<table style='width:100%; text-align: left;'>";
		
		html += 	"<tr>";
		html += 		"<td>";
		html += 			"<strong>Rango Inicio: </strong>"+hora_limite_superior+":"+minutos_limite_superior+":00";
		html += 		"</td>";
		html += 		"<td>";
		html += 			"<strong>Rango Final: </strong>"+hora_limite_inferior+":"+minutos_limite_inferior+":00";
		html += 		"</td>";
		html += 	"</tr>";
		
		html += "</html>";
		var instanciaActual = this;
		$.confirm({
			title: 'Horario desocupado',
			content: html,
			type: 'blue',
			typeAnimated: true,
			buttons: {
				agendarNuevaActividad: {
					text: 'Agendar nueva actividad',
					btnClass: 'btn-blue',
					action: function(){
						instanciaActual.agendarNuevaActividad(hora_limite_superior,minutos_limite_superior,hora_limite_inferior,minutos_limite_inferior);
					}
				},
				traerActividad: {
					text: 'Traer actividad',
					btnClass: 'btn-red',
					action: function(){
						instanciaActual.traerActividad(hora_limite_superior,minutos_limite_superior,hora_limite_inferior,minutos_limite_inferior);
					}
				},
				cancelar: function () {
					
				}
			}
		});
	}
	
	mostrarInformacionActividadPopUp(id){
		var evento = this.obtenerDatosServicio(id);
		var html = 	"<tr>";
			html += 		"<td>";
			html += 			"<strong>Cliente : </strong>"+evento.cliente;
			html += 		"</td>";
			html += 		"<td>";
			html += 			"<strong>Fecha del servicio : </strong>"+evento.fecha;
			html += 		"</td>";
			html += 	"</tr>";

			html += 	"<tr>";
			html += 		"<td>";
			html += 			"<strong>Tipo de Cliente : </strong>"+evento.tipo_cliente;
			html += 		"</td>";
			html += 		"<td>";
			html += 			"<strong>Nº Servicio : </strong>"+evento.numero_servicio;
			html += 		"</td>";
			html += 	"</tr>";

			html += 	"<tr>";
			html += 		"<td>";
			html += 			"<strong>Rut : </strong>"+evento.rut;
			html += 		"</td>";
			html += 		"<td>";
			html += 			"<strong>Horario de servicio : </strong>"+evento.hora_inicio+":"+evento.minutos_inicio+":"+evento.segundos_inicio+" - "+evento.hora_termino+":"+evento.minutos_termino+":"+evento.segundos_termino;
			html += 		"</td>";
			html += 	"</tr>";


			html += 	"<tr>";
			html += 		"<td>";
			html += 			"<strong>Dirección : </strong>"+evento.direccion;
			html += 		"</td>";
			html += 		"<td>";
			html += 			"<strong>Id Actividad : </strong>"+evento.id;
			html += 		"</td>";
			html += 	"</tr>";
		
			html += 	"<tr>";
			html += 		"<td colspan='2'>";
			html += 			"<strong>Rutas asociadas a al servicio : 1</strong>";
			html += 		"</td>";
			html += 	"</tr>";

			html += 	"<tr>";
			html += 		"<td colspan='2'>";
			html += 			"<br>";
			html += 		"</td>";
			html += 	"</tr>";

			html += 	"<tr>";
			html += 		"<td colspan='2'>";
			html += 			"<strong>Servicios a ejecutar : </strong> ";
			for(var c=0;c<evento.servicios.length;c++){
				if((c+1)==evento.servicios.length){
					html += evento.servicios[c]+".";
				}else{
					html += evento.servicios[c]+", ";
				}
			}
			html += 		"</td>";
			html += 	"</tr>";
		
			html += 	"<tr>";
			html += 		"<td colspan='2'>";
			html +=				"<table class='tabla_confirmar'>";
			html += 			"<thead>";
			html += 				"<tr>";
			html += 				"<th colspan='6' style='text-align: center;'>CONTACTO</th>";
			html += 				"</tr>";
			html += 				"<tr>";
			html += 					"<th>Nombre</th>";
			html += 					"<th>Email</th>";
			html += 					"<th>Fono</th>";
			html += 					"<th>Celular</th>";
			html += 					"<th>Referencia</th>";
			html += 					"<th>¿Recive email?</th>";
			html += 				"</tr>";
			html += 			"</thead>";
			html += 			"<tbody>";
			for(var c=0;c<evento.contacto.length;c++){
			html += 				"<tr>";
			html += 					"<td>"+evento.contacto[c].nombre+"</td>";
			html += 					"<td>"+evento.contacto[c].email+"</td>";
			html += 					"<td>"+evento.contacto[c].fono+"</td>";
			html += 					"<td>"+evento.contacto[c].celular+"</td>";
			html += 					"<td>"+evento.contacto[c].referencia+"</td>";
			html += 					"<td>"+evento.contacto[c].recibe_informacion+"</td>";
			html += 				"</tr>";
			}
			html += 			"</tbody>";
			html +=				"</table><br>";
			html += 		"</td>";
			html += 	"</tr>";
		return html;
	}
	
	confirmar(id){
		var html = "<table style='width:100%; text-align: left;'>";
		html += this.mostrarInformacionActividadPopUp(id);
		html += "</html>";
		$.confirm({
			title: 'Confirmar',
			content: html,
			type: 'blue',
			typeAnimated: true,
			buttons: {
				confirmar: {
					text: 'Confirmar',
					btnClass: 'btn-blue',
					action: function(){
					}
				},
				anularServicio: {
					text: 'Anular Servicio',
					btnClass: 'btn-red',
					action: function(){
					}
				},
				reAgendar: {
					text: 'Re-Agendar',
					btnClass: 'btn-green',
					action: function(){
					}
				},
				cerrar: function () {
				}
			}
		});
	}
	
	intercambioDeActividades(id){
		var html = "El intercambio de actividades permite cambiar el lugar de una actividad por otra actividad agendada, intercambiándose ambas su duración.";
		html += "<table style='width:100%; text-align: left;'>";
		html += this.mostrarInformacionActividadPopUp(id);		
		html += 	"<tr>";
		html += 		"<td colspan='2'>";
		html += 			"<strong>Ingrese el Id de la Actividad a intercambiar : </strong><input type='text' id='id_actividad_para_intercambio' value=''><button onClick='objetoCalendario.previsualizarActividadParaIntercambiar();'>Mostrar Actividad</button>";
		html += 		"</td>";
		html += 	"</tr>";
		
		
		html += 	"<tr>";
		html += 		"<td colspan='2' id='espacio_previsualizacion_actividad_a_intercambiar'  style='border: solid #e74c3c;'>";
		html += 		"</td>";
		html += 	"</tr>";
		
		html += "</html>";
		var instanciaActual = this;
		$.confirm({
			title: 'Intercambiar actividades',
			content: html,
			type: 'red',
			typeAnimated: true,
			buttons: {
				tryAgain: {
					text: 'Realizar intercambio',
					btnClass: 'btn-red',
					action: function(){
						var id_evento_intercambio = $("#id_actividad_para_intercambio").val();
						if(id_evento_intercambio==""){
							alert("Ingrese un id de actividad");
							return false;
						}
						instanciaActual.realizarIntercambio(id,id_evento_intercambio);
					}
				},
				cancelar: function () {
				}
			}
		});
	}
	previsualizarActividadParaIntercambiar(){
		var id = $("#id_actividad_para_intercambio").val();
		var parametros = {
			'id_evento' : id,
			'accion' : 'previsualizarActividadParaIntercambiar'
		};
		var instanciaActual = this;
		var respuestaAjax = super.enviar(parametros,this.directorio);
		respuestaAjax.done(function( datos ) {
			datos = JSON.parse(datos)[0];
			var html = "";
			html += "<strong>Cliente : </strong>"+datos.Cliente;
			html += "<br><strong>Hora y fecha : </strong>"+datos.fecha+", "+datos.horario;
			html += "<br><strong>Dirección : </strong>"+datos.direccion;
			html += "<br><strong>Rut : </strong>"+datos.rut;
			html += "<br><strong>Servicios a ejecutar : </strong> ";
			for(var c=0;c<datos.servicios.length;c++){
				if((c+1)==datos.servicios.length){
					html += datos.servicios[c]+".";
				}else{
					html += datos.servicios[c]+", ";
				}
			}
			$("#espacio_previsualizacion_actividad_a_intercambiar").html(html);
		});
	}
	realizarIntercambio(id_evento_actual,id_evento_intercambio){
		var parametros = {
			'id_evento_actual' : id_evento_actual,
			'id_evento_intercambio' : id_evento_intercambio,
			'accion' : 'realizarIntercambio'
		};
		var instanciaActual = this;
		var respuestaAjax = super.enviar(parametros,this.directorio);
		respuestaAjax.done(function( datos ) {
			datos = JSON.parse(datos);
			if(datos.respuesta=="ok"){
				instanciaActual.mostrarCalendario();
			}else{
				alert("Error : Intente nuevamente.");
			}
		});
	}
	verificarSiLaRutaPerteneceALaActividad(id_actividad,actividad){
		for(var x=0;x<actividad.rutas.length;x++){
			if(id_actividad==actividad.rutas[x].id){
				return true;
			}
		}
		return false;
	}
	reAgendarActividad(id_evento,id_ruta,fecha){
		var html = "";
		html += "<table style='width:100%; text-align: left;'>";
		html += this.mostrarInformacionActividadPopUp(id_evento);
		
		html += 	"<tr>";
		html += 		"<td colspan='2'>";
		html += 			"<strong>Motivo :  </strong> <input type='text' style='width: 50%;' id='motivo_reagendar' value=''> ";
		html += 		"</td>";
		html += 	"</tr>";

		html += 	"<tr>";
		html += 		"<td>";
		html += 			"<h4 id='horario-seleccionado-re-agendar'>Horario Seleccionado : </h4><input type='hidden' id='fecha_reagendar' value=''><input type='hidden' id='hora_inicio_reagendar' value=''><input type='hidden' id='hora_final_reagendar' value=''><input type='hidden' id='rutas_reagendar' value=''>";
		html += 		"</td>";
		html += 		"<td>";
		
		var actividad = this.obtenerDatosServicio(id_evento);
		if(actividad.rutas.length>1){
			html += 			"<h3>Ruta : ("+actividad.rutas.length+")<br>";
			
			for(var i=0;i<this.eventos.length;i++){
				if(this.verificarSiLaRutaPerteneceALaActividad(this.eventos[i].id,actividad)==true){
					html += '<input type="checkbox" name="ruta-del-servicio-re-agendar" value="'+this.eventos[i].id+'" checked> '+this.eventos[i].nombre+'<br>';
				}else{
					html += '<input type="checkbox" name="ruta-del-servicio-re-agendar" value="'+this.eventos[i].id+'"> '+this.eventos[i].nombre+'<br>';
				}
			}
			html += '<button onclick="objetoCalendario.mostrarHorariosPreferidosYnoPorCliente('+id_evento+','+"'"+fecha+"'"+');">Buscar</button>';
			
		}else{
			html += 			"<h3>Ruta : ";
			html += '<select id="ruta-del-servicio-re-agendar" class="frm_mes comboboxCalendario" onchange="objetoCalendario.mostrarHorariosPreferidosYnoPorCliente('+id_evento+','+"'"+fecha+"'"+');">';
			for(var x=0;x<this.eventos.length;x++){
				if(id_ruta==this.eventos[x].id){
					html += '<option value="'+this.eventos[x].id+'" selected>'+this.eventos[x].nombre+'</option>';
				}else{
					html += '<option value="'+this.eventos[x].id+'">'+this.eventos[x].nombre+'</option>';
				}

			}
			html += "</h3>";
		}
		html += "</h3>";
		
		html += 		"</td>";
		html += 	"</tr>";
		
		html += 	"<tr>";
		html += 		"<td colspan='2'>";
		html += 			"<h3>Seleccione la hora que mejor le acomode : </h3>";
		html += 		"</td>";
		html += 	"</tr>";
		
		html += 	"<tr>";
		html += 		"<td>";
		
		html += 			"<table class='tabla_confirmar' id='tabla-horarios-preferidos'  style='max-width: 500px;'>";
		html += 				"<thead>";
		html += 					"<tr>";
		html += 						"<th colspan='3' style='text-align:center;'>HORARIOS PREFERIDOS POR EL CLIENTE</th>";
		html += 					"</tr>";
		html += 					"<tr>";
		html += 						"<th>Fecha</th>";
		html += 						"<th>Horas</th>";
		html += 						"<th>Acción</th>";
		html += 					"</tr>";
		html += 				"</thead>";
		html += 				"<tbody>";
		
		html += 				"</tbody>";
		html += 			"</table>";
		
		
		html += 		"</td>";
		
		
		html += 		"<td>";
		
		html += 			"<table class='tabla_confirmar' id='tabla-horarios-no-preferidos'  style='max-width: 500px;'>";
		html += 				"<thead>";
		html += 					"<tr>";
		html += 						"<th colspan='3' style='text-align:center;'>HORARIOS NO PREFERIDOS</th>";
		html += 					"</tr>";
		html += 					"<tr>";
		html += 						"<th>Fecha</th>";
		html += 						"<th>Horas</th>";
		html += 						"<th>Acción</th>";
		html += 					"</tr>";
		html += 				"</thead>";
		html += 				"<tbody>";
		
		html += 				"</tbody>";
		html += 			"</table>";
		
		
		html += 		"</td>";
		html += 	"</tr>";
		
	
		
		
		
		html += "</html>";
		var instanciaActual = this;
		$.confirm({
			title: 'Re-Agendar Actividad mes de <strong>"Marzo"</strong>',
			content: html,
			type: 'red',
			typeAnimated: true,
			buttons: {
				tryAgain: {
					text: 'Re-Agendar',
					btnClass: 'btn-red',
					action: function(){
						var fecha_reagendar = $("#fecha_reagendar").val();
						var hora_inicio_reagendar = $("#hora_inicio_reagendar").val();
						var hora_final_reagendar = $("#hora_final_reagendar").val();
						var observacion = $("#motivo_reagendar").val();
						var rutas_reagendar = $("#rutas_reagendar").val();
						if(fecha_reagendar==""){
							alert("Debe seleccionar una fecha");
							return false;
						}
						if(observacion==""){
							alert("Debe de poner una observacion");
							return false;
						}
						instanciaActual.reagendar(id_evento,id_ruta,fecha_reagendar,hora_inicio_reagendar,hora_final_reagendar,observacion,rutas_reagendar);
					}
				},
				cancelar: function () {
				}
			}
		});
		setTimeout(function(){ 
				objetoCalendario.mostrarHorariosPreferidosYnoPorCliente(id_evento,id_ruta,fecha);
		}, 1000);
	}
	
	mostrarHorariosPreferidosYnoPorCliente(id_actividad,fecha){
		var actividad = this.obtenerDatosServicio(id_actividad);
		var rutasDelEvento = new Array();
		if(actividad.rutas.length>1){
			//ruta-del-servicio-re-agendar
			$('input:checkbox[name=ruta-del-servicio-re-agendar]:checked').each(
				function() {
					console.log("El checkbox con valor " + $(this).val() + " está seleccionado");
					rutasDelEvento.push({
						id : $(this).val()
					});
				}
			);
			if(rutasDelEvento.length!=actividad.rutas.length){
				alert("Debe seleccionar "+actividad.rutas.length+" rutas.");
				return false;
			}
		}else{
			rutasDelEvento.push({
				id : $("#ruta-del-servicio-re-agendar").val()
			});
		}
		var parametros = {
			'id_actividad' : id_actividad,
			'fecha' : fecha,
			'rutas_seleccionadas' : rutasDelEvento,
			'accion' : 'mostrarHorariosPreferidosYnoPorCliente'
		};
		var instanciaActual = this;
		var respuestaAjax = super.enviar(parametros,this.directorio);
		respuestaAjax.done(function( datos ) {	
			datos = JSON.parse(datos);
			var html_preferidos = "";
			var evento_select = "";
			for(var x=0;x<datos.horarios_preferidos.length;x++){
				html_preferidos += "<tr>";
				html_preferidos += "<td>"+datos.horarios_preferidos[x].fecha+"</td>";
				html_preferidos += "<td>"+datos.horarios_preferidos[x].hora_inicio+" - "+datos.horarios_preferidos[x].hora_final+"</td>";
				evento_select = '"'+datos.horarios_preferidos[x].fecha+'","'+datos.horarios_preferidos[x].hora_inicio+'","'+datos.horarios_preferidos[x].hora_final+'","'+datos.horarios_preferidos[x].fecha_sin_formato+'",'+datos.horarios_preferidos[x].rutas;
				html_preferidos += "<td><button onclick='objetoCalendario.seleccionarFechaParaCambiar("+evento_select+")'>Seleccionar</button></td>";
				html_preferidos += "</tr>";
			}
			$("#tabla-horarios-preferidos tbody").html(html_preferidos);
			var html_no_preferidos = "";
			for(var x=0;x<datos.horarios_no_preferidos.length;x++){
				html_no_preferidos += "<tr>";
				html_no_preferidos += "<td>"+datos.horarios_no_preferidos[x].fecha+"</td>";
				html_no_preferidos += "<td>"+datos.horarios_no_preferidos[x].hora_inicio+" - "+datos.horarios_no_preferidos[x].hora_final+"</td>";
				evento_select = '"'+datos.horarios_no_preferidos[x].fecha+'","'+datos.horarios_no_preferidos[x].hora_inicio+'","'+datos.horarios_no_preferidos[x].hora_final+'","'+datos.horarios_no_preferidos[x].fecha_sin_formato+'",'+datos.horarios_no_preferidos[x].rutas;
				html_no_preferidos += "<td><button onclick='objetoCalendario.seleccionarFechaParaCambiar("+evento_select+")'>Seleccionar</button></td>";
				html_no_preferidos += "</tr>";
			}
			$("#tabla-horarios-no-preferidos tbody").html(html_no_preferidos);
		});
	}
	
	seleccionarFechaParaCambiar(fecha, hora_inicio, hora_final, fecha_sin_formato, rutas){
		$("#horario-seleccionado-re-agendar").html("Horario seleccionado : "+fecha+" entre las "+hora_inicio+" y las "+hora_final);
		$("#fecha_reagendar").val(fecha_sin_formato);
		$("#hora_inicio_reagendar").val(hora_inicio);
		$("#hora_final_reagendar").val(hora_final);
		$("#rutas_reagendar").val(rutas);
	}
	
	reagendar(id_evento,id_ruta,fecha_reagendar,hora_inicio_reagendar,hora_final_reagendar,observacion,rutas_reagendar){
		var parametros = {
			'id_evento' : id_evento,
			'id_ruta' : id_ruta,
			'fecha_reagendar' : fecha_reagendar,
			'hora_inicio_reagendar' : hora_inicio_reagendar,
			'hora_final_reagendar' : hora_final_reagendar,
			'observacion' : observacion,
			'rutas_reagendar' : rutas_reagendar,
			'accion' : 'reagendar'
		};
		var instanciaActual = this;
		var respuestaAjax = super.enviar(parametros,this.directorio);
		respuestaAjax.done(function( datos ) {
			datos = JSON.parse(datos);
			if(datos.respuesta=="ok"){
				instanciaActual.mostrarCalendario();
			}else{
				alert("Error : Intente nuevamente.");
			}
		});
	}
	
	
	traerActividad(hora_limite_superior,minutos_limite_superior,hora_limite_inferior,minutos_limite_inferior){
		var html = "";
		html += "<table style='width:100%; text-align: left;'>";	
		html += 	"<tr>";
		html += 		"<td colspan='2'>";
		html += 			"<strong>Ingrese el Id de la Actividad para traer : </strong><input type='text' id='id_actividad_para_intercambio' value=''><button onClick='objetoCalendario.previsualizarActividadParaIntercambiar();'>Mostrar Actividad</button>";
		html += 		"</td>";
		html += 	"</tr>";
		
		html += 	"<tr>";
		html += 		"<td colspan='2'>";
		html += 			"<h3>Ingrese el rango de horas : </h3>";
		html += 		"</td>";
		html += 	"</tr>";
		
		html += 	"<tr>";
		html += 		"<td>";
		html += 			"<strong>Rango Inicio: (Mínimo "+hora_limite_superior+":"+minutos_limite_superior+":00)</strong> <input type='text' id='hora_inicio_espacio_desocupado' class='tiempo' value='"+hora_limite_superior+":"+minutos_limite_superior+":00'> ";
		html += 		"</td>";
		html += 		"<td>";
		html += 			"<strong>Rango Final: (Máximo "+hora_limite_inferior+":"+minutos_limite_inferior+":00)</strong> <input type='text' id='hora_termino_espacio_desocupado' class='tiempo' value='"+hora_limite_inferior+":"+minutos_limite_inferior+":00'> ";
		html += 		"</td>";
		html += 	"</tr>";
		
		html += 	"<tr>";
		html += 		"<td colspan='2' id='espacio_previsualizacion_actividad_a_intercambiar'  style='border: solid #e74c3c;'>";
		html += 		"</td>";
		html += 	"</tr>";
		
		html += "</html>";
		var instanciaActual = this;
		$.confirm({
			title: 'Traer Actividad',
			content: html,
			type: 'red',
			typeAnimated: true,
			buttons: {
				tryAgain: {
					text: 'Traer Actividad',
					btnClass: 'btn-red',
					action: function(){
						var tiempoInicio = $("#hora_inicio_espacio_desocupado").val();
						var tiempoFinal = $("#hora_termino_espacio_desocupado").val();
						tiempoInicio = tiempoInicio.split(":");
						tiempoFinal = tiempoFinal.split(":");
						var hora_inicio = parseInt(tiempoInicio[0]);
						var minutos_inicio = parseInt(tiempoInicio[1]);
						var hora_final = parseInt(tiempoFinal[0]);
						var minutos_final = parseInt(tiempoFinal[1]);
						
						var la_hora_se_encuentra_en_el_rango = false;
						//Comprobar solo la hora rango inicio
						var corresponde = instanciaActual.verificarQueLaHoraEsteEnElRango(
																		parseInt(hora_limite_superior),
																		parseInt(minutos_limite_superior),
																		parseInt(hora_limite_inferior),
																		parseInt(minutos_limite_inferior),
																		parseInt(hora_inicio),
																		parseInt(minutos_inicio)
						);
						
						if(corresponde==false){//Si las horas del inicio son menores a las horas desocupadas
							alert("Error : La hora de inicio ingresada es menor a la hora permitida");
							return false;
						}
						
						corresponde = instanciaActual.verificarQueLaHoraEsteEnElRango(
																		parseInt(hora_limite_superior),
																		parseInt(minutos_limite_superior),
																		parseInt(hora_limite_inferior),
																		parseInt(minutos_limite_inferior),
																		parseInt(hora_final),
																		parseInt(minutos_final)
						);
						if(corresponde==false){//Si las horas del inicio son menores a las horas desocupadas
							alert("Error : La hora final ingresada es mayor a la hora permitida");
							return false;
						}
						
						corresponde = instanciaActual.esMayorEstaHoraQueLaOtra(hora_final,minutos_final,hora_inicio,minutos_inicio);
						if(corresponde==false){//Si las horas del inicio son menores a las horas desocupadas
							alert("Error : El rango de hora inicial debe ser menor que el rango de hora final");
							return false;
						}
						
					}
				},
				cancelar: function () {
				}
			}
		});
		setTimeout(function(){
			$('.tiempo').mask('00:00:00');
		},700);
	}
	
	
	agendarNuevaActividad(hora_limite_superior,minutos_limite_superior,hora_limite_inferior,minutos_limite_inferior){
		var html = "";
		html += "<table style='width:100%; text-align: left;'>";	
		html += 	"<tr>";
		html += 		"<td colspan='2'>";
		html += 			"<strong>Ingrese el Id del contrato | presupuesto : </strong><input type='text' id='id_contrato' value=''><button onClick='objetoCalendario.rescatarContrato();'>Mostrar Contrato</button>";
		html += 		"</td>";
		html += 	"</tr>";
		
		html += 	"<tr>";
		html += 		"<td colspan='2'>";
		html += 			"<h3>Ingrese el rango de horas : </h3>";
		html += 		"</td>";
		html += 	"</tr>";
		
		html += 	"<tr>";
		html += 		"<td>";
		html += 			"<strong>Rango Inicio: (Mínimo "+hora_limite_superior+":"+minutos_limite_superior+":00)</strong> <input type='text' id='hora_inicio_espacio_desocupado' class='tiempo' value='"+hora_limite_superior+":"+minutos_limite_superior+":00'> ";
		html += 		"</td>";
		html += 		"<td>";
		html += 			"<strong>Rango Final: (Máximo "+hora_limite_inferior+":"+minutos_limite_inferior+":00)</strong> <input type='text' id='hora_termino_espacio_desocupado' class='tiempo' value='"+hora_limite_inferior+":"+minutos_limite_inferior+":00'> ";
		html += 		"</td>";
		html += 	"</tr>";
		
		html += 	"<tr>";
		html += 		"<td colspan='2'><strong>Clasificación del servicio :</strong>";
		html += 		"<select id='clasificacion-actividad'>";
		html += 		'<option value="1">SERVICIO ORIGINAL</option>';
		html += 		'<option value="2" selected>SERVICIO DE GARANTÍA</option>';
		html += 		'<option value="3">SERVICIO ESPORÁDICO</option>';
		html += 		"</select>";
		html += 		"</td>";
		html += 	"</tr>";
		
		html += 	"<tr>";
		html += 		"<td colspan='2' id='espacio_previsualizacion_contrato'  style='border: solid #e74c3c;'>";
		html += 		"</td>";
		html += 	"</tr>";
		
		html += "</html>";
		var instanciaActual = this;
		$.confirm({
			title: 'Agendar nueva Actividad',
			content: html,
			type: 'blue',
			typeAnimated: true,
			buttons: {
				tryAgain: {
					text: 'Agendar',
					btnClass: 'btn-blue',
					action: function(){
						var tiempoInicio = $("#hora_inicio_espacio_desocupado").val();
						var tiempoFinal = $("#hora_termino_espacio_desocupado").val();
						tiempoInicio = tiempoInicio.split(":");
						tiempoFinal = tiempoFinal.split(":");
						var hora_inicio = parseInt(tiempoInicio[0]);
						var minutos_inicio = parseInt(tiempoInicio[1]);
						var hora_final = parseInt(tiempoFinal[0]);
						var minutos_final = parseInt(tiempoFinal[1]);
						
						var la_hora_se_encuentra_en_el_rango = false;
						//Comprobar solo la hora rango inicio
						var corresponde = instanciaActual.verificarQueLaHoraEsteEnElRango(
																		parseInt(hora_limite_superior),
																		parseInt(minutos_limite_superior),
																		parseInt(hora_limite_inferior),
																		parseInt(minutos_limite_inferior),
																		parseInt(hora_inicio),
																		parseInt(minutos_inicio)
						);
						
						if(corresponde==false){//Si las horas del inicio son menores a las horas desocupadas
							alert("Error : La hora de inicio ingresada es menor a la hora permitida");
							return false;
						}
						
						corresponde = instanciaActual.verificarQueLaHoraEsteEnElRango(
																		parseInt(hora_limite_superior),
																		parseInt(minutos_limite_superior),
																		parseInt(hora_limite_inferior),
																		parseInt(minutos_limite_inferior),
																		parseInt(hora_final),
																		parseInt(minutos_final)
						);
						if(corresponde==false){//Si las horas del inicio son menores a las horas desocupadas
							alert("Error : La hora final ingresada es mayor a la hora permitida");
							return false;
						}
						
						corresponde = instanciaActual.esMayorEstaHoraQueLaOtra(hora_final,minutos_final,hora_inicio,minutos_inicio);
						if(corresponde==false){//Si las horas del inicio son menores a las horas desocupadas
							alert("Error : El rango de hora inicial debe ser menor que el rango de hora final");
							return false;
						}
						
						if ( $("#direcciones-agregar-evento")[0] ) {
							var hora_inicio = hora_inicio+":"+minutos_inicio+":00";
							var hora_final = hora_final+":"+minutos_final+":00";
							var dia = $("#dia_de_la_semana").val();
							var mes = $("#mes").val();
							var ano = $("#ano").val();
							var servicios_del_evento = new Array();
							$('input:checkbox[name=servicios-agendar-nueva-actividad]:checked').each(
								function() {
									servicios_del_evento.push({
										id : $(this).val()
									});
								}
							);
							if(servicios_del_evento.length==0){
								alert("Debe seleccionar al menos un servicio.");
								return false;
							}
							
						  	objetoCalendario.agendar($("#direcciones-agregar-evento").val(),hora_inicio,hora_final,dia,mes,ano,$("#id_contrato").val(),$("#clasificacion-actividad").val(),servicios_del_evento);
						}else{
							alert("Debe de buscar un contrato y seleccionar una dirección antes de proseguir.");
							return false;
						}
					}
				},
				cancelar: function () {
				}
			}
		});
		setTimeout(function(){
			$('.tiempo').mask('00:00:00');
		},700);
	}
	
	rescatarContrato(){
		var id = $("#id_contrato").val();
		var parametros = {
			'id_contrato' : id,
			'accion' : 'rescatarContrato'
		};
		var instanciaActual = this;
		var respuestaAjax = super.enviar(parametros,this.directorio);
		respuestaAjax.done(function( datos ) {
			datos = JSON.parse(datos);
			var html = "";
			html += "<strong>Cliente : </strong>"+datos.Cliente;
			html += "<br><strong>Fecha : </strong>"+datos.fecha;
			html += "<br><strong>Rut : </strong>"+datos.rut;
			html += "<br><strong>Direcciones : </strong> ";
			html += "<select id='direcciones-agregar-evento'>";
			for(var c=0;c<datos.direcciones.length;c++){
				html += '<option value="'+datos.direcciones[c].id+'" selected>'+datos.direcciones[c].nombre+' </option>';
			
			}
			html += "</select>";
			html += "<br><strong>Servicios : </strong> <br>";
			for(var c=0;c<datos.servicios.length;c++){
				html += '<input type="checkbox" name="servicios-agendar-nueva-actividad" value="'+datos.servicios[c].id+'" checked> '+datos.servicios[c].nombre+'<br>';
			}
			$("#espacio_previsualizacion_contrato").html(html);
		});
	}
	
	agendar(direccion,hora_inicio,hora_final,dia,mes,ano,id_contrato,clasificacion_servicio,servicios_del_evento){
		var parametros = {
			'id_contrato' : id_contrato,
			'direccion' : direccion,
			'hora_inicio' : hora_inicio,
			'hora_final' : hora_final,
			'dia' : dia,
			'mes' : mes,
			'ano' : ano,
			'clasificacion_servicio' : clasificacion_servicio,
			'servicios_del_evento' : servicios_del_evento,
			'accion' : 'agendarNuevaActividad'
		};
		var instanciaActual = this;
		var respuestaAjax = super.enviar(parametros,this.directorio);
		respuestaAjax.done(function( datos ) {
			datos = JSON.parse(datos);
			if(datos.respuesta=="ok"){
				instanciaActual.mostrarCalendario();
			}else{
				alert("Error : Intente nuevamente.");
			}
		});
	}
}
var objetoCalendario;
$(document).ready(function(){
	objetoCalendario = new calendario();
	
});