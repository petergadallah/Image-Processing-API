import request from 'supertest';
import app from '../index';
import processing from '../utilities';
describe('Testing Server', (): void => {
  //We test image processing function
  it('testing image processing', () => {
    expect(processing('pic2', 500, 400)).toEqual('output/pic2_500_400.jpg');
  });

  it('Testing if the app is defined', function(): void {
    expect(app).toBeDefined();
  });

  it('expect server to return 200 for route: /', done => {
    request(app)
      .get('/images/?filename=pic2&width=200&height=359')
      .expect(200)
      .end(err => (err ? done.fail(err) : done()));
  });
});
