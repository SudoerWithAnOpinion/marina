# Queue Item Detail

A queue item is a `Job` entity that has been wrapped for display.
To qualify as a queue item, a `Job` entity must include its `JobEvent` items.
The most recent, or lack of any items, is how the state is derived.
  - **No Events**: This item is in queue and has not been submitted for printing
  - **Event: SUBMITTED**: This indicates the item was sent to a printer.
  - **Event: PRINTING**: This indicates the printer has started printing.
  - **Event: PRINT_DONE**: This indicates the printer has completed the print, but the print has not been removed from the printer.
  - **Event: COMPLETED**: This indicates the printed object was removed and the job marked complete. No further actions may be taken on this job (though the user may optionally re-submit it as a new job with the same parameters)
  - **Event: ERROR**: This job has an error, usually caused by the printing process. User intervention is needed to clear the error. Additionally, the system may re-queue the job on another capable printer.