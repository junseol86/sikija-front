import {DeliveryState} from "../Models/Delivery";
/**
 * Created by Hyeonmin on 2017-03-16.
 */
export class SingletonService
{
  message:number = 0;
  deliveryState: DeliveryState = null;

  static instance:SingletonService;
  static isCreating:Boolean = false;

  constructor() {
    if (!SingletonService.isCreating) {
      throw new Error('SINGLETON SERVICE ERROR');
    }
  }

  static getInstance() {
    if (SingletonService.instance == null) {
      SingletonService.isCreating = true;
      SingletonService.instance = new SingletonService();
      SingletonService.isCreating = false;
    }

    return SingletonService.instance;
  }

  getDeliveryState():DeliveryState {
    if (this.deliveryState == null)
      this.deliveryState = new DeliveryState();
    return this.deliveryState;
  }

  checkDeliveryState():boolean {
    return this.deliveryState != null;
  }

  setDeliveryStateNull():void {
    this.deliveryState = null;
  }
}

