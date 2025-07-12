// tests failed because jest failed to parse ESM. Cannot understand `import...`. See https://jestjs.io/docs/ecmascript-modules

import { removeToDo } from "../utilityFuncs.js"

let toDos = [  // turn to global.toDos if test func can't access from here
  { value: "text1", isDone: false },
  { value: "text2", isDone: true },
  { value: "text3", isDone: false },
]

const mockLocalStorage = { setItem: jest.fn() }
global.localStorage = mockLocalStorage

const mockRemove = jest.fn()
const mockQuerySelector = jest.fn(() => ({ remove: mockRemove }))
const mocktoDosList = {
  querySelector: mockQuerySelector
}

global.toDosList = mocktoDosList

describe("removeToDo", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    toDos = [
      { value: "text1", isDone: false },
      { value: "text2", isDone: true },
      { value: "text3", isDone: false },
    ]
  })

  test('should remove the specific toDo from toDos array', () => {
    removeToDo("task1");

    expect(toDos).toHaveLength(2)
    expect(toDos).toEqual([
      { value: "task2", isDone: true },
      { value: "task3", isDone: false },
    ])
  })
})