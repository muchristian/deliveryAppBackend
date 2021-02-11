import RequestService from "../services/RequestService";
import DriverService from "../services/DriverService";



export default class requestController {
  static async driverApproveRequest(req, res) {
    const { id:driver_id } = req.sessionUser;
    try {
      await RequestService.updateBy(
        {driverId: driver_id, req_status: 'Started'}, {
          [Op.and]: [
          { id: req.params },
          { driverId: null }
        ]
      });
      await DriverService.updateBy({isOpen: 0}, {id: driver_id});
      return res.status(200).json({
        message: "Request accepted successfully",
    })
    } catch(e) {
      return res.status(400).json({
        message: "Check if all required data received well"
    })
    }
  } 


  static async driverCloseRequest(req, res) {
    const { id:driver_id } = req.sessionUser;
    try {
      await RequestService.updateBy(
        {driverId: null, req_status: 'Pending'}, {
          [Op.and]: [
          { id: req.params },
          { driverId: driver_id }
        ]
      });
      await DriverService.updateBy({isOpen: 1}, {id: driver_id});
      return res.status(200).json({
        message: "Request closed successfully",
    })
    } catch(e) {
      return res.status(400).json({
        message: "Check if all required data received well"
    })
    }
  } 


  static async confirmIfDelived(req, res) {
    const { requestId, driverId } = req.params;
    
    try {
      await RequestService.updateBy(
        {req_status: 'Delived'}, {
          [Op.and]: [
          { id: requestId },
          { driverId: driverId }
        ]
      });
      await DriverService.updateBy({isOpen: 1}, {id: driverId});
      return res.status(200).json({
        message: "Request delived successfully",
    })
    } catch(e) {
      return res.status(400).json({
        message: "Check if all required data received well"
    })
    }
  } 
} 

