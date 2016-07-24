/**
 * Created by Chris on 7/16/16.
 *
 * This interface/class is used to serialize from the HaloAPI to TypeScript objects.
 * Generally, import into each model and make each model implement Serializable<Class>
 */

export interface Serializable<T> {
  deserialize(input:Object):T;
}

class Member implements Serializable<Member> {
  id:number;

  deserialize(input) {
    this.id = input.id;
    return this;
  }
}
