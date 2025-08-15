import PriorityQueue from 'javascript-priority-queue';
import {removeOnIndex} from "./common";

export enum Priority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH"
}

export interface ISemaphoreItem<T> {
    id: string;
    priority: Priority,
    process: () => Promise<T>;
}

interface IItem<T> extends ISemaphoreItem<T> {
    resolve?: (data: T) => void;
}

export class Semaphore {
    private readonly _concurrentProcessCount: number;
    private readonly _queue: PriorityQueue;
    private _processesInProgress: number;
    private readonly _priorityHistory: number[];
    private readonly _ignoredIds: string[];

    constructor(concurrentProcessCount: number) {
        this._queue = new PriorityQueue('max');
        this._processesInProgress = 0;
        this._concurrentProcessCount = concurrentProcessCount;
        this._ignoredIds = [];
        this._priorityHistory = [10000, 20000, 30000];
    }

    public add<T>(item: ISemaphoreItem<T>): Promise<T> {
        const queueItem: IItem<T> = {
            priority: item.priority,
            process: item.process,
            id: item.id
        }
        this._queue.enqueue(queueItem, this.resolvePriority(item.priority));
        const pr = new Promise<T>((resolve) => {
            queueItem.resolve = resolve;
        });
        this.processNext();
        return pr;
    }

    public stopProcess(ids: string[]) {
        this._ignoredIds.push(...ids);
    }

    private async processNext() {
        if (this._processesInProgress < this._concurrentProcessCount) {
            const item = this.getItemFromQueue();
            if (item) {
                await this.process(item);
            }
        }
    }

    private getItemFromQueue<T>(): IItem<T>|null {
        if (this._queue.size()) {
            const item = this._queue.dequeue();
            const index = this._ignoredIds.indexOf(item.id);
            if (index > -1) {
                removeOnIndex(this._ignoredIds, index);
                return this.getItemFromQueue();
            } else {
                return item;
            }
        }
        return null;
    }

    private async process<T>(item: IItem<T>) {
        this._processesInProgress++;
        try {
            const data = await item.process();
            if (item.resolve) {
                item.resolve(data);
            }
        }
        finally {
            this._processesInProgress--;
            this.processNext();
        }
    }

    private resolvePriority(priority: Priority) {
        switch (priority) {
            case Priority.LOW:
                this._priorityHistory[0]--;
                return this._priorityHistory[0];
            case Priority.MEDIUM:
                this._priorityHistory[1]--;
                return this._priorityHistory[1];
            case Priority.HIGH:
                this._priorityHistory[2]--;
                return this._priorityHistory[2];
        }
    }
}