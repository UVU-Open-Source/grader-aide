const fs = require('fs')
const program = require('commander')
const chalk = require('chalk')

function compose(f,g) {
  return function(x) {
    return f(g(x))
  }
}

// cmd prompt param config
program
  .option('-z, --zybooks <file>', 'REQUIRED zybooks csv')
  .option('-c, --canvas <file>', 'REQUIRED canvas csv (column for grade must already exist)')
  .option('-a, --assignment <string>', 'REQUIRED name of assignment in canvas')
  .option('-s, --save <string>', 'REQUIRED name/filepath for newly created canvas file')
  .parse(process.argv)

if(!program.zybooks || !program.canvas || !program.assignment || !program.save) {
  console.log(chalk.default.red('\nplease provide a value for all flags'));
  program.outputHelp()
  process.exit(1)
}

// ==================================================
// parse canvas data
// ==================================================
const [assignHeader, ptsHeader, ...students] = fs
  .readFileSync(program.canvas, 'utf8')
  .split('\n')
  .slice(0, -1) // remove tail

const assignmentIndexForCanvas = assignHeader
  .split(',')
  .findIndex(col => col.includes(program.assignment))

// ==================================================
// parse zybooks data (full functional)
// ==================================================
// helper methods
const pickTotalPtsCol = row => row.split(',')[3]
const convertToCanvasTotal = x => Math.round(x) / 10
const getRawtotal = compose(parseFloat, pickTotalPtsCol)
const formatTotal = compose(convertToCanvasTotal, getRawtotal)

const zybookTotals = fs
  .readFileSync(program.zybooks, 'utf8')
  .split('\n')
  .slice(1, -1) // remove head && tail
  .map(formatTotal) // gather raw values


// ==================================================
// create new canvas csv with zybooks data applied
// ==================================================
// helper methods
function updateAssignmentForStudent(student, studentIndex) {
  const cols = student.split(',')

  cols[assignmentIndexForCanvas] = zybookTotals[studentIndex]

  return cols.join(',')
}

const updatedStudents = students.map(updateAssignmentForStudent)
const updatedCSVData = [assignHeader, ptsHeader, ...updatedStudents, ''].join('\n')

fs.writeFileSync(program.save, updatedCSVData)

console.log('\nnew file has been created successfully\n');

// ==================================================
// parse zybooks data (halfway to functional)
// ==================================================
// const TOTAL_PTS_COL = 3
// const zybookTotals = fs
//   .readFileSync(program.zybooks, 'utf8')
//   .split('\n')
//   .slice(1, -1) // remove head && tail
//   .map(row => row.split(',')[TOTAL_PTS_COL]) // gather raw values
//   .map(rawTotal => Math.round(parseFloat(rawTotal)) / 10) // formats value for true grade raw = 37.837 final = 3.8

// ==================================================
// more robust compose
// ==================================================
// function compose(...fns) {
//   const n = fns.length;

//   return function $compose(...args) {
//     let $args = args;

//     for (let i = n - 1; i >= 0; i -= 1) {
//       $args = [fns[i].call(null, ...$args)];
//     }

//     return $args[0];
//   };
// }
