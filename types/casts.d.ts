type CAST = {
  cast_code: number;
  staff_id: number | null;
  id: number;
  introducer_id: number;
  leaving_date: string | null;
  media_id: number;
  name: string;
  address: string;
  birthday: string;
  phone_number: string;
  real_name: string;
  real_name_ruby: string;
  remarks: string;
  display: number;
  section: number;
  entry_date: string | null;
};

type CASTS = {
  cast: [CAST];
};

type STORE_CASTS = {
  store_cast: [CASTS];
};

type SEARCH_CASTS = {
  cast: [STORE_CASTS];
};
