CREATE DATABASE tenant_2;
create table Tasks
(
	Id int auto_increment
		primary key,
	Description varchar(100) not null,
	Done bit default b'0' not null,
	TaskTypeId int not null,
	UserId int not null
);
INSERT INTO tenant_2.Tasks (Id, Description, Done, TaskTypeId, UserId) VALUES (1, 'Create tables', false, 1, 2);
INSERT INTO tenant_2.Tasks (Id, Description, Done, TaskTypeId, UserId) VALUES (2, 'Create the UI', false, 3, 2);
