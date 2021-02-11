import models from '../database/models';
import QueriesClass from './queriesClass';


const { request_detail } = models;

class RequestDetailService extends QueriesClass {
 constructor() {
     super();
     this.model = request_detail
 }
}

export default new RequestDetailService();