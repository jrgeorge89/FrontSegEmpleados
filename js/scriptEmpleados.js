$(document).ready(function() {
	
	// Cargamos el listado de Categorias
	cargarCategorias();
	// Cargamos el listado de Empleados en la tabla
	consultarEmpleados();
	// Cargamos el listado de Empleados marcados como Favoritos
	consultarEmpleados(1);
	
	// Valida que el dato ingresado sea numerico
	$('#idSatisfaccion, #idEditSatisfaccion, #idFindSatisfaccion').numeric();

	// Obtiene los datos de cada campo del formulario y Valida que no esten Vacios
	$('#idformRegistro').on('submit', function (e) {
		e.preventDefault(); // Evita que la pagina se recargue
	});

	// Ejectura la funcion Registrar Empleados
	$('#idBtnRegistrarEmpleados').click(function () {
		registrarEmpleados();
	});

	// Obtiene los datos de cada campo del formulario y Valida que no esten Vacios
	$('#idEditformRegistro').on('submit', function (e) {
		e.preventDefault(); // Evita que la pagina se recargue
	});

	// Ejectura la funcion Registrar Empleados
	$('#idBtnEditarEmpleados').click(function () {
		var idEmpleado = $('#idKeyEmpleado').val();
		editarEmpleado(idEmpleado);
	});


	// Filtra la lista de empleados por cada campo disponible
	$('#idFindNombre, #idFindEmail, #idFindArea, #idFindCategoria, #idFindSatisfaccion, #idFindCompania').change(function(){
		consultarEmpleados();
	});

	// Filtra la lista de empleados por los campos Nombre, Categoria y Compañia para los Favoritos
	$('#idFindNombreFav, #idFindCategoriaFav, #idFindCompaniaFav').change(function(){
		consultarEmpleados(1);
	});

	
	// Se valida la imagen y se carga a vista previa
	$('#idLogo').change(function(){

		var imagen = this.files[0];
		
		// VALIDAMOS EL FORMATO DE LA IMAGEN SEA JPG O PNG
		if(imagen["type"] != "image/jpeg" && imagen["type"] != "image/png"){

			$(".nuevaFoto").val("");

			swal({
				title: "Error al subir la imagen",
				text: "¡La imagen debe estar en formato JPG o PNG!",
				type: "error",
				confirmButtonText: "¡Cerrar!"
				});

		}else if(imagen["size"] > 2000000){

			$(".nuevaFoto").val("");

			swal({
				title: "Error al subir la imagen",
				text: "¡La imagen no debe pesar más de 2MB!",
				type: "error",
				confirmButtonText: "¡Cerrar!"
				});

		}else{
			// Se carga la imagen a la Vista Previa
			var datosImagen = new FileReader;
			datosImagen.readAsDataURL(imagen);

			$(datosImagen).on("load", function(event){
				var rutaImagen = event.target.result;
				$(".previsualizar").attr("src", rutaImagen);
			})

		}

	});


});



