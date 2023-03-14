type UUID = string & { isUUID: true };

function isUUID(uuid: string): uuid is UUID {
  return /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/.test(uuid);
}
