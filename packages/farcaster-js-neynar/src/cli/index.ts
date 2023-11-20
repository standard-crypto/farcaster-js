import { Command } from 'commander';
const program = new Command();

program
  .version('1.0.0')
  .description('Your SDK CLI')
  .option('-o, --option <value>', 'Specify an option')
  .action(async(options) => {
    try {
      // eslint-disable-next-line no-console
      console.log(options);
      // eslint-disable-next-line no-console
      console.log('something happens now');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error:', error);
    }
  });

program.parse(process.argv);
