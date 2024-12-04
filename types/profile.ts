export interface BusinessProfile {
    id?: number;
    companyname: string
    websiteurl: string
    accounttype: string
    accountplan: string
    industry: string
    registrationnumber: string
    dateregistered: string
    lastlogin: string
    email: string
    phonenumber: string
    address: string
    photourl?: string
    countryregion: string
    zipcode: string
    streetaddress: string
    city: string
    state: string
    status: 'active' | 'inactive'
  }
  
  