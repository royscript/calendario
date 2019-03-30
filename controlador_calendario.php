<?php
ini_set("session.cookie_lifetime","7200");
ini_set("session.gc_maxlifetime","7200");
session_start();
class Calendario{
	public function __construct(){
		
	}
	public function obtenerCantidadDiasDelMes($mes,$ano){
		//Enero 1 .... Diciembre 12; Los años se escribren completos
		return cal_days_in_month(CAL_GREGORIAN, $mes, $ano); // 31
	}
	public function queLaHoraSeEncuentreEnElRango($hora_inicio,$hora_final,$hora_prueba){
		$hora_inicio = strtotime( $hora_inicio );
		$hora_final = strtotime( $hora_final );
		$hora_prueba = strtotime( $hora_prueba );
		if($hora_inicio>=$hora_prueba && $hora_prueba<=$hora_final){
			return true;
		}else{
			return false;
		}
	}
	public function obtenerNombreDelDia($dia,$mes,$ano){
		if(intval($dia)<10){
			$dia = "0".intval($dia);
		}
		if(intval($mes)<10){
			$mes = "0".intval($mes);
		}
		$fecha = $dia."-".$mes."-".$ano; //5 agosto de 2004 por ejemplo  

		$fechats = strtotime($fecha); //a timestamp 

		//el parametro w en la funcion date indica que queremos el dia de la semana 
		//lo devuelve en numero 0 domingo, 1 lunes,.... 
		$nombreDelDia = "";
		switch (date('w', $fechats)){ 
			case 0: $nombreDelDia = "Domingo"; break; 
			case 1: $nombreDelDia = "Lunes"; break; 
			case 2: $nombreDelDia = "Martes"; break; 
			case 3: $nombreDelDia = "Miercoles"; break; 
			case 4: $nombreDelDia = "Jueves"; break; 
			case 5: $nombreDelDia = "Viernes"; break; 
			case 6: $nombreDelDia = "Sabado"; break; 
		}
		return $nombreDelDia;
	}
	function fechaActual(){
		$ano = date("Y");
		$mes = date("m");
		$dia = date("d");
		return array("ano"=>$ano,"mes"=>$mes,"dia"=>$dia);
	}
	function calcular_tiempo_trasnc($hora1,$hora2){ 
		$separar[1]=explode(':',$hora1); 
		$separar[2]=explode(':',$hora2); 

		$total_minutos_trasncurridos[1] = ($separar[1][0]*60)+$separar[1][1]; 
		$total_minutos_trasncurridos[2] = ($separar[2][0]*60)+$separar[2][1]; 
		$total_minutos_trasncurridos = $total_minutos_trasncurridos[2]-$total_minutos_trasncurridos[1]; 
		 return $total_minutos_trasncurridos; 
	}
	function obtenerActividadDeLaRuta($terminaAlDiaSiguiente,$comienzaElDiaAnterior,$idRuta=null,$fechaRuta=null){
		$sql = "";
		$actividad = array();
		$terminaAlDiaSiguiente = "SI";
		$comienzaElDiaAnterior = "NO";
		
		if($terminaAlDiaSiguiente=="SI" && $comienzaElDiaAnterior=="NO"){//Termina al dia siguiente
			$hora_falsa_comienzo = false;
			$hora_falsa_termino = true;
			$totalMinutos = $this->calcular_tiempo_trasnc("22:40","23:59");//Le agregamos el final del día 23:59
		}else if($terminaAlDiaSiguiente=="NO" && $comienzaElDiaAnterior=="NO"){//En el mismo día la tarea
			$hora_falsa_comienzo = false;
			$hora_falsa_termino = false;
			$totalMinutos = $this->calcular_tiempo_trasnc("22:40","00:30");//Le dejamos la hora y minutos de terminos normales
		}else if($terminaAlDiaSiguiente=="NO" && $comienzaElDiaAnterior=="SI"){//Comenzó en el día anterior pero termina hoy
			$hora_falsa_comienzo = true;
			$hora_falsa_termino = false;
			$totalMinutos = $this->calcular_tiempo_trasnc("00:00","00:30");//Le agregamos el inicio del día 00:00
		}
		
		$rutasDeLaActividad = array();
		$rutasDeLaActividad []= array(
			"id"=>2,
			"nombre"=>"Cordillera"
		);
		$rutasDeLaActividad []= array(
			"id"=>3,
			"nombre"=>"Mineras y lugares certificados"
		);
		
		$contacto = array();
		$contacto []= array(
			"nombre"=>"Roy",
			"email"=>"asd@gmail.com",
			"fono"=>"614187",
			"celular"=>"92926213",
			"referencia"=>"Informatico",
			"recibe_informacion"=>"si"
		);
		$contacto []= array(
			"nombre"=>"Roy",
			"email"=>"asd@gmail.com",
			"fono"=>"614187",
			"celular"=>"92926213",
			"referencia"=>"Informatico",
			"recibe_informacion"=>"si"
		);
		$actividad []= array(
							"id"=>3,
							"rutas"=>$rutasDeLaActividad,
							"cliente"=>"CONSTRUCTORA CRC",
							"hora_inicio"=>"22",
							"minutos_inicio"=>"40",
							"segundos_inicio"=>"00",
							"hora_termino"=>"00",
							"minutos_termino"=>"30",
							"segundos_termino"=>"00",
							"total_minutos"=>$totalMinutos,
							"hora_falsa_de_termino"=>$hora_falsa_termino,
							"hora_falsa_comienzo"=>$hora_falsa_comienzo,
							"estado"=>"sin-confirmar",
							"fecha"=>"21-03-2018",
							"tipo_cliente"=>"Empresa",
							"numero_servicio"=>1,
							"rut"=>"16.428.927-3",
							"servicios"=>array("desratizacion","desinsectacion"),
							"direccion"=>"Vicente Zegers 847",
							"contacto"=>$contacto
					);
		return $actividad;
	}
	
}

