import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTypeScript from 'eslint-config-next/typescript'

const eslintConfig = [
    ...nextVitals,
    ...nextTypeScript,
    {
        rules: { '@next/next/no-img-element': 'off' }
    },
    {
        files: ['components/custom/smart-image.tsx'],
        rules: { 'react-hooks/set-state-in-effect': 'warn' }
    },
    {
        ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts']
    }
]

export default eslintConfig
