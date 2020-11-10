create database websocketDB
go
use websocketDB
go
create table perfiles(
	id int identity (1,1) not null,
	idFotoCloud varchar(600) not null ,
	urlFotoCloud varchar(600) not null ,
	idFondoCloud varchar(600) not null ,
	urlFondoCloud varchar(600) not null 
	constraint pk_perfiles primary key(id)
)
go
create table usuarios(
	id int identity (1,1) not null,
	email varchar(50) not null unique,
	pw varchar(600) not null,
	nombre varchar(50) not null ,
	apellido varchar(50) not null,
	idPerfil int not null
	constraint pk_usuarios primary key(id) ,
	constraint fk_usuarios_perfiles foreign key (idPerfil) references perfiles (id)
)
go
create table estados (
id int identity (1,1) not null,
nombre varchar(50) not null
constraint pk_estados primary key(id)
)
go
create table amigos(
id int identity (1,1) not null,
idUsuario int not null,
idAmigo int not null,
idEstado int not null
constraint pk_amigos primary key(id) , 
constraint fk_amigos_usuario foreign key (idUsuario) references usuarios (id) ,
constraint fk_amigos_amigo foreign key (idAmigo) references usuarios (id),
constraint fk_amigos_estado foreign key (idEstado) references estados (id)
)
go
insert into estados (nombre) values 
('APROBADO'),
('DENEGADO'),
('PENDIENTE')
go
create procedure pa_login
	@emailUsuario varchar(50)
	as
		begin
			select u.email as emailUsuario , u.pw as pwUsuario , u.nombre as nombreUsuario , u.apellido as apellidoUsuario , u.idPerfil as idPerfil
			from usuarios u
			where u.email = @emailUsuario
		end
go
create procedure pa_singup
	@emailUsuario varchar(50) ,
	@pwUsuario varchar(600) ,
	@nombreUsuario varchar(50),
	@apellidoUsuario varchar(50)
	as
		begin		
			declare @idPerfil int
			begin transaction 
			begin try			
				insert into perfiles (idFotoCloud,urlFotoCloud,idFondoCloud,urlFondoCloud) 
				values
				('editar' , 'editar' , 'editar' , 'editar') 				
				set @idPerfil  = @@IDENTITY
				insert into usuarios (email , pw , nombre , apellido , idPerfil) values 
				(@emailUsuario , @pwUsuario , @nombreUsuario , @apellidoUsuario , @idPerfil)
				commit 
				select 'USUARIO GUARDADO EXITOSAMENTE'  as OK
			end try
			begin catch
				rollback 
				select 'ERROR TRANSACTION' + ERROR_MESSAGE()  as noOK
			end catch				
		end

		select * from perfiles
		select * from usuarios

		delete usuarios
		delete perfiles

		exec pa_singup 
		'javier_85@hotmail.com' , 
		'belgrano455' ,
		'javier' ,
		'Sosa'

 