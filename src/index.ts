import jsRenderer from './renderer';

for (const ext of ['js', 'jsx', 'ts', 'tsx']) {
    hexo.extend.renderer.register(ext, 'js', jsRenderer(ext))
}
