
create table categories (
    id bigserial not null,
    name text not null,
    logo text not null,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    constraint categories_pkey primary key (id)
) with (OIDS = FALSE);

create index IF NOT EXISTS categories_id on categories(id);

insert into categories (name, logo) values ('Food','food_logo'), ('Drink', 'drink_logo');