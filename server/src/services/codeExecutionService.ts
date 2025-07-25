import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import vm from 'vm';

const execAsync = promisify(exec);

class CodeExecutionService {
  async runCode(language: string, code: string): Promise<{ output: string; error?: string }> {
    if (!code) {
      throw new Error('No code provided');
    }

    switch (language) {
      case 'javascript':
        return this.runJavascript(code);
      case 'python':
        return this.runPython(code);
      default:
        throw new Error('Unsupported language');
    }
  }

  private async runJavascript(code: string) {
    try {
      const script = new vm.Script(code);
      const result = script.runInNewContext({}, { timeout: 3000 });
      return { output: result !== undefined ? String(result) : '' };
    } catch (err: any) {
      return { output: '', error: err.message };
    }
  }

  private async runPython(code: string) {
    const filename = path.join(os.tmpdir(), `exec-${uuidv4()}.py`);
    await fs.writeFile(filename, code);
    try {
      const { stdout, stderr } = await execAsync(`python3 ${filename}`, { timeout: 5000 });
      await fs.unlink(filename);
      if (stderr) return { output: '', error: stderr.trim() };
      return { output: stdout.trim() };
    } catch (err: any) {
      await fs.unlink(filename);
      return { output: '', error: err.stderr || err.message };
    }
  }
}

export default new CodeExecutionService();
