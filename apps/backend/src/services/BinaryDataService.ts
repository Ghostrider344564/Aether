import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

export class BinaryDataService {
  private static uploadDir = path.join(__dirname, '../../uploads');

  static async save(buffer: Buffer, fileName: string, mimeType: string): Promise<string> {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
    const id = uuidv4();
    const filePath = path.join(this.uploadDir, id);
    await fs.promises.writeFile(filePath, buffer);
    return id;
  }

  static async get(id: string): Promise<Buffer> {
    const filePath = path.join(this.uploadDir, id);
    return fs.promises.readFile(filePath);
  }
}
