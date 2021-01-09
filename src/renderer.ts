import Hexo from "hexo";
import { extend, isEqual } from "lodash";
import { getService } from "./service";

const renderer = (ext: string) => {
  if (!ext.match(/^(j|t)sx?$/)) {
    throw new Error("Unsupported file extension");
  }
  return async function (this: Hexo, data: Hexo.extend.RendererData) {
    const userConfig = extend(
      {},
      this.theme.config.esbuild || {},
      this.config.esbuild || {}
    );
    const enforcedProperties = {
      entryPoints: [data.path!],
      bundle: true,
      write: false,
    };
    for (const [k, v] of Object.entries(enforcedProperties)) {
      if (!userConfig[k]) continue;
      if (isEqual(v, userConfig[k])) {
        this.log.warn(`Redundant configuration property: ${k}`);
      } else {
        this.log.error(
          `Configuration property ${k} will not be respected: ${v} is enforced`
        );
      }
    }
    const buildService = await getService(this);
    const buildResult = await buildService.build({
      ...userConfig,
      ...enforcedProperties,
    });

    const [outputFile] = buildResult.outputFiles;
    if (!outputFile) {
      throw new Error("Build failed");
    }
    return outputFile.text;
  };
};

export default renderer;
