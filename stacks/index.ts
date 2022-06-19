import * as sst from '@serverless-stack/resources';

import { StorageStack } from './StorageStack';
import { ApiStack } from './ApiStack';
import { AuthStack } from './AuthStack';
import { FrontendStack } from './FrontendStack';

export default function main(app: sst.App): void {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    runtime: 'nodejs16.x',
    srcPath: 'backend',
    bundle: {
      format: 'esm',
    },
  });

  app
    .stack(StorageStack)
    .stack(ApiStack)
    .stack(AuthStack)
    .stack(FrontendStack);
}
