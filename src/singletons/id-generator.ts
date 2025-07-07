import {component} from "ironbean";
import {INT_32_MAX_VALUE} from "../utils/common";

export enum IdType {
    STOP,
    CUSTOM,
    MEDIA
}

class IdSet {
    private _set: Set<number>;
    private lastItem: number = 0;

    constructor() {
        this._set = new Set<number>();
    }

    get last() {
        return this.lastItem;
    }

    public add(value: number) {
        this._set.add(value);
        this.lastItem = value;
        return this;
    }

    public has(val: number) {
        return this._set.has(val);
    }
}

@component
export class IdGenerator {
    private readonly customItems: IdSet;
    private readonly stops: IdSet;
    private readonly media: IdSet;

    constructor() {
        this.customItems = new IdSet();
        this.stops = new IdSet();
        this.media = new IdSet();
    }

    public getId(type: IdType): number {
        return this.generateId(this.getSet(type));
    }

    public setIds(ids: number[], type: IdType) {
        this.initSet(this.getSet(type), ids);
    }

    public hasId(id: number, type: IdType): boolean {
        return this.getSet(type).has(id);
    }

    private initSet(set: IdSet, ids: number[]) {
        ids.sort((a, b) => a - b).forEach(id => set.add(id))
    }

    private generateId(set: IdSet) {
        const addId = (id: number): number => {
            if (id >= INT_32_MAX_VALUE) {
                return addId(1);
            }
            if (set.has(id)) {
                return addId(id + 1);
            }
            set.add(id);
            return id;
        }
        return addId(set.last + 1);
    }

    private getSet(type: IdType): IdSet {
        switch (type) {
            case IdType.CUSTOM:
                return this.customItems;
            case IdType.STOP:
                return this.stops;
            case IdType.MEDIA:
                return this.media;
            default:
                throw new Error(`Type: ${type} is not supported in Id generator`);
        }
    }
}