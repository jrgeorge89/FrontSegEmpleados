<!DOCTYPE html>
<html lang="es">

<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Seguimiento a Empleados</title>
	<!-- Styles CSS y Bootstrap -->
	<link rel="stylesheet" href="css/style.css">
	<link rel="stylesheet" href="css/sweetalert2.css">
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/jquery-ui-1.12.1.css">
	<link rel="stylesheet" href="css/font-awesome.min.css" />
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

	<div class="wrapper fadeInDown">
		<div id="formContent">
			<!-- Header -->
			<div class="fadeIn first">
				<h1 class="formTitle">Registro de Empleados</h1>
			</div>
			<!-- Formulario -->
			<div class="card">
				<div class="card-body">

					<h6 class="card-title">Seguimiento de la Satisfacción de los Empleados</h6>
					<form method="POST" id="idformRegistro" enctype="multipart/form-data">
						<div class="form-row contenFormRegistro">
							<div class="col-xs-12 col-sm-6 col-md-4">
								<input type="text" class="form-control" name="nombre" id="idNombre" placeholder="Nombre Completo" required>
							</div>
							<div class="col-xs-12 col-sm-6 col-md-4">
								<input type="email" class="form-control" name="email" id="idEmail" placeholder="Correo Electrónico" required>
							</div>
							<div class="col-xs-12 col-sm-6 col-md-4">
								<input type="text" class="form-control" name="area" id="idArea" placeholder="Área" required>
							</div>
							<div class="col-xs-12 col-sm-6 col-md-4">
								<select type=select class="form-control" name="categoria" id="idCategoria" required>
									<option value="">Categoría:</option>
								</select>
							</div>
							<div class="col-xs-12 col-sm-6 col-md-4">
								<input type="text" class="form-control" name="empresa" id="idEmpresa" placeholder="Empresa" required>
							</div>
							<div class="col-xs-12 col-sm-6 col-md-4">
								<input type="number" class="form-control" id="idSatisfaccion" minlength="1" maxlength="100" name="satisfaccion" placeholder="Nivel de Satisfacción" required>
							</div>
							<div class="col-xs-12 col-sm-6 col-md-4">
								<select type=select class="form-control" name="favorito" id="idFavorito" required>
									<option value="">Favorito:</option>
									<option value="1">Si</option>
									<option value="0">No</option>
								</select>
							</div>
							<div class="col-xs-12 col-sm-6 col-md-4">
								<input type="file" class="form-control" name="logo" id="idLogo" class="classLogo" placeholder="Logo" required>
								<img src="" class="img-thumbnail previsualizar" id="idPrevisualizar" width="100px">
							</div>
							<br>
							<div class="col-xs-12 col-sm-6 col-md-4" id="contenBtnRegistrarEmpleados">
								<button class="btn btn-primary btnRegistrarEmpleados" id="idBtnRegistrarEmpleados">Registrar</button>
							</div>
						</div>
					</form>
				</div>
			</div>
			<!-- Footer -->
			<div id="formFooter">
				<span>Copyright © <?php echo date("Y") ?> - Jorge Rincón - C.C. 1144128450</span>
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