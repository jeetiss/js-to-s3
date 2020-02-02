import createPath from './create-path'

describe('createPath', () => {
  it('should work', () => {
    expect(
      createPath('test/[version]/[filename]', {
        version: '1.x',
        filename: 'hello.wr'
      })
    ).toBe('test/1.x/hello.wr')
  })

  it('should work replace all tags', () => {
    expect(
      createPath('test/[version]/[version]/[filename]', {
        version: '3.1.x',
        filename: 'hello.wr'
      })
    ).toBe('test/3.1.x/3.1.x/hello.wr')
  })
})
