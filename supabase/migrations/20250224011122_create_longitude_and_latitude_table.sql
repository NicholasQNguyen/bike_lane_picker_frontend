create table
    longitude_and_latitude (
                  longitude_and_latitude_id bigint primary key generated always as identity,
                  longitude float8,
                  latitude float8,
                  created_at timestamptz default now()
);
