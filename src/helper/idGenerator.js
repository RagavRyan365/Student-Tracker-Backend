import {v4 as uuidv4} from 'uuid';

async function generateUniqueId() {
  const uniqueId = uuidv4();
  return uniqueId;
}

export default generateUniqueId;