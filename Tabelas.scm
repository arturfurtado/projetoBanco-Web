CREATE TABLE Cores (
	Id_Color int NOT NULL PRIMARY KEY,
	Cor VARCHAR ( 50 )
);

CREATE TABLE Carros (
	Id int not null,
	Serie VARCHAR ( 50 ) NOT NULL,
	Marca VARCHAR ( 50 ) NOT NULL,
	Modelo VARCHAR ( 50 ) NOT NULL,
	Cor int not null,
	FOREIGN key (Cor) references Cores(Id_Color),
	Ano date  NOT null,
	primary key (Id)
);

CREATE TABLE Estado (
	Sigla_estado VARCHAR ( 50 ) not null,
	Nome_estado VARCHAR ( 85 ),
	primary key (Sigla_Estado)
);

CREATE TABLE Municipio (
	Sigla_estado VARCHAR ( 50 ) not null,
	FOREIGN key (Sigla_estado) references Estado(Sigla_estado),
	Codigo_muni int,
	Nome_muni VARCHAR ( 85 ),
	primary key (Codigo_muni)
);

CREATE TABLE Cliente (
	Id int not null,
	Nome VARCHAR ( 50 ),
	CPF VARCHAR ( 50 ) not null,
	RG VARCHAR ( 50 ) not null,
	Telefone VARCHAR ( 50 ),
	Estado VARCHAR ( 50 ) not null,
	FOREIGN KEY (Estado) REFERENCES Estado (Sigla_estado),
	Cidade int not null,
	FOREIGN KEY (Cidade) REFERENCES Municipio (Codigo_muni),
	primary key (Id)
);
