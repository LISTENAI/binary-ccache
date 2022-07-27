import { execFile as _execFile } from 'child_process';
import { isAbsolute, join } from 'path';
import { promisify } from 'util';
import binary from '../src';

const execFile = promisify(_execFile);

const FIXTURES_DIR = join(__dirname, 'fixtures');

test('homeDir', () => {
  expect(isAbsolute(binary.homeDir)).toBe(true);
});

test('binaryDir', () => {
  expect(isAbsolute(binary.binaryDir)).toBe(true);
});

test('version()', async () => {
  expect(await binary.version()).toBeTruthy();
});

test('functionality', async () => {
  await expect(execFile(join(binary.binaryDir, 'ccache'), [
    'gcc',
    join(FIXTURES_DIR, 'hello_world.c'),
    '-o',
    join(FIXTURES_DIR, 'hello_world.exe'),
  ])).resolves.toBeTruthy();

  const { stdout } = await execFile(join(FIXTURES_DIR, 'hello_world.exe'));
  expect(stdout.trim()).toEqual('hello world!');
}, 30 * 1000);
