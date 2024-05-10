export interface Cities {
  id: string;
  name: string;
  url: string;
  type: string;
  substops: Substop[];
}

export interface Substop {
  id: string;
  name: string;
  url: string;
  type: string;
}
