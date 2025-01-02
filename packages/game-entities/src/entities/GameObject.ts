import { animation, GameObjectOptions } from "../types";
import { generateUniqueId } from "../util";

export class GameObject {
  private _id: string;
  private _name: string;
  private _position: { x: number; y: number };
  private _size: { width: number; height: number };
  private _velacity: { x: number; y: number };
  private _animations: animation[];

  constructor(options: GameObjectOptions) {
    this._id = generateUniqueId();
    this._name = options.name;
    this._position = options.position || { x: 0, y: 0 };
    this._size = options.size;
    this._animations = options.animations;
    this._velacity = options.velacity || { x: 0, y: 0 };
  }

  // Getters
  get id(): string {
    return this._id;
  }
  get name(): string {
    return this._name;
  }

  get position() {
    return this._position;
  }

  get size() {
    return this._size;
  }
  get velacity() {
    return this._velacity;
  }

  get animation() {
    return this._animations;
  }
  // Setters

  set velacityX(xv: number) {
    this._velacity.x = xv;
  }
  set velacityY(yv: number) {
    this._velacity.y = yv;
  }

  set name(value: string) {
    if (!value) {
      throw new Error("Name cannot be empty.");
    }
    this._name = value;
  }

  set position(value: { x: number; y: number }) {
    if (!value || typeof value.x !== "number" || typeof value.y !== "number") {
      throw new Error(
        "Position must be an object with numeric x and y properties."
      );
    }
    this._position = value;
  }
  set x(value: number) {
    this._position.x = value;
  }
  get x() {
    return this._position.x;
  }
  set y(value: number) {
    this._position.y = value;
  }
  get y() {
    return this._position.y;
  }

  set size(value: { width: number; height: number }) {
    if (
      !value ||
      typeof value.width !== "number" ||
      typeof value.height !== "number"
    ) {
      throw new Error(
        "Size must be an object with numeric width and height properties."
      );
    }
    this._size = value;
  }

  serialize(): Record<string, any> {
    return {
      id: this._id,
      name: this._name,
      position: this._position,
      size: this._size,
      animations: this._animations,
      velacity: this._velacity,
    };
  }

  static deserialize<T extends typeof GameObject>(
    this: T,
    data: Record<string, any>
  ): InstanceType<T> {
    if (!data || typeof data !== "object") {
      throw new Error("Invalid data for deserialization.");
    }

    const { id, name, position, size, animations, velacity } = data;

    // Validate the deserialized data
    if (!name) {
      throw new Error("Missing required property 'name' for GameObject.");
    }
    if (!size) {
      throw new Error("Missing required property 'size' for GameObject.");
    }
    if (!animations) {
      throw new Error("Missing required property 'animations' for GameObject.");
    }
    if (!velacity) {
      throw new Error("Missing required property 'velacity' for GameObject.");
    }

    const InstanceGameObject = new this({
      name,
      position,
      size,
      animations,
      velacity,
    }) as InstanceType<T>;

    // Restore the ID if it exist
    if (id) InstanceGameObject._id = id;

    return InstanceGameObject;
  }
}
