import models from '../database/models';
import api_feature from '../database/models/api_feature';
import QueriesClass from './queriesClass';


const { api_feature } = models;

class ApiFeatureService extends QueriesClass {
 constructor() {
     super();
     this.model = api_feature
 }
}

export default new ApiFeatureService();
