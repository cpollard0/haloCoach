/**
 * Created by Chris on 7/24/16.
 */
  

export class MapMetadata {

  public name:string;
  public description:number;
  public imageUrl:number;
  public contentId:number;

  public constructor() {
  }


  deserialize(input) {

    //this.DesignationName = input.DesignationName;
    this.name = input.name;
    this.description = input.description;
    this.imageUrl = input.imageUrl;
    this.contentId = input.contentId;
    return this;
  }


}
