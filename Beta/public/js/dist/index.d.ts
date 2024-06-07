declare class RecorderManager {
    /**
     * creating function
     * @param processorPath 
     *
     */
    constructor(processorPath: string);
    private audioBuffers;
    private processorPath;
    private audioContext?;
    private audioTracks?;
    private audioWorklet?;
    onStop?: (audioBuffers: ArrayBuffer[]) => void;
    onFrameRecorded?: (params: {
        isLastFrame: boolean;
        frameBuffer: ArrayBuffer;
    }) => void;
   
    onStart?: () => void;
    start({ sampleRate, frameSize, arrayBufferType, }: {
        sampleRate?: number;
        frameSize?: number;
        arrayBufferType?: "short16" | "float32";
    }): Promise<void>;
    stop(): void;
}

export { RecorderManager as default };
