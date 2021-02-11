import models from '../database/models';
import QueriesClass from './queriesClass';


const { vehicle } = models;

class VehicleService extends QueriesClass {
 constructor() {
     super();
     this.model = vehicle
 }
}

export default new VehicleService();
