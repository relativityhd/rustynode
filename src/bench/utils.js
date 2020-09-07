const fs = require('fs')
const path = require('path')
const Benchmark = require('benchmark')
const jsonToMarkdownTable = require('json-to-markdown-table')

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

exports.runBenchmark = async (bname, fns, args, overwrite = true) => {
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
    if (Object.keys(args).length === 0) return
  }

  for (const id in args) {
    await runSingleBenchmark(fns, args[id]).then((results) => {
      benches[bname].res.push(...results)
    })
  }
  fs.writeFile(jsonPath, JSON.stringify(benches[bname]), e => console.log(e || `Stored benchmarks to ${jsonPath}`))
  fs.writeFile(mdPath, `# Results of benchmark: ${bname}\n\n${jsonToMarkdownTable(benches[bname].res, ['name', 'mean', 'moe'])}`, e => console.log(e || `Stored benchmarks to ${mdPath}`))
}

exports.getBenchmark = (id) => {
  return benches[id] ? benches[id].res : `No bench with the id ${id} found.`
}
