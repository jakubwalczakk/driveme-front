export class Address {
    id: number;
    city: string;
    zipCode: string;
    street: string;
    houseNo: string;

    constructor(id: number, city: string, zipCode: string, street: string, houseNo: string) {
        this.id = id;
        this.city = city;
        this.zipCode = zipCode;
        this.street = street;
        this.houseNo = houseNo;
    }
}