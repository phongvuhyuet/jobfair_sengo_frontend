const { codegen } = require('swagger-axios-codegen')
const Downloader = require('nodejs-file-downloader')
require('dotenv').config()

const defaultOptions = {
  serviceNameSuffix: 'Service',
  enumNamePrefix: 'Enum',
  methodNameMode: 'path',
  useStaticMethod: true,
  useCustomerRequestInstance: false,
  include: [],
  strictNullChecks: false,
  modelMode: 'interface',
  useClassTransformer: false,
}
const genAxios = async () => {
  try {
    if (process.env.API_REMOTE) {
      await new Downloader({
        url: 'https://jobfair-sengo-backend.vercel.app/swagger/swagger.json',
        directory: `./src/common/open-api/`,
        fileName: 'swagger.json',
        cloneFiles: false,
      }).download()
    }

    // This tool has bug on basePath, so we need this line to tricky add basePath (not follows OpenAPI v3 spec)
    const source = require(`./src/common/open-api/swagger.json`)
    source.basePath = '/api/v1'
    await codegen({
      ...defaultOptions,
      source,
      outputDir: `src/common/open-api/`,
      fileName: `swagger.gen.tsx`,
      methodNameMode: 'shortOperat.ionId',
    })
  } catch (error) {
    console.error('cannot download swagger.json')
    console.error(error)
  }
}


genAxios()