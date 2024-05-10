export interface DetailCities {
  id: string;
  displayName: string;
  name: string;
  state: string;
  url: string;
  latitude: string;
  longitude: string;
  type: string;
  station: Station[];
}

export interface Station {
  id: string;
  displayName: string;
  name: string;
  state: string;
  country: string;
  url: string;
  latitude: string;
  longitude: string;
  address: string;
  zipcode: string;
  type: string;
  images: string[];
}