// Realizamos Consulta de Categorias
function cargarCategorias() {

    $.ajax({
        url: 'http://127.0.0.1:8000/api/v1/category',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
			// console.log(response);
			var data = response.data;
            // Iterar sobre los datos obtenidos y agregar opciones al select
            $.each(data, function(key, category) {
                $('#idCategoria, #idEditCategoria, #idFindCategoria, #idFindCategoriaFav').append('<option value="' + category.id + '">' + category.categorie + '</option>');
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error en la petición AJAX:', textStatus, errorThrown);
        }
    });
}


// Funcion que Registra los Empleados de cada una de las empresas
function registrarEmpleados() {

	var nombre = $('#idNombre').val();
	var email = $('#idEmail').val();
	var area = $('#idArea').val();
	var categoria = $('#idCategoria').val();
	var empresa = $('#idEmpresa').val();
	var satisfacion = $('#idSatisfaccion').val();
	var favorito = $('#idFavorito').val();
	var logo = $('#idLogo')[0].files[0]; // El primer archivo seleccionado

	var formData = new FormData();
	formData.append('name', nombre);
	formData.append('email', email);
	formData.append('area', area);
	formData.append('categorie_id', categoria);
	formData.append('companie', empresa);
	formData.append('satisfaction', satisfacion);
	formData.append('favorite', favorito);
	formData.append('url_logo', logo);

	if(nombre != '' && email != '' && area != '' && categoria != '' && empresa != '' && satisfacion != '' && favorito != '' && logo != 'undefined'){

		$.ajax({
			type: 'POST',
			url: 'http://127.0.0.1:8000/api/v1/employees',
			data: formData,
			contentType: false, // Evita que jQuery establezca el tipo de contenido
			processData: false, // Evita que jQuery procese los datos
			success: function(response) {
				// console.log(response);
				limpiarCampos();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.error('Error en la petición AJAX:', textStatus, errorThrown);
			}
		});

	}

}


// Funcion que Registra los Empleados
function editarEmpleado(id) {

	var nombre = $('#idEditNombre').val();
	var email = $('#idEditEmail').val();
	var area = $('#idEditArea').val();
	var categoria = $('#idEditCategoria').val();
	var empresa = $('#idEditEmpresa').val();
	var satisfacion = $('#idEditSatisfaccion').val();
	var favorito = $('#idEditFavorito').val();
	var logo = $('#idEditLogo')[0].files[0]; // El primer archivo seleccionado

	var formData = new FormData();
	formData.append('name', nombre);
	formData.append('email', email);
	formData.append('area', area);
	formData.append('categorie_id', categoria);
	formData.append('companie', empresa);
	formData.append('satisfaction', satisfacion);
	formData.append('favorite', favorito);
	formData.append('url_logo', logo);
	

	var apiUrl = 'http://127.0.0.1:8000/api/v1/employees/'+id;

	// $.ajax({
	// 	url: apiUrl,
	// 	type: 'PUT',
	// 	data: formData,
	// 	cache: false,
	// 	processData: false, // Evita que jQuery procese los datos
	// 	contentType: false, // Evita que jQuery establezca el tipo de contenido
	// 	// headers: {
	// 	// 	'Content-Type': 'application/json'
	// 	// },
	// 	success: function(response) {
	// 		console.log(response);
	// 	},
    //     error: function(jqXHR, textStatus, errorThrown) {
    //         console.error('Error en la petición AJAX:', textStatus, errorThrown);
    //     }
	// });


	// Datos que deseas enviar en la petición PUT
	// var datos = {
	// 	name: nombre,
	// 	email: email,
	// 	area: area,
	// 	categorie_id: categoria,
	// 	companie: empresa,
	// 	satisfaction: satisfacion,
	// 	favorite: favorito
	// };

	
	// var formData = new FormData();
	// formData.append('url_logo', logo);
  
	// var payload = JSON.stringify({
	// 	name: nombre,
	// 	email: email,
	// 	area: area,
	// 	categorie_id: categoria,
	// 	companie: empresa,
	// 	satisfaction: satisfacion,
	// 	favorite: favorito
	// });
  
	// formData.append('payload', payload);


	// Realizar la petición AJAX con jQuery
	$.ajax({
		url: apiUrl,
		type: 'PUT',
		// dataType: 'json',
		// contentType: 'application/json', // Especificar el tipo de contenido JSON
		// data: JSON.stringify(datos), // Convertir los datos a JSON
		data: formData,
		processData: false, // Evita que jQuery procese los datos
		contentType: false, // Evita que jQuery establezca el tipo de contenido
		success: function(response) {
			console.log('Petición PUT exitosa:', response);
			// Aquí puedes manejar la respuesta de la API
		},
		error: function(xhr, status, error) {
			console.error('Error en la petición PUT:', error);
			// Manejar errores si ocurre alguno
		}
	});

}


// Permite buscar el Empleado por ID
function buscarEmpleadoPorId(id) {

	limpiarCamposEditar();

	var settings = {
		"url": "http://127.0.0.1:8000/api/v1/employees/"+id,
		"method": "GET",
		"dataType": "json",
		"timeout": 0,
		"headers": {
			"Content-Type": "application/json"
		},
	};

	$.ajax(settings).done(function (response) {

		var data = response.data;
		console.log(data);
		
		$('#idKeyEmpleado').val(data.id);
		$('#idEditNombre').val(data.name);
		$('#idEditEmail').val(data.email);
		$('#idEditArea').val(data.area);
		$('#idEditEmpresa').val(data.companie);
		$('#idEditSatisfaccion').val(data.satisfaction);
		$("#idEditCategoria option[value="+ data.category.id +"]").attr("selected",true);
		$("#idEditFavorito option[value="+ data.favorite +"]").attr("selected",true);
		$('#idLogoActual').val(data.url_logo);
		$(".editPrevisualizar").attr("src", "http://127.0.0.1:8000" + "/storage/" + data.url_logo);

	});

}


// Consulta la listado de Empleados
function consultarEmpleados(favorito = '', columna = '', direccion = '') {

	// Condiciona el listado de Empleados de forma Ascendente o Descendente
	var sortingParameter = "";
	if (columna != '' && direccion != '') {
		var columna = columna == "categoria" ? "categorie_id" : columna == "Satisfaccion" ? "satisfaction" : columna;
		sortingParameter = "&column="+columna+"&direction="+direccion;
	}
	
	var nombre = favorito != '' && $('#idFindNombreFav').val() != '' ? $('#idFindNombreFav').val() : $('#idFindNombre').val();
	var categoria = favorito != '' && $('#idFindCategoriaFav').val() != '' ? $('#idFindCategoriaFav').val() : $('#idFindCategoria').val();
	var empresa = favorito != '' && $('#idFindCompaniaFav').val() != '' ? $('#idFindCompaniaFav').val() : $('#idFindCompania').val();	
	var email = $('#idFindEmail').val();
	var area = $('#idFindArea').val();
	var satisfacion = $('#idFindSatisfaccion').val();
	
	var url = "http://127.0.0.1:8000/api/v1/employees";

	var settings = {
		"url": url+"?name[lk]="+nombre+"&email[lk]="+email+"&area[lk]="+area+"&categorieId[eq]="+categoria+"&companie[lk]="+empresa+
							"&satisfaction[eq]="+satisfacion+"&favorite[eq]="+favorito+sortingParameter,
		"method": "GET",
		"dataType": "json",
		"timeout": 0,
		"headers": {
			"Content-Type": "application/json"
		},
	};

	$.ajax(settings).done(function (response) {
		// console.log(response);
		favorito != '' ? cargarTablaEmpleadosFavoritos(response) : cargarTablaEmpleados(response);
	});
	
}


// Funcion que permite Paginar los resultados de la busqueda de Empleados
function paginacion(urlPage, favorito = '') {

	$.ajax({
		url: urlPage,
		type: 'GET',
		dataType: 'json',
		timeout: 0,
		headers: {
			'Content-Type': 'application/json'
		},
		success: function(response) {
			// console.log(response);
			favorito != '' ? cargarTablaEmpleadosFavoritos(response) : cargarTablaEmpleados(response);	
		},
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error en la petición AJAX:', textStatus, errorThrown);
        }
	});

}


