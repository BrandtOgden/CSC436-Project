create database Climbing;
use Climbing;

create table c_user (
	id int,
    u_name char(20),
    age int,
    pronouns char(20),
    ability char(20),
    date_of_birth char(20),
    primary key (id)
);

create table climb_information (
	id int,
    c_name char(30),
    grade numeric(3, 2),
    location char(30),
    primary key(id)
);

create table c_event (
	id int,
    e_name char(30),
    location char(30),
	e_time char(10),
    primary key (id)
);

create table post (
	id int,
    title char(20),
    description varchar(100),
    picture_url varchar(100),
    primary key (id)
);

create table gym (
	id int,
    g_name char(30),
    address char(30),
    primary key (id)
);