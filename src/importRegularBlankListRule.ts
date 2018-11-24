import * as Lint from 'tslint'
import * as ts from 'typescript'

export class Rule extends Lint.Rules.AbstractRule {
    static FAILURE_STRING = (packageName) => `importing can not contain ${packageName}`

    public apply (sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new Walk(sourceFile, this.getOptions()))
    }
}

class Walk extends Lint.RuleWalker {
    visitImportDeclaration (node: ts.ImportDeclaration) {
        const options = this.getOptions()
        const isNotAllowedPackage = options.some(char => {
            const originalText = node.moduleSpecifier.getText()
            if (typeof char === 'object') {
                return char.test(originalText)
            }
            return originalText.indexOf(char) > -1
        })

        if (isNotAllowedPackage) {
            this.addFailureAtNode(node, Rule.FAILURE_STRING(options.join(',')))
        }
    }
}
