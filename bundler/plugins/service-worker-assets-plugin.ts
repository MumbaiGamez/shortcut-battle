import fs from 'fs';
import { Compilation, Compiler } from 'webpack';
import { ConcatSource } from 'webpack-sources';
import { createHash } from 'crypto';

type Options = {
  output: string;
  path: string;
  routes: string[];
};

const PLUGIN_NAME = 'ServiceWorkerAssetsPlugin';

class ServiceWorkerAssetsPlugin {
  options: Options;

  constructor(options: Options) {
    this.options = options;
  }

  apply(compiler: Compiler) {
    compiler.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation) => {
      compilation.hooks.processAssets.tapPromise(
        {
          name: PLUGIN_NAME,
          stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
          additionalAssets: true,
        },
        async (assets) => {
          if (compilation.getAsset(this.options.output)) {
            return;
          }

          const assetKeys = Object.keys(assets);
          let publicPath = compilation.outputOptions.publicPath;

          if (!publicPath || publicPath === 'auto') {
            publicPath = '/';
          }

          const versionHash = createHash('sha1');

          for (const file of assetKeys) {
            versionHash.update(assets[file].source());
          }

          const assetUrls = [...assetKeys, ...this.options.routes].map(
            (file) =>
              publicPath + file.replace(/((^|\/)index)?\.html?$/, '$2') || '.'
          );

          const version = versionHash.digest('hex');
          const source = fs.readFileSync(this.options.path, 'utf-8');

          compilation.emitAsset(
            this.options.output,
            new ConcatSource(
              `const VERSION = ${JSON.stringify(version)};`,
              `const ASSETS = ${JSON.stringify(assetUrls)};`,
              source
            ) as any
          );
        }
      );
    });
  }
}

export default ServiceWorkerAssetsPlugin;
