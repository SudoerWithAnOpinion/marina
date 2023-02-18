import { Printer, Job, JobEvent } from '$models';


console.log(await Printer.findAll().then((printers) => { return printers }));
// console.log(await Job.findAll());
// console.log(await JobEvent.findAll());