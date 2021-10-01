import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { KEY_CODE } from '../../enum/key-code.enum';
import { FutureMonthSelectorComponent } from './future-month-selector.component';

describe('FutureMonthSelectorComponent', (): void => {
  let spectator: Spectator<FutureMonthSelectorComponent>;
  const createComponent = createComponentFactory<FutureMonthSelectorComponent>({
    component: FutureMonthSelectorComponent,
    imports: []
  });

  beforeEach((): void => {
    spectator = createComponent();
  });

  it('should create with label param', (): void => {
    const label: string = "label button";
    spectator.setInput('label', label);

    expect(spectator.component).toBeTruthy();
    expect(spectator.component.label).toEqual(label);
  });

  it('should set dates when initialized', (): void => {
    const date: Date = new Date();
    date.setMonth(date.getMonth() + 1);

    expect(spectator.component.month).toEqual(date.toLocaleDateString('en', { month: 'long' }));
    expect(spectator.component.year).toEqual(date.getFullYear());
  });

  it('should set next month', (): void => {
    const expectNextDate: Date = new Date();
    expectNextDate.setMonth(expectNextDate.getMonth() + 2);

    spectator.component.changeNextMonth();

    expect(spectator.component.month).toEqual(expectNextDate.toLocaleDateString('en', { month: 'long' }));
    expect(spectator.component.year).toEqual(expectNextDate.getFullYear());
  });

  it('should set previous month', (): void => {
    const expectNextDate: Date = new Date();
    expectNextDate.setMonth(expectNextDate.getMonth() + 2);

    // go 2 months in future
    spectator.component.changeNextMonth();
    spectator.component.changeNextMonth();

    spectator.component.changePreviousMonth();

    expect(spectator.component.month).toEqual(expectNextDate.toLocaleDateString('en', { month: 'long' }));
    expect(spectator.component.year).toEqual(expectNextDate.getFullYear());
  });

  it('should not be able to set the current or past month', (): void => {
    const date: Date = new Date();
    date.setMonth(date.getMonth() + 1);

    spectator.component.changePreviousMonth();
    spectator.component.changePreviousMonth();
    spectator.component.changePreviousMonth();

    expect(spectator.component.month).toEqual(date.toLocaleDateString('en', { month: 'long' }));
    expect(spectator.component.year).toEqual(date.getFullYear());
  });

  it('should go next month when focused and press arrow right', (): void => {
    const expectNextDate: Date = new Date();
    expectNextDate.setMonth(expectNextDate.getMonth() + 2);

    const key: KeyboardEvent = { key: KEY_CODE.RIGHT_ARROW } as KeyboardEvent;
    const element: HTMLElement =  spectator.element.querySelector('.future-month-selector') as HTMLElement;
    element.focus();


    spectator.component.onKeyEvent(key);

    expect(spectator.component.month).toEqual(expectNextDate.toLocaleDateString('en', { month: 'long' }));
    expect(spectator.component.year).toEqual(expectNextDate.getFullYear());
  });

  it('should go previous month when focused and press left right', (): void => {
    const expectNextDate: Date = new Date();
    expectNextDate.setMonth(expectNextDate.getMonth() + 2);

    const key: KeyboardEvent = { key: KEY_CODE.LEFT_ARROW } as KeyboardEvent;
    const element: HTMLElement =  spectator.element.querySelector('.future-month-selector') as HTMLElement;
    element.focus();

    // go 2 months in future
    spectator.component.changeNextMonth();
    spectator.component.changeNextMonth();
    spectator.component.onKeyEvent(key);

    expect(spectator.component.month).toEqual(expectNextDate.toLocaleDateString('en', { month: 'long' }));
    expect(spectator.component.year).toEqual(expectNextDate.getFullYear());
  });

  it('should not change date when focused and press any other key', (): void => {
    const expectNextDate: Date = new Date();
    expectNextDate.setMonth(expectNextDate.getMonth() + 1);

    const key: KeyboardEvent = { key: '.' } as KeyboardEvent;
    const element: HTMLElement =  spectator.element.querySelector('.future-month-selector') as HTMLElement;
    element.focus();

    spectator.component.onKeyEvent(key);

    expect(spectator.component.month).toEqual(expectNextDate.toLocaleDateString('en', { month: 'long' }));
    expect(spectator.component.year).toEqual(expectNextDate.getFullYear());
  });

  it('should not change date when the element is not focused but press right key', (): void => {
    const expectNextDate: Date = new Date();
    expectNextDate.setMonth(expectNextDate.getMonth() + 1);

    const key: KeyboardEvent = { key: KEY_CODE.RIGHT_ARROW } as KeyboardEvent;
    spectator.component.onKeyEvent(key, '.any-other-div');

    expect(spectator.component.month).toEqual(expectNextDate.toLocaleDateString('en', { month: 'long' }));
    expect(spectator.component.year).toEqual(expectNextDate.getFullYear());
  });
});
