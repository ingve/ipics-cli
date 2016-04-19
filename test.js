import test from 'ava';
import execa from 'execa';

test('Shows usage instructions when no arguments are specified on the command line', async t => {
	const output = await execa('node', ['./cli.js']);
	t.regex(output.stdout, /Usage/);
});

test('Gives error message when unknown media type is requested', async t => {
	const output = await execa('node', ['./cli.js', 'King Kong', '-t bogus']);
	t.regex(output.stderr, /is not a valid type/);
});
