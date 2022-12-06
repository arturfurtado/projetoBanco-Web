
select * from municipio m ;
select * from municipio;
select * from cliente ;
select * from carros c ;
select * from cores c;
select * from aluguel_ticket;


create view Tickets as
select
	Id_ticket,
	Id_carro,
	(select c.Marca from carros c where c.Id = at2.Id_carro), 
	Id_cliente,
	(select	c2.Nome from cliente c2 where c2.Id = at2.Id_cliente),
	Data_recebimento,
	Data_devolutiva
from
	aluguel_ticket at2 ;

select * from tickets t;

alter table carros add updatedAt DATE;


alter table carros add updatedAt DATE;

ALTER TABLE carros 
  DROP COLUMN updatedAt;

select * from carros c ;


DELETE FROM projeto.carros
WHERE Id=9;

