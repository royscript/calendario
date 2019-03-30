<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Documento sin título</title>
<script type="application/javascript" src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script type="application/javascript" src="https://momentjs.com/downloads/moment.js"></script>
<script type="application/javascript" src="https://momentjs.com/downloads/moment-with-locales.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.0/jquery-confirm.min.css">
<script type="text/javascript" src="jQuery-Mask-Plugin-master/src/jquery.mask.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.0/jquery-confirm.min.js"></script>
<script type="application/javascript" src="controlador_calendario.js"></script>
<script type="application/javascript" src="confirmar_servicios.js"></script>

<style>
@import url("css_load.css");
	.jconfirm-holder{
		margin-left: 15px;
    	margin-right: 15px;
	}

	#formulario-calendario{
		text-align: center;
    	width: 98%;
		height: 80px;
	}
	#calendario{
		width: 98%;
	}
	#tabla-calendario{
		width: 100%;
		border-collapse: collapse;
	}
	/*#tabla-calendario th,
	#tabla-calendario td,
	#tabla-calendario tr,
	#tabla-calendario thead,
	#tabla-calendario tbody { display: block; }
	
	


	#tabla-calendario tr:after {
		content: ' ';
		display: block;
		visibility: hidden;
		clear: both;
	}

	#tabla-calendario tbody {
		height: 500px;
		overflow-y: auto;
		overflow-x: hidden;
		width: 100.8%;
	}

	#tabla-calendario tbody td,
	#tabla-calendario thead th {
		width: 19%;
		float: left;
		border-right: 1px solid black;
	}

	#tabla-calendario thead tr th { 
		height: 30px;
		line-height: 30px;
		/*text-align: left;*/
	}

	#tabla-calendario tbody { border-top: 1px solid black; }

	#tabla-calendario tbody td:last-child, thead th:last-child {
		border-right: none !important;
	}
	
	*/
	
	#division {
	 	border: #000000 1px dashed !important;
		border-color: #e6e6e6 #e6e6e6 #bfbfbf !important;
	    border-color: rgba(0,0,0,.1) rgba(0,0,0,.1) rgba(0,0,0,.25) !important;
	}
	.no-pintar-fila{
		
		border-left: #000000 1px solid !important;
		border-right: #000000 1px solid !important;
		border-color: #e6e6e6 #e6e6e6 #bfbfbf;
	    border-color: rgba(0,0,0,.1) rgba(0,0,0,.1) rgba(0,0,0,.25) !important;
	}
	.no-pintar-fila td{
		border-left: #000000 1px solid !important;
		border-right: #000000 1px solid !important;
		border-color: #e6e6e6 #e6e6e6 #bfbfbf !important;
	    border-color: rgba(0,0,0,.1) rgba(0,0,0,.1) rgba(0,0,0,.25) !important;
	}
	.pintar-fila{
		border: #000000 1px dashed !important;
		border-left: #000000 1px solid !important;
		border-right: #000000 1px solid !important;
		height: 20.4px !important;
		border-color: #e6e6e6 #e6e6e6 #bfbfbf !important;
	    border-color: rgba(0,0,0,.1) rgba(0,0,0,.1) rgba(0,0,0,.25) !important;
	}
	.pintar-fila td{
		border-left: #000000 1px solid !important;
		border-right: #000000 1px solid !important;
		border-color: #e6e6e6 #e6e6e6 #bfbfbf !important;
	  	border-color: rgba(0,0,0,.1) rgba(0,0,0,.1) rgba(0,0,0,.25) !important;
		height: 20.4px !important;
	}

	
	#tabla-calendario{
		width: 100%;
		table-layout: fixed;
		border-collapse: collapse;
	}

	#tabla-calendario tbody{
	  display:block;
	  width: 100%;
	  overflow: auto;
	  height: 500px;
	}

	#tabla-calendario thead tr {
	   display: block;
	}

	#tabla-calendario thead {
	  /*background: black;
	  color:#fff;*/
	  border: 1px solid;
	  background-color: #f5f5f5;
	  background-image: -moz-linear-gradient(top,#fff,#e6e6e6);
	  background-image: -webkit-gradient(linear,0 0,0 100%,from(#fff),to(#e6e6e6));
	  background-image: -webkit-linear-gradient(top,#fff,#e6e6e6);
	  background-image: -o-linear-gradient(top,#fff,#e6e6e6);
	  background-image: linear-gradient(to bottom,#fff,#e6e6e6);
	  background-repeat: repeat-x;
	  border-color: #e6e6e6 #e6e6e6 #bfbfbf;
	  border-color: rgba(0,0,0,.1) rgba(0,0,0,.1) rgba(0,0,0,.25);
	  color: #333;
	  text-shadow: 0 1px 1px rgba(255,255,255,.75);
	  box-shadow: inset 0 1px 0 rgba(255,255,255,.2), 0 1px 2px rgba(0,0,0,.05);
	}

	#tabla-calendario th {
	  /*padding: 5px;*/
	  text-align: center;
	  width: 200px;
	}
	
	#tabla-calendario td {
	  vertical-align: baseline;
	}
	
	.confirmado{
		background-color: #BAFDA3;
	}
	.sin-confirmar{
		background-color: #F5FF5D;
	}
	
	.comboboxCalendario{
    	margin-left: .75em;
		border-top-right-radius: 4px;
    	border-bottom-right-radius: 4px;
		border-top-left-radius: 4px;
    	border-bottom-left-radius: 4px;
   	    margin-left: .75em;
		border-top-right-radius: 4px;
    	border-bottom-right-radius: 4px;
		border-top-left-radius: 4px;
    	border-bottom-left-radius: 4px;
		position: relative;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		margin: 0;
		height: 2.1em;
		padding: 0 .6em;
		font-size: 1em;
		white-space: nowrap;
		cursor: pointer;
		position: relative;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		margin: 0;
		height: 2.1em;
		padding: 0 .6em;
		font-size: 1em;
		cursor: pointer;
		white-space: nowrap;
		border: 1px solid;
		background-color: #f5f5f5;
		background-image: -moz-linear-gradient(top,#fff,#e6e6e6);
		background-image: -webkit-gradient(linear,0 0,0 100%,from(#fff),to(#e6e6e6));
		background-image: -webkit-linear-gradient(top,#fff,#e6e6e6);
		background-image: -o-linear-gradient(top,#fff,#e6e6e6);
		background-image: linear-gradient(to bottom,#fff,#e6e6e6);
		background-repeat: repeat-x;
		border-color: #e6e6e6 #e6e6e6 #bfbfbf;
		border-color: rgba(0,0,0,.1) rgba(0,0,0,.1) rgba(0,0,0,.25);
		color: #333;
		text-shadow: 0 1px 1px rgba(255,255,255,.75);
		box-shadow: inset 0 1px 0 rgba(255,255,255,.2), 0 1px 2px rgba(0,0,0,.05);
		border: 1px solid;
		background-color: #f5f5f5;
		background-image: -moz-linear-gradient(top,#fff,#e6e6e6);
		background-image: -webkit-gradient(linear,0 0,0 100%,from(#fff),to(#e6e6e6));
		background-image: -webkit-linear-gradient(top,#fff,#e6e6e6);
		background-image: -o-linear-gradient(top,#fff,#e6e6e6);
		background-image: linear-gradient(to bottom,#fff,#e6e6e6);
		background-repeat: repeat-x;
		border-color: #e6e6e6 #e6e6e6 #bfbfbf;
		border-color: rgba(0,0,0,.1) rgba(0,0,0,.1) rgba(0,0,0,.25);
		color: #333;
		text-shadow: 0 1px 1px rgba(255,255,255,.75);
		box-shadow: inset 0 1px 0 rgba(255,255,255,.2), 0 1px 2px rgba(0,0,0,.05);
		font-family: inherit;
		font-size: inherit;
		line-height: inherit;
	}
	
	.botonRedondeado{
		border-top-right-radius: 4px;
    	border-bottom-right-radius: 4px;
		border-top-left-radius: 4px;
    	border-bottom-left-radius: 4px;
		border-top-right-radius: 4px;
    	border-bottom-right-radius: 4px;
		border-top-left-radius: 4px;
    	border-bottom-left-radius: 4px;
	}
	.botonCalendario{
    	margin-left: .75em;
		
   	    margin-left: .75em;
		
		position: relative;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		margin: 0;
		height: 2.1em;
		padding: 0 .6em;
		font-size: 1em;
		white-space: nowrap;
		cursor: pointer;
		position: relative;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		margin: 0;
		height: 2.1em;
		padding: 0 .6em;
		font-size: 1em;
		cursor: pointer;
		white-space: nowrap;
		border: 1px solid;
		background-color: #f5f5f5;
		background-image: -moz-linear-gradient(top,#fff,#e6e6e6);
		background-image: -webkit-gradient(linear,0 0,0 100%,from(#fff),to(#e6e6e6));
		background-image: -webkit-linear-gradient(top,#fff,#e6e6e6);
		background-image: -o-linear-gradient(top,#fff,#e6e6e6);
		background-image: linear-gradient(to bottom,#fff,#e6e6e6);
		background-repeat: repeat-x;
		border-color: #e6e6e6 #e6e6e6 #bfbfbf;
		border-color: rgba(0,0,0,.1) rgba(0,0,0,.1) rgba(0,0,0,.25);
		color: #333;
		text-shadow: 0 1px 1px rgba(255,255,255,.75);
		box-shadow: inset 0 1px 0 rgba(255,255,255,.2), 0 1px 2px rgba(0,0,0,.05);
		border: 1px solid;
		background-color: #f5f5f5;
		background-image: -moz-linear-gradient(top,#fff,#e6e6e6);
		background-image: -webkit-gradient(linear,0 0,0 100%,from(#fff),to(#e6e6e6));
		background-image: -webkit-linear-gradient(top,#fff,#e6e6e6);
		background-image: -o-linear-gradient(top,#fff,#e6e6e6);
		background-image: linear-gradient(to bottom,#fff,#e6e6e6);
		background-repeat: repeat-x;
		border-color: #e6e6e6 #e6e6e6 #bfbfbf;
		border-color: rgba(0,0,0,.1) rgba(0,0,0,.1) rgba(0,0,0,.25);
		color: #333;
		text-shadow: 0 1px 1px rgba(255,255,255,.75);
		box-shadow: inset 0 1px 0 rgba(255,255,255,.2), 0 1px 2px rgba(0,0,0,.05);
		font-family: inherit;
		font-size: inherit;
		line-height: inherit;
	}
	.izquierda{
		float: left;
	}
	.derecha{
		float: right;
	}
	#frm_buscar {
		/* Sólo para centrar el formulario a la página */
		margin: 0 auto;
		width: 800px;
		/* Para ver el borde del formulario */
		padding: 1em;
		border: 1px solid #CCC;
		border-radius: 1em;
	}
	#frm_buscar div + div {
		margin-top: 1em;
	}
	#frm_buscar label {
		/* Para asegurarse que todos los labels tienen el mismo tamaño y están alineados correctamente */
		display: inline-block;
		width: 150px;
		text-align: right;
	}
	#frm_buscar:before {
	  content: "Buscar por: ";
	  margin-top: -27px;
      position: absolute;
	  background: #ffffff;
	  font-weight: bold;
	}
	.tabla_confirmar thead {
		border: 1px solid;
		background-color: #f5f5f5;
		background-image: -moz-linear-gradient(top,#fff,#e6e6e6);
		background-image: -webkit-gradient(linear,0 0,0 100%,from(#fff),to(#e6e6e6));
		background-image: -webkit-linear-gradient(top,#fff,#e6e6e6);
		background-image: -o-linear-gradient(top,#fff,#e6e6e6);
		background-image: linear-gradient(to bottom,#fff,#e6e6e6);
		background-repeat: repeat-x;
		border-color: #e6e6e6 #e6e6e6 #bfbfbf;
		border-color: rgba(0,0,0,.1) rgba(0,0,0,.1) rgba(0,0,0,.25);
		color: #333;
		text-shadow: 0 1px 1px rgba(255,255,255,.75);
		box-shadow: inset 0 1px 0 rgba(255,255,255,.2), 0 1px 2px rgba(0,0,0,.05);
	}
	.tabla_confirmar tbody td {
		border: 1px solid;
		border-color: #e6e6e6 #e6e6e6 #bfbfbf;
		border-color: rgba(0,0,0,.1) rgba(0,0,0,.1) rgba(0,0,0,.25);
		color: #333;
		text-shadow: 0 1px 1px rgba(255,255,255,.75);
		box-shadow: inset 0 1px 0 rgba(255,255,255,.2), 0 1px 2px rgba(0,0,0,.05);
	}
	.tabla_confirmar {
		width: 100%;
		table-layout: fixed;
		border-collapse: collapse;
	}
	.badge-secondary {
		color: #fff;
		background-color: #FF0004;
	}
	.badge-pill {
		padding-right: .6em;
		padding-left: .6em;
		border-radius: 10rem;
	}
	.badge {
		display: inline-block;
		padding: .25em .4em;
		font-size: 75%;
		font-weight: 700;
		line-height: 1;
		text-align: center;
		white-space: nowrap;
		vertical-align: baseline;
		border-radius: .25rem;
	}
	
</style>
</head>

<body>
	<div id="formulario-calendario"></div>
	<div id="calendario"></div>
</body>
</html>