// Permite Eliminar un registro de calificaciones por ID
function eliminarEmpleado(id) {

	var settings = {
		"url": "http://127.0.0.1:8000/api/v1/employees/"+id,
		"method": "DELETE",
		"dataType": "json",
		"timeout": 0,
		"headers": {
			"Content-Type": "application/json"
		},
	};

	$.ajax(settings).done(function (response) {
		consultarEmpleados();
		consultarEmpleados(1);
	});

}


// Permite eliminar el estado favorito del Empleado
function eliminarFavorito(id, favorito) {
		
	var ruta = 'http://127.0.0.1:8000/api/v1/employees/'+id;
	var tipo = 'PATCH';
	var datos = {favorite: favorito};

	$.ajax({
		url: ruta,
		type: tipo,
		data: JSON.stringify(datos),
		cache: false,
		processData: false,
		contentType: false,
		headers: {
			'Content-Type': 'application/json'
		},
		success: function(response, textStatus, jqXhr) {
			// console.log("¡Empleado actualizado correctamente!");
			consultarEmpleados(1);
			consultarEmpleados();
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log("Ocurrió un error: " + textStatus, errorThrown);
		},
		complete: function() {
			// console.log("Petición PATCH completada");
		}
	});

}


// Tabla del listado de Empleados
function cargarTablaEmpleados(response) {

	let elementos = `
			<table class="table table-striped">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Nombre</th>
						<th scope="col">Email</th>
						<th scope="col">Area</th>
						<th scope="col">
							<div class="btn-group" role="group">
								Categoria
								<div class="btn-group-vertical">
									<a href="#" class="btn btn-xs btn-link p-0" style="margin: -4px 0px -4px 2px; !important;" onclick="consultarEmpleados('', 'categoria', 'asc')">
										<i class="fa fa-sort-up"></i>
									</a>
									<a href="#" class="btn btn-xs btn-link p-0" style="margin: -4px 0px -8px 2px; !important;" onclick="consultarEmpleados('', 'categoria', 'desc')">
										<i class="fa fa-sort-down"></i>
									</a>
								</div>
							</div>
						</th>
						<th scope="col">
							<div class="btn-group" role="group">
								Satisfacción 
								<div class="btn-group-vertical">
									<a href="#" class="btn btn-xs btn-link p-0" style="margin: -4px 0px -4px 2px; !important;" onclick="consultarEmpleados('', 'Satisfaccion', 'asc')">
										<i class="fa fa-sort-up"></i>
									</a>
									<a href="#" class="btn btn-xs btn-link p-0" style="margin: -4px 0px -8px 2px; !important;" onclick="consultarEmpleados('', 'Satisfaccion', 'desc')">
										<i class="fa fa-sort-down"></i>
									</a>
								</div>
							</div>
						</th>
						<th scope="col">Compañia</th>
						<th scope="col">Logo</th>
						<th scope="col">favorito</th>
						<th scope="col">Acciónes</th>
					</tr>
				</thead>
				<tbody>
	`;

	$.each(response.data, function (i, item) {
		
		var favorito = item.favorite == 1 ? "fa-star" : "fa-star-o";
		var logo = item.url_logo == "https://lorempixel.com/400/300/" ? item.url_logo : "http://127.0.0.1:8000/storage/"+item.url_logo;

		elementos += `
				<tr style="font-size:14px;">
					<th scope="row">${item.id}</th>
					<td>${item.name}</td>
					<td>${item.email}</td>
					<td>${item.area}</td>
					<td>${item.category.categorie}</td>
					<td class="text-center">${item.satisfaction}</td>
					<td>${item.companie}</td>
					<td class="text-center"><img src="${logo}" class="img-thumbnail previsualizar" id="idPrevisualizar" width="50px"></td>
					<td class="text-center"><i class="fa ${favorito}" style="color: orange" aria-hidden="true"></i></td>
					<td style="text-align: center;">
						<span class="btn btn-info btn-sm" onclick="buscarEmpleadoPorId('${item.id}')" data-toggle="modal" data-target="#modalEditarEmpleado">
							<span class="fa fa-pencil"></span>
						</span>
						<span class="btn btn-danger btn-sm" onclick="eliminarEmpleado('${item.id}')">
							<span class="fa fa-trash"></span>
						</span>
					</td>
				</tr>
			`;
	});

	elementos += `
			</tbody>
		</table>
	`;
	
	
	var paginate = `
			<nav aria-label="...">
				<ul class="pagination">
			`;

	$.each(response.meta.links, function(i, link) {

		var state = link.active == true ? "active" : link.url == null ? "disabled" : "";

		paginate += `
					<li class="page-item ${state}">
						<a class='page-link' href='#' id='idPaginacion' onclick='paginacion(\"${link.url}\")'>${link.label}</a>
					</li>
				`;
	});
	
	paginate += `
				</ul>
			</nav>
			`;

	$("#contenTablaEmpleados").html(elementos);
	$("#contenPaginate").html(paginate);

}


