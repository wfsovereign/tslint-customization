import { Configuration, Linter } from 'tslint'


const helper = ({ src, rule }) => {
    const linter = new Linter({ fix: false })
    linter.lint('', src, Configuration.parseConfigFile({
        'rules': {
            [rule.name || rule]: [true, ...rule.options],
        },
        'rulesDirectory': 'src',
    }))
    return linter.getResult()
}

describe('importCharBlankList Rule', () => {
    it(`should fail when importing contain .png that was in the arguments`, () => {
        const src = `
            import coin from 'hello.png';
        `
        const result = helper({ src, rule: { name: 'import-regular-blank-list', options: ['.png'] } })
        expect(result.errorCount).toBe(1)
        expect(result.failures[0].getFailure()).toBe(`importing can not contain .png`)
    })

    it(`should fail when importing contain .png that was in the arguments, use regexp expression`, () => {
        const src = `
            import coin from 'hello.png';
        `
        const result = helper({ src, rule: { name: 'import-regular-blank-list', options: [/(\.png)/] } })
        expect(result.errorCount).toBe(1)
        expect(result.failures[0].getFailure()).toBe(`importing can not contain /(\\.png)/`)
    })


    it('should success when import not contain .png package', function () {
        const src = `
            import coin from 'hello';
        `
        const result = helper({ src, rule: { name: 'import-regular-blank-list', options: ['.png'] } })
        expect(result.errorCount).toBe(0)
    })

    it('should success when import not contain .png package, use regexp expression', function () {
        const src = `
                import coin from 'hello';
            `
        const result = helper({ src, rule: { name: 'import-regular-blank-list', options: [/(\.png)/] } })
        expect(result.errorCount).toBe(0)
    })

})
