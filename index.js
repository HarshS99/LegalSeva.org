#!/usr/bin/env node

require('dotenv').config();
const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const ora = require('ora').default;
const { explainCode, documentCode, generateTest } = require('./ai-service');

if (!process.env.GEMINI_API_KEY) {
  console.warn("⚠️  GEMINI_API_KEY is missing from your environment. Please create a .env file and set GEMINI_API_KEY to your Gemini token.");
}

program
  .name('dev-agent')
  .description('AI developer assistant CLI tool')
  .version('1.0.0');

// Command: Explain
program
  .command('explain <file>')
  .description('Explain the given code file')
  .action(async (file) => {
    const filepath = path.resolve(file);
    if (!fs.existsSync(filepath)) {
      console.error(`Error: File not found at ${filepath}`);
      process.exit(1);
    }
    const code = fs.readFileSync(filepath, 'utf8');
    const spinner = ora('Analyzing and explaining code...').start();
    
    try {
      const explanation = await explainCode(code);
      spinner.succeed('Code Explanation:');
      console.log('\n' + explanation + '\n');
    } catch (error) {
      spinner.fail('Failed to explain code');
      console.error(error.message);
    }
  });

// Command: Document
program
  .command('doc <file>')
  .description('Generate documentation comments for the given code file')
  .action(async (file) => {
    const filepath = path.resolve(file);
    if (!fs.existsSync(filepath)) {
      console.error(`Error: File not found at ${filepath}`);
      process.exit(1);
    }
    const code = fs.readFileSync(filepath, 'utf8');
    const spinner = ora('Generating documentation...').start();
    
    try {
      const documentedCode = await documentCode(code);
      fs.writeFileSync(filepath, documentedCode, 'utf8');
      spinner.succeed(`Documentation generated and written to ${file}`);
    } catch (error) {
      spinner.fail('Failed to generate documentation');
      console.error(error.message);
    }
  });

// Command: Test
program
  .command('test <file>')
  .description('Generate unit tests for the given code file')
  .action(async (file) => {
    const filepath = path.resolve(file);
    if (!fs.existsSync(filepath)) {
      console.error(`Error: File not found at ${filepath}`);
      process.exit(1);
    }
    const filename = path.basename(file);
    const code = fs.readFileSync(filepath, 'utf8');
    const spinner = ora('Generating unit tests...').start();
    
    try {
      const testCode = await generateTest(code, filename);
      const testFilename = file.replace(/(\.[a-zA-Z0-9]+)$/, '.test$1');
      const testFilepath = path.resolve(testFilename);
      fs.writeFileSync(testFilepath, testCode, 'utf8');
      spinner.succeed(`Tests generated and saved to ${testFilename}`);
    } catch (error) {
      spinner.fail('Failed to generate tests');
      console.error(error.message);
    }
  });

program.parse(process.argv);
