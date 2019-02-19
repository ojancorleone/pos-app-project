
create table users (
    id bigserial not null,
    username text not null,
    firstname text not null,
    lastname text not null,
    email text not null,
    role text not null,
    access_token text null,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    constraint users_pkey primary key (id)
) with (OIDS = FALSE);

create index IF NOT EXISTS users_id on users(id);
create index IF NOT EXISTS users_email_index on users(email);
create index IF NOT EXISTS users_username_index on users(username);

insert into
    users (
        username,
        firstname,
        lastname,
        email,
        role
    )
values
    (
        'fauzanhilmyabyan@gmail.com',
        'Fauzan Hilmy',
        'Abyan',
        'fauzanhilmyabyan@gmail.com',
        'admin'
    ),
    (
        'inventory01',
        'Inventory',
        '01',
        'inventory01@gmail.com',
        'inventory'
    ),
    (
        'cashier01',
        'Cashier',
        '01',
        'cashier01@gmail.com',
        'cashier'
    );