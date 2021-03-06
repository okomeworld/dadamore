export class Recorder {
  private source: MediaStreamAudioSourceNode;
  private recorder: ScriptProcessorNode;
  private _isInRecording = false;
  private buffers: Float32Array[] = [];

  public readonly analyser: AnalyserNode;

  constructor(stream: MediaStream, private context: AudioContext) {
    this.source = context.createMediaStreamSource(stream);
    this.recorder = context.createScriptProcessor(4096, 1, 1);
    this.analyser = context.createAnalyser();

    this.recorder.addEventListener("audioprocess", (event) => {
      const input = event.inputBuffer.getChannelData(0);
      const buffer = new Float32Array(input);
      this.buffers.push(buffer);
    });
  }

  public start() {
    this.buffers = [];
    this.source.connect(this.recorder);
    this.source.connect(this.analyser);
    this.recorder.connect(this.context.destination);
    this._isInRecording = true;
  }

  public stop() {
    this.recorder.disconnect(this.context.destination);
    this.source.disconnect(this.recorder);
    this.source.disconnect(this.analyser);
    this._isInRecording = false;
  }

  public get isInRecording() {
    return this._isInRecording;
  }

  public get sampleRate() {
    return this.source.context.sampleRate;
  }

  public get recordedSamples() {
    const buffersAllLength = this.buffers.reduce(
      (sum, currentBuffer) => sum + currentBuffer.length,
      0
    );
    const samples = new Float32Array(buffersAllLength);
    let offset = 0;
    this.buffers.forEach((buffer) => {
      samples.set(buffer, offset);
      offset += buffer.length;
    });
    return samples;
  }

  private writeToDataView(dataView: DataView, offset: number, value: string) {
    for (let i = 0; i < value.length; i++) {
      dataView.setUint8(offset + i, value.charCodeAt(i));
    }
  }

  private floatTo16bitPCM(
    output: DataView,
    offset: number,
    input: Float32Array
  ) {
    for (let i = 0; i < input.length; i++) {
      const s = Math.max(-1, Math.min(1, input[i]));
      output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
      offset += 2;
    }
  }

  // TODO: RecordedSample????????????????????????????????????????????????????????????????????????
  private changeSampleRate(
    samples: Float32Array,
    fromRate: number,
    toRate: number
  ) {
    const rate = fromRate / toRate;
    const result = new Float32Array(Math.round(samples.length / rate));

    let offsetSamples = 0;
    result.forEach((_, offsetResult) => {
      const nextOffsetSamples = Math.round((offsetResult + 1) * rate);

      let accum = 0;
      let count = 0;
      for (
        let i = offsetSamples;
        i < nextOffsetSamples && i < samples.length;
        i++
      ) {
        accum += samples[i];
        count++;
      }

      offsetSamples = nextOffsetSamples;
      result[offsetResult] = accum / count;
    });

    return result;
  }

  public generateRecordedWave() {
    // TODO: ??????????????????????????????????????????
    const sampleRateForEmpath = 11025;
    const samples = this.changeSampleRate(
      this.recordedSamples,
      this.sampleRate,
      sampleRateForEmpath
    );
    const dataView = new DataView(new ArrayBuffer(44 + samples.length * 2));

    this.writeToDataView(dataView, 0, "RIFF"); // RIFF????????????
    dataView.setUint32(4, 32 + samples.length * 2, true); // ?????????????????????
    this.writeToDataView(dataView, 8, "WAVE"); // WAVE????????????
    this.writeToDataView(dataView, 12, "fmt "); // fmt????????????
    dataView.setUint32(16, 16, true); // fmt???????????????????????????
    dataView.setUint16(20, 1, true); // ??????????????????ID
    dataView.setUint16(22, 1, true); // ??????????????????
    dataView.setUint32(24, sampleRateForEmpath, true); // ???????????????????????????
    dataView.setUint32(28, sampleRateForEmpath * 2, true); // ???????????????
    dataView.setUint16(32, 2, true); // ?????????????????????
    dataView.setUint16(34, 16, true); // ????????????????????????????????????
    this.writeToDataView(dataView, 36, "data"); // data????????????
    dataView.setUint32(40, samples.length * 2, true); // ??????????????????????????????
    this.floatTo16bitPCM(dataView, 44, samples); // ???????????????

    return dataView;
  }
}
