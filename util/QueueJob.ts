interface QueueJob {
  // The time at which the job arrived (or will arrive) in the queue.
  arrivalTime: number;
  // The time at which the job began getting processed. If the job is still queued, this will be 0.
  procStartTime: number;

  // How many units time are required to process this job
  procDuration: number;
}