if(isset($_POST["accion"])){
	sleep(2);
	$accion = $_POST["accion"];
	$objetoCalendario = new Calendario();
	switch ($accion){
		case "mostrar" :
			$mes = $_POST["mes"];
			$ano = $_POST["ano"];
			$dia_de_la_semana = $_POST["dia_de_la_semana"];
			$cantidad_dias_del_mes = $objetoCalendario->obtenerCantidadDiasDelMes($mes,$ano);
			$nombreDiasDelMes = array();
			for($x=1;$x<=$cantidad_dias_del_mes;$x++){
				$nombreDiasDelMes [] = array(
												"numero" => $x, 
												"nombre" => $objetoCalendario->obtenerNombreDelDia($x,$mes,$ano)
				);
			}
			$rutas = array();
			$actividad = array();
			$rutasDeLaActividad = array();
			$rutasDeLaActividad []= array(
				"id"=>1,
				"nombre"=>"Costa"
			);
			
			
			$contacto = array();
			$contacto []= array(
				"nombre"=>"Roy",
				"email"=>"asd@gmail.com",
				"fono"=>"614187",
				"celular"=>"92926213",
				"referencia"=>"Informatico",
				"recibe_informacion"=>"si"
			);
			$contacto []= array(
				"nombre"=>"Roy",
				"email"=>"asd@gmail.com",
				"fono"=>"614187",
				"celular"=>"92926213",
				"referencia"=>"Informatico",
				"recibe_informacion"=>"si"
			);
			$actividad []= array(
								"id"=>1,
								"rutas"=>$rutasDeLaActividad,
								"cliente"=>"LIPIGAS",
								"hora_inicio"=>"10",
								"minutos_inicio"=>"00",
							    "segundos_inicio"=>"00",
								"hora_termino"=>"12",
								"minutos_termino"=>"30",
							    "segundos_termino"=>"00",
								"total_minutos"=>$objetoCalendario->calcular_tiempo_trasnc("10:00","12:30"),
								"hora_falsa_de_termino"=>false,
								"hora_falsa_comienzo"=>false,
								"estado"=>"confirmado",
								"fecha"=>"21-03-2018",
								"tipo_cliente"=>"Empresa",
								"numero_servicio"=>1,
								"rut"=>"16.428.927-3",
								"servicios"=>array("desratizacion","desinsectacion","sanitizacion"),
								"direccion"=>"Osorno 1258",
								"contacto"=>$contacto
			            );
			$rutas []= array(
							 "id"=>1,
							 "nombre"=>"Costa",
							 "actividades"=>$actividad
			);
			$actividad = array();
			$actividad = $objetoCalendario->obtenerActividadDeLaRuta("SI","NO");
			
			$rutas []= array("id"=>2,"nombre"=>"Cordillera","actividades"=>$actividad);
			$actividad = array();
			$rutas []= array("id"=>3,"nombre"=>"Mineras y lugares certificados","actividades"=>$actividad);
			
			
			$rutasDeLaActividad = array();
			$rutasDeLaActividad []= array(
				"id"=>4,
				"nombre"=>"Afuera de la Ciudad"
			);
			$actividad []= array(
								"id"=>2,
								"rutas"=>$rutasDeLaActividad,
								"cliente"=>"CONSTRUCTORA CRC",
								"hora_inicio"=>"10",
								"minutos_inicio"=>"40",
							    "segundos_inicio"=>"00",
								"hora_termino"=>"13",
								"minutos_termino"=>"15",
							    "segundos_termino"=>"00",
								"total_minutos"=>$objetoCalendario->calcular_tiempo_trasnc("10:40","13:15"),
								"hora_falsa_de_termino"=>false,
								"hora_falsa_comienzo"=>false,
								"estado"=>"sin-confirmar",
								"fecha"=>"21-03-2018",
								"tipo_cliente"=>"Empresa",
								"numero_servicio"=>1,
								"rut"=>"16.428.927-3",
							    "servicios"=>array("desratizacion","desinsectacion"),
								"direccion"=>"Vicente Zegers 847",
								"contacto"=>$contacto
			            );
			$rutas []= array("id"=>4,"nombre"=>"Afuera de la Ciudad","actividades"=>$actividad);
			
			echo json_encode(
							array(
									"nombreDiasDelMes"=>$nombreDiasDelMes,
									"rutas"=>$rutas
							)
			);
			
		break;
		case "fecha_actual" :
			$fecha_actual = $objetoCalendario->fechaActual();
			$cantidad_dias_del_mes = $objetoCalendario->obtenerCantidadDiasDelMes($fecha_actual["mes"],$fecha_actual["ano"]);
			$nombreDiasDelMes = array();
			for($x=1;$x<=$cantidad_dias_del_mes;$x++){
				$nombreDiasDelMes [] = array(
												"numero" => $x, 
												"nombre" => $objetoCalendario->obtenerNombreDelDia($x,$fecha_actual["mes"],$fecha_actual["ano"])
				);
			}
			echo json_encode(
							array(
									"fecha_actual"=>$fecha_actual,
									"cantidad_dias_del_mes"=>$cantidad_dias_del_mes,
									"nombreDiasDelMes"=>$nombreDiasDelMes
							)
			);
		break;
		case "cantidadDiasDelMes":
			 $cantidad_dias_del_mes = $objetoCalendario->obtenerCantidadDiasDelMes($_POST["mes"],$_POST["ano"]);
			 $nombreDiasDelMes = array();
			 for($x=1;$x<=$cantidad_dias_del_mes;$x++){
				$nombreDiasDelMes [] = array(
												"numero" => $x, 
												"nombre" => $objetoCalendario->obtenerNombreDelDia($x,$_POST["mes"],$_POST["ano"])
				);
			 }
			 echo json_encode($nombreDiasDelMes);
		break;
		case "mostrarHorariosPreferidosYnoPorCliente":
			$id_actividad = $_POST["id_actividad"];
			$id_ruta = $_POST["id_ruta"];
			$fecha = $_POST["fecha"];
			
			$horarios_preferidos = array();
			for($x=0;$x<30;$x++){
				$horarios_preferidos []= array(
					"fecha"=>"Domingo 25 de marzo del 2018",
					"fecha_sin_formato"=>"25-03-2018",
					"rutas"=>"[1,2]",
					"hora_inicio"=>"10:00:00",
					"hora_final"=>"14:53:00"
				);
			}
			
			$horarios_no_preferidos = array();
			for($x=0;$x<30;$x++){
				$horarios_no_preferidos []= array(
					"fecha"=>"Martes 27 de marzo del 2018",
					"fecha_sin_formato"=>"27-03-2018",
					"rutas"=>"[1,2]",
					"hora_inicio"=>"09:15:00",
					"hora_final"=>"14:53:00"
				);
			}
			
			
			echo json_encode(
					array(
						"horarios_preferidos"=>$horarios_preferidos,
						"horarios_no_preferidos"=>$horarios_no_preferidos
					)
				);
		break;
		case "reagendar":
			$id_evento = $_POST["id_evento"];
			$id_ruta = $_POST["id_ruta"];
			$fecha_reagendar = $_POST["fecha_reagendar"];
			$hora_inicio_reagendar = $_POST["hora_inicio_reagendar"];
			$hora_final_reagendar = $_POST["hora_final_reagendar"];
			$observacion = $_POST["observacion"];
			$rutas_reagendar = $_POST["rutas_reagendar"];
			echo json_encode(array("respuesta"=>"ok"));
		break;
		case "previsualizarActividadParaIntercambiar":
			$id_evento = $_POST["id_evento"];
			$evento = array();
			$evento []= array(
				"Cliente" => "LIPIGAS",
				"horario" => "10:00:00 - 15:00:00",
				"fecha" => "martes 28 de marzo del 2018",
				"direccion" => "Las ortencias 1234",
				"rut"=>"16.428.927-3",
				"servicios"=>array("desratizacion","desinsectacion"),
			);
			echo json_encode($evento);
		break;
		case "realizarIntercambio":
			$id_evento_actual = $_POST["id_evento_actual"];
			$id_evento_intercambio = $_POST["id_evento_intercambio"];
			
			echo json_encode(array("respuesta"=>"ok"));
		break;
		case "rescatarContrato":
			$id_contrato = $_POST["id_contrato"];
			$direcciones = array();
			$direcciones []= array(
				"id"=>6,
				"nombre"=>"Osorno 1258"
			);
			$direcciones []= array(
				"id"=>11,
				"nombre"=>"Balmaceda 123"
			);
			
			$servicios = array();
			$servicios []= array(
				"id"=>1,
				"nombre"=>"Desratizacion"
			);
			$servicios []= array(
				"id"=>2,
				"nombre"=>"Desinsectación"
			);
			$servicios []= array(
				"id"=>3,
				"nombre"=>"Sanitización"
			);
			$servicios []= array(
				"id"=>4,
				"nombre"=>"Lamparas UV"
			);
			
			$contrato = array(
				"id"=>$id_contrato,
				"fecha"=>"02-02-2018",
				"Cliente"=>"Perritos Ltda",
				"rut"=>"6.667.038-4",
				"direcciones"=>$direcciones,
				"servicios" =>$servicios
			);
			echo json_encode($contrato);			
		break;
		case "agendarNuevaActividad":
			$id_contrato = $_POST["id_contrato"];
			$direccion = $_POST["direccion"];
			$hora_inicio = $_POST["hora_inicio"];
			$hora_final = $_POST["hora_final"];
			$dia = $_POST["dia"];
			$mes = $_POST["mes"];
			$ano = $_POST["ano"];
			$clasificacion_servicio = $_POST["clasificacion_servicio"];
			
			echo json_encode(array("respuesta"=>"ok"));
		break;
	}
}

?>