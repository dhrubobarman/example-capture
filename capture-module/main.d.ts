type ElementData = {
    tag: string;
    attributes: Record<string, string>;
    selector: string | null | undefined;
    htmlBox: DOMRect;
    element: HTMLElement;
    success: boolean;
};
type InspectorProps = {
    onElementClick?: (e: MouseEvent, data: ElementData) => void;
    update?: (delta: number) => void;
    startMessage?: string;
    countdownTimeInSeconds?: number;
    highlightColor?: string;
    falseHighlightColor?: string;
};
type StepData = {
    _id: string;
    title: string;
    url: string;
    learned: boolean;
    description?: string;
    steps: Step[];
};
type Step = {
    title: string;
    description?: string;
    target?: string;
    _id: string;
};

declare class CaptureUI {
    ui: UI;
    container: HTMLDivElement;
    collapseButton: HTMLButtonElement;
    private sidebarDragHandle;
    private modal;
    private startButton;
    stepData: StepData;
    private modalFooterContainer;
    started: boolean;
    private modalContentContainer;
    private saveButton;
    private sidebarUl;
    private resumeButton;
    listTitle: HTMLInputElement;
    cardActions: HTMLDivElement;
    paused: boolean;
    name: string;
    onContainerClick: (container: HTMLElement, name: string) => void;
    constructor(ui: UI, name: string, onContainerClick?: (container: HTMLElement, name: string) => void);
    private init;
    initDND(name: string, handleZIndex: (container: HTMLElement, name: string) => void): void;
    private initInspector;
    private handleOpenEditModal;
    private initButtons;
    private openNameInputDialog;
    private openCaptureDialog;
    private updateStepContent;
    private addListItem;
    renderStepDataList(data: StepData): void;
    private removeItemFromStepData;
    pause(): void;
    resume(): void;
    private startCapturing;
    stopCapturing(): void;
    private clearModal;
    private closeModal;
    private getInputValue;
    private save;
}

declare class SavedStepUI {
    ui: UI;
    container: HTMLElement;
    savedSidebarHeader: HTMLDivElement;
    private savedSidebarUl;
    private collapseButton;
    private savedSidebarDragHandle;
    private stepData;
    private interval;
    private retryConnection;
    name: string;
    onContainerClick: (container: HTMLElement, name: string) => void;
    constructor(ui: UI, name: string, onContainerClick?: (container: HTMLElement, name: string) => void, container?: HTMLElement);
    private init;
    initDND(name: string, handleZIndex: (container: HTMLElement, name: string) => void): void;
    private renderStepData;
    private deleteStepData;
    fetchData(): Promise<StepData[] | undefined>;
}

type useIndexedDbProps = {
    /**
     * The name of the IndexedDB database.
     * @default "indexed-db"
     */
    dbName?: string;
    /**
     * The name of the object store within the database.
     */
    storeName: string;
    /**
     * The unique key for the object store.
     */
    uniqueKey: string;
    /**
     * Enable or disable debug mode.
     */
    debug?: boolean;
    /**
     * The version of the IndexedDB database.
     * @default 1
     */
    version?: number;
};
/**
 * Custom hook for interacting with IndexedDB.
 * @param dbName - The name of the database.
 * @param storeName - The name of the object store.
 * @param uniqueKey - The unique key for the object store.
 * @param debug - Flag to enable debug mode.
 * @param version - The version of the database.
 * @returns An object containing methods to interact with the IndexedDB store.
 */
declare class IndexedDb<T> {
    /** Indicates if the database is ready. */
    isDBReady: boolean;
    private version;
    private dbName;
    private storeName;
    private key;
    private debug;
    constructor({ dbName, storeName, uniqueKey, debug, version }: useIndexedDbProps);
    init(): Promise<void>;
    handleInitDB(): Promise<void>;
    /**
     * Adds data to the IndexedDB store.
     * @param data - The data to add.
     * @returns A promise that resolves to the added data, a string, or null.
     */
    addData(data: T): Promise<T | string | null>;
    /**
     * Deletes data from the IndexedDB store.
     * @param key - The key of the data to delete.
     * @returns A promise that resolves to a boolean indicating success.
     */
    deleteData(key: string | number): Promise<boolean>;
    /**
     * Updates data in the IndexedDB store.
     * @param key - The key of the data to update.
     * @param data - The new data.
     * @returns A promise that resolves to the updated data, a string, or null.
     */
    updateData(key: string | number, data: T): Promise<T | string | null>;
    getSingleItem(key: string): Promise<T | null>;
    /**
     * Retrieves all data from the IndexedDB store.
     * @returns A promise that resolves to an array of data.
     */
    getStoreData(): Promise<T[]>;
}

declare class UI {
    inspector: Inspector;
    captureUI: CaptureUI;
    savedStepUI: SavedStepUI;
    indexedDb: IndexedDb<StepData>;
    constructor(inspector: Inspector);
    show(): void;
    hide(): void;
    initDND(): void;
    handleZIndex(container: HTMLElement, name: string): void;
}

declare class Elements {
    inspector: Inspector;
    hoverElement: HTMLDivElement;
    isHoverElementAddedToDOM: boolean;
    targetElement: HTMLElement;
    targetElementData: ElementData;
    highlightColor: string;
    falseHighlightColor: string;
    constructor(inspector: Inspector, highlightColor: string, falseHighlightColor: string);
    createHoverElement(): void;
    addElementToDom(): void;
    removeElementFromDom(): void;
    getSelector(element: HTMLElement): string | null | undefined;
    escapeTailwindClassNames(classNames: string): string;
    getElementData(element: HTMLElement): ElementData | null;
    highlightElement(): void;
    getElementDataFromSelector(selectorQuery: string | undefined | null): ElementData | null;
    createElement<T extends keyof HTMLElementTagNameMap>(tag: T, attributes?: Partial<HTMLElementTagNameMap[T]>): HTMLElementTagNameMap[T];
    update(): void;
    render(): void;
}

declare class Messages {
    inspector: Inspector;
    countdownInSeconds: number;
    elements: Elements;
    countDown: number;
    messageContainer: HTMLDivElement;
    counterElement: HTMLHeadingElement;
    interval: NodeJS.Timeout;
    timeout: NodeJS.Timeout;
    isChildPresent: boolean;
    messageElement: HTMLParagraphElement;
    startMessage: string;
    constructor(inspector: Inspector, elements: Elements, countdownInSeconds?: number, startMessage?: string);
    init(): void;
    clear(): void;
    showCountdown(callback: () => void): void;
}

declare class Inspector {
    isInspecting: boolean;
    private boundKeydown;
    private boundMousedown;
    private boundMouseOver;
    private boundContextMenu;
    elements: Elements;
    isListenerAttached: boolean;
    onElementClick?: (e: MouseEvent, data: ElementData) => void | undefined;
    updateFN?: (delta: number) => void | undefined;
    messages: Messages;
    ui: UI;
    constructor({ onElementClick, update, startMessage, countdownTimeInSeconds, highlightColor, falseHighlightColor }: InspectorProps);
    show(): void;
    hide(): void;
    private addEventListeners;
    removeEventListeners(): void;
    private handleKeydown;
    private handleMouseDown;
    private handleMouseOver;
    private handleContextMenu;
    pause(): void;
    resume(): void;
    stopCapturing(): void;
    startCapturing(): void;
    private animate;
    private update;
    private render;
}

declare class Main {
    inspector: Inspector;
    start(): void;
    stop(): void;
    getAllData(): Promise<StepData[] | undefined>;
}

export { type ElementData, Inspector, type InspectorProps, type Step, type StepData, Main as default };
