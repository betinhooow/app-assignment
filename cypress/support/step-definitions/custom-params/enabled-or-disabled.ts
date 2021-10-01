import { defineParameterType } from 'cypress-cucumber-preprocessor/steps';

defineParameterType({
  name: 'futureOrPast',
  regexp: new RegExp('future|past'),
  transformer(value: string): boolean {
    return value === 'future';
  }
});
