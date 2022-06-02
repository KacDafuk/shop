export interface SignInData {
  password: string;
  email: string;
}
export interface UserData {
  email: string;
  password: string;
  repeatPassword: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  city: string;
  address: string;
}
export interface UserDataFetch extends UserData {
  cart: UserCart;
}
export type UserCart = {
  [key: number]: number; //key represents id of particular item while object[key] how many instances of particuler item user
  // wants yo buy
};
