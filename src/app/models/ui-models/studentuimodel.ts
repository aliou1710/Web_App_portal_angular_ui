import { Address } from "./addressuimodel";
import { Gender } from "./genderuimodel";

export interface student{
  id: string,
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  email: string,
  mobile: number,
  profileImageUrl: string,
  genderId: string,
  gender : Gender,
  address: Address
}
