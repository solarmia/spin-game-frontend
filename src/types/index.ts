export type depositProps = {
  address: string,
  amount: number,
  tx: string
}

export type gameProps = {
  address: string,
  prize: Array<Item>
}

export type fetchProps = {
  address: string
}

export type Item = {
  name: string;
  img: string;
  percentpage: number;
};
