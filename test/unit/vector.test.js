import Vector from './Vector'

test(`should take in a new vector and add the new vectors x coordinate to its own x coordinate, and add the new vectors y coordinate to its own y coordinate.`, () => {
  const vectorOriginal = new Vector(1, 1)
  const vectorToAdd = new Vector(2, 3)
  const expected = {
      x: 3,
      y: 4
    }
  jest.spyOn(vectorOriginal, 'add')
  const result = vectorOriginal.add(vectorToAdd)

  expect(vectorOriginal.add).toHaveBeenCalled()
  expect(vectorOriginal.add).toHaveBeenCalledWith(vectorToAdd)
  expect(result).toEqual(expected)
})

test(`should take in a new vector and subtract the new vectors x coordinate from its own x coordinate, and subtract the new vectors y coordinate from its own y coordinate.`, () => {
  const vectorOriginal = new Vector(1, 1)
  const vectorToSubtract = new Vector(2, 3)
  const expected = {
    x: -1,
    y: -2
  }
  jest.spyOn(vectorOriginal, 'subtr')
  const result = vectorOriginal.subtr(vectorToSubtract)

  expect(vectorOriginal.subtr).toHaveBeenCalled()
  expect(vectorOriginal.subtr).toHaveBeenCalledWith(vectorToSubtract)
  expect(result).toEqual(expected)
})

test(`should return a value which is the magnitude of the vector which is the square root of the vectors x coordinate squared, plus the vectors y coordinate squared.`, () => {
  const vectorOriginal = new Vector(3, 4)

  const expected = 5
  jest.spyOn(vectorOriginal, 'mag')
  const result = vectorOriginal.mag()

  expect(vectorOriginal.mag).toHaveBeenCalled()
  expect(vectorOriginal.mag).toHaveBeenCalledWith()
  expect(result).toEqual(expected)
})

test(`should return a new vector with both x and y coordinates as 0. Due to the magnitude of the vector being 0.`, () => {
  const vectorOriginal = new Vector(0, 0)

  const expected = {
    x: 0,
    y: 0
  }
  jest.spyOn(vectorOriginal, 'unit')
  const result = vectorOriginal.unit()

  expect(vectorOriginal.unit).toHaveBeenCalled()
  expect(vectorOriginal.unit).toHaveBeenCalledWith()
  expect(result).toEqual(expected)
})

