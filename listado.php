<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Seguimiento a Empleados</title>
	<!-- Styles CSS y Bootstrap -->
	<link rel="stylesheet" href="css/style.css">
	<link rel="stylesheet" type="text/css" href="librerias/bootstrap/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="librerias/datatable/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="librerias/datatable/dataTables.bootstrap4.min.css">
	<link rel="stylesheet" type="text/css" href="librerias/alertify/css/alertify.css">
	<link rel="stylesheet" type="text/css" href="librerias/alertify/css/themes/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="librerias/fontawesome/css/font-awesome.css">
	<!-- Favico Logo -->
	<!-- <link rel="shortcut icon" href="img/favicon.ico"> -->
</head>
<body>
	<header class="header">
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<a class="navbar-brand" href="index.php">MENU PRINCIPAL &nbsp;&nbsp;&nbsp;&nbsp;</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav mr-auto">
					<li class="nav-item active">
						<a class="nav-link" href="index.php">Inicio &nbsp;&nbsp;&nbsp;&nbsp;<span class="sr-only">(current)</span></a>
					</li>
					<li class="nav-item active">
						<a class="nav-link" href="listado.php">Empleados<span class="sr-only">(current)</span></a>
					</li>
				</ul>
			</div>
		</nav>
	</header>

	<div class="container">
		<div class="row">
			<div class="col-sm-12">
				<div class="card text-left">
					<div class="card-body">
						
						<span class="btn btn-info" id="verFavorito" data-toggle="modal" data-target="#modalVerFavoritos">
							Favoritos <span class="fa fa-eye"></span>
						</span>
						<span class="btn btn-primary" id="buscar" style="float:right" onclick="consultarEmpleados()">
							Buscar <span class="fa fa-search"></span>
						</span>
						<hr>
						<div class="row text-center d-flex justify-content-center align-items-center findRegistro">
							<div class="col-xs-12 col-sm-6 col-md-2">
								<input type="text" class="form-control" name="nombre" id="idFindNombre" placeholder="Nombre">
							</div>
							<div class="col-xs-12 col-sm-6 col-md-2">
								<input type="email" class="form-control" name="email" id="idFindEmail" placeholder="Email">
							</div>
							<div class="col-xs-12 col-sm-6 col-md-2">
								<input type="text" class="form-control" name="area" id="idFindArea" placeholder="Area">
							</div>
							<div class="col-xs-12 col-sm-6 col-md-2">
								<select type=select class="form-control" name="categoria" id="idFindCategoria">
									<option value="">Categoría</option>
								</select>
							</div>
							<div class="col-xs-12 col-sm-6 col-md-2">
								<input type="number" class="form-control" name="satisfacion" id="idFindSatisfaccion" placeholder="Satisfación">
							</div>
							<div class="col-xs-12 col-sm-6 col-md-2">
								<input type="text" class="form-control" name="compania" id="idFindCompania" placeholder="Compañia">
							</div>
						</div>
						<br>
						<div class="table-responsive" id="contenTablaEmpleados"></div> 

						<!-- Paginate -->
						<div class="row text-center d-flex justify-content-center align-items-center" id="contenPaginate"></div>

						<!-- Footer -->
						<div id="formFooter">
							<span>Copyright © <?php echo date("Y") ?> - Jorge Rincón - C.C. 1144128450</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Modal Ver Favoritos -->
	<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" id="modalVerFavoritos">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Monitorear Favoritos</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="row text-right d-flex align-items-right findRegistro">
						<div class="col-xs-12 col-sm-6 col-md-4">
							<input type="text" class="form-control" name="nombre" id="idFindNombreFav" placeholder="Nombre">
						</div>
						<div class="col-xs-12 col-sm-6 col-md-4">
							<select type=select class="form-control" name="categoria" id="idFindCategoriaFav">
								<option value="">Categoría</option>
							</select>
						</div>
						<div class="col-xs-12 col-sm-6 col-md-4">
							<input type="text" class="form-control" name="compania" id="idFindCompaniaFav" placeholder="Compañia">
						</div>
					</div>
					<br>
					<div class="table-responsive" id="contenTablaEmpleadosFavoritos"></div>
					<!-- Paginate -->
					 <br>
					<div class="row text-center d-flex justify-content-center align-items-center" id="contenPaginateFavoritos"></div>
				</div>
			</div>
		</div>
	</div>

	<!-- Modal Editar Empleado -->
	<div class="modal fade" id="modalEditarEmpleado" role="dialog">  
		<div class="modal-dialog">
			<div class="modal-content">
				<form role="form" method="PUT" id="idEditformRegistro" enctype="multipart/form-data">
				<!-- CABEZA DEL MODAL -->
					<div class="modal-header modalTitleEditReg">
						<h4 class="modal-title">Editar Empleado</h4>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<!-- CUERPO DEL MODAL -->
					<div class="modal-body contenEditFormReg">
						<div class="box-body">
							<div class="row">
								<input type="hidden" name="keyEmpleado" id="idKeyEmpleado">
								<!-- ENTRADA PARA EL NOMBRE -->
								<div class="col-xs-12 col-sm-6 col-md-6 form-group">
									<div class="input-group">
										<input type="text" class="form-control" name="editNombre" id="idEditNombre" placeholder="Nombre Completo">
									</div>
								</div>
								<!-- ENTRADA PARA EL CORREO -->
								<div class="col-xs-12 col-sm-6 col-md-6 form-group">
									<div class="input-group">
										<input type="email" class="form-control" name="editEmail" id="idEditEmail" placeholder="Correo Electrónico" disabled>
									</div>
								</div>
							</div>
							<div class="row">
								<!-- ENTRADA PARA EL AREA -->
								<div class="col-xs-12 col-sm-6 col-md-6 form-group">
									<div class="input-group">
										<input type="text" class="form-control input-lg" name="editArea" id="idEditArea" placeholder="Área">
									</div>
								</div>
								<!-- ENTRADA PARA LA CATEGORIA -->
								<div class="col-xs-12 col-sm-6 col-md-6 input-group">
									<select type=select class="form-control input-lg" name="editCategoria" id="idEditCategoria">
										<option value="">Categoría:</option>
									</select>
								</div>
							</div>
							<div class="row">
								<!-- ENTRADA PARA LA EMPRESA -->
								<div class="col-xs-12 col-sm-6 col-md-6 form-group">
									<div class="input-group">
										<input type="text" class="form-control input-lg" name="editEmpresa" id="idEditEmpresa" placeholder="Empresa">
									</div>
								</div>
								<!-- ENTRADA PARA EL NIVEL DE SATISFACCION -->
								<div class="col-xs-12 col-sm-6 col-md-6 form-group">
									<div class="input-group">
									<input type="number" class="form-control input-lg" minlength="1" maxlength="100" name="editSatisfaccion" id="idEditSatisfaccion" placeholder="Nivel de Satisfacción">
									</div>
								</div>
							</div>
							<div class="row">
								<!-- ENTRADA PARA SUBIR EL LOGO -->
								<div class="col-xs-12 col-sm-6 col-md-6 form-group">
									<input type="file" class="form-control input-lg classEditLogo" name="editLogo" id="idEditLogo" placeholder="Logo">
									<div class="panel">Subir Logo</div>
									<img src="" class="img-thumbnail editPrevisualizar" id="idEditPrevisualizar" width="100px">
								</div>
								<!-- ENTRADA PARA MARCAR FAVORITO -->
								<div class="col-xs-12 col-sm-6 col-md-6 input-group">
									<select type=select class="form-control input-lg" name="editfavorito" id="idEditFavorito">
										<option value="">Favorito:</option>
										<option value="1">Si</option>
										<option value="0">No</option>
									</select>
								</div>
							</div>
						</div>
					</div>
					<!-- PIE DEL MODAL -->
					<div class="modal-footer">
						<button type="button" class="btn btn-primary btnEditarEmpleados" id="idBtnEditarEmpleados">Actualizar</button>
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
					</div>
				</form>
			</div>
		</div>
	</div>

	<script src="librerias/jquery.min.js"></script>
	<script src="librerias/bootstrap/popper.min.js"></script>
	<script src="librerias/bootstrap/bootstrap.min.js"></script>
	<script src="librerias/datatable/jquery.dataTables.min.js"></script>
	<script src="librerias/datatable/dataTables.bootstrap4.min.js"></script>
	<script src="librerias/alertify/alertify.js"></script>
	<!-- Javascripts -->
	<script type="text/JavaScript" src="js/jquery.numeric.js?v=<?php echo (rand()); ?>"></script>
	<script type="text/JavaScript" src="js/sweetalert2.min.js?v=<?php echo (rand()); ?>"></script>
	<script type="text/JavaScript" src="js/scriptEmpleados.js?v=<?php echo (rand()); ?>"></script>

</body>
</html>