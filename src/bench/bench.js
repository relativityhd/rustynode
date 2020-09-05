const fs = require('fs')
const path = require('path')
const Benchmark = require('benchmark')
const jsonToMarkdownTable = require('json-to-markdown-table')
const napi = require('../napi/napi.node')
const napirs = require('../napi-rs/napirs.node')
const native = require('../native')
const wasm = require('../wasm/pkg/wasm')

const benches = {}

function runSingleBenchmark (fns, args) {
  return new Promise((resolve, reject) => {
    const suite = new Benchmark.Suite()
    for (const [fname, f] of Object.entries(fns)) {
      suite.add(fname, () => {
        f(...args)
      })
    }
    suite.on('cycle', (event) => {
      console.log(String(event.target))
    }).on('complete', function () {
      console.log(`Fastest for ${args} is ${this.filter('fastest').map('name')}`)
      const results = []
      const succs = this.filter('successful')
      for (const i in [...Array(succs.length).keys()]) {
        const target = succs[i]
        results.push({
          name: `${target.name} - ${args}`,
          mean: target.stats.mean,
          moe: target.stats.moe,
          module: target.name,
          args: args
        })
      }
      resolve(results)
    }).run({ async: true })
  })
}

async function runBenchmark (bname, fns, args, overwrite = true) {
  const jsonPath = path.join(__dirname, `../../benchmarks/${bname}.json`)
  const mdPath = path.join(__dirname, `../../benchmarks/${bname}.md`)

  if (Array.isArray(args)) {
    args = args.reduce((obj, a) => {
      const _a = a.length ? a : [a]
      obj[String(a)] = _a
      return obj
    }, {})
  }

  benches[bname] = { bname, fns: Object.keys(fns), args: Object.keys(args), res: [] }

  if (!overwrite && fs.existsSync(jsonPath)) {
    const storedBenches = JSON.parse(fs.readFileSync(jsonPath))
    benches[bname].res = storedBenches.res || []
    args = Object.keys(args).filter(a => !storedBenches.args.includes(a)).reduce((obj, key) => {
      obj[key] = args[key]
      return obj
    }, {})
  }

  for (const id in args) {
    await runSingleBenchmark(fns, args[id]).then((results) => {
      benches[bname].res.push(...results)
    })
  }
  fs.writeFile(jsonPath, JSON.stringify(benches[bname]), e => console.log(e || `Stored benchmarks to ${jsonPath}`))
  fs.writeFile(mdPath, `# Results of benchmark: ${bname}\n\n${jsonToMarkdownTable(benches[bname].res, ['name', 'mean', 'moe'])}`, e => console.log(e || `Stored benchmarks to ${mdPath}`))
}

runBenchmark(
  'Pi-Optimized', {
    Napi: napi.pi_opt,
    NapiRs: napirs.pi_opt,
    Native: native.pi_opt,
    Wasm: wasm.pi_opt
  }, Array.from({ length: 8 }).map((_, i) => 10 ** i), false
)

runBenchmark(
  'Pi', {
    Napi: napi.pi,
    NapiRs: napirs.pi,
    Native: native.pi,
    Wasm: wasm.pi
  }, Array.from({ length: 8 }).map((_, i) => 10 ** i), false
)

exports.getBenchmark = (id) => {
  return benches[id] ? benches[id].res : `No bench with the id ${id} found.`
}
