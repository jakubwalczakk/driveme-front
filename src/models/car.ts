import { CarBrand } from '../enums/carBrand';
import{GasType} from '../enums/gasType';

export class Car {
    id: number;
    brand: CarBrand;
    model:string;
    licensePlate:string;
    gasType: GasType;
    //here should be the photo of car
    active: boolean;

}