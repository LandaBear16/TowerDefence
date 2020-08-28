module.exports = {
  Application: jest.fn(() => 'stage'),
  Sprite:  jest.fn(() => 'sprite'),
  Texture:  jest.fn(() => 'texture'),
  from:  jest.fn(() => 'from'),
  Resources: jest.fn(() => 'resources'),
}