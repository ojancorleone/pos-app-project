/* Replace with your SQL commands */
create table products (
    id bigserial not null,
    name text not null,
    description text not null,
    category_id bigint not null,
    stock bigint not null,
    price bigint not null,
    discounted_price bigint,
    image_url text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    constraint products_pkey primary key (id)
) with (OIDS = FALSE);

create index IF NOT EXISTS products_id on products(id);

insert into
    products (
        name,
        description,
        category_id,
        stock,
        price
    )
values
    (
        'Kopi ABC',
        'Minuman Kopi Hitam',
        2,
        10,
        10000
    ),
    (
        'Nasi Goreng',
        'Makanan Nasi Goreng Telur Ayam',
        1,
        7,
        20000
    ),
    (
        'Seblak',
        'Makanan Kerupuk Basah Seblak',
        1,
        12,
        12000
    );