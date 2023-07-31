import sveltePreprocess from 'svelte-preprocess'

const preprocess = sveltePreprocess({
    // the postcss thing is necessary if the project uses tailwind
    // postcss: true,
    sveltePreprocess,
    typescript: {compilerOptions: {target: 'es2020'}}
})

export default {
    compilerOptions: {
        accessors: true
    },
    preprocess
}
