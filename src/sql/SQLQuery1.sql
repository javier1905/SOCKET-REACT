create database websocket
go
use websocket
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
	pw varchar(50) not null,
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
