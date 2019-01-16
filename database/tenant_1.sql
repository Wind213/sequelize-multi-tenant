CREATE DATABASE tenant_1;
create table Tasks
(
	Id int auto_increment
		primary key,
	Description varchar(100) not null,
	Done bit default b'0' not null,
	TaskTypeId int not null,
	UserId int not null
);
INSERT INTO tenant_1.Tasks (Id, Description, Done, TaskTypeId, UserId) VALUES (1, 'Create SCHEMA schemas', false, 1, 1);
INSERT INTO tenant_1.Tasks (Id, Description, Done, TaskTypeId, UserId) VALUES (2, 'Create express app', false, 2, 1);