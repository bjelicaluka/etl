type State = {
  totalCount: number;
  publishedCount: number;
  processedCount: number;
  totalPublishTime: number;
  totalProcessTime: number;
}

export class TransformationStateHandler {
  public static states: { [key: string]: State } = {};

  public static setInitialState = (transformationId: string) => {
    this.states[transformationId] = {
      ...(this.states[transformationId] ? { totalCount: this.states[transformationId].totalCount } : { totalCount: 0 }),
      totalPublishTime: 0,
      publishedCount: 0,
      processedCount: 0,
      totalProcessTime: 0,
    }
  }

  public static createStateIfNotExists = (transformationId: string) => {
    if (!this.states[transformationId]) {
      this.setInitialState(transformationId);
    }
  }
}