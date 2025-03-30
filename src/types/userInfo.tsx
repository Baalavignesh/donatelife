interface UserInfo {
  username: string;
  donorOrganization?: boolean;
  location: {
    type: 'Point';
    coordinates: number[];
  };
  _id: string;
  bloodGroup: string;
  phoneNumber: string;
  password?: string;
  createdAt: Date;
  __v?: number;
  [key: string]: any;
}

interface BankInfo {
  _id: string;
  username: string;
  donorOrganization: string;
  location: {
    lat: number;
    long: number;
  };
  phoneNumber: string;
  password?: string;
  createdAt: Date;
  __v?: number;
  [key: string]: any;
}
  export type { UserInfo, BankInfo };