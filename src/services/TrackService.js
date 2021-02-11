import models from '../database/models';
import QueriesClass from './queriesClass';


const { track } = models;

class TrackService extends QueriesClass {
 constructor() {
     super();
     this.model = track
 }
}

export default new TrackService();