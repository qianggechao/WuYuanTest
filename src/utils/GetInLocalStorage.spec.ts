import { GetInLocalStorage } from './GetInLocalStorage';
describe('测试 SavingInLocalStorage', () => {
    it('test saving', () => {
        const result = GetInLocalStorage('abc')
        expect(JSON.stringify(result)).toBe('[]')
    })
})