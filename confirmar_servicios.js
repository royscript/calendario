// JavaScript Document
class confirmarServicios extends Ajax{
	constructor(){
		super();
		this.directorio = "controlador_calendario.php";
	}
	mantenedor(){
		objetoConfirmar.indicadorPendientes();
		var html = '';
		html += '<form id="frm_buscar">'
					+'<div>'
						+'<label for="name">Tipo de Cliente:</label>'
						+'<select id="tipo_de_cliente" class="frm_dia comboboxCalendario">'
							+'<option value="Empresa">Empresa</option>'
							+'<option value="Hogar">Hogar</option>'
						+'</select>'
					+'</div>'
					+'<div>'
						+'<label for="name">Documento de pago:</label>'
						+'<select id="documento_de_pago" class="frm_dia comboboxCalendario">'
							+'<option value="Contrato">Contrato</option>'
							+'<option value="1">Orden de compra antes del servicio</option>'
							+'<option value="2">Orden de compra despues del servicio</option>'
						+'</select>'
					+'</div>'
					+'<div>'
						+'<label for="name">Nombre Cliente:</label>'
						+'<input type="text" id="nombre_cliente" class="frm_dia comboboxCalendario">'
					+'</div>'
					+'<div>'
						+'<label for="name">Id Servicio:</label>'
						+'<input type="text" id="id_cliente" class="frm_dia comboboxCalendario">'
					+'</div>'
					+'<div>'
						+'<center>'
							+'<button id="documento_de_pago" class="frm_dia comboboxCalendario" style="align-items: center;">Buscar</button>'
						+'</center>'
					+'</div>'
				+'</form>'
				+'<br>'
		 		+'<table id="tabla_confirmar" class="tabla_confirmar">'
					+'<thead>'
						+'<tr>'
							+'<th width="5%">Id</th>'
							+'<th>Cliente</th>'
							+'<th>Fecha y hora</th>'
							+'<th>Servicios</th>'
							+'<th>Estado</th>'
						+'</tr>'
					+'</thead>'
					+'<tbody>'
						+'<tr>'
							+'<td>1</td>'
							+'<td>Joyas Matilde</td>'
							+'<td>Sábado 24 de Marzo del 2018, entre las 10:00:00 y las 13:30:00 hrs.</td>'
							+'<td>Desratizacion, sanitizacion, lampara UV</td>'
							+'<td><button>Confirmar</button></td>'
						+'</tr>'
					+'</tbody>'
				+'</table>';
		$("#calendario").html(html);
	}
	tabla(){
		var html = '';
		html += '<form id="frm_buscar">'
					+'<div>'
						+'<label for="name">Tipo de Cliente:</label>'
						+'<select id="tipo_de_cliente" class="frm_dia comboboxCalendario">'
							+'<option value="Empresa">Empresa</option>'
							+'<option value="Hogar">Hogar</option>'
						+'</select>'
					+'</div>'
					+'<div>'
						+'<label for="name">Documento de pago:</label>'
						+'<select id="documento_de_pago" class="frm_dia comboboxCalendario">'
							+'<option value="Contrato">Contrato</option>'
							+'<option value="1">Orden de compra antes del servicio</option>'
							+'<option value="2">Orden de compra despues del servicio</option>'
						+'</select>'
					+'</div>'
					+'<div>'
						+'<label for="name">Nombre Cliente:</label>'
						+'<input type="text" id="nombre_cliente" class="frm_dia comboboxCalendario">'
					+'</div>'
					+'<div>'
						+'<label for="name">Id Cliente:</label>'
						+'<input type="text" id="id_cliente" class="frm_dia comboboxCalendario">'
					+'</div>'
					+'<div>'
						+'<center>'
							+'<button id="documento_de_pago" class="frm_dia comboboxCalendario" style="align-items: center;">Buscar</button>'
						+'</center>'
					+'</div>'
				+'</form>';
		$("#tabla_confirmar").append(html);
	}
	mostrarPendientes(){
		
	}
	indicadorPendientes(){
		$("#indicador_pendientes_confirmar").html("1");
	}
}
var objetoConfirmar = new confirmarServicios();
$(document).ready(function(){
	objetoConfirmar.indicadorPendientes();
});