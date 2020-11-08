import models from '../database/models';
import QueriesClass from './queriesClass';


const { driver } = models;

class DriverService extends QueriesClass {
 constructor() {
     super();
     this.model = driver
 }
}

export default new DriverService();