// Tabla del listado de Empleados
function cargarTablaEmpleadosFavoritos(response) {

	let elementos = `
			<table class="table table-striped">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Nombre</th>
						<th scope="col">Email</th>
						<th scope="col">
							<div class="btn-group" role="group">
								Categoria
								<div class="btn-group-vertical">
									<a href="#" class="btn btn-xs btn-link p-0" style="margin: -4px 0px -4px 2px; !important;" onclick="consultarEmpleados(1, 'categoria', 'asc')">
										<i class="fa fa-sort-up"></i>
									</a>
									<a href="#" class="btn btn-xs btn-link p-0" style="margin: -4px 0px -8px 2px; !important;" onclick="consultarEmpleados(1, 'categoria', 'desc')">
										<i class="fa fa-sort-down"></i>
									</a>
								</div>
							</div>
						</th>
						<th scope="col">
							<div class="btn-group" role="group">
								Satisfacción 
								<div class="btn-group-vertical">
									<a href="#" class="btn btn-xs btn-link p-0" style="margin: -4px 0px -4px 2px; !important;" onclick="consultarEmpleados(1, 'Satisfaccion', 'asc')">
										<i class="fa fa-sort-up"></i>
									</a>
									<a href="#" class="btn btn-xs btn-link p-0" style="margin: -4px 0px -8px 2px; !important;" onclick="consultarEmpleados(1, 'Satisfaccion', 'desc')">
										<i class="fa fa-sort-down"></i>
									</a>
								</div>
							</div>
						</th>
						<th scope="col">Compañia</th>
						<th scope="col">Logo</th>
						<th scope="col">Acción</th>
					</tr>
				</thead>
				<tbody>
	`;

	$.each(response.data, function (i, item) {
		
		var logo = item.url_logo == "https://lorempixel.com/400/300/" ? item.url_logo : "http://127.0.0.1:8000/storage/"+item.url_logo;

		elementos += `
				<tr style="font-size:14px;">
					<th scope="row">${item.id}</th>
					<td>${item.name}</td>
					<td>${item.email}</td>
					<td>${item.category.categorie}</td>
					<td class="text-center">${item.satisfaction}</td>
					<td>${item.companie}</td>
					<td class="text-center"><img src="${logo}" class="img-thumbnail previsualizar" id="idPrevisualizar" width="50px"></td>
					<td style="text-align: center;">
						<span class="btn btn-danger btn-sm" onclick="eliminarFavorito('${item.id}', 0)">
							<span class="fa fa-trash"></span>
						</span>
					</td>
				</tr>
			`;
	});

	elementos += `
			</tbody>
		</table>
	`;
	
	
	var paginate = `
			<nav aria-label="...">
				<ul class="pagination">
			`;

	$.each(response.meta.links, function(i, link) {

		var state = link.active == true ? "active" : link.url == null ? "disabled" : "";

		paginate += `
					<li class="page-item ${state}">
						<a class='page-link' href='#' id='idPaginacion' onclick='paginacion(\"${link.url}\", 1)'>${link.label}</a>
					</li>
				`;
	});
	
	paginate += `
				</ul>
			</nav>
			`;

	$("#contenTablaEmpleadosFavoritos").html(elementos);
	$("#contenPaginateFavoritos").html(paginate);

}


// Limpia los campos despues de la insercion
function limpiarCampos() {
	
	$('#idNombre').val("");
	$('#idEmail').val("");
	$('#idArea').val("");
	$('#idEmpresa').val("");
	$('#idSatisfaccion').val("");
	$("#idCategoria").val($("#idCategoria option:first").val());
	$("#idFavorito").val($("#idFavorito option:first").val());
	$('#idLogo').val("");
	$("#idPrevisualizar").attr("src", "");

}

// Limpia los campos del formulario Actualizar Empleado
function limpiarCamposEditar() {

	$('#idKeyEmpleado').val("");
	$('#idEditNombre').val("");
	$('#idEditEmail').val("");
	$('#idEditArea').val("");
	$('#idEditEmpresa').val("");
	$('#idEditSatisfaccion').val("");
	$("#idEditCategoria").val($("#idEditCategoria option:first").val());
	$("#idEditFavorito").val($("#idEditFavorito option:first").val());
	$('#idLogoActual').val("");
	$("#idEditPrevisualizar").attr("src", "");
}
