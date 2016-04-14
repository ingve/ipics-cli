import test from 'ava';
import execa from 'execa';

test(async t => {
	const output = await execa('node', ['./cli.js']);
	t.regex(output.stdout, /Usage/);
});
