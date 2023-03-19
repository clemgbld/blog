export const pipeValidators =
  (...validators: Function[]) =>
  (...params: string[]) =>
    validators.reduce(
      (error, validator) => error || validator(...params),
      undefined
    );
