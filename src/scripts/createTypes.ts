import { generateNamespace } from '@gql2ts/from-schema';
import * as fs from 'fs';
import * as path from 'path';
import { genSchema } from '../utils/genSchema';

// This function generates namespaces for all the schemas and saves it in types/schema.d.ts
const typescriptTypes = generateNamespace('GQL', genSchema());
fs.writeFile(path.join(__dirname, '../types/schema.d.ts'), typescriptTypes, (err) => {
  console.log(err);
});
