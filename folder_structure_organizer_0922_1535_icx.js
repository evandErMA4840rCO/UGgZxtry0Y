// 代码生成时间: 2025-09-22 15:35:30
 * by moving files into a more structured folder layout.
 *
 * @author Your Name
 * @version 1.0.0
 */

import Ember from 'ember';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import rimraf from 'rimraf';
import { copy, move } from 'fs-extra';
import chalk from 'chalk';

// Promisify async IO operations
const rimrafPromise = promisify(rimraf);
const readFilePromise = promisify(fs.readFile);
const writeFilePromise = promisify(fs.writeFile);
const mkdirPromise = promisify(fs.mkdir);

// Helper function to log messages with a timestamp
const log = (message) => {
  console.log(chalk.blue(`[${new Date().toLocaleTimeString()}]`), message);
};

// Helper function to check if a path exists
const pathExists = async (filePath) => {
  try {
    await readFilePromise(filePath);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false;
    }
    throw error;
  }
};

// Helper function to create a directory if it doesn't exist
const ensureDir = async (dirPath) => {
  try {
    await mkdirPromise(dirPath, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
};

// The main function to organize the folder structure
const organizeFolderStructure = async (sourceDir, targetDir) => {
  log('Starting the folder structure organization...');

  try {
    // Check if source directory exists
    if (!await pathExists(sourceDir)) {
      throw new Error('Source directory does not exist.');
    }

    // Ensure target directory exists
    await ensureDir(targetDir);

    // Read the source directory contents
    const files = await fs.promises.readdir(sourceDir);

    // Organize files into the target directory
    for (const file of files) {
      const sourceFilePath = path.join(sourceDir, file);
      const targetFilePath = path.join(targetDir, file);

      // If it's a file, move it to the target directory
      if (!(await fs.promises.stat(sourceFilePath)).isDirectory()) {
        await move(sourceFilePath, targetFilePath);
        log(chalk.green(`Moved file: ${file}`));
      }
      // If it's a directory, recursively organize its structure
      else {
        const newTargetDir = path.join(targetDir, file);
        await ensureDir(newTargetDir);
        await organizeFolderStructure(sourceFilePath, newTargetDir);
      }
    }

    log(chalk.green('Folder structure organized successfully!'));
  } catch (error) {
    log(chalk.red(`An error occurred: ${error.message}`));
  }
};

// The main entry point for the application
export default class FolderStructureOrganizer extends Ember.Controller {
  @action
  async organize() {
    const sourceDir = this.sourceDir;
    const targetDir = this.targetDir;

    await organizeFolderStructure(sourceDir, targetDir);
  }
}
