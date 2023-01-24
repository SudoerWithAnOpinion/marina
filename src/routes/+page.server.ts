import { Printer, Job, JobEvent } from '$models';


console.log(await Printer.findAll());
console.log(await Job.findAll());
console.log(await JobEvent.findAll());