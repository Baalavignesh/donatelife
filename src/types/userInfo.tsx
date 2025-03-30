interface UserInfo {
    username: string; // Required field
    donorOrganization?: boolean;
    location: { lat: number; long: number }; // Added location property
    _id: string; // Added _id property
    bloodGroup: string; // Added bloodGroup property
    phoneNumber: string; // Added phoneNumber property
    createdAt: string; // Added createdAt property
    [key: string]: any; // Allow for other properties
  }

  export type { UserInfo };