import { RxjsOperatorsDetailsPage } from './app.po';

describe('rxjs-operators-details App', () => {
  let page: RxjsOperatorsDetailsPage;

  beforeEach(() => {
    page = new RxjsOperatorsDetailsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
