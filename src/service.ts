import * as esbuild from "esbuild";
import Hexo from "hexo";

let serviceP: Promise<esbuild.Service> | undefined = undefined;

export const getService = async (hexo: Hexo) => {
  if (serviceP) {
    return serviceP;
  }
  serviceP = esbuild.startService();
  hexo.on("exit", async () => {
    if (!serviceP) return;
    serviceP.then((it) => it.stop());
    serviceP = undefined;
  });
  return serviceP;
};
